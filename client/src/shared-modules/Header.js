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
			const response = await fetch(
				"/api/pages"
			);
			const fetchedPages = await response.json();

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
					{pages.map((page) => (
						<a key={page.page_id} href="https://twitter.com/">
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
