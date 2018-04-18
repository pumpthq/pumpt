import React from 'react';

import PencilIcon from 'components/icons/pencil';

const shortenLocation = value => {
  return value.match(/[^,]+,[^,]+/);
};

export default (props) => {

  const { company: { name, type, headquartersLocation, foundDate, employeesAmount } } = props;
  const { onEdit } = props;
  return (
    <div className="summary-head company-summary-head">
      <div className="summary-head__title mdl-card__title">
        <div className="row">
          <div className="col-md-11 col-lg-11 col-sm-10 col-xs-12">

            <div className="summary-head__title-item">
              <div className="row summary-head__title-column">
                <div className="summary-head__title-block">
                  <div className="summary-head__title-block">
                    <h2 className="mdl-card__title-text heading heading_type_two">
                      {` ${name}`}
                      <a
                        className="link" onClick={onEdit}
                         style={{
                           visibility: 'visible',
                           opacity: 1,
                         }}
                      >
                        <PencilIcon />
                        &nbsp;Edit
                      </a>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="summary-head__title-item">
              <div className="summary-head__title-column">
                <span className="text summary-head__label">Headquarters</span>
                  {headquartersLocation &&
                    <span className="text text_size_s summary-head__summary">
                      {`${shortenLocation(headquartersLocation)}`}
                    </span>
                  }
              </div>
              <div className="summary-head__title-column">
                <span className="text summary-head__label">Company Type</span>
                <span className="text text_size_s summary-head__summary">
                  {type && Array.isArray(type) ? ` ${type.join(', ')}` : type}
                </span>
              </div>
              <div className="summary-head__title-column">
                <span className="text summary-head__label"># of Employees</span>
                <span className="text text_size_s summary-head__summary">
                  {` ${employeesAmount}`}
                </span>
              </div>
              <div className="summary-head__title-column">
                <span className="text summary-head__label">Founded</span>
                <span className="text text_size_s summary-head__summary">{` ${foundDate}`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
