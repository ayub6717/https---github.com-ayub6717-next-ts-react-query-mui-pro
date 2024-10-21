// app/layout.tsx
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { StyledRoot } from './StyledRoot';
import ReactQueryProvider from "@/utils/providers/reactQueryProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider >
          <AppRouterCacheProvider options={{ enableCssLayer: true }} >
            <StyledRoot>{children}</StyledRoot>
          </AppRouterCacheProvider>
        </ReactQueryProvider >
      </body>
    </html>
  );
}