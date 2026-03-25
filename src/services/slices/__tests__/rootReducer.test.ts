import { rootReducer } from '../../store';
import { initialState as ingredientsState } from '../../slices/ingredientsSlice';
import { initialState as constructorState } from '../../slices/constructorSlice';
import { initialState as orderState } from '../../slices/orderSlice';
import { initialState as userState } from '../../slices/userSlice';
import { initialState as feedState } from '../../slices/feedSlice';

describe('Тестирование rootReducer', () => {
  it('должен возвращать начальное состояние при инициализации', () => {
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual({
      ingredients: ingredientsState,
      builder: constructorState,
      feeds: feedState,
      orders: orderState,
      auth: userState
    });
  });
});
