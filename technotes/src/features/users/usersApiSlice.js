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
            query: () => ({
                url: '/users',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
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
        }),

        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: "/users",
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: 'LIST' }
            ]
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/users',
                method: 'PATCH',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: (result, err, args) => [
                { type: 'User', id: args.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: '/users',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, args) => [
                { type: 'User', id: args.id }
            ]
        })
    })
})

export const {
    useGetUsersQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = userApiSlice;


export const selectUserResult = userApiSlice.endpoints.getUsers.select();


const selectUserData = createSelector(
    selectUserResult,
    userResult => userResult.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUserData(state) ?? initialState);
