import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getIntrospectionQuery } from 'graphql';
import { RootObject } from '../../types/types';

export const schemasApi = createApi({
  reducerPath: 'schemasApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
  }),
  endpoints: (builder) => ({
    getGraphQlSchema: builder.query<RootObject, string>({
      query: (url) => {
        return {
          url,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: getIntrospectionQuery() }),
        };
      },
    }),
  }),
});

export const { useGetGraphQlSchemaQuery } = schemasApi;
