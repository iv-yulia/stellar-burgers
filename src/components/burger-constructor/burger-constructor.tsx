import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { clearConstructor } from '../../services/slices/constructorSlice';
import { useNavigate } from 'react-router-dom';
import { createOrder, closeOrder } from '../../services/slices/orderSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector((state) => state.builder);
  const isAuthChecked = useSelector((state) => state.auth);
  const orderRequest = useSelector((state) => state.orders.isLoading);
  const orderModalData = useSelector((state) => state.orders.order);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthChecked) {
      navigate('/login');
      return;
    }

    const totalIngredients = [
      constructorItems.bun,
      ...constructorItems.ingredients,
      constructorItems.bun
    ].map((item) => item._id);
    if (isAuthChecked) {
      dispatch(createOrder(totalIngredients));
    }
  };
  const closeOrderModal = () => {
    dispatch(closeOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
