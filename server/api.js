/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable no-console */
import { Router } from "express";
import { Await } from "react-router-dom";
import db from "./db";
import logger from "./utils/logger";

const cors = require("cors");
const router = Router();
const bodyParser = require("body-parser");



router.use(cors());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());



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
router.delete("/pages/:page_title/:module_type/:record_id", async (req, res) => {
	try {
		const pageTitle = req.params.page_title;
		const moduleTpe = req.params.module_type;
		const record_id = req.params.record_id;

		const findPageId = await db.query(
			`select page_id from pages where page_title = $1`,
			[pageTitle]
		);
		const page_id = findPageId.rows[0].page_id;
		const deletingModule = await db.query(
			"delete from modules WHERE page_id = $1 AND module_type = $2 AND record_id = $3",
			[+page_id, moduleTpe, +record_id]
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

router.post("/modules/textBanner/:pageTitle", async (req, res) => {
	const pageTitle = req.params.pageTitle;
	const { boldText, normalText, background } = req.body;

	if (!boldText || !normalText || !background) {
		res.status(500).json("Please fill all the fields");
	}

	try {
		// First inserting the textBanner table
		const textBannerData = await db.query(
			`INSERT INTO textbanner (textbold, textnormal, background) 
      VALUES ($1, $2, $3)`,
			[boldText, normalText, background]
		);

		//Second finding the pagge id
		const findPageId = await db.query(
			`select page_id from pages where page_title = $1`,
			[pageTitle]
		);
		const page_id = findPageId.rows[0].page_id;

		// third finding the last record in the textBnner table
		const lastRecord = await db.query(
			`select record_id from textbanner order by record_id desc limit 1`
		);
		const record_id = lastRecord.rows[0].record_id;

		// fourth inserting the above datas into the modules table
		const insertingModulesTable = await db.query(
			`insert into modules(page_id,module_type,record_id) values($1,$2,$3)`,
			[page_id, "textBanner", record_id]
		);

		return res.status(200).json({
			message: `Data is stored successfuly into textBanner table`,
		});
	} catch (error) {
		console.error(error);


		res.status(500).json({ error });
	}
});

router.post("/modules/imageAndTexts/:pageTitle", async (req, res) => {
	const pageTitle = req.params.pageTitle;
	const { text_header,text_body,image,button,hasbutton,imagetext_direction } = req.body;

	if (
		!text_header ||
		!text_body ||
		!image ||
		!button ||
		!hasbutton ||
		!imagetext_direction
	) {
		res.status(500).json("Please fill all the fields");
	}

	try {
		
		// First inserting the textBanner table
		const imageAndTexts = await db.query(
			`INSERT INTO imageandtexts (text_header,text_body,image,button,hasbutton,imagetext_direction) 
      VALUES ($1, $2, $3,$4,$5,$6)`,
			[text_header, text_body, image, button, hasbutton, imagetext_direction]
		);

		//Second finding the pagge id
		const findPageId = await db.query(
			`select page_id from pages where page_title = $1`,
			[pageTitle]
		);
		const page_id = findPageId.rows[0].page_id;
		console.log(page_id);

		// third finding the last record in the textBnner table
		const lastRecord = await db.query(
			`select record_id from imageAndTexts order by record_id desc limit 1`
		);
		const record_id = lastRecord.rows[0].record_id;

		// fourth inserting the above datas into the modules table
		const insertingModulesTable = await db.query(
			`insert into modules(page_id,module_type,record_id) values($1,$2,$3)`,
			[page_id, "imageAndTexts", record_id]
		);
		
		return res.status(200).json({
			message: `Data is stored successfuly into imageAndTexts table`,
		});
	} catch (error) {
		console.error(error);
		
		res.status(500).json({ error });
	}
});


router.post("/modules/textBanner/:pageTitle", async (req, res) => {
	const pageTitle = req.params.pageTitle;
	const { boldText, normalText, background } = req.body;

	if (!boldText || !normalText || !background) {
		res.status(500).json("Please fill all the fields");
	}

	try {
		
		// First inserting the textBanner table
		const textBannerData = await db.query(
			`INSERT INTO textbanner (textbold, textnormal, background) 
      VALUES ($1, $2, $3)`,
			[boldText, normalText, background]
		);

		//Second finding the pagge id
		const findPageId = await db.query(
			`select page_id from pages where page_title = $1`,
			[pageTitle]
		);
		const page_id = findPageId.rows[0].page_id;

		// third finding the last record in the textBnner table
		const lastRecord = await db.query(
			`select record_id from textbanner order by record_id desc limit 1`
		);
		const record_id = lastRecord.rows[0].record_id;

		// fourth inserting the above datas into the modules table
		const insertingModulesTable = await db.query(
			`insert into modules(page_id,module_type,record_id) values($1,$2,$3)`,
			[page_id, "textBanner", record_id]
		);

		

		return res.status(200).json({
			message: `Data is stored successfuly into textBanner table`,
		});
	} catch (error) {
		console.error(error);
		
		res.status(500).json({ error });
	}
});	


router.post("/modules/imageAndTexts/:pageTitle", async (req, res) => {
	const pageTitle = req.params.pageTitle;
	const {
		text_header,
		text_body,
		image,
		button,
		hasbutton,
		imagetext_direction,
	} = req.body;

	if (!text_header || !text_body || !image || !button) {
		res.status(500).json("Please fill all the fields");
	}

	try {
		const findPageId = await db.query(
			`SELECT page_id FROM pages WHERE page_title = $1`,
			[pageTitle]
		);
		const page_id = findPageId.rows[0].page_id;

		const imageAndTexts = await db.query(
			`insert into imageandtexts (text_header, text_body, image, button, hasbutton, imagetext_direction) 
       VALUES ($1, $2, $3, $4, $5, $6) returning record_id`,
			[text_header, text_body, image, button, hasbutton, imagetext_direction]
		);

		const record_id = imageAndTexts.rows[0].record_id;

		const insertingModulesTable = await db.query(
			`INSERT INTO modules (page_id, module_type, record_id) VALUES ($1, $2, $3)`,
			[page_id, "imageAndTexts", record_id]
		);

		return res.status(200).json({
			message: `Data is stored successfully into imageAndTexts table`,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({ error });
	}

	try {
		// First inserting the textBanner table
		const imageAndTexts = await db.query(
			`INSERT INTO herobanner (hero_image,hero_text) 
      VALUES ($1, $2)`,
			[heroImage, heroText]
		);

			// Second finding the page id
			const findPageId = await db.query(
				`SELECT page_id FROM pages WHERE page_title = $1`,
				[pageTitle]
			);
			const page_id = findPageId.rows[0].page_id;

		// third finding the last record in the textBnner table
		const lastRecord = await db.query(
			`select record_id from herobanner order by record_id desc limit 1`
		);
		const record_id = lastRecord.rows[0].record_id;

		// fourth inserting the above datas into the modules table
		const insertingModulesTable = await db.query(
			`insert into modules(page_id,module_type,record_id) values($1,$2,$3)`,
			[page_id, "heroBanner", record_id]
		);

		return res.status(200).json({
			message: `Data is stored successfuly into imageAndTexts table`,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({ error });
	}
});
// add new page endpoint

router.post("/pages/newpage", async (req, res) => {
	// const newpage = req.params.newpage;
	const { pageTitle, pagePath } = req.body;

	if (!pageTitle || !pagePath) {
		res.status(500).json("Please fill all the fields");
	}

	try {
		// introduce a new row into the pages table

		const CreateNewPage = await db.query(
			`INSERT INTO pages (page_title, page_path)
			 VALUES ($1, $2)`,
			[pageTitle, pagePath]
		);

		return res.status(200).json({
			message: " page has been created",
		});
	} catch (error) {
		res.status(500).json({ error });
	}
});

// delete a page endpoint
router.delete("/pages/deletepages/:pageTitle", async (req, res) => {
	try {
		const pageTitle = req.params.pageTitle;

		const findPageId = await db.query(
			"select page_id from pages where page_title = $1",
			[pageTitle]
		);

		const page_id = findPageId.rows[0].page_id;

		const checkModules = await db.query(
			"select * from modules where page_id = $1",
			[page_id]
		);

		// check if any module there
		if (checkModules.rows.length > 0) {
			return res
				.status(400)
				.json({ message: "please delete the modules first" });
		} else {
			const deletingPage = await db.query(
				"delete from pages WHERE page_id = $1",
				[page_id]
			);

			res.status(200).json(deletingPage.rows);
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/modules/heroBanner/:pageTitle", async (req, res) => {
	const pageTitle = req.params.pageTitle;
	const { heroImage, heroText } = req.body;

	console.log("====>>>", heroText);
	console.log("---->>>", { heroImage, heroText });

	if (!heroImage || !heroText) {
		res.status(500).json("Please fill all the fields");
	}

	try {
		// First inserting the heroBanner data into the database
		const heroBanner = await db.query(
			`insert into heroBanner (hero_image, hero_text) VALUES ($1, $2) returning record_id`,
			[heroImage, heroText]
		);
		const record_id = heroBanner.rows[0].record_id;

		// Second finding the page id
		const findPageId = await db.query(
			`SELECT page_id FROM pages WHERE page_title = $1`,
			[pageTitle]
		);
		const page_id = findPageId.rows[0].page_id;

		// Third inserting the above data into the modules table
		const insertingModulesTable = await db.query(
			`INSERT INTO modules (page_id, module_type, record_id) VALUES ($1, $2, $3)`,
			[page_id, "heroBanner", record_id]
		);

		return res.status(200).json({
			message: `Data is stored successfully into the herobanner table`,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error });
	}
});

export default router;