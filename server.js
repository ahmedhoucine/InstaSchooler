const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 5000;
const fs = require('fs');


const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log('Répertoire "uploads" créé.');
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Chemin pour servir les fichiers statiques

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
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  image: { type: String, required: false },
  pdf: { type: String, required: false }, // URL du fichier PDF
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

// Configuration de Multer pour gérer l'upload des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Dossier où les fichiers seront stockés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom unique pour chaque fichier
  },
});

const upload = multer({ storage });

// Routes pour les cours
// Route POST pour ajouter un cours avec un fichier PDF
app.post('/add-course', upload.single('pdf'), async (req, res) => {
  console.log('Fichier reçu :', req.file);

  try {
      const newCourse = new Course({
          ...req.body,
          pdf: req.file ? `http://localhost:5000/uploads/${req.file.filename}` : null
      });
      const savedCourse = await newCourse.save();
      console.log('Cours sauvegardé :', savedCourse);
      res.status(201).json({ message: 'Cours ajouté avec succès', course: savedCourse });
  } catch (error) {
      console.error('Erreur lors de l\'ajout du cours :', error);
      res.status(500).json({ message: 'Erreur lors de l\'ajout du cours.', error });
  }
});


// Route GET pour récupérer les cours
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error('Erreur lors de la récupération des cours :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des cours.' });
  }
});

// Routes pour les tâches
// Route POST pour ajouter une tâche
app.post('/add-task', async (req, res) => {
  console.log('Requête reçue pour /add-task avec les données :', req.body);

  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    console.log('Tâche sauvegardée dans MongoDB :', savedTask);
    res.status(201).json({ message: 'Tâche ajoutée avec succès', task: savedTask });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de la tâche :', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la tâche.', error });
  }
});

// Route GET pour récupérer les tâches
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Erreur lors de la récupération des tâches :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des tâches.' });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
