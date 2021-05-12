import Slider from './slider';

export default class MainSlider extends Slider {
	constructor(btns, nextModuleBtns, prevModuleBtns) {
		super(btns, nextModuleBtns, prevModuleBtns);
		this.linkToFirstSlide = document.querySelectorAll('.sidecontrol > a:first-of-type');
	}

	showSlides(n) {
		if (n > this.slides.length) {
			this.slideIndex = 1;
		}
		if (n < 1) {
			this.slideIndex = this.slides.length;
		}

		try {
			this.hanson.style.opacity = '0';

			if (n == 3) {
				this.hanson.classList.add('animated');
				setTimeout(() => {
					this.hanson.style.opacity = 1;
					this.hanson.classList.add('slideInUp');
				}, 3000);
			} else {
				this.hanson.classList.remove('slideInUp');
			}
		} catch (error) {}

		Array.from(this.slides).forEach((slide) => {
			slide.style.display = 'none';
			slide.classList.remove('animated');
			slide.classList.remove('fadeIn');
		});

		this.slides[this.slideIndex - 1].style.display = 'block';
		this.slides[this.slideIndex - 1].style.animationDuration = '0.3s';
		this.slides[this.slideIndex - 1].classList.add('animated');
		this.slides[this.slideIndex - 1].classList.add('fadeIn');
	}

	moveSlide(n) {
		this.showSlides((this.slideIndex += n));
	}

	bindTriggers(trigger, n = 1) {
		trigger.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				e.stopPropagation();
				e.preventDefault();
				if (btn.parentNode.matches('.sidecontrol') && !btn.classList.contains('next')) {
					this.slideIndex = n;
					this.showSlides(this.slideIndex);
				} else {
					this.moveSlide(n);
				}
			});
		});
	}

	render() {
		if (this.container) {
			try {
				this.hanson = document.querySelector('.hanson');
			} catch (error) {}

			this.showSlides(this.slideIndex);

			this.bindTriggers(this.btns, 1);
			this.bindTriggers(this.nextModuleBtns, 1);
			this.bindTriggers(this.prevModuleBtns, -1);
			this.bindTriggers(this.linkToFirstSlide, 1);
		}
	}
}
