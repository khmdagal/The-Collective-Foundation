import React from "react";
import "./Header.css";
import clientIcon from "../icons/client-logo.png";
import twitterIcon from "../icons/twitter.png";
import linkedinIcon from "../icons/linkedin.png";
import fbIcon from "../icons/fb.png";

function Header() {
	return (
		<div>
			<header className="header-container">
				<img
					src={clientIcon}
					alt="Logo of Collective Foundation"
					className="header_logo"
				/>
				<nav>
					<ul>
						<li>
							<a href="../page1">Page 1</a>
						</li>
						<li>
							<a href="../page2">Page 2</a>
						</li>
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
