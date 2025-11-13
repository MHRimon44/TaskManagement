import { apiSlice } from "../api/apiSlice";

const API_KEY = "086cfcfcefc8410e9733db63e6adf9d8";

export const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () =>
        `everything?q=apple&from=2025-11-11&to=2025-11-11&sortBy=popularity&apiKey=${API_KEY}`,
    }),
  }),
});

export const { useGetNewsQuery } = newsApiSlice;
