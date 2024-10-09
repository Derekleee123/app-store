import { create } from "zustand";

export type inputSizeCategories = "small" | "middle" | "large";

export interface App {
  "im:name": { label: string };
  category: {
    attributes: {
      label: string;
    };
  };
  "im:image": { label: string }[];
  link: { label: string };
  summary: { label: string };
  title: { label: string };
}

interface AppStore {
  appList: Array<App>;
  originalAppList: Array<App>;
  hotApps: Array<App>;
  isLoading: boolean;
  isChangePage: boolean;
  setAppList: (appList: Array<App>) => void;
  setOriginalAppList: (appList: Array<App>) => void;
  setHotApps: (hotApps: Array<App>) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsChangePage: (isChangePage: boolean) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  appList: [],
  originalAppList: [],
  hotApps: [],
  isLoading: true,
  isChangePage: false,
  setAppList: (appList) => set({ appList }),
  setHotApps: (hotApps) => set({ hotApps }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsChangePage: (isChangePage) => set({ isChangePage }),
  setOriginalAppList: (appList) => set({ originalAppList: appList }),
}));
