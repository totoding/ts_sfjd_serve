import { BaseEntity } from 'typeorm';
import { validate } from 'class-validator'
import { ClassConstructor, plainToClass } from "class-transformer"



export abstract class Base {

	public async validateThis(skipMissing = false): Promise<string[]> {
		const errors = await validate(this, {
				skipMissingProperties: skipMissing
		})
		const temp = errors.map(e =>e.constraints ? Object.values(e.constraints) : [])
		const result: string[] = []
		temp.forEach(t => {
			result.push(...t)
		})
		return result
}


	protected static baseTransform<T>(cls: ClassConstructor<T>, plainObject: object): T {
		if (plainObject instanceof cls) {
			return plainObject
		}
		return plainToClass(cls, plainObject)
	}

}