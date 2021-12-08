import { ParameterizedContext } from 'koa'
import { Category } from "../../entities/admin/Category"
import { Base } from "../../entities/common/BaseEntity"

export class CategoryService extends Base {

	public static async add(ctx: ParameterizedContext) {
		const { name, categoryId, level, description } = ctx.request.body
		const values = this.baseTransform(Category, { name, categoryId, level, description })
		const errors = await values.validateThis(true)
		if (errors.length > 0) {
			return errors
		}
		return await Category.add({ name, category_id: categoryId, level, description })
	}

	public static async delete(ctx: ParameterizedContext) {
		const id = ctx.params.id
		return await Category.update(id, { deteleTime: new Date() })
	}

	public static async update(ctx: ParameterizedContext) {
		const id = ctx.params.id
		const { name, categoryId, level, description } = ctx.request.body
		const values = this.baseTransform(Category, { name, categoryId, level, description })
		const errors = await values.validateThis(true)
		if (errors.length > 0) {
			return errors
		}
		return await Category.update(id, { name, category_id: categoryId, level, description } )
	}

	public static async find() {
		return await Category.find()
	}

}