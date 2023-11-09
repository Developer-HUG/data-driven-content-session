import { h } from 'preact';
import Post from './Post';
import Loader from './Loader';

// Tell Babel to transform JSX into h() calls:
/** @jsx h */

const Posts = props => {
  const activeClass = props.showAll ? 'active' : '';
  return (
    <div className="c-app-overview__posts u-flex u-flex-v-center">
      <div class="c-app-overview__count">
        {props.postsLabel} ({props.nrAll})
      </div>

      <div className="c-app-overview__order u-flex u-flex-v-center u-flex-end">
        Order by:
        <select name="order" value={props.order} onChange={props.handleOrder}>
          <option disabled value="">Select an option</option>
          <option value="price">Price</option>
          <option value="random">Random</option>
          <option value="name">Name</option>
        </select>
      </div>

      {props.posts.map(post => {
        return <Post key={post.id} post={post} language={props.language} />;
      })}

      {props.loading ? <Loader /> : null}

      {props.after !== '' && !props.loading ? (
        <div className="c-app-overview__toggle-button-container">
          <div className="c-app-overview__posts-count">
            {props.posts.length} of {props.nrAll} listings shown
          </div>

          <div className={`c-app-overview__toggle-button u-flex ${activeClass}`} onClick={props.handleShowMore}>
            <div className="c-app-overview__show-more">Load more</div>
            <div className="c-app-overview__show-less">All loaded</div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Posts;
