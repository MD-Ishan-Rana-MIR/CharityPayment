import { baseApi } from "../api/baseApi";


const dashboardAdminProfileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        postDashboardAdminProfileApi: builder.mutation({
            query: (formData) => ({
                url: `/create-new-password`,
                method: "POST",
                body:formData,
            }),
            invalidatesTags: ['admin-profile'],
        }),
        getDashboardAdminProfileApi: builder.query({
            query: () => ({
                url: `/profile`,
                method: "GET"
            }),
            providesTags: ['admin-profile'],
        }),
        updateDashboardAdminProfileApi: builder.mutation({
            query: ({updateInfo}) => ({
                url: `/update-profile`,
                method: "POST",
                body:updateInfo,
            }),
            invalidatesTags: ['admin-profile'],
        }),
        singleImageupdateDashboardAdminProfileApi: builder.mutation({
            query: ({updateInfo}) => ({
                url: `/update-profile`,
                method: "POST",
                body:updateInfo,
            }),
            invalidatesTags: ['admin-profile'],
        }),
    })
})


export const { useGetDashboardAdminProfileApiQuery, usePostDashboardAdminProfileApiMutation,useUpdateDashboardAdminProfileApiMutation,useSingleImageupdateDashboardAdminProfileApiMutation } = dashboardAdminProfileApi;