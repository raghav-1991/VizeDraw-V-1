// Legal pages: Privacy Notice, Terms of Use and Cookie Preferences.
// Converted verbatim from the approved text files (VizeDraw-Content/*.txt).
// Inline [label](href) links are rendered as links.

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'h3'; text: string; badge?: string }
  | { type: 'list'; items: string[] }

export interface LegalSection {
  heading: string
  id: string
  blocks: LegalBlock[]
}

export type LegalKey = 'privacy' | 'terms' | 'cookies'

export interface LegalDoc {
  key: LegalKey
  route: string
  title: string
  intro: string[]
  sections: LegalSection[]
}

export const legalDocs: LegalDoc[] = [
  {
    "key": "privacy",
    "route": "/privacy-notice",
    "title": "Privacy Notice",
    "intro": [
      "VizeDraw is a drawing workspace built for teams that work with technical drawings. VizeDraw helps organizations organize drawing sets, review and mark up drawings, compare revisions, manage quantities, collaborate with team members, and maintain controlled access to project information.",
      "This Privacy Notice explains how VizeDraw collects, uses, stores, and protects information when you visit our website, use VizeDraw, request a demo, contact us, or otherwise interact with our services.",
      "VizeDraw is built by Zenitude (“Zenitude,” “VizeDraw,” “we,” “us,” or “our”)."
    ],
    "sections": [
      {
        "heading": "1. Information We Collect",
        "id": "information-we-collect",
        "blocks": [
          {
            "type": "p",
            "text": "We may collect information that you provide directly to us, information generated through your use of VizeDraw, and certain technical information collected automatically."
          },
          {
            "type": "h3",
            "text": "Information You Provide"
          },
          {
            "type": "p",
            "text": "Depending on how you interact with VizeDraw, we may collect:"
          },
          {
            "type": "list",
            "items": [
              "Name and contact information",
              "Business email address",
              "Company or organization name",
              "Job title or role",
              "Phone number, where provided",
              "Account and login information",
              "Billing and subscription information",
              "Information submitted through demo, contact, or support forms",
              "Communications you send to us",
              "Information provided during customer onboarding or support"
            ]
          },
          {
            "type": "h3",
            "text": "Information You Upload"
          },
          {
            "type": "p",
            "text": "When you use VizeDraw, you may upload or create content such as:"
          },
          {
            "type": "list",
            "items": [
              "PDF drawing sets",
              "Technical drawings",
              "Project documents",
              "Markups and annotations",
              "Comments and review information",
              "Revision information",
              "Takeoff and quantity information",
              "Project and organization information",
              "Other content you choose to store or process through VizeDraw"
            ]
          },
          {
            "type": "p",
            "text": "You retain responsibility for ensuring that you have the necessary rights and permissions to upload and share this content."
          },
          {
            "type": "h3",
            "text": "Automatically Collected Information"
          },
          {
            "type": "p",
            "text": "When you access our website or services, we may automatically collect certain technical information, including:"
          },
          {
            "type": "list",
            "items": [
              "IP address",
              "Browser type and version",
              "Device type",
              "Operating system",
              "Referring website",
              "Pages or features accessed",
              "Date and time of access",
              "General usage and interaction information",
              "Error and diagnostic information",
              "Security and authentication information"
            ]
          },
          {
            "type": "p",
            "text": "We use this information to operate, secure, maintain, and improve our services."
          }
        ]
      },
      {
        "heading": "2. How We Use Information",
        "id": "how-we-use-information",
        "blocks": [
          {
            "type": "p",
            "text": "We may use information we collect to:"
          },
          {
            "type": "list",
            "items": [
              "Provide and operate VizeDraw",
              "Create and manage user accounts",
              "Process subscriptions and payments",
              "Provide customer support",
              "Respond to inquiries and demo requests",
              "Store and process uploaded drawings and project information",
              "Enable collaboration, sharing, revision management, markups, and other product functionality",
              "Authenticate users and manage permissions",
              "Monitor service performance and reliability",
              "Detect, prevent, and investigate fraud, abuse, unauthorized access, and security incidents",
              "Maintain audit and security records",
              "Improve and develop our products and services",
              "Communicate with users about their accounts, services, updates, and support",
              "Comply with legal and regulatory obligations"
            ]
          },
          {
            "type": "p",
            "text": "We do not use customer-uploaded drawings or project content for purposes unrelated to providing, securing, maintaining, or improving the services unless permitted by applicable law or otherwise authorized by the customer."
          }
        ]
      },
      {
        "heading": "3. Legal Bases for Processing",
        "id": "legal-bases-for-processing",
        "blocks": [
          {
            "type": "p",
            "text": "Where applicable law requires a legal basis for processing personal information, we may process information based on:"
          },
          {
            "type": "list",
            "items": [
              "Performance of a contract",
              "Compliance with legal obligations",
              "Our legitimate business interests",
              "Your consent",
              "Protection of our services, users, and property"
            ]
          },
          {
            "type": "p",
            "text": "Where we rely on consent, you may withdraw your consent where permitted by applicable law."
          }
        ]
      },
      {
        "heading": "4. Cookies and Similar Technologies",
        "id": "cookies-and-similar-technologies",
        "blocks": [
          {
            "type": "p",
            "text": "VizeDraw may use cookies and similar technologies to operate our website and application, remember preferences, understand website usage, maintain security, and improve our services."
          },
          {
            "type": "p",
            "text": "Cookies may include:"
          },
          {
            "type": "list",
            "items": [
              "Essential cookies required for website or application functionality",
              "Preference cookies used to remember settings",
              "Analytics cookies used to understand website usage and performance",
              "Marketing or advertising cookies, where applicable and where permitted"
            ]
          },
          {
            "type": "p",
            "text": "You can manage certain cookie preferences through our Cookie Preferences page or through your browser settings."
          }
        ]
      },
      {
        "heading": "5. How We Share Information",
        "id": "how-we-share-information",
        "blocks": [
          {
            "type": "p",
            "text": "We may share information with service providers and other parties when necessary to operate our business and provide VizeDraw."
          },
          {
            "type": "p",
            "text": "These parties may include:"
          },
          {
            "type": "list",
            "items": [
              "Cloud hosting and infrastructure providers",
              "Authentication and identity providers",
              "Payment and billing providers",
              "Email and communication providers",
              "Analytics and monitoring providers",
              "Customer support providers",
              "Security and fraud-prevention providers",
              "Professional advisers, such as legal, accounting, or consulting providers"
            ]
          },
          {
            "type": "p",
            "text": "Service providers are expected to process information according to appropriate contractual and security requirements."
          },
          {
            "type": "p",
            "text": "We may also disclose information:"
          },
          {
            "type": "list",
            "items": [
              "When required by law or legal process",
              "To protect the rights, safety, or property of VizeDraw, our users, or others",
              "To investigate fraud, abuse, or security incidents",
              "In connection with a merger, acquisition, financing, restructuring, sale of assets, or similar corporate transaction"
            ]
          },
          {
            "type": "p",
            "text": "We do not sell personal information in exchange for money."
          }
        ]
      },
      {
        "heading": "6. Customer Content",
        "id": "customer-content",
        "blocks": [
          {
            "type": "p",
            "text": "Customer-uploaded drawings, documents, markups, comments, and project information are treated as customer content."
          },
          {
            "type": "p",
            "text": "VizeDraw processes customer content to provide the functionality requested by the customer, including storage, viewing, searching, collaboration, revision management, comparison, measurement, takeoff, and related services."
          },
          {
            "type": "p",
            "text": "Access to customer content is controlled through account permissions and organizational access controls."
          },
          {
            "type": "p",
            "text": "Customers are responsible for determining what information they upload and who should have access to it."
          }
        ]
      },
      {
        "heading": "7. Data Security",
        "id": "data-security",
        "blocks": [
          {
            "type": "p",
            "text": "We use reasonable technical and organizational measures designed to protect information from unauthorized access, alteration, disclosure, loss, or destruction."
          },
          {
            "type": "p",
            "text": "Our security practices may include access controls, authentication controls, tenant and organization separation, permission checks, audit logging, secure infrastructure, and security monitoring."
          },
          {
            "type": "p",
            "text": "No internet-based service can guarantee absolute security. You should use appropriate security practices, including maintaining secure credentials and limiting access to authorized users."
          }
        ]
      },
      {
        "heading": "8. Data Retention",
        "id": "data-retention",
        "blocks": [
          {
            "type": "p",
            "text": "We retain information for as long as reasonably necessary to:"
          },
          {
            "type": "list",
            "items": [
              "Provide the services",
              "Maintain customer accounts",
              "Fulfill contractual obligations",
              "Meet legal, accounting, or regulatory requirements",
              "Resolve disputes",
              "Prevent fraud and abuse",
              "Maintain security and operational records"
            ]
          },
          {
            "type": "p",
            "text": "Retention periods may vary depending on the type of information and the customer's subscription or contractual requirements."
          }
        ]
      },
      {
        "heading": "9. International Data Transfers",
        "id": "international-data-transfers",
        "blocks": [
          {
            "type": "p",
            "text": "Depending on where you and our service providers are located, information may be processed or stored in countries other than your country of residence."
          },
          {
            "type": "p",
            "text": "Where required, we will use appropriate safeguards for international transfers of personal information."
          }
        ]
      },
      {
        "heading": "10. Your Privacy Rights",
        "id": "your-privacy-rights",
        "blocks": [
          {
            "type": "p",
            "text": "Depending on your location and applicable law, you may have rights concerning your personal information, including the right to:"
          },
          {
            "type": "list",
            "items": [
              "Request access to personal information we hold about you",
              "Request correction of inaccurate information",
              "Request deletion of personal information",
              "Request restriction of certain processing",
              "Object to certain processing",
              "Request portability of certain information",
              "Withdraw consent where processing is based on consent",
              "Lodge a complaint with an applicable data protection authority"
            ]
          },
          {
            "type": "p",
            "text": "Some rights may be subject to legal limitations or exceptions."
          },
          {
            "type": "p",
            "text": "To exercise a privacy right, contact us using the information below."
          }
        ]
      },
      {
        "heading": "11. Account and Customer Responsibilities",
        "id": "account-and-customer-responsibilities",
        "blocks": [
          {
            "type": "p",
            "text": "If you use VizeDraw through an organization, your organization's administrator may control your account, access permissions, project access, and customer content."
          },
          {
            "type": "p",
            "text": "If your account is provided through an organization, privacy requests relating to organization-controlled information may need to be directed to that organization."
          }
        ]
      },
      {
        "heading": "12. Children's Privacy",
        "id": "children-s-privacy",
        "blocks": [
          {
            "type": "p",
            "text": "VizeDraw is intended for professional and business use. Our services are not directed toward children."
          },
          {
            "type": "p",
            "text": "We do not knowingly collect personal information from children in circumstances where such collection is prohibited by applicable law."
          }
        ]
      },
      {
        "heading": "13. Third-Party Websites and Services",
        "id": "third-party-websites-and-services",
        "blocks": [
          {
            "type": "p",
            "text": "Our website may contain links to third-party websites, applications, or services."
          },
          {
            "type": "p",
            "text": "We are not responsible for the privacy practices of third parties. We encourage you to review their privacy notices before providing information to them."
          }
        ]
      },
      {
        "heading": "14. Changes to This Privacy Notice",
        "id": "changes-to-this-privacy-notice",
        "blocks": [
          {
            "type": "p",
            "text": "We may update this Privacy Notice from time to time to reflect changes to our services, technology, legal requirements, or business practices."
          },
          {
            "type": "p",
            "text": "When we make changes, we will update the “Last Updated” date at the top of this page."
          }
        ]
      },
      {
        "heading": "15. Contact Us",
        "id": "contact-us",
        "blocks": [
          {
            "type": "p",
            "text": "If you have questions about this Privacy Notice or our privacy practices, please contact us."
          },
          {
            "type": "p",
            "text": "VizeDraw by Zenitude"
          },
          {
            "type": "p",
            "text": "Email: [hello@zenitude.com](mailto:hello@zenitude.com)"
          },
          {
            "type": "p",
            "text": "For product support: [support@vizedraw.com](mailto:support@vizedraw.com)"
          },
          {
            "type": "p",
            "text": "For sales and demo inquiries: [sales@vizedraw.com](mailto:sales@vizedraw.com)"
          }
        ]
      }
    ]
  },
  {
    "key": "terms",
    "route": "/terms-of-use",
    "title": "Terms of Use",
    "intro": [
      "These Terms of Use (“Terms”) govern your access to and use of the VizeDraw website, application, software, and related services (“Services”) provided by Zenitude (“Zenitude,” “VizeDraw,” “we,” “us,” or “our”).",
      "By accessing or using the Services, you agree to these Terms. If you are using VizeDraw on behalf of a company, organization, or other entity, you represent that you have authority to bind that entity to these Terms.",
      "If you do not agree to these Terms, do not access or use the Services."
    ],
    "sections": [
      {
        "heading": "1. The VizeDraw Service",
        "id": "the-vizedraw-service",
        "blocks": [
          {
            "type": "p",
            "text": "VizeDraw provides a workspace designed for teams that work with technical drawings."
          },
          {
            "type": "p",
            "text": "Depending on your plan and configuration, the Services may include:"
          },
          {
            "type": "list",
            "items": [
              "Drawing set organization",
              "PDF viewing and document management",
              "Drawing markups and annotations",
              "Revision management",
              "Drawing comparison",
              "Scale and measurement tools",
              "Takeoff and quantity workflows",
              "Search and metadata management",
              "Team collaboration",
              "Sharing and access controls",
              "PDF tools",
              "Reporting and exports",
              "Enterprise administration and security features"
            ]
          },
          {
            "type": "p",
            "text": "Features may vary by subscription plan and may change over time."
          }
        ]
      },
      {
        "heading": "2. Eligibility and Accounts",
        "id": "eligibility-and-accounts",
        "blocks": [
          {
            "type": "p",
            "text": "You must provide accurate information when creating an account or using the Services."
          },
          {
            "type": "p",
            "text": "You are responsible for:"
          },
          {
            "type": "list",
            "items": [
              "Maintaining the confidentiality of your account credentials",
              "Keeping account information accurate and current",
              "Restricting unauthorized access to your account",
              "All activities performed through your account",
              "Notifying us promptly if you believe your account has been compromised"
            ]
          },
          {
            "type": "p",
            "text": "You may not share account credentials in a manner that bypasses the limitations of your subscription or access controls."
          }
        ]
      },
      {
        "heading": "3. Organization Accounts",
        "id": "organization-accounts",
        "blocks": [
          {
            "type": "p",
            "text": "If you use VizeDraw as part of an organization, your organization's administrator may control:"
          },
          {
            "type": "list",
            "items": [
              "User invitations",
              "Roles and permissions",
              "Project access",
              "Sharing settings",
              "Organization-level configuration",
              "Account suspension or removal"
            ]
          },
          {
            "type": "p",
            "text": "Your organization's administrator may also have access to content and activity associated with the organization, subject to the organization's policies and applicable law."
          }
        ]
      },
      {
        "heading": "4. Subscriptions and Billing",
        "id": "subscriptions-and-billing",
        "blocks": [
          {
            "type": "p",
            "text": "Certain VizeDraw features require a paid subscription."
          },
          {
            "type": "p",
            "text": "Subscription plans, prices, usage limits, storage limits, user limits, and available features are described on the applicable pricing page or in an applicable order or subscription agreement."
          },
          {
            "type": "p",
            "text": "Unless otherwise stated, subscriptions are billed according to the billing period selected during purchase."
          },
          {
            "type": "p",
            "text": "You agree to provide accurate billing information and authorize applicable charges for your subscription."
          },
          {
            "type": "p",
            "text": "Taxes, transaction fees, or other applicable charges may apply."
          }
        ]
      },
      {
        "heading": "5. Free and Trial Features",
        "id": "free-and-trial-features",
        "blocks": [
          {
            "type": "p",
            "text": "VizeDraw may offer free, trial, promotional, or limited versions of the Services."
          },
          {
            "type": "p",
            "text": "Free or trial access may be subject to limits on storage, projects, users, drawing sheets, history, exports, features, or other usage."
          },
          {
            "type": "p",
            "text": "We may modify, suspend, or discontinue free or trial offerings at any time, subject to applicable law or contractual commitments."
          }
        ]
      },
      {
        "heading": "6. Customer Content",
        "id": "customer-content",
        "blocks": [
          {
            "type": "p",
            "text": "You retain ownership of content that you upload to VizeDraw, including drawings, documents, markups, comments, project information, and other materials (“Customer Content”)."
          },
          {
            "type": "p",
            "text": "You grant VizeDraw the limited rights necessary to host, store, process, transmit, display, reproduce, and otherwise handle Customer Content solely as needed to provide, maintain, secure, and improve the Services, or as otherwise permitted by these Terms or your agreement with us."
          },
          {
            "type": "p",
            "text": "You are responsible for ensuring that you have all necessary rights, permissions, licenses, and authorizations to upload and process Customer Content through VizeDraw."
          }
        ]
      },
      {
        "heading": "7. Acceptable Use",
        "id": "acceptable-use",
        "blocks": [
          {
            "type": "p",
            "text": "You agree not to use the Services to:"
          },
          {
            "type": "list",
            "items": [
              "Violate applicable laws or regulations",
              "Infringe intellectual property, privacy, or other rights of another person",
              "Upload content you do not have the right to use",
              "Attempt to gain unauthorized access to accounts, systems, or data",
              "Circumvent security or access controls",
              "Interfere with or disrupt the Services",
              "Introduce malware, malicious code, or harmful content",
              "Probe, scan, or test system vulnerabilities without authorization",
              "Reverse engineer or attempt to derive source code from the Services except where expressly permitted by law",
              "Use automated methods to access the Services in a manner that imposes unreasonable load or bypasses restrictions",
              "Use the Services to build or provide a competing service in violation of applicable restrictions",
              "Abuse sharing or public-link functionality",
              "Circumvent subscription, usage, storage, or feature limitations"
            ]
          },
          {
            "type": "p",
            "text": "We may suspend or restrict access when reasonably necessary to protect the Services, users, or others."
          }
        ]
      },
      {
        "heading": "8. Intellectual Property",
        "id": "intellectual-property",
        "blocks": [
          {
            "type": "p",
            "text": "The Services, including software, interface design, branding, logos, documentation, features, and other materials provided by VizeDraw, are owned by or licensed to Zenitude and are protected by applicable intellectual property laws."
          },
          {
            "type": "p",
            "text": "Except for the limited rights expressly granted under these Terms, no ownership rights are transferred to you."
          },
          {
            "type": "p",
            "text": "You may not copy, modify, distribute, sell, lease, sublicense, or create derivative works of the Services except as expressly permitted."
          }
        ]
      },
      {
        "heading": "9. Feedback",
        "id": "feedback",
        "blocks": [
          {
            "type": "p",
            "text": "If you provide suggestions, ideas, recommendations, or other feedback about VizeDraw, you grant us the right to use that feedback without restriction or compensation, provided that such use does not identify you or disclose your confidential information without authorization."
          }
        ]
      },
      {
        "heading": "10. Third-Party Services",
        "id": "third-party-services",
        "blocks": [
          {
            "type": "p",
            "text": "VizeDraw may integrate with or rely on third-party services."
          },
          {
            "type": "p",
            "text": "Third-party services may have their own terms, privacy notices, and policies. Your use of those services may be subject to those additional terms."
          },
          {
            "type": "p",
            "text": "We are not responsible for third-party services that are outside our control."
          }
        ]
      },
      {
        "heading": "11. Availability and Changes",
        "id": "availability-and-changes",
        "blocks": [
          {
            "type": "p",
            "text": "We work to keep VizeDraw reliable and available, but we do not guarantee uninterrupted or error-free operation."
          },
          {
            "type": "p",
            "text": "The Services may occasionally be unavailable because of:"
          },
          {
            "type": "list",
            "items": [
              "Maintenance",
              "Updates",
              "Infrastructure issues",
              "Security incidents",
              "Third-party service interruptions",
              "Network or internet failures",
              "Events outside our reasonable control"
            ]
          },
          {
            "type": "p",
            "text": "We may modify, add, remove, or discontinue features from time to time."
          }
        ]
      },
      {
        "heading": "12. Security",
        "id": "security",
        "blocks": [
          {
            "type": "p",
            "text": "We maintain security measures designed to protect the Services and Customer Content."
          },
          {
            "type": "p",
            "text": "However, no system can be guaranteed to be completely secure."
          },
          {
            "type": "p",
            "text": "You are responsible for using appropriate account security practices and configuring permissions appropriately for your organization."
          }
        ]
      },
      {
        "heading": "13. Professional Responsibility",
        "id": "professional-responsibility",
        "blocks": [
          {
            "type": "p",
            "text": "VizeDraw provides tools for reviewing, organizing, measuring, comparing, and managing technical drawings."
          },
          {
            "type": "p",
            "text": "VizeDraw does not replace the professional judgment of architects, engineers, contractors, estimators, manufacturers, inspectors, project managers, or other qualified professionals."
          },
          {
            "type": "p",
            "text": "You are responsible for verifying drawings, measurements, quantities, revisions, approvals, calculations, specifications, and other project decisions before relying on them."
          }
        ]
      },
      {
        "heading": "14. Suspension and Termination",
        "id": "suspension-and-termination",
        "blocks": [
          {
            "type": "p",
            "text": "You may stop using the Services at any time."
          },
          {
            "type": "p",
            "text": "We may suspend or terminate access if:"
          },
          {
            "type": "list",
            "items": [
              "You materially violate these Terms",
              "You fail to pay applicable fees",
              "Your use creates a security or legal risk",
              "Required by law",
              "Your account or use is involved in fraud or abuse"
            ]
          },
          {
            "type": "p",
            "text": "Where appropriate, we may provide notice and an opportunity to remedy a violation."
          },
          {
            "type": "p",
            "text": "Upon termination, your right to access the Services will end, subject to any applicable data export, retention, or contractual provisions."
          }
        ]
      },
      {
        "heading": "15. Data and Account Closure",
        "id": "data-and-account-closure",
        "blocks": [
          {
            "type": "p",
            "text": "After account termination or expiration, Customer Content may be deleted according to our applicable retention practices, subscription terms, or customer agreement."
          },
          {
            "type": "p",
            "text": "You are responsible for exporting any information you need before account closure when export functionality is available."
          },
          {
            "type": "p",
            "text": "Enterprise customers may have different data retention or deletion terms under a separate agreement."
          }
        ]
      },
      {
        "heading": "16. Disclaimers",
        "id": "disclaimers",
        "blocks": [
          {
            "type": "p",
            "text": "To the maximum extent permitted by applicable law, the Services are provided on an “as is” and “as available” basis."
          },
          {
            "type": "p",
            "text": "We do not warrant that:"
          },
          {
            "type": "list",
            "items": [
              "The Services will always be available",
              "The Services will be completely error-free",
              "All information or results generated through the Services will be accurate",
              "The Services will satisfy every particular business requirement",
              "Any specific project, drawing, quantity, measurement, or workflow outcome will be achieved"
            ]
          },
          {
            "type": "p",
            "text": "You are responsible for independently reviewing and validating information produced or processed through the Services."
          }
        ]
      },
      {
        "heading": "17. Limitation of Liability",
        "id": "limitation-of-liability",
        "blocks": [
          {
            "type": "p",
            "text": "To the maximum extent permitted by applicable law, Zenitude and its affiliates, officers, employees, contractors, and service providers will not be liable for indirect, incidental, special, consequential, exemplary, or punitive damages, or for loss of profits, revenue, business opportunities, data, goodwill, or anticipated savings arising from or related to the Services."
          },
          {
            "type": "p",
            "text": "To the maximum extent permitted by applicable law, our aggregate liability arising from the Services will be limited to the amount you paid to us for the applicable Services during the twelve months preceding the event giving rise to the claim."
          },
          {
            "type": "p",
            "text": "Nothing in these Terms limits liability that cannot legally be limited."
          }
        ]
      },
      {
        "heading": "18. Indemnification",
        "id": "indemnification",
        "blocks": [
          {
            "type": "p",
            "text": "To the extent permitted by applicable law, you agree to defend, indemnify, and hold harmless Zenitude and its affiliates, officers, employees, and service providers from claims, damages, liabilities, costs, and expenses arising from:"
          },
          {
            "type": "list",
            "items": [
              "Your unlawful use of the Services",
              "Your violation of these Terms",
              "Your Customer Content",
              "Your infringement of another person's rights",
              "Your violation of applicable law"
            ]
          }
        ]
      },
      {
        "heading": "19. Governing Law",
        "id": "governing-law",
        "blocks": [
          {
            "type": "p",
            "text": "These Terms will be governed by the laws specified in an applicable order form, subscription agreement, or other written agreement between you and Zenitude."
          },
          {
            "type": "p",
            "text": "If no separate agreement specifies governing law or jurisdiction, the applicable governing law and venue will be determined by the principal contracting entity and applicable law."
          }
        ]
      },
      {
        "heading": "20. Changes to These Terms",
        "id": "changes-to-these-terms",
        "blocks": [
          {
            "type": "p",
            "text": "We may update these Terms from time to time."
          },
          {
            "type": "p",
            "text": "If we make material changes, we may provide notice through the Services, website, email, or other reasonable means."
          },
          {
            "type": "p",
            "text": "Your continued use of VizeDraw after the updated Terms become effective constitutes acceptance of the revised Terms, to the extent permitted by law."
          }
        ]
      },
      {
        "heading": "21. Contact Us",
        "id": "contact-us",
        "blocks": [
          {
            "type": "p",
            "text": "If you have questions about these Terms, please contact us."
          },
          {
            "type": "p",
            "text": "VizeDraw by Zenitude"
          },
          {
            "type": "p",
            "text": "Email: [hello@zenitude.com](mailto:hello@zenitude.com)"
          },
          {
            "type": "p",
            "text": "Support: [support@vizedraw.com](mailto:support@vizedraw.com)"
          },
          {
            "type": "p",
            "text": "Sales: [sales@vizedraw.com](mailto:sales@vizedraw.com)"
          }
        ]
      }
    ]
  },
  {
    "key": "cookies",
    "route": "/cookie-preferences",
    "title": "Cookie Preferences",
    "intro": [
      "VizeDraw uses cookies and similar technologies to help operate our website, remember your preferences, understand how visitors use our website, and improve our services.",
      "This Cookie Preferences page explains the types of cookies we may use and allows you to understand and manage your preferences."
    ],
    "sections": [
      {
        "heading": "What Are Cookies?",
        "id": "what-are-cookies",
        "blocks": [
          {
            "type": "p",
            "text": "Cookies are small text files stored on your device when you visit a website."
          },
          {
            "type": "p",
            "text": "Similar technologies may include pixels, local storage, SDKs, tags, and other technologies that perform functions similar to cookies."
          },
          {
            "type": "p",
            "text": "Cookies may be temporary or persistent and may be placed by VizeDraw or by third-party service providers."
          }
        ]
      },
      {
        "heading": "Cookie Categories",
        "id": "cookie-categories",
        "blocks": [
          {
            "type": "h3",
            "text": "1. Strictly Necessary Cookies",
            "badge": "Always Active"
          },
          {
            "type": "p",
            "text": "These cookies are required for the website or application to function properly."
          },
          {
            "type": "p",
            "text": "They may be used for:"
          },
          {
            "type": "list",
            "items": [
              "Authentication and login",
              "Account sessions",
              "Security",
              "Fraud prevention",
              "Load balancing",
              "Maintaining application functionality",
              "Remembering essential technical settings",
              "Protecting the integrity of the Services"
            ]
          },
          {
            "type": "p",
            "text": "Because these cookies are necessary for core functionality, they generally cannot be disabled through our cookie preference tool."
          },
          {
            "type": "h3",
            "text": "2. Preference Cookies",
            "badge": "Optional"
          },
          {
            "type": "p",
            "text": "Preference cookies help remember choices you make while using our website."
          },
          {
            "type": "p",
            "text": "They may be used to remember:"
          },
          {
            "type": "list",
            "items": [
              "Language preferences",
              "Region or location preferences",
              "Interface preferences",
              "Cookie consent preferences",
              "Other settings you choose"
            ]
          },
          {
            "type": "p",
            "text": "Disabling these cookies may mean that some preferences need to be selected again."
          },
          {
            "type": "h3",
            "text": "3. Analytics Cookies",
            "badge": "Optional"
          },
          {
            "type": "p",
            "text": "Analytics cookies help us understand how visitors use our website."
          },
          {
            "type": "p",
            "text": "They may collect information such as:"
          },
          {
            "type": "list",
            "items": [
              "Pages visited",
              "Approximate visit duration",
              "Navigation patterns",
              "General device information",
              "Referring pages",
              "Website performance information",
              "Errors and technical issues"
            ]
          },
          {
            "type": "p",
            "text": "We use this information to understand website performance and improve the VizeDraw experience."
          },
          {
            "type": "p",
            "text": "Analytics information may be processed by third-party analytics providers acting on our behalf."
          },
          {
            "type": "h3",
            "text": "4. Marketing Cookies",
            "badge": "Optional"
          },
          {
            "type": "p",
            "text": "Where used, marketing cookies may help us understand the effectiveness of marketing campaigns and deliver or measure relevant communications or advertising."
          },
          {
            "type": "p",
            "text": "These cookies may allow third-party providers to recognize a browser or device across websites or services."
          },
          {
            "type": "p",
            "text": "We will request consent where required by applicable law before using non-essential marketing cookies."
          }
        ]
      },
      {
        "heading": "Managing Your Preferences",
        "id": "managing-your-preferences",
        "blocks": [
          {
            "type": "p",
            "text": "You can change your cookie preferences at any time using the cookie preference controls provided on our website."
          },
          {
            "type": "p",
            "text": "You may also control cookies through your browser settings."
          },
          {
            "type": "p",
            "text": "Please note that blocking or deleting certain cookies may affect website functionality or prevent some features from operating correctly."
          }
        ]
      },
      {
        "heading": "Browser Controls",
        "id": "browser-controls",
        "blocks": [
          {
            "type": "p",
            "text": "Most modern browsers allow you to:"
          },
          {
            "type": "list",
            "items": [
              "View stored cookies",
              "Delete cookies",
              "Block cookies",
              "Allow cookies only from certain websites",
              "Block third-party cookies",
              "Delete cookies when the browser is closed"
            ]
          },
          {
            "type": "p",
            "text": "Browser settings vary by browser and device."
          }
        ]
      },
      {
        "heading": "Third-Party Technologies",
        "id": "third-party-technologies",
        "blocks": [
          {
            "type": "p",
            "text": "Some features of our website may rely on third-party technologies."
          },
          {
            "type": "p",
            "text": "Third-party providers may use cookies or similar technologies according to their own privacy policies."
          },
          {
            "type": "p",
            "text": "Examples may include services used for:"
          },
          {
            "type": "list",
            "items": [
              "Website analytics",
              "Security",
              "Performance monitoring",
              "Customer support",
              "Marketing",
              "Embedded content"
            ]
          },
          {
            "type": "p",
            "text": "We recommend reviewing the privacy policies of applicable third-party providers for additional information."
          }
        ]
      },
      {
        "heading": "Cookie Consent",
        "id": "cookie-consent",
        "blocks": [
          {
            "type": "p",
            "text": "Where required by applicable law, VizeDraw will request your consent before placing or using non-essential cookies."
          },
          {
            "type": "p",
            "text": "You can withdraw or change your consent at any time through the cookie preference controls available on our website."
          },
          {
            "type": "p",
            "text": "Withdrawing consent does not affect processing that occurred before your withdrawal."
          }
        ]
      },
      {
        "heading": "Privacy",
        "id": "privacy",
        "blocks": [
          {
            "type": "p",
            "text": "For more information about how VizeDraw collects and uses personal information, please review our Privacy Notice."
          }
        ]
      },
      {
        "heading": "Updates to This Cookie Policy",
        "id": "updates-to-this-cookie-policy",
        "blocks": [
          {
            "type": "p",
            "text": "We may update this Cookie Preferences page from time to time to reflect changes to our website, technologies, service providers, or legal requirements."
          },
          {
            "type": "p",
            "text": "The “Last Updated” date at the top of this page indicates when this page was most recently updated."
          }
        ]
      },
      {
        "heading": "Contact Us",
        "id": "contact-us",
        "blocks": [
          {
            "type": "p",
            "text": "If you have questions about cookies or your privacy preferences, please contact us."
          },
          {
            "type": "p",
            "text": "VizeDraw by Zenitude"
          },
          {
            "type": "p",
            "text": "Email: [hello@zenitude.com](mailto:hello@zenitude.com)"
          },
          {
            "type": "p",
            "text": "Support: [support@vizedraw.com](mailto:support@vizedraw.com)"
          }
        ]
      }
    ]
  }
]

export const legalDoc = (key: LegalKey) => legalDocs.find((d) => d.key === key)!
