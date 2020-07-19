const NODEMAILER = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: 'arbitrium@uwblueprint.org', pass: 'svp2020!' }
};

exports.module = NODEMAILER;
