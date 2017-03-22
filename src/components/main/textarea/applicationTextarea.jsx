import React, { Component, PropTypes } from 'react'
import ShortID from 'shortid'
import Textarea from 'react-textarea-autosize'

const propTypes = {
    className : PropTypes.string,
    label : PropTypes.string,
    type : PropTypes.string,
    value : PropTypes.string,
    onChange : PropTypes.func,
    onFocus : PropTypes.func,
    onBlur : PropTypes.func,
    error : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ])
}

const defaultProps = {
    className : 'mdl-textfield__input textfield__input',
    label : '',
    value : '',
    type : 'text',
    onChange : () => {},
    onFocus : () => {},
    onBlur : () => {}
}

export default class ApplicationTextarea extends Component {
    constructor(props){
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

    componentDidMount() {
        const { value } = this.props

        // TIP When component received initial value it should be dirty
        if (value) this.dirtying(true)
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
        const { className, label, type, value } = props
        return (
            <div class={this.makeClasses('mdl-textfield mdl-js-textfield textfield textfield_type_textarea is-upgraded')}>
                <Textarea
                    class={className}
                    id={inputId}
                    type={type}
                    value={value}
                    onChange={inputOnChange}
                    onFocus={inputOnFocus}
                    onBlur={inputOnBlur}
                />
                <label class="mdl-textfield__label textfield__label" htmlFor={inputId}>
                    {label}
                </label>
            </div>
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

ApplicationTextarea.propTypes = propTypes
ApplicationTextarea.defaultProps = defaultProps
