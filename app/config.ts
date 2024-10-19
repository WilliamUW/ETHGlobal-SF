import { createPublicClient, createWalletClient, custom, http} from 'viem'
import { polygonAmoy} from 'viem/chains'
 
export const publicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http()
})
 
export const walletClient = createWalletClient({
  chain: polygonAmoy,
  transport: custom(window.ethereum)
})
 
// JSON-RPC Account
export const [account] = await walletClient.getAddresses()