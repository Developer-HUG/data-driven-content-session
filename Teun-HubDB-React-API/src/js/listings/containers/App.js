import { h, Component, Fragment } from 'preact';
import ItemsAPI from '../api/ItemsAPI';
import Posts from '../components/Posts';
import SearchFilter from '../components/SearchFilter';
import Filter from './Filter';
import Loader from '../components/Loader';

// Tell Babel to transform JSX into h() calls:
/** @jsx h */

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      portalId: props.portal,
      tableId: props.table,
      searchLabel: props.search_label,
      filterLabel: props.filter_label,
      postsLabel: 'Listings',
      isLoading: true,
      posts: [],
      totalAmountPosts: null,
      allPosts: [],
      currentTypes: [],
      currentAreas: [],
      minPrice: 0,
      maxPrice: 0,
      loadMoreText: props.load_more,
      count: 6,
      order: '',
      after: '',
      searchText: '',
    };
  }

  componentDidMount() {
    this.initiate();
  }

  initiate() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.setState({ isLoading: true });
    ItemsAPI.all(this.state)
      .then(response => response.json())
      .then(data => {
        window.setTimeout(() => {
          this.setState({
            posts: [...this.state.posts, ...data.results],
            totalAmountPosts: data.total,
            isLoading: false,
            after: data.paging ? data.paging.next.after : '',
          });
        }, 250);
      })
      .catch(error => {
        this.setState({
          error: true,
          isLoading: false,
        });
      });
  }

  handleSearch(searchText) {
    this.setState({
      searchText: searchText,
    });
  }

  handleSearchSubmit() {
    this.setState(
      {
        posts: [],
        after: '',
      },
      this.initiate,
    );
  }

  handleShowMore(e) {
    this.initiate();
  }

  handleChange(e) {
    let currentElements = [...this.state[e.currentTarget.dataset.target]];

    if (currentElements.includes(e.currentTarget.name)) {
      currentElements = currentElements.filter(item => item !== e.currentTarget.name);
    } else {
      currentElements.push(e.currentTarget.name);
    }

    this.setState(() => {
      return {
        [e.currentTarget.dataset.target]: currentElements,
        posts: [],
        after: '',
      };
    }, this.initiate);
  }

  handleInput(e) {
    console.log('Input');
    this.setState(() => {
      return {
        [e.currentTarget.dataset.target]: e.currentTarget.value,
        posts: [],
        after: '',
      };
    }, this.initiate);
  }

  handleClick(e) {
    this.setState(() => {
      return {
        currentTypes: [],
        currentAreas: [],
        minPrice: 0,
        maxPrice: 0,
        posts: [],
        searchText: '',
        after: '',
      };
    }, this.initiate);
  }

  handleOrder(e) {
    console.log('Handle select');
    this.setState(() => {
      return {
        posts: [],
        order: e.target.value,
        after: '',
      };
    }, this.initiate);
  }

  render() {
    const count = this.state.posts.length;
    console.log(this.state);
    return (
      <div className="c-app-overview__app-container">
        <SearchFilter
          searchText={this.props.searchText}
          onSearch={this.handleSearch.bind(this)}
          onSubmit={this.handleSearchSubmit.bind(this)}
          placeholder={'Your dream home'}
          searchActive={this.state.searchActive}
          isLoading={this.state.isLoading}
          desktop={false}
        />
        <div className="c-app-overview__filter-top-bar">
          <div className="c-app-overview__filter-count">{this.state.totalAmountPosts} items found</div>
        </div>
        <div class="c-app-overview__filter-container">
          <Filter
            portalId={this.state.portalId}
            tableId={this.state.tableId}
            currentTypes={this.state.currentTypes}
            currentAreas={this.state.currentAreas}
            minPrice={this.state.minPrice}
            maxPrice={this.state.maxPrice}
            handleInput={this.handleInput.bind(this)}
            handleChange={this.handleChange.bind(this)}
            handleClick={this.handleClick.bind(this)}
            isLoading={this.state.isLoading}
            searchText={this.state.searchText}
            onSearch={this.handleSearch.bind(this)}
            onSubmit={this.handleSearchSubmit.bind(this)}
            placeholder={'Your dream home'}
            searchLabel={this.state.searchLabel}
            filterLabel={this.state.filterLabel}
            language={this.props.language}
          />
        </div>
        <div class="c-app-overview__posts-wrapper">
          <div class="c-app-overview__posts-container">
            <Posts
              posts={this.state.posts}
              nrAll={this.state.totalAmountPosts}
              loading={this.state.isLoading}
              postsLabel={this.state.postsLabel}
              handleOrder={this.handleOrder.bind(this)}
              handleShowMore={this.handleShowMore.bind(this)}
              after={this.state.after}
              language={this.props.language}
              order={this.state.order}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
