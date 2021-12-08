import { ParameterizedContext } from 'koa'
import { User } from "../../entities/admin/User"
import { Base } from "../../entities/common/BaseEntity"
import { SearchCondition } from '../../entities/common/SearchCondition'
import { publish } from '../../middleware/jwt'


export class UserService extends Base {

	public static async getUsersBySearchCondition(ctx: ParameterizedContext) {
		const { keywords, page = 1, limit = 10 } = ctx.request.body
		const condition = SearchCondition.transform({ keywords, page, limit })
		const errors = await condition.validateThis(true)
		if (errors.length > 0) {
			return {
				count: 0,
				data: [],
				errors
			}
		}
		const result = await User.getColomnsBySearchCondition(condition)
		return {
			count: result[1],
			data: result[0],
			errors: []
		}
	}

	public static async login(ctx: ParameterizedContext): Promise<any[] | User | undefined> {
		const { username, password } = ctx.request.body
		const userInfo = super.baseTransform(User, { username, password })
		const errors = await userInfo.validateThis(true)
		if (errors.length > 0) {
			return errors
		}
		const result = await User.findByUserInfo({ username, password })
		if (result) {
			publish(ctx,  3600 * 24, { id: result.id })
		}
		return result
	}

	public static async addUser(ctx: ParameterizedContext) {
		const { username, password, realname, avatar } = ctx.request.body
		const userInfo = super.baseTransform(User, { username, password, realname, avatar })
		const errors = await userInfo.validateThis(true)
		if (errors.length > 0) {
			return errors
		}
		const isSameUsername = await User.findByUserInfo({ username })
		if (isSameUsername) {
			return "用户名已存在"
		}
		const result = await User.add(userInfo)
		return result
	}

	public static async deleteUser(ctx: ParameterizedContext) {
		const id = ctx.params.id
		const del = { deteleTime: new Date() }
		const userInfo = super.baseTransform(User, del)
		const result = await User.upDateById(id, userInfo)
		return result
	}

	public static async updateUser(ctx: ParameterizedContext) {
		const { password, realname, avatar } = ctx.request.body
		const id = ctx.params.id
		const userInfo = super.baseTransform(User, { password, realname, avatar })
		const errors = await userInfo.validateThis(true)
		if (errors.length > 0) {
			return errors
		}
		const result = await User.upDateById(id, userInfo)
		return result
	}

	public static async findUser(ctx: ParameterizedContext) {
		const { uuid } = ctx.request.body
		const result = await User.findRealNameById(uuid)
		return result
	}
}





