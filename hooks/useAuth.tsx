import React, { useState, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
} from '@apollo/client';
import { LOGIN_MUTATION } from '@gql/mutations';
import { AuthFormInputs } from '@components/Auth/AuthForm/types';

type AuthContextType = {
  loginAction: (data: AuthFormInputs) => void;
  signOut: () => void;
  isSignedIn: () => boolean;
  setAuthToken: (token: string) => void;
  createApolloClient: () => ApolloClient<any>;
};

const AuthContext = createContext<AuthContextType | null>(null);
const useAuth = () => useContext(AuthContext);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth as any}>
      <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </AuthContext.Provider>
  );
};

const useProvideAuth = () => {
  const [authToken, setAuthToken] = useState(null);
  const router = useRouter();

  const isSignedIn = () => (authToken ? true : false);

  const getAuthHeaders = () => {
    return !authToken
      ? null
      : {
          authorization: `Bearer ${authToken}`,
        };
  };

  const createApolloClient = () => {
    const link = new HttpLink({
      uri: 'http://localhost:3000/graphql',
      headers: getAuthHeaders(),
    });

    return new ApolloClient({
      link,
      cache: new InMemoryCache(),
    });
  };

  const loginAction = async (data: AuthFormInputs) => {
    const client = createApolloClient();
    const { email, password } = data;

    const result = await client.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        loginUserInput: { email, password },
      },
    });

    if (result?.data?.login?.accessToken) {
      setAuthToken(result.data.login.accessToken);
      router.push('/');
    }
  };

  const signOut = () => setAuthToken(null);

  return {
    loginAction,
    signOut,
    isSignedIn,
    setAuthToken,
    createApolloClient,
  };
};

export type { AuthContextType };
export { useAuth, AuthProvider };
