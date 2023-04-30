import { useEffect } from "react"

import { store } from "../../app/store"
import { userApiSlice } from "../users/usersApiSlice"
import { noteApiSlice } from "../notes/notesApiSlice"
import { Outlet } from "react-router-dom"

const Prefetch = () => {
  useEffect(() => {
    
    store.dispatch(noteApiSlice.util.prefetch('getNotes','notesList', {force: true}))
    store.dispatch(userApiSlice.util.prefetch('getUsers', 'usersList', {force: true}))
  }, [])

  return <Outlet />
}

export default Prefetch