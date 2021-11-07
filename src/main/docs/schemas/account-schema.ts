export const accountSchema = {
  type: 'object',
  properties: {
    acccessToken: {
      type: 'string'
    },
    name: {
      type: 'string'
    }
  },
  required: ['acccessToken', 'name']
}
