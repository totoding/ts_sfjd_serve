import { ResponseHelper } from './../ResponseHelper'
import { UserService } from './../../services/admin/userServ'
import * as Router from 'koa-router';
import { InsertResult, UpdateResult } from 'typeorm'
import { User } from '../../entities/admin/User'

const router = new Router({ prefix: "/api/admin/user" })

router.post("/login", async ctx => {
	const resp = await UserService.login(ctx)
	if (resp instanceof User ) {
		ResponseHelper.sendData(resp, ctx)
	} else {
		ResponseHelper.sendError(resp, ctx)
	}
})

router.post("/getUsersBySearchCondition", async ctx => {
	const resp = await UserService.getUsersBySearchCondition(ctx)
	ResponseHelper.sendData(resp, ctx)
})

router.post("/", async ctx => {
	const resp = await UserService.addUser(ctx)
	if (resp instanceof InsertResult) {
		ResponseHelper.sendData("创建用户成功", ctx)
	}else {
		ResponseHelper.sendError(resp, ctx)
	}
})

router.get("/", async ctx => {
	const resp = await UserService.findUser(ctx)
	if (resp) {
		ResponseHelper.sendData(resp, ctx)
	} else {
		ctx.status = 403
	}
})

router.put("/:id", async ctx => {
	const resp = await UserService.updateUser(ctx)
	if (resp instanceof UpdateResult ) {
		if (resp.affected === 1) {
			ResponseHelper.sendData("更新用户成功", ctx)
		} else {
			ResponseHelper.sendError("非法的uuid", ctx, 40002)
		}
	
	} else {
		ResponseHelper.sendError(resp, ctx)
	}
})

router.delete("/:id", async ctx => {
	const resp = await UserService.deleteUser(ctx)
	if (resp instanceof UpdateResult ) {
		if (resp.affected === 1) {
			ResponseHelper.sendData("更新用户成功", ctx)
		} else {
			ResponseHelper.sendError("非法的uuid", ctx, 40002)
		}
	
	} else {
		ResponseHelper.sendError(resp, ctx)
	}
})

export const route = router.routes()