import type { Request, Response } from 'express';
import type { ComposooorQueryParams } from 'composooor';

import * as cors from 'cors';
import * as express from 'express';
import { AbiCoder } from 'ethers';

const app: express.Express = express();
const port: number = 8080;

app.use(cors());
app.use(express.json());

// Test function
app.get('/api/test', (req: Request<unknown, { abi: string }, never, ComposooorQueryParams>, res: Response) => {
  AbiCoder.defaultAbiCoder().decode(['uint'], req.query.args);

  const encode = AbiCoder.defaultAbiCoder().encode(['uint'], [10]);

  res.writeHead(200, {}).end(JSON.stringify({ abi: encode }));
});

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
