import { GET, POST, FILE } from "./Helper.js";

//Getting a file will be done by using the bucket URL and the bucket + filename
//Ex: arbitrium.s3.us-east-2.amazonaws.com/bucketname/filename.png

//File access must be setup in AWS so our frontend prod app can download the file

async function listBuckets() {
  return GET("/api/files/listBuckets");
}

async function listFilesofBucket(bucketname) {
  return GET(`/api/files/listfiles/${bucketname}`);
}

//Used when creating a program. Each program will have its own bucket
async function createBucket(bucketname) {
  return POST(`/api/files/createBucket/${bucketname}`, {});
}

async function deleteBucket(bucketname) {
  return POST(`/api/files/deleteBucket/${bucketname}`);
}

async function fileUpload(bucketname, filename, formData) {
  return FILE(`/api/files/upload/${bucketname}/${filename}`, formData);
}

export {
  listBuckets,
  listFilesofBucket,
  createBucket,
  deleteBucket,
  fileUpload
};
