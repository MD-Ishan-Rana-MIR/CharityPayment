import { baseApi } from "../api/baseApi";

const postForgetPasswordApi = baseApi.injectEndpoints({
    endpoints:(builder) =>({
        postForgetPassword : builder.mutation({
            query:(data)=>{
                return{
                    url:`/forgot-password`,
                    method:'POST',
                    body: data,
                }
            },
            invalidatesTags:["forgetPassword"]
        })
    })
})

export const {usePostForgetPasswordMutation} = postForgetPasswordApi