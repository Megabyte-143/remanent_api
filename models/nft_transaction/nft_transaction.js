import { nft_collection_royaltySchema } from '../nft_collection_royalty.js';
import { nft_collection_contractSchema } from '../nft_collection_contract.js';

class nft_transactionSchema {
    data = {

        type: 'object',
        properties: {
            id: {
                type: 'string',
                format: 'uuid',
            },
            token_id: {
                type: 'string',
            },
            nft_asset_id: {
                type: 'string',
            },
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
            marketplace: {
                type: 'string',
            },
            price: {
                type: 'string',
            },
            type: {
                enum: ['MINT', 'LIST', 'TRANSFER', 'PURCHASE', 'DELIST', 'SELL'],
            },
            signature: {
                type: 'string',
            },
            royalty: {
                type: nft_collection_royaltySchema,
            },
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