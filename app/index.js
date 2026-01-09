require('./otel'); // PHẢI ĐẶT DÒNG ĐẦU TIÊN

const express = require('express');
const pino = require('pino');
const pinoHttp = require('pino-http');
const { trace } = require('@opentelemetry/api');

const logger = pino({
  formatters: {
    log(object) {
      const span = trace.getActiveSpan();
      if (span) {
        const ctx = span.spanContext();
        object.trace_id = ctx.traceId;
        object.span_id = ctx.spanId;
      }
      return object;
    },
  },
});

const app = express();
app.use(pinoHttp({ logger }));

app.get('/', (req, res) => {
  req.log.info('Request success');
  res.send('OK');
});

app.get('/error', (req, res) => {
  req.log.error(
    { error_type: 'database', detail: 'Connection timeout' },
    'Database error'
  );
  res.status(500).send('Error');
});

app.listen(8080, () => {
  logger.info('App listening on port 8080');
});
