import { graphql } from '../types';

export const CREATE_COMPANY_MUTATION = graphql(`
  mutation CreateCompany($createCompanyInput: CreateCompanyInput!) {
    createCompany(createCompanyInput: $createCompanyInput) {
      id
      name
    }
  }
`);
