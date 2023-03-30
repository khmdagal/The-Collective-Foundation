import { Router } from "express";
import db from "./db";
import logger from "./utils/logger";
const cors = require("cors");
const router = Router();
router.use(cors());

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


//Linking Modules and their respective pages

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


// Deleting module endpoint
router.delete("/pages/:page_title/:record_id", async (req, res) => {
	try {
		const pageTitle = req.params.page_title;

		const record_id = req.params.record_id;

		const findPageId = await db.query(
			`select page_id from pages where page_title = $1`,[pageTitle]
		);
		const page_id = findPageId.rows[0].page_id;
		const deletingModule = await db.query(
			"delete from modules WHERE page_id = $1 AND record_id = $2",
			[+page_id, +record_id]
		);
		res.status(200).json(deletingModule[0].rows);

	} catch (err) {
		console.error(err);
	res.status(500).json({ error: err.message });
	}


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


 // add new page



router.post("/pages/:newpage", async (req, res) => {
	const pageTitle = req.params.pageTitle;
	const { page_id, page_title, page_path } = req.body;

	if (!page_id || !page_title  || !page_path) {
		res.status(500).json("Please fill all the fields");
	}

	try {
		// First inserting the pages tablepost
		const pages = await db.query(
			`INSERT INTO pages (page_title, page_path)
      VALUES ($1, $2)`,
			[page_title, page_path]
		);

		//Second finding the page id
		const findPageId = await db.query(
			`select page_id from pages where page_title = $1`,
			[pageTitle]
		);
		const page_id = findPageId.rows[0].page_id;
		console.log(page_id);

		// third finding the last record in the pages table
		const lastRecord = await db.query(
			`select record_id from pages order by record_id desc limit 1`
		);
		const record_id = lastRecord.rows[0].record_id;

		// fourth inserting the above datas into the pages table
		const insertingModulesTable = await db.query(
			`insert into pages(page_id,page_title,record_id) values($1,$2,$3)`,
			[page_id, "pages", record_id]
		);

		return res.status(200).json({
			message: `Data is stored successfuly into pages table`,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({ error });
	}
});

// delete page
router.delete("/pages/:page_title/:record_id", async (req, res) => {
	try {
		const pageTitle = req.params.page_title;

		const record_id = req.params.record_id;

		const findPageId = await db.query(
			`select page_id from pages where page_title = $1`,[pageTitle]
		);
		const page_id = findPageId.rows[0].page_id;
		const deletingPage = await db.query(
			"delete from modules WHERE page_id = $1 AND record_id = $2",
			[+page_id, +record_id]
		);
		res.status(200).json(deletingpage[0].rows);

	} catch (err) {
		console.error(err);
	res.status(500).json({ error: err.message });
	}


});
export default router;