import { baseApi } from "../api/baseApi";

const getDashboardChartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getChart: builder.query({
            query: (state)=> ({
                url: `/dashboard?state=${state}`,
                method:"GET",
            }),
            providesTags:["chart"],
        }),

    })
})

export const {useGetChartQuery} = getDashboardChartApi;