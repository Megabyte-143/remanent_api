import fetch from "node-fetch";
import express, { urlencoded, json } from "express";

// * API Models
import nft_assetSchema from './models/nft_asset/nft_asset.js';
import nft_collectionSchema from './models/nft_collection/nft_collection.js';
import nft_transactionSchema from "./models/nft_transaction/nft_transaction.js";

// * Initalize the app
const app = express();
app.use(urlencoded({ extended: false })); // to ignore the extra server data
app.use(json()); // to accept the server data

// * Deployment Ports
const port = 8080;

const baseUrl = 'https://api.simplehash.com/api/v0/nfts/';
const options = {
    method: 'GET',
    headers: { Accept: 'application/json', 'X-API-KEY': process.env.API_KEY }
};

app.get("/v1/web3/nfts/:chain_id/:ownerAdd", async (req, res) => {

    const chain = req.params.chain_id == 137 ? 'polygon' : 'ethereum';
    const url = `${baseUrl}owners?chains=${chain}&wallet_addresses=${req.params.ownerAdd}`;

    let nft_assets = new nft_assetSchema();
    let responseData = [];

    fetch(url, options)
        .then(resData => resData.json())
        .then(data => {
            console.log(data);
            const d = data || [];
            d?.nfts.forEach(nft => {
                nft_assets.data.properties = {
                    token_id: nft.token_id,
                    chain: chain,
                    name: nft.name,
                    file_url: nft.extra_metadata.image_original_url,
                    associated_url: nft.image_url,
                    collection: {
                        name: nft.collection.name,
                        contract_address: nft.contract_address
                    },
                    owners:
                        JSON.parse(JSON.stringify(nft.owners.map(owner => {
                            return (owner.owner_address);
                        })))
                    ,
                    traits:
                        JSON.parse(JSON.stringify(nft.extra_metadata.attributes == null ? {} : nft.extra_metadata.attributes.map(trait => {
                            return ({
                                trait_type: trait.trait_type,
                                value: trait.value,
                            });
                        })))
                    ,
                    minted_at: nft.minted_at,
                    status: nft.status,
                    marketplaces:
                        JSON.parse(JSON.stringify(nft.collection.marketplace_pages == null ? {} : nft.collection.marketplace_pages.map(marketplace => {
                            return ({
                                name: marketplace.marketplace_name,
                                url: marketplace.collection_url,
                            })
                        })))
                };
                responseData.push(nft_assets.data.properties);
            });
            res.send(responseData);
        })
        .catch(err => console.error('error:' + err));
});

app.get('/v1/web3/nfts/transactions/:chain_id/:wallet_address', async (req, res) => {

    const chain = req.params.chain_id == 137 ? 'polygon' : 'ethereum';
    const url = `${baseUrl}transfers/wallets?chains=${chain}&wallet_addresses=${req.params.wallet_address}`;

    let nft_transactions = new nft_transactionSchema();
    let responseData = [];

    fetch(url, options)
        .then(data => data.json())
        .then(data => {
            data.transfers.forEach(transfer => {
                nft_transactions.data.properties = {
                    token_id: transfer.token_id,
                    contract: {
                        address: transfer.contract_address,
                    },
                    sender: transfer.from_address,
                    receivers: transfer.to_address,
                    timestamp: transfer.timestamp,
                };
                responseData.push(nft_transactions.data.properties);
            });
            res.send(responseData);
        })
        .catch(err => console.error('error:' + err));
});

// async function getNftsFromCollection(collectionId) {
//     const url = `{baseUrl}collection/${collectionId}`;
//     let nft_assets = new nft_assetSchema();
//     let responseData = [];

//     fetch(url, options)
//         .then(data => data.json())
//         .then(data => {
//             data.nfts.forEach(nft => {
//                 nft_assets.data.properties = {
//                     name: nft.name,
//                     token_id: nft.token_id,
//                 };
//                 responseData.push(nft_assets.data.properties);
//             });
//             return responseData;
//         }).catch(err => console.error('error:' + err));
// }

app.get('/v1/web3/nft_collections/:chain_id/:contract_address', async (req, res) => {
    const chain = req.params.chain_id == 137 ? 'polygon' : 'ethereum';
    const url = `${baseUrl}${chain}/${req.params.contract_address}`;

    let nft_collection = new nft_collectionSchema();
    let responseData = [];

    fetch(url, options)
        .then(data => data.json())
        .then(data => {
            data.nfts.forEach(nft => {
                // let collection_id = nft_collection.data.properties.collection.collection_id;

                nft_collection.data.properties = {
                    chain: chain,
                    minted_at: nft.created_date,
                    contract: {
                        address: nft.contract_address,
                        type: nft.contract.type,
                    },
                    name: nft.name,
                    description: nft.description,
                    token_id: nft.token_id,
                    logo_url: nft.collection.image_url,
                    banner_url: nft.collection.banner_image_url,
                    owners: JSON.parse(JSON.stringify(nft.owners.map(owner => {
                        return (owner.owner_address);
                    }))),
                    traits:
                        JSON.parse(JSON.stringify(nft.extra_metadata.attributes == null ? {} : nft.extra_metadata.attributes.map(trait => {
                            return ({
                                trait_type: trait.trait_type,
                                value: trait.value,
                            });
                        }))),
                    marketplaces: JSON.parse(JSON.stringify(nft.collection.marketplace_pages.map(marketplace => {
                        return ({
                            name: marketplace.marketplace_name,
                            url: marketplace.collection_url,
                        })
                    }))),
                };
                responseData.push(nft_collection.data.properties);
            });
            res.send(responseData);
        })
        .catch(err => console.error('error:' + err));
});

// * Start the server
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });


export default app;