import "../styles/globals.css";
import {Layout} from "../components/layout";

export default function MyApp({ Component, pageProps }) {
	return (
		<Layout className={Component.className} xc={Component.xc}>
			<Component {...pageProps}/>
		</Layout>
	);
}