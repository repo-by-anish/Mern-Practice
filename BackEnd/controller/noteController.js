const User = require("../models/User");
const Note = require("../models/Note");
const asyncHandeler = require("express-async-handler");



//desc get all users
//@route GET /post
//acess private

const getAllNotes = asyncHandeler(async (req, res) => {

    const notes = await Note.find().lean();

    if(!notes.length){
       return res.status(400).json({message:"No Notes is found"});

    }

    //notes with user

    const noteWithUser=await Promise.all(notes.map(note=>{
        const user=User.findById(note.user).lean().exec();
        return {...note,username:user.username}
    }))

    res.json(noteWithUser);

})

//@desc create Note
//@route POST /note
//@acess private

// const createNewNote = asyncHandeler(async (req, res) => {

//     const { user, title, text } = req.body;
//     console.log(req.body);

//     if(!user||!title||!text){
//         return res.status(400).json({message:"All feild are required"});
//     }

//     const duplicate= await Note.findOne({title}).lean().exec();
//     if(duplicate){
//         return res.status(409).json({message:"Duplicate note found"});
//     }

//     const note=await Note.create({user,title,text})

//     if(note){
//         return res.status(200).json({message:"Note Created"});
//     }else{
//         return res.status(400).json({message:"Invilid note data recived"});
//     }


// })

const createNewNote = asyncHandeler(async (req, res) => {
    const { user, title, text } = req.body

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({ title }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    // Create and store the new user 
    const note = await Note.create({ user, title, text })
    

    if (note) { // Created 
        return res.status(201).json({ message: 'New note created' })
    } else {
        return res.status(400).json({ message: 'Invalid note data received' })
    }

})

//@desc Update user
//@route PATCH /note
//@acess private

const updateNote = asyncHandeler(async (req, res) => {

    const { id,user, title, text,completed } = req.body;

    if(!id||!user||!title||!text||!completed){
       return res.status(400).json({message:"Require All Feild"});
    }

    const note=await Note.findById(id).lean().exec();

    if(!note){
        return res.status(400).json({message:"Cannot find the note."})
    }

    const duplicate=await Note.findOne({title}).lean.exec();
    if(duplicate&&duplicate?._id.toString()!==id){
       return res.status(409).json({message:"Duplicate note found"});
    }

    note.user=user;
    note.title=title;
    note.text=text;
    note.completed=completed

    const updatedNote=await note.save().lean();

    res.json(`${updatedNote.title} updated`)

})

//@desc Delete user
//@route DELETE /note
//@acess private

const deleteNote = asyncHandeler(async (req, res) => {

const {id}=req.body;

if(!id){
    return res.status(400).json({message:"Id is not provided"});
}

const note=await Note.findById(id).lean().exec();

if(!note){
    return res.status(400).json({message:"Cannot Find Note"});
}

const result=await note.deleteOne();

const reply=`${result.title} Deleted with id: ${result._id}`


res.json({message:reply});
})


module.exports = {
    getAllNotes,
    createNewNote,
    updateNote,
    deleteNote
}