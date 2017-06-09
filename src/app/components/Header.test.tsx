import { renderComponent } from "../helpers/TestHelper";
import { Header, Styles } from "./Header";

describe("<Header />", () => {

    const component = renderComponent(Header);

    it("Renders with correct style", () => {
        expect(component.hasClass(Styles.nav)).toBeTruthy();
    });

});
