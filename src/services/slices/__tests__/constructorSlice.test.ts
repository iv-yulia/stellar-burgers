import {
  constructorSlice,
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor,
  initialState
} from '../constructorSlice';
import { TConstructorIngredient } from '@utils-types';

const reducer = constructorSlice.reducer;

describe('constructorSlice', () => {
  const mockBun: TConstructorIngredient = {
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
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    id: '1'
  };

  const mockFilling: TConstructorIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    id: '2'
  };

  const mockSauce: TConstructorIngredient = {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    id: '3'
  };

  describe('Тестирование constructorSlice', () => {
    it('Добавить булку в конструктор', () => {
      const state = reducer(initialState, addBun(mockBun));
      expect(state.bun).toEqual(mockBun);
      expect(state.ingredients).toEqual([]);
    });

    it('Добавить начинку в конструктор', () => {
      const state = reducer(initialState, addIngredient(mockFilling));
      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toMatchObject({
        ...mockFilling,
        id: expect.any(String)
      });
    });

    it('Добавить соус в конструктор', () => {
      const state = reducer(initialState, addIngredient(mockSauce));
      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(1);
      expect(state.ingredients[0]).toMatchObject({
        ...mockSauce,
        id: expect.any(String)
      });
    });

    it('Удаление ингредиента из конструктора', () => {
      const ingredientsState = {
        ...initialState,
        ingredients: [mockFilling, mockSauce]
      };
      const state = reducer(ingredientsState, removeIngredient(mockFilling.id));
      expect(state.ingredients).toHaveLength(1);
    });

    it('Перемещение ингредиента вверх', () => {
      const ingredientsState = {
        ...initialState,
        ingredients: [mockFilling, mockSauce]
      };
      const firstId = ingredientsState.ingredients[0].id;
      const secondId = ingredientsState.ingredients[1].id;
      const state = reducer(ingredientsState, moveIngredientUp(1));

      expect(state.ingredients[0].id).toBe(secondId);
      expect(state.ingredients[1].id).toBe(firstId);
    });

    it('Перемещение ингредиента вниз', () => {
      const ingredientsState = {
        ...initialState,
        ingredients: [mockFilling, mockSauce]
      };
      const firstId = ingredientsState.ingredients[0].id;
      const secondId = ingredientsState.ingredients[1].id;
      const state = reducer(ingredientsState, moveIngredientDown(0));

      expect(state.ingredients[0].id).toBe(secondId);
      expect(state.ingredients[1].id).toBe(firstId);
    });

    it('Отчищаем конструктор', () => {
      const ingredientsState = {
        bun: mockBun,
        ingredients: [mockFilling]
      };
      const state = reducer(ingredientsState, clearConstructor());
      expect(state.bun).toBeNull();
      expect(state.ingredients).toHaveLength(0);
    });
  });
});
