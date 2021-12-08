import { ResponseHelper } from './../ResponseHelper'
import { CategoryService } from './../../services/admin/categoryServ'
import * as Router from 'koa-router';
import { InsertResult, UpdateResult } from 'typeorm'
const router = new Router({ prefix: "/api/admin/category" })

router.post("/", async ctx => {
	const resp = await CategoryService.add(ctx)
	if (resp instanceof InsertResult) {
		ResponseHelper.sendData("创建分类称成功", ctx)
	}else {
		ResponseHelper.sendError(resp, ctx)
	}
})

router.get("/", async ctx => {
	const resp = await CategoryService.find()
	ResponseHelper.sendData(resp, ctx)
})

router.put("/:id", async ctx => {
	const resp = await CategoryService.update(ctx)
	if (resp instanceof UpdateResult ) {
		if (resp.affected === 1) {
			ResponseHelper.sendData("更新分类成功", ctx)
		} else {
			ResponseHelper.sendError("非法的uuid", ctx, 40002)
		}
	} else {
		ResponseHelper.sendError(resp, ctx)
	}
})

router.delete("/:id", async ctx => {
	const resp = await CategoryService.delete(ctx)
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