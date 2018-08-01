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
          {children}
        </div>
        );
    }

}

ShowContainer.propTypes = propTypes;
ShowContainer.defaultProps = defaultProps;

module.exports = ShowContainer
