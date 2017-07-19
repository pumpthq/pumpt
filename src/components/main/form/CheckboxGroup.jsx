import React from 'react';
import { FormGroup, ControlLabel, HelpBlock, Label } from 'react-bootstrap';

const Error = ({ meta : {touched, error} }) =>  (touched && error ? <HelpBlock>{error}</HelpBlock> : null);

const CheckboxGroup = ({ label, required, name, options,  input, meta}) => (
  <FormGroup controlId={name}>
    <ControlLabel>{label} { required && <Label bsStyle="info">required</Label> }</ControlLabel>
      { options.map((option, index) => (
        <div className="checkbox" key={index}>
          <label>
            <input type="checkbox"
                   name={`${name}[${index}]`}
                   value={option.name}
                   checked={input.value.indexOf(option.name) !== -1}
                   onChange={event => {
                     const newValue = [...input.value];
                     if(event.target.checked) {
                       newValue.push(option.name);
                     } else {
                       newValue.splice(newValue.indexOf(option.name), 1);
                     }

                     return input.onChange(newValue);
                   }}/>
            {option.name}
          </label>
        </div>))
      }
    <Error meta={meta} />
  </FormGroup>
);

export default CheckboxGroup;
