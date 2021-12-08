import { ParameterizedContext, Next } from 'koa';
import { verify } from './jwt'
import { pathToRegexp } from 'path-to-regexp'

const needTokenApi = [
	{ method: "GET", path: "/api/admin/user" },
	{ method: "GET", path: "/api/admin/user/login" }
]

export async function tokenMiddleware(ctx:ParameterizedContext, next: Next) {
	const apis = needTokenApi.filter((api) => {
    const reg = pathToRegexp(api.path)
    return api.method === ctx.request.method && reg.test(ctx.request.path);
  })
	if (apis.length === 0) {
    await next()
    return
  }
  const result = verify(ctx)
  if (result) {
    ctx.request.body.uuid = result.id
    await next()
  } else {
    ctx.status = 403
  }
}