// Library
import * as dotenv from 'dotenv';

// Dotenv
dotenv.config();
export default {
  envServer: {
    host: process.env.APP_HOST || 'localhost',
    port: Number(process.env.APP_PORT).valueOf() || 3000,
    type: process.env.NODE_ENV || 'local',
  },
  network: {
    rpc: process.env.NETWORK_RPC || '',
    mnemonic: process.env.KEY_MNENONICE || '',
  },
  smc: {
    claim: process.env.CLAIM_CONTRACT || '',
  },
};
