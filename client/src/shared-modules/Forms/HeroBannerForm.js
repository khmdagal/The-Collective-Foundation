/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
import React, { useState } from "react";
import "../Forms/Forms.css";

function HeroBannerForm({ pageToAddModules, handleModuleAdd }) {
	const [heroImage, setHeroImage] = useState("");
	const [heroText, setHeroText] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (!heroImage || heroText.trim() === "") {
			setErrorMessage("Please fill all the fields");
		} else {
			try {

				const heroBannerResponse = await fetch(
					`/api/modules/heroBanner/${pageToAddModules}`,
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
				// Calling the function to refetch the page's data after adding new module
				handleModuleAdd(pageToAddModules);

				// Clearing the input fields after the submission
				setHeroImage("");
				setHeroText("");
				setSuccessMessage(`Your new module has been successfully added`);
			} catch (err) {
				console.error(err);
			}
		}
	};
console.log(heroImage);
	return (
		<form className="msform" onSubmit={handleSubmit}>
			<fieldset>
				<legend htmlFor="pageToAddModules">
					Adding to {pageToAddModules} Page
				</legend>
				<hr className="double-line" />
				<p>To Select click on the image you want</p>
				<div className="images-Container">
					<img
						src="../Images/herobanner-image1.jpg"
						className="herobanner-images"
						alt="image1"
						onClick={() => setHeroImage("herobanner-image1.jpg")}
					/>
					<img
						src="../Images/herobanner-image2.jpg"
						className="herobanner-images"
						alt="image1"
						onClick={() => setHeroImage("herobanner-image2.jpg")}
					/>
					<img
						src="../Images/herobanner-image3.jpg"
						className="herobanner-images"
						alt="image1"
						onClick={() => setHeroImage("herobanner-image3.jpg")}
					/>
				</div>
				<hr className="double-line" />
				<div>
					<label htmlFor="heroImage">
						You have Selected
						<img
							style={{
								borderStyle: "double",
								display: !heroImage ? "none" : "inline",
							}}
							className="selectedImage"
							src={`/Images/${heroImage}`}
							alt={heroImage}
							disabled
						/>
					</label>
				</div>
				<label htmlFor="heroText">
					Hero Text:
					<input
						type="text"
						name="heroText"
						value={heroText}
						required
						onChange={(event) => setHeroText(event.target.value)}
					/>
				</label>
				<button type="submit">Submit</button>
				{errorMessage && <div className="error-message">{errorMessage}</div>}
				{successMessage && (
					<div className="success-message">{successMessage}</div>
				)}
			</fieldset>
		</form>
	);
}

export default HeroBannerForm;
