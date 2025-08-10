const nodemailer = require("nodemailer");

const sendEmail = async ({ name, email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, // Or your personal email
    subject: `New Contact Form Submission: ${subject}`,
    html: `
      <h3>New Message from Portfolio Contact Form</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
