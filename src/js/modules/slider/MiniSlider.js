import Slider from './slider';

export default class MiniSlider extends Slider {
	constructor(container, prev, next, activeClass, animate, autoplay) {
		super(container, prev, next, activeClass, animate, autoplay);

		this.autoplayInterval = null;
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

		try {
			if (this.animate) {
				this.slides[0].querySelector('.card__title').style.opacity = '1';
				this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
			}
		} catch (error) {
			console.log(error);
		}
	}

	nextSlide() {
		this.container.appendChild(this.slides[0]);
		this.decorizeSlides();
	}

	prevSlide() {
		let active = this.slides[this.slides.length - 1];
		this.container.insertBefore(active, this.slides[0]);
		this.decorizeSlides();
	}

	bindTriggers() {
		this.next.addEventListener('click', () => this.nextSlide());
		this.prev.addEventListener('click', () => this.prevSlide());
	}

	autoplayAnimation() {
		this.autoplayInterval = setInterval(() => this.nextSlide(), 2000);
	}

	init() {
		this.container.style.cssText = `
			max-height: 100%;
			display: flex;
			flex-wrap: wrap;
			overflow: hidden;
			align-items: flex-start;
		`;
		this.decorizeSlides();
		this.bindTriggers();

		try {
			if (this.autoplay) {
				this.autoplayAnimation();

				this.container.addEventListener('mouseleave', () => this.autoplayAnimation());
				this.next.addEventListener('mouseleave', () => this.autoplayAnimation());
				this.prev.addEventListener('mouseleave', () => this.autoplayAnimation());

				this.container.addEventListener('mouseenter', () => clearInterval(this.autoplayInterval));
				this.next.addEventListener('mouseenter', () => clearInterval(this.autoplayInterval));
				this.prev.addEventListener('mouseenter', () => clearInterval(this.autoplayInterval));
			}
		} catch (error) {
			console.log(error);
		}
	}
}
