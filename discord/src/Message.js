import { Avatar } from "@material-ui/core";
import React from "react";
import "./Message.css";

export function Message({ timestamp, user, message ,url}) {
    return (
        <div className="message">
            <Avatar src={user.photo} />
            <div className="message_info">
                <h4>
                    {user.displayName}
                    <span className="message_timestamp">
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                </h4>
              
                <img width='100' height='100' src='url'  />             
          <p>{message}</p>
        
            </div>
        </div>
    );
}

