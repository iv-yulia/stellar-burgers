import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { TOrder } from '@utils-types';

interface OrderState {
  order: TOrder | null;
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  order: null,
  orders: [],
  isLoading: false,
  error: null
};

export const fetchOrders = createAsyncThunk<TOrder[], void>(
  'orders/all',
  async () => {
    const response = await getOrdersApi();
    return response;
  }
);

export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'orders/orderId',
  async (id: number) => {
    const response = await getOrderByNumberApi(id);
    return response.orders[0];
  }
);

export const createOrder = createAsyncThunk<TOrder, string[]>(
  'order/create',
  async (ingredient) => {
    const response = await orderBurgerApi(ingredient);
    return response.order;
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    closeOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    getOrdersSlice: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.isLoading = false;
          state.order = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load';
      })
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.isLoading = false;
          state.order = action.payload;
          state.error = null;
        }
      )
      .addCase(createOrder.rejected, (state, action) => {
        state.order = null;
        state.isLoading = false;
        state.error = action.error.message || 'Failed to load';
      });
  }
});

export const { getOrdersSlice } = ordersSlice.selectors;
export const { closeOrder } = ordersSlice.actions;

export default ordersSlice;
