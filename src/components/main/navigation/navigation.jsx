import React, {Component, PropTypes} from 'react'

const propTypes = {
    type : PropTypes.oneOf([
        'onboarding',
        'bottom',
        'footer',
        false
    ]),
    className : PropTypes.string,
    children : PropTypes.node
}
const defaultProps = {
    type : false,
    className : ''
}

export default class Navigation extends Component {
    makeClasses(initial) {
        let { type, className } = this.props
        let classes = [initial, className]

        if (type) classes.push('navigation_type_' + type)

        return classes.join(' ')
    }

    render() {
        return (
            <nav className={this.makeClasses('navigation')}>
                {this.props.children}
            </nav>
        )
    }
}

Navigation.propTypes = propTypes
Navigation.defaultProps = defaultProps
