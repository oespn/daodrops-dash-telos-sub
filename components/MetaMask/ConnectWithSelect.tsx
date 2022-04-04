import type { Web3ReactHooks } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import { useState } from 'react'
import { getAddChainParameters } from '../../utils/web3-connnectors/chains'
import { FaEthereum } from 'react-icons/fa'

const ConnectWithSelect = ({
  connector,
  chainId,
  isActivating,
  error,
  isActive,
}: {
  connector: MetaMask
  chainId: ReturnType<Web3ReactHooks['useChainId']>
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  error: ReturnType<Web3ReactHooks['useError']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
}) => {

  const [desiredChainId, setDesiredChainId] = useState<number>(-1)

  if (error) {
    return (
      <div className="flex flex-col">
        <button className="px-3 rounded-sm py-1 bg-primary text-white font-medium w-80"
          onClick={() =>
            connector.activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
          }
        >
          Try Again?
        </button>
      </div>
    )
  } else if (isActive) {
    return (
      <div className="flex flex-col">
        <button type="button" className="px-3 rounded-sm py-1 bg-primary text-white font-medium w-80" onClick={() => connector.deactivate()}>
          <div className="flex justify-center px-5 py-1 ">
            <FaEthereum className='text-xl' />
            <span>&nbsp;Disconnect</span>
          </div>
        </button>
      </div>
    )
  } else {

    return (
      <div className="flex flex-col">
        <button
          type="button" className="px-3 rounded-sm py-1 bg-primary text-white font-medium w-80"
          onClick={
            isActivating
              ? undefined
              : () =>
                connector.activate(desiredChainId === -1 ? undefined : getAddChainParameters(desiredChainId))
          }
          disabled={isActivating}
        >
          <div className="flex justify-center px-5 py-1">
            <FaEthereum className='text-xl' />
            <span>&nbsp;Connect</span>
          </div>
        </button>
      </div>
    )
  }
}

export default ConnectWithSelect
