/* eslint-disable @typescript-eslint/no-misused-promises */
import type { Request, Response } from 'express';
import type { ComposooorApiResponse, ComposooorQueryParams } from 'composooor';
import type { SignedOffer } from './maketplace.service';

import * as cors from 'cors';
import * as express from 'express';
import { ethers } from 'ethers';

import { getBuyArgs, getMockSignedOffer } from './maketplace.service';

const app: express.Express = express();
const port: number = 8080;

app.use(cors());
app.use(express.json());

// Test function
app.get(
  '/api/buy',
  async (req: Request<unknown, ComposooorApiResponse, never, ComposooorQueryParams>, res: Response) => {
    // Decode params
    const [implem, tokenId] = ethers.utils.defaultAbiCoder.decode(['address', 'uint256'], req.query.args);

    // Get a mocked offer
    const signedOffer: SignedOffer = await getMockSignedOffer(implem, tokenId);

    // Get args of the MarketPlace "buy" function
    const buyArgsAbiEncoded = getBuyArgs(signedOffer);

    // Return args
    res.writeHead(200, {}).end(JSON.stringify({ data: buyArgsAbiEncoded } as ComposooorApiResponse));
  },
);

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
