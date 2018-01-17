import React, { Component, PropTypes } from 'react'

class SimpleInput extends Component {
    constructor(props) {
        super(props)

        this.state= {
            focused: false
        }

        this.handleValueChange = this.handleValueChange.bind(this)
        this.handleFocus = this.handleFocus.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.makeContainerCalssName = this.makeContainerCalssName.bind(this)
    }

    makeContainerCalssName() {
        let finalClassName = ''
        finalClassName += 'mdl-textfield mdl-js-textfield textfield textfield_size_l'
        if(this.state.focused) {
            finalClassName += ' is-focused is-dirty'
        }
        return finalClassName
    }

    makeInputClassName() {
        let finalClassName = ''
        finalClassName += 'mdl-textfield__input textfield__input'
        return finalClassName
    }

    handleValueChange(e) {
        e.preventDefault()
        let newValue = e.target.value
        this.props.onValueChange(newValue)
    }

    handleFocus(e) {
        e.preventDefault()
        this.setState({
            focused: true
        })
    }

    handleBlur(e) {
        e.preventDefault()
        this.setState({
            focused: false
        })
    }

    render() {
        const { value, placeholder, onKeyPress } = this.props
        return(
            <div
                className={this.makeContainerCalssName()}
            >
                <input
                    placeholder={placeholder}
                    className={this.makeInputClassName()}
                    onChange={this.handleValueChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    value={value}
                    onKeyPress={onKeyPress}
                />
            </div>
        )
    }
}

SimpleInput.propTypes = {
    onValueChange: PropTypes.func,
    value: PropTypes.string,
    placeholder: PropTypes.string
}

SimpleInput.defaultProps = {
    onValueChange: () => {},
    value: '',
    placeholder: ''
}

export {
    SimpleInput
}
