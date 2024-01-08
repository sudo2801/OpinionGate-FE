import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const IsLoggedIn = (): boolean => {
  const auth = useSelector((state: RootState) => state?.auth );
  return auth.isLoggedIn;
};

const authSelector = {
  IsLoggedIn,
};

export default authSelector;
