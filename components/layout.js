import StarBackground from "./star_background";
import {motion} from "framer-motion";
import styles from "../styles/layout.module.css";
import Header from "./header";
import Navbar from "./navbar";

export function Layout({children, xc}) {
    console.log("xc" + xc);
    return <>
        <StarBackground />
        <div className={styles.parent}>
            <motion.div animate={{y: xc}} transition={{ ease: "easeOut", duration: .75 }} className={styles.content}>
                <Header />
                <Navbar />
                {children}
            </motion.div>
        </div>
    </>
}