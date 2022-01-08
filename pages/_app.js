import "../styles/globals.css";
import { AnimateSharedLayout, motion } from "framer-motion";
import StarBackground from "../components/star_background";
import Header from "../components/header";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<StarBackground />
			<AnimateSharedLayout>
				<Component {...pageProps} />
			</AnimateSharedLayout>
		</>
	);
}

export default MyApp;
