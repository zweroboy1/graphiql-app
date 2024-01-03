import { render } from '@testing-library/react';
import { Scalar } from './Scalar';

const MockType = {
  name: 'MockType',
  kind: 'OBJECT',
  description: 'Mock Description',
};

describe('Scalar Component', () => {
  it('render component with description', () => {
    const { getByText } = render(<Scalar rootQuery={MockType} />);
    expect(getByText('Mock Description')).toBeInTheDocument();
  });
});
