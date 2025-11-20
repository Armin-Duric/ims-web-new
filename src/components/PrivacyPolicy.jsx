import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="py-5" style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #1a3c5e, #0a1e2f)' }}>
      <div className="container text-white py-5">
        <h1 className="display-4 fw-bold mb-4 text-center">Privacy Policy</h1>
        <p className="lead mb-5 text-center">
          At Innovative Medical Solutions (IMS), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.
        </p>
        <div className="bg-dark p-5 rounded shadow-lg">
          <h2 className="fw-bold mb-3">1. Information We Collect</h2>
          <p>
            We collect personal information such as name, email, phone number, and practice details when you submit forms or contact us.
          </p>
          <h2 className="fw-bold mb-3">2. How We Use Your Information</h2>
          <p>
            Your information is used to provide services, respond to inquiries, improve our website, and comply with legal obligations.
          </p>
          <h2 className="fw-bold mb-3">3. Sharing Your Information</h2>
          <p>
            We do not sell your information. We may share it with third-party service providers for business purposes or as required by law.
          </p>
          <h2 className="fw-bold mb-3">4. Security</h2>
          <p>
            We implement reasonable security measures to protect your information, including encryption and access controls.
          </p>
          <h2 className="fw-bold mb-3">5. Cookies and Tracking</h2>
          <p>
            We use cookies to enhance your experience. You can manage cookie preferences through your browser settings.
          </p>
          <h2 className="fw-bold mb-3">6. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. Contact us to exercise these rights.
          </p>
          <h2 className="fw-bold mb-3">7. Changes to Policy</h2>
          <p>
            We may update this policy periodically. Changes will be posted on this page.
          </p>
          <p className="mt-5">
            Last updated: November 19, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;