import React, { Component, PropTypes } from 'react';
import './header-full.less';
import logoImage from '../../../img/sprites-svg/logo.svg';


const propTypes = {
    logo: PropTypes.string,
    title: PropTypes.string,
    menu: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array,
    ]),
    addition: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array,
    ]),
};

const defaultProps = {
    logo: '',
    title: 'Title',
    menu: '',
    addition: '',
};

export default class HeaderFull extends Component {
    renderLogo(img) {
        if (img !== null) {
            return (
                <img className="icon icon-logo" role="presentation" src={img} />
            );
        }
        return '';
    }

    render() {
        const { links, menu, addition } = this.props;
        return (
            <header className="header header-full">
                <div className="header__item">
                    <a href="/" className="logo">
                        {this.renderLogo(logoImage)}
                    </a>
                    <nav className="navigation navigation_color_invert navigation_inline">
                        {links}
                        <span className="navigation__link navigation__link_raised-inner">
                            {menu}
                        </span>
                    </nav>
                </div>
                <div className="header__item">
                    {addition}
                </div>
            </header>
        );
    }
}

HeaderFull.propTypes = propTypes;
HeaderFull.defaultProps = defaultProps;
