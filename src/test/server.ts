import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { mockData } from './mock_data';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

const server = setupServer(
  rest.get('https://rickandmortyapi.com/graphql', (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData));
  })
);

export { server };
