import React, { Component, PropTypes } from 'react'

class AccordionItem extends Component {
    makeClasses(init) {
        const { className, status } = this.props
        const classes = [init, className]

        switch (status) {
            case 'active':
                classes.push('list__heading_active')
                break
            case 'filled':
                classes.push('list__heading_filled')
                break
        }

        return classes.join(' ')
    }

    renderChildren() {
        const { childrenActive, childrenFilled, status } = this.props

        switch (status) {
            case 'active':
                return childrenActive
            case 'filled':
                return childrenFilled
            default:
                return ''
        }
    }

    render() {
        const {
            iconElement,
            title,
            onClick,
            onWhenActiveClick,
            onWhenFilledClick,
            childrenActive,

            editTitle,
            onEdit,
            noEdit,
            
            status,
            defaultTitle
        } = this.props
        let nowOnClick
        
        switch (status) {
            case 'active' : nowOnClick = onWhenActiveClick
                break
            case 'filled' : nowOnClick = onWhenFilledClick
                break
            default : nowOnClick = onClick
        }
        if (!editTitle && !childrenActive) {
            return (
                <div>
                    <dt className={this.makeClasses('list__heading')}>
                    <span className="icon__wrapper">
                        {iconElement}
                    </span>
                        <a className="link list__heading-name" onClick={nowOnClick}>
                            {status ? defaultTitle : title}
                        </a>
                        <span class="list list_type_inline list__heading-link">
                    </span>
                    </dt>
                    {this.renderChildren()}
                </div>
            )
        } else if (noEdit) {
            return (
                <div>
                    <dt className={this.makeClasses('list__heading')}>
                    <span className="icon__wrapper">
                        {iconElement}
                    </span>
                        <a className="link list__heading-name" onClick={nowOnClick}>
                            {status ? defaultTitle : title}
                        </a>
                        <span class="list list_type_inline list__heading-link">
                    </span>
                    </dt>
                    {this.renderChildren()}
                </div>
            )
        } else if (!editTitle) {
            return (
                <div>
                    <dt className={this.makeClasses('list__heading')}>
                    <span className="icon__wrapper">
                        {iconElement}
                    </span>
                        <a className="link list__heading-name" onClick={nowOnClick}>
                            {status ? defaultTitle : title}
                        </a>
                        <span class="list list_type_inline list__heading-link">
                        <span class="list__item">
                            <a className="link" onClick={onEdit}>{'Edit '}</a>
                        </span>
                    </span>
                    </dt>
                    {this.renderChildren()}
                </div>
            )
        } else {
            return (
                <div>
                    <dt className={this.makeClasses('list__heading')}>
                    <span className="icon__wrapper">
                        {iconElement}
                    </span>
                        <a className="link list__heading-name" onClick={nowOnClick}>
                            {status ? defaultTitle : title}
                        </a>
                        <span class="list list_type_inline list__heading-link">
                        <span class="list__item">
                            <a className="link" onClick={onEdit}>{'Edit '}</a>
                        </span>
                        <span class="list__item">
                            <a className="link" onClick={onEdit}>{editTitle}</a>
                        </span>
                    </span>
                    </dt>
                    {this.renderChildren()}
                </div>
            )
        }
    }
}

AccordionItem.propTypes = {
    iconElement : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    className : PropTypes.string,
    childrenActive : PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.element)
    ]),
    childrenFilled : PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.element)
    ]),
    status : PropTypes.oneOf([
        'active', 'filled', false
    ]),
    title : PropTypes.string,
    defaultTitle : PropTypes.string,
    editTitle : PropTypes.string,
    noEdit : PropTypes.bool,
    onClick : PropTypes.func,
    onWhenActiveClick : PropTypes.func,
    onWhenFilledClick : PropTypes.func,
    onEdit : PropTypes.func
}
AccordionItem.defaultProps = {
    iconElement : '',
    className : '',
    childrenActive : '',
    childrenFilled : '',
    status : false,
    title : '',
    defaultTitle : '',
    editTitle : '',
    noEdit : false,
    onClick : () => {},
    onWhenActiveClick : () => {},
    onWhenFilledClick : () => {},
    onEdit : () => {}
}

export default AccordionItem
