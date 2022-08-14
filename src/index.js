import * as dotenv from "dotenv";
dotenv.config();
import express  from "express";
import { Routes } from './routes/index.js'
import { DataBase } from "./config/db.js";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Docs API",
			version: "1.0.0",
			description: "Khoi Library API",
		},
		servers: [
			{
				url: "http://localhost:5001",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const server = express();

server.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));



DataBase;

server.get("/", (req, res) => {
    res.send("aaaaaa");
})

server.use('/api', Routes);

server.listen(process.env.PORT || 5000, () => {
    console.log(`Server run on ${process.env.PORT}`);
});


