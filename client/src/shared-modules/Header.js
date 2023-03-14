import React, { useState, useEffect } from "react";
import "./Header.css";
import clientIcon from "../icons/client-logo.png";
import twitterIcon from "../icons/twitter.png";
import linkedinIcon from "../icons/linkedin.png";
import fbIcon from "../icons/fb.png";

function Header() {
	const [pages, setPages] = useState([]);

	async function fetchPages() {
		try {
			//const response = await fetch(
			//	"/api/pages"
			//);
			//const fetchedPages = await response.json();

			//Tentatively used hard codes for data from https://starter-kit-slji.onrender.com/api/pages
			const fetchedPages = [
				{
					page_id: 2,
					page_title: "Home",
					page_content: "this is my home",
				},
				{
					page_id: 3,
					page_title: "contact",
					page_content: "this is my home",
				},
				{
					page_id: 1,
					page_title: "About",
					page_content: "This is our about page",
				},
			];
			setPages(fetchedPages);
		} catch (err) {
			console.error(err);
		}
	}

	useEffect(() => {
		fetchPages();
	}, []);

	function navList() {
		return (
			<ul>
				<li>
					{pages.map((page, index) => (
						//Use a placeholder Url for href first or it will return error, can be re-assigned after.
						<a key={index} href="https://twitter.com/">
							{page.page_title}
						</a>
					))}
				</li>
			</ul>
		);
	}
	return (
		<div>
			<header className="header-container">
				<img src={clientIcon} alt="Logo of Collective Foundation" />
				<nav>
					{navList()}
					<ul>
						<li>
							<a href="https://twitter.com/">
								<img src={twitterIcon} alt="Logo of twitter" />
							</a>
						</li>
						<li>
							<a href="https://www.linkedin.com/">
								<img src={linkedinIcon} alt="Logo of linkedin" />
							</a>
						</li>
						<li>
							<a href="https://www.facebook.com/">
								<img src={fbIcon} alt="Logo of fb" />
							</a>
						</li>
					</ul>
				</nav>
			</header>
		</div>
	);
}

export default Header;
