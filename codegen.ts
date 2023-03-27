import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [process.env.NEXT_PUBLIC_API_URL as string]: {
        headers: {
          'content-type': 'application/json',
        },
      },
    },
  ],
  documents: 'graphql/**/*.ts',
  generates: {
    'graphql/types/': {
      preset: 'client',
      plugins: [],
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};

export default config;
