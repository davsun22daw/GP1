const express = require('express')
const app = express()
const port = 3000

// necesario para procesar los datos del formulario
app.use(express.urlencoded({ extended: true }))

// conecta a la base de datos de MongoDB
const MongoClient = require('mongodb').MongoClient
const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useNewUrlParser: true })
client.connect(err => {
  const collection = client.db("test").collection("users")
  // realiza operaciones en la colección
  client.close()
})

// muestra el formulario de login
app.get('/login', (req, res) => {
  res.send(`
    <form method="post" action="/login">
      <input type="text" name="username" placeholder="Username" />
      <input type="password" name="password" placeholder="Password" />
      <button type="submit">Submit</button>
    </form>
  `)
})

// procesa el formulario de login y verifica la información de inicio de sesión
app.post('/login', (req, res) => {
  // busca el usuario en la base de datos
  collection.findOne({ username: req.body.username }, function(err, user) {
    if (err) {
      res.send('An error occurred')
    } else if (user) {
      // verifica la contraseña utilizando bcrypt
      const bcrypt = require('bcryptjs')
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // la contraseña es correcta, redirige al usuario a una página protegida
        res.redirect('/protected')
      } else {
        // la contraseña es incorrecta, muestra un mensaje de error al usuario
        res.send('Incorrect username or password')
      }
    } else {
      // el usuario no se encontró en la base de datos, muestra un mensaje de error al usuario
      res.send('Incorrect username or password')
    }
  })
})

// página protegida
app.get('/protected', (req, res) => {
  res.send('Esta es una página protegida')
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})