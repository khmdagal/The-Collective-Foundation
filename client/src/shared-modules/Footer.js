
import React from "react";
import { useState, useEffect } from "react";

import "../shared-modules/Footer.css";
import clientIcon from "../icons/client-logo.png";

function Footer() {
	const [pages, setPages] = useState([]);

	async function fectPages() {
		try {
			const response = await fetch("/api/pages");
			const pagesFromDatabase = await response.json();
			setPages(pagesFromDatabase);
		} catch (err) {
			console.error(err);
		}
	}



	useEffect(() => {
		fectPages();
	}, []);



	return (
		<div className="card-footer">
			<section className="footer-address-section">
				<img
					className="logo"
					src={clientIcon}
					alt="Logo of Collective Foundation"
				/>
				<h2 className="footer-h2">The Collective Foundation</h2>
				<ul className="footer-address-section-ul">
					<li className="footer-address-section-li">123 High street</li>
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
								<a className="footer-pages-a" href={page.page_path}>
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
