import {fork, ForkEffect} from "redux-saga/effects";

export abstract class BaseSaga {
  constructor() {
    this.registerListeners = this.registerListeners.bind(this);
  }

  public watch(): ForkEffect {
    return fork(this.registerListeners);
  }

  protected abstract registerListeners(): IterableIterator<ForkEffect>;
}
