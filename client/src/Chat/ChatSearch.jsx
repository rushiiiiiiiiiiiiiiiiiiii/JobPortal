import React, { useEffect, useState } from "react";
import { RiMessage2Line } from "react-icons/ri";
import Chat from "./Chat";
import axios from "axios";
import { MdOutlineMessage } from "react-icons/md";
const Searchchat = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [useralldata, setUseralldata] = useState([]);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  const userid = sessionStorage.getItem("userid");

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3001/getapplied/${jid}`)
  //     .then((res) =>{ 
  //       console.log(res.data)
  //       setCandidate(res.data.length)
  //       setApplaydata(res.data || [])
  //     })
  //     .catch((err) => setError("Failed to load applied data"));
  // }, [jid]);

  useEffect(() => {
    axios
      .get(`https://job-portal-server-orpin.vercel.app/getuser/${userid}`)
      .then((res) => setUserType(res.data.type))
      .catch((err) => console.error(err));

    axios
      .get(`https://job-portal-server-orpin.vercel.app/getalluser`)
      .then((res) => {
        const filteredUsers = res.data.filter((user) => user._id !== userid);
        setUseralldata(filteredUsers);
      })
      .catch((err) => console.error(err));
  }, [userid]);

  const show = (uid) => setUser(uid);

  const filteredUsers = useralldata.filter((user) => {
    if (userType === "Recruiter") return user.type === "candidate";
    if (userType === "candidate") return user.type === "Recruiter";
    return true;
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-80 bg-white shadow-lg border-r border-gray-300 p-4 fixed z-50 left-0 top-0 h-full">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
          <RiMessage2Line className="text-2xl text-gray-600" />
        </div>
        <input
          type="text"
          className="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="mt-4 space-y-3 overflow-y-auto h-[calc(100%-150px)] scrollbar-hide">
          {filteredUsers
            .filter((user) =>
              user.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user) => (
              <div
                key={user?._id}
                onClick={() => show(user?._id)}
                className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-all"
              >
                <img
                  src={`https://job-portal-server-orpin.vercel.app/${user?.image}`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  alt={user?.name}
                />
                <div className="ml-4">
                  <h1 className="font-semibold text-gray-800">{user?.name}</h1>
                  <p
                    className={`text-xs ${
                      user?.type === "candidate"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {user?.type}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="flex-grow ml-80 p-6 bg-gray-50 flex flex-col items-center justify-center">
  {user ? (
    <Chat uid={user} />
  ) : (
    <div className="text-center space-y-4">
        <MdOutlineMessage className="w-28 h-28 mx-auto"/>
      <h2 className="text-xl font-semibold text-gray-700">
        No Conversation Selected
      </h2>
      <p className="text-gray-500">
        Select a user from the sidebar to start chatting.
      </p>
    </div>
  )}
</div>

    </div>
  );
};

export default Searchchat;
