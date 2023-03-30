import homePageImage1 from "../Images/home-page-image-1.jpg"; // omport imges from local files for now
import homePageImage2 from "../Images/home-page-image-2.jpg";
import "../shared-modules/ImageAndText.css"; // import styling from css file

function ImageAndText({textheader,textbody,img,button,direction}) {
	console.log(direction);
	return (
		// first image and text container
		<div>
			<div  className={`${direction ? 'left_to_right' : 'right_to_left'}`} >
				<div className="image-container" >
				<img src={`/Images/textAndImage-${img}`} alt="img"></img>
					{/* <img src={img} alt="img"></img> */}
				</div>
				<div className="content-container">
					<div className="content">
						<h1>{textheader} </h1>
						<p>
							{textbody}
						</p>
						<button className="button">{button}</button>
					</div>
				</div>
			</div>

		</div>
	);
}

export default ImageAndText;
