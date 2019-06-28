import * as Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-enzyme";

Enzyme.configure({adapter: new Adapter()});

(global as any).requestAnimationFrame = (callback: () => void) => {
  setTimeout(callback, 0);
};

(global as any).alert = jest.fn();
