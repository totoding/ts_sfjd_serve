import "reflect-metadata";
import { createConnection } from "typeorm";
import { User as AdminUser } from './admin/User';

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
