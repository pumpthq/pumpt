import React, { Component, PropTypes } from 'react'
import ShortID from 'shortid'

const propTypes = {
    value : PropTypes.string.isRequired,
    label : PropTypes.string,
    type : PropTypes.string,
    error : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    onChange : PropTypes.func,
    onFocus : PropTypes.func,
    onBlur : PropTypes.func,
    beforeImg : PropTypes.node,
    additionalClass : PropTypes.string,
    labelSize: PropTypes.oneOfType([
        PropTypes.oneOf([
            'xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl'
        ]),
        PropTypes.bool
    ])
}

const defaultProps = {
    value : '',
    label : '',
    type : 'text',
    error : false,
    onChange : () => {},
    onFocus : () => {},
    onBlur : () => {},
    additionalClass : '',
    labelSize: 'xs'
}

export default class ApplicationFieldset extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isFocused : false,
            isDirty : false
        }

        this.inputOnFocus = this.inputOnFocus.bind(this)
        this.inputOnBlur = this.inputOnBlur.bind(this)
        this.inputOnChange = this.inputOnChange.bind(this)
    }

    componentWillMount() {
        this.inputId = ShortID.generate()
    }

    makeClasses(initial) {
        const classes = [initial]
        const { isFocused, isDirty } = this.state
        const { error } = this.props

        if (isFocused) classes.push('is-focused')
        if (isDirty) classes.push('is-dirty')
        if (error) classes.push('is-invalid')

        return classes.join(' ')
    }

    makeClassesForLabel(initial) {
        let classes = [initial]
        const { labelSize } = this.props;

        if(labelSize) classes.push('text_size_' + labelSize)

        return classes.join(' ')
    }

    dirtying(bool) {
        this.setState({
            isDirty : bool
        })
    }

    focusing(bool) {
        this.setState({
            isFocused : bool
        })
    }

    render() {
        const {
            props,
            inputId,
            inputOnChange,
            inputOnFocus,
            inputOnBlur
        } = this

        const { type, label, value, error, beforeImg, additionalClass } = props

        return (
            <fieldset className="form__row row">
                <div className="col-lg-3 col-xs-4">
                    <label className={this.makeClassesForLabel('text text_helper text_helper_s')} htmlFor={inputId}>{label}</label>
                </div>
                <div className="col-lg-6 col-xs-8">
                    <div className={this.makeClasses('mdl-textfield mdl-js-textfield textfield'+' '+additionalClass)}>
                        <input
                            {...props}
                            className="mdl-textfield__input textfield__input"
                            type={type}
                            id={inputId}
                            onChange={inputOnChange}
                            onFocus={inputOnFocus}
                            onBlur={inputOnBlur}
                        />
                        <span className="mdl-textfield__label textfield__label" />
                        <span class='mdl-textfield__error textfield__error'>{error}</span>
                    </div>
                </div>
            </fieldset>
        )
    }

    inputOnFocus(event) {
        this.focusing(true)
        this.props.onFocus.apply(this, [event])
    }

    inputOnChange(event) {
        if (event.target.value.length > 0) {
            this.dirtying(true)
        } else {
            this.dirtying(false)
        }

        this.props.onChange.apply(this, [event])
    }

    inputOnBlur(event) {
        if (this.props.value.length > 0) {
            this.dirtying(true)
        } else {
            this.dirtying(false)
        }
        this.focusing(false)

        this.props.onBlur.apply(this, [event])
    }
}

ApplicationFieldset.propTypes = propTypes
ApplicationFieldset.defaultProps = defaultProps
