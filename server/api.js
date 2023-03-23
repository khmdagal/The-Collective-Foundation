
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


router.get("/pages/:page_title/:record_id", async (req, res) => {
	try {
		const page_title = req.params.page_title;

		const record_id = req.params.record_id;

		const findPageId = await db.query(
			`select page_id from pages where page_title = '${page_title}'`
		);

		const page_id = findPageId.rows[0].page_id;
		console.log("Page id-->", page_id);

		const deletingModule = await Promise.all([
			db.query(`SELECT * from modules WHERE page_id = $1 AND record_id = $2`, [
				+page_id,
				+record_id,
			]),
		]);

		console.log(deletingModule[0].rows);

		res.status(200).json(deletingModule[0].rows);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}

	
});
export default router;


/*
// try {
	// 	const page_id = req.params.page_id;
	// 	const record_id = req.params.record_id;

	// 	const deleteModule = await db.query(
	// 		`select * from modules where page_id = $1 and record_id = $2`,[+page_id,+record_id]
	// 	);

	// 	console.log(deleteModule.rows);

	// 	res.status(200).json(deleteModule.rows);
	// } catch (err) {
	// 	console.error(err);
	// 	res.status(500).send(err);
	// }

*/