import React from "react";
import Link from "next/link";

import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typographies";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col place-items-center bg-background text-foreground">
      <main className="my-8 flex-1 space-y-5 px-8 lg:w-1/2">
        <TypographyH1 className="mb-8">Privacy Policy</TypographyH1>

        <TypographyH2 className="mb-4">Introduction</TypographyH2>
        <TypographyP>
          Your privacy is important to us. This Privacy Policy explains how
          DocsConvert collects, uses, and discloses your personal information.
          By using our services, you agree to the collection and use of
          information in accordance with this policy.
        </TypographyP>

        <TypographyH2 className="mb-4">Information We Collect</TypographyH2>
        <TypographyH3 className="mb-2">Personal Information</TypographyH3>
        <TypographyP>
          While using our service, we may ask you to provide us with certain
          personally identifiable information that can be used to contact or
          identify you. Personally identifiable information may include, but is
          not limited to, your name, email address, and payment information.
        </TypographyP>

        <TypographyH3 className="mb-2">Usage Data</TypographyH3>
        <TypographyP>
          We may also collect information on how the service is accessed and
          used. This usage data may include information such as your
          computer&apos;s Internet Protocol (IP) address, browser type, browser
          version, the pages of our service that you visit, the time and date of
          your visit, the time spent on those pages, and other diagnostic data.
        </TypographyP>

        <TypographyH2 className="mb-4">Use of Data</TypographyH2>
        <TypographyP>
          DocsConvert uses the collected data for various purposes:
        </TypographyP>
        <ul className="list-inside list-disc">
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>
            To allow you to participate in interactive features of our service
            when you choose to do so
          </li>
          <li>To provide customer support</li>
          <li>
            To gather analysis or valuable information so that we can improve
            our service
          </li>
          <li>To monitor the usage of our service</li>
          <li>To detect, prevent, and address technical issues</li>
        </ul>

        <TypographyH2 className="mb-4">Data Security</TypographyH2>
        <TypographyP>
          The security of your data is important to us, but remember that no
          method of transmission over the Internet, or method of electronic
          storage is 100% secure. While we strive to use commercially acceptable
          means to protect your personal data, we cannot guarantee its absolute
          security.
        </TypographyP>

        <TypographyH2 className="mb-4">
          Your Data Protection Rights
        </TypographyH2>
        <TypographyP>
          Depending on your location, you may have the following rights
          regarding your personal data:
        </TypographyP>
        <ul className="list-inside list-disc">
          <li>
            The right to access – You have the right to request copies of your
            personal data.
          </li>
          <li>
            The right to rectification – You have the right to request that we
            correct any information you believe is inaccurate or incomplete.
          </li>
          <li>
            The right to erasure – You have the right to request that we erase
            your personal data, under certain conditions.
          </li>
          <li>
            The right to restrict processing – You have the right to request
            that we restrict the processing of your personal data, under certain
            conditions.
          </li>
          <li>
            The right to object to processing – You have the right to object to
            our processing of your personal data, under certain conditions.
          </li>
          <li>
            The right to data portability – You have the right to request that
            we transfer the data that we have collected to another organization,
            or directly to you, under certain conditions.
          </li>
        </ul>

        <TypographyH2 className="mb-4">
          Changes to This Privacy Policy
        </TypographyH2>
        <TypographyP>
          We may update our Privacy Policy from time to time. We will notify you
          of any changes by posting the new Privacy Policy on this page. You are
          advised to review this Privacy Policy periodically for any changes.
          Changes to this Privacy Policy are effective when they are posted on
          this page.
        </TypographyP>

        <TypographyH2 className="mb-4">Contact Us</TypographyH2>
        <TypographyP>
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <Link href="mailto:support@docsconvert.com" className="text-primary">
            support@docsconvert.com
          </Link>
          .
        </TypographyP>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
