import { nft_traitSchema } from '../nft_trait.js';
import { marketplaceSchema } from '../marketplace.js';


class nft_assetSchema {
    data = {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                format: 'uuid'
            },
            token_id: {
                type: 'string',
            },
            chain: {
                type: 'string',
            },
            minted_at: {
                type: 'string',
                format: 'date-time'
            },
            name: {
                type: 'string',
            },
            description: {
                type: 'string',
            },
            file_url: {
                type: 'string',
            },
            associated_url: {
                type: 'string',
            },
            collection: {
                id: {
                    type: 'string',
                    format: 'uuid'
                },
                name: {
                    type: 'string',
                },
                contract_address: {
                    type: 'string',
                }
            },
            owners: {
                type: [String],
            },
            creators: {
                type: [String],
            },

            traits: {
                type: [nft_traitSchema],
            },
            //! Need to check with the API
            status:
            {
                type: 'string',
                enum: ['LISTED_FOR_BID', 'LISTED_FOR_SALE', 'UNLISTED'],
            },
            //! DATA NOT FOUND
            volume: {
                type: 'string',
            },
            //! DATA NOT FOUND
            volume_currency: {
                type: 'string',
            },
            marketplaces: {
                type: [marketplaceSchema],
            }
        },

        required: ['id', 'token_id', 'chain', 'minted_at', 'collection', 'owners', 'creators', 'traits', 'status', 'volume', 'volume_currency',],
    };
};

export default nft_assetSchema;