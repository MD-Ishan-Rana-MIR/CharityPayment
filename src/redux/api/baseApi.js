import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        // baseUrl:"http://137.59.180.219:8000/api",
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const adminToken = localStorage.getItem("admin_token");
            if (adminToken) {
                headers.set("Authorization", `Bearer ${adminToken}`);
                headers.set("accept", "application/json")
            }
            return headers;
        }
    }),
    // refresh for this tag
    tagTypes: ['faq', 'team', 'subscriber', 'donationTransition', 'autcion', 'contibutor', 'notification',"service-book","allVolunters",],
    endpoints: () => ({}),
});