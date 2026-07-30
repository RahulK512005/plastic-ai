import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Punarvritt',
  description: 'Plastic Recycling Marketplace & EPR Compliance Platform',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}