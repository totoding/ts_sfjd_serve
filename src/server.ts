import { getManager, getRepository } from "typeorm"
import * as Koa from 'koa'
import * as cors from 'koa-cors'
import * as koaBody from 'koa-body'
const app = new Koa()

app.use(cors())
app.use(koaBody({	multipart: true }))

import { route as adminRouter } from "./routes/admin/UserRoute"
app.use(adminRouter)

app.listen(3000, () => {
	console.log('Server running on port 3000')
})