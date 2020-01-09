import { ApolloClient } from 'apollo-client';
import gqlWhoami from "~/service/graphql/whoami.gql"
import getUsers from "~/service/graphql/getUsers.gql"
import gqlLogin from "~/service/graphql/login.gql"

export class AuthUsecase {
  constructor(
    private apollo: ApolloClient<any>
  ){ }

  async getUsers(){
    const {data} = await this.apollo.query({
      query: getUsers,
    })
    return data.users

  }

  async login(email){
    const {data} = await this.apollo.mutate({
      mutation: gqlLogin,
      variables: {
        email,
      },
    })
    return {token : data.login.token}
  }

  async whoami(){
    const {data} = await this.apollo.query({
      query: gqlWhoami,
    })
    return data.whoami
  }
}
