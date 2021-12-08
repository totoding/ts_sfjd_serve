/**
 * @description 连接数据库 注意低版本不支持fs/promises
 */

import * as path from 'path';
import * as fs from 'fs/promises';
import { Buffer } from 'buffer';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User as AdminUser } from './admin/User';
import { Category as AdminCategory } from './admin/Category';

(async () => {
	try {
		const configBuffer: Buffer = await fs.readFile(path.resolve(__dirname, "../../sysConfig.conf"))
		const configString: string = configBuffer.toString()
		const config: any[] = configString.split("\r\n").map(item => {
			const items = item.split("=")
			return { [items[0]]: items[1] }
		})
		createConnection({
			type: "mysql",
			host: config[1].host,
			port: 3306,
			username: config[2].username,
			password: config[3].password,
			database: "sfjd",
			entities: [AdminUser, AdminCategory],
			synchronize: true,
			logging: true,
		})
	} catch (error) {
		throw new Error(error)
	}
})()


