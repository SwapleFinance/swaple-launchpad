import React, { useMemo, useState, useCallback } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { getContract } from 'utils/erc20'
import { Button, Flex, Text, Skeleton } from '@pancakeswap-libs/uikit'
import { communityFarms } from 'config/constants'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { QuoteToken } from 'config/constants/types'
import { useFarmFromPid, useFarmUser } from 'state/hooks'
import UnlockButton from 'components/UnlockButton'
import { useApprove } from 'hooks/useApprove'

import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'
import StakeAction from './StakeAction'


export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

const RainbowLight = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const StyledCardAccent = styled.div`
  background: linear-gradient(45deg,
  rgba(255, 0, 0, 1) 0%,
  rgba(255, 154, 0, 1) 10%,
  rgba(208, 222, 33, 1) 20%,
  rgba(79, 220, 74, 1) 30%,
  rgba(63, 218, 216, 1) 40%,
  rgba(47, 201, 226, 1) 50%,
  rgba(28, 127, 238, 1) 60%,
  rgba(95, 21, 242, 1) 70%,
  rgba(186, 12, 248, 1) 80%,
  rgba(251, 7, 217, 1) 90%,
  rgba(255, 0, 0, 1) 100%);
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 32px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  bnbPrice?: BigNumber
  ethereum?: provider
  account?: string
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, cakePrice, bnbPrice, ethereum, account }) => {
  const TranslateString = useI18n()
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { pid, lpAddresses, tokenAddresses, isTokenOnly, depositFeeBP } = useFarmFromPid(farm.pid)
  const { allowance, tokenBalance, stakedBalance, earnings } = useFarmUser(pid)
  const lpAddress = lpAddresses[process.env.REACT_APP_CHAIN_ID]
  const tokenAddress = tokenAddresses[process.env.REACT_APP_CHAIN_ID];
  const lpName = farm.lpSymbol.toUpperCase()
  const isApproved = account && allowance && allowance.isGreaterThan(0)

  // const isCommunityFarm = communityFarms.includes(farm.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  // const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  

  const totalValue: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(farm.lpTotalInQuoteToken)
    }
    return farm.lpTotalInQuoteToken
  }, [bnbPrice, cakePrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const lpLabel = farm.lpSymbol
  const earnLabel = 'SWAP'
  const farmAPY = farm.apy && farm.apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  
  const lpContract = useMemo(() => {
    if(isTokenOnly){
      return getContract(ethereum as provider, tokenAddress);
    }
    return getContract(ethereum as provider, lpAddress);
  }, [ethereum, lpAddress, tokenAddress, isTokenOnly])
  const { onApprove } = useApprove(lpContract)
 
  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      await onApprove()
      setRequestedApproval(false)
    } catch (e) {
      console.error(e)
    }
  }, [onApprove])
  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction stakedBalance={stakedBalance} tokenBalance={tokenBalance} tokenName={lpName} pid={pid} depositFeeBP={depositFeeBP} />
    ) : (
      <Button className="btn_yellow" mt="8px" fullWidth disabled={requestedApproval} onClick={handleApprove}>
        {TranslateString(999, 'Approve Contract')}
      </Button>
    )
  }
  const { quoteTokenAdresses, quoteTokenSymbol, risk } = farm
  return (
  
      <div className="card_radius card_radius_border">
          <div className="rainbow-bg">
              .
          </div>
            <div className="inner_div_z">
                <div className="farm_head_row">
                    <div className=" bor_rad">
                    <div className="card-img d-flex align-items-center">
                        <img src="../images/farms/swap-busd.png" alt="" />
                        <h2>SWAP</h2>
                       
                    </div>
                    <div className="right-cont">
                  
                        <div>
                            <div className="">
                                <div className="days">
                                    30 days  
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="mb_end unstake">
                    <div className=" fam_left_txt_sm">
                      Unstake available after
                      <br/>
                    <span className="end_Date_blue">23/08/2021</span>
                    </div>
                    <div className="end_card">Ended</div>
               </div>
              <div className="card-det">
              <div className="card-d">
                  <div className="fam_left_txt">
                    Staked:
                  </div>
                  <div className="tw-800">N/A</div>
              </div>
              <div className="card-d">
                <div className="fam_left_txt">APR:</div>
                <div className="tw-800 cal-btn d-flex align-items-center">
                144.94% 
                <ApyButton
                   lpLabel={lpLabel}
                   quoteTokenAdresses={quoteTokenAdresses}
                   quoteTokenSymbol={quoteTokenSymbol}
                   tokenAddresses={tokenAddresses}
                   cakePrice={cakePrice}
                   apy={farm.apy}
               />
                     </div>
              </div>
              <div className="card-d">
                  <div className="fam_left_txt">
                  Liquidity:
                  </div>
                  <div className="tw-800">$745,978</div>
              </div>
              <div className="card-d">
                  <div className="fam_left_txt">
                  SWAP Earned:
                  </div>
                  <div className="tw-800">552 BNB</div>
              </div>

              </div>
             
              <div className="pt-16">
      {!account ? <UnlockButton mt="8px" fullWidth className="btn_yellow" /> : renderApprovalOrStakeButton()}

                {/* <button className="btn_yellow" type="button">Unlock Wallet</button> */}
              </div>
          </div>
    </div>

 )
}

export default FarmCard
