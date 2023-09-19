import '@/styles/globals.css'
import { ApolloProvider } from '@apollo/react-hooks'
import client from '../apolloclient'
import Navbar from '../components/Navbar'

export default function App({ Component, pageProps }) {
  return <ApolloProvider client={client}>
          <Navbar/>
          <Component {...pageProps} />
         </ApolloProvider>
}
