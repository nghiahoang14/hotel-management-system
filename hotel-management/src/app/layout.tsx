import AppInsightsProvider from "../components/client/appInsightsProvider";

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
         <AppInsightsProvider />
        {children}
      </body>
    </html>
  );
}