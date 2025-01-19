import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { Server } from 'socket.io';
import http from 'http';
import bodyParser from 'body-parser';

// Import Models
import JobModel from './Schemas/Addjob.js';
import LoginModel from './Schemas/Login.js';
import JoblikeModel from './Schemas/Joblike.js';
import ApplayModel from './Schemas/Jobapplay.js';
import ChatModel from './Schemas/Jobchat.js';
import ResumenameModel from './Schemas/ResumeName.js';
import ResumePersnolModel from './Schemas/ResumePersnol.js';

const app = express();

// MongoDB connection
mongoose.connect('mongodb+srv://rushikesharote14:oqai74leLp6fpD5b@cluster0.e0v7z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

const dirname = path.resolve();


app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
    origin: "https://jobportal-server-fwl8.onrender.com",
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('images'));

// HTTP server and Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://jobportal-server-fwl8.onrender.com',
        methods: ['GET', 'POST']
    },
});

// Socket.IO event handling
io.on('connection', (socket) => {
    console.log('A user connected: ', socket.id);
    socket.on('sendMessage', (messageData) => {
        const { uid, rid, message } = messageData;
        ChatModel.create({ uid, rid, message })
            .then(() => {
                io.emit(`chat:${uid}:${rid}`, messageData);
                io.emit(`chat:${rid}:${uid}`, messageData);
            })
            .catch(err => console.error(err));
    });
    socket.on('disconnect', () => console.log('User disconnected: ', socket.id));
});

// File Upload Handling
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Routes

// Create Job
app.post('/createjob', upload.single('image'), (req, res) => {
    const { userid, title, desc, location, cname, detail } = req.body;
    const image = req.file.filename;
    JobModel.create({ userid, title, desc, location, cname, image, detail })
        .then(jobport => res.json(jobport))
        .catch(err => res.json(err));
});

// Show Jobs
app.get('/showjob', (req, res) => {
    JobModel.find({})
        .then(jobport => res.json(jobport))
        .catch(err => res.json(err));
});

// Show User's Jobs
app.post('/showjobmytype', (req, res) => {
    const { uid } = req.body;
    JobModel.find({ userid: uid })
        .then(jobport => res.json(jobport))
        .catch(err => res.json(err));
});

// Register User
app.post('/reg', upload.single('image'), (req, res) => {
    const { name, type, email, password } = req.body;
    const image = req.file.filename;
    LoginModel.create({ image, name, type, email, password })
        .then(joblogin => res.json(joblogin))
        .catch(err => res.json(err));
});

// Login User
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    LoginModel.findOne({ email, password })
        .then(joblogin => res.json(joblogin))
        .catch(err => res.json(err));
});

// Get User by ID
app.get('/getuser/:id', (req, res) => {
    const id = req.params.id;
    LoginModel.findById(id)
        .then(joblogins => res.json(joblogins))
        .catch(err => res.json(err));
});

// Get All Users
app.get('/getalluser', (req, res) => {
    LoginModel.find({})
        .then(joblogins => res.json(joblogins))
        .catch(err => res.json(err));
});

// Like/Unlike Job
app.post("/joblike", async (req, res) => {
    const { uid, jobid } = req.body;

    if (!uid || !jobid) {
        return res.status(400).json({ error: "Missing uid or jobid" });
    }

    try {
        const existingLike = await JoblikeModel.findOne({ uid, jobid });

        if (existingLike) {
            await JoblikeModel.deleteOne({ uid, jobid });
            return res.status(200).json({ message: "Job unliked successfully" });
        } else {
            await JoblikeModel.create({ uid, jobid });
            return res.status(200).json({ message: "Job liked successfully" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Get Liked Jobs by User ID
app.get("/getlikedjobs/:uid", async (req, res) => {
    const { uid } = req.params;

    if (!uid) {
        return res.status(400).json({ error: "User ID is required" });
    }

    try {
        const likedJobs = await JoblikeModel.find({ uid });
        const likedJobIds = likedJobs.map((job) => job.jobid);
        return res.status(200).json(likedJobIds);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});

// Apply for Job
app.post('/jobapplay', (req, res) => {
    ApplayModel.create(req.body)
        .then(jobapplay => res.json(jobapplay))
        .catch(err => res.json(err));
});

// Get Applied Jobs by User ID
app.get('/getmyjob/:id', (req, res) => {
    const uid = req.params.id;
    ApplayModel.find({ uid: uid })
        .then(jobapplay => res.json(jobapplay || []))
        .catch(err => res.json(err));
});

// Get Applicants for a Job by Job ID
app.get('/getapplied/:jid', (req, res) => {
    const uid = req.params.jid;
    ApplayModel.find({ jobid: uid })
        .then(jobapplay => res.json(jobapplay || []))
        .catch(err => res.json(err));
});

// Delete Job by ID
app.delete('/deljob/:id', (req, res) => {
    const id = req.params.id;
    JobModel.findByIdAndDelete(id)
        .then(jobport => {
            if (!jobport) {
                return res.status(404).json({ message: "Job not found" });
            }
            res.json(jobport);
        })
        .catch(err => res.status(500).json(err));
});

// Resume Handling
app.post('/resumename', (req, res) => {
    const { resumename } = req.body;
    ResumenameModel.create({ resumename })
        .then((resumename) => res.json(resumename))
        .catch((err) => res.json(err));
});

app.post('/persnoldetail', (req, res) => {
    ResumePersnolModel.create(req.body)
        .then((resumepersnol) => res.json(resumepersnol))
        .catch((err) => res.json(err));
});

// Get Resume by ID
app.get('/getresumedata/:resumeId', (req, res) => {
    const { resumeId } = req.params;
    ResumePersnolModel.find({ _id: resumeId })
        .then(resumepersnol => res.json(resumepersnol || []))
        .catch(err => res.json(err));
});

// Get All Resumes
app.get('/getresumealldata/:id', (req, res) => {
    const id  =  req.params.id
    ResumePersnolModel.findById(id)
        .then(resumepersnol => res.json(resumepersnol || []))
        .catch(err => res.json(err));
});

// Delete Resume by ID
app.delete('/delresume/:id', (req, res) => {
    const { id } = req.params;
    ResumePersnolModel.findByIdAndDelete(id)
        .then(resumepersnol => res.json(resumepersnol || []))
        .catch(err => res.json(err));
});

app.use(express.static(path.join(dirname, "/client/dist")));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(dirname, "client", "dist", "index.html"));
});

// Start server
server.listen(3001, () => console.log('Server running on port 3001'));
