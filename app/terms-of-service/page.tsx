import { Metadata } from "next";

export const metadata: Metadata = {
  title: "terms-of-service",
};

const termsOfServicePage: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

      <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
      <p className="mb-6">
        Welcome to <strong>[PARAZONE]</strong>&apos;s Price Comparator for
        Parapharmacy Products (the &quot;Service&quot;). These Terms of Service
        (&quot;TOS&quot;) govern your use of our website and services. By
        accessing or using our Service, you agree to comply with and be bound by
        these terms.
      </p>

      <h2 className="text-2xl font-semibold mb-4">2. Acceptance of Terms</h2>
      <p className="mb-6">
        By accessing or using the Service, you agree to be bound by these TOS
        and our Privacy Policy. If you do not agree with any part of these TOS,
        you must not use the Service.
      </p>

      <h2 className="text-2xl font-semibold mb-4">3. Use of Service</h2>
      <h3 className="text-xl font-semibold mb-2">3.1 Eligibility</h3>
      <p className="mb-4">The Service is available to users of all ages.</p>

      <h3 className="text-xl font-semibold mb-2">3.2 License</h3>
      <p className="mb-4">
        <strong>[PARAZONE]</strong> grants you a limited, non-exclusive,
        non-transferable, and revocable license to use the Service for personal,
        non-commercial purposes.
      </p>

      <h3 className="text-xl font-semibold mb-2">3.3 User Conduct</h3>
      <p className="mb-4">You agree not to:</p>
      <ul className="list-disc list-inside mb-6">
        <li>
          Use the Service for any unlawful purpose or in any way that could harm
          the Service or its users.
        </li>
        <li>Interfere with or disrupt the operation of the Service.</li>
        <li>
          Attempt to gain unauthorized access to the Service or its related
          systems.
        </li>
        <li>
          Use any automated means, including robots, spiders, or data mining
          techniques, to access the Service.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mb-4">
        4. Third-Party Links and Content
      </h2>
      <p className="mb-6">
        The Service may contain links to third-party websites and content. We
        are not responsible for the availability, accuracy, or content of these
        external sites or resources. Your interactions with these third-party
        sites are governed by their respective terms and policies.
      </p>

      <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
      <p className="mb-6">
        All content and materials available on the Service, including text,
        graphics, logos, and software, are the property of{" "}
        <strong>[PARAZONE]</strong> or its licensors and are protected by
        intellectual property laws. You agree not to reproduce, distribute, or
        create derivative works from any content without our prior written
        consent.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        6. Disclaimers and Limitation of Liability
      </h2>
      <h3 className="text-xl font-semibold mb-2">6.1 Disclaimers</h3>
      <p className="mb-6">
        The Service is provided &quot;as is&quot; and &quot;as available&quot;
        without warranties of any kind, either express or implied. We do not
        warrant that the Service will be uninterrupted or error-free.
      </p>

      <h2 className="text-2xl font-semibold mb-4">7. Indemnification</h2>
      <p className="mb-6">
        You agree to indemnify and hold <strong>[PARAZONE]</strong>, its
        affiliates, and their respective officers, directors, employees, and
        agents harmless from any claims, liabilities, damages, losses, and
        expenses, including reasonable attorneys&apos; fees, arising out of or
        in any way connected with your access to or use of the Service.
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        8. Modifications to the Service and Terms
      </h2>
      <p className="mb-6">
        <strong>[PARAZONE]</strong> reserves the right to modify or discontinue,
        temporarily or permanently, the Service or any part thereof, with or
        without notice. We also reserve the right to modify these TOS at any
        time. Your continued use of the Service after any such changes
        constitutes your acceptance of the new TOS.
      </p>

      <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
      <p className="mb-6">
        These TOS and any disputes arising out of or related to the Service
        shall be governed by and construed in accordance with the laws of{" "}
        <strong>[TUNISIA]</strong>, without regard to its conflict of law
        principles.
      </p>
    </div>
  );
};

export default termsOfServicePage;
