import { proxy } from "valtio";
import { derive, subscribeKey } from "valtio/utils";
import { Poll } from "./types";
import { getTokenPayload } from "./utils";

export enum AppPage {
  Welcome = "welcome",
  Create = "create",
  Join = "join",
  WaitingRoom = "waiting-room",
}

type User = {
  id: string;
  name: string;
};

export type AppState = {
  isLoading: boolean;
  currentPage: AppPage;
  poll?: Poll;
  accessToken?: string;
  user?: User;
};

const state: AppState = proxy({
  isLoading: false,
  currentPage: AppPage.Welcome,
});

const stateWithComputed: AppState = derive(
  {
    user: (get) => {
      const accessToken = get(state).accessToken;

      if (!accessToken) {
        return;
      }

      const token = getTokenPayload(accessToken);

      return {
        id: token.sub,
        name: token.name,
      };
    },
    isAdmin: (get) => {
      if (!get(state).user) {
        return false;
      }
      return get(state).user?.id === get(state).poll?.adminId;
    },
  },
  {
    proxy: state,
  }
);

const actions = {
  setPage: (page: AppPage): void => {
    state.currentPage = page;
  },
  startOver: (): void => {
    actions.setPage(AppPage.Welcome);
  },
  startLoading: (): void => {
    state.isLoading = true;
  },
  stopLoading: (): void => {
    state.isLoading = false;
  },
  initializePoll: (poll?: Poll): void => {
    state.poll = poll;
  },
  setPollAccessToken: (token?: string): void => {
    state.accessToken = token;
  },
};

subscribeKey(state, "accessToken", () => {
  if (state.accessToken && state.poll) {
    localStorage.setItem("accessToken", state.accessToken);
  } else {
    localStorage.removeItem("accessToken");
  }
});

export { stateWithComputed as state, actions };
