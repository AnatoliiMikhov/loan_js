export default class CheckMailInputs {
	constructor() {
		this.mailInputs = document.querySelectorAll('[type="email"]');
	}

	init() {
		this.mailInputs.forEach((input) => {
			input.addEventListener('keypress', (e) => {
				// eslint-disable-next-line no-useless-escape
				if (e.key.match(/[^a-z 0-9 @ \.]/gi)) {
					e.preventDefault();
				}
			});
		});
	}
}
