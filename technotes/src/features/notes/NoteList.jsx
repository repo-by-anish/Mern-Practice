import { useGetNotesQuery } from "./notesApiSlice"

const NoteList = () => {
  const {
    data :notes,
    isLoading,
    isSuccess,
    isError,
    error
  } =useGetNotesQuery();

  let content;
  if(isLoading){
    content=<p>Loading ...</p>
  }
  if(isError){
    content=<p className="errmsg">{ error?.data?.message }</p>
  }

  return (
    <div>NoteList</div>
  )
}

export default NoteList