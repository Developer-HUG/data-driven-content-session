import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';

export default () => {
  const containers = document.querySelectorAll('.js-video-container');
  if (containers.length < 1) return;
  [...containers].forEach(container => {
    const video = container.querySelector('.js-video');
    const playButton = container.querySelector('.js-video-play');
    const overlay = container.querySelector('.js-video-overlay');
    const image = container.querySelector('.js-video-image');
    const fullscreen = container.dataset.target ? document.getElementById(container.dataset.target) : null;

    if (!video) return;
    // Video has buffered enough to play
    video.addEventListener('canplay', () => {
      if (video.autoplay) {
        // Fade out the image if video is autoplay
        image.classList.add('hidden');
      }
    });

    // Play video
    if (playButton) {
      playButton.addEventListener('click', () => {
        if (fullscreen) {
          const fullVid = fullscreen.querySelector('.js-video');
          fullscreen.classList.add('active');
          disableBodyScroll(fullscreen);

          fullscreen.addEventListener('click', e => {
            if (e.target !== fullVid) {
              fullscreen.classList.remove('active');
              enableBodyScroll(fullscreen);
              fullVid.pause();
              fullVid.currentTime = 0;
            }
          });

          if (fullVid.readyState > 0) {
            //ie11 fix
            fullVid.currentTime = 0;
          }

          fullVid.controls = true;
          fullVid.muted = false;
          fullVid.play();

          // Turn on any subtitles
          for (let i = 0; i < fullVid.textTracks.length; i++) {
            fullVid.textTracks[i].mode = 'showing';
          }
        } else {
          image.classList.add('hidden');

          if (overlay) overlay.classList.add('hidden');
          if (playButton) playButton.classList.add('hidden');

          video.classList.add('active');

          if (video.readyState > 0) {
            //ie11 fix
            video.currentTime = 0;
          }
          video.controls = true;
          video.muted = false;
          video.play();

          // Turn on any subtitles
          for (let i = 0; i < video.textTracks.length; i++) {
            video.textTracks[i].mode = 'showing';
          }
        }
      });
    }
  });
};
