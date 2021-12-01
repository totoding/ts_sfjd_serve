
/**
 * @description 
 */
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, InsertResult, DeleteDateColumn, DeleteResult, UpdateResult } from "typeorm"
import { IsNotEmpty } from 'class-validator'

@Entity("admin_user")
export class User extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number

	@Column({ length: 100 })
	@IsNotEmpty({ message: "用户名不能为空" })
	username: string

	@Column({ length: 100 })
	@IsNotEmpty({ message: "密码不能为空" })
	password: string

	@Column({ length: 100, nullable: true })
	realname?: string

	@Column({ length: 100, nullable: true })
	avatar?: string

	@CreateDateColumn()
	createTime?: string

	@UpdateDateColumn()
	updateTime?: string

	@DeleteDateColumn()
	deteleTime?: string

	static findRealNameById(id: number): Promise<User | undefined> {
		return this.createQueryBuilder("AdminUser")
			.select(["AdminUser.realname"])
			.where("AdminUser.id = :id", { id })
			.getOne()
	}

	static findUserByUserInfo({ password, username }: User): Promise<User | undefined> {
		return this.createQueryBuilder("AdminUser")
			.select(["AdminUser.id", "AdminUser.realname"])
			.where("AdminUser.username = :username", { username })
			.andWhere("AdminUser.password = :password", { password })
			.getOne()
	}

	static addUser(values: User): Promise<InsertResult> {
		return this.createQueryBuilder("AdminUser")
			.insert()
			.into(User)
			.values(values)
			.execute()
	}

	static upDateUserById(id: number, values: User): Promise<UpdateResult> {
		return this.createQueryBuilder("AdminUser")
			.update(User)
			.set(values)
			.where("id = id", { id })
			.execute()
	}

	static removeUserById(id: number): Promise<DeleteResult> {
		return this.createQueryBuilder("AdminUser")
			.delete()
			.where("id = :id", { id })
			.execute()
	}

	static findUsersByFilter(callback: () => Promise<User | undefined>): Promise<User | undefined> {
		return callback()
	}
}
