import "../styles/globals.css";
import { AnimateSharedLayout } from "framer-motion";
import StarBackground from "../components/star_background";

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
