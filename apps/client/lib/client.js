import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr'
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc'
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename';


const options = {
  addTypename: false
}
const { getClient } = registerApolloClient(() => {
  const removeTypenameLink = removeTypenameFromVariables();
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(options),
    link: new HttpLink({
      // https://studio.apollographql.com/public/spacex-l4uc6p/
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      fetchOptions: { cache: 'no-store' },
    }).concat(removeTypenameLink),
  })
})

export const apolloClient = getClient()
