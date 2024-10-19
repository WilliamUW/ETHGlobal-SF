
import { createPublicClient, createWalletClient, custom, http} from 'viem'
import { polygonAmoy} from 'viem/chains'
 
export const publicClient = createPublicClient({
  chain: polygonAmoy,
  transport: http()
})
 
export const walletClient = createWalletClient({
  chain: polygonAmoy,
  // @ts-expect-error wallet
  transport: custom(window.ethereum)
})
 
// JSON-RPC Account
  // @ts-expect-error wallet
  export const [account] = await walletClient.getAddresses()