import { renderComponent, chai } from 'helpers/TestHelper';
import { Header, Styles } from './index';

describe('<Header />', () => {

    const component = renderComponent(Header);

    it('Renders with correct style', () => {
        chai.expect(component).to.have.className(Styles.nav);
    });

});
