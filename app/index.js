// app/index.js
const { logs, SeverityNumber } = require('@opentelemetry/api-logs');
const express = require('express');
const logger = require('pino')(); // Pino sẽ được OTel tự động hook

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  logger.info("Yêu cầu tại trang chủ");
  res.send('Hệ thống APM đang hoạt động!');
});

app.get('/error', (req, res) => {
  // Ghi log lỗi có cấu trúc
  logger.error({ 
    event: "database_error",
    db_name: "main_db"
  }, "Lỗi kết nối Database giả lập");
  
  res.status(500).send('Lỗi hệ thống');
});

app.listen(port, () => {
  console.log(`App demo đang lắng nghe tại http://localhost:${port}`);
});