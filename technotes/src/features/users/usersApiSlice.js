import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"

import { apiSlice } from "../../app/api/apiSlice"

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();


export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user_id
                    return user;
                });
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, args) => {
                if (result?.ids) {
                    return [
                        { type: "User", id: "LIST" },
                        ...result.ids.map(id => ({ type: "User", id }))
                    ]
                } else {
                    return [{ type: "User", id: "LIST" }]
                }
            }
        })
    })
})

export const {
    useGetUsersQuery,
} =userApiSlice;


export const selectUserResult=userApiSlice.endpoints.getUsers.select();


const selectUserData=createSelector(
    selectUserResult,
    userResult=>userResult.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors(state=>selectUserData(state)?? initialState);
