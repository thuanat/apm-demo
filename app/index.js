const express = require('express');
const logger = require('pino')(); // Dùng pino thay cho console
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  logger.info("Truy cập trang chủ thành công"); 
  res.send('Hệ thống APM đang hoạt động!');
});

app.get('/error', (req, res) => {
  logger.error("Lỗi kết nối Database giả lập");
  res.status(500).send('Lỗi hệ thống (Giả lập để Demo)');
});

app.listen(port, () => {
  logger.info(`App demo đang lắng nghe tại http://localhost:${port}`);
});