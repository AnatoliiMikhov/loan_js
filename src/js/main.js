import SliderMain from './modules/slider/SliderMain';
import VideoPlayer from './modules/playVideo';

window.addEventListener('DOMContentLoaded', () => {
	const sliderMain = new SliderMain({ page: '.page', btns: '.next' });
	sliderMain.render();

	const player = new VideoPlayer('.showup .play', '.overlay');
	player.init();
});
