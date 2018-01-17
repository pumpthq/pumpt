import React from 'react';
import Navigation from '../../src/components/main/navigation';
import renderer from 'react-test-renderer';

test('navigation renders properly', () => {
  const component = renderer.create(
    <Navigation type="onboarding">Nav Links</Navigation>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});
