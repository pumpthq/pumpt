import { shallow } from 'enzyme';

export const shallowWithStore = (component, store) => {
  const context = {
    store,
  };
  return shallow(component, { context });
};
