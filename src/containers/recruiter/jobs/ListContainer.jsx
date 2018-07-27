import React, {Component, PropTypes} from 'react';

const propTypes = {
    children : PropTypes.node,
};
const defaultProps = {};

class ShowContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const { children } = this.props;

        return (
              <div>
                <div className="container slider-container">
                    <div className="row">
                        <div className="col-12">
                            {children}
                        </div>
                    </div>
                </div>
              </div>
        );
    }

}

ShowContainer.propTypes = propTypes;
ShowContainer.defaultProps = defaultProps;

module.exports = ShowContainer
