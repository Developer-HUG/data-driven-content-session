import { h } from 'preact';

// Tell Babel to transform JSX into h() calls:
/** @jsx h */

const Loader = () => {
  return (
    <div className="c-app-loader">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>
  );
};

export default Loader;