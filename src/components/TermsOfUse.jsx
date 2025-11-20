import React from 'react';

const TermsOfUse = () => {
  return (
    <div className="py-5" style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #1a3c5e, #0a1e2f)' }}>
      <div className="container text-white py-5">
        <h1 className="display-4 fw-bold mb-4 text-center">Terms of Use</h1>
        <p className="lead mb-5 text-center">
          Welcome to Innovative Medical Solutions (IMS). By accessing or using our website, you agree to comply with and be bound by the following terms and conditions.
        </p>
        <div className="bg-dark p-5 rounded shadow-lg">
          <h2 className="fw-bold mb-3">1. Acceptance of Terms</h2>
          <p>
            By using this website, you agree to these Terms of Use. If you do not agree, please do not use the site.
          </p>
          <h2 className="fw-bold mb-3">2. Use of the Website</h2>
          <p>
            You may use the website for lawful purposes only. You agree not to use the site in any way that violates any applicable federal, state, local, or international law.
          </p>
          <h2 className="fw-bold mb-3">3. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and software, is the property of IMS or its licensors and is protected by copyright and other intellectual property laws.
          </p>
          <h2 className="fw-bold mb-3">4. Disclaimer of Warranties</h2>
          <p>
            The website is provided "as is" without any warranties, express or implied. IMS disclaims all warranties, including but not limited to implied warranties of merchantability and fitness for a particular purpose.
          </p>
          <h2 className="fw-bold mb-3">5. Limitation of Liability</h2>
          <p>
            IMS shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the website.
          </p>
          <h2 className="fw-bold mb-3">6. Governing Law</h2>
          <p>
            These terms shall be governed by the laws of the State of Illinois without regard to its conflict of law provisions.
          </p>
          <h2 className="fw-bold mb-3">7. Changes to Terms</h2>
          <p>
            IMS reserves the right to modify these terms at any time. Your continued use of the site after changes constitutes acceptance of the new terms.
          </p>
          <p className="mt-5">
            Last updated: November 19, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;