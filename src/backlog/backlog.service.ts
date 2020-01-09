import { Injectable} from '@nestjs/common';
import 'isomorphic-fetch';
import * as es6promise from 'es6-promise';
import * as backlogjs from 'backlog-js';
import { Option } from "backlog-js";

es6promise.polyfill();

@Injectable()
export class BacklogService {

  constructor() {}

  private blg():backlogjs.Backlog{
    return new backlogjs.Backlog({
      host: process.env.BLG_DOMAIN,
      apiKey: process.env.BLG_TOKEN
    });
  }

  private projectKey():string{
    return process.env.BLG_PROJECTKEY
  }

  async getSpace() {
    const result = await this.blg().getSpace()
    return result
  }

  async getProject() {
    const result = await this.blg().getProject(this.projectKey())
    return result
  }

  async getIssues(projectId:number,updatedSince:string) {
    const params:Option.Issue.GetIssuesParams = {
      projectId: [projectId],
      updatedSince,
      keyword: "",
      count: 100
    }
    const result = await this.blg().getIssues(params)
    return result
  }

  async getProjectUsers() {
    const result = await this.blg().getProjectUsers(this.projectKey())
    return result
  }
}
