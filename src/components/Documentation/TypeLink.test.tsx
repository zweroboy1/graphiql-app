import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TypeLink } from './TypeLink';

const mockDispatch = vi.fn();
vi.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
}));

const type = {
  name: 'MockType',
  kind: 'OBJECT',
  description: 'jskfj',
};

describe('TypeLink Component', () => {
  it('renders TypeLink component', () => {
    const { getByText } = render(<TypeLink type={type} onClick={() => {}} />);

    expect(getByText('MockType')).toBeInTheDocument();
    screen.debug();
  });

  it('dispatches active type on click', () => {
    const { getByText } = render(<TypeLink type={type} onClick={() => {}} />);

    fireEvent.click(getByText('MockType'));
  });

  it('calls onClick prop', () => {
    const onClickMock = vi.fn();

    const { getByText } = render(
      <TypeLink type={type} onClick={onClickMock} />
    );

    fireEvent.click(getByText('MockType'));

    expect(onClickMock).toHaveBeenCalled();
  });
});
