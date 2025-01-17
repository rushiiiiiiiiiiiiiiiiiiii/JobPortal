import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './assets/LandingPage'
import Home2 from './assets/Home2'
import './index.css';
import Find from './assets/Find'
import Jdetails from './assets/Jdetail'
import RecruJdetails from './assets/RecruJdetail'
import Addjob from './assets/Addjob'
import SavedJobs from './assets/SavedJobs'
import Myjob from './assets/Myjob'
import CreateResume from './ResumeFiles/CreateResume'
import Start from './ResumeFiles/Start'
import FinalResume from './ResumeFiles/FinalResume'
import ChatSearch from './Chat/ChatSearch'
import MainResume from './ResumeFiles/PreviewComponent/MainResume'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/home2' element={<Home2/>}/>
      <Route path='/find' element={<Find/>}/>
      <Route path='/jdetail/:jid' element={<Jdetails/>}/>
      <Route path='/recrujdetail/:jid' element={<RecruJdetails/>}/>
      {/* <Route path='/chat/:uid' element={<Chat/>}/> */}
      <Route path='/addjob' element={<Addjob/>}/>
      <Route path='/savejob' element={<SavedJobs/>}/>
      <Route path='/myjob' element={<Myjob/>}/>
      <Route path='/chatsearch' element={<ChatSearch/>}/>
      <Route path='/createResume' element={<CreateResume/>}/>
      <Route path='/start' element={<Start/>}/>
      <Route path='/finalresume/:resumeId' element={<FinalResume/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
// CORS Configuration
// const corsOptions = {
//     origin: 'http://localhost:3001',
//     methods: ['GET', 'POST', 'DELETE'],
//     credentials: true,
// };
// app.use(cors(corsOptions));