import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import DescriptionListItem from '../../../../../components/application/descriptionList/descriptionListItem'; // eslint-disable-line max-len

const AddQuoteOrMottoFilled = ({ quoteOrMotto }) => (
    <DescriptionListItem>
        <div className="list__item-general">
            <p className="text text_type_content text_size_xs">
                { quoteOrMotto }
            </p>
        </div>
    </DescriptionListItem>
);


AddQuoteOrMottoFilled.propTypes = {
    quoteOrMotto: PropTypes.string,
};
AddQuoteOrMottoFilled.defaultProps = {};

export default connect(
    (state) => {
        const {
            quoteOrMotto,
        } = state.applicationCompany;

        return {
            quoteOrMotto,
        };
    }
)(AddQuoteOrMottoFilled);
