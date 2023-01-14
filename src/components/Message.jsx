import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const  secondsToHms = (d) =>{
    d = Number(d);
    var day = Math.floor(d / 86400);
    if(day > 0) return day+"d";
    var h = Math.floor(d/3600);
     if(h>0) return h+"h";
    var m = Math.floor(d/60);
    if(m>0) return m+"m";
    else return parseInt(d)+"s";
}

const Message = ({ message }) => {
    let date = secondsToHms((new Date() - message.date.toDate())/1000);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth"});
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      {message.senderId !== currentUser.uid && <div className="messageInfo">
         <img
          src={data.user.photoURL} alt="" />
        <span>{date} ago </span>
      </div> }
      <div className="messageContent">
        {message.text!=="" && <p>{message.text}</p>}
        
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;