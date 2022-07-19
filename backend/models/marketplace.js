export const marketplaceSchema = {
    type: 'object',
    properties: {
        name:
        {
            type: 'string',
        },
        url: {
            type: 'string',
        },
        accepted_currencies: {
            type: [String],
        },
    },
};