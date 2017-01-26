import { renderComponent, chai } from '../helpers/TestHelper';
import { Counter } from './Counter';

/** Mock App. State */
const state: Object = {
  counter: { count: 1 },
};

describe('<Counter />', () => {

  let component;

  beforeEach(() => {
    component = renderComponent(Counter, state);
  });

  it('Renders header', () => {
    chai.expect(component.find('h4').text()).to.eql('Counter Example');
  });

  it('Renders Increment and Decrement buttons', () => {
    chai.expect(component.find('button')).to.have.length(2);
  });

  it('Renders counter value', () => {
    chai.expect(component.find('p').text()).to.eql('1');
  });

  it('Calls the increment', () => {
    chai.expect(component.find({ name: 'incBtn' })).to.exist;
    component.find({ name: 'incBtn' }).simulate('click');
    chai.expect(component.find('p').text()).to.eql('2');
  });

  it('Calls the decrement', () => {
    chai.expect(component.find({ name: 'decBtn' })).to.exist;
    component.find({ name: 'decBtn' }).simulate('click');
    chai.expect(component.find('p').text()).to.eql('0');
  });

});
