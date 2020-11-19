import Profile from '@modules/profiles/typeorm/entities/Profile';
import User from '@modules/users/typeorm/entities/User';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('roles')
class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  description: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'users_roles',
    joinColumns: [{name: 'role_id'}],
    inverseJoinColumns: [{ name: 'user_id' }],
  })
  users: User[];

  @ManyToMany(() => Profile)
  @JoinTable({
    name: 'profiles_roles',
    joinColumns: [{name: 'role_id'}],
    inverseJoinColumns: [{ name: 'profile_id' }],
  })
  profiles: Profile[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Role;
