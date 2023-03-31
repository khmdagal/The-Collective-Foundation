import React, { useState } from "react";

function ImageAndTextBannerForm({ pageToAddModules, handleModuleAdd }) {
	const [text_header, setText_header] = useState("");
	const [text_body, setText_body] = useState("");
	const [image, setImage] = useState("");
	const [button, setButton] = useState("");
	const [hasbutton, setHasButton] = useState(false);
	const [imagetext_direction, setImagetext_direction] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (
			text_header.trim() === "" ||
			text_body.trim() === "" ||
			image.trim() === "" ||
			button.trim() === ""
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
			setHasButton(false);
			setImagetext_direction(false);

			setSuccessMessage(
				`Your new module is successfully added`);

		} catch (err) {
			console.error(err);
		}
	};


	function displayMessages() {
		let message;
		if (successMessage) {
			message = <div className="error-message">{errorMessage}</div>;
		}
		if (errorMessage) {
			message = <div className="error-message">{errorMessage}</div>;
		}
		return message;
	}
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
						type="text"
						alt={text_header}
						name="image"
						value={image}
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
					Imagetext Direction:
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
