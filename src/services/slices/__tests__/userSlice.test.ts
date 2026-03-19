import { TUser } from '@utils-types';
import {
  loginUser,
  registerUser,
  updateUser,
  logoutUser,
  userSlice,
  initialState
} from '../userSlice';

const reducer = userSlice.reducer;

describe('Тестирование userSlice', () => {
  const mockUser: TUser = {
    email: 'test@mail.ru',
    name: 'Test'
  };

  describe('Логирование User', () => {
    it('Установить Loading в true и сбросить значение ошибки в null, когда будет отправлен запрос', () => {
      const state = reducer(
        initialState,
        loginUser.pending('', { email: '', password: '' })
      );
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Установить данные user, ​​установить isLoading в false, когда запрос выполнен', () => {
      const state = reducer(
        { ...initialState, isAuthChecked: true },
        loginUser.fulfilled(mockUser, '', { email: '', password: '' })
      );
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('Установить ошибку и ​​установить isLoading в false при fetch.rejected', () => {
      const errorMessage = 'Failed to load';
      const state = reducer(
        { ...initialState },
        loginUser.rejected(new Error(errorMessage), '', {
          email: '',
          password: ''
        })
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('Регистрация User', () => {
    it('Установить Loading в true и сбросить значение ошибки в null, когда будет отправлен запрос', () => {
      const state = reducer(
        initialState,
        registerUser.pending('', { email: '', password: '', name: '' })
      );
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Установить данные user, ​​установить isLoading в false, когда запрос выполнен', () => {
      const state = reducer(
        { ...initialState, isAuthChecked: false },
        registerUser.fulfilled(mockUser, '', {
          email: '',
          password: '',
          name: ''
        })
      );
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthChecked).toBe(true);
    });

    it('Установить ошибку и ​​установить isLoading в false при fetch.rejected', () => {
      const errorMessage = 'Failed to load';
      const state = reducer(
        { ...initialState },
        registerUser.rejected(new Error(errorMessage), '', {
          email: '',
          password: '',
          name: ''
        })
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('Изменить User', () => {
    it('Установить Loading в true и сбросить значение ошибки в null, когда будет отправлен запрос', () => {
      const state = reducer(
        initialState,
        updateUser.pending('', { email: '', password: '', name: '' })
      );
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('Установить данные user, ​​установить isLoading в false, когда запрос выполнен', () => {
      const state = reducer(
        { ...initialState, isAuthChecked: false },
        updateUser.fulfilled(mockUser, '', {
          email: '',
          password: '',
          name: ''
        })
      );
      expect(state.isLoading).toBe(false);
      expect(state.user).toEqual(mockUser);
    });

    it('Установить ошибку и ​​установить isLoading в false при fetch.rejected', () => {
      const errorMessage = 'Failed to load';
      const state = reducer(
        { ...initialState },
        updateUser.rejected(new Error(errorMessage), '', {
          email: '',
          password: '',
          name: ''
        })
      );

      expect(state.isLoading).toBe(false);
      expect(state.error).toBe(errorMessage);
    });
  });

  describe('Выход User', () => {
    it('Очистка данных пользователя при выходе', () => {
      const state = reducer(
        { ...initialState },
        logoutUser.fulfilled(undefined, '')
      );
      expect(state.user).toBeNull();
      expect(state.isAuthChecked).toBe(false);
    });
  });
});
