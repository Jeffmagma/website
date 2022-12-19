import Link from "next/link";

export default function Navbar() {
	return (
        <div className="navbar" style={{display: "flex", gap: "20px"}}>
			<Link href="/">
				home
			</Link>
			<Link href="/content">
				content
			</Link>
		</div>
    );
}
