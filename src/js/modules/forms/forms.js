import CheckMailInputs from '../libs/checkMailInputs';

export default class Forms {
	constructor(forms, url) {
		this.forms = document.querySelectorAll(forms);
		this.inputs = document.querySelectorAll('input');
		this.url = url;
		this.message = {
			loading: 'Загрузка...',
			success: 'Спасибо! Скоро мы с вами свяжемся...',
			failure: 'Что-то пошло не так. Сервер не доступен. Попробуйте позже...',
		};
	}

	clearInputs() {
		this.inputs.forEach((input) => (input.value = ''));
	}

	phoneMask() {
		let setCursorPosition = (pos, elem) => {
			elem.focus();

			if (elem.setSelectionRange) {
				elem.setSelectionRange(pos, pos);
			} else if (elem.createTextRange) {
				let range = elem.createTextRange();

				range.collapse(true);
				range.moveEnd('character', pos);
				range.moveStart('character', pos);
				range.select();
			}
		};

		function createMask(event) {
			let matrix = '+1 (___) ___-____',
				i = 0,
				def = matrix.replace(/\D/g, ''),
				val = this.value.replace(/\D/g, '');

			if (def.length >= val.length) {
				val = def;
			}

			this.value = matrix.replace(/./g, function (a) {
				return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
			});

			if (event.type === 'blur') {
				if (this.value.length == 2) {
					this.value = '';
				}
			} else {
				setCursorPosition(this.value.length, this);
			}
		}

		let inputs = document.querySelectorAll('[name="phone"]');

		inputs.forEach((input) => {
			input.addEventListener('input', createMask);
			input.addEventListener('focus', createMask);
			input.addEventListener('blur', createMask);
		});
	}

	async postData(url, data = {}) {
		let response = await fetch(url, {
			method: 'POST',
			body: data,
		});
		return await response.text();
	}

	init() {
		new CheckMailInputs().init();

		this.phoneMask();

		this.forms.forEach((form) => {
			form.addEventListener('submit', (e) => {
				e.preventDefault();

				const statusMessage = document.createElement('div');
				statusMessage.style.cssText = `
					margin-top: 15px;
					font-size: 18px;
					color: grey;
				`;
				form.parentNode.append(statusMessage);

				statusMessage.textContent = this.message.loading;

				const formData = new FormData(form);

				this.postData(this.url, formData)
					.then((res) => {
						console.log(res);
						statusMessage.textContent = this.message.success;
					})
					.catch(() => {
						statusMessage.textContent = this.message.failure;
					})
					.finally(() => {
						this.clearInputs();
						setTimeout(() => {
							statusMessage.remove();
						}, 3000);
					});
			});
		});
	}
}
