import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { NextResponse } from 'next/server';



export async function POST(request: Request) {
  try {
    const { filename, contentType } = await request.json();
    const fileId = crypto.randomUUID();
    const fileKey = `${fileId}-${filename}`;
    
    const s3Client = new S3Client({
      forcePathStyle: true,
      region: process.env.SUPABASE_S3_REGION || 'ap-south-1',
      endpoint: process.env.SUPABASE_S3_ENDPOINT!,
      credentials: {
        accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY!,
        secretAccessKey: process.env.SUPABASE_S3_SECRET_KEY!,
      },
    });

    const command = new PutObjectCommand({
      Bucket: 'dresscode',
      Key: fileKey,
      ContentType: contentType,
    });

    // In local development, the presigned URL might not work without real credentials.
    let signedUrl = '';
    try {
       signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    } catch(e) {
       console.warn('Failed to generate presigned URL. This is expected if R2/Supabase credentials are missing.', e);
       signedUrl = 'http://localhost/mock-upload-url'; // local mock
    }

    return NextResponse.json({
      uploadUrl: signedUrl,
      fileKey,
      publicUrl: `https://${process.env.SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/dresscode/${fileKey}` 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to generate upload URL' }, { status: 500 });
  }
}
