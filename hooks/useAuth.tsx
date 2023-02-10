import React, { useState, useContext, createContext } from 'react';
import { createUploadLink } from 'apollo-upload-client';
import { useRouter } from 'next/router';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
} from '@apollo/client';
import { LOGIN_MUTATION } from '@gql/mutations/auth';
import { profilePath } from '@lib/routes';

type LoginFormInputes = {
  email: string;
  password: string;
};

type AuthContextType = {
  loginAction: (data: LoginFormInputes) => void;
  signOut: () => void;
  isSignedIn: () => boolean;
  setAuthToken: (token: string | null) => void;
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
  const [authToken, setAuthToken] = useState<string | null>(null);
  const router = useRouter();

  const isSignedIn = () => (authToken ? true : false);

  const getAuthHeaders = () => {
    return !authToken
      ? null
      : {
          authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        };
  };

  const createApolloClient = () => {
    const link = createUploadLink({
      uri: 'http://localhost:4000/graphql',
      headers: getAuthHeaders() as Record<string, string>,
      credentials: 'include',
    }) as unknown as ApolloLink;

    return new ApolloClient({
      link: ApolloLink.from([link]),
      cache: new InMemoryCache(),
    });
  };

  const loginAction = async (data: LoginFormInputes) => {
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
      router.push(profilePath());
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
