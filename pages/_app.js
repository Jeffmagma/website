import "../styles/globals.css";
import { AnimateSharedLayout, motion } from "framer-motion";
import StarBackground from "../components/star_background";
import Header from "../components/header";
import Navbar from "../components/navbar";
import styles from "../styles/index.module.css";
import {Layout} from "../components/layout";

function MyApp({ Component, pageProps }) {
	return (
		<Layout className={Component.className} xc={Component.xc}><Component {...pageProps}/></Layout>
	);
}

export default MyApp;
