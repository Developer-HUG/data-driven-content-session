/**
 * Lazy Load Picture
 *
 * NOTE: polyfill in /lib/Settings.php
 */

export default () => {
  let lazyPictures = [].slice.call(document.querySelectorAll('picture.lazy'));
  if (lazyPictures.length < 1) return;
  console.log('lazyload');

  // If the browser does NOT support IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    lazyPictures.forEach(lazyPicture => updateSrc(lazyPicture));
    return;
  }

  // Fallback if native lazy loading is available
  if ('loading' in HTMLImageElement.prototype) {
    lazyPictures.forEach(lazyPicture => updateSrc(lazyPicture));
    return;
  }

  let lazyPictureObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let lazyPicture = entry.target;
          updateSrc(lazyPicture);
          lazyPictureObserver.unobserve(lazyPicture);
        }
      });
    },
    { rootMargin: '0px 0px 200px 0px' },
  );
  // load 200px in advance

  lazyPictures.forEach(lazyPicture => {
    lazyPictureObserver.observe(lazyPicture);
  });
};

function updateSrc(lazyPicture) {
  let elements = [].slice.call(lazyPicture.querySelectorAll('img,source'));

  elements.forEach(element => {
    if (element.dataset.src) {
      element.src = element.dataset.src;
    }
    if (element.dataset.srcset) {
      element.srcset = element.dataset.srcset;
    }
    if (element.dataset.sizes) {
      element.sizes = element.dataset.sizes;
    }
  });

  lazyPicture.classList.add('loaded');
}
