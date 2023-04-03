/* eslint-disable linebreak-style */
import React, { useState } from "react";

function ImageAndTextBannerForm({ pageToAddModules, handleModuleAdd }) {
	const [text_header, setText_header] = useState("");
	const [text_body, setText_body] = useState("");
	const [imageTexts, setImage] = useState("");
	const [button, setButton] = useState("");
	const [hasbutton, setHasButton] = useState("");
	const [imagetext_direction, setImagetext_direction] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (
			!text_header.trim() === "" ||
			!text_body.trim() === "" ||
			!imageTexts.trim() === "" ||
			!button.trim() === ""
		) {
			setErrorMessage("Please fill all the fields");
		}

		try {

			const formdata = new FormData();
			formdata.append("imageTexts", imageTexts);
			formdata.append("text_header", text_header);
			formdata.append("text_body",text_body);
			formdata.append("button", button);
			formdata.append("hasbutton", hasbutton);
			formdata.append("imagetext_direction", imagetext_direction);


			const imagAndTextBannerResponse = await fetch(
				`/api/modules/imageAndTexts/${pageToAddModules}`,
				{
					method: "POST",
					body: formdata,
				}
			);
			const imagAndTextBannerData = await imagAndTextBannerResponse.json();

// Calling the the function the we want to refetch the pages data after adding new module
			handleModuleAdd(pageToAddModules);

			// Clearing the input fields after the submission
			setText_header("");
			setText_body("");
			setImage(null);
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
				<label htmlFor="image">
					Image:
					<input
						type="file"
						name="imageTexts"
						accept="image/*"
						required
						onChange={(event) => setImage(event.target.value)}
					/>
				</label>
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
