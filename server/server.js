const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const app = express()
const JobModel = require('./Schemas/Addjob')
const LoginModel = require('./Schemas/Login')
const JoblikeModel = require('./Schemas/Joblike')
const ApplayModel = require('./Schemas/Jobapplay')
const ChatModel = require('./Schemas/Jobchat')
const ResumenameModel = require('./Schemas/ResumeName')
const ResumePersnolModel = require('./Schemas/ResumePersnol')
const ResumeSummaryModel = require('./Schemas/ResumeSummary')
// const { Server } = require('socket.io');
// const http = require('http');

app.use(
    cors({
        origin: 'https://job-portal-client-psi.vercel.app', // Allow your client URL
        methods: ['GET', 'POST', 'DELETE'], // Specify allowed methods
        credentials: true, // Allow credentials (cookies, headers)
    })
);
app.use(express.json())
app.use(express.static('images'));

// const server = http.createServer(app); // Create an HTTP server
// const io = new Server(server, {
//     cors: {
//         origin: 'https://job-portal-client-psi.vercel.app',
//         methods: ['GET', 'POST']
//     },
//     path: "/socket.io",
// });



// Socket.IO Connection Handling
// io.on('connection', (socket) => {
//     console.log('A user connected: ', socket.id);

     // Listen for chat messages
    // socket.on('sendMessage', (messageData) => {
        // Save the message to the database
        // const { uid, rid, message } = messageData;
        // ChatModel.create({ uid, rid, message })
        //     .then(() => {
                // Emit the message to both sender and receiver
    //             io.emit(`chat:${uid}:${rid}`, messageData);
    //             io.emit(`chat:${rid}:${uid}`, messageData);
    //         })
    //         .catch(err => console.error(err));
    // });

//     socket.on('disconnect', () => {
//         console.log('User disconnected: ', socket.id);
//     });
// });

app.listen(3001, () => {
    console.log('Server running on port 3001');
});


const con = mongoose.connect('mongodb+srv://rushikesharote14:oqai74leLp6fpD5b@cluster0.e0v7z.mongodb.net/+')
if (con) {
    console.log("connected")
} else {
    console.log("not connected")
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })

