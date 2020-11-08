const express = require("express");

//https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-2" });
AWS.config.loadFromPath("./AWScredentials.json");
const multer = require("multer");
// allows routes to be sent out
const router = express.Router();

// Create S3 service object
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

router.get("/listBuckets", async function(req, res) {
  try {
    s3.listBuckets(function(err, data) {
      if (err) {
        console.info("Error", err);
        res.status(500).send(err);
      } else {
        console.info("Success", data.Buckets);
        res.status(200).json(data.Buckets);
      }
    });
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

router.get("/listFiles", async function(req, res) {
  if (!req.headers.bucketname) {
    res.status(400).send("Bad Request. Missing header 'bucketname'");
  }
  // Create the parameters for calling listObjects
  const bucketParams = {
    Bucket: req.headers.bucketname
  };
  try {
    s3.listObjects(bucketParams, function(err, data) {
      if (err) {
        console.info("Error", err);
        res.status(500).send(err);
      } else {
        console.info("Success", data);
        res.status(200).json(data);
      }
    });
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

router.post("/createBucket", async function(req, res) {
  if (!req.headers.bucketname) {
    res.status(400).send("Bad Request. Missing header 'bucketname'");
  }
  const bucketParams = {
    Bucket: req.headers.bucketname
  };
  try {
    s3.createBucket(bucketParams, function(err, data) {
      if (err) {
        console.info("Error", err);
        res.status(500).send(err);
      } else {
        console.info("Success", data.Location);
        res.status(200).json(data.Location);
      }
    });
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

router.delete("/deleteBucket", async function(req, res) {
  if (!req.headers.bucketname) {
    res.status(400).send("Bad Request. Missing header 'bucketname'");
  }
  const bucketParams = {
    Bucket: req.headers.bucketname
  };
  try {
    s3.deleteBucket(bucketParams, function(err, data) {
      if (err) {
        console.info("Error", err);
        res.status(500).send(err);
      } else {
        console.info("Success", data.Location);
        res.status(200).json(data.Location);
      }
    });
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

router.post("/upload", multer().single("file"), async function(req, res) {
  console.info(req.file);
  if (!req.headers.bucketname) {
    res.status(400).send("Bad Request. Missing header 'bucketname'");
  }
  if (!req.headers.filename) {
    res.status(400).send("Bad Request. Missing header 'filename'");
  }

  // Configure the file stream and obtain the upload parameters
  const uploadParams = {
    Bucket: req.headers.bucketname,
    Key: req.headers.filename,
    Body: ""
  };

  //Add the file buffer to the Body for the S3 upload
  try {
    uploadParams.Body = req.file.buffer;
  } catch (e) {
    res
      .status(400)
      .send(
        "Error bad file buffer. Please make sure you are using 'form-data' with the key 'file'"
      );
  }

  //Upload the file to the S3 bucket. The response will include the url to the file
  try {
    s3.upload(uploadParams, function(err, data) {
      if (err) {
        console.info("Error", err);
        res.status(500).send(err);
      } else {
        console.info("Success", data.Location);
        res.status(200).json(data.Location);
      }
    });
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

module.exports = router;
