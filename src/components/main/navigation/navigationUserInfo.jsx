import React, {Component, PropTypes} from 'react';

const propTypes = {
    name: PropTypes.string,
    onClick : PropTypes.func,
    email: PropTypes.string,
    style : PropTypes.object
};

const defaultProps = {
    name: '',
    email: '',
    onClick : (event) => {},
    style : {}
};

export default class NavigationUserInfo extends Component {
    render() {
        const { onClick, style } = this.props

        return (
            <span class="navigation__link navigation__link_header"
                  style={style}
                  onClick={(event) => {
                        onClick()
                    }}
            >
                <span class="text text_size_xl text_weight_semibold">{this.props.name}</span><br/>
                <span class="text text_size_xs">{this.props.email}</span>
            </span>
        )
    }
}

NavigationUserInfo.propTypes = propTypes;
NavigationUserInfo.defaultProps = defaultProps;
