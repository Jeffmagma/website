import fs from "fs";
import styles from "../styles/content.module.css"
import Link from "next/link";
import matter from "gray-matter"

export default function Thoughts({files}) {
    console.log(new Date().toISOString())
    return (<div className={styles.content}>
        this is kinda like a blog but i have no intentions of like keeping it regularly updated or really having a structure, it&apos;s just for fun :D<br/><br/>
        {files.map(file =>
            <Link href={"/thought/" + file.name} key={file.name}>{new Date(file.data.date).toDateString()} &mdash; {file.name.replace("-", " ")}<br/></Link>
        )}
    </div>);
}

export async function getStaticProps() {
    // get a list of files in the thoughts directory
    const files = fs.readdirSync("thoughts");
    const file_data = files.map(file => {
        const contents = fs.readFileSync("thoughts/" + file);
        const front_matter = matter(contents);
        return {
            name: file.substring(0, file.length - 3),
            data: front_matter.data,
        }
    })
    file_data.sort((a, b) => {
        return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
    })
    return {
        props: {
            files: file_data
        }
    }
}
