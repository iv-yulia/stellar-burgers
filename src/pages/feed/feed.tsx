import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds, getFeedsSlice } from '../../services/slices/feedSlice';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector(getFeedsSlice);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (!orders.length) {
    return <Preloader />;
  }

  if (isLoading) {
    return <Preloader />;
  }

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
