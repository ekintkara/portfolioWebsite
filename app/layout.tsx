import './globals.css';
import type { Metadata } from 'next';
import { Inter, Roboto } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Script from "next/script";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const roboto = Roboto({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Taylan Ekin Kara | Full-Stack Software Developer',
  description: 'Full-Stack Software Developer with expertise in .NET Core, Node.js, React, and Next.js. İş birliği yapmak için bana ulaşın!',
  keywords: [
    "full-stack developer",
    ".NET Core",
    "Node.js",
    "React",
    "Next.js",
    "software developer",
    "portfolio",
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://taylanekin.com.tr',
    siteName: 'Taylan Ekin Kara',
    title: 'Taylan Ekin Kara | Full-Stack Software Developer',
    description: 'Full-Stack Software Developer specializing in .NET Core, Node.js, React, and Next.js',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Taylan Ekin Kara - Full-Stack Software Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Taylan Ekin Kara | Full-Stack Software Developer',
    description: 'Full-Stack Software Developer specializing in .NET Core, Node.js, React, and Next.js',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/code.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${roboto.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          
          <Toaster />
        </ThemeProvider>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-YK9FYV7ESK" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YK9FYV7ESK');
          `}
        </Script>
      </body>
    </html>
  );
}