import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export const IsLoggedIn = (): boolean => {
  const auth = useSelector((state: RootState) => state?.auth);
  return auth.isLoggedIn;
};
export const userDate = ():any => {
  const auth = useSelector((state: RootState) => state?.auth);
  return auth.user;
};

const authSelector = {
  IsLoggedIn,
  userDate,
};

export default authSelector;
