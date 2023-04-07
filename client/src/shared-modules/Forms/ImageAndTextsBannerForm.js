/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable linebreak-style */
import React, { useState } from "react";
import "../Forms/Forms.css";

function ImageAndTextBannerForm({ pageToAddModules, handleModuleAdd }) {
	const [text_header, setText_header] = useState("");
	const [text_body, setText_body] = useState("");
	const [image, setImage] = useState("");
	const [button, setButton] = useState("");
	const [hasbutton, setHasButton] = useState(true);
	const [imagetext_direction, setImagetext_direction] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (
			!text_header.trim() === "" ||
			!text_body.trim() === "" ||
			!image.trim() === "" ||
			!button.trim() === ""
		) {
			setErrorMessage("Please fill all the fields");
		}

		try {

			const imagAndTextBannerResponse = await fetch(
				`/api/modules/imageAndTexts/${pageToAddModules}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						text_header,
						text_body,
						image,
						button,
						hasbutton,
						imagetext_direction,
					}),
				}
			);
			const imagAndTextBannerData = await imagAndTextBannerResponse.json();

// Calling the the function the we want to refetch the pages data after adding new module
			handleModuleAdd(pageToAddModules);

			// Clearing the input fields after the submission
			setText_header("");
			setText_body("");
			setImage("");
			setButton("");
			setHasButton("");
			setImagetext_direction("");

			setSuccessMessage(
				"Your new module is successfully added");

		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form className="msform" onSubmit={handleSubmit}>
			<fieldset>
				<legend htmlFor="pageToAddModules">
					Adding to {pageToAddModules} Page
				</legend>
				<hr className="double-line"></hr>
				<p>To Select click on the image you want</p>
				<div className="images-Container">
					<img
						src="../Images/textAndImage-image1.jpg"
						className="textAndImage-images"
						alt="image1"
						onClick={() => setImage("textAndImage-image1.jpg")}
					/>
					<img
						src="../Images/textAndImage-image2.jpg"
						className="textAndImage-images"
						alt="image2"
						onClick={() => setImage("textAndImage-image2.jpg")}
					/>
					<img
						src="../Images/herobanner-image3.jpg"
						className="textAndImage-images"
						alt="image3"
						onClick={() => setImage("textAndImage-image3.jpg")}
					/>
					<img
						src="../Images/textAndImage-image4.jpg"
						className="textAndImage-images"
						alt="image4"
						onClick={() => setImage("textAndImage-image4.jpg")}
					/>
					<img
						src="../Images/textAndImage-image5.jpg"
						className="textAndImage-images"
						alt="image5"
						onClick={() => setImage("textAndImage-image5.jpg")}
					/>
				</div>

				<hr className="double-line" />
				<div>
					<label htmlFor="image">
						You have Selected
						<img
							style={{
								borderStyle: "double",
								display: !image ? "none" : "inline",
							}}
							className="selectedImage"
							src={`/Images/${image}`}
							alt={image}
							disabled
						/>
					</label>
				</div>

				<div>
					<label htmlFor="text_header">
						Text header:
						<input
							type="text"
							name="text_header"
							value={text_header}
							required
							onChange={(event) => setText_header(event.target.value)}
						/>
					</label>
				</div>

				<div>
					<label htmlFor="text_body">
						Text body:
						<input
							type="text"
							name="text_body"
							value={text_body}
							required
							onChange={(event) => setText_body(event.target.value)}
						/>
					</label>
				</div>

				<div>
					<label htmlFor="button">
						Button:
						<input
							type="text"
							name="button"
							value={button}
							required
							onChange={(event) => setButton(event.target.value)}
						/>
					</label>
				</div>

				<div>
					<label htmlFor="hasbutton">
						Has Button:
						<input
							type="checkbox"
							name="hasbutton"
							value={hasbutton}
							required
							onChange={(event) => setHasButton(event.target.value)}
						/>
					</label>
				</div>

				<div>
					<label htmlFor="imagetext_direction">
						Image Direction:
						<input
							type="checkbox"
							name="imagetext_direction"
							value={imagetext_direction}
							required
							onChange={(event) => setImagetext_direction(event.target.value)}
						/>
					</label>
				</div>

				<button type="submit">Submit</button>

				{errorMessage && <div className="error-message">{errorMessage}</div>}
				{successMessage && (
					<div className="success-message">{successMessage}</div>
				)}
			</fieldset>
		</form>
	);
}

export default ImageAndTextBannerForm;
