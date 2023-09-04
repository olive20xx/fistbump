'use client'

import { ApolloLink, HttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { getCookie } from 'cookies-next'
// have a function to create a client for you

function makeClient() {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    fetchOptions: { cache: 'no-store' },
  })
  let token
  if (typeof window !== undefined) {
    token = getCookie('token')
  }
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // return the headers to the context so httpLink can read them

    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
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
            authLink.concat(httpLink),
          ])
        : authLink.concat(httpLink),
    credentials: 'include',
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
