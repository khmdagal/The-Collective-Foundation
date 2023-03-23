import React from "react";
import { useState, useEffect } from "react";

import "../shared-modules/Footer.css";

function Footer() {
	const [pages, setPages] = useState([]);

	async function fectPages() {
		try {
			const response = await fetch("/api/pages");
			const pagesFromDatabase = await response.json();
			console.log(pagesFromDatabase);
			setPages(pagesFromDatabase);
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		fectPages();
	}, []);

	console.log(pages.map((p) => p.page_title));

	return (
		<div className="card-footer">
			<section className="footer-address-section">
				<img src="#" alt="The Collective Foundation logo" />
				<h2 className="footer-h2">The Collective Foundation</h2>
				<ul className="footer-address-section-ul">
					<li className="footer-address-section-li">Address</li>
					<li className="footer-address-section-li">City & Postcod</li>
					<li className="footer-address-section-li footer-contact-number">
						(555) 555-5555
					</li>
				</ul>
			</section>

			<section className="footer-pageAndSocialmedia-section">
				<div className="footer-pages">
					<h2 className="footer-h2">Our Work</h2>

					<ul id="footer-pages-ul-id" className="footer-pages-ul">
						{/* this is looping throught the pages and creating each back a botton in the footer */}
						{pages.map((page) => (
							<li className="footer-pages-li" key={page.page_id}>
								<a className="footer-pages-a" href="{page.page_title}">
									{page.page_title}
								</a>
							</li>
						))}
					</ul>
				</div>

				<div className="footer-socialmedia">
					<h2 className="footer-h2">Follow Us</h2>

					<ul className="footer-socialmedia-ul">
						<li className="footer-socialmedia-li">
							<a className="footer-socialmedia-a" href="https://twitter.com/">
								Twitter
							</a>
						</li>

						<li className="footer-socialmedia-li">
							<a
								className="footer-socialmedia-a"
								href="https://www.linkedin.com/"
							>
								LinkedIn
							</a>
						</li>

						<li className="footer-socialmedia-li">
							<a
								className="footer-socialmedia-a"
								href="https://www.facebook.com/"
							>
								Facebook
							</a>
						</li>
					</ul>
				</div>
			</section>
		</div>
	);
}

export default Footer;
