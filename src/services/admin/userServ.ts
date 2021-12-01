import { getRepository } from 'typeorm';
import { validate, ValidationError } from "class-validator"
import { User as AdminUser } from "../../entities/admin/User"

class UserService {
	user: AdminUser
	constructor() {
		this.user = new AdminUser()
	}
	async login(ctx: any): Promise<object | undefined> {
		const { username, password } = ctx.request.body
		this.user.username = username
		this.user.password = password
		const validation: ValidationError[] = await validate(this.user)
		if (validation.length > 0) {
			return validation.map(item => item.constraints)
		}
		const result = await AdminUser.findUserByUserInfo(this.user)
		return result
	}

	async getUsersByFilter(ctx: any): Promise<object | undefined> {
		const { keywords, page } = ctx.request.body
		const u = getRepository(AdminUser)
			.createQueryBuilder("AdminUser")
			// u.where

		return undefined
	}
}

export const UserServ = new UserService()

