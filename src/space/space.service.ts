import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SpaceEntity } from './space.entity';
import { BacklogService } from '../backlog/backlog.service';
import { ProjectEntity } from './project.entity';
import { IssuesEntity } from './issues.entity';

// import { UserDTO } from './user.dto';

@Injectable()
export class SpaceService {

  constructor(
    @InjectRepository(SpaceEntity)
    private spaceRepository: Repository<SpaceEntity>,
    @InjectRepository(IssuesEntity)
    private issueRepository: Repository<SpaceEntity>,
    private backlogService: BacklogService,
  ) {
  }

  /**
   * スペース情報の更新
   * @param space
   */
  async registerSpace(): Promise<SpaceEntity> {
    const result = await this.backlogService.getSpace();
    let space = await SpaceEntity.findOne({
      where: {
        spaceKey: result.spaceKey,
      },
    });
    if (!space) {
      space = new SpaceEntity();
      space.spaceKey = result.spaceKey;
      space.domain = process.env.BLG_DOMAIN;
      space.ownerId = result.ownerId;
      space.name = result.name;
      space.payload = JSON.stringify(result);
      space.createdAt = new Date('2020-01-01');
      space.updatedAt = new Date('2020-01-02');
    }
    space.ownerId = result.ownerId;
    space.name = result.name;
    space.payload = JSON.stringify(result);
    space.updatedAt = new Date('2020-01-02');
    await space.save();
    return space;
  }

  /**
   * スペース情報の更新
   * @param space
   */
  async registerProject(space: SpaceEntity): Promise<ProjectEntity> {
    const result = await this.backlogService.getProject();
    let project = await ProjectEntity.findOne({
      where: {
        blgId: result.id,
        spaceId: space.id,
      },
    });
    if (!project) {
      project = new ProjectEntity();
      project.blgId = result.id;
      project.projectKey = result.projectKey;
      project.createdAt = new Date();
    }
    project.space = space;
    project.name = result.name;
    project.payload = JSON.stringify(result);
    project.updatedAt = new Date();
    await project.save();
    return project;
  }

  /**
   * スペース情報の更新
   * @param space
   */
  async registerIssues(project: ProjectEntity, date: string): Promise<null> {
    const result = await this.backlogService.getIssues(project.blgId, date);
    for (let issueData of result) {
      if(!issueData.assignee){
        continue
      }
      let issue = await IssuesEntity.findOne({
        where: {
          issueKey: issueData.issueKey,
          projectId: project.id,
        },
      });

      if (issue === undefined) {
        issue = new IssuesEntity();
        issue.blgId = issueData.id;
        issue.issueKey = issueData.issueKey;
        issue.createdAt = new Date();
      }
      issue.project = project;
      issue.issueTypeName = issueData.issueType.name
      issue.summary = issueData.summary
      issue.description = issueData.description
      issue.status = issueData.status.name
      issue.assigneeId = issueData.assignee.id
      issue.assigneeName = issueData.assignee.name
      issue.estimatedHours = issueData.estimatedHours|| 0
      issue.actualHours = issueData.actualHours || 0
      issue.updated = new Date(issueData.updated)
      issue.payload = JSON.stringify(issueData);
      issue.updatedAt = new Date();
      await issue.save();
    }
    return null
  }

  async getIssuesByUser(blgId){
    return this.issueRepository.find({
      where: {
        assigneeId: blgId,
      }
    })
  }

}
