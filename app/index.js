const express = require('express');
const logger = require('pino')();

// Demo App
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  logger.info("Yêu cầu tại trang chủ"); // Log này sẽ có trace_id tự động
  res.send('Hệ thống APM đã thông suốt!');
});

app.get('/error', (req, res) => {
  logger.error({ 
    error_type: "database",
    detail: "Connection timeout" 
  }, "Lỗi kết nối Database giả lập");
  res.status(500).send('Lỗi hệ thống');
});

app.listen(port, () => {
  logger.info(`App demo đang lắng nghe tại http://localhost:${port}`);
});