import contracts from './contracts'
import { PadConfig, QuoteToken } from './types'

const Launch: PadConfig[] = [
    {
        pid: 0,
        presaleAddress: {
            // 97: '0xc26A7B249ed927544A47982bf8053FCe953ecc50',
            97: '0xBf6B4Cf71CBC315cC4747Ae8BdF90F5a5c4D23A9',
            56: '0xBf6B4Cf71CBC315cC4747Ae8BdF90F5a5c4D23A9',
        },
        tokenName:'SWAP COIN',
        tokenSymbol: 'SWAP',
        tokenAddresses: {
            // 97: '0xe8Bd519E5F3666a41555dDFDBbc07D243560f5A0',
            97: '0xDFCd0b91AE2BB34a90D9b4970Dc113DFaf25004d',
            56: '0x92Ea49BBe6cB40B3D11f9f75288C3d5058029f85',
        }
    }
]

export default Launch