app.post('/createjob', upload.single('image'), (req, res) => {
    const { userid, title, desc, location, cname, detail } = req.body
    const image = req.file.filename;
    JobModel.create({ userid, title, desc, location, cname, image, detail })
        .then(jobport => res.json(jobport))
        .catch(err => res.json(err))

})
app.get('/',(req,res)=>{
  res.send(hello)
}
app.get('/showjob', (req, res) => {
    JobModel.find({})
        .then(jobport => res.json(jobport))
        .catch(err => res.json(err))

})
app.post('/showjobmytype', (req, res) => {
    const {uid} = req.body
    JobModel.find({userid:uid})
        .then(jobport => res.json(jobport))
        .catch(err => res.json(err))

})
app.post('/reg', upload.single('image'), (req, res) => {
    const { name, type,email, password } = req.body
    const image = req.file.filename;
    LoginModel.create({ image, name, type, email, password })
        .then(joblogin => res.json(joblogin))
        .catch(err => res.json(err))
})
app.post('/chat', (req,res)=>{
    const {uid, rid, message} = req.body
    ChatModel.create({uid,rid,message})
    .then(jobchats => res.json(jobchats))
        .catch(err => res.json(err))
})
app.post('/getchat', (req,res)=>{
    const {uid, rid} = req.body
    ChatModel.find({
        $or: [
            { uid: uid, rid: rid }, // Messages from sender to receiver
            { uid: rid, rid: uid }  // Messages from receiver to sender
        ]
    })
    .then(jobchats => res.json(jobchats))
        .catch(err => res.json(err))
})
app.post('/login', (req, res) => {
    const { email, password } = req.body
    LoginModel.findOne({ email, password })
        .then(joblogin => res.json(joblogin))
        .catch(err => res.json(err))
})
app.get('/getuser/:id', (req, res) => {
    const id = req.params.id
    LoginModel.findById(id)
        .then(joblogins => res.json(joblogins))
        .catch(err => res.json(err))
})
app.get('/getalluser', (req, res) => {
    LoginModel.find({})
        .then(joblogins => res.json(joblogins))
        .catch(err => res.json(err))
})

  
app.post("/joblike", async (req, res) => {
  const { uid, jobid } = req.body;

  if (!uid || !jobid) {
    return res.status(400).json({ error: "Missing uid or jobid" });
  }

  try {
    // Check if the job is already liked
    const existingLike = await JoblikeModel.findOne({ uid, jobid });

    if (existingLike) {
      // Unlike: Remove the entry
      await JoblikeModel.deleteOne({ uid, jobid });
      return res.status(200).json({ message: "Job unliked successfully" });
    } else {
      // Like: Add a new entry
      await JoblikeModel.create({ uid, jobid });
      return res.status(200).json({ message: "Job liked successfully" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});
app.get("/getlikedjobs/:uid", async (req, res) => {
    const { uid } = req.params;
  
    if (!uid) {
      return res.status(400).json({ error: "User ID is required" });
    }
  
    try {
      const likedJobs = await JoblikeModel.find({ uid });
      const likedJobIds = likedJobs.map((job) => job.jobid); // Extract job IDs
      return res.status(200).json(likedJobIds);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  
app.get('/savejob/:id', (req, res) => {
    const uid = req.params.id
    JoblikeModel.find({ uid: uid })
        .then(joblikes => res.json(joblikes || []))
        .catch(err => res.json(err))
})
app.get('/getupdata/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById(id)
        .then(users => 
            {
                res.json(users)
                console.log(res.json)

            })
        .catch(err => res.json(err))
})
app.get('/showjobinfo/:jid', (req, res) => {
    const id = req.params.jid;
    JobModel.findById(id)
        .then(jobport => res.json(jobport))
        .catch(err => res.json(err))
});
app.post('/jobapplay', (req, res) => {
    ApplayModel.create(req.body)
        .then(jobapplay => res.json(jobapplay))
        .catch(err => res.json(err))
})
app.get('/getmyjob/:id', (req, res) => {
    const uid = req.params.id
    ApplayModel.find({ uid: uid })
        .then(jobapplay => res.json(jobapplay || []))
        .catch(err => res.json(err))
})
app.get('/getapplied/:jid', (req, res) => {
    const uid = req.params.jid
    ApplayModel.find({ jobid: uid })
        .then(jobapplay => res.json(jobapplay || []))
        .catch(err => res.json(err))
})
app.delete('/deljob/:id', (req, res) => {
    const id = req.params.id;
    JobModel.findByIdAndDelete(id)
       .then(jobport => res.json(jobport || []))
        .catch(err => res.json(err))
});

// app.listen(3001, () => {
//     console.log("running")
// })

//Resume Backend Queries
app.post('/resumename', (req, res) =>   {
    const { resumename } = req.body;
    ResumenameModel.create({ resumename })
    .then((resumename) => res.json(resumename))
    .catch((err) =>  res.json(err));
});
app.post('/persnoldetail', (req, res) => {
    ResumePersnolModel.create(req.body)
      .then((resumepersnol) => res.json(resumepersnol))
      .catch((err) =>  res.json(err));

  });
  app.get('/getresumedata/:resumeId', (req, res) => {
    const { resumeId } = req.params; 
    ResumePersnolModel.find({ _id: resumeId })
        .then(resumepersnol => res.json(resumepersnol || []))
        .catch(err => res.json(err));
});
app.get('/getresumealldata', (req, res) => {
    ResumePersnolModel.find({})
        .then(resumepersnol => res.json(resumepersnol || []))
        .catch(err => res.json(err));
});
app.delete('/delresume/:id', (req, res) => {
    const { id } = req.params;
    ResumePersnolModel.findByIdAndDelete(id)
        .then(resumepersnol => res.json(resumepersnol || []))
        .catch(err => res.json(err));
});
// app.get('/getresumename', (req, res) => {
//     ResumenameModel.find({})
//         .then(resumename => res.json(resumename || []))
//         .catch(err => res.json(err));
// });

//   app.post('/summarydetail', (req, res) => {
//     const { summary } = req.body; // Extract the summary from request body
  
//     if (!summary) {
//       return res.status(400).json({ message: 'Summary is required' });
//     }
  
//     // Store only the summary in ResumeSummaryModel
//     ResumeSummaryModel.create({ summary })
//       .then((resumesummaries) => res.json(resumesummaries)) // Return the created document
//       .catch((err) => res.status(500).json(err)); // Return error if something goes wrong
//   });
  
  


  

