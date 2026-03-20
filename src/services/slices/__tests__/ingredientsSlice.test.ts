import {
  fetchIngredients,
  initialState,
  ingredientsSlice
} from '../ingredientsSlice';
import { TIngredient } from '@utils-types';
import { mockBun } from '../utils/mocks';

const reducer = ingredientsSlice.reducer;

describe('Тестирование ingredientsSlice', () => {
  const { id, ...ingredient } = mockBun;
  const mockIngredients: TIngredient[] = [ingredient];

  it('Установить Loading в true и сбросить значение ошибки в null, когда будет отправлен запрос.', () => {
    const state = reducer(initialState, fetchIngredients.pending(''));
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('Установить данные с ингредиентами, ​​установить isLoading в false, когда запрос выполнен.', () => {
    const state = reducer(
      { ...initialState },
      fetchIngredients.fulfilled(mockIngredients, '')
    );
    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('Установить ошибку и ​​установить isLoading в false при fetchIngredients.rejected', () => {
    const errorMessage = 'Failed to load';
    const state = reducer(
      { ...initialState },
      fetchIngredients.rejected(new Error(errorMessage), '')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
