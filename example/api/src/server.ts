import type { Request, Response } from 'express';

import * as cors from 'cors';
import * as express from 'express';

const app: express.Express = express();
const port: number = 8080;

app.use(cors());
app.use(express.json());

// Test function
app.get('/api/test', (req: Request, res: Response) => {
  console.log(req.query);

  res.writeHead(200, {}).end({ message: 'ok' });
});

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
