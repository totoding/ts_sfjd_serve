import { Type } from 'class-transformer'
import { IsNotEmpty, MinLength } from 'class-validator'

export class User {
	@IsNotEmpty({ message: "用户名不能为空" })
	@Type(() => String)
	public name: string
	
	@IsNotEmpty({ message: "密码不能为空" })
	@MinLength(4, { message: "密码最少长度为4位" })
	@Type(() => String)
	public password: string

	public passwordAgain?: string
}

