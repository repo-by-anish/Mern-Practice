import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"

import { apiSlice } from "../../app/api/apiSlice"

const notesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
});

const initialState = notesAdapter.getInitialState();


export const noteApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => ({
                url: '/notes',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note._id
                    return note;
                });
                return notesAdapter.setAll(initialState, loadedNotes)
            },
            providesTags: (result, error, args) => {
                if (result?.ids) {
                    return [
                        { type: "Note", id: "LIST" },
                        ...result.ids.map(id => ({ type: "Note", id }))
                    ]
                } else {
                    return [{ type: "Note", id: "LIST" }]
                }
            }
        }),
        addNewNote: builder.mutation({
            query: initialPost => ({
                url: '/notes',
                method: 'POST',
                body: {
                    ...initialPost
                }
            }),
            invalidatesTags: [
                { type: "Note", id: "LIST" }
            ]
        }),
        updateNote: builder.mutation({
            query: initialPost => ({
                url: '/notes',
                method: 'PATCH',
                body: {
                    ...initialPost
                }
            }),
            invalidatesTags: (result, error, args) => [
                { type: "Note", id: args.id }
            ]
        }),
        deleteNote: builder.mutation({
            query: ({ id }) => ({
                url: "/notes",
                method: "DELETE",
                body: { id }
            }),
            invalidatesTags: (result, error, args) => [
                { type: "Note", id: args.id }
            ]
        })
    })
})

export const {
    useGetNotesQuery,
    useAddNewNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation,
} = noteApiSlice;


export const selectNoteResult = noteApiSlice.endpoints.getNotes.select();


const selectNoteData = createSelector(
    selectNoteResult,
    noteResult => noteResult.data
)

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
} = notesAdapter.getSelectors(state => selectNoteData(state) ?? initialState);
