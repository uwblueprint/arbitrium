import { GET, POST, PATCH, DELETE } from "./Helper.js";

async function deleteBucketAPI(bucketId) {
  DELETE(`/api/users/${bucketId}`);
}

async function getAllBucketsAPI() {
  return GET(`/api/files/listBuckets`);
}

async function getListOfFilesAPI(bucketId) {
  return GET(`/api/files/listFiles/${bucketId}`);
}

async function createBucketAPI(bucketId) {
  return POST(`/api/files/createBucket/${bucketId}`);
}

async function uploadFileAPI(bucketId, filename) {
  return POST(`/api/files/createBucket/${bucketId}/${filename}`);
}

export {
  deleteBucketAPI,
  getListOfFilesAPI,
  getAllBucketsAPI,
  createBucketAPI,
  uploadFileAPI
};
