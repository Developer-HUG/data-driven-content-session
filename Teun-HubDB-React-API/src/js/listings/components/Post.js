import { h } from 'preact';

// Tell Babel to transform JSX into h() calls:
/** @jsx h */

const Post = props => {
  const { post } = props;

  return (
    <a href={post.path} className={`c-app-overview__post c-app-item`}>
      <div className="c-app-item__image-container u-image u-image--h_small">
        <img src={post.values.image.url} alt={post.values.name} className="c-app-item__image u-image__background" />
      </div>
      <div className="c-app-item__content-container">
        <div className="c-app-item__top-bar u-flex u-flex-sb u-flex-v-center">
          <div className="c-app-item__subtitle">{post.values.type[0].name}</div>
          <div className="c-app-item__price">$ {Number(post.values.price).toLocaleString('nl-NL')}</div>
        </div>
        <h2 className="c-app-item__title">{post.values.name}</h2>
        <div className="c-app-item__meta-bar">
          {post.values.area.map(area => {
            return <div className="c-app-item__meta">{area.name}</div>;
          })}
          <div className="c-app-item__meta c-app-item__meta--last">{post.values.rooms} rooms</div>
        </div>

        <p className="c-app-item__content" dangerouslySetInnerHTML={{ __html: post.values.description }}></p>

        <div className="c-app-item__button">
          Read more
          <svg className="c-icon c-app-item__icon">
            <use href="#arrow-right" xlinkHref="#arrow-right" />
          </svg>
        </div>
      </div>
    </a>
  );
};

export default Post;
