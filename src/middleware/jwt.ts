import { ParameterizedContext } from 'koa';
import * as  jwt from 'jsonwebtoken'

const secrect = "jiubugaosuni"
const cookieKey = "token"
interface VerifyTonken {
	id: number
}
export function publish(ctx: ParameterizedContext, maxAge: number = 3600 * 24, payload: object = {}): void {
	const token = jwt.sign(payload, secrect, { expiresIn: maxAge })
	ctx.cookies.set(cookieKey, token, { maxAge, path: "/" })
	ctx.append("Authorization", token)
	ctx.set("Access-Control-Expose-Headers", 'Authorization')
}

export function verify(ctx: ParameterizedContext) {
	let token = ctx.headers.authorization
	if (!token) return null
	try {
		return jwt.verify(token, secrect) as VerifyTonken
	} catch (error) {
		return null
	}
}

