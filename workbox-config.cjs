module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{ts,css,html}'
	],
	swDest: 'src/service-worker/service-worker.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};