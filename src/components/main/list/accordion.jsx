import React, { Component, PropTypes } from 'react';

class ListAccordion extends Component {

    constructor(props) {
        super(props)

        this.state = {
            active : false
        }

        this.handleToggleAccordion = this.handleToggleAccordion.bind(this)
    }

    makeClassesForLink(initial) {
        const { linkSize, className, selected } = this.props
        const classes = [initial, className]

        if (linkSize) classes.push(`link_size_${linkSize}`)

        return classes.join(' ')
    }

    render() {
        const { active } = this.state
        const { children, label, selected } = this.props

        return (
            <li class={`list__item ${(children ? 'list__item_sub_true' : '')} ${(selected || active ? ' list__item_active' : '')}`}>
                <a href='' class={this.makeClassesForLink('link')} onClick={(event) => {
                    event.preventDefault()
                    
                    this.handleToggleAccordion()
                }}>
                    {label}
                </a>
                {children}
            </li>
        )
    }

    handleToggleAccordion() {
        this.setState({
            active : !this.state.active
        })
    }

}

ListAccordion.propTypes = {
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
    label : PropTypes.string,
    className : PropTypes.string,
    selected : PropTypes.bool
}

ListAccordion.defaultProps = {
    children : '',
    linkSize : false,
    label : '',
    className : '',
    selected : false
}

export default ListAccordion
