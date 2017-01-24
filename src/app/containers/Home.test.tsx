import { renderComponent, chai } from 'helpers/TestHelper';
import { Home, Styles } from './Home';

describe('<Home />', () => {

  const component = renderComponent(Home);

  it('Renders with correct style', () => {
    chai.expect(component).to.have.className(Styles.home);
  });

  it('Renders Barbar Logo', () => {
    chai.expect(component.find('img')).to.exist;
  });

  it('Has a p element that says Hello!', () => {
    chai.expect(component.find('p').text()).eql('Hello!');
  });

});
