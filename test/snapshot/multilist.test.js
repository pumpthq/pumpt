import React from 'react';
import { Multi } from '../../src/components/main/multilist';
import renderer from 'react-test-renderer';

test('Multilist renders properly', () => {
  const component = renderer.create(
    <Multi
      handleGroups={true}
      items={[{id: 'one', key: 'one', text: 'choice 1 parent', value: 'option 1 parent',
                items: [{id: 'two', key: 'two', text: 'choice 1 child', value: 'option 2'}]},
                {id: 'three', key: 'three', text: 'choice 2 p', value: 'option 2', items: []}]}>
    </Multi>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
