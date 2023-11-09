/**
 * Main.js
 *
 * @since 1.0.0
 */
import 'objectFitPolyfill';
import 'smoothscroll';

import objectFitImages from 'object-fit-images';
import LazyLoadImage from './modules/LazyLoadImage';
import LazyLoadPicture from './modules/LazyLoadPicture';
import LazyLoadVideo from './modules/LazyLoadVideo';
import Video from './modules/Video';
import Form from './modules/Form';

import { toggleActiveClick } from './modules/click';
import { domReady } from './utils/dom-ready';

domReady(function() {
  objectFitImages();
  toggleActiveClick();
  LazyLoadImage();
  LazyLoadPicture();
  LazyLoadVideo();
  Video();
  Form();
});