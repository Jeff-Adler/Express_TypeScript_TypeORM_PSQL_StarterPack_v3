import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  Unique,
  BeforeInsert,
  BeforeUpdate
} from 'typeorm';
import { IUser } from '@interfaces/user.interface';
import { IsEmail, MinLength, validateOrReject } from 'class-validator';
import { normalizeEmailAddress } from '@utils/normalizeEmailAddress';

@Entity()
@Unique(['email'])
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsEmail()
  email!: string;

  @Column({ select: false })
  @MinLength(8)
  password!: string;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;

  // @BeforeInsert()
  // @BeforeUpdate()
  // async validate() {
  //   await validateOrReject(this);
  // }

  @BeforeInsert()
  @BeforeUpdate()
  normalizeEmail = () => {
    normalizeEmailAddress(this.email);
  };
}
