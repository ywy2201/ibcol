import ApolloClient from 'apollo-client';
import {
  ApolloLink,
  split
} from 'apollo-link';
import {
  HttpLink
} from 'apollo-link-http'
import {
  WebSocketLink
} from 'apollo-link-ws'
import {
  setContext
} from 'apollo-link-context';
import {
  onError
} from 'apollo-link-error';
import {
  InMemoryCache
} from 'apollo-cache-inmemory'
import {
  getMainDefinition
} from 'apollo-utilities';
import withApollo from 'next-with-apollo'


// import {
//   accountsLink
// } from '@accounts/apollo-link';
// import {
//   AccountsGraphQLClient
// } from '@accounts/graphql-client';

import * as ApolloClientBoost from 'apollo-boost';

import {
  graphqlURL,
  wsURL
} from 'configs';

export default withApollo(({
  headers = {}
}) => {
  const ssrMode = !process.browser
  // console.log('ApolloClientBoost', ApolloClientBoost);
  // const accountsApolloClient = new ApolloClientBoost.default({ uri: graphqlURL });

  // const accountsGraphQLClient = new AccountsGraphQLClient({
  //   graphQLClient: accountsApolloClient,
  //   // other options
  // });

  // const authLink = accountsLink(accountsGraphQLClient);



  const httpLink = new HttpLink({
    uri: graphqlURL
  })

  // const wsLink = !ssrMode && new WebSocketLink({
  //   uri: wsURL,
  //   options: {
  //    // fetchPolicy: 'network-only',
  //     reconnect: true,
  //     connectionParams: {
  //       authorization: headers.authorization
  //     }
  //   }
  // })

  const contextLink = setContext(
    async () => ({
      headers: {
        authorization: headers.authorization
      }
    })
  )

  const errorLink = onError(
    ({
      graphQLErrors,
      networkError
    }) => {
      if (graphQLErrors) {
        graphQLErrors.map(err =>
          console.log(`[GraphQL error]: Message: ${err.message}`)
        )
      }
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }
  )

  let link = ApolloLink.from([
    errorLink,
    contextLink,
    // authLink,
    httpLink
  ])

  // if (!ssrMode) {
  //   link = split(
  //     // split based on operation type
  //     ({
  //       query
  //     }) => {
  //       const definition = getMainDefinition(query);
  //       return (
  //         definition.kind === 'OperationDefinition' &&
  //         definition.operation === 'subscription'
  //       )
  //     },
  //     // authLink,
  //     wsLink,
  //     link
  //   )
  // }

  const cache = new InMemoryCache({
    dataIdFromObject: ({
        id,
        __typename
      }) =>
      id && __typename ? __typename + id : null
  })

  return new ApolloClient({
    link,
    ssrMode,
    cache
  })
})


// export default withApollo(({ headers }) => (
//   new ApolloClient({ uri: graphqlURL })
// ))