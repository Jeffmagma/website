import StarBackground from "./star_background";
import {motion} from "framer-motion";
import styles from "../styles/layout.module.css";
import Header from "./header";
import Navbar from "./navbar";
import {ReactNode, RefObject} from "react";

interface LayoutProps {
    children: ReactNode
    y_coord: string
    parent_ref: RefObject<HTMLDivElement>
}

export function Layout({children, y_coord, parent_ref}: LayoutProps) {
    return <>
        <StarBackground parent={parent_ref}/>
        <div className={styles.parent}>
            <motion.div animate={{y: y_coord}} transition={{ ease: "easeOut", duration: .75 }} className={styles.content}>
                <div style={{ width: "100%" }}>
                    <Header />
                </div>
                <Navbar />
                {children}
            </motion.div>
        </div>
    </>
}
