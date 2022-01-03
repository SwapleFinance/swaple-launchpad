import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    risk: 5,
    lpSymbol: 'SWAP-BUSD LP',
    lpAddresses: {
      97: '0x6f47ec9f53A53c0D0EC2a2e26Ac68738aAEc2E29', // isw-busd
      56: '0xA5D582c43fd53e1A79805eC7890b804b87203995',
    },
    tokenSymbol: 'SWAP',
    tokenAddresses: {
      97: '0xa06e53B70459cd4a219FfFfE0d72F5Ab2df04E75', // isw
      56: '0x18fB791B917fbD372F872605243BeA7f0554Cd04',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'SWAP-BNB LP',
    lpAddresses: {
      97: '0x03450bF648a20AbE03090f251905263b89bc1325', // isw-bnb
      56: '0xF6b5CB5489169a91cCF637Cc92E9C977857d6f8F',
    },
    tokenSymbol: 'SWAP',
    tokenAddresses: {
      97: '0xa06e53B70459cd4a219FfFfE0d72F5Ab2df04E75', // isw
      56: '0x18fB791B917fbD372F872605243BeA7f0554Cd04',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  },
  {
    pid: 2,
    risk: 5,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '0x4e807924A51a0e31be66F9EB876d88371B155Ca9',
      56: '0x27aa3084B0c583Ab388bDC40017d98Cd7F39f67c',
    },
    tokenSymbol: 'BNB',
    tokenAddresses: {
      97: '0xB5A985295cc109DE7e836cB6850D49aBC7781f8f',
      56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  
  // {
  //   pid: 3,
  //   risk: 3,
  //   lpSymbol: 'TAT-BUSD LP',
  //   lpAddresses: {
  //     97: '0xBaE36c04b80FE01bb1611160B199fACB7E3CdC27',
  //     56: '0x93871b338864Be012AF3038ce2A73D5017c5c9ba',
  //   },
  //   tokenSymbol: 'TAT',
  //   tokenAddresses: {
  //     97: '0x2Bbeaf7BB69d2296Aa1d09c9198a111f1A2E6fD9', // maticz
  //     56: '0x290c665656a67e0ea0784f90ECBaeFF77c884217',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 4,
  //   risk: 4,
  //   isTokenOnly: true,
  //   lpSymbol: 'TAT',
  //   lpAddresses: {
  //     97: '0xe8Bd519E5F3666a41555dDFDBbc07D243560f5A0',
  //     56: '0x93871b338864Be012AF3038ce2A73D5017c5c9ba', // CAKE-BUSD LP
  //   },
  //   tokenSymbol: 'TAT',
  //   tokenAddresses: {
  //     97: '0x2Bbeaf7BB69d2296Aa1d09c9198a111f1A2E6fD9', // maticz
  //     56: '0x290c665656a67e0ea0784f90ECBaeFF77c884217',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  // },
  // {
  //   pid: 5,
  //   risk: 5,
  //   lpSymbol: 'TAT-BNB LP',
  //   lpAddresses: {
  //     97: '0xD085E1e2062Ab6661BB4AC5a1775C4620F9d639e',
  //     56: '0x98288cc6a89f28AAb38bD07c08A1e2B694b47254',
  //   },
  //   tokenSymbol: 'TAT',
  //   tokenAddresses: {
  //     97: '0x2Bbeaf7BB69d2296Aa1d09c9198a111f1A2E6fD9', // maticz
  //     56: '0x290c665656a67e0ea0784f90ECBaeFF77c884217',
  //   },
  //   quoteTokenSymbol: QuoteToken.BNB,
  //   quoteTokenAdresses: contracts.wbnb,
  // },
]

export default farms

