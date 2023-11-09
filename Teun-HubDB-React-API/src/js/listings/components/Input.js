import { h } from 'preact';

// Tell Babel to transform JSX into h() calls:
/** @jsx h */

const Input = props => {
  const { handleInput, target, title, name, isLoading, value } = props;

  return (
    <div className={`c-app-filter__inputs`}>
      <input
        type="text"
        name={name}
        value={value > 0 ? value : ''}
        className="c-app-filter__input"
        onBlur={handleInput}
        data-target={target}
        disabled={isLoading}
        placeholder={title}
      />
    </div>
  );
};

export default Input;
