import { baseApi } from "../api/baseApi";

const dashboardSubscribersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardSubscribersApi: builder.query({
            query: ({ page, per_page,search=""}) => ({
                url: `/get-subscriber?per_page=${per_page}&page=${page}&search=${search}`,
                method:"GET"
            }),
            providesTags: ['subscriber']
        }),
      
    })
})


export const {useGetDashboardSubscribersApiQuery } = dashboardSubscribersApi;