export const nft_collection_contractSchema = {
    type: 'object',
    properties: {
        address : {
            type: 'string',
        },
        type : {
            type: 'string',
        },
        sybol :{
            type: 'string',
        },
        supply :{
            type: 'number',
        },
        mints :{
            type: 'number',
        },
    },
    required: ['address', 'type', 'symbol', 'supply', 'mints'],
};