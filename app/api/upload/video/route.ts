import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { cloudinary, isCloudinaryConfigured } from '@/lib/cloudinary';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No video file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Option A: If Cloudinary is configured with credentials, upload to Cloudinary cloud
    if (isCloudinaryConfigured()) {
      try {
        const uploadResult = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              resource_type: 'video',
              folder: 'creator_vault/videos',
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
          duration: uploadResult.duration ? Math.round(uploadResult.duration) : undefined,
          bytes: uploadResult.bytes,
        });
      } catch (cloudErr: any) {
        console.warn('Cloudinary upload stream error, falling back to local storage:', cloudErr);
      }
    }

    // Option B: Store directly in local static media directory (works out of the box)
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'videos');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${cleanName}`;
    const filePath = path.join(uploadDir, filename);

    fs.writeFileSync(filePath, buffer);

    const videoUrl = `/uploads/videos/${filename}`;

    return NextResponse.json({
      url: videoUrl,
      provider: 'local',
      filename,
      size: file.size,
    });
  } catch (error: any) {
    console.error('Video upload failed:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to upload video file' },
      { status: 500 }
    );
  }
}
