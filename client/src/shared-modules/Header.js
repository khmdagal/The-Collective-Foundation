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
			const response = await fetch("/api/pages");
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
			<>
				<li>
					{pages.map((page) => (
						<a className="titles" key={page.page_id} href={page.page_path}>
							{page.page_title}
						</a>
					))}
				</li>
			</>
		);
	}
	return (
		<div id="header_main">
			<header>
				<img
					className="logo"
					src={clientIcon}
					alt="Logo of Collective Foundation"
				/>
				<nav className="navbar">
					<ul className="ul">{navList()} </ul>
					<ul className="ul">
						<li>
							<a href="https://twitter.com/">
								<img
									className="icons"
									src={twitterIcon}
									alt="Logo of twitter"
								/>
							</a>
						</li>
						<li>
							<a href="https://www.linkedin.com/">
								<img
									className="icons"
									src={linkedinIcon}
									alt="Logo of linkedin"
								/>
							</a>
						</li>
						<li>
							<a href="https://www.facebook.com/">
								<img className="icons" src={fbIcon} alt="Logo of fb" />
							</a>
						</li>
					</ul>
				</nav>
			</header>
		</div>
	);
}

export default Header;
