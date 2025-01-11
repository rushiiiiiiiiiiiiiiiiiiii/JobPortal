import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";

// const socket = io('https://job-portal-server-orpin.vercel.app', {
//   withCredentials: true,
//   transports: ['websocket', 'polling'],
// });

const Chat = ({ uid }) => {
    const [message, setMessage] = useState("");
    const [getmessage, setGetessage] = useState([]);
    const [userdata, setUserdata] = useState(null);
    const rid = sessionStorage.getItem("userid");
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        axios
            .get(`https://job-portal-server-orpin.vercel.app/getuser/${uid}`)
            .then((res) => {
                setUserdata(res.data);
                fetchMessages();
            })
            .catch((err) => console.error(err));

        // Listen for real-time messages
    //     socket.on(`chat:${rid}:${uid}`, (newMessage) => {
    //         setGetessage((prev) => [...prev, newMessage]);
    //         scrollToBottom();
    //     });

    //     return () => {
    //         socket.off(`chat:${rid}:${uid}`);
    //     };
    // }, [uid, rid]);
    },[]);

    // const fetchMessages = () => {
    //     axios
    //         .post('https://job-portal-server-orpin.vercel.app/getchat', { uid, rid })
    //         .then((res) => {
    //             setGetessage(res.data);
    //             scrollToBottom();
    //         })
    //         .catch((err) => console.error(err));
    // };

    // const handleSendMessage = () => {
    //     if (!message) return;

    //     const messageData = { uid, rid, message };
    //     // Emit the message via Socket.IO
    //     socket.emit('sendMessage', messageData);

    //     // Optimistically update the UI
    //     setGetessage((prev) => [...prev, messageData]);
    //     setMessage("");
    //     scrollToBottom();
    // };

    return (
        <div className="flex flex-col w-full h-full bg-gray-100 shadow-lg rounded-lg">
            {/* Header */}
            <div className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 rounded-t-lg shadow-md">
                <img
                    className="w-12 h-12 rounded-full object-cover border-2 border-white"
                    src={`https://job-portal-server-orpin.vercel.app/${userdata?.image || ""}`}
                    alt={userdata?.name || "User"}
                />
                <div className="ml-4">
                    <h2 className="text-lg font-semibold">{userdata?.name || "No user"}</h2>
                    <p className="text-sm text-gray-200">{userdata?.type || "No user"}</p>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50">
                {getmessage.map((data, i) => (
                    <div
                        key={i}
                        className={`max-w-[60%] p-3 rounded-xl shadow-md ${
                            data?.uid === rid
                                ? "mr-auto bg-gray-200 text-gray-800"
                                : "ml-auto bg-blue-600 text-white"
                        }`}
                    >
                        {data.message}
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <div className="flex items-center p-4 bg-white border-t border-gray-300 rounded-b-lg shadow-md">
                <input
                    type="text"
                    className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-4 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                >
                    <FaPaperPlane />
                </button>
            </div>
        </div>
    );
};

export default Chat;
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { FaPaperPlane } from "react-icons/fa";

// const Chat = ({ uid }) => {
//   const [message, setMessage] = useState("");
//   const [getmessage, setGetessage] = useState([]);
//   const [userdata, setUserdata] = useState(null);
//   const rid = sessionStorage.getItem("userid");
//   const chatEndRef = useRef(null);

//   const scrollToBottom = () => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     axios
//       .get(`http://localhost:3001/getuser/${uid}`)
//       .then((res) => {
//         setUserdata(res.data);
//         getmes();
//       })
//       .catch((err) => console.error(err));
//   }, [uid]);

//   const getmes = () => {
//     axios
//       .post('http://localhost:3001/getchat', { uid, rid })
//       .then((res) => {
//         setGetessage(res.data);
//         scrollToBottom();
//       })
//       .catch((err) => console.error(err));
//   };

//   const handleSendMessage = () => {
//     if (!message) return;
//     axios
//       .post('http://localhost:3001/chat', { uid, rid, message })
//       .then(() => {
//         setMessage("");
//         getmes();
//       })
//       .catch((err) => console.error(err));
//   };

//   return (
//     <div className="flex flex-col w-full h-full bg-gray-100 shadow-lg rounded-lg">
//       {/* Header */}
//       <div className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 rounded-t-lg shadow-md">
//         <img
//           className="w-12 h-12 rounded-full object-cover border-2 border-white"
//           src={`http://localhost:3001/${userdata?.image || ""}`}
//           alt={userdata?.name || "User"}
//         />
//         <div className="ml-4">
//           <h2 className="text-lg font-semibold">{userdata?.name || "No user"}</h2>
//           <p className="text-sm text-gray-200">{userdata?.type || "No user"}</p>
//         </div>
//       </div>

//       <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50">
//         {getmessage.map((data, i) => (
//           <div
//             key={i}
//             className={`max-w-[60%] p-3 rounded-xl shadow-md ${
//               data?.uid === rid
//                 ? 
//                  "mr-auto bg-gray-200 text-gray-800"
//                  :
//                  "ml-auto bg-blue-600 text-white"
//             }`}
//           >
//             {data.message}
//           </div>
//         ))}
//         <div ref={chatEndRef} />
//       </div>

//       <div className="flex items-center p-4 bg-white border-t border-gray-300 rounded-b-lg shadow-md">
//         <input
//           type="text"
//           className="flex-grow px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button
//           onClick={handleSendMessage}
//           className="ml-4 bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
//         >
//           <FaPaperPlane />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;
