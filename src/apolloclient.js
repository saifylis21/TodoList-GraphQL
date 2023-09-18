import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const link = new HttpLink({
    uri: 'http://localhost:4000/'
})

const cache = new InMemoryCache()

const client = new ApolloClient({
    link,
    cache
})

export default client