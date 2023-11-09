import { h, render } from 'preact';
import App from './containers/App';

// Tell Babel to transform JSX into h() calls:
/** @jsx h */

const container = document.getElementById('js-listing-overview-app');

if (container) {
  const { portal, table, load, search, filter, language } = container.dataset;

  render(
    <App
      portal={portal}
      table={table}
      load_more={load}
      search_label={search}
      filter_label={filter}
      language={language}
    />,
    container,
  );
}
