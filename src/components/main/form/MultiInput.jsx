import React, { PropTypes } from 'react';
import Button from '../button';

export const MultiInput = (props) => {
  const { input: { value, onChange }, values } = props;
  const update = target => {
    if (value.includes(target)) {
      const d = value.indexOf(target);
      return value.slice(0, d).concat(value.slice(d + 1));
    }
    return [...value, target];
  };

  return (
    <div class="multi-input">
      { values.map(val => (
        <Button
          key={val}
          onClick={() => onChange(update(val))}
          typeColored
          buttonColor={value.includes(val) ? 'gold' : 'purple'}
        >
        {val}</Button>
      ))}
    </div>
  );
};

MultiInput.propTypes = {
  input: PropTypes.object,
  values: PropTypes.arrayOf(PropTypes.string),
};
MultiInput.defaultProps = {
  input: {
    value: [],
  },
  values: [],
};
