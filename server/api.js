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


// this is Home endpoint
router.get("/home", async (req, res) => {
	try {
		const response =
			await db.query(`SELECT p.page_title, i.text, i.image, i.button, i.hasButton 
							FROM pages AS p
							INNER JOIN modules AS m ON p.page_id = m.page_id
							INNER JOIN imageAndTexts AS i ON m.record_id = i.imageText_id
							WHERE p.page_title = 'Home' `);
		res.json(response.rows);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
});


// this is About page endpoint
router.get("/about", async (req, res) => {
	try {
		const response =
			await db.query(`SELECT p.page_title, i.text, i.image, i.button, i.hasButton 
							FROM pages AS p
							INNER JOIN modules AS m ON p.page_id = m.page_id
							INNER JOIN imageAndTexts AS i ON m.record_id = i.imageText_id
							WHERE p.page_title = 'About' `);
		res.json(response.rows);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
});


// this is Contact page endpoint
router.get("/contact", async (req, res) => {
	try {
		const response =
			await db.query(`SELECT p.page_title, i.text, i.image, i.button, i.hasButton 
							FROM pages AS p
							INNER JOIN modules AS m ON p.page_id = m.page_id
							INNER JOIN imageAndTexts AS i ON m.record_id = i.imageText_id
							WHERE p.page_title = 'Contact' `);
		res.json(response.rows);
	} catch (err) {
		console.error(err);
		res.status(500).send(err);
	}
});


export default router;
