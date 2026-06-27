
import { AppShell } from "@/components/layout/app-shell";
import "@/app/[locale]/globals.css"; 

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}