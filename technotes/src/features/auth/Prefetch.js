import { useEffect } from "react"

import {store} from "../../app/store"
import { userApiSlice } from "../users/usersApiSlice"
import { noteApiSlice } from "../notes/notesApiSlice"
import { Outlet } from "react-router-dom"

const Prefetch = () => {
  useEffect(()=>{
    console.log("Subscribing")
    const users= store.dispatch(userApiSlice.endpoints.getUsers.initiate())
    const notes= store.dispatch(noteApiSlice.endpoints.getNotes.initiate())

    return ()=>{
        console.log("Unsubscribing");

        notes.unsubscribe()
        users.unsubscribe()
    }
  },[])

  return <Outlet/>
}

export default Prefetch