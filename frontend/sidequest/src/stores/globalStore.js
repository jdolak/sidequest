// stores/globalStore.js
import { create } from 'zustand';

export const useGlobalStore = create((set) => ({
  currGroupID: null,
  setGroup: (value) => set({ currGroupID: value }),
}));

// import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

// export const useGlobalStore = create(
//   persist(
//     (set) => ({
//       currGroupID: null,
//       setGroup: (value) => set({ currGroupID: value }),
//     }),
//     {
//       name: 'global-store',
//       storage: sessionStorage, // Use sessionStorage instead of localStorage
//       serialize: (state) => JSON.stringify(state), // Explicitly serialize state
//       deserialize: (str) => JSON.parse(str),
//     }
//   )
// );