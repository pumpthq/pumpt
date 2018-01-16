import React from 'react';
import RecruiterSummary from '../../src/components/recruiters/Summary';
import renderer from 'react-test-renderer';

const props = {
  recruiter: {
    fullName: "John Smith",
    position: "CEO",
  },
  authorization: {
    email: "abc@123.com"
  },
  onEdit: () => {}
}

test('Recruiter Summary renders properly', () => {
  const component = renderer.create(
    <RecruiterSummary
      {...props} >
    </RecruiterSummary>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
