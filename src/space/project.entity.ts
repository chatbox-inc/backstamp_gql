import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne } from 'typeorm';
import { IssuesEntity } from './issues.entity';
import { SpaceEntity } from './space.entity';

@Entity("m_project")
export class ProjectEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column("bigint")
  blgId?: number;

  @Column("varchar")
  projectKey: string;

  @Column("varchar")
  name: string;

  @Column("simple-json")
  payload: any;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @OneToMany(type =>IssuesEntity, issue => issue.project)
  issues: IssuesEntity[]

  @ManyToOne(type =>SpaceEntity, space => space.project)
  space: SpaceEntity
}
