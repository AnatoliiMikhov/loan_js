export default class Slider {
	// eslint-disable-next-line no-unused-vars
	constructor({ page = '', btns = '', next = '', prev = '' } = {}) {
		this.page = document.querySelector(page);
		this.slides = this.page.children; // return HTMLCollection
		this.btns = document.querySelectorAll(btns);
		this.slideIndex = 1;

		this.slidersArray = Array.from(this.slides); // HTMLCollection to Array
	}
}
