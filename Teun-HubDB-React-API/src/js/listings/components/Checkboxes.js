import { h } from 'preact';

// Tell Babel to transform JSX into h() calls:
/** @jsx h */

const Checkboxes = props => {
  const { items, handleChange, target, currentElements, title, isLoading } = props;

  return (
    <div className={`c-app-filter__checkboxes`}>
      <div className="c-app-filter__title">{title}</div>
      {items.map(item => {
        return (
          <div className="c-app-filter__checkbox">
            <input
              type="checkbox"
              name={item.name}
              value="1"
              checked={currentElements.includes(item.name)}
              id={item.name}
              className="c-app-filter__input-checkbox"
              onChange={handleChange}
              data-target={target}
              disabled={isLoading}
            />
            <label className="c-app-filter__label" for={item.name}>
              {item.name.replaceAll('~', ',')}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default Checkboxes;
