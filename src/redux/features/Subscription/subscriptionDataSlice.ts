import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Subscription {
  id: string;
  planId: string;
  userId: string;
  amount: number;
  paymentStatus: string;
  stripePaymentId: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
}

interface SubscriptionDataState {
  subscription: Subscription | null;
}

const initialState: SubscriptionDataState = {
  subscription: null,
};

const subscriptionDataSlice = createSlice({
  name: "subscriptionData",
  initialState,
  reducers: {
    setSubscriptionData: (state, action: PayloadAction<any>) => {
      state.subscription = action.payload;
    },
  },
});

export const { setSubscriptionData } = subscriptionDataSlice.actions;
export default subscriptionDataSlice.reducer;
