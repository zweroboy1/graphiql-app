import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../../store/store';
import { GoBackBtn } from './GoBackBtn';

describe('GoBack Button', () => {
  it('render go back button', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <GoBackBtn callback={() => {}} prev="PrevType" />
      </Provider>
    );

    expect(getByText('back to PrevType')).toBeInTheDocument();
  });
});
