import * as Router from 'koa-router';
import{ UserServ as UserService }from '../../services/admin/userServ';
const router = new Router({ prefix: "/api/admin/user" })


router.post("/login", async ctx => {

	await UserService.login(ctx)
	const resp = {
		code: 200,
		msg: "成功"
	}
	ctx.body = resp
})

export const route = router.routes()