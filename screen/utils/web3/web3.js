import Web3 from "web3";
import * as bip39 from "bip39";
import { hdkey } from "ethereumjs-wallet";
import * as ed25519 from "ed25519-hd-key";
import nacl from "tweetnacl";
import { ethers } from "ethers";
import {
    networks,
    all_chains_txns,
    AllChainIds
  } from "../walletConstants";
import { ERC20ABI } from "../ABI";
// import { base58 } from "ethers/lib/utils";
import bs58 from "bs58"; // For base58 encoding
// import { setIsLoggedIn } from "../../Store/authSlice";
import { useDispatch } from "react-redux";

// const base58 = bs58;
// TODO: change it on chain change (setProvider?)
const web3 = new Web3(networks[0]?.rpcUrl);
// const ethersProvider = new ethers.providers.JsonRpcProvider(BSC_RPC);
export const getWeb3Instance = () => {
  return web3;
};

export const getWeb3InstanceDynamic = (RPC) => {
  const web3Dynamic = new Web3(RPC);
  return web3Dynamic;
};

export const setProvider = (provider) => {
  web3.setProvider(provider);
};

export const validateMnemonic = (mnemonic) => {
  return bip39.validateMnemonic(mnemonic);
};

export const importWallet = (mnemonic) => {
  try {
    const index = 0;
    const eth_path = `m/44'/60'/0'/0/${index}`;
    const sol_path = `m/44'/501'/${index}'/0'`;

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const hd_wallet = hdkey.fromMasterSeed(seed);
    const wallet = hd_wallet.derivePath(eth_path).getWallet();
    const address = wallet.getAddressString();
    const publicKey = wallet.getPublicKeyString();
    const privateKey = wallet.getPrivateKeyString();

    // let derivedPrivateKey = ed25519.derivePath(sol_path, seed.toString('hex'));
    // let keyPair = nacl.sign.keyPair.fromSeed(derivedPrivateKey.key);

    // const solana = {
    //   publicKey: base58.encode(keyPair.publicKey),
    //   secretKey: base58.encode(keyPair.secretKey),
    // };

    return {
      address,
      publicKey,
      privateKey,
      // solana,
    };
  } catch (error) {
    console.log(error);
  }
};

export const getHDWallet = (index, mnemonic) => {
  try {
    console.log("wait for walllet creation start...", mnemonic);
    const eth_path = `m/44'/60'/0'/0/0`;
    const sol_path = `m/44'/501'/0'/0'`;
    console.log("walllet creation started...");
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    console.log("seed created...");

    const hd_wallet = hdkey.fromMasterSeed(seed);
    console.log("hdwallet created...");

    const wallet = hd_wallet.derivePath(eth_path).getWallet();
    console.log("wallet created...");

    const address = wallet.getAddressString();
    console.log("address fetched...");

    const publicKey = wallet.getPublicKeyString();
    console.log("wallet public key...");

    const privateKey = wallet.getPrivateKeyString();
    console.log("private key...");

    // let derivedPrivateKey = ed25519.derivePath(sol_path, seed.toString('hex'));
    console.log("derived private ...");

    // let keyPair = nacl.sign.keyPair.fromSeed(derivedPrivateKey.key);
    console.log("keypair created...");

    // const solana = {
    //   publicKey: base58.encode(keyPair.publicKey),
    //   secretKey: base58.encode(keyPair.secretKey),
    // };
    console.log("solana key created..");

    return {
      address,
      publicKey,
      privateKey,
      // solana,
    };
  } catch (error) {
    console.log(error);
  }
};

export const setDefaultAccount = (privateKey) => {
  // console.log(privateKey, ' privatekey');
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  web3.eth.accounts.wallet.add(account);
  web3.eth.defaultAccount = account.address;
  return web3;
};

