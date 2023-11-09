/**
 * Lazy Load Images
 *
 * NOTE: polyfill in /lib/Settings.php
 */

export default () => {
  let lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
  if (lazyImages.length < 1) return;

  // If the browser does NOT support IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    lazyImages.forEach(lazyImage => updateSrc(lazyImage));
    return;
  }

  // Fallback if native lazy loading is available
  if ('loading' in HTMLImageElement.prototype) {
    lazyImages.forEach(lazyImage => updateSrc(lazyImage));
    return;
  }

  let lazyImageObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          updateSrc(lazyImage);
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    },
    { rootMargin: '0px 0px 200px 0px' },
  );
  // load 200px in advance

  lazyImages.forEach(lazyImage => {
    lazyImageObserver.observe(lazyImage);
  });
};

function updateSrc(lazyImage) {
  if (lazyImage.dataset.src) {
    lazyImage.src = lazyImage.dataset.src;
  }
  if (lazyImage.dataset.srcset) {
    lazyImage.srcset = lazyImage.dataset.srcset;
  }
  if (lazyImage.dataset.sizes) {
    lazyImage.sizes = lazyImage.dataset.sizes;
  }

  lazyImage.classList.add('loaded');
}
