import { reducer, change } from '../../js/functions/searchBarReducer'

describe('searchBarReducer()', () => {
  it('should initialize state to empty string', () => {
    expect(reducer()).toEqual('')
  })
  describe('when action.type is CHANGE', () => {
    it('should return value property of action object', () => {
      const action = change('foo')

      expect(reducer('', action)).toEqual('foo')
    })
  })

  describe('when action.type is anything else', () => {
    it('should return unmodified state', () => {
      const action = {
        type: 'NULL',
        value: 'BAR'
      }

      expect(reducer('FOO', action)).toEqual('FOO')
    })
  })
})
