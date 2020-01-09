import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToOne, JoinTable, JoinColumn } from 'typeorm';
import {UserEntity} from './user.entity';

@Entity("m_user_token")
export class UserTokenEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  token?: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToOne(type => UserEntity, user => user.token)
  @JoinColumn()
  @JoinTable()
  user: UserEntity;
}
