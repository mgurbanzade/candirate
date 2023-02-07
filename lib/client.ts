import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from '@apollo/client/link/context';

const createApolloClient = () => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
      },
    };
  });

  const httpLink = createUploadLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    fetchOptions: {
      credentials: 'include',
    },
  });

  return new ApolloClient({
    link: ApolloLink.from([authLink, httpLink as unknown as ApolloLink]),
    cache: new InMemoryCache(),
    ssrMode: typeof window === 'undefined',
    credentials: 'include',
  });
};

export default createApolloClient;
