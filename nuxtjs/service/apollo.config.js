import {ApolloLink} from 'apollo-link'
import {HttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'

/**
 * apollo modules.
 * see
 * https://github.com/nuxt-community/apollo-module/tree/v3.0.7
 *
 */

export default (ctx) => {
  const httpLink = new HttpLink({uri: 'http://localhost:4000/graphql'})
  // middleware
  console.log(ctx)
  const middlewareLink = new ApolloLink((operation, forward) => {
    //This function is called before every request. Update ctx.req.session and window.__NUXT__.state.session
    //To point to wherever you store your token
    if(!process.server){
      const token =  ctx.store.state.user.token
      if(token){
        operation.setContext({
          headers: {authorization: `Bearer ${token}`}
        })
      }
    }
    return forward(operation)
  })
  const link = middlewareLink.concat(httpLink)
  return {
    httpEndpoint: 'http://localhost:4000',
    link,
    defaultHttpLink:false,
    cache: new InMemoryCache({
      resultCaching: false
    }),
    // defaultOptions: {
    //   watchQuery: {
    //     fetchPolicy: 'no-cache',
    //     errorPolicy: 'ignore',
    //   },
    //   query: {
    //     fetchPolicy: 'no-cache',
    //     errorPolicy: 'all',
    //   },
    // }
  }
}
