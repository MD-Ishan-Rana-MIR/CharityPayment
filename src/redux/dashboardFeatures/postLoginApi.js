import { baseApi } from "../api/baseApi";

const postLoginApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        postLogin : builder.mutation({
            query: (data) =>{
                return{
                    url:'/login',
                    method:"POST",
                    body:data,
                }
            },
            invalidatesTags:["admin"]
        })
    })
})

export const {usePostLoginMutation} = postLoginApi