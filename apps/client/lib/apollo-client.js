import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename'
import { cookies } from 'next/headers'
const options = {
  addTypename: false,
}

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  fetchOptions: { cache: 'no-store' },
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token

  if (typeof window !== undefined) {
    const cookieStore = cookies()
    const storedToken = cookieStore.get('token')
    if (!storedToken) {
      return
    }
    token = cookieStore.get('token').value
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// ? options no to cache
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
}

const { getClient } = registerApolloClient(() => {
  const removeTypenameLink = removeTypenameFromVariables()
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(options),
    link: authLink.concat(httpLink),
    defaultOptions: defaultOptions,
  })
})

export const apolloClient = getClient()
