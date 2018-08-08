import React from 'react';

import PencilIcon from 'components/icons/pencil';

const shortenLocation = value => {
  return value.match(/[^,]+,[^,]+/);
};

export default (props) => {

  const { company: { name, type, headquartersLocation, foundDate, employeesAmount } } = props;
  const { onEdit } = props;
  return (
    <div className="summary-body row card-inner">
      <div className="col-12 pt-5">
        <dl>
          <dt>Company</dt>
          <dd><h2>{name}</h2></dd>
          <dt>Headquarters</dt>
          <dd>{headquartersLocation && shortenLocation(headquartersLocation)}</dd>
          <dt>Company Type</dt>
          <dd>{type && Array.isArray(type) ? ` ${type.join(', ')}` : type}</dd>
          <dt># of Employees</dt>
          <dd>{` ${employeesAmount}`}</dd>
          <dt>Founded</dt>
          <dd>{` ${foundDate}`}</dd>
        </dl>
      </div>
      <a className="link link__edit" onClick={onEdit}>
        Edit
      </a>
    </div>
  );
};
