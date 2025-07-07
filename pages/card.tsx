import styles from "../styles/card.module.css"

export default function Card() {
	return <div className={styles.body}>
		<div className={styles.container}>
			<div> 𓏲 ₊˚๑ ꒰ cyan ꒱ ໑‧₊˚.ꪆ</div>
			<div>23 | he/him | canada</div>
			<img className={styles.image} src="https://i.pinimg.com/736x/ea/71/79/ea717924a7bd6c6676245849d730e096.jpg" />
			<i>i just wanna fucking die in your arms</i>
			<div className={styles.line}></div>
			<div className={styles.grid}>
				<div><b>likes</b> friends, games, shows/movies, programming, magic (especially card magic), butterfly knife tricks</div>
				<div><b>dislikes</b> not much, not being given a reason for decisions, rude people</div>
				<div><b>anime/shows</b> silent voice, inuyasha, your name, your lie in april, 5cm, punpun</div>
				<div><b>games</b> riot games, minecraft, counter strike, anything that my friends want to play really (unless they're expensive, i'm poor)</div>
			</div>
			<div>you can vent to me but just ask before! i do have horrible memory though</div>
		</div>
	</div>
}