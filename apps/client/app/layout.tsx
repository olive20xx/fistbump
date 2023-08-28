import { ApolloWrapper } from '@/lib/apollo-wrapper'
import { apolloClient } from '@/lib/client'

export default function RootLayout({

  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        <ApolloWrapper initialApolloState={apolloClient.cache.extract()}>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
