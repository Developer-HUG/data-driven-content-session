import { h, Component, createRef } from 'preact';
import TableAPI from '../api/TableAPI';
import Checkboxes from '../components/Checkboxes';
import Input from '../components/Input';
import SearchFilter from '../components/SearchFilter';
import { disableBodyScroll } from 'body-scroll-lock';
// Tell Babel to transform JSX into h() calls:
/** @jsx h */

class Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: [],
      area: [],
      error: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.fetchFilters();
  }

  fetchFilters() {
    this.setState({ isLoading: true });
    TableAPI.all(this.props.tableId, this.props.portalId)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          type: [...this.state.type, ...data.columns.find(x => x.name === 'type').options],
          area: [...this.state.area, ...data.columns.find(x => x.name === 'area').options],
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: true,
          isLoading: false,
        });
      });
  }

  render() {
    return (
      <div className="c-app-filter">
        <div className="c-app-filter__wrapper">
          <div className="c-app-filter__top-bar u-hide-on-large-up">
            <div className="c-app-filter__top-bar-title">{this.props.filterLabel}</div>
            <svg className="c-icon c-app-filter__filter-icon" onClick={this.props.handleToggle}>
              <use href="#close" xlinkHref="#close" />
            </svg>
          </div>
          <div className="c-app-filter__search-placeholder u-hide-on-medium-down">{this.props.searchLabel}</div>

          <SearchFilter
            searchText={this.props.searchText}
            onSearch={this.props.onSearch}
            onSubmit={this.props.onSubmit}
            placeholder={this.props.placeholder}
            isLoading={this.props.isLoading}
            desktop={true}
          />

          <div className="c-app-filter__filter-label u-hide-on-medium-down">{this.props.filterLabel}</div>

          <Input
            handleInput={this.props.handleInput}
            target="minPrice"
            name="min_price"
            title="Min price"
            value={this.props.minPrice}
            isLoading={this.props.isLoading}
          />

          <Input
            handleInput={this.props.handleInput}
            target="maxPrice"
            name="max_price"
            title="Max price"
            value={this.props.maxPrice}
            isLoading={this.props.isLoading}
          />

          <Checkboxes
            handleChange={this.props.handleChange}
            target="currentTypes"
            items={this.state.type}
            currentElements={this.props.currentTypes}
            type="type"
            title="Type"
            isLoading={this.props.isLoading}
          />

          <Checkboxes
            handleChange={this.props.handleChange}
            target="currentAreas"
            items={this.state.area}
            currentElements={this.props.currentAreas}
            type="area"
            title="Area"
            isLoading={this.props.isLoading}
          />

          <div class="c-app-filter__button-container" onClick={this.props.handleToggle}>
            <div class="c-app-filter__button c-button c-button--primary">Apply filter</div>
          </div>
          <div className="c-app-filter__reset" onClick={this.props.handleClick}>
            <svg className="c-icon c-app-filter__icon">
              <use href="#reset" xlinkHref="#reset" />
            </svg>
            Reset filter
          </div>
        </div>
      </div>
    );
  }
}

export default Filter;
