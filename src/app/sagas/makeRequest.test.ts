import {call, put} from "redux-saga/effects";
import makeRequest from "./makeRequest";

describe("makeRequest", () => {
  const promiseFunction = () => Promise.resolve("success!");
  const gen = makeRequest(
    {
      FULFILLED: "FULFILLED_ACTION",
      PENDING: "PENDING_ACTION",
      REJECTED: "REJECTED_ACTION"
    },
    promiseFunction,
    "arg1",
    "arg2"
  );

  it("must dispatch actionPending", () => {
    expect(gen.next().value).toEqual(put({type: "PENDING_ACTION"}));
  });

  it("must call apiMethod with correct arguments", () => {
    expect(gen.next().value).toEqual(call(promiseFunction, "arg1", "arg2", undefined, undefined, undefined, undefined));
  });

  it("must dispatch actionSuccess if promise is resolved", () => {
    expect(gen.next("data").value).toEqual(put({type: "FULFILLED_ACTION", payload: "data"}));
  });

  it("must dispatch actionFailure if promise is rejected", () => {
    expect(gen.throw({message: "error!"}).value).toEqual(put({type: "REJECTED_ACTION", message: "error!"}));
  });

  it("must be done", () => {
    expect(gen.next()).toEqual({done: true, value: undefined});
  });
});
