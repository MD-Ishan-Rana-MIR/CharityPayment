import { baseApi } from "../api/baseApi";


const podcastApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        postpodcastApi: builder.mutation({
            query: (createPodcast) => ({
                url: `/create-podcast`,
                method:"POST",
                body:createPodcast,
            }),
            invalidatesTags: ['podcast'],
        }),
        // getpodcastApi: builder.query({
        //     query: () => ({
        //         url: `/get-team?search`,
        //         method:"GET"
        //     }),
        //     providesTags: ['podcast'],
        // }),
        // deletepodcastApi: builder.mutation({
        //     query: (id) => ({
        //         url: `/delete-team?team_id=${id}`,
        //         method: "DELETE",
        //     }),
        //     invalidatesTags: ['podcast'],
        // }),
        updatepodcastApi: builder.mutation({
            query: ({podcast_id,updateInfo}) => ({
                url: `/update-podcast?podcast_id=${podcast_id}`,
                method:"POST",
                body:updateInfo,
            }),
            invalidatesTags: ['podcast'],
        }),
    })
})


export const {usePostpodcastApiMutation,useUpdatepodcastApiMutation} = podcastApi;