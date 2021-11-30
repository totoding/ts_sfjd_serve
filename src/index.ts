import "reflect-metadata";
import './db/db';
import { User } from './db/admin/User';
import { getConnection } from "typeorm";

const a = getConnection()
const b = new User()
b.name = "a"
b.password = "2"
a.manager.save(b)
	.then(user => {
		console.log(user)
	})
// import { User } from './entities/admin/User';
// import { validate } from 'class-validator';
// import { plainToClass } from 'class-transformer';
// const u = new User()
// const m:any = {
// 	name: "123",
// 	password: "123232"
// }
// const mm = plainToClass(User, m as Object)

// validate(mm).then(err => console.log(err))