import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  forcePathStyle: true,
  region: process.env.SUPABASE_S3_REGION || 'ap-south-1',
  endpoint: process.env.SUPABASE_S3_ENDPOINT,
  credentials: {
    accessKeyId: process.env.SUPABASE_S3_ACCESS_KEY,
    secretAccessKey: process.env.SUPABASE_S3_SECRET_KEY,
  },
});

async function run() {
  try {
    console.log('Testing connection to Supabase S3...');
    const command = new ListObjectsV2Command({
      Bucket: 'dresscode',
      MaxKeys: 1,
    });
    const response = await s3Client.send(command);
    console.log('Successfully connected to Supabase S3 bucket "dresscode"!');
    console.log('Objects returned:', response.Contents ? response.Contents.length : 0);
  } catch (error) {
    console.error('Failed to connect to Supabase S3:', error.message);
  }
}

run();
