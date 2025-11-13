import Link from "next/link";

import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typographies";

const TermsOfService = () => {
  return (
    <div className="flex flex-col place-items-center bg-background text-foreground">
      <main className="my-8 flex-1 space-y-5 px-8 lg:w-1/2">
        <TypographyH1 className="mb-8">Terms of Service</TypographyH1>

        <TypographyH2 className="mb-4">Introduction</TypographyH2>
        <TypographyP>
          Welcome to DocsConvert. These Terms of Service (&quot;Terms&quot;)
          govern your use of our website and services. By accessing or using
          DocsConvert, you agree to be bound by these Terms. If you do not agree
          to these Terms, please do not use our services.
        </TypographyP>

        <TypographyH2 className="mb-4">Services Provided</TypographyH2>
        <TypographyP>
          DocsConvert provides a subscription-based document conversion service
          that allows users to upload files in .docx, .doc, .pdf, and .odt
          formats and convert them to HTML/HTM/XML formats.
        </TypographyP>

        <TypographyH2 className="mb-4">User Accounts</TypographyH2>
        <TypographyH3 className="mb-2">Registration</TypographyH3>
        <TypographyP>
          To use certain features of our service, you may need to register for
          an account. You must provide accurate and complete information during
          the registration process.
        </TypographyP>

        <TypographyH3 className="mb-2">Account Security</TypographyH3>
        <TypographyP>
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activities that occur under your
          account. Please notify us immediately of any unauthorized use of your
          account.
        </TypographyP>

        <TypographyH2 className="mb-4">Subscription Plans</TypographyH2>
        <TypographyH3 className="mb-2">Free Tier</TypographyH3>
        <TypographyP>
          Our free tier allows users to convert up to 10 pages per month at no
          cost.
        </TypographyP>

        <TypographyH3 className="mb-2">Paid Tier</TypographyH3>
        <TypographyP>
          For additional page conversions, users can subscribe to our paid tier.
          Pricing and details for the paid tier are available on our website.
        </TypographyP>

        <TypographyH2 className="mb-4">Acceptable Use</TypographyH2>
        <TypographyP>
          You agree not to use DocsConvert for any unlawful or prohibited
          activities, including but not limited to:
        </TypographyP>
        <ul className="list-inside list-disc">
          <li>
            Uploading or sharing content that infringes on any intellectual
            property rights
          </li>
          <li>
            Engaging in any activity that disrupts or interferes with our
            services
          </li>
          <li>
            Attempting to gain unauthorized access to our systems or user
            accounts
          </li>
        </ul>

        <TypographyH2 className="mb-4">Intellectual Property</TypographyH2>
        <TypographyP>
          All content and materials available on DocsConvert, including but not
          limited to text, graphics, logos, and software, are the property of
          DocsConvert or its licensors and are protected by intellectual
          property laws.
        </TypographyP>

        <TypographyH2 className="mb-4">Termination</TypographyH2>
        <TypographyP>
          We reserve the right to terminate or suspend your account and access
          to our services at our sole discretion, without notice, for conduct
          that we believe violates these Terms or is harmful to other users of
          DocsConvert, us, or third parties, or for any other reason.
        </TypographyP>
        <TypographyH2 className="mb-4">Limitation of Liability</TypographyH2>
        <TypographyP>
          To the fullest extent permitted by law, DocsConvert shall not be
          liable for any indirect, incidental, special, consequential, or
          punitive damages, or any loss of profits or revenues, whether incurred
          directly or indirectly, or any loss of data, use, goodwill, or other
          intangible losses, resulting from:
        </TypographyP>
        <ul className="list-inside list-disc">
          <li>Your use or inability to use our services</li>
          <li>
            Any unauthorized access to or use of our servers and/or any personal
            information stored therein
          </li>
          <li>
            Any interruption or cessation of transmission to or from our
            services
          </li>
          <li>
            Any bugs, viruses, trojan horses, or the like that may be
            transmitted to or through our services by any third party
          </li>
          <li>
            Any errors or omissions in any content or for any loss or damage
            incurred as a result of the use of any content posted, emailed,
            transmitted, or otherwise made available through the services
          </li>
        </ul>

        <TypographyH2 className="mb-4">Changes to Terms</TypographyH2>
        <TypographyP>
          We reserve the right to modify these Terms at any time. We will notify
          you of any changes by posting the new Terms on our website. Your
          continued use of DocsConvert after any such changes constitutes your
          acceptance of the new Terms.
        </TypographyP>

        <TypographyH2 className="mb-4">Contact Us</TypographyH2>
        <TypographyP>
          If you have any questions about these Terms, please contact us at{" "}
          <Link href="mailto:support@DocsConvert.com" className="text-primary">
            support@DocsConvert.com
          </Link>
          .
        </TypographyP>
      </main>
    </div>
  );
};

export default TermsOfService;
