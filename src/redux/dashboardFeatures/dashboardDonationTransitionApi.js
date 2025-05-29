import { baseApi } from "../api/baseApi";

const dashboardDonationTransitionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardDonationTransitionApi: builder.query({
            query: ({page=page, per_page=per_page,}) => ({
                url: `/donate-transations?per_page=${per_page}&page=${page}`,
                method:"GET"
            }),
            providesTags: ['donationTransition'],
        }),

    })
})


export const {useGetDashboardDonationTransitionApiQuery} = dashboardDonationTransitionApi;