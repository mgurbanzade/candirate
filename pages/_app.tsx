import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@lib/apolloClient';
import type { AppProps } from 'next/app';
import Layout from '@components/Layout';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps);

  return (
    <Layout>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Layout>
  );
}
