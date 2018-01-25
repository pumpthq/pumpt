import React, {Component, PropTypes} from 'react'

const propTypes = {
    children : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ]),
    type : PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf([
            'unnumeric',
            'inline',
            'links',
            'small',
            'x-small',
            'big',
            'nowrap',
            'onboarding',
            'steps',
            'accordion',
            'app',
            'images',
            'sublayer'
        ])
    ]),
    sublayer : PropTypes.bool,
    className : PropTypes.string
}

const defaultProps = {
    children : '',
    type : false,
    sublayer : false,
    className : ''
}

export default class list extends Component {
    makeClasses(initial) {
        let { type, className, sublayer, visualType } = this.props

        let classes = [initial, className]

        if (type) classes.push('list_type_' + type)
        if (visualType) classes.push('list_type_visual_' + visualType)
        if (sublayer) classes.push('list_sublayer_true')

        return classes.join(' ')
    }

    render() {
        return (
            <ul className={this.makeClasses('list')}>
                {this.props.children}
            </ul>
        )
    }
}

list.propTypes = propTypes
list.defaultProps = defaultProps
