const express = require('express');
const axios =require('axios');
const app = express();
app.use(express.json());

let users = [
  { id: 1, name: 'Mouhamed GUEYE', email: 'MG@GMAIL.com' },
  { id: 2, name: 'Oshimen', email: 'oshi@gmail.com' }
];

//GET /api/users : Récupérer tous les utilisateurs.
app.get('/api/users', (req, res) => {
    res.json(users);
  });


//GET /api/users/:id : Récupérer un utilisateur par son ID.
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('Utilisateur non trouvé');
  res.json(user);
});


//POST /api/users : Ajouter un nouvel utilisateur.
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
  });


//PUT /api/users/:id : Mettre à jour un utilisateur existant.
app.put('/api/users/:id', (req, res) => {
  const { name, email } = req.body;
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('Utilisateur non trouvé');
  user.name = name;
  user.email = email;
  res.json(user);
});


//DELETE /api/users/:id : Supprimer un utilisateur par son ID.
app.delete('/api/users/:id', (req, res) => {
    const userById = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userById === -1) return res.status(404).send('Utilisateur non trouvé');
    users.splice(userById, 1);
    res.status(204).send();
  });


app.get('/api/users/:id/details', async (req, res) => {
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${parseInt(req.params.id)}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des détails');
  }
});


  const port = 5000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  