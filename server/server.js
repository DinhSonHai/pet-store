const express = require('express');
const path = require('path');
const multiparty = require('connect-multiparty');
const MultipartyMiddleware = multiparty({
  uploadDir: __dirname + '/public/uploads',
});
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'petstore-mern',
  api_key: '961355747379429',
  api_secret: 'rGLBE9UbLRa4qpuVh6lKlJ2Z_u4',
});

const connectDB = require('./config/db');
const route = require('./routes');

const app = express();
app.use(express.json());
app.use(express.static('public'));
app.post('/upload', MultipartyMiddleware, async (req, res) => {
  let tmpFile = req.files.upload;
  let pathFile = tmpFile.path;
  try {
    const imageUrl = await cloudinary.uploader.upload(pathFile);
    if (!imageUrl) {
      return res.status(400).json({ errors: [{ msg: 'Thêm ảnh thất bại!' }] });
    }
    return res.status(200).json({
      uploaded: true,
      url: imageUrl.url,
    });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: 'Thêm ảnh thất bại!' }] });
  }
});

app.post('/uploadProduct', MultipartyMiddleware, async (req, res) => {
  let tmpFile = req.files.file;
  let pathFile = tmpFile.path;
  try {
    const imageUrl = await cloudinary.uploader.upload(pathFile);
    if (!imageUrl) {
      return res.status(400).json({ errors: [{ msg: 'Thêm ảnh thất bại!' }] });
    }
    return res.status(200).json({
      uploaded: true,
      url: imageUrl.url,
    });
  } catch (error) {
    return res.status(400).json({ errors: [{ msg: 'Thêm ảnh thất bại!' }] });
  }
});

connectDB();

route(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
