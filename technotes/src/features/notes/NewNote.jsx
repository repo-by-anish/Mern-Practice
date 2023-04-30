import { PulseLoader } from "react-spinners"
import { useGetUsersQuery } from "../users/usersApiSlice"
import NewNoteForm from "./NewNoteForm"
import useTitle from "../../hooks/useTitle"

const NewNote = () => {
  useTitle("new note")
  const {users} = useGetUsersQuery("usersList",{
    selectFromResult: ({data})=>({
      users: data?.ids.map(id=>data?.entities[id])
    })
  })

  if (!users.length) return <PulseLoader color={"FFFF"}/>
  const content = <NewNoteForm users={users} />

  return content
}

export default NewNote