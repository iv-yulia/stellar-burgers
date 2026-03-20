import { fetchFeeds, initialState, feedsSlice } from '../feedSlice';
import { mockFeeds } from '../utils/mocks';

const reducer = feedsSlice.reducer;

describe('Тестирование feedsSlice', () => {
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
