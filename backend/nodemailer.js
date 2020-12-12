const nodemailer = require("nodemailer");
const NODEMAILER_CONFIG = require("./nodemailer.config");
const transporter = nodemailer.createTransport(NODEMAILER_CONFIG.module);

const EMAIL_FROM = `"Arbitrium" <arbitrium@uwblueprint.org>`;

function newAccountEmailTemplate(email, passwordLink) {
  const appLink = "https://arbitrium.web.app";
  return `
  Hi there,
  <br><br>
  Welcome to Arbitrium! Your account username is <strong>${email}</strong>
  To set up your password, <a href="${passwordLink}">please follow the instructions here</a>.
  <br><br>
  Password setup link expired? <a href="${appLink}/reset-password">Please click here</a> and we'll email you a new link shortly.
  <br><br>
  Head over to <a href="${appLink}">Arbitrium</a> to begin reviewing candidates.
  Here's our <a href="https://docs.google.com/document/d/18vOOYwK9Mp1-R0uGlKmyMwx_mq4FOlaFINrdpur1jfA/edit?usp=sharing]">user guide</a> to help you get started on our platform.
  <br><br>
  If you have any questions, feel free to reply to this email.
  <br><br>
  Thanks,
  <br>
  Your Arbitrium team`;
}

async function sendNewAccountEmail(email, passwordLink) {
  const mailOptions = {
    from: EMAIL_FROM,
    to: email,
    subject: `Welcome to Arbitrium`,
    bcc: "arbitrium@uwblueprint.org",
    html: newAccountEmailTemplate(email, passwordLink)
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return Promise.reject(error);
    } else {
      return info;
    }
  });
}

async function sendFeedbackEmail(feedback) {
  const mailOptions = {
    from: EMAIL_FROM,
    to: "arbitrium@uwblueprint.org",
    subject: `[${feedback.feedbackType}] Feedback from ${feedback.user.email}`,
    html: `Experience: ${feedback.experience}
    <br><br>
    Feedback: ${feedback.comment}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return Promise.reject(error);
    } else {
      return info;
    }
  });
}

module.exports.sendWelcomeEmail = (email, link) => {
  return sendNewAccountEmail(email, link);
};

module.exports.sendFeedbackEmail = (feedback) => {
  return sendFeedbackEmail(feedback);
};
