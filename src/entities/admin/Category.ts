
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn,  DeleteDateColumn, getRepository } from "typeorm"
import { IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'
import { Base } from '../common/BaseEntity'

@Entity("admin_category")
export class Category extends Base {

	@PrimaryGeneratedColumn("uuid")
	@Type(() => String)
	id: string

	@Column({ length: 100 })
	@IsNotEmpty({ message: "分类名不能为空" })
	@Type(() => String)
	name: string

	@Column({ length: 100, nullable: true })
	@Type(() => String)
	simple_name: string

	@Column({ default: "0", length: 4 })
	@IsNotEmpty({ message: "分类id不能为空" })
	@Type(() => String)
	category_id: string

	@Column({ length: 36, default: "0" })
	@IsNotEmpty({ message: "上级id不能为空" })
	@Type(() => String)
	parent_id: String

	@Column({ nullable: false, default: 0 })
	@IsNotEmpty({ message: "分类等级不能为空" })
	@Type(() => Number)
	level: number

	@Column({ length: 255, nullable: true})
	@IsNotEmpty({ message: "分类介绍不能为空" })
	@Type(() => String)
	description: string

	@Column({ default: 0, width: 2 })
	@Type(() => Number)
	status: number = 0

	@CreateDateColumn()
	createTime?: string

	@UpdateDateColumn()
	updateTime?: string

	@DeleteDateColumn()
	@Type(() => String)
	deteleTime?: string

	static add(values) {
		return getRepository(this).insert(values)
	}

	static update(id: string, values) {
		return getRepository(this).update(id, values)
	}

	static find() {
		return getRepository(this).find({
			select: ["id", "category_id", "parent_id","name", "level", "description"]
		})
 	} 
}

