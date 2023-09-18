import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/react-hooks'
import client from '../apolloclient'

export default function App({ Component, pageProps }) {
  return <ApolloProvider client={client}><Component {...pageProps} /></ApolloProvider>
}
