import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

const propTypes = {
    children: PropTypes.arrayOf(PropTypes.shape({
        title : PropTypes.string.isRequired,
        icon : PropTypes.node.isRequired,
        route : PropTypes.string.isRequired,
        onClick : PropTypes.func
    })),
    visible: PropTypes.bool,
    dispatch : PropTypes.func
};

const defaultProps = {
    tabs: [],
    visible: true
};

class TabBar extends Component {

    makeClasses() {
        const { visible } = this.props

        const classes = [
            'navigation', 'navigation_type_bottom',
            'navigation_color_invert', 'navigation_inline',
            'text-center', 'navigation_state_open'
        ];

        if (!visible) classes.push('invisible')

        return classes.join(' ')

    }

    render() {
        const {
            children,
            dispatch
        } = this.props;

        return (
            <nav className={this.makeClasses()}>
                {children.map((tab, index) => {
                    const {
                        title,
                        icon,
                        route,
                        action
                    } = tab;

                    return (
                        <Link
                            key={index}
                            to={route}
                            className="navigation__link"
                            activeClassName="navigation__link navigation__link_active"
                            onClick={() => {
                                // dispatch(action())
                            }}
                        >
                            {icon}
                            {title}
                        </Link>
                    )
                })}
            </nav>
        )
    }

}

TabBar.propTypes = propTypes;
TabBar.defaultProps = defaultProps;

export default connect()(TabBar);
