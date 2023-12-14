import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  // GraphQLSchema,
  // IntrospectionQuery,
  // buildClientSchema,
  getIntrospectionQuery,
} from 'graphql';
import { apiUrl } from '../../utils/consts';

export const schemasApi = createApi({
  reducerPath: 'schemasApi',
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    getGraphQlSchema: builder.mutation({
      query: () => ({
        url: '',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operationName: 'IntrospectionQuery',
          query: getIntrospectionQuery(),
        }),
        // transformResponse: (response: { data: IntrospectionQuery }) => {
        //   const schema = buildClientSchema(response.data);
        //   return schema;
        // },
      }),
    }),
  }),
});

export const { useGetGraphQlSchemaMutation } = schemasApi;
