import slice from './slices';
import selectors from './selectors';
import thunks from './thunks';

const authDuck = {
  reducer: slice.reducer,
  ...selectors,
  ...slice.actions,
  ...thunks,
};

export default authDuck;
