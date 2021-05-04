import Slider from './slider';

export default class MiniSlider extends Slider {
	constructor(container, prev, next, activeClass, animate, autoplay) {
		super(container, prev, next, activeClass, animate, autoplay);
	}

	decorizeSlides() {
		for (let slide of this.slides) {
			slide.classList.remove(this.activeClass);
			if (this.animate) {
				slide.querySelector('.card__title').style.opacity = '0.4';
				slide.querySelector('.card__controls-arrow').style.opacity = '0';
			}
		}

		this.slides[0].classList.add(this.activeClass);

		if (this.animate) {
			this.slides[0].querySelector('.card__title').style.opacity = '1';
			this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
		}
	}

	bindTriggers() {
		this.next.addEventListener('click', () => {
			this.container.appendChild(this.slides[0]);
			this.decorizeSlides();
		});

		this.prev.addEventListener('click', () => {
			let active = this.slides[this.slides.length - 1];
			this.container.insertBefore(active, this.slides[0]);
			this.decorizeSlides();
		});
	}

	init() {
		this.container.style.cssText = `
			display: flex;
			flex-wrap: wrap;
			overflow: hidden;
			align-items: flex-start;
		`;
		this.decorizeSlides();
		this.bindTriggers();
	}
}
