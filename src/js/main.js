// sliders
import MainSlider from './modules/slider/MainSlider';
import MiniSlider from './modules/slider/MiniSlider';
// video player
import VideoPlayer from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {
	/* -------------------------------------------------------------------------- */
	/*                                   Sliders                                  */
	/* -------------------------------------------------------------------------- */

	const mainSlider = new MainSlider({ container: '.page', btns: '.next' });
	mainSlider.render();

	const showUpSlider = new MiniSlider({
		container: '.showup__content-slider',
		prev: '.showup__prev',
		next: '.showup__next',
		activeClass: 'card-active',
		animate: true,
	});
	showUpSlider.init();

	const modulesSlider = new MiniSlider({
		container: '.modules__content-slider',
		prev: '.modules__info-btns .slick-prev',
		next: '.modules__info-btns .slick-next',
		activeClass: 'card-active',
		animate: true,
		autoplay: true,
	});
	modulesSlider.init();

	const feedSlider = new MiniSlider({
		container: '.slider-feed__wrapper',
		prev: '.feed__slider .slick-prev',
		next: '.feed__slider .slick-next',
		activeClass: 'feed__item-active',
	});
	feedSlider.init();

	/* -------------------------------------------------------------------------- */
	/*                                 VideoPlayer                                */
	/* -------------------------------------------------------------------------- */

	const player = new VideoPlayer('.showup .play', '.overlay');
	player.init();
});
