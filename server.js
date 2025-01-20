const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');
const nodemailer = require('nodemailer'); // Ajout de Nodemailer

const app = express();
const PORT = 5000;

// Création du répertoire "uploads"
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log('Répertoire "uploads" créé.');
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connexion à MongoDB
mongoose
  .connect('mongodb+srv://fatma:fatma@cluster0.0xmaw.mongodb.net/school', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connecté'))
  .catch((err) => console.log('Erreur MongoDB :', err));

// Schéma et modèle pour les cours
const courseSchema = new mongoose.Schema({
  niveau: { type: Number, required: true }, // Champ pour le niveau
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  image: { type: String, required: false },
  pdf: { type: String, required: false },
  createdAt: { type: Date, default: Date.now },
});

const Course = mongoose.model('course', courseSchema, 'course');

// Schéma et modèle pour les tâches
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model('task', taskSchema, 'task');

// Schéma et modèle pour les enseignants
const enseignantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  theme: { type: String, default: 'light' },
});

const Enseignant = mongoose.model('enseignant', enseignantSchema, 'enseignant');

// Configuration de Multer pour gérer l'upload des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes pour les cours
app.post('/add-course', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.body.niveau || isNaN(req.body.niveau)) {
      return res.status(400).json({ message: 'Le champ niveau est obligatoire et doit être un nombre valide.' });
    }
    const newCourse = new Course({
      niveau: req.body.niveau,
      description: req.body.description,
      duration: req.body.duration,
      image: req.body.image,
      pdf: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null,
    });
    const savedCourse = await newCourse.save();
    res.status(201).json({ message: 'Cours ajouté avec succès', course: savedCourse });
  } catch (error) {
    console.error('Erreur lors de l\'ajout du cours :', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout du cours.', error });
  }
});

app.get('/courses', async (req, res) => {
  try {
    const niveau = req.query.niveau; // Optionnel : niveau passé en paramètre
    const filter = niveau ? { niveau: parseInt(niveau) } : {};
    const courses = await Course.find(filter);
    res.status(200).json(courses);
  } catch (error) {
    console.error('Erreur lors de la récupération des cours :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des cours.' });
  }
});

// Routes pour les tâches
app.post('/add-task', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json({ message: 'Tâche ajoutée avec succès', task: savedTask });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la tâche :', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la tâche.', error });
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches.' });
  }
});

// Routes pour les enseignants
app.get('/enseignant', async (req, res) => {
  try {
    const enseignants = await Enseignant.find();
    res.status(200).json(enseignants);
  } catch (error) {
    console.error('Erreur lors de la récupération des enseignants :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des enseignants.' });
  }
});

app.put('/enseignant/:id', async (req, res) => {
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedEnseignant = await Enseignant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedEnseignant);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'enseignant :', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'enseignant.' });
  }
});

app.post('/enseignant', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newEnseignant = new Enseignant({
      ...req.body,
      password: hashedPassword,
    });
    const savedEnseignant = await newEnseignant.save();
    res.status(201).json(savedEnseignant);
  } catch (error) {
    console.error('Erreur lors de la création de l\'enseignant :', error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'enseignant.' });
  }
});

// Route pour envoyer un ticket
app.post('/send-ticket', async (req, res) => {
  const { subject, urgency, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'fatmabouhari20@gmail.com',
        pass: 'mlhsypzvqfzuscmw',
      },
      secure: false,
    });

    const mailOptions = {
      from: 'fatmabouhari20@gmail.com',
      to: 'bouharifatma7@gmail.com',
      subject: `Ticket: ${subject} - Urgence: ${urgency}`,
      text: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Ticket envoyé avec succès.' });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du ticket :', error);
    res.status(500).json({ message: 'Erreur lors de l\'envoi du ticket.', error });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
