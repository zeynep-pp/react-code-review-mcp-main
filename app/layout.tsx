export const metadata = {
  title: "MCP Server for React Code Review",
  description: "For our students to get personalized onboarding",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
