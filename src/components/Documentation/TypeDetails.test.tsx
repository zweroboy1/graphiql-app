import { render } from '@testing-library/react';
import { TypeDetails } from './TypeDetails';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));

const el = {
  name: 'MockType',
  args: [
    {
      name: 'arg1',
      type: { name: 'String', kind: 'NOT_NULL', description: '' },
      description: '',
      defaultValue: '',
    },
  ],
  type: { name: 'String2', kind: 'NOT_NULL', description: '' },
  description: 'Test description',
};

describe('TypeDetails Component', () => {
  it('renders TypeDetails component', () => {
    const { getByText } = render(<TypeDetails el={el} />);

    expect(getByText('MockType')).toBeInTheDocument();
    expect(getByText('arg1:')).toBeInTheDocument();
    expect(getByText('String')).toBeInTheDocument();
    expect(getByText('Test description')).toBeInTheDocument();
  });
});
