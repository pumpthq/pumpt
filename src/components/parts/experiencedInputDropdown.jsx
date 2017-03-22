import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import OnboardingInputDropdown from '../onboarding/onboardingInputDropdown';

@connect(
    (dispatch, ownProps) =>
         ({
             dispatch,
         })

)
class ExperiencedInputDropdown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            list: [],
        };
    }

    componentWillMount() {
        const { filter } = this.props;

        this.filter = filter.bind(this);
    }

    render() {
        const { list } = this.state;
        const {
            label,
            dropdownSize,
            listTypeSize,
            listTypeNowrapClass,
            textFieldSize,
            textSizeForEachList,
            ctrl,
            additionalClass,
            error,
        } = this.props;

        return (
            <OnboardingInputDropdown
                {...ctrl}
                {...{
                    label,
                    dropdownSize,
                    listTypeSize,
                    listTypeNowrapClass,
                    textFieldSize,
                    textSizeForEachList,
                    additionalClass,
                    error,
                }}
                list={list}
                onChange={(event) => {
                    const { value } = event.target;

                    this.filter({ value });
                }}
            />
        );
    }

}

ExperiencedInputDropdown.propTypes = {
    label: PropTypes.string,
    ctrl: PropTypes.object,
    filter: PropTypes.func,
    onClickListItem: PropTypes.func,
    onFilter: PropTypes.func,
    dispatch: PropTypes.func,
    dropdownSize: PropTypes.string,
    listTypeSize: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
    ]),
    listTypeNowrapClass: PropTypes.bool,
    textFieldSize: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
    ]),
    textSizeForEachList: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
    ]),
    additionalClass: PropTypes.string,
    error: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.string,
    ]),
};
ExperiencedInputDropdown.defaultProps = {
    ctrl: {},
    filter: ({ value }) => {},
    onClickListItem: ({ dispatch, item, filter }) => {},
    onFilter: ({ dispatch, value }) => {},
};

export default ExperiencedInputDropdown;
