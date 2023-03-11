import React from "react";
import "./Header.css";

function Header() {
	return (
		<div>
			<header className="header-container">
				<a href="#">Collective Foundation</a>

				<nav>
					<ul>
						<li>
							<a href="../page1">Page 1</a>
						</li>
						<li>
							<a href="../page2">Page 2</a>
						</li>
						<li>
							<a href="https://twitter.com/">Twitter</a>
						</li>
						<li>
							<a href="https://www.linkedin.com/">Linkedin</a>
						</li>
						<li>
							<a href="https://www.facebook.com/">FB</a>
						</li>
					</ul>
				</nav>
			</header>
		</div>
	);
}

export default Header;
