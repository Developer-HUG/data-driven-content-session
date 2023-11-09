import { h } from 'preact';
// Tell Babel to transform JSX into h() calls:
/** @jsx h */

const SearchFilter = props => {
  const showSearch = props.searchActive ? 'active' : '';

  function handleSearch(e) {
    props.onSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <div className={`c-app-search-filter ${showSearch} ${props.desktop ? 'u-hide-on-medium-down' : 'u-hide-on-large-up'}`}>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder={props.placeholder}
          value={props.searchText}
          onChange={handleSearch}
          className="c-app-search-filter__search-field"
        />
        <input
          type="submit"
          value=""
          disabled={props.postsLoading ? true : false}
          className="c-app-search-filter__submit"
        />
      </form>
    </div>
  );
};

export default SearchFilter;
