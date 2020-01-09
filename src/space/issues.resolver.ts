import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
  Context,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { AuthGuard } from '../user/auth.guard';
import { SpaceService } from './space.service';

@Resolver()
export class IssuesResolver {
  constructor(
    private userService: UserService,
    private spaceSercice: SpaceService
  ) {}

  @Query()
  @UseGuards(AuthGuard)
  async issues(
    @Context('user') user,
  ) {
    const issues = await this.spaceSercice.getIssuesByUser(user.blgId)
    console.log("issues",issues,user.blgId)
    return issues;
  }
  //
  // @Query()
  // async user(@Args('username') username: string) {
  //   return await this.userService.read(username);
  // }
  //
  // @Query()
  // @UseGuards(new AuthGuard())
  // async whoami(@Context('user') user) {
  //   const { username } = user;
  //   return await this.userService.read(username);
  // }
  //
  // @Mutation()
  // async login(
  //   @Args('username') username: string,
  //   @Args('password') password: string,
  // ) {
  //   const user: UserDTO = { username, password };
  //   return await this.userService.login(user);
  // }
  //
  // @Mutation()
  // async register(
  //   @Args('username') username: string,
  //   @Args('password') password: string,
  // ) {
  //   const user: UserDTO = { username, password };
  //   return await this.userService.register(user);
  // }
  //
  // @ResolveProperty()
  // async comments(@Parent() user) {
  //   const { id } = user;
  //   return await this.commentService.showByUser(id);
  // }
}
