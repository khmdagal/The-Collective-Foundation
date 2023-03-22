import homePageImage1 from "../Images/home-page-image-1.jpg"; // omport imges from local files for now
import homePageImage2 from "../Images/home-page-image-2.jpg";
import "../shared-modules/ImageAndText.css"; // import styling from css file

function ImageAndText({textone,texttwo,img,button}) {
	return (
		// first image and text container
		<div>
			<div className="container1">
				<div className="image-container">
					<img src={img} alt="img"></img>
				</div>
				<div className="content-container">
					<div className="content">
						<h1>{textone} </h1>
						<p>
							{texttwo}
						</p>
						<button className="button">{button}</button>
					</div>
				</div>
			</div>

		</div>
	);
}

export default ImageAndText;
