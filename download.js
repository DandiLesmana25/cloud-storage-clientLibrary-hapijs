const {Storage} = require('@google-cloud/storage');
 
const storage = new Storage();
const bucketName = 'mybucket-dandi-ganteng'
const fileName = 'dicoding-header-logo.png'

async function download() {
    const options = {
        destination: './image/dicoding-download.png'
    }
 
    await storage.bucket(bucketName).file(fileName).download(options);
    console.log('Objek berhasil didownload');
}

download().catch(console.error)