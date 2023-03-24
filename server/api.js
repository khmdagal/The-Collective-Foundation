/* eslint-disable semi */
/* eslint-disable arrow-parens */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
import { Router } from "express";
import db from "./db";
import logger from "./utils/logger";

const router = Router();

router.get("/", (_, res) => {
	logger.debug("Welcoming everyone...");
	res.json({ message: "Hello, world!" });
});
router.get("/pages", (req, res) => {
	db.query("select * from pages")
		.then((pages) => res.status(200).json(pages.rows))
		.catch((err) => {
			console.error(err);
			res.status(500).send(err);
		});
});

//improved endpoints

router.get("/pages/:title", async (req, res) => {
	try {
		const pageName = req.params.title;

		const modulesInfoResponse = await db.query(
			`SELECT m.module_Type, m.record_id
							FROM modules AS m
							INNER JOIN pages AS p ON p.page_id = m.page_id
							WHERE p.page_title = $1`,
			[pageName]
		);

		const modulesInfo = modulesInfoResponse.rows;

		const result = await Promise.all(
			modulesInfo.map(async (info) => {
				const detailsResponse = await db.query(
					`SELECT * from ${info.module_type}
								WHERE record_id = $1`,
					[+info.record_id]
				);
				return {
					type: info.module_type,
					details: detailsResponse.rows[0],
				};
			})
		);

		res.status(200).json({
			title: req.params.title,
			modules: result,
		});
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
});


router.get("/module/:moduleType", (req, res) => {
	const selectedModuleType = req.params.moduleType
	
		db.query(`select *  from ${selectedModuleType}`)
			.then((moduleList) => res.status(200).json(moduleList.rows))
			.catch((err) => {
				console.error(err);
				res.status(500).send(err);
			});
	});
	


// getting available modules
router.get("/listOfmodules", (req, res) => {
	db.query("select distinct module_type from modules")
		.then((moduleList) => res.status(200).json(moduleList.rows))
		.catch((err) => {
			console.error(err);
			res.status(500).send(err);
		});
});


// Drop down menu change
router.get("/module/:moduleType", (req, res) => {
const selectedModuleType = req.params.moduleType

	db.query(`select *  from ${selectedModuleType}`)
		.then((moduleList) => res.status(200).json(moduleList.rows))
		.catch((err) => {
			console.error(err);
			res.status(500).send(err);
		});
});

export default router;
