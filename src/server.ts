import * as Koa from 'koa'
import * as cors from 'koa-cors'
import * as koaBody from 'koa-body'
const app = new Koa()

app.use(cors())
app.use(koaBody({	multipart: true }))

import { route as adminUserRouter } from "./routes/admin/UserRoute"
import { route as adminCategoryRouter } from "./routes/admin/CategoryRoute"
import { tokenMiddleware } from './middleware/token'
app.use(tokenMiddleware)
app.use(adminUserRouter)
app.use(adminCategoryRouter)


app.listen(3000, () => {
	console.log('Server running on port 3000')
})