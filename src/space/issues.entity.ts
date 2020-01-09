import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity("m_issue")
export class IssuesEntity extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column("varchar")
  blgId: string;

  @Column("varchar")
  issueKey: string;

  @Column("varchar")
  issueTypeName: string;

  @Column("text")
  summary: string;

  @Column("text")
  description: string;

  @Column("text")
  status: string;

  @Column("varchar")
  assigneeId: string;

  @Column("varchar")
  assigneeName: string;

  @Column({type:"float",default:0})
  estimatedHours: number;

  @Column({type:"float",default:0})
  actualHours: number;

  @Column()
  updated: Date;

  @Column("simple-json")
  payload: any;

  @Column()
  createdAt?: Date;

  @Column()
  updatedAt?: Date;

  @ManyToOne(type => ProjectEntity, project => project.issues)
  project: ProjectEntity
}
