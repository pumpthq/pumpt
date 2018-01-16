import React, { PropTypes, Component } from 'react';
import Button, {CustomButton} from '../button';

class MultiInput extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.makeTag = this.makeTag.bind(this);
    this.state = {
      otherTags: []
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
    this.setState({otherTags}); // at it to the display
    onChange([...value, newTag]) // ensure it's selected
  }

  render() {
    const { values, input: {value, onChange} } = this.props;
    const { otherTags } = this.state;
    let displayItems = values.filter(v => v !== "Other").concat(otherTags);

    return (
      <div className="multi-input">
        { displayItems.map(val => (
          <Button
            key={val}
            onClick={() => {
              onChange(this.update(val));
            }}
            typeColored
            buttonColor={value.includes(val) ? 'gold' : 'purple'}
            className="button_type_tag"
          >
            {val}</Button>
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
