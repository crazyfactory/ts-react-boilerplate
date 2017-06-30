/** React Specific */
import {mount, ReactWrapper, render, shallow, ShallowRendererProps, ShallowWrapper} from "enzyme";
import * as React from "react";
import {IntlProvider} from "react-intl";
import {Provider} from "react-redux";
import {createStore, Store} from "redux";
import rootReducer from "../redux/rootReducer";

/** Redux Mock Store Configuration */
import {IStore} from "../redux/IStore";
import {IState} from "../redux/modules/baseModule";
import {ILanguage} from "../redux/modules/languageModule";

declare type TComponent = React.ComponentClass<any> | React.SFC<any> | React.ClassType<any, any, any> | string;

export class TestHelper<TProps, TState> {

  protected state: Partial<IStore>;
  protected props: TProps;
  protected locale: string;
  protected languageData: object;
  private ComponentClass: TComponent;

  public withState(state: Partial<IStore>): TestHelper<TProps, TState> {
    this.state = state;
    return this;
  }

  public withProps(props: TProps): TestHelper<TProps, TState> {
    this.props = props;
    return this;
  }

  // sets translation data to the state AND does NOT set directly to intl provider
  public withTranslation(translation: ILanguage): TestHelper<TProps, TState> {
    const languageState: IState<ILanguage> = {payload: translation};
    this.state = {...this.state, language: languageState};
    return this;
  }

  public mount(component: TComponent): ReactWrapper<TProps, TState> {
    this.ComponentClass = component;
    return mount(
      this.getWrappedComponent()
    );
  }

  public shallow(component: TComponent, options?: ShallowRendererProps): ShallowWrapper<TProps, TState> {
    this.ComponentClass = component;
    return shallow(this.getWrappedComponent(), options);
  }

  public render(component: TComponent, renderOptions?: any): Cheerio {
    this.ComponentClass = component;
    return render(this.getWrappedComponent(), renderOptions);
  }

  private getWrappedComponent(): JSX.Element {
    const ComponentClass = this.ComponentClass;
    const providerComponent = (
      <Provider store={this.getStore()}>
        <ComponentClass {...this.props} />
      </Provider>
    );
    return this.state.language ? this.getWithTranslation(providerComponent) : providerComponent;
  }

  private getWithTranslation(component: JSX.Element): JSX.Element {
    return (
      <IntlProvider locale={this.state.language.payload.locale} messages={this.state.language.payload.languageData}>
        {component}
      </IntlProvider>
    );
  }

  private getStore(): Store<IStore> {
    return createStore<IStore>(rootReducer, (this.state as any));
  }

}
