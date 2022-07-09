import { nft_traitSchema } from '../nft_trait.js';
import { marketplaceSchema } from '../marketplace.js';
import nft_assetSchema  from '../nft_asset/nft_asset.js';
import { nft_collection_statsSchema } from './nft_collection_stats.js';
import { nft_collection_contractSchema } from '../nft_collection_contract.js';
import { nft_collection_royaltySchema } from '../nft_collection_royalty.js';

class nft_collectionSchema {
    data = {
        type: 'object',
        properties: {
            id: {
                type: 'string'
            },
            chain: {
                type: 'string'
            },
            minted_at: {
                type: 'string',
                format: 'date-time'
            },
            //! SYMBOL, SUPPLY, MINTS
            contract: {
                type: nft_collection_contractSchema
            },
            name:
            {
                type: 'string',
            },
            description: {
                type: 'string',

            },
            logo_url: {
                type: 'string',
            },
            banner_url: {
                type: 'string',
            },
            // ! DATA NOT FOUND
            creators: {
                type: [String],
            },
            // ! DATA NOT FOUND
            editors: {
                type: [String],
            },
            owners: {
                type: [String],
            },
            // ! DATA NOT FOUND
            stats: {
                type: nft_collection_statsSchema,
            },
            traits: {
                type: [nft_traitSchema],
            },
            // ! Need to revise
            status: {
                type: 'string',
                enum: ['ADDED', 'PROCESSING', 'PENDING', 'REFRESHED_RECENTLY']
            },
            marketplaces: {
                type: [marketplaceSchema],
            },
            // ! Need to be revise
            royalty: {
                type: nft_collection_royaltySchema,
            },
            // ! Need to be revise
            assets: {
                type: [nft_assetSchema],
                name: nft_assetSchema.name,
                token_id: nft_assetSchema.token_id,
            },
        },
        required: ['id', 'chain', 'minted_at', 'contract', 'creators', 'editors', 'owners', 'stats', 'traits', 'status', 'royalty', 'assets'],
    }
};

export default nft_collectionSchema;