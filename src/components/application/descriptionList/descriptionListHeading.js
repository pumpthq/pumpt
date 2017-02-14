import React, {Component, PropTypes} from 'react';

const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array
    ]),
    className : PropTypes.string,
    beforeImg : PropTypes.node,
    linkTitle : PropTypes.string
}

const defaultProps = {
    className : ''
}

export default class descriptionListHeading extends Component {
    render() {
        const { linkTitle, beforeImg } = this.props
        return (
            <dt className={'list__heading' + ' ' + this.props.className}>
                <span class='icon__wrapper'>
                    {beforeImg}
                </span>
                <a href='' class='link list__heading-name link_size_s-weight'>{linkTitle}</a>
                <a href='' class='link list__heading-link'>Edit Position</a>
            </dt>
        )
    }    
}

descriptionListHeading.propTypes = propTypes;
descriptionListHeading.defaultProps = defaultProps;
