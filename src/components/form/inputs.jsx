import React, { Component } from 'react'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

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

export const TextInput = (props) => {
    const { field, label, ...rest } = props
    return (
        <div>
          <label>{label}</label>
          <div>
            <input type="text"
              {...field}
              value={field.value} {...rest} />
          </div>
        </div>
    )
}

const DATE_FORMAT = "MM/DD/YYYY"

export class DateInput extends Component{

    constructor (props) {
        super(props);
        if(this.props.field.value) {
            this.state = { selectedDate: moment(this.props.field.value) }
        }else{
            this.state = { selectedDate: undefined }
        }
    }

    syncDatePickerWithField = () => {
        if(this.state.selectedDate && this.props.field.value && this.props.field.value !== this.state.selectedDate.format(DATE_FORMAT)) {
            console.log('unsynced datepicker field detected')
            //console.log(this.props.field.value, '!=', this.state.selectedDate.format(DATE_FORMAT))
            this.handleChange(moment(this.props.field.value)) // ❗ this line is needed to correctly display the formatted date in the input field
        }
    }

    componentWillMount() {
        this.syncDatePickerWithField()
    }
    componentDidUpdate() {
        this.syncDatePickerWithField()
    }

    handleChange = (date) => {
      this.setState({ selectedDate: date });
      this.props.field.onChange(date.format(DATE_FORMAT)) // ❗ this line is needed to correctly display the formatted date in the input field
    }

    render() {
        const { field, label, ...rest } = this.props
        return (
            <div>
              <label>{label}</label>
              <DatePicker {...field} dateFormat={DATE_FORMAT} selected={this.state.selectedDate} onChange={this.handleChange}/>
            </div>
        )
    }

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
const stateMap = Object.keys(STATES).map(id=> ({id,title:STATES[id]}))

export class Location extends Component {
  // shouldComponentUpdate(nextProps) {
  //   return this.props.state !== nextProps.state ||
  //     this.props.city !== nextProps.city
  // }

  render() {
    const { field: {state, city, abilityToRelocate } } = this.props
    return (
        <div>
            <div>
              <label>City</label>
              <div>
                <PureInput type="text" placeholder="City" field={city}/>
              </div>
            </div>

            <div>
              <label>State</label>
              <div>
                <EnumSelector field={state} options={stateMap}/>
              </div>
            </div>
            {abilityToRelocate &&
                <label><input type="checkbox" {...abilityToRelocate}/> Ability To Relocate</label>
            }
        </div>
    )
  }
}
