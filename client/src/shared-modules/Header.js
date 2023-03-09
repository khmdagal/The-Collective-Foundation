import React from "react";
import { Link } from "react-router-dom";

function Header() {
	return (
		<div >
			<header>
				<a href="#">Collective Foundation</a>

				<nav>
					<ul>
						<li>
							<Link to="/page1">Page 1</Link>
						</li>
						<li>
							<Link to="/page2">Page 2</Link>
						</li>
						<li>
							<Link to="/admin">Admin</Link>
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
