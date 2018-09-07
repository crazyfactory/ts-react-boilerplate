import {call, put} from "redux-saga/effects";
import makeRequest from "./makeRequest";

describe("makeRequest", () => {
  const promiseFunction = () => Promise.resolve("success!");
  let gen;

  beforeEach(() => {
    gen = makeRequest(
      {
        FULFILLED: "FULFILLED_ACTION",
        PENDING: "PENDING_ACTION",
        REJECTED: "REJECTED_ACTION"
      },
      promiseFunction,
      "arg1",
      "arg2"
    );
  });

  it("must dispatch actionPending", () => {
    expect(gen.next().value).toEqual(put({type: "PENDING_ACTION"}));
  });

  it("must call apiMethod with correct arguments", () => {
    gen.next();
    expect(gen.next().value).toEqual(call(promiseFunction, "arg1", "arg2", undefined, undefined, undefined, undefined));
  });

  it("must dispatch actionSuccess", () => {
    gen.next();
    gen.next();
    expect(gen.next("data").value).toEqual(put({type: "FULFILLED_ACTION", payload: "data"}));
  });

  it("must dispatch actionFailure ", () => {
    gen.next();
    gen.next();
    expect(gen.next({error: "error!"}).value).toEqual(put({type: "REJECTED_ACTION", message: "error!"}));
  });

  it("must be done", () => {
    gen.next();
    gen.next();
    gen.next("data");
    expect(gen.next()).toEqual({done: true, value: undefined});
  });
});
