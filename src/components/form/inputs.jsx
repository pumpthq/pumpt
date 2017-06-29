import React, { Component } from 'react'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { reduxForm } from 'redux-form'

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
              onBlur={onBlur} className="enum-selector">
              <option value="" disabled>Select One...</option>
              {options.map( ({id,title}) =>
                  <option key={id} value={title}>{title}</option>
              )}
            </select>
          </div>
        </div>
    )
}

export class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 				props.value,
			placeholder: 	props.placeholder,
			labelClass: 	props.labelClass,
			inputClass: 	props.inputClass,
			readOnly: 		props.readOnly,
			field: 				props.field,
			label:				props.label

    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    const { field, label, inputClass, labelClass, value, placeholder, readOnly } = this.props
    return (
			<div>
        <label class={this.state.labelClass}>
				{this.state.label}
          <textarea class={this.state.inputClass} value={this.state.value} placeholder={this.state.placeholder} onChange={this.handleChange} />
        </label>
			</div>
    );
  }
}

export const TextInput = (props) => {
    const { field, label, classItm, classLb, classInp, ...rest } = props
    return (
        <div className={classItm}>
          <label className={classLb}>{label}</label>
          <div>
            <input type="text"
              className={classInp}
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
        const { field, label, placeholder, ...rest } = this.props
        return (
            <div>
              <label>{label}</label>
              <DatePicker {...field} dateFormat={DATE_FORMAT} selected={this.state.selectedDate} onChange={this.handleChange}
                          placeholderText={placeholder}
              />
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

export const FieldArray = (props) => {
    const { field, label, classFA, classFABtn } = props
    const Item = props.component
    return (
        <div className={classFA}>
            <button type="button" className={classFABtn} onClick={() => {
              field.addField()    // pushes empty child field onto the end of the array
            }}><i/> Add {label}
            </button>

            {field.map((child, index) =>
                <div key={index} className="field-array-items">
                    <Item field={child} />
                    <button type="button" onClick={() => {
                      field.removeField(index)  // remove from index
                    }}><i>Remove</i>
                    </button>
                </div>
            )}
        </div>
    )
}
