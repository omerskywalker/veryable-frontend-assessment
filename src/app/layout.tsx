import { ThemeProvider } from "@/theme/ThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ReactQueryProvider } from "@/lib/reactQuery";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ReactQueryProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </ReactQueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
