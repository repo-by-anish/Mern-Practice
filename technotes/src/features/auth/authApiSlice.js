import { apiSlice } from "../../app/api/apiSlice";
import { logOut } from "./authSlice";



export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: "/auth",
                method: "POST",
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST"
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(logOut())
                    dispatch(apiSlice.util.resetApiState())
                } catch (error) {
                    console.log(error);
                }
            }
        })
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation
} = authApiSlice;