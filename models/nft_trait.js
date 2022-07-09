export const nft_traitSchema = {
    type: 'object',
    properties: {
        trait_type: {
            type: 'string',
        },
        value: {
            type: 'string',
        },
        display_type: {
            type: 'string',
        },
        min_value: {
            type: 'string',
        },
        max_value: {
            type: 'string',
        },
        trait_count: {
            type: 'string',
        }

    },
    required: ['trait_type', 'value']
};

