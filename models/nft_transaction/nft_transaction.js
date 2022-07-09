import { nft_collection_royaltySchema } from '../nft_collection_royalty.js';
import { nft_collection_contractSchema } from '../nft_collection_contract.js';

class nft_transactionSchema {
    data = {

        type: 'object',
        properties: {
            // * Remanent ID
            id: {
                type: 'string',
                format: 'uuid',
            },
            token_id: {
                type: 'string',
            },
            // * Remanent ID
            nft_asset_id: {
                type: 'string',
            },
            // ! TYPE, SYMBOL, Supply, Mints
            contract: {
                type: nft_collection_contractSchema
            },
            sender: {
                type: 'string',
            },
            creator: {
                type: [String],
            },
            receivers: {
                type: [String],
            },
            // ! DATA NOT FOUND
            marketplace: {
                type: 'string',
            },
            // ! DATA NOT FOUND
            price: {
                type: 'string',
            },
            // ! DATA NOT FOUND
            type: {
                enum: ['MINT', 'LIST', 'TRANSFER', 'PURCHASE', 'DELIST', 'SELL'],
            },
            // ! Need to revise => Suggestion => use blockhash or transaction
            signature: {
                type: 'string',
            },
            // ! DATA NOT FOUND
            royalty: {
                type: nft_collection_royaltySchema,
            },
            // ! DATA NOT FOUND
            currency: {
                type: 'string',
            },

            timestamp: {
                type: 'string',
            },
        },
        required: ['id', 'token_id', 'nft_asset_id', 'contract', 'sender', 'creator', 'receivers', 'price', 'type', 'signature', 'royalty', 'currency', 'timestamp'],
    };
}
export default nft_transactionSchema;