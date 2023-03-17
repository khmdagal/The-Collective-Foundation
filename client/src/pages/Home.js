import { useEffect, useState } from "react";
import Header from "../shared-modules/Header";
// import TextBanner from "../shared-modules/TextBanner";

import "./Home.css";

export function Home() {
	const [message, setMessage] = useState("Loading...");
	// const [leftText,setleftText] = useState("Climate change threatens every part of the planet. It’s a global problem that requires global cooperation.");
	// const [rightText,setrightText] = useState("Our mission is to create international consensus around the climate emergency, as well a shared plan for saving the planet’s most exceptional wild places.");
	useEffect(() => {
		fetch("/api")
			.then((res) => {
				if (!res.ok) {
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then((body) => {
				setMessage(body.message);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	return (
		<main role="main">
			<div>
				<Header />
				{/* <TextBanner leftText={leftText} rightText={rightText} /> */}
			</div>
		</main>
	);
}

export default Home;
