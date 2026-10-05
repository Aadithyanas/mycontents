import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { cloudinary, isCloudinaryConfigured } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Selected file is not an image' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Option A: If Cloudinary is configured, upload to Cloudinary cloud storage
    if (isCloudinaryConfigured()) {
      try {
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              resource_type: 'image',
              folder: 'creator_vault/thumbnails',
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });

        return NextResponse.json({
          url: uploadResult.secure_url,
          provider: 'cloudinary',
          publicId: uploadResult.public_id,
          width: uploadResult.width,
          height: uploadResult.height,
          format: uploadResult.format,
        });
      } catch (cloudErr: any) {
        console.warn('Cloudinary image upload stream error, falling back to local storage:', cloudErr);
      }
    }

    // Option B: Store locally in public/uploads/thumbnails
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'thumbnails');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${cleanName}`;
    const filePath = path.join(uploadDir, filename);

    fs.writeFileSync(filePath, buffer);

    const imageUrl = `/uploads/thumbnails/${filename}`;

    return NextResponse.json({
      url: imageUrl,
      provider: 'local',
      filename,
      size: file.size,
    });
  } catch (error: any) {
    console.error('Image upload failed:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload image file' },
      { status: 500 }
    );
  }
}
