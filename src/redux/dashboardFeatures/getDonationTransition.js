import { baseApi } from "../api/baseApi";

const getDonationTransition = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getDonationTransition:builder.query({
            query:()=>`/donate-transations?per_page=10&page`,
            providesTags:["donationTransitions"],
        })
    }),
})

export const {useGetDonationTransitionQuery} = getDonationTransition;