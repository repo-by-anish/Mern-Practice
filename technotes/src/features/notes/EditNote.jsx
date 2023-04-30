import { useParams } from "react-router-dom"
import EditNoteForm from "./EditNoteForm"
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

const EditNote = () => {
  useTitle("edit note")
  const {id}=useParams();
  const {username,isAdmin,isManager}= useAuth()
  const {note}=useGetNotesQuery("notesList",{
    selectFromResult: ({data})=>({
      note: data?.entities[id]
    })
  })
  const {users} = useGetUsersQuery("usersList",{
    selectFromResult: ({data})=>({
      users: data?.ids.map(id=>data?.entities[id])
    })
  })

  if (!users?.length||!note) return <PulseLoader color={"FFF"}/>

  if(!isManager&&!isAdmin){
    if(note.username!==username){
      return <p className="errmsg">No Accesss</p>
    }
  }

  const content=<EditNoteForm users={users} note={note}/>
  
  return content
}

export default EditNote