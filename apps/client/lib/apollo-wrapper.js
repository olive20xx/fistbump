'use client'

import { ApolloLink, HttpLink } from '@apollo/client'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'

// have a function to create a client for you
function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    fetchOptions: { cache: 'no-store' },
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache({
      addTypename: false,
    }),
    link:
      typeof window === 'undefined'
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  })
}
// !!! IMPORTANT !!!

// Resetting singletons between tests.
// This package uses some singleton instances on the Browser side - if you are writing tests, you must reset them between tests.

// For that, you can use the resetNextSSRApolloSingletons helper:

// import { resetNextSSRApolloSingletons } from "@apollo/experimental-nextjs-app-support/ssr";

// afterEach(resetNextSSRApolloSingletons);

export function ApolloWrapper({ children, initialApolloState }) {
  return (
    <ApolloNextAppProvider
      initialApolloState={initialApolloState}
      makeClient={makeClient}
    >
      {children}
    </ApolloNextAppProvider>
  )
}
