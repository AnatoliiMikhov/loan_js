import CheckMailInputs from '../libs/checkMailInputs';
import PhoneMask from '../libs/phoneMask';

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

	async postData(url, data = {}) {
		let response = await fetch(url, {
			method: 'POST',
			body: data,
		});
		return await response.text();
	}

	init() {
		new CheckMailInputs().init();
		new PhoneMask().init();

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
