import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class UserCommand {
  constructor(
    private readonly userService: UserService,
  ) { }

  // autoExit defaults to `true`, but you can use `autoExit: false` if you need more control
  @Command({ command: 'user:create <account>', describe: 'create a user', autoExit: true })
  async create(
    @Positional({
      name: 'account',
      describe: 'the user account string',
      type: 'string',
    }) account: string,
  ) {
    await this.userService.register();
    console.log("user command");
  }
}
