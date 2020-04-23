import assert from 'assert'

import Model, { fields } from '../src/models'

// const API = require('./api')

describe('Model', function () {
  class Person extends Model {
    static id = new fields.IdField()
    static name = new fields.CharField()
  }

  describe('#constructor()', function () {
    const person = new Person()

    it('should have keys for each static property', function () {
      assert.equal(Object.keys(person).length, 2);
    })
  })
})

