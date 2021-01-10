const express = require("express");

//https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-creating-buckets.html
const AWS = require("aws-sdk");
AWS.config.loadFromPath("./AWScredentials.json");
const multer = require("multer");
const router = express.Router();

const { isAuthenticated } = require("../middlewares/auth");
router.use(isAuthenticated);

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

router.get("/listFiles/:bucketname", async function(req, res) {
  if (!req.params.bucketname) {
    res.status(400).send("Bad Request. Missing param 'bucketname'");
    return;
  }
  // Create the parameters for calling listObjects
  const bucketParams = {
    Bucket: req.params.bucketname
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

router.post("/createBucket/:bucketname", async function(req, res) {
  if (!req.params.bucketname) {
    res.status(400).send("Bad Request. Missing param 'bucketname'");
    return;
  }
  const bucketParams = {
    Bucket: req.params.bucketname
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

router.delete("/deleteBucket/:bucketname", async function(req, res) {
  if (!req.params.bucketname) {
    res.status(400).send("Bad Request. Missing param 'bucketname'");
    return;
  }
  const bucketParams = {
    Bucket: req.params.bucketname
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

router.post("/upload/:bucketname", multer().single("file"), async function(
  req,
  res
) {
  if (!req.params.bucketname) {
    res.status(400).send("Bad Request. Missing param 'bucketname'");
    return;
  }
  if (!req.headers.filepath) {
    res.status(400).send("Bad Request. Missing header 'filepath'");
    return;
  }

  // Configure the file stream and obtain the upload parameters
  const uploadParams = {
    Bucket: req.params.bucketname,
    Key: req.headers.filepath,
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

router.get("/download/:bucketname", async function(req, res) {
  if (!req.params.bucketname) {
    res.status(400).send("Bad Request. Missing param 'bucketname'");
    return;
  }
  if (!req.headers.filepath) {
    res.status(400).send("Bad Request. Missing header 'filepath'");
    return;
  }
  // Create the parameters for calling getObject
  const bucketParams = {
    Bucket: req.params.bucketname,
    Key: req.headers.filepath
  };
  try {
    s3.getObject(bucketParams, function(err, data) {
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

module.exports = router;
