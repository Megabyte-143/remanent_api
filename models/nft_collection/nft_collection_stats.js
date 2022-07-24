export const nft_collection_statsSchema = {
    type: 'object',
    properties: {
        voulme: {
            type :'string'
        },
        marketcap: {
            type :'string',
        },
        floor_price: {
            type :'string',
        },
        currency : {
            type :'string',
        },
    },
    required: ['voulme', 'marketcap', 'floor_price', 'currency'],
};