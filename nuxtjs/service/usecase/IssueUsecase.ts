import { ApolloClient } from 'apollo-client';
import gqlIssues from "~/service/graphql/issues.gql"

export class IssueUsecase {
  constructor(
    private apollo: ApolloClient<any>
  ){ }

  getApollo(app){
    if(this.apollo){
      return this.apollo
    }
    if(app.$apollo){
      return app.$apollo
    }
    if(app.$apollo){
      return app.$apollo
    }


  }

  async getIssues(){
    const result = await this.apollo.query({
      query: gqlIssues,
    })
    return result.data.issues
  }
}
