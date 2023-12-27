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

    fetchGraphQlSchema: builder.mutation<void, string>({
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
    fetchGraphQlResponse: builder.mutation<
      unknown,
      { query: string; url: string; variables?: string }
    >({
      query: ({ query, url, variables }) => {
        return {
          url: url,
          method: 'POST',
          body: JSON.stringify({ query, variables }),
          headers: {
            'Content-Type': 'application/json',
          },
        };
      },
    }),
  }),
});

export const {
  useGetGraphQlSchemaQuery,
  useFetchGraphQlSchemaMutation,
  useFetchGraphQlResponseMutation,
} = schemasApi;
