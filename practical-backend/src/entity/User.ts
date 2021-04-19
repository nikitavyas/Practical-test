import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, AfterLoad} from 'typeorm'
import * as bcrypt from 'bcrypt';

@Entity()
export class User {

  public tempPassword: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  gender: string;

  @Column()
  dob: Date;

  @Column({type: 'boolean', default: () => true})
  isActive: boolean;

  @Column({type: 'timestamp'})
  updatedAt: Date;

  @AfterLoad()
  private loadTempPassword(): void {
    this.tempPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    // Password same checks
    if (this.tempPassword !== this.password) {
        this.password = await bcrypt.hash(this.password, 10)
    }
  }
}