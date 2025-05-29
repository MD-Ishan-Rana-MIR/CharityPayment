import { baseApi } from "../api/baseApi";

const getVoluntersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllVolunterData: builder.query({
            query: ({ search = "", status, per_page, page }) => ({
                url: `/get-volunteer?search=${search}&status=${status}&per_page=${per_page}&page=${page}`,
                method: "GET",
            }),
            providesTags: ["allVolunters"],
        }),
        updateVolunterData: builder.mutation({
            query: ({status,volunteer_id}) => ({
                url: `/volunteer-status?status=${status}&volunteer_id=${volunteer_id}`,
                method: "PATCH",
                
            }),
            invalidatesTags: ["allVolunters"],
        })
    })
})


export const { useGetAllVolunterDataQuery,useUpdateVolunterDataMutation } = getVoluntersApi;