export const isValidKey = (privateKey) => {
  try {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    if (account?.address) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export const isValidKeyy = (privateKey) => {
  try {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    if (account?.address) {
      return account;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

export const getAccounts = () => {
  return new Promise((resolve, reject) => {
    web3.eth
      .getAccounts()
      .then((accounts) => {
        resolve(accounts);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getBalance = (address) => {
  return new Promise((resolve, reject) => {
    // console.log(web3.currentProvider, 'in getbalance of web3');
    try {
      web3.eth
        .getBalance(address)
        .then((balance) => {
          // console.log(balance,"Balance")
          resolve(web3.utils.fromWei(balance, "ether"));
        })
        .catch((error) => {
          // console.log(error, 'error in getBalance 1');
          resolve(0);
        });
    } catch (e) {
      resolve(0);
      // console.log(e, ' error in getbalance catchblock 2');
    }
  });
};

export const getERC20Balance = (address, contractAddress, rpc) => {
  return new Promise((resolve, reject) => {
    const contract = new web3.eth.Contract(ERC20ABI, contractAddress);
    try {
      contract.methods
        .balanceOf(address)
        .call()
        .then((balance) => {
          // console.log(balance, ' balance erc20 token');
          resolve(balance);
        })
        .catch((error) => {
          console.log(error, "error in tokenbalance fetch of ERC-20,1", rpc);
          resolve(0);
        });
    } catch (e) {
      console.log(error, "error in tokenbalance fetch of ERC-20, 2");
      resolve(0);
    }
  });
};

export async function estimateContractMethodGas(payload, wallet, network) {
  try {
    const transactionObject = {
      to: payload.to, // Contract address
      data: payload.data, // Method data
    };
    setProvider(network.rpcUrl);
    const web3Account = setDefaultAccount(wallet?.privateKey);
    const gasEstimate = await web3Account.eth.estimateGas(transactionObject);

    console.log(
      "success Gas Estimate estimateContractMethodGas():",
      gasEstimate
    );
    return gasEstimate;
  } catch (error) {
    console.error("Error estimating gas estimateContractMethodGas():", error);
    return error;
    // throw error;
  }
}

export async function callContractMethod(payload, wallet, network) {
  try {
    setProvider(network.rpcUrl);
    const web3Account = setDefaultAccount(wallet?.privateKey);
    const result = await web3Account.eth.sendTransaction(payload);
    console.log("success txns :");
    return result;
  } catch (error) {
    console.error("Error estimating gas estimateContractMethodGas():", error);
    console.log("success txns :");
    return error;
    // throw error;
  }
}

export const sendToken = async (
  receiver,
  token_address,
  amount,
  wallet,
  setloading,
  Toast
) => {
  try {
    // console.log(
    //   receiver,
    //   token_address,
    //   amount,
    //   wallet,
    //   setloading,
    //   Toast,
    //   "hsfujh"
    // );
    setProvider(wallet.network.rpcUrl);
    setDefaultAccount(wallet?.privateKey);
    const ERC20Contract = new web3.eth.Contract(ERC20ABI, token_address);
    const gasPrice = await getGasPrice();
    const estimategas = await ERC20Contract.methods
      .transfer(receiver, amount)
      .estimateGas({ from: wallet.address, value: 0, gasPrice: gasPrice });
    const result = await ERC20Contract.methods.transfer(receiver, amount).send({
      from: wallet.address,
      value: 0,
      gas: estimategas,
      gasPrice: gasPrice,
    });
    // console.log(result, "trnfr res");   
    setloading(false);
    if (result?.status) {
      wallet?.dispatch(wallet?.setActiveWallet(wallet?.activeWallet));
      Toast.show({
        type: "success",
        text1: "Trasfer Successful",
        text2:
          Number(amount) / Number("1e" + wallet.decimal) +
          " " +
          wallet.symbol +
          " to " +
          " " +
          receiver,
      });
      return result;
    } else {
      Toast.show({
        type: "error",
        text1: "Trasfer Failed",
        text2:
          Number(amount) / Number("1e" + wallet.decimal) +
          " " +
          wallet.symbol +
          " to " +
          " " +
          receiver,
      });
    }
    // console.log(result, 'st');
    return "";
  } catch (e) {
    setloading(false);
    Toast.show({
      type: "error",
      text1: "Trasfer Failed",
      text2:
        Number(amount) / Number("1e" + wallet.decimal) +
        " " +
        wallet.symbol +
        " to " +
        " " +
        receiver,
    });
    return "";
    console.log(e, "error in native token transfer");
  }
};

export const sendNativeToken = async (
  receiver,
  sender,
  amount,
  wallet,
  setloading,
  Toast
) => {
  // console.log(receiver, sender, amount, ' amount');
  try {
    const txreciept = {
      to: receiver,
      value: web3.utils.toWei(amount, "ether"),
      gas: "21000",
    };
    console.log(txreciept, "txrec");
    setProvider(wallet.network.rpcUrl);
    setDefaultAccount(wallet?.privateKey);
    const signedTxns = await signTransaction(txreciept, wallet?.privateKey);
    const result = await sendSignedTransaction(signedTxns);
    setloading(false);
    if (result.status) {
      wallet?.dispatch(wallet?.setActiveWallet(wallet?.activeWallet));
      Toast.show({
        type: "success",
        text1: "Trasfer Successful",
        text2: amount + " " + wallet.symbol + " to " + " " + receiver,
      });
      return result;
    } else {
      Toast.show({
        type: "error",
        text1: "Trasfer Failed",
        text2: amount + " " + wallet.symbol + " to " + " " + receiver,
      });
      return "";
    }
    // console.log(result, 'st');
  } catch (e) {
    setloading(false);
    Toast.show({
      type: "error",
      text1: "Trasfer Failed",
      text2: amount + " " + wallet.symbol + " to " + " " + receiver,
    });
    console.log(e, "error in native token transfer");
    return "";
  }
};

export const signTransaction = (transaction, privatekey) => {
  return new Promise((resolve, reject) => {
    web3.eth.accounts
      .signTransaction(transaction, privatekey)
      .then((signedTransaction) => {
        resolve(signedTransaction);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const sendSignedTransaction = (signedTransaction) => {
  return new Promise((resolve, reject) => {
    web3.eth
      .sendSignedTransaction(signedTransaction.rawTransaction)
      .then((receipt) => {
        resolve(receipt);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTransactionReceipt = (transactionHash) => {
  return new Promise((resolve, reject) => {
    web3.eth
      .getTransactionReceipt(transactionHash)
      .then((receipt) => {
        resolve(receipt);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTransaction = (transactionHash) => {
  return new Promise((resolve, reject) => {
    web3.eth
      .getTransaction(transactionHash)
      .then((transaction) => {
        resolve(transaction);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTransactionCount = (address) => {
  return new Promise((resolve, reject) => {
    web3.eth
      .getTransactionCount(address)
      .then((count) => {
        resolve(count);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getGasPrice = () => {
  return new Promise((resolve, reject) => {
    web3.eth
      .getGasPrice()
      .then((gasPrice) => {
        resolve(gasPrice);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getBlockNumber = () => {
  return new Promise((resolve, reject) => {
    web3.eth
      .getBlockNumber()
      .then((blockNumber) => {
        resolve(blockNumber);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getBlock = (blockNumber, returnTransactionObjects) => {
  return new Promise((resolve, reject) => {
    web3.eth
      .getBlock(blockNumber, returnTransactionObjects)
      .then((block) => {
        resolve(block);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getBlockTransactionCount = (blockNumber) => {
  return new Promise((resolve, reject) => {
    web3.eth
      .getBlockTransactionCount(blockNumber)
      .then((count) => {
        resolve(count);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTransactionFromBlock = (blockNumber, index) => {
  return new Promise((resolve, reject) => {
    web3.eth
      .getTransactionFromBlock(blockNumber, index)
      .then((transaction) => {
        resolve(transaction);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getTransactionInBlock = (blockNumber, index) => {
  return new Promise((resolve, reject) => {
    web3.eth
      .getTransactionFromBlock(blockNumber, index)
      .then((transaction) => {
        resolve(transaction);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const signMessage = (message, privateKey) => {
  return new Promise((resolve, reject) => {
    let httpProvider = new ethers.providers.JsonRpcProvider(BSC_RPC);
    const wallet = new ethers.Wallet(privateKey, httpProvider);
    wallet
      .signMessage(message)
      .then((signature) => {
        resolve(signature);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const recoverPersonalSignature = (message, signature) => {
  try {
    const recoveredAddress = ethers.utils.verifyMessage(message, signature);
    // console.log(recoveredAddress);
    return recoveredAddress;
  } catch (error) {
    console.log(error);
  }
};

export const createAccount = async (name, index, Mnemonic, windex) => {
  try {
    let HDWallet = getHDWallet(index, Mnemonic);
    let web3 = setDefaultAccount(HDWallet?.privateKey);
    // const connection = new solanaWeb3.Connection(
    //   'https://api.devnet.solana.com',
    // );
    // const balance = await web3.eth.getBalance(HDWallet?.address);
    // const solBalance = await connection.getBalance(
    //   new solanaWeb3.PublicKey(HDWallet?.solana.publicKey as any),
    // );

    const account = {
      index: windex,
      address: HDWallet?.address,
      privateKey: HDWallet?.privateKey,
      name: name,
      seed: Mnemonic,
      userinfo: {},
      networks: AllChainIds,
      assets: networks,
      transactions: all_chains_txns,
    };
    return account;
  } catch (error) {
    console.log(error);
  }
};

export const ImportAccount = async (name, index, privatekey) => {
  try {
    let web3 = setDefaultAccount(privatekey);
    const address = web3.eth.defaultAccount;
    const balance = await web3.eth.getBalance(address);

    const prvtkey_account = {
      index: index,
      balance: `${web3.utils.fromWei(balance, "ether")}`,
      address: address,
      privateKey: privatekey,
      name: name,
      userinfo: {},
      seed: "",
      networks: AllChainIds,
      assets: networks,
      transactions: all_chains_txns,
      nfts: [],
    };
    return prvtkey_account;
  } catch (error) {
    console.log(error, "import private key error");
  }
};

// NON-WEB3
export const toAscii = (hex) => {
  return web3.utils.toAscii(hex);
};

// TODO: ENS ethereum name service
// export const addressAbbreviate = (address) => {
//   return `${address.slice(0, 5)}...${address.slice(-4)}`;
// };

export const addressAbbreviate = (address) => {
  if (address && typeof address === 'string') {
    return `${address.slice(0, 5)}...${address.slice(-4)}`;
  }
  return "Invalid Address";  // or return an empty string, depending on your use case
};


// export const addressAbbreviate1 = (address, startlength, endlength) => {
//   return `${address.slice(0, startlength)}...${address.slice(-endlength)}`;
// };

export const addressAbbreviate1 = (address, startlength, endlength) => {
  if (typeof address === 'string' && address.length >= startlength + endlength) {
    return `${address.slice(0, startlength)}...${address.slice(-endlength)}`;
  } else {
    return "Invalid Address";  // or you can return an empty string or another fallback value
  }
};


// export const abbreviateTokenID = (tokenID) => {
//   return tokenID.length > 8
//     ? `${tokenID.slice(0, 5)}...${tokenID.slice(-4)}`
//     : tokenID;
// };

export const abbreviateTokenID = (tokenID) => {
  if (typeof tokenID === 'string' && tokenID.length > 8) {
    return `${tokenID.slice(0, 5)}...${tokenID.slice(-4)}`;
  }
  return tokenID;  // If it's not a string, return it as is
};


export const renderBalance = (balance, symbol) => {
  const _balance = parseFloat(balance);
  if (_balance === 0) {
    return `0 ${symbol}`;
  }
  return `${_balance.toFixed(4)} ${symbol}`;
};


export const utils = web3.utils;
