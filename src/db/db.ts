/**
 * @description 连接数据库 注意低版本不支持fs/promises
 */

import * as path from 'path';
import * as fs from 'fs/promises';
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User as AdminUser } from './admin/User';

(async () => {
	try {
		const resp = await fs.readFile(path.resolve(__dirname, "../../sysConfig.confs"))
		createConnection({
			type: "mysql",
			host: "101.43.53.71",
			port: 3306,
			username: "root",
			password: "Hny_158405",
			database: "sfjd",
			entities: [AdminUser],
			synchronize: true,
			logging: false,
		})
		
	} catch (error) {
		throw new Error(error)
	}
})()


