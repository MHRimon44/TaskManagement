import { apiSlice } from "../api/apiSlice";
import { NEWS_API_KEY } from "@native-env";

export const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () =>
        `everything?q=apple&from=2025-11-11&to=2025-11-11&sortBy=popularity&apiKey=${NEWS_API_KEY}`,
    }),
  }),
});

export const { useGetNewsQuery } = newsApiSlice;
