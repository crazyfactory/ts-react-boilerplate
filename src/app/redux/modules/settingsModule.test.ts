// import {IAction, INVOKED, PENDING} from "./baseModule";
// import {setLanguage, invokeChangeLanguage, ISettingsState, settingsReducer} from "./settingsModule";
//
// describe("settingsModule", () => {
//   describe("reducer", () => {
//     describe("returns correct state", () => {
//       it("when action.type = changeLanguage.actionTypes.PENDING", () => {
//         const stateBefore: ISettingsState = {
//           error: "",
//           language: "en",
//           pending: false,
//           translations: {Hi: "Hi"}
//         };
//         const stateAfter = settingsReducer(stateBefore, {payload: "de-DE", type: setLanguage.actionTypes.INVOKED});
//         expect(stateAfter).toEqual({
//           error: "",
//           language: "de-DE",
//           pending: false,
//           translations: {Hi: "Hi"}
//         });
//       });
//
//       it("when action.type = changeLanguage.actionTypes.PENDING", () => {
//         const stateBefore: ISettingsState = {
//           error: "",
//           language: "de-DE",
//           pending: false,
//           translations: {Hi: "Hi"}
//         };
//         const stateAfter = settingsReducer(stateBefore, {type: setLanguage.actionTypes.PENDING});
//         expect(stateAfter).toEqual({
//           error: "",
//           language: "de-DE",
//           pending: true,
//           translations: {Hi: "Hi"}
//         });
//       });
//
//       it("when action.type = changeLanguage.actionTypes.FULFILLED", () => {
//         const stateBefore: ISettingsState = {
//           error: "",
//           language: "de-DE",
//           pending: true,
//           translations: {Hi: "Hi"}
//         };
//         const stateAfter = settingsReducer(
//           stateBefore,
//           {payload: {Hi: "Hallo"}, type: setLanguage.actionTypes.FULFILLED}
//         );
//         expect(stateAfter).toEqual({
//           error: "",
//           language: "de-DE",
//           pending: false,
//           translations: {Hi: "Hallo"}
//         });
//       });
//
//       it("when action.type = changeLanguage.actionTypes.REJECTED", () => {
//         const stateBefore: ISettingsState = {
//           error: "",
//           language: "de-DE",
//           pending: true,
//           translations: {Hi: "Hi"}
//         };
//         const stateAfter = settingsReducer(
//           stateBefore,
//           {message: "Error occurred!", type: setLanguage.actionTypes.REJECTED}
//         );
//         expect(stateAfter).toEqual({
//           error: "Error occurred!",
//           language: "de-DE",
//           pending: false,
//           translations: {Hi: "Hi"}
//         });
//       });
//
//       it("when action.type is unknown", () => {
//         const stateBefore: ISettingsState = {
//           error: "",
//           language: "en",
//           pending: false,
//           translations: {Hi: "Hi"}
//         };
//
//         const stateAfter = settingsReducer(stateBefore, {type: "Foo" as PENDING});
//         expect(stateAfter).toBe(stateBefore);
//       });
//     });
//
//     it("has default initialState", () => {
//       const initialState: ISettingsState = {
//         error: "",
//         language: "en",
//         pending: false,
//         translations: {}
//       };
//
//       const stateAfter = settingsReducer(undefined, {type: "Foo" as PENDING});
//       expect(stateAfter).toEqual(initialState);
//     });
//   });
//
//   describe("action creator", () => {
//     describe("invokeChangeLanguage()", () => {
//       it("creates correct action", () => {
//         const expected: IAction<string, INVOKED> = {
//           payload: "de-DE",
//           type: setLanguage.actionTypes.INVOKED
//         };
//         expect(invokeChangeLanguage("de-DE")).toEqual(expected);
//       });
//     });
//   });
// });
