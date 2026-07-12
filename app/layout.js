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
      <body className="min-h-full flex flex-col relative bg-background text-foreground">
        <Providers>
          {/* Global Noise Overlay */}
          <div
            className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
            }}
          />

          {/* Dynamic Ambient Background Glows */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30 dark:opacity-20">
            <div className="absolute top-[10%] left-[5%] w-[40vw] h-[40vw] max-w-[600px] rounded-full bg-gradient-to-tr from-accent/15 to-purple-500/10 blur-[120px] animate-[float-slow-1_25s_infinite_ease-in-out]" />
            <div className="absolute bottom-[20%] right-[5%] w-[45vw] h-[45vw] max-w-[700px] rounded-full bg-gradient-to-br from-purple-500/10 to-accent/15 blur-[140px] animate-[float-slow-2_30s_infinite_ease-in-out]" />
            <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] max-w-[500px] rounded-full bg-gradient-to-r from-emerald-500/5 to-indigo-500/5 blur-[100px] animate-[float-slow-1_20s_infinite_ease-in-out_reverse]" />
          </div>

          <div className="relative z-10 flex-1 flex flex-col">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

