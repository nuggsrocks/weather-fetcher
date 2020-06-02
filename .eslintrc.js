module.exports = {
	plugins: ["react"],
	extends: [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	parser: "babel-eslint",
	settings: {
		react: {
			version: "detect"
		}
	},
	env: {
		node: true,
		browser: true
	},
	rules: {
		"react/prop-types": [0, {skipUndeclared: true}]
	}
}
