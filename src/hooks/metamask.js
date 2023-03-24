import React from 'react'
import { injected } from '../components/wallet/connectors'
import { useWeb3React } from '@web3-react/core';
import { useEffect } from "react"
import "../hooks/metamask.css"

export const MetaMaskProvider = () => {

    // eslint-disable-next-line
    const { activate, account, library, connector, active, deactivate } = useWeb3React()

    async function connect() {
        try {
          await activate(injected)
          localStorage.setItem('isWalletConnected', true)
        } catch (error) {
          console.log(error)
        }
    }

    async function disconnect() {
        try {
          deactivate()
          localStorage.setItem('isWalletConnected', false)
        } catch (error) {
          console.log(error)
        }
    }

    useEffect(() => {
        const connectWalletOnPageLoad = async () => {
            
            if (localStorage?.getItem('isWalletConnected') === 'true') {
                try {
                    await activate(injected)
                    localStorage.setItem('isWalletConnected', true)
                } 
                catch (error) {
                    console.log(error)
                }
            }
        }
        // eslint-disable-next-line
        connectWalletOnPageLoad()
        localStorage.clear();
        // eslint-disable-next-line
    }, [])
    
    return (
        <div>
          <br></br>
          <button onClick={connect}>Connect Wallet</button><br></br>
          {active ? <span>Connected with:- <b>{account}</b></span> : <span></span>}<br></br>
          <br></br>
          <button onClick={disconnect}>Disconnect Wallet</button>
        </div>
    )
}
