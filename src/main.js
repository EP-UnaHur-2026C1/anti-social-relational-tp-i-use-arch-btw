const express = require('express');
const app = express();
const db = require('./models');
require('dotenv').config();
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const commentRoutes = require('./routes/comment.routes');
const tagRoutes = require('./routes/tag.routes');
const PORT = process.env.PORT || 3000;
//1- pnpm install ➡️ Descarga todos los paquetes
//2- pnpm dlx sequelize-cli db:migrate ➡️ Construye el esqueleto (las tablas vacías y sus relaciones)
//3- pnpm dlx sequelize-cli db:seed:all ➡️ Rellena ese esqueleto con la información inicial de prueba
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/tags', tagRoutes);

app.listen(PORT, async () => {
    await db.sequelize.sync();
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
