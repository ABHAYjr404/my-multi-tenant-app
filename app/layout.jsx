import "../styles/globals.css";
import ClientProviders from "@/components/ClientProviders";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Multi-Tenant School App",
  description: "A multi-tenant school profile application",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  // If the current page is /admin and there is no valid session, redirect to sign-in
  if (children?.props?.pathname === "/admin" && !session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
