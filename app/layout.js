import { geistSans, geistMono } from "@/lib/fonts";
import "./globals.css";
import { Providers } from "@/components/shared/providers";
import { constructMetadata } from "@/lib/metadata";

export const metadata = constructMetadata();

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

