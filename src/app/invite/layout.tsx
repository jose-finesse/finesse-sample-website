import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/finesse-logo.png",
    apple: "/finesse-logo.png",
  },
  title: "FINESSE — You're Invited",
  description: "Private view of the Finesse archive and lookbook shoot with guests. Friday, March 20th from 3PM to 8PM. DTLA. Limited spots.",
  openGraph: {
    title: "FINESSE — You're Invited",
    description: "Private view of the Finesse archive and lookbook shoot with guests. Friday, March 20th from 3PM to 8PM. DTLA. Limited spots.",
    type: "website",
    images: [
      {
        url: "/flyer.jpg",
        width: 1200,
        height: 1500,
        alt: "Finesse Sample Sale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FINESSE — You're Invited",
    description: "Private preview of the Finesse archive. March 20th, DTLA.",
    images: ["/flyer.jpg"],
  },
};

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
