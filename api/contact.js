// pages/api/contact.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message, patientId } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  // Determine recipient based on whether this is a patient inquiry
  const isPatientInquiry = subject.includes('Billing') || 
                           subject.includes('Payment') || 
                           subject.includes('Insurance') || 
                           subject.includes('Statement') || 
                           subject.includes('Financial') || 
                           patientId; // patientId is only sent from Patients form

  const recipientEmail = isPatientInquiry 
    ? process.env.PATIENT_EMAIL_TO   // e.g. billing@ims.com
    : process.env.GENERAL_EMAIL_TO;  // e.g. info@ims.com

  if (!recipientEmail) {
    console.error('Missing recipient email env var');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const transporter = nodemailer.createTransport({
    service: 'outlook', // or 'gmail'
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  const mailSubject = isPatientInquiry 
    ? `[Patient Inquiry] ${subject} - ${name}`
    : `Contact Form: ${subject}`;

  const mailText = isPatientInquiry
    ? `Patient Inquiry Details:
Name: ${name}
Email: ${email}
${patientId ? `Patient ID/Account: ${patientId}\n` : ''}Phone: ${req.body.phone || 'Not provided'}
Subject: ${subject}

Message:
${message}`
    : `Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`;

  const mailHtml = isPatientInquiry
    ? `
      <h3>New Patient Inquiry</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${patientId ? `<p><strong>Patient ID/Account:</strong> ${patientId}</p>` : ''}
      ${req.body.phone ? `<p><strong>Phone:</strong> ${req.body.phone}</p>` : ''}
      <p><strong>Subject:</strong> ${subject}</p>
      <hr>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `
    : `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `;

  const mailOptions = {
    from: `"Website Contact" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    replyTo: email,
    subject: mailSubject,
    text: mailText,
    html: mailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', recipientEmail);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Nodemailer failed:', error);
    res.status(500).json({ 
      error: 'Failed to send email',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}