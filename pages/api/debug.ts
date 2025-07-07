export default function handler(req, res) {
	res.status(200).json({
		host: req.headers.host,
		url: req.url,
	});
}