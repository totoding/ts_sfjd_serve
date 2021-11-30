import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm"

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number
	
	@Column({ length: 100 })
	name: string

	@Column({ length: 100 }) 
	password: string

	@CreateDateColumn()
  createTime:string

	@UpdateDateColumn()
	updateTime:string
}