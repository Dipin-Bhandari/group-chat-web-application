import React, { useEffect, useState } from "react";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import {Message} from "./Message";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "./appSlice";
import { selectUser } from "./userSlice";
import db from "./firebase";
import {storage} from "./firebase";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {aws } from './firebase';


export function Chat() {
 // const [data,setData] = useState([]);
const [fileUrl,setFileUrl]=React.useState(null)
const [users,setUsers]=React.useState([])

const onFileChange=async(e)=>{
const file=e.target.files[0];
const storageRef=aws.storage().ref();
const fileRef=storageRef.child(file.name)
await fileRef.put(file)
setFileUrl(await fileRef.getDownloadURL())
}

const onSubmit= (e) =>{
  e.preventDefault()
  const username= e.target.username.value;
  if(!username)
  {
return;

  }
  db.collection("users").doc(username).set({
    name:username,
    avatar:fileUrl
  })
}


useEffect(()=>{
const fetchUsers=async()=>{
const usersCollection =db.collection('users').get()
setUsers(usersCollection.docs.map(doc =>{
  return doc.data()
}))
}
fetchUsers()
},[])



 const [image , setImage] = useState('');
 const upload = ()=>{
   if(image == null)
     return;
   storage.ref(`/images/${image.name}`).put(image)
   .on("state_changed" , alert("success") , alert);


  }






  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (channelId) {
      db.collection("channels")
        .doc(channelId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("channels").doc(channelId).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user,
    });

    setInput("");
  };

  return (


    <div className="chat">
      <ChatHeader channelName={channelName} />

      <div className="chat_messages">
        {messages.map((message) => (
          <Message
            key={message.key}
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
        //    url={message.user}
          />
        ))}




{users.map()}






      </div>

      <div className="chat_input">
        <AddCircleIcon  fontSize="large" />
        <center>
      <input type="file" onChange={onFileChange}/>
     
      </center>
      
      
<div/>






        <form>
          <input
            value={input}
            disabled={!channelId}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Message #${channelName}`}
          />
          <button
            disabled={!channelId}
            className="chat_inputButton"
            type="submit"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>

        <div className="chat_inputIcons">
          <CardGiftcardIcon fontSize="large" />
          <GifIcon fontSize="large" />
          <EmojiEmotionsIcon fontSize="large" />

        </div>
      </div>
    </div>
  );
}


