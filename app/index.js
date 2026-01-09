const express = require('express');
const app = express();
const port = 8080;

app.get('/', (req, res) => {
  console.log("Truy cập trang chủ thành công"); 
  res.send('Hệ thống APM đang hoạt động!');
});

app.get('/error', (req, res) => {
  const traceId = req.headers['traceparent'] || 'N/A';
  console.error(`[ERROR] Lỗi kết nối Database tại trace: ${traceId}`);
  res.status(500).send('Lỗi hệ thống (Giả lập để Demo)');
});

app.listen(port, () => {
  console.log(`App demo đang lắng nghe tại http://localhost:${port}`);
});