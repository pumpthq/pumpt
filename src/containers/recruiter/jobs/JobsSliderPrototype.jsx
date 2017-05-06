import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import './jobs.less';

const propTypes = {
    jobs: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        jobTitle: PropTypes.string,
        location: PropTypes.string,
        salary: PropTypes.string,
        experience: PropTypes.string,
        employment: PropTypes.string,
        degree: PropTypes.string,
        matches: PropTypes.string,
    }))
};
const defaultProps = {};

@connect(
    function mapStateToProps(state) {
        return {
            state
        }
    },
    function dispatchStateToProps(dispatch) {
        return {
            dispatch
        }
    }
)
export default class JobsSliderPrototype extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

}

JobsSliderPrototype.propTypes = propTypes;
JobsSliderPrototype.defaultProps = defaultProps;
