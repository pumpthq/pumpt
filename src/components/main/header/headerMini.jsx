import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import IconPerson from './../../icons/photo';
import { logOut } from './../../../actions/authorization';

// import ChangePassLink from '../../../containers/ChangePassword.jsx';

import {
    API_URL,
    API_IMAGES,
} from './../../../constants/api';

const propTypes = {
    logo: PropTypes.oneOfType([
        PropTypes.string,
    ]),
    profilePhoto: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
    dispatch: PropTypes.func,
    progress: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
};
const defaultProps = {
    logo: null,
    profilePhoto: '',
    className: '',
    name: false,
};

@connect(
    (dispatch, ownProps) =>
         ({
             dispatch,
         })

)
export default class HeaderMini extends Component {

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
        const {
            className,
            name,
            logo,
            dispatch,
            profilePhoto,
        } = this.props;

        return (
            <header class={`header ${className}`}>
                <div class="header__item">
                    <a href="" class="logo logo_full">
                        { logo ?
                            <img class="icon icon-logo" src={logo} />
                            : null
                        }
                    </a>
                </div>
                { name ?
                    <div class="header__item">
                        <div class="dropdown__wrapper">
                            <a
                                class="link profile-progress__wrapper"
                                href=""
                                onClick={(event) => { event.preventDefault(); }}
                            >
                                <span class="text text_color_invert">{name}</span>
                                <span class={`profile-progress profile-progress_size_s ${this.getCircleProgress()}`}>
                                { profilePhoto ?
                                    <img
                                        class="image image_round image_size_xs"
                                        src={profilePhoto}
                                    /> :
                                    <span class="image image_round image_size_xxl image_empty image_photo">
                                        <IconPerson />
                                    </span>
                                }
                            </span>
                            </a>
                            <div class="dropdown">
                                <ul class="list list_type_s list_type_links list_type_nowrap">
                                    {/* <ChangePassLink /> */}

                                    <li class="list__item" onClick={() => {
                                        dispatch(logOut());
                                    }}>
                                        <a href="" class="text" onClick={(event) => {
                                            event.preventDefault();
                                        }}>Log Out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div> : null
                }
            </header>
        );
    }
}

HeaderMini.propTypes = propTypes;
HeaderMini.defaultProps = defaultProps;
