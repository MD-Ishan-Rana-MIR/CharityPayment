import { baseApi } from "../api/baseApi";

const dashboardGetActionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAction: builder.query({
            query: ({search="",status,per_page,page})=> ({
                url: `/get-auction?search=${search}&status=${status}&per_page=${per_page}&page=${page}`,
                method:"GET",
            }),
            providesTags:["autcion"],
        }),
        deleteAction: builder.mutation({
            query: ({id})=> ({
                url: `/delete-auction?id=${id}`,
                method:"DELETE",
            }),
            invalidatesTags:["autcion"],
        }),
        updateAction: builder.mutation({
            query: ({auction_id,updateInfo})=> ({
                url: `/assign-budget?auction_id=${auction_id}`,
                method:"POST",
                body:updateInfo,
            }),
            invalidatesTags:["autcion"],
        }),
        updateActionTwo: builder.mutation({
            query: ({id,updateInfoTwo})=> ({
                url: `/update-auction?id=${id}`,
                method:"POST",
                body:updateInfoTwo,
            }),
            invalidatesTags:["autcion"],
        }),
        singleGetAction: builder.query({
            query: ({id})=> ({
                url: `/auction-details?id=${id}`,
                method:"GET",
            }),
            providesTags:["autcion"],
        }),
    })
})

export const {useGetActionQuery,useDeleteActionMutation,useUpdateActionMutation,useSingleGetActionQuery,useUpdateActionTwoMutation} = dashboardGetActionApi;