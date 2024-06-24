// components/PrivacyPolicyPage.tsx
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "privacy-policy",
};
const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p>
        <strong>Effective Date:</strong> 20/06/2024
      </p>
      <p className="mb-6">
        Your privacy is important to us. This privacy policy explains how we
        collect, use, and protect your personal information when you use our
        price comparator website.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        1. How We Use Your Information
      </h2>
      <p className="mb-4">
        We use the collected information for various purposes:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>
          To Provide and Maintain Our Service: Ensure the smooth operation of
          our website
        </li>
        <li>
          To Improve Our Service: Analyze user behavior to enhance features and
          usability
        </li>
        <li>
          To Communicate With You: Send updates, newsletters, and promotional
          offers (with your consent)
        </li>
        <li>
          To Process Transactions: Handle payments and fulfill orders (if
          applicable)
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        2. Data Sharing and Disclosure
      </h2>
      <p className="mb-4">
        We do not sell, trade, or otherwise transfer your personal information
        to outside parties except in the following circumstances:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>
          With Your Consent: We may share information with third parties if you
          give us explicit consent
        </li>
        <li>
          For Legal Reasons: To comply with legal obligations, protect our
          rights, and ensure the safety of our users
        </li>
        <li>
          Service Providers: We may share information with trusted service
          providers who assist us in operating our website and conducting our
          business, subject to strict confidentiality agreements
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        3. Cookies and Tracking Technologies
      </h2>
      <p className="mb-4">
        We use cookies and similar tracking technologies to:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>Enhance User Experience: Remember your preferences and settings</li>
        <li>
          Analyze Usage: Understand and analyze how users interact with our site
        </li>
        <li>
          Provide Targeted Advertising: Show relevant advertisements based on
          your browsing behavior
        </li>
      </ul>
      <p className="mb-6">
        You can control cookie settings through your browser preferences.
      </p>

      <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
      <p className="mb-4">
        We implement a variety of security measures to maintain the safety of
        your personal information, including:
      </p>
      <ul className="list-disc list-inside mb-6">
        <li>
          Encryption: Data transmitted over the internet is encrypted using
          SSL/TLS
        </li>
        <li>
          Access Controls: Restricted access to personal information to
          authorized personnel only
        </li>
        <li>Regular Audits: Conduct regular security audits and updates</li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">5. Third-Party Links</h2>
      <p className="mb-6">
        Our website may contain links to third-party sites. We are not
        responsible for the privacy practices or content of these sites. We
        encourage you to review the privacy policies of these third parties.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        6. Changes to This Privacy Policy
      </h2>
      <p className="mb-6">
        We may update this privacy policy from time to time. We will notify you
        of any changes by posting the new policy on this page. Your continued
        use of our site after any changes constitutes your acceptance of the new
        policy.
      </p>
    </div>
  );
};

export default PrivacyPolicyPage;
