import {
  fetchOrders,
  fetchOrderByNumber,
  createOrder,
  initialState,
  ordersSlice
} from '../orderSlice';
import { TOrder } from '@utils-types';

const reducer = ordersSlice.reducer;

describe('Тестирование ordersSlice', () => {
  const mockOrders: TOrder[] = [
    {
      _id: '1',
      status: 'done',
      name: 'Burger 1',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      number: 12345,
      ingredients: ['ingredient']
    },
    {
      _id: '1',
      status: 'pending',
      name: 'Burger 2',
      createdAt: '2024-01-01T00:00:00.000Z',
      updatedAt: '2024-01-01T00:00:00.000Z',
      number: 12346,
      ingredients: ['ingredient', 'ingredient']
    }
  ];

  describe('Получить список заказов', () => {
    it('Установить Loading в true и сбросить значение ошибки в null, когда будет отправлен запрос', () => {
      const state = reducer(initialState, fetchOrders.pending(''));
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Установить данные, ​​установить isLoading в false, когда запрос выполнен', () => {
      const state = reducer(
        { ...initialState },
        fetchOrders.fulfilled(mockOrders, '')
      );
      expect(state.isLoading).toBe(false);
      expect(state.orders).toEqual(mockOrders);
    });

    it('Установить ошибку и ​​установить isLoading в false при fetchIngredients.rejected', () => {
      const errorMessage = 'Failed to load';
      const state = reducer(
        { ...initialState },
        fetchOrders.rejected(new Error(errorMessage), '')
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('Получить заказ по номеру', () => {
    it('Установить Loading в true и сбросить значение ошибки в null, когда будет отправлен запрос', () => {
      const state = reducer(
        initialState,
        fetchOrderByNumber.pending('', mockOrders[0].number)
      );
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Установить данные, ​​установить isLoading в false, когда запрос выполнен', () => {
      const state = reducer(
        { ...initialState },
        fetchOrderByNumber.fulfilled(mockOrders[0], '', mockOrders[0].number)
      );
      expect(state.isLoading).toBe(false);
      expect(state.order).toEqual(mockOrders[0]);
    });

    it('Установить ошибку и ​​установить isLoading в false при fetchIngredients.rejected', () => {
      const errorMessage = 'Failed to load';
      const state = reducer(
        { ...initialState },
        fetchOrderByNumber.rejected(
          new Error(errorMessage),
          '',
          mockOrders[0].number
        )
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('Создать заказ', () => {
    it('Установить Loading в true и сбросить значение ошибки в null, когда будет отправлен запрос', () => {
      const state = reducer(
        initialState,
        createOrder.pending('', mockOrders[0].ingredients)
      );
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Установить данные, ​​установить isLoading в false, когда запрос выполнен', () => {
      const state = reducer(
        { ...initialState },
        createOrder.fulfilled(mockOrders[0], '', mockOrders[0].ingredients)
      );
      expect(state.isLoading).toBe(false);
      expect(state.order).toEqual(mockOrders[0]);
    });

    it('Установить ошибку и ​​установить isLoading в false при fetchIngredients.rejected', () => {
      const errorMessage = 'Failed to load';
      const state = reducer(
        { ...initialState },
        createOrder.rejected(
          new Error(errorMessage),
          '',
          mockOrders[0].ingredients
        )
      );
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });
});
