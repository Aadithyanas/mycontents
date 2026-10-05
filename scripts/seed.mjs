import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed to Render Cloud PostgreSQL...');

  // 1. Password hashes
  const adminHash = await bcrypt.hash('Admin@12345', 10);
  const userHash = await bcrypt.hash('Password@123', 10);

  // 2. Seed Admin & Creator (Aadithyan A.S.)
  const admin = await prisma.user.upsert({
    where: { email: 'aadithyan@creatorstudio.dev' },
    update: {
      name: 'Aadithyan A.S.',
      role: 'ADMIN',
      title: 'Director & Digital Cinematographer (Platform Creator)',
      bio: 'Sole filmmaker, cinematographer, and platform owner. Specializing in anamorphic 4K/8K imagery, narrative cinema, and zero-trust media protection.',
      department: 'Portfolio Owner & Creator Studio',
      passwordHash: adminHash,
    },
    create: {
      id: 'usr-admin-1',
      name: 'Aadithyan A.S.',
      email: 'aadithyan@creatorstudio.dev',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      role: 'ADMIN',
      title: 'Director & Digital Cinematographer (Platform Creator)',
      bio: 'Sole filmmaker, cinematographer, and platform owner. Specializing in anamorphic 4K/8K imagery, narrative cinema, and zero-trust media protection.',
      department: 'Portfolio Owner & Creator Studio',
      passwordHash: adminHash,
    },
  });
  console.log(`✅ Admin / Sole Creator created: ${admin.name} (${admin.email})`);

  // 3. Seed Registered Users (Priya Patel, Vikram Sen, Divya Krishnan, Rahul Sharma)
  const registeredUsers = [
    {
      id: 'usr-client-4',
      name: 'Priya Patel',
      email: 'priya.patel@redvelvetagency.com',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
      role: 'USER',
      title: 'Brand Creative Director',
      bio: 'Agency lead commissioning automotive, technology, and luxury lifestyle campaigns across South Asia.',
      department: 'External Brand Agency',
    },
    {
      id: 'usr-reviewer-5',
      name: 'Vikram Sen',
      email: 'vikram.sen@mumbaifilmcollective.org',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
      role: 'USER',
      title: 'Film Festival Curator & Critic',
      bio: 'Curator evaluating regional indie cinema, documentary submissions, and experimental visual art.',
      department: 'Independent Festival Jury',
    },
    {
      id: 'usr-student-6',
      name: 'Divya Krishnan',
      email: 'divya.k@ftii.ac.in',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
      role: 'USER',
      title: 'Cinematography Research Scholar',
      bio: 'Academic researcher focusing on anamorphic lens characteristics and computational image sensors.',
      department: 'Department of Cinematography (FTII)',
    },
    {
      id: 'usr-reviewer-2',
      name: 'Rahul Sharma',
      email: 'rahul.sharma@vfxcollective.in',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
      role: 'USER',
      title: 'Senior Motion Designer & Industry Reviewer',
      bio: 'Industry collaborator reviewing kinetic typography and VFX breakdown sequences for technical evaluation.',
      department: 'External Review Partner',
    },
    {
      id: 'usr-client-3',
      name: 'Anu Nair',
      email: 'anu.nair@chromapost.in',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
      role: 'USER',
      title: 'Lead Colorist & Post Studio Client',
      bio: 'Color science partner reviewing HDR mastering and DaVinci color grading screener passes.',
      department: 'Post-Production Client',
    },
  ];

  for (const u of registeredUsers) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {
        name: u.name,
        role: u.role,
        title: u.title,
        bio: u.bio,
        department: u.department,
        passwordHash: userHash,
      },
      create: {
        id: u.id,
        name: u.name,
        email: u.email,
        image: u.image,
        role: u.role,
        title: u.title,
        bio: u.bio,
        department: u.department,
        passwordHash: userHash,
      },
    });
    console.log(`✅ Registered User created: ${u.name} (${u.email})`);
  }

  // 4. Seed Categories
  const categories = [
    {
      id: 'cat-1',
      name: 'Cinematic Travel & Landscapes',
      slug: 'cinematic-travel',
      description: 'High-production 8K and 4K aerial, nature, and cultural expeditions across the subcontinent.',
      icon: 'Compass',
    },
    {
      id: 'cat-2',
      name: 'Brand & Commercial Films',
      slug: 'commercials',
      description: 'Automotive, luxury lifestyle, and consumer electronics advertising campaigns.',
      icon: 'Briefcase',
    },
    {
      id: 'cat-3',
      name: 'Narrative Short Films',
      slug: 'short-films',
      description: 'Fiction, indie festival cinema, and emotional dramatic storytelling.',
      icon: 'Film',
    },
    {
      id: 'cat-4',
      name: 'Music & Performance Videos',
      slug: 'music-videos',
      description: 'High-energy choreography, music festival sets, and studio acoustic sessions.',
      icon: 'Music',
    },
    {
      id: 'cat-5',
      name: 'Motion Graphics & 3D Reels',
      slug: 'motion-graphics',
      description: 'Futuristic title sequences, UI animations, and Octane/Blender concept showcases.',
      icon: 'Layers',
    },
    {
      id: 'cat-6',
      name: 'VFX & Color Grading Breakdown',
      slug: 'vfx-color',
      description: 'Pre-production previz, DaVinci Resolve color passes, and compositing breakdowns.',
      icon: 'Sparkles',
    },
  ];

  for (const c of categories) {
    await prisma.category.upsert({
      where: { id: c.id },
      update: {
        name: c.name,
        slug: c.slug,
        description: c.description,
        icon: c.icon,
      },
      create: {
        id: c.id,
        name: c.name,
        slug: c.slug,
        description: c.description,
        icon: c.icon,
      },
    });
  }
  console.log(`✅ Seeded ${categories.length} Categories`);

  // 5. Seed Videos (all created by Aadithyan A.S.)
  const sampleVideos = [
    {
      id: 'vid-01',
      title: 'Wanderlust Ladakh: High Altitude Silence',
      slug: 'wanderlust-ladakh-high-altitude-silence',
      description: 'An immersive cinematic expedition capturing the stark, snow-swept deserts and glacial lakes of Ladakh in 8K anamorphic format.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1280&auto=format&fit=crop&q=80',
      videoUrl: '/videos/sample.mp4',
      duration: '04:18',
      durationSeconds: 258,
      accessType: 'PUBLIC',
      featured: true,
      views: 48920,
      tags: ['Cinematic', '8K', 'Travel', 'Ladakh', 'Anamorphic', 'Drone'],
      resolution: '8K UHD (7680x4320)',
      fps: 60,
      bitrate: '45 Mbps',
      videoCodec: 'Apple ProRes 422 HQ / HEVC',
      audioCodec: 'Dolby Atmos 5.1 / AAC 320kbps',
      watermarkEnabled: false,
      categoryId: 'cat-1',
      creatorId: 'usr-admin-1',
    },
    {
      id: 'vid-02',
      title: 'Aura Smartwatch: Precision Engineered',
      slug: 'aura-smartwatch-precision-engineered',
      description: 'Commercial spot for the titanium Aura Apex smartwatch. Explores laser-etched micro-surfaces and sapphire crystal refraction.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1280&auto=format&fit=crop&q=80',
      videoUrl: '/videos/sample.mp4',
      duration: '01:45',
      durationSeconds: 105,
      accessType: 'PUBLIC',
      featured: true,
      views: 31200,
      tags: ['Commercial', 'Macro', 'Titanium', 'Lighting Design'],
      resolution: '4K UHD (3840x2160)',
      fps: 120,
      bitrate: '30 Mbps',
      videoCodec: 'HEVC / H.265 Main 10',
      audioCodec: 'Stereo 24-bit 48kHz PCM',
      watermarkEnabled: false,
      categoryId: 'cat-2',
      creatorId: 'usr-admin-1',
    },
    {
      id: 'vid-03',
      title: 'Royal Udaipur: Ananya & Rohan Highlight',
      slug: 'royal-udaipur-ananya-rohan-highlight',
      description: 'Ultra-luxury heritage destination wedding highlights captured with Cook Anamorphic lenses and Arri Alexa 35.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1280&auto=format&fit=crop&q=80',
      videoUrl: '/videos/sample.mp4',
      duration: '06:12',
      durationSeconds: 372,
      accessType: 'REQUEST_ACCESS',
      featured: true,
      views: 18450,
      tags: ['Luxury Wedding', 'Anamorphic', 'Heritage', 'Arri Alexa'],
      resolution: '4K DCI (4096x2160)',
      fps: 24,
      bitrate: '28 Mbps',
      videoCodec: 'HEVC / H.265 Secure Stream',
      audioCodec: 'Dolby Atmos Spatial Audio',
      watermarkEnabled: true,
      categoryId: 'cat-2',
      creatorId: 'usr-admin-1',
    },
    {
      id: 'vid-05',
      title: 'The Last Postbox of Munnar',
      slug: 'the-last-postbox-of-munnar',
      description: 'Atmospheric narrative short film about an elderly postal carrier serving remote mountain tea estates.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1280&auto=format&fit=crop&q=80',
      videoUrl: '/videos/sample.mp4',
      duration: '14:20',
      durationSeconds: 860,
      accessType: 'REQUEST_ACCESS',
      featured: true,
      views: 12890,
      tags: ['Short Film', 'Indie Cinema', 'Kerala', 'Festival Official Selection'],
      resolution: '4K DCI (4096x2160)',
      fps: 24,
      bitrate: '32 Mbps',
      videoCodec: 'ProRes Proxy Stream / HEVC',
      audioCodec: 'Dolby 5.1 Surround',
      watermarkEnabled: true,
      categoryId: 'cat-3',
      creatorId: 'usr-admin-1',
    },
    {
      id: 'vid-07',
      title: 'TVS Apache RR 310: Apex Predator',
      slug: 'tvs-apache-rr-310-apex-predator',
      description: 'High-octane motorcycle commercial film filmed on the Madras Motor Race Track.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1280&auto=format&fit=crop&q=80',
      videoUrl: '/videos/sample.mp4',
      duration: '01:15',
      durationSeconds: 75,
      accessType: 'REQUEST_ACCESS',
      featured: true,
      views: 74210,
      tags: ['Commercial', 'Automotive', 'Superbike', 'High Speed', 'Phantom Flex'],
      resolution: '4K UHD (3840x2160)',
      fps: 240,
      bitrate: '50 Mbps',
      videoCodec: 'Apple ProRes 422 HQ',
      audioCodec: 'Surround 5.1 / 320kbps',
      watermarkEnabled: true,
      categoryId: 'cat-2',
      creatorId: 'usr-admin-1',
    },
    {
      id: 'vid-10',
      title: 'Project Garuda: CGI Flight Sequence VFX Breakdown',
      slug: 'project-garuda-cgi-flight-sequence-vfx-breakdown',
      description: 'Shot-by-shot multi-layer breakdown of a sci-fi fighter aircraft sequence.',
      thumbnailUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1280&auto=format&fit=crop&q=80',
      videoUrl: '/videos/sample.mp4',
      duration: '05:30',
      durationSeconds: 330,
      accessType: 'REQUEST_ACCESS',
      featured: true,
      views: 39100,
      tags: ['VFX', 'Breakdown', 'Houdini', 'Nuke', 'ACEScg', 'CGI'],
      resolution: '4K DCI (4096x2160)',
      fps: 24,
      bitrate: '26 Mbps',
      videoCodec: 'HEVC Main 10 High Tier',
      audioCodec: 'Linear PCM 48kHz 24-bit',
      watermarkEnabled: true,
      categoryId: 'cat-6',
      creatorId: 'usr-admin-1',
    },
  ];

  for (const v of sampleVideos) {
    await prisma.video.upsert({
      where: { id: v.id },
      update: {
        title: v.title,
        slug: v.slug,
        description: v.description,
        thumbnailUrl: v.thumbnailUrl,
        videoUrl: v.videoUrl,
        duration: v.duration,
        durationSeconds: v.durationSeconds,
        accessType: v.accessType,
        featured: v.featured,
        views: v.views,
        tags: v.tags,
        resolution: v.resolution,
        fps: v.fps,
        bitrate: v.bitrate,
        videoCodec: v.videoCodec,
        audioCodec: v.audioCodec,
        watermarkEnabled: v.watermarkEnabled,
        categoryId: v.categoryId,
        creatorId: v.creatorId,
      },
      create: {
        id: v.id,
        title: v.title,
        slug: v.slug,
        description: v.description,
        thumbnailUrl: v.thumbnailUrl,
        videoUrl: v.videoUrl,
        duration: v.duration,
        durationSeconds: v.durationSeconds,
        accessType: v.accessType,
        featured: v.featured,
        views: v.views,
        tags: v.tags,
        resolution: v.resolution,
        fps: v.fps,
        bitrate: v.bitrate,
        videoCodec: v.videoCodec,
        audioCodec: v.audioCodec,
        watermarkEnabled: v.watermarkEnabled,
        categoryId: v.categoryId,
        creatorId: v.creatorId,
      },
    });
  }
  console.log(`✅ Seeded ${sampleVideos.length} master videos owned by Aadithyan A.S.`);

  // 6. Seed Sample Access Requests for Users
  await prisma.accessRequest.upsert({
    where: { id: 'req-101' },
    update: {
      userId: 'usr-client-4',
      videoId: 'vid-07',
      reason: 'Evaluating high-speed phantom cinematography and precision color conformity for an upcoming national EV superbike brand campaign pitch.',
      status: 'PENDING',
    },
    create: {
      id: 'req-101',
      userId: 'usr-client-4',
      videoId: 'vid-07',
      reason: 'Evaluating high-speed phantom cinematography and precision color conformity for an upcoming national EV superbike brand campaign pitch.',
      status: 'PENDING',
    },
  });

  await prisma.accessRequest.upsert({
    where: { id: 'req-104' },
    update: {
      userId: 'usr-client-4',
      videoId: 'vid-03',
      reason: 'Direct client benchmark review requested for luxury destination campaign.',
      status: 'APPROVED',
      reviewedBy: 'Aadithyan A.S.',
    },
    create: {
      id: 'req-104',
      userId: 'usr-client-4',
      videoId: 'vid-03',
      reason: 'Direct client benchmark review requested for luxury destination campaign.',
      status: 'APPROVED',
      reviewedBy: 'Aadithyan A.S.',
    },
  });
  console.log('✅ Seeded Access Requests');

  console.log('🎉 Database seeding to Render Cloud PostgreSQL completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
