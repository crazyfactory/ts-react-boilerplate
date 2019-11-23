import {IStore} from "../redux/IStore";

export const translationsSelector = (state: Pick<IStore, "settings">) => state.settings?.translations;
