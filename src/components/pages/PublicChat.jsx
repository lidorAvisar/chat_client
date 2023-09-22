import React, { useContext, useEffect, useState, useRef } from "react";
import './PublicChat.css'
import io from "socket.io-client";
import { AppContext } from "../../context/context";
import UserList from "./UserList";

const socket = io.connect("https://chat-socket-xbgh.onrender.com");

const PublicChat = () => {
  const { userData } = useContext(AppContext);
  const [room, setRoom] = useState("publicChat"); // string of the room number
  const [message, setMessage] = useState(""); // the input of the user from textArea
  const [messageList, setMessageList] = useState([]); // the all input of the user from textArea to array
  const [userMessage, setUserMessage] = useState(); // save the name of the sending message

  const chatContainerRef = useRef(null);

  useEffect(() => {
    joinRoom();
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      scrollToBottomWithDelay();
    });
  }, [socket]);

  const joinRoom = () => {
    socket.emit("join_room", room);
  };

  const sendMessage = async () => {
    if (message !== "") {
      const messageData = {
        room,
        userName: userData?.name,
        message,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setUserMessage(messageData.userName);
      setMessageList((list) => [...list, messageData]);
      setMessage("");
      scrollToBottomWithDelay();
    }
  };

  const scrollToBottomWithDelay = () => {
    setTimeout(() => {
      scrollToBottom();
    }, 100); // Adjust the delay as needed
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <div className="d-flex justify-content-around align-items-center">
      <section style={{ backgroundColor: "#eee", width: '100%' }}>
        <div className="container py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-10 col-xl-8">
              <div className="card" id="chat1" style={{ borderRadius: '15px', height: '75vh', marginBottom: '30px' }}>
                <div
                  className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                  style={{ borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}>
                  <i className="fas fa-angle-left"></i>
                  <p className="mb-0 fw-bold">Live chat</p>
                  <i className="fas fa-times"></i>
                </div>
                <div className="card-body position-relative">
                  <div ref={chatContainerRef} style={{ maxHeight: '48vh', overflow: 'auto' }}>
                    {/* CHAT */}
                    {messageList.map((messageContent, i) => {
                      return (
                        <div key={i} style={{ width: '95%', maxWidth: "95%", marginTop: '5px', display: 'flex', flexDirection: 'column', alignItems: `${userData?.name == messageContent.userName ? 'flex-start' : 'flex-end'}` }}>
                          <p className="fw-bold m-0 p-2 rounded-2" style={{ backgroundColor: `${userData?.name == messageContent.userName ? 'rgb(0,170,0)' : 'rgb(160,160,160)'}`, color: 'white' }}>{messageContent.message}</p>
                          {userData?.name !== messageContent.userName && <p className="p-0 m-0 float-end  fw-semibold">{messageContent.userName}</p>}
                          <p className="m-0 p-0 fw-bold small">{messageContent.time}</p> <br />
                        </div>
                      )
                    })}
                  </div>
                  <div className="form-outline m-2" style={{ position: 'absolute', bottom: '0px', left: '15px', right: '15px' }}>
                    <textarea
                      value={message}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          sendMessage();
                        }
                      }}
                      onChange={(event) => {
                        setMessage(event.target.value);
                      }}
                      style={{ resize: 'none', height: '8vh', borderRadius: '30px' }} className="form-control"
                      placeholder="Type your message . . ." id="textAreaExample">
                    </textarea>
                    <button onClick={sendMessage}
                      className="btn btn-info btn-rounded float-end mt-2 px-4 text-white fw-bold rounded-5">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <span className="d-none d-lg-flex me-5 w-25"><UserList socket={socket} /></span>
    </div>
  );
}

export default PublicChat;