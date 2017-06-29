import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux';
import { reduxForm, Field, SubmissionError } from 'redux-form'

//Places Autocomplete Library
import PlacesAutocomplete from 'react-places-autocomplete'

const propTypes = {
    children : PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    className : PropTypes.string,
    onSubmit : PropTypes.func
}
const defaultProps = {
    children : '',
    className : '',
    onSubmit : () => {}
}

export default class Form extends Component {
    render() {
        const {
            className,
            children,
            onSubmit
        } = this.props
        
        return (
            <form onSubmit={onSubmit} class={`form ${className}`}>
                {children}
            </form>
        )
    }
}


Form.propTypes = propTypes
Form.defaultProps = defaultProps
