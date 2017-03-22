import React, { Component, PropTypes } from 'react';

const propTypes = {
    title: PropTypes.string,
    text: PropTypes.string,
    percent: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    progress: PropTypes.oneOf(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    )
};

const defaultProps = {
    title: 'Title',
    text: 'Text',
    percent: 20,
    progress: 2
};

export default class CircleProgressBar extends Component {
    makeClassForCircle() {
        const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve']

        const { progress } = this.props

        let classes = ['progress__filled']

        if (progress) classes.push('progress__filled_' + numbers[progress])

        return classes.join(' ')
    }
    render() {
        const { title, text, percent } = this.props

        return (
            <div className="profile-progress profile-progress_size_l">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 204 204"
                     className={this.makeClassForCircle()}>
                    <path id="_x31_2"
                          d="M56.8 15.8c-.9 0-1.8-.5-2.3-1.4-.6-1.3-.1-2.8 1.1-3.4C68.4 4.5 82.2.8 96.6 0c1.4-.1 2.6 1 2.7 2.4.1 1.4-1 2.6-2.4 2.7-13.7.7-26.8 4.2-38.9 10.4-.4.2-.8.3-1.2.3z"
                          className="progress__image progress__image_twelfth"/>
                    <path id="_x31_1"
                          d="M18.5 50.3c-.5 0-1-.1-1.4-.4-1.2-.8-1.5-2.3-.8-3.5 7.8-12.1 17.9-22.2 30-30 1.2-.8 2.8-.4 3.5.8.8 1.2.4 2.8-.8 3.5-11.5 7.5-21.1 17.1-28.5 28.5-.4.7-1.2 1.1-2 1.1z"
                          className="progress__image progress__image_eleventh"/>
                    <path id="_x31_0"
                          d="M2.6 99.3h-.1C1 99.3-.1 98.1 0 96.7c.7-14.4 4.4-28.2 11-41 .6-1.3 2.2-1.8 3.4-1.1 1.3.6 1.8 2.2 1.1 3.4C9.3 70.2 5.7 83.3 5 97c0 1.3-1.1 2.3-2.4 2.3z"
                          className="progress__image progress__image_tenth"/>
                    <path id="_x39_"
                          d="M13.3 149.8c-.9 0-1.8-.5-2.3-1.4-6.5-12.8-10.2-26.6-11-41-.1-1.4 1-2.6 2.4-2.7 1.4-.1 2.6 1 2.7 2.4.7 13.7 4.2 26.8 10.4 39 .6 1.3.1 2.8-1.1 3.4-.3.2-.7.3-1.1.3z"
                          className="progress__image progress__image_ninth"/>
                    <path id="_x38_"
                          d="M47.8 188.1c-.5 0-1-.1-1.4-.4-12.1-7.8-22.2-17.9-30-30-.8-1.2-.4-2.8.8-3.5 1.2-.8 2.8-.4 3.5.8 7.5 11.5 17.1 21.1 28.5 28.5 1.2.8 1.5 2.3.8 3.5-.6.7-1.4 1.1-2.2 1.1z"
                          className="progress__image progress__image_eighth"/>
                    <path id="_x37_"
                          d="M96.8 204h-.1c-14.4-.7-28.2-4.4-41-11-1.3-.6-1.8-2.2-1.1-3.4.6-1.3 2.2-1.8 3.4-1.1 12.2 6.2 25.3 9.8 39 10.5 1.4.1 2.5 1.3 2.4 2.7-.1 1.2-1.3 2.3-2.6 2.3z"
                          className="progress__image progress__image_seventh"/>
                    <path id="_x36_"
                          d="M107.2 204c-1.3 0-2.5-1.1-2.5-2.4-.1-1.4 1-2.6 2.4-2.7 13.7-.7 26.8-4.2 39-10.4 1.3-.6 2.8-.1 3.4 1.1.6 1.3.1 2.8-1.1 3.4-12.8 6.5-26.6 10.2-41 11h-.2z"
                          className="progress__image progress__image_sixth"/>
                    <path id="_x35_"
                          d="M156.2 188.1c-.8 0-1.7-.4-2.1-1.2-.8-1.2-.4-2.8.8-3.5 11.5-7.5 21.1-17.1 28.5-28.5.8-1.2 2.3-1.5 3.5-.8 1.2.8 1.5 2.3.8 3.5-7.8 12.1-17.9 22.2-30 30-.5.3-1 .5-1.5.5z"
                          className="progress__image progress__image_fifth"/>
                    <path id="_x34_"
                          d="M190.7 149.8c-.4 0-.8-.1-1.2-.3-1.3-.6-1.8-2.2-1.1-3.4 6.2-12.2 9.8-25.3 10.5-39 .1-1.4 1.3-2.5 2.7-2.4 1.4.1 2.5 1.3 2.4 2.7-.7 14.4-4.4 28.2-11 41-.5.8-1.4 1.4-2.3 1.4z"
                          className="progress__image progress__image_fourth"/>
                    <path id="_x33_"
                          d="M201.4 99.3c-1.3 0-2.5-1.1-2.5-2.4-.7-13.7-4.2-26.8-10.4-39-.6-1.3-.1-2.8 1.1-3.4 1.3-.6 2.8-.1 3.4 1.1 6.5 12.8 10.2 26.6 11 41 .1 1.4-1 2.6-2.4 2.7h-.2z"
                          className="progress__image progress__image_third"/>
                    <path id="_x32_"
                          d="M185.5 50.3c-.8 0-1.7-.4-2.1-1.2-7.5-11.5-17.1-21.1-28.5-28.5-1.2-.8-1.5-2.3-.8-3.5.8-1.2 2.3-1.5 3.5-.8 12.1 7.8 22.2 17.9 30 30 .8 1.2.4 2.8-.8 3.5-.3.4-.8.5-1.3.5z"
                          className="progress__image progress__image_second"/>
                    <path id="_x31_"
                          d="M147.2 15.8c-.4 0-.8-.1-1.2-.3-12.2-6.2-25.3-9.8-39-10.5-1.4-.1-2.5-1.3-2.4-2.7.1-1.4 1.3-2.5 2.7-2.4 14.4.7 28.2 4.4 41 11 1.3.6 1.8 2.2 1.1 3.4-.4 1-1.3 1.5-2.2 1.5z"
                          className="progress__image progress__image_first"/>
                </svg>
                <div className="profile-progress__text-wrapper">
                    <span className="text text_color_invert">{title}</span>
                    <span className="profile-progress__text text text_color_invert">
                        {percent}%
                    </span>
                    <span className="text text_color_invert">{text}</span>
                </div>
            </div>

        )
    }
}

CircleProgressBar.propTypes = propTypes;
CircleProgressBar.defaultProps = defaultProps;
