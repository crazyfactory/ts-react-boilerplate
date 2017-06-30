/** React Specific */
import {mount, ReactWrapper} from "enzyme";
import * as React from "react";
import {IntlProvider} from "react-intl";
import {Provider} from "react-redux";
import {createStore, Store} from "redux";
import rootReducer from "../redux/rootReducer";

/** Redux Mock Store Configuration */
import {IStore} from "../redux/IStore";
import {ILanguage} from "../redux/modules/languageModule";

declare type TComponent = React.ComponentClass<any> | React.SFC<any> | React.ClassType<any, any, any> | string;

export class TestHelper<TProps, TTranslation> {

  protected state: Partial<IStore>;
  protected props: TProps;
  protected locale: string;
  protected languageData: object;
  private ComponentClass: TComponent;

  public withState(state: Partial<IStore>): TestHelper<TProps, TTranslation> {
    this.state = state;
    return this;
  }

  public withProps(props: TProps): TestHelper<TProps, TTranslation> {
    this.props = props;
    return this;
  }

  public withTranslation(translation: ILanguage): TestHelper<TProps, TTranslation> {
    this.locale = translation.locale;
    this.languageData = translation.languageData;
    return this;
  }

  public mount(component: TComponent): ReactWrapper<IStore, any> {
    this.ComponentClass = component;
    return mount(
      this.getWrappedComponent()
    );
  }

  private getWrappedComponent(): JSX.Element {
    const ComponentClass = this.ComponentClass;
    const providerComponent = (
      <Provider store={this.getStore()}>
        <ComponentClass {...this.props} />
      </Provider>
    );
    return this.locale && this.languageData
      ? this.getWithTranslation(providerComponent)
      : providerComponent;
  }

  private getWithTranslation(component: JSX.Element): JSX.Element {
    return (
      <IntlProvider locale={this.locale} messages={this.languageData}>
        {component}
      </IntlProvider>
    );
  }

  private getStore(): Store<IStore> {
    return createStore<IStore>(rootReducer, (this.state as any));
  }

}
