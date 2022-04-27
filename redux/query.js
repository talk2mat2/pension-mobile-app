import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Env from "../env";
const { Base_Url } = Env;

export const jarApi = createApi({
  reducerPath: "jarSlice",
  baseQuery: fetchBaseQuery({ baseUrl: Base_Url }),
  endpoints: (builder) => ({
    retriveUserJar: builder.query({
      query: (key) => `/${key}`,
    }),
    createJars: builder.mutation({
      query({ token, data }) {
        return {
          url: `/jars`,
          method: "POST",
          body: { data },
          headers: {
            // "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: (result, error, id) => [{ type: 'jars', id }]
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRetriveUserJarQuery, useCreateJarsMutation } = jarApi;
