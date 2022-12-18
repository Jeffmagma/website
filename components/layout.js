import StarBackground from "./star_background";
import {AnimateSharedLayout, motion} from "framer-motion";
import styles from "../styles/index.module.css";
import Header from "./header";
import Navbar from "./navbar";

export function Layout({children, className, xc}) {
    console.log("xc" + xc);
    return <>
        <StarBackground />
        <motion.div animate={{y: xc}}
                    transition={{ ease: "easeOut", duration: .5 }}>
            <div className={className}>
                <Header />
                <Navbar />
                {children}
            </div>
        </motion.div>
    </>
}