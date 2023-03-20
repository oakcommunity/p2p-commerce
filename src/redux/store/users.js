import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  saveWalletData,
  getWalletData,
  deleteWalletData,
  isValidSession,
} from "../../utils/local-storage";
import { generateWallet } from "../../utils/wallet";

export const fetchSession = createAsyncThunk("users/fetchSession", async () => {
  // fetch wallet data from encrypted local store
  const walletData = await getWalletData();
  return walletData;
});

export const deleteSession = createAsyncThunk(
  "users/deleteWallet",
  async () => {
    // delete wallet data from encrypted local store
    const walletData = await deleteWalletData();
    return walletData;
  }
);

export const createWallet = createAsyncThunk(
  "users/createWallet",
  async (seedPhrase) => {
    // generate wallet
    const walletData = await generateWallet(seedPhrase);
    // save to local encrypted local store
    await saveWalletData(walletData);
    return walletData;
  }
);

export const userAdapter = createEntityAdapter();

const userSlice = createSlice({
  name: "users",
  initialState: userAdapter.getInitialState({
    loading: false,
    isLoggedIn: false,
    walletData: { address: "", privateKey: "", mnemonic: "" },
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSession.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSession.fulfilled, (state, action) => {
      state.walletData = action.payload;
      state.isLoggedIn = isValidSession(action.payload);
      state.loading = false;
    });
    builder.addCase(fetchSession.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteSession.fulfilled, (state, action) => {
      state.walletData = action.payload;
      state.isLoggedIn = false;
    });
    builder.addCase(createWallet.fulfilled, (state, action) => {
      state.walletData = action.payload;
      state.isLoggedIn = true;
    });
  },
});

export const {
  selectById: selectUserById,
  selectIds: selectUserIds,
  selectEntities: selectUserEntities,
  selectAll: selectAllUsers,
  selectTotal: selectTotalUsers,
} = userAdapter.getSelectors((state) => state.walletData);

export const { setWalletData } = userSlice.actions;
export default userSlice.reducer;
