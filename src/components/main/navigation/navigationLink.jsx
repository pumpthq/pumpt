import React, { Component, PropTypes } from 'react'

class NavigationLink extends Component {
    makeClasses(initial) {
        const { active, filled, className } = this.props
        const classes = [initial, className]

        if (active) classes.push('navigation__link_active')
        if (filled) classes.push('navigation__link_filled')

        return classes.join(' ')
    }

    render() {
        const { children, onClick, style, filled } = this.props
        
        return (
            <span class={this.makeClasses('navigation__link')}>
                <a
                    style={style}
                    class='navigation__link-inner'
                    href=''
                    onClick={(event) => {
                        event.preventDefault()

                        onClick()
                    }}
                >
                    {children}
                </a>
            </span>
        )
    }
}

NavigationLink.propTypes = {
    children : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ]),
    active : PropTypes.bool,
    filled: PropTypes.bool,
    className : PropTypes.string,
    onClick : PropTypes.func,
    style : PropTypes.object
}
NavigationLink.defaultProps = {
    children : '',
    active : false,
    filled: false,
    className : '',
    onClick : (event) => {},
    style : {}
}

export default NavigationLink
