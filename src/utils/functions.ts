const generatePassword = {
	_pattern: /[a-zA-Z0-9_\-\+\.]/,

	generate: function (length: number) {
		return Array.apply(null, [{ length: length }])
			.map(() => {
				var result;
				while (true) {
					result = String.fromCharCode(Math.floor(Math.random() * 256));
					if (this._pattern.test(result)) {
						return result;
					}
				}
			}, this)
			.join('');
	},
};
export { generatePassword };
