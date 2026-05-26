const nodemailer = require("nodemailer");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, company, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    return res.status(500).json({ error: "Email service not configured." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailPass },
  });

  try {
    await transporter.sendMail({
      from: `"Qioseon Labs Contact" <${gmailUser}>`,
      to: "qioseonlabs@gmail.com",
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` — ${company}` : ""}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#b8860b;">New Contact Form Submission</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;font-weight:bold;width:100px;">Name</td><td style="padding:8px 0;">${name}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            ${company ? `<tr><td style="padding:8px 0;font-weight:bold;">Company</td><td style="padding:8px 0;">${company}</td></tr>` : ""}
            <tr><td style="padding:8px 0;font-weight:bold;vertical-align:top;">Message</td><td style="padding:8px 0;">${message.replace(/\n/g, "<br/>")}</td></tr>
          </table>
          <hr style="margin:24px 0;border:none;border-top:1px solid #eee;"/>
          <p style="color:#999;font-size:12px;">Sent from the Qioseon Labs website contact form.</p>
        </div>
      `,
    });
    return res.json({ success: true });
  } catch (err) {
    console.error("Failed to send email:", err);
    return res.status(500).json({ error: "Failed to send message. Please try again." });
  }
};
