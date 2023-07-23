// import { Inter } from 'next/font/google';

export const metadata = {
  title: 'Note Taking App',
  description: 'An app to simplify note taking',
};

type Props = {
  children: React.ReactNode;
};

export const dynamic = 'force-dynamic';

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  );
}
