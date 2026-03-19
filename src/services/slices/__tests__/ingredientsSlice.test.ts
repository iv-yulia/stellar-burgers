import {
  fetchIngredients,
  initialState,
  ingredientsSlice
} from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

const reducer = ingredientsSlice.reducer;

describe('Тестирование ingredientsSlice', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    }
  ];

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
