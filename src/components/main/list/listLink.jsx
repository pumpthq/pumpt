import React, { Component, PropTypes } from 'react'

class ListLink extends Component {
    
    makeClasses(initial) {
        const { linkSize, active } = this.props
        const classes = [initial]

        if (linkSize) classes.push('link_size_' + linkSize)
        if (!active) classes.push('link_color_l-grey')

        return classes.join(' ')
    }

    render() {
        const { onClick, className, children } = this.props

        return (
            <li class={'list__item ' + className}>
                <a href='' onClick={(event) => {
                  event.preventDefault()
                  
                  onClick()
                }} class={this.makeClasses('link')}>{children}</a>
            </li>
        )
    }

}

ListLink.propTypes = {
    children : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ]),
    linkSize : PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf([
            'l-weight',
            'xl',
            'l',
            'm'
        ])
    ]),
    className : PropTypes.string,
    onClick : PropTypes.func,
    active : PropTypes.bool
}

ListLink.defaultProps = {
    children : '',
    linkSize : false,
    className : '',
    onClick : () => {},
    active : true
}

export default ListLink
