import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Index('employee_pkey', ['id'], { unique: true })
@Entity('employee', { schema: 'public' })
export class Employee {
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'gen_random_uuid()',
  })
  id: string;

  @Column('timestamp with time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Column('text', { name: 'name' })
  name: string;

  @Column({ type: 'uuid', nullable: true })
  head_id: string;

  @ManyToOne(() => Employee, (employee) => employee.employees, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'head_id', referencedColumnName: 'id' }])
  head: Employee;

  @OneToMany(() => Employee, (employee) => employee.head)
  employees: Employee[];
}
