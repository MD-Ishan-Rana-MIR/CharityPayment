import { baseApi } from "../api/baseApi";

const postDashboardFaqApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        dashboardFaq : builder.mutation({
            query: (data) =>{
                return{
                    url:'/create-faq',
                    method:"POST",
                    body:data,
                }
            },
            invalidatesTags:["create-new-faq"]
        })
    })
})

export const {useDashboardFaqMutation} = postDashboardFaqApi