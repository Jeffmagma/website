import styles from "../../styles/content.module.css"
import ReactMarkdown from "react-markdown"
import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";

interface ThoughtProps {
    content: string,
    _matter: object
}

export default function Thought({content, _matter}: ThoughtProps) {
    return (<div className={styles.content}>
        <Link href="/thoughts">back</Link>
        <ReactMarkdown>{content}</ReactMarkdown>
    </div>)
}

// required for dynamic page, list of available paths
export async function getStaticPaths() {
    const files = fs.readdirSync("thoughts");
    const paths = files.map((fileName) => ({
        params: {
            name: fileName.replace(".md", ""),
        },
    }));
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({params: {name}}) {
    const file_contents = fs.readFileSync("thoughts/" + name + ".md");
    const file_data = matter(file_contents);
    return {
        props: {
            content: file_data.content,
            matter: file_data.data,
        }
    }
}
