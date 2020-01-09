import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,getConnection } from 'typeorm';

import { BacklogService } from '../backlog/backlog.service';
import { UserEntity } from './user.entity';
import { SpaceEntity } from '../space/space.entity';
import { UserTokenEntity } from './usertoken.entity';

// import { UserDTO } from './user.dto';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserTokenEntity)
    private userTokenRepository: Repository<UserTokenEntity>,
    private backlogService: BacklogService
  ) {}

  /**
   * スペース情報の更新
   * @param space
   */
  async register() {
    const result = await this.backlogService.getProjectUsers()
    const date = new Date()
    for(let userData of result){
      let user = await UserEntity.findOne({
        where: {
          blgUserId: userData.userId,
        },
      })
      if(!user){
        user = new UserEntity()
        user.blgId = userData.id
        user.blgUserId = userData.userId
        user.createdAt = new Date()
      }
      let token = new UserTokenEntity()
      if(!user.token){
        token.token = Math.random().toString(36).slice(-8)
        token.createdAt = date
        token.updatedAt = date
      }else{
        token = user.token
        token.token = Math.random().toString(36).slice(-8)
      }
      user.roleType = userData.roleType
      user.email = userData.mailAddress
      user.name = userData.nulabAccount.name
      user.payload = JSON.stringify(userData)
      user.updatedAt = date
      await user.save()
      token.user = user
      await getConnection().manager.save(token)
    }
    return
  }

  async getAll() {
    return await this.userRepository.find()
  }

  async getUserByEmail(email:string):Promise<UserEntity> {
    return await this.userRepository.findOne({
      email
    })
  }

  async getUserByToken(token: string):Promise<UserEntity> {
    const userToken = await this.userTokenRepository.findOne({
      where: {token},
      relations: ["user"]
    })
    return userToken.user
  }
}
