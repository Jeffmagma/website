import StarBackground from "./star_background";
import {motion} from "framer-motion";
import styles from "../styles/layout.module.css";
import Header from "./header";
import Navbar from "./navbar";
import {ReactNode} from "react";

interface LayoutProps {
    children: ReactNode
    xc: string
}

export function Layout({children, xc}: LayoutProps) {
    return <>
        <StarBackground />
        <div className={styles.parent}>
            <motion.div animate={{y: xc}} transition={{ ease: "easeOut", duration: .75 }} className={styles.content}>
                <div style={{ width: "100%" }}>
                    <Header />
                </div>
                <Navbar />
                {children}
            </motion.div>
        </div>
    </>
}
