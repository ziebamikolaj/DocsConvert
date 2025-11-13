import React from "react";
import Link from "next/link";

import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typographies";

const CookiePolicy = () => {
  return (
    <div className="flex flex-col place-items-center bg-background text-foreground">
      <main className="my-8 flex-1 space-y-5 px-8 lg:w-1/2">
        <TypographyH1 className="mb-8">Cookie Policy</TypographyH1>

        <TypographyH2 className="mb-4">Introduction</TypographyH2>
        <TypographyP>
          DocsConvert uses cookies to improve your experience on our website. By
          using our services, you consent to the use of cookies in accordance
          with this Cookie Policy.
        </TypographyP>

        <TypographyH2 className="mb-4">What Are Cookies?</TypographyH2>
        <TypographyP>
          Cookies are small text files that are placed on your computer or
          mobile device when you visit a website. They are widely used to make
          websites work, or work more efficiently, as well as to provide
          information to the owners of the site.
        </TypographyP>

        <TypographyH2 className="mb-4">How We Use Cookies</TypographyH2>
        <TypographyP>
          We use cookies for various purposes, including:
        </TypographyP>
        <ul className="list-inside list-disc">
          <li>To ensure that our website functions properly</li>
          <li>To understand how you use our website</li>
          <li>To remember your preferences and settings</li>
          <li>To improve the performance of our website</li>
          <li>To provide you with relevant content and advertisements</li>
        </ul>

        <TypographyH2 className="mb-4">Types of Cookies We Use</TypographyH2>
        <TypographyH3 className="mb-2">Essential Cookies</TypographyH3>
        <TypographyP>
          These cookies are necessary for the website to function and cannot be
          switched off in our systems. They are usually only set in response to
          actions made by you which amount to a request for services, such as
          setting your privacy preferences, logging in, or filling in forms.
        </TypographyP>

        <TypographyH3 className="mb-2">Performance Cookies</TypographyH3>
        <TypographyP>
          These cookies allow us to count visits and traffic sources so we can
          measure and improve the performance of our site. They help us to know
          which pages are the most and least popular and see how visitors move
          around the site.
        </TypographyP>

        <TypographyH3 className="mb-2">Functional Cookies</TypographyH3>
        <TypographyP>
          These cookies enable the website to provide enhanced functionality and
          personalization. They may be set by us or by third-party providers
          whose services we have added to our pages.
        </TypographyP>

        <TypographyH3 className="mb-2">Targeting Cookies</TypographyH3>
        <TypographyP>
          These cookies may be set through our site by our advertising partners.
          They may be used by those companies to build a profile of your
          interests and show you relevant adverts on other sites.
        </TypographyP>

        <TypographyH2 className="mb-4">Managing Cookies</TypographyH2>
        <TypographyP>
          You can manage your cookie preferences through your browser settings.
          Most browsers allow you to refuse to accept cookies and to delete
          cookies. The methods for doing so vary from browser to browser, and
          from version to version. You can obtain up-to-date information about
          blocking and deleting cookies via these links:
        </TypographyP>
        <ul className="list-inside list-disc">
          <li>
            <Link
              href="https://support.google.com/chrome/answer/95647?hl=en"
              target="_blank"
              className="text-primary"
            >
              Google Chrome
            </Link>
          </li>
          <li>
            <Link
              href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
              target="_blank"
              className="text-primary"
            >
              Mozilla Firefox
            </Link>
          </li>
          <li>
            <Link
              href="https://support.apple.com/en-us/HT201265"
              target="_blank"
              className="text-primary"
            >
              Apple Safari
            </Link>
          </li>
          <li>
            <Link
              href="https://support.microsoft.com/en-us/help/17442/windows-internet-explorer-delete-manage-cookies"
              target="_blank"
              className="text-primary"
            >
              Microsoft Edge
            </Link>
          </li>
        </ul>

        <TypographyH2 className="mb-4">
          Changes to This Cookie Policy
        </TypographyH2>
        <TypographyP>
          We may update our Cookie Policy from time to time. We will notify you
          of any changes by posting the new Cookie Policy on this page. You are
          advised to review this Cookie Policy periodically for any changes.
          Changes to this Cookie Policy are effective when they are posted on
          this page.
        </TypographyP>

        <TypographyH2 className="mb-4">Contact Us</TypographyH2>
        <TypographyP>
          If you have any questions about this Cookie Policy, please contact us
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

export default CookiePolicy;
