import React, { Component, PropTypes } from 'react'

class NavigationLink2 extends Component {
    makeClassName() {
        let finalClassName = 'navigation__link';
        const { active, filled, className } = this.props
        finalClassName += ' ' + className
        if (active) finalClassName += ' navigation__link_active'
        if (filled) finalClassName += ' navigation__link_filled'
        return finalClassName;
    }

    render() {
        const { filled, textFilledWith, textLabel, onClick, style } = this.props
        if(filled) {
            return (
                <div class={this.makeClassName()}>
                    <span class='text text_size_xs text_color_l-grey'>{textLabel}</span>
                    <a
                        href=''
                        class='navigation__link-inner item-with-label'
                        style={style}
                        onClick={(e) => {
                            e.preventDefault()

                            onClick(e)
                        }}
                    >{textFilledWith}</a>
                </div>
            )
        } else {
            return (
                <div class={this.makeClassName()}>
                    <a
                        href=''
                        class='navigation__link-inner'
                        style={style}
                        onClick={(e) => {
                            e.preventDefault()

                            onClick(e)
                        }}
                    >{textLabel}</a>
                </div>
            )
        }

    }
}

NavigationLink2.propTypes = {
    active: PropTypes.bool,
    filled: PropTypes.bool,
    textFilledWith: PropTypes.string,
    textLabel: PropTypes.string,
    style: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    onClick: PropTypes.func
}

NavigationLink2.defaultProps = {
    active: false,
    filled: false,
    textFilledWith: '',
    textLabel: '',
    style: '',
    className: '',
    onClick: () => {}
}

export default NavigationLink2
