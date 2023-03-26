/* eslint-disable quotes */
/* eslint-disable comma-dangle */
import React, { useState } from "react";

function ImageAndTextBannerForm() {
	const [text_header, setText_header] = useState("");
	const [text_body, setText_body] = useState("");
    const [image, setImage] = useState("");
    const [button, setButton] = useState("");
    const [hasbutton, setHasButton] = useState(false);
    const [imagetext_direction, setImagetext_direction] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

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
            const sendingData = await fetch(
							"/api/modules/imageAndTextBannerForm",
							{
								method: "POST",
								body: JSON.stringify({
									text_header,
									text_body,
									image,
									button,
									hasbutton,
									imagetext_direction,
								}),

								headers: {
									"Content-Type": "application/json;",
								},
							}
						);
			console.log(sendingData); // handle response here
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
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
					type="image"
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
					type="button"
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
			{errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
		</form>
	);
}

export default ImageAndTextBannerForm;
