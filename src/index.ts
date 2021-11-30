import "reflect-metadata";
import './db/db';
import { getManager,getRepository } from "typeorm";
import { User } from './db/admin/User';

// setTimeout(() => {
// 	const user = new User()
// 		user.name = "admin1"
// 		user.password ="1230"
// 		getManager().save(user)
// }, 2000)
// conenct
// .then(() => {
// 	const user = new User()
// 	user.name = "admin"
// 	user.password ="1230"
// 	getManager().save(user)
// })
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