import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "InstaWare — Real-Time Location Intelligence for Local Businesses",
  description:
    "Reach nearby customers in real-time. Push flash deals, update your live status by voice, and fill empty seats — all in 15 seconds. Free for early partners.",
  keywords: [
    "local business marketing",
    "flash deals",
    "restaurant marketing",
    "real-time business status",
    "nearby customers",
    "foot traffic",
    "small business tool",
  ],
  openGraph: {
    title: "InstaWare — Your Customers Are Nearby",
    description:
      "Push flash deals to everyone within a mile when you're slow. Update your status by just speaking. Free for the first 50 businesses.",
    url: "https://instaware.ai",
    siteName: "InstaWare",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "InstaWare — Real-Time Location Intelligence",
    description:
      "Reach nearby customers in 15 seconds. Flash deals, live status, voice updates.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,600;8..60,700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
