const logger = require('pino')();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  logger.info({ msg: "Truy cập trang chủ", custom_label: "homepage" });
  res.send('Hệ thống APM đang hoạt động!');
});

app.get('/error', (req, res) => {
  logger.error({ msg: "Lỗi kết nối Database giả lập", db_name: "users_db" });
  res.status(500).send('Lỗi hệ thống');
});

app.listen(8080, () => {
  logger.info("App demo đang lắng nghe tại http://localhost:8080");
});