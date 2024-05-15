const {Storage} = require('@google-cloud/storage');

const storage = new Storage();

const bucketName = 'mybucket-dandi-ganteng';
const filePath = './image/dicoding-header-logo.png';

async function getOrCreateBucket(bucketName) {
    const bucket = storage.bucket(bucketName);
    try {
        const [metadata] = await bucket.getMetadata();
        console.log(`Bucket ${metadata.name} sudah tersedia!`);
        return bucket;
    } catch (error) {
        const optionsCreateBucket = {
            location: 'ASIA-SOUTHEAST2'
       }

    //    create bucket
    await storage.createBucket(bucketName, optionsCreateBucket);
    console.log(`${bucketName} bucket created successfully`);
    return bucket;
    }
}

async function upload(bucket) {
    try {
        const customMetadata = {
            contentType: 'image/jpeg',
            metadata: {
                type: "header-logo"
            }
        }

        const optionsUploadObject = {
            destination: 'dicoding-header-logo.png',
            preconditionOpts: {ifGenerationMatch:0},
            metadata: customMetadata
        };


        await storage.bucket(bucketName).upload(filePath, optionsUploadObject);
        console.log(`${filePath} uploaded to ${bucketName} bucket`);
        
    } catch (uploadError) {
        console.error(`Gagal mengupload ${filePath}:`, uploadError.message);
        
    }
}

// Catch Error
getOrCreateBucket(bucketName).then((bucket) => upload(bucket)).catch(console.error)