import { baseApi } from "../api/baseApi"


const postCreateNewPasswordApi = baseApi.injectEndpoints({
    endpoints:(builder) =>({
        createNewPassword : builder.mutation({
            query:(data)=>{
                return{
                    url:'/create-new-password',
                    method:'POST',
                    body: data,
                }
            },
            invalidatesTags:["new-password"]
        })
    })
})

export const {useCreateNewPasswordMutation} = postCreateNewPasswordApi;