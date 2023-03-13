/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */

import React from "react";
import { useState, useEffect } from "react";

import "../pages/Footer.css";

function Footer() {

  const [pages, setPages] = useState([]);

	async function fectPages() {
		try {
			const response = await fetch(
				"https://starter-kit-slji.onrender.com/api/pages"
			);
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
				<img src="#" alt="The Collective Foundation logo" />
				<h3>The Collective Foundation</h3>
				<ul>
					<li>Address</li>
					<li>City & Postcod</li>
					<li>Contact number</li>
				</ul>
			</section>

			<section className="footer-pageAndSocialmedia-section">
				<div className="footer-pages">
					<h2>Our Work</h2>
          <ul>
            {/* this is looping throught the pages and creating each back a botton in the footer */}
						{pages.map((page) => (
								<button key={page.page_id}>{page.page_title}</button>
						))}
					</ul>
				</div>

				<div className="footer-socialmedia">
					<h2>Follow Us</h2>

					<ul>
						<li>
							<a href="https://twitter.com/">Twitter</a>
						</li>

						<li>
							<a href="https://www.linkedin.com/">LinkedIn</a>
						</li>

						<li>
							<a href="https://www.facebook.com/">Facebook</a>
						</li>
					</ul>
				</div>
			</section>
		</div>
	);
}

export default Footer;
