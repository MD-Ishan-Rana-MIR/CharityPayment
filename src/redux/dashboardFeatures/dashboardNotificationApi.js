import { baseApi } from "../api/baseApi";


const dashboardNotificationApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        redNotificationApi: builder.mutation({
            query: ({id}) => ({
                url: `/notifications/read/${id}`,
                method: "POST"
            }),
            invalidatesTags: ['notification'],
        }),
        redAllNotificationApi: builder.mutation({
            query: () => ({
                url: `/notifications-read-all`,
                method: "POST"
            }),
            invalidatesTags: ['notification'],
        }),
        getNotificationApi: builder.query({
            query: () => ({
                url: `/notifications`,
                method: "GET"
            }),
            providesTags: ['notification'],
        }),
    })
})


export const {useRedNotificationApiMutation, useRedAllNotificationApiMutation,useGetNotificationApiQuery } = dashboardNotificationApi;