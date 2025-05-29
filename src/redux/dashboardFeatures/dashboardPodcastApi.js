import { baseApi } from "../api/baseApi";


const dashboardPodcastApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        postDashboardPodcastApi: builder.mutation({
            query: (createPodcast) => ({
                url: `/create-podcast`,
                method:"POST",
                body:createPodcast,
            }),
            invalidatesTags: ['podcast'],
        }),
        getDashboardPodcastApi: builder.query({
            query: ({search="",per_page,page }) => ({
                url: `/get-podcast?search=${search}&per_page=${per_page}&page=${page}`,
                method:"GET",
              
            }),
            providesTags: ['podcast'],
        }),
        singleGetDashboardPodcastApi: builder.query({
            query: ({podcast_id}) => ({
                url: `/details-podcast?podcast_id=${podcast_id}`,
                method:"GET",
            }),
            providesTags: ['podcast'],
        }),
        deleteDashboardPodcastApi: builder.mutation({
            query: ({podcast_id}) => ({
                url: `/delete-podcast?podcast_id=${podcast_id}`,
                method:"DELETE",
              
            }),
            invalidatesTags: ['podcast'],
        }),
        updateDashboardPodcastApi: builder.mutation({
            query: ({podcast_id,updateInfo}) => ({
                url: `/update-podcast?podcast_id=${podcast_id}`,
                method:"POST",
                body:updateInfo
              
            }),
            invalidatesTags: ['podcast'],
        }),
    })
})


export const {usePostDashboardPodcastApiMutation,useGetDashboardPodcastApiQuery,useSingleGetDashboardPodcastApiQuery,useDeleteDashboardPodcastApiMutation,useUpdateDashboardPodcastApiMutation} = dashboardPodcastApi;