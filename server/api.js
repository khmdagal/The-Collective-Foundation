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
			res.status(500).send(err);
			console.error(err);
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
			"select page_id from pages where page_title = $1",
			[pageTitle]
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

// add new page endpoint

router.post("/pages/:newpage", async (req, res) => {
	const newpage = req.params.newpage;
	const { page_title, page_path } = req.body;

	if ( !page_title || !page_path) {
		res.status(500).json("Please fill all the fields");
	}

	try {
		// introduce a new row into the pages table
		const CreateNewPage = await db.query(
			`INSERT INTO pages (page_title, page_path)
      VALUES ($1, $2,)`,
			[newpage, page_path]
		);


		return res.status(200).json({
			message: " page has been created",
		});
	} catch (error) {
		res.status(500).json({ error });
	}
});

// delete new page endpoint
router.delete("/pages/deletepages/:page_id", async (req, res) => {
	try {
		const pageTitle = req.params.page_title;

		const findPageId = await db.query(
			"select page_id from pages where page_title = $1",
			[pageTitle]
		);
		const page_id = findPageId.rows[0].page_id;

			if (findPageId.rows.length > 0) {
				return res.status(400).json({
					message: "please delete the modules first",
				});
			}
		const deletingPage = await db.query(
			"delete from pages WHERE page_id = $1",
			[page_id]
		);
		res.status(200).json(deletingPage[0].rows);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});
export default router;
