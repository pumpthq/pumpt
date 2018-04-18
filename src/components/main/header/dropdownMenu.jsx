import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import IconPerson from './../../icons/photo';

const propTypes = {
    userName: PropTypes.string,
    userAvatar: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element,
        PropTypes.array,
    ]),
    progress: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
    linkTo: PropTypes.string,
};

const defaultProps = {
    userName: '',
    userAvatar: '',
    children: '',
};

export default class DropdownMenu extends Component {

    constructor(props) {
        super(props);

        this.getCircleProgress = this.getCircleProgress.bind(this);
    }

    getCircleProgress() {
        const numbers = [
            'zero',
            'one',
            'two',
            'three',
            'four',
            'five',
            'six',
            'seven',
            'eight',
            'nine',
            'ten',
            'eleven',
            'twelve',
        ];
        const { progress } = this.props;
        const classPrefix = 'profile-progress_filled';
        const classProgress = `${classPrefix}_${numbers[progress]}`;

        return classProgress;
    }

    render() {
        const { userName, userAvatar, children, linkTo } = this.props;
        return (
            <div className="dropdown__wrapper">
                <Link to={linkTo} className="link profile-progress__wrapper">
                    <span className="text text_color_invert">{userName}</span>
                    <span class={`profile-progress profile-progress_size_s ${this.getCircleProgress()}`}>
                        { userAvatar ?
                            <img
                                role="presentation"
                                className="image image_round image_size_xs"
                                src={userAvatar}
                            /> :
                            <span className="image image_round image_size_xxl image_empty image_photo">
                                <IconPerson />
                            </span>
                        }
                    </span>
                </Link>
                <div className="dropdown">
                    <ul className="list list_type_s list_type_links list_type_nowrap">
                        {children}
                    </ul>
                </div>
            </div>
        )
    }
}

DropdownMenu.propTypes = propTypes
DropdownMenu.defaultProps = defaultProps
