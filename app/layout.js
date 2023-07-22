import { Inter } from 'next/font/google';

export const metadata = {
  title: 'Note Taking App',
  description: 'An app to simplify note taking',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
