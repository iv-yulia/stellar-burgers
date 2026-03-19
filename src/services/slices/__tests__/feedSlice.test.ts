import { fetchFeeds, initialState, feedsSlice } from '../feedSlice';
import { TOrder } from '@utils-types';

const reducer = feedsSlice.reducer;

describe('Тестирование feedsSlice', () => {
  const mockFeeds: TOrder[] = [
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

  const mockFeedData = {
    orders: mockFeeds,
    total: 100,
    totalToday: 10
  };

  it('Установить Loading в true и сбросить значение ошибки в null, когда будет отправлен запрос.', () => {
    const state = reducer(initialState, fetchFeeds.pending(''));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Установить данные, ​​установить isLoading в false, когда запрос выполнен.', () => {
    const state = reducer(
      { ...initialState },
      fetchFeeds.fulfilled(mockFeedData, '')
    );
    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockFeeds);
  });

  it('Установить ошибку и ​​установить isLoading в false при fetch.rejected', () => {
    const errorMessage = 'Failed to load';
    const state = reducer(
      { ...initialState },
      fetchFeeds.rejected(new Error(errorMessage), '')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
