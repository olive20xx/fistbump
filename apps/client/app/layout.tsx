import { ApolloWrapper } from '@/lib/apollo-wrapper'
import { getClient } from '@/lib/client'

export default function RootLayout({

  children,
}: {
  children: React.ReactNode;
}) {
  const client = getClient()

  return (
    <html lang="en">
      <body>
        <ApolloWrapper initialApolloState={client.cache.extract()}>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
