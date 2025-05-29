import { baseApi } from "../api/baseApi";

const postOtpApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        postOtp : builder.mutation({
            query:(data)=>{
                return{
                    url:'/otp-verify',
                    method:'POST',
                    body:data,
                }
            },
            invalidatesTags:['sendOtp']
        })
    })
})
export const {usePostOtpMutation} = postOtpApi;