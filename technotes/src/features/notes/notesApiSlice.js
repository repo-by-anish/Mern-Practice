import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit"

import { apiSlice } from "../../app/api/apiSlice"

const notesAdapter = createEntityAdapter({});

const initialState = notesAdapter.getInitialState();


export const noteApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => '/notes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedNotes = responseData.map(note => {
                    note.id = note_id
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
        })
    })
})

export const {
    useGetNotesQuery,
} =noteApiSlice;


export const selectNoteResult=noteApiSlice.endpoints.getNotes.select();


const selectNoteData=createSelector(
    selectNoteResult,
    noteResult=>noteResult.data
)

export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
} = notesAdapter.getSelectors(state=>selectNoteData(state)?? initialState);
