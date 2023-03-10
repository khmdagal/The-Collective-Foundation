
import React from "react";
import Card from "react-bootstrap/Card";

function Footer() {
  return (
		<Card className="card-footer">
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
						<li>
							<a href="#">About</a>
						</li>

						<li>
							<a href="#">Initiatives</a>
						</li>

						<li>
							<a href="#">Take Action</a>
						</li>
					</ul>
				</div>

				<div className="footer-socialmedia">
					<h2>Follow Us</h2>

					<ul>
						<li>
							<a href="#">Twitter</a>
						</li>

						<li>
							<a href="#">LinkedIn</a>
						</li>

						<li>
							<a href="#">Facebook</a>
						</li>
					</ul>
				</div>
			</section>
		</Card>
	);
}

export default Footer;
