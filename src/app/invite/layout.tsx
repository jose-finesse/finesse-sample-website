import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FINESSE — You're Invited",
  description:
    "Private preview of the Finesse archive. March 20th, DTLA.",
  openGraph: {
    title: "FINESSE — You're Invited",
    description: "Private preview of the Finesse archive. March 20th, DTLA.",
    type: "website",
  },
};

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
