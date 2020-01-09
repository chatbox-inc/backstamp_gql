import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinTable } from 'typeorm';
import { UserTokenEntity } from './usertoken.entity';

@Entity("m_user")
export class UserEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column("bigint")
  blgId?: number;

  @Column("varchar")
  blgUserId?: string;

  @Column("varchar")
  roleType: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  email: string;

  @Column("varchar")
  payload: string;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @OneToOne(type=>UserTokenEntity, token => token.user,{
    eager: true
  })
  @JoinTable()
  token: UserTokenEntity

}
