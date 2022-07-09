export const nft_collection_royaltySchema = {
    type: 'object',
    properties: {
        percentage: {
            type: 'string',
        },
        address: {
            type: 'string',
        },
    },
    required: ['percentage', 'address'],
};