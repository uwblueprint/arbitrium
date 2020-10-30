const express = require("express");

// allows routes to be sent out
const router = express.Router();
const { sendFeedbackEmail } = require("../nodemailer");

router.post("/", async function(req, res) {
  try {
    const response = await sendFeedbackEmail(req.body);
    res.status(201).json({
      message: "Sent feedback email successfully",
      response: response
    });
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

module.exports = router;
