import { renderComponent, chai } from 'helpers/TestHelper';
import { Stars } from './index';

/** Mock App. State */
const state: Object = {
  stars: {
    count: 61,
    isFetching: false,
  },
};

describe('<Counter />', () => {

  const component = renderComponent(Stars, state);

  it('Renders header', () => {
    chai.expect(component.find('div').text()).to.eql('61');
  });

});
