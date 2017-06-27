import {Promise} from "es6-promise";
import {call, put} from "redux-saga/effects";
import makeRequest from "./makeRequest";

describe("makeRequest", () => {
  const promiseFunction = () => Promise.resolve("success!");
  const gen = makeRequest(
    {
      FAILURE: "FAILURE_ACTION",
      PENDING: "PENDING_ACTION",
      SUCCESS: "SUCCESS_ACTION"
    },
    promiseFunction
  );

  it("must dispatch actionPending", () => {
    expect(gen.next().value).toEqual(put({type: "PENDING_ACTION"}));
  });

  it("must call apiMethod", () => {
    expect(gen.next().value).toEqual(call(promiseFunction));
  });

  it("must dispatch actionSuccess if promise is resolved", () => {
    expect(gen.next("data").value).toEqual(put({type: "SUCCESS_ACTION", payload: "data"}));
  });

  it("must dispatch actionFailure if promise is rejected", () => {
    expect(gen.throw({message: "error!"}).value).toEqual(put({type: "FAILURE_ACTION", message: "error!"}));
  });

  it("must be done", () => {
    expect(gen.next()).toEqual({done: true, value: undefined});
  });
});
