import React, {Component, PropTypes} from 'react';
import Button, {CustomButton} from '../button';

import './multiInput.less';

class MultiInput extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.makeTag = this.makeTag.bind(this);

    const { input: {value}, values } = this.props;
    const otherTags = value ? value.filter(v => (!values.includes(v))) : [];

    this.state = {
      otherTags
    }
  }

  update(target) {
    const { input: { value }, values } = this.props;
    const { otherTags } = this.state;
    // remove dead tags
    let newList = value && Array.isArray(value) ?
      value.filter(v => (values.includes(v) || otherTags.includes(v)))
      : [];
    if (newList.includes(target)) {
      const d = newList.indexOf(target);
      return newList.slice(0, d).concat(newList.slice(d + 1));
    }
    return [...newList, target];
  }

  makeTag(newTag) {
    const { otherTags } = this.state;
    const { input: {value, onChange} } = this.props;
    otherTags.push(newTag);
    this.setState({otherTags}); // add it to the display
    onChange([...value, newTag]) // ensure it's selected
  }

  render() {
    const { values, input: {value, onChange} } = this.props;
    const { otherTags } = this.state;
    let displayItems = values.filter(v => v !== "Other").concat(otherTags);

    return (
      <div className="multi-input">
        { displayItems.map(val => (
          <div>
            <input
              type="checkbox"
              key={val}
              checked={value.includes(val)}
              onClick={() => {
                onChange(this.update(val));
              }}
              value={val}
              name={`fields[${val}]`}
            />
            <label for={`fields[${val}]`}>
              {val}
            </label>
          </div>
        ))}
        <CustomButton 
          placeHolder="Other"
          key="Other"
          onEnter={this.makeTag}
          typeColored
          buttonColor="purple"
          className="button_type_tag"
        />
      </div>
    );
  }
}

MultiInput.propTypes = {
  input: PropTypes.object,
  values: PropTypes.arrayOf(PropTypes.string),
  label: PropTypes.string,
};
MultiInput.defaultProps = {
  input: {
    value: [],
  },
  values: [],
  label: '',
};

export default MultiInput;
