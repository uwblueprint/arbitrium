const nodemailer = require("nodemailer");
const NODEMAILER_CONFIG = require("./nodemailer.config");
const transporter = nodemailer.createTransport(NODEMAILER_CONFIG.module);

const EMAIL_FROM = `"Arbitrium" <arbitrium@uwblueprint.org>`;

function newAccountEmailTemplate(appName, user, passwordLink) {
  const appLink = "https://arbitrium.web.app";
  const name = user.preferredName || user.name;
  return `
  Hi there${name ? " " + name : ""},
  <br><br>
  Welcome to ${appName}! Your account username is <strong>${user.email}</strong>
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
  Your ${appName} team`;
}

async function sendNewAccountEmail(user, passwordLink, appName) {
  const mailOptions = {
    from: EMAIL_FROM,
    to: user.email,
    subject: `Welcome to ${appName}`,
    bcc: "arbitrium@uwblueprint.org",
    html: newAccountEmailTemplate(appName, user, passwordLink)
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

module.exports.sendWelcomeEmail = (user, link) => {
  return sendNewAccountEmail(user, link, "Arbitrium");
};
