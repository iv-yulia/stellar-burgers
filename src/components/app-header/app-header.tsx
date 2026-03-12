import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserSlice } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const { user } = useSelector(getUserSlice);
  return <AppHeaderUI userName={user?.name} />;
};
