/**
 * Lazy Load Video
 *
 * NOTE: give video 'data-src'
 *
 * We iterate through all of the child <source> elements
 * and flip their data-src attributes to src attributes.
 * Then we need to trigger loading of the video by calling the element's load method,
 * after which the media will begin playing automatically per the autoplay attribute.
 * https://developers.google.com/web/fundamentals/performance/lazy-loading-guidance/images-and-video/#for_video_acting_as_an_animated_gif_replacement
 */

export default () => {
  let lazyVideos = [].slice.call(document.querySelectorAll('video.lazy'));
  if (lazyVideos.length < 1) return;

  // If the browser does NOT support IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    lazyVideos.forEach(lazyVideo => updateSrc(lazyVideo));
    return;
  }

  // If browser is on IOS device (because of IOS13 bug)
  // if (iOS()) {
  //   lazyVideos.forEach(lazyVideo => updateSrc(lazyVideo));
  //   return;
  // }

  let lazyVideoObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let video = entry.target;
          updateSrc(video);
          lazyVideoObserver.unobserve(video);
        }
      });
    },
    { rootMargin: '0px 0px 200px 0px' },
  );
  // load 200px in advance

  lazyVideos.forEach(lazyVideo => {
    lazyVideoObserver.observe(lazyVideo);
  });
};

function updateSrc(video) {
  for (let source in video.children) {
    let videoSource = video.children[source];
    if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE' && videoSource.dataset.src) {
      videoSource.src = videoSource.dataset.src;
    }
  }

  video.load();
  video.classList.add('loaded');
}

// // Check if IOS, if so, disable lazyload
// function iOS() {
//   return (
//     ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(navigator.platform) ||
//     // iPad on iOS 13 detection
//     (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
//   );
// }
