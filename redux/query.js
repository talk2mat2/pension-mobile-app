import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Pokemon } from "./types";

export const jarApi = createApi({
  reducerPath: "jarApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https:/" }),
  endpoints: (builder) => ({
    retriveUsersRtProfile: builder.query({
      query: (key) => `/${key}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useRetriveUsersRtProfile } = jarApi;
