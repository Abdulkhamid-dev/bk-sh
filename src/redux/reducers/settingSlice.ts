import { EActionMode } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: TSettings = {
  bookModal: {
    visible: false,
    mode: EActionMode.Add,
  },
  loading: []
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setBookModalSetting: (state, action: PayloadAction<TSettings['bookModal']>) => {
      state.bookModal = action.payload;
    },
    removeSettings: (state) => {
      state.bookModal = initialState.bookModal;
    },
    setLoading: (state, action: PayloadAction<{ key: string; status: boolean }>) => {
      if (action.payload.status) {
        return {
          ...state,
          loading: [...state.loading, action.payload.key],
        };
      }
      return {
        ...state,
        loading: state.loading && state.loading.filter((item) => item !== action.payload.key),
      };
    },
  },
});

type TSettings = {
  bookModal: { visible: boolean; mode: EActionMode };
  loading: string[];
};

export const { setBookModalSetting, removeSettings, setLoading } = settingsSlice.actions;
export default settingsSlice.reducer;
