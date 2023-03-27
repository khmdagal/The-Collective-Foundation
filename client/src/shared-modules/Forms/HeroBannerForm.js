/* eslint-disable react/no-unknown-property */
/* eslint-disable quotes */
/* eslint-disable comma-dangle */

import React, { useState } from "react";
import "../Forms/Forms.css";

function HeroBannerForm({ selectedPage }) {
	const [heroImage, setHeroImage] = useState("");
	const [heroText, setHeroText] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (
			heroImage.trim() === "" ||
			heroText.trim() === ""
		) {
			setErrorMessage("Please fill all the fields");
		}
		console.log({ heroImage, heroText });
		try {
			const heroBannerResponse = await fetch(
				`/api/modules/heroBanner/${selectedPage}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						heroImage,
						heroText,
					}),
				}
			);
			const heroBannerData = await heroBannerResponse.json();

			console.log(heroBannerData);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form className="msform" onSubmit={handleSubmit}>
			<label htmlFor="selectedPage">
				Page:{selectedPage}
				<input type="text" name="selectedPage" value={selectedPage} disabled />
			</label>
			<label htmlFor="heroImage">
				Hero Image:
				<input
					type="file"
					name="heroImage"
					value={heroImage}
					required
					onChange={(event) => setHeroImage(event.target.value)}
				/>
			</label>
			<label htmlFor="heroText">
				Hero Text:
				<input
					type="heroText"
					name="heroText"
					value={heroText}
					required
					onChange={(event) => setHeroText(event.target.value)}
				/>
			</label>
			<button onClick={handleSubmit} type="submit">
				Submit
			</button>
			{errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
		</form>
	);
}

export default HeroBannerForm;
