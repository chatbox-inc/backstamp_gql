import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { SpaceService} from './space.service';

@Injectable()
export class SpaceCommand {
  constructor(
    private readonly spaceService: SpaceService
  ) { }

  // autoExit defaults to `true`, but you can use `autoExit: false` if you need more control
  @Command({ command: 'space:create <account>', describe: 'create a user', autoExit: true })
  async create(
    @Positional({
      name: 'account',
      describe: 'the user account string',
      type: 'string',
    }) account: string,
  ) {
    const space = await this.spaceService.registerSpace()
    const project = await this.spaceService.registerProject(space)
    await this.spaceService.registerIssues(project,"2019-12-01")
    console.log("hogehgedddddddddodd");
  }
}
