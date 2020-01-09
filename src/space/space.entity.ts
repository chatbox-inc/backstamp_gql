import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity("m_space")
export class SpaceEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column("varchar")
  spaceKey: string;

  @Column("varchar")
  domain: string;

  @Column("varchar")
  ownerId: string;

  @Column("varchar")
  name: string;

  @Column("simple-json")
  payload: any;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @OneToMany(type =>ProjectEntity, project => project.space)
  project: ProjectEntity

}
