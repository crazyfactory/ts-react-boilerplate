import {oc} from "ts-optchain";
import {IStore} from "../redux/IStore";

export const translationsSelector = (state: Pick<IStore, "settings">) => oc(state).settings.translations();