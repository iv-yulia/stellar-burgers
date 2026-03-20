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

import { mockBun, mockFilling, mockSauce } from '../utils/mocks';

const reducer = constructorSlice.reducer;

describe('constructorSlice', () => {
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
