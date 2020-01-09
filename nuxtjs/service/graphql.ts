import gql from 'graphql-tag'

export const users = gql`query Users {
  users {
    email,
    name
  }
}`
