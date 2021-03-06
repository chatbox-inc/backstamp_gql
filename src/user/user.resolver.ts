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

import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(
    private userService: UserService,
  ) {}

  @Query()
  async users() {
    return await this.userService.getAll();
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
