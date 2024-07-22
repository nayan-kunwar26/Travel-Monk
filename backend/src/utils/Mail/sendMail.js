import nodemailer from "nodemailer";

// Function to send an email
export const sendMail = (email) => {
  // Create a transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL_USER,
      pass: NODEMAILER_EMAIL_PASS, // App-specific password generated from Google Account
    },
  });

  // Define email options
  let mailOptions = {
    from: process.env.NODEMAILER_EMAIL_USER,
    to: email,
    subject: "From NK",
    html: `<h2>Verify your email address</h2> <p>You created an account with the email address: ${email} Click "Confirm" to verify the email address and unlock your full account.</p>`,
  };

  return new Promise((resolve, reject) => {
    // Send the email using the transporter
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      } else {
        return resolve("Email Sent Successfully: " + info.response);
      }
    });
  });
};
