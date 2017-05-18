import React, { Component } from 'react'

export const EnumSelector = (props) => {
    const {field, label, options, onChange, onBlur} = props
    return (
        <div>
          <label>{label}</label>
          <div>
            <select
              {...field}
              // required syntax for reset form to work
              // undefined will not change value to first empty option
              // when resetting
              value={field.value || ''}
              disabled={options.length === 0}
              onBlur={onBlur}>
              <option value="" disabled>Select One...</option>
              {options.map( ({id,title}) =>
                  <option key={id} value={title}>{title}</option>
              )}
            </select>
          </div>
        </div>
    )
}

export const TextArea = (props) => {
    const { field, label } = props
    return (
        <div>
          <label>{label}</label>
          <div>
            <textarea
              {...field}
              // required for reset form to work (only on textarea's)
              // see: https://github.com/facebook/react/issues/2533
              value={field.value || ''}/>
          </div>
        </div>
    )
}

export class PureInput extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.field !== nextProps.field
  }

  render() {
    const { field, ...rest } = this.props
    return <input {...field} {...rest}/>
  }
}

import STATES from 'constants/states.json';

export class Location extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.state !== nextProps.state ||
      this.props.city !== nextProps.city
  }

  render() {
    const { state, city } = this.props
    return (
        <div>
            <div>
              <label>City</label>
              <div>
                <PureInput type="text" placeholder="City" field={city} title={city.error}/>
              </div>
            </div>

            <div>
              <label>State</label>
              <div>
                <select {...state} value={state.value || ''}>
                  <option value='' disabled>Select One...</option>
                  {Object.keys(STATES).map(state =>
                      <option key={state} value={STATES[state]}>{STATES[state]}</option>
                  )}
                </select>
              </div>
            </div>
        </div>
    )
  }
}

// PureInput.propTypes = {
//   field: PropTypes.object.isRequired
// }
