import React, { useRef, FC, useState} from 'react';

import logo from './logo.svg';
import '../App.css';

import { DefaultProvider, MethodCallOptions, sha256, toHex, PubKey, bsv, TestWallet, Tx, toByteString, hash160, buildPublicKeyHashScript, findSig, SignatureResponse } from "scrypt-ts";

//import { Statefulsc } from "./contracts/stateful";
import { MarketPlaceToken } from "../contracts/mPlaceToken";

import {homepvtKey, homenetwork, compState} from './Home';
import { broadcast, listUnspent, getTransaction, getSpentOutput} from '../mProviders';

import { hexToLittleEndian, sleep } from "../myUtils";

//const provider = new DefaultProvider({network: bsv.Networks.testnet});
const provider = new DefaultProvider({network: homenetwork});
let Alice: TestWallet
let signerExt: TestWallet

let txlink2 = ""
//const privateKey = bsv.PrivateKey.fromHex("79342a4c317817a80a298fe116147a74e4e90912a4f321e588a4db67204e29b0", bsv.Networks.testnet)  
//let privateKey = bsv.PrivateKey.fromHex(homepvtKey, homenetwork) 

function Page19TokenBuy() {
//const  deployACT: FC = () => {  

  const [deployedtxid, setdeptxid] = useState("");
  const labelRef = useRef<HTMLLabelElement | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [txid2, setTxid] = useState("");
  const txid = useRef<any>(null);
  const priceOffer = useRef<any>(null);

  const interact = async (amount: any) => {
    setdeptxid("Wait!!!")

    if( txid.current.value.length === 64 )
    {

      // Por algum motivo ele não aceita o provider externo
      //Para evitar o problema:  Should connect to a livenet provider
      //Bypassar o provider externo e const
      let provider = new DefaultProvider({network: homenetwork});

      await provider.connect()

      let privateKey = bsv.PrivateKey.fromHex(homepvtKey, homenetwork) 

      Alice = new TestWallet(privateKey, provider)

      /////////////////////////////////////////////
      //O signer deve ser conectado antes do try
      /////////////////////////////////////////////
      const signer = Alice
      //const balance = 1000
      //Linha necessária nesta versão
      //O signee deve ser connectado
      await signer.connect(provider)

  
      try {
  
        
        //const message = toByteString('hello world', true)
        let tx = new bsv.Transaction

        
        //////////////////////////////////////////////////////
        //Jesus is the Lord
        //////////////////////////////////////////////////////

        tx = await provider.getTransaction(txid.current.value)  
    
        //////////////////////////////////////////////////////
        //////////////////////////////////////////////////////
  
    
        console.log('Current State TXID: ', tx.id)
  
        //const instance = Helloworld02.fromTx(tx, 0)

        //let finish = false
        //let newData = '';

        let posNew1 = 0 // Output Index of the Contract in the Current State TX

        /*
        if(tokenIndex.current.value === '1')
        {
          posNew1 = 1
        }
        */

        let instance2 = MarketPlaceToken.fromTx(tx, posNew1)
        //Inform to the system the right output index of the contract and its sequence
        tx.pvTxIdx(tx.id, posNew1, sha256(tx.outputs[posNew1].script.toHex()))

    
        let pbkey = bsv.PublicKey.fromPrivateKey(privateKey)

        const balance = instance2.balance
        const nextInstance = instance2.next()

        //let price = 3000n

        let price = BigInt(parseInt(priceOffer.current.value, 10))

        nextInstance.alice = PubKey(toHex(pbkey))
        nextInstance.price = 0n
        nextInstance.sell = false
      
        await instance2.connect(signer)


        instance2.bindTxBuilder('buying', async function () {

          const changeAddress = bsv.Address.fromPrivateKey(privateKey)
     
          const unsignedTx: bsv.Transaction = new bsv.Transaction()
          .addInputFromPrevTx(tx, 0)  

          unsignedTx.addOutput(new bsv.Transaction.Output({
            script: bsv.Script.fromHex(buildPublicKeyHashScript(hash160(toHex(pbkey))).toHex() + nextInstance.tokenData),
            satoshis: parseInt(hexToLittleEndian(nextInstance.tokenSats), 16),

          })).addOutput(new bsv.Transaction.Output({
              script: buildPublicKeyHashScript(hash160(instance2.alice)),
              satoshis: Number(price)
          })).change(changeAddress)
  
          return Promise.resolve({
              tx: unsignedTx,
              atInputIndex: 0,
              nexts: [
              ]
          });      
        });

        const { tx: callTx } = await instance2.methods.buying(
          // the first argument `sig` is replaced by a callback function which will return the needed signature
          //PubKey(toHex(pbkey)),
          buildPublicKeyHashScript(hash160(toHex(pbkey))).toHex(),
          price,
        )
        
        console.log('TXID New State: ', callTx.id)     
        
        //console.log( 'Counter: ', currentInstance.count + 1n)
        //console.log( 'Counter: ', counter.count)
        console.log( 'TXID: ', callTx.id)
  
        //alert('unlock: ' + callTx.id)
               
        if(homenetwork === bsv.Networks.mainnet )
        {
          txlink2 = "https://whatsonchain.com/tx/" + callTx.id;
        }
        else if (homenetwork === bsv.Networks.testnet )
        {
          txlink2 = "https://test.whatsonchain.com/tx/" + callTx.id;
        }
        setLinkUrl(txlink2);
  
        setdeptxid(callTx.id)
    
      } catch (e) {
        console.error('Buy Order fails', e)
        alert('Buy Order fails')
        setdeptxid("")
      }
    }
    else
    {
      alert('Wrong TXID Format / or price')
      setdeptxid("Try Again!!!")
    }
  };

  return (
    <div className="App">
        <header className="App-header">

        <h2 style={{ fontSize: '34px', paddingBottom: '5px', paddingTop: '5px'}}>

          <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>   
          Order Buy
          
        </h2>

       
        <div>

          <div style={{ textAlign: 'center' , paddingBottom: '20px' }}>
                
                <label style={{ fontSize: '14px', paddingBottom: '2px' }}
                  >Inform Current State TXID:  
                </label>     
          </div>

          <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
                <label style={{ fontSize: '14px', paddingBottom: '5px' }}  
                > 
                    <input ref={txid} type="hex" name="PVTKEY1" min="1" placeholder="current state" />
                </label>     
          </div>

          <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
                <label style={{ fontSize: '14px', paddingBottom: '5px' }}  
                > 
                    <input ref={priceOffer} type="number" name="PVTKEY1" min="1" placeholder="price offer (satoshis)" />
                </label>     
          </div>

          <div style={{ textAlign: 'center' }}>     
                <button className="insert" onClick={interact}
                    style={{ fontSize: '14px', paddingBottom: '2px', marginLeft: '0px'}}
                >Buy</button>
          </div>

        </div>


        {
          deployedtxid.length === 64?
          
         /* <button onClick={handleCopyClick}>Copy to ClipBoard</button> */

          <div>
          <div className="label-container" style={{ fontSize: '12px', paddingBottom: '0px', paddingTop: '20px' }}>
            <p className="responsive-label" style={{ fontSize: '12px' }}>TXID: {deployedtxid} </p>
          </div>
          <div className="label-container" style={{ fontSize: '12px', paddingBottom: '20px', paddingTop: '0px' }}>
            <p className="responsive-label" style={{ fontSize: '12px' }}>TX link: {' '} 
                <a href={linkUrl} target="_blank" style={{ fontSize: '12px', color: 'cyan'}}>
                {linkUrl}</a></p>
          </div>
        </div>
          
          
          :

          <div className="label-container" style={{ fontSize: '12px', paddingBottom: '20px', paddingTop: '20px' }}>
          <p className="responsive-label" style={{ fontSize: '12px' }}>{deployedtxid} </p>
        </div>
          
        }                  

      </header>
    </div>
  );
}

export default Page19TokenBuy;
