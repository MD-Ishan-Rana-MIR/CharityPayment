import { baseApi } from "../api/baseApi";

const DashboardFaqApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        postDashboardFaqApi: builder.mutation({
            query: (faqInfo) => ({
                url: `/create-faq`,
                method:"POST",
                body:faqInfo,
            }),
            invalidatesTags: ['faq'],
        }),
        getDashboardFaqApi: builder.query({
            query: () => ({
                url: `/get-faqs`,
                method:"GET"
            }),
            providesTags: ['faq']
        }),
        deleteDashboardFaqApi: builder.mutation({
            query: (id) => ({
                url: `/delete-faq?faq_id=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['faq'],
        }),
        updateDashboardFaqApi: builder.mutation({
            query: ({id,faqInfo}) => ({
                url: `/update-faq?faq_id=${id}`,
                method:"PUT",
                body:faqInfo,
            }),
            invalidatesTags: ['faq'],
        }),
    })
})


export const {usePostDashboardFaqApiMutation,useGetDashboardFaqApiQuery,useDeleteDashboardFaqApiMutation,useUpdateDashboardFaqApiMutation } = DashboardFaqApi;