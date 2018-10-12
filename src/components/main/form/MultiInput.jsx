import React, {Component, PropTypes} from 'react';
import Button, {CustomButton} from '../button';
import {Checkbox} from 'material-ui'

import './multiInput.less';

class MultiInput extends Component {
  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.makeTag = this.makeTag.bind(this);

    const { input: {value}, values } = this.props;
    const otherTags = (value && Array.isArray(values)) ? value.filter(v => (!values.includes(v))) : [];

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
   // let displayItems = values.filter(v => v !== "Other").concat(otherTags);

		let ops =[];

			if(values === Object(values) && !Array.isArray(values)){
				Object.keys(values).forEach((opt, i) => {
					if(values[opt].length >= 1){
							let opts3 = {
									label: opt,
									options: []
							};
							values[opt].forEach((a, i) => {
									opts3.options.push({
											label: values[opt][i],
											value: values[opt][i]
									});
							});
							ops.push(opts3);
						} else {
								let opts4 = {
										label: opt,
										value: opt
								};
								ops.push(opts4);
						}
				});
			} else {
				values && values.forEach((opt) => {
						ops.push({
								label: opt,
								value: opt
						});
				});
		}
		console.log(ops);

		let columns = [];

		for (var i = 0; i < ops.length; i++){
			columns.push(
				<React.Fragment>
					<div>
						<h2>{ops[i].label}</h2>
						<div className="multi-input">
							{ ops[i].options.map(val => (
									<Checkbox
										key={val}
										checked={value.includes(val)}
										onCheck={() => {
											onChange(this.update(val));
										}}
										value={val}
										name={`fields[${val}]`}
										id={`fields[${val}]`}
										label={val}
									/>
							))}
							<CustomButton
								placeHolder="Other"
								key="Other"
								onEnter={this.makeTag}
							/>
						</div>
					</div>
				</React.Fragment>
			);
	}

	return (
		<React.Fragment>{columns}</React.Fragment>
	);
  }
}

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

export default MultiInput;
