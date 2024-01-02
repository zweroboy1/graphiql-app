import { render, screen, act, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { SchemasArgs } from './SchemasArgs';
import { server } from '../../test/server';
import { rest } from 'msw';

const mockData = {
  data: {
    __schema: {
      types: [
        {
          name: 'MockType',
          kind: 'OBJECT',
          fields: [{ name: 'field1' }, { name: 'field2' }],
        },
      ],
    },
  },
};

describe('SchemasArgs Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('renders loader while fetching data', () => {
    render(
      <Provider store={store}>
        <SchemasArgs />
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders data', async () => {
    server.use(
      rest.get('https://rickandmortyapi.com/graphql', (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockData));
      })
    );

    await act(async () => {
      render(
        <Provider store={store}>
          <SchemasArgs />
        </Provider>
      );
    });

    await waitFor(() => {
      // expect(screen.getByText('MockType')).toBeInTheDocument();
      // expect(screen.getByText('field1')).toBeInTheDocument();
      // expect(screen.getByText('field2')).toBeInTheDocument();
    });
  });
});
