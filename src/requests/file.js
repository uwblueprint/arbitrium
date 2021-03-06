import { GET, POST, FILE, DELETE } from "./Helper.js";

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

async function deleteFile(bucketname, filename) {
  return DELETE(`/api/files/delete/${bucketname}`, filename);
}

async function fileUpload(bucketname, filename, formData) {
  return FILE(`/api/files/upload/${bucketname}`, formData, filename);
}

async function downloadFile({ bucketname, filename }) {
  if (bucketname === "arbitrium-public") {
    //This route doesn't require authentication
    return GET(`/api/files/download/public`, filename, false);
  } else {
    return GET(`/api/files/download/${bucketname}`, filename);
  }
}

export {
  listBuckets,
  listFilesofBucket,
  createBucket,
  deleteBucket,
  fileUpload,
  downloadFile,
  deleteFile
};
