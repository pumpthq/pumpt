import React from 'react';
import {SelectField, TextField} from 'material-ui'

export const renderTextField = ({
  input: {
    value,
    onChange
  },
  label,
	className,
  meta: { asyncValidating, touched, error }
}) => (
  <div class={className}>
		<div class={asyncValidating ? 'async-validating' : 'class'}>
      <TextField
        value={value}
        onChange={onChange}
        placeholder={label}
        floatingLabelText={label}
        style={{width: "100%"}}
      />
      {touched && error && <span class="textfield__error">{error}</span>}
    </div>
  </div>
)

export const renderField = ({
  input,
  label,
  type,
	className,
  meta: { asyncValidating, touched, error }
}) => (
  <div class={className}>
		<div class={asyncValidating ? 'async-validating' : 'class'}>
      <input
        class="mdl-textfield__input textfield__input"
        {...input}
        placeholder={label}
        type={type}
        style={{width: "100%"}}
      />
      {touched && error && <span class="textfield__error">{error}</span>}
    </div>
  </div>
)

export const renderSelectField = ({ input: {value, onChange}, label, meta: { touched, error }, children }) => (
    <div>
      <SelectField
        value={value}
        onChange={(event, id, payload) => (onChange(payload))}
        floatingLabelText={label}
        style={{width: "100%"}}
      >
        {children}
      </SelectField>
      {touched && error && <span>{error}</span>}
    </div>
)
