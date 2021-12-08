
import { SearchCondition } from './../common/SearchCondition'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, InsertResult, DeleteDateColumn, DeleteResult, UpdateResult, Like, getRepository } from "typeorm"
import { IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'
import { Base } from '../common/BaseEntity'

interface ParamsType {
	username?: string
	password?: string
	realname?: string,
	avatar?: string
}

@Entity("admin_user")
export class User extends Base {

	@PrimaryGeneratedColumn("uuid")
	@Type(() => Number)
	id: number

	@Column({ length: 100 })
	@IsNotEmpty({ message: "用户名不能为空" })
	@Type(() => String)
	username: string

	@Column({ length: 100 })
	@IsNotEmpty({ message: "密码不能为空" })
	@Type(() => String)
	password: string

	@Column({ length: 100, nullable: true })
	@Type(() => String)
	realname?: string

	@Column({ length: 100, nullable: true })
	@Type(() => String)
	avatar?: string

	@CreateDateColumn()
	createTime?: string

	@UpdateDateColumn()
	updateTime?: string

	@DeleteDateColumn()
	@Type(() => String)
	deteleTime?: string

	static findRealNameById(id: number): Promise<User | undefined> {
		return getRepository(this).findOne({
			select: ["realname"],
			where: { id }
		})
	}

	static findByUserInfo(userInfo: ParamsType): Promise<User | undefined> {
		const where = {}
		for (const key in userInfo) {
			where[key] = userInfo[key]
		}
		return getRepository(this).findOne({
			select: ["id", "username"],
			where: [where]
		})
	}

	static add({ username, password, realname, avatar }: User): Promise<InsertResult> {
		return getRepository(this).insert({ username, password, realname, avatar })
	}

	static upDateById(id: number, values: User): Promise<UpdateResult> {
		return getRepository(this).createQueryBuilder("AdminUser")
			.update(User)
			.set(values)
			.where("id = :id", { id: id })
			.execute()
	}

	static removeById(id: number): Promise<DeleteResult> {
		return getRepository(this).createQueryBuilder("AdminUser")
			.delete()
			.where("id = :id", { id })
			.execute()
	}

	static getColomnsBySearchCondition(condition: SearchCondition): Promise<[User[], number]> {
		const where: any[] = []
		if (condition.keywords) {
			const realname = Like(`%${condition.keywords}%`)
			where.push({ realname })
		}
		return getRepository(this).findAndCount({
			select: ["id", "realname"],
			where,
			skip: (condition.page - 1) * condition.limit,
			take: condition.limit,
		})
	}
}

