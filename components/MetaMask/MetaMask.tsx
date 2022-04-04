import { useEffect } from 'react'
import { hooks, metaMask } from '../../utils/web3-connnectors/connectors'
import Accounts from './Accounts'
import Chain from './Chain'
import ConnectWithSelect from './ConnectWithSelect'
import Status from './Status'

const { useChainId, useAccounts, useError, useIsActivating, useIsActive, useProvider, useENSNames } = hooks

const MetaMaskCard = ({
  onActive,
  saveInfo
}) => {
  const chainId = useChainId()
  const accounts = useAccounts()
  const error = useError()
  const isActivating = useIsActivating()

  const isActive = useIsActive()

  const provider = useProvider()
  const ENSNames = useENSNames(provider)

  useEffect(() => {
    onActive(isActive)
    if (isActive) {
      saveInfo(chainId, accounts)
    }
  }, [isActive])

  // attempt to connect eagerly on mount
  useEffect(() => {
    void metaMask.connectEagerly()
  }, [])

  return (
    <div>
      <div>
        <Status isActivating={isActivating} error={error} isActive={isActive} />
        <Chain chainId={chainId} />
        <Accounts accounts={accounts} provider={provider} ENSNames={ENSNames} />
      </div>
      <ConnectWithSelect
        connector={metaMask}
        chainId={chainId}
        isActivating={isActivating}
        error={error}
        isActive={isActive}
      />
    </div>
  )
}

export default MetaMaskCard