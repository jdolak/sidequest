// stores/globalStore.js
import { create } from 'zustand';

export const useGlobalStore = create((set) => ({
  currGroupID: null,
  setGroup: (value) => set({ currGroupID: value }),
}));
