import assert from 'assert'

import Model, { fields } from '../src/models'
import ModelAPI from '../src/models'

// Create classes for tests. This serves as a smoke test
// for the basic syntax.
class MockApiClient {}

class PersonAPI extends ModelAPI {
  static client = new MockApiClient()
}

class Person extends Model {
  //
  // static api = PersonAPI.create(Person)

  // fields
  static id = new fields.IdField()
  static firstName = new fields.CharField()
  static lastName = new fields.CharField()
  static bestFriend = new fields.ModelField({ ModelClass: Person })
  static allFriends = new fields.ModelField({ ModelClass: Person, many: true })
  static isCool = new fields.BooleanField({ defaultVal: true })
  static isHawt = new fields.BooleanField({ defaultVal: false })
  static isGlam = new fields.BooleanField({})
}

describe('Model', function () {
  describe('#constructor()', function () {
    // Create a person instance and remove the private '_fields' prop for testing

    it('should have a private `_fields` object with references to the field instances', function () {
      const person = new Person()
      assert.equal(person._fields['id'], Person.id)
      assert.equal(person._fields['firstName'], Person.firstName)
      assert.equal(person._fields['lastName'], Person.lastName)
    })

    it('should have keys for each static property without any args', function () {
      const person = new Person()
      delete person._fields

      // One for each model field

      assert.equal(Object.keys(person).length, 8)
    })

    it('should set the correct values for fields from args', function () {
      const args = {
        id: '12345',
        firstName: 'William',
        lastName: 'Hackerman',
        bestFriend: null,
        allFriends: null,
        isCool: false,
        isHawt: false,
        isGlam: false,
      }
      const person = new Person(args)
      delete person._fields

      // One for each model field
      assert.equal(Object.keys(person).length, 8)

      // See if these are equal (minus the private '_fields' prop)
      assert.equal(JSON.stringify(person), JSON.stringify(args))
    })
  })

  describe('#create()', function () {
    it('should create a person instance with fields for each static property without args', function () {
      const person = Person.create()
      delete person._fields

      // One for each model field, plus a private '_fields' prop
      assert.equal(Object.keys(person).length, 8)
    })

    it('should create a person instance with correct field values from args', function () {
      const args = {
        id: '12345',
        firstName: 'William',
        lastName: 'Hackerman',
        bestFriend: null,
        allFriends: null,
        isCool: false,
        isHawt: false,
        isGlam: false,
      }
      const person = Person.create(args)
      delete person._fields

      // One for each model field, plus a private '_fields' prop
      assert.equal(Object.keys(person).length, 8)

      // See if these are equal (minus the private '_fields' prop)
      assert.equal(JSON.stringify(person), JSON.stringify(args))
    })
  })

  describe('#fromAPI()', function () {
    it('should create a person instance with fields for each static property without args', function () {
      const person = Person.fromAPI()
      delete person._fields

      // One for each model field, plus a private '_fields' prop
      assert.equal(Object.keys(person).length, 8)
    })

    it('should camelCase args and create a person instance with fields for each static property', function () {
      const args = {
        id: '12345',
        first_name: 'William',
        last_name: 'Hackerman',
        best_friend: null,
        all_friends: null,
        is_cool: false,
        is_hawt: false,
        is_glam: false,
      }
      const person = Person.fromAPI(args)
      delete person._fields

      // One for each model field, plus a private '_fields' prop
      assert.equal(Object.keys(person).length, 8)

      // Field names should be mismatched from JSON
      assert.notEqual(JSON.stringify(person), JSON.stringify(args))

      // Field names should now be camelCased
      assert.equal(
        JSON.stringify(person),
        JSON.stringify({
          id: '12345',
          firstName: 'William',
          lastName: 'Hackerman',
          bestFriend: null,
          allFriends: null,
          isCool: false,
          isHawt: false,
          isGlam: false,
        }),
      )
    })

    it('should create nested Person models for friends data', function () {
      const args = {
        id: '12345',
        first_name: 'William',
        last_name: 'Hackerman',
        best_friend: {
          id: '11111',
          first_name: 'Barack',
          last_name: 'Obama',
        },
        all_friends: null,
        all_friends: [
          {
            id: '11111',
            first_name: 'Barack',
            last_name: 'Obama',
          },
        ],
      }
      const person = Person.fromAPI(args)
      delete person._fields
      delete person.bestFriend._fields
      person.allFriends.forEach((f) => delete f._fields)

      // One for each model field, plus a private '_fields' prop
      assert.equal(Object.keys(person).length, 8)

      // Field names should be mismatched from JSON
      assert.notEqual(JSON.stringify(person), JSON.stringify(args))

      // Field names should now be camelCased
      assert.equal(
        JSON.stringify(person),
        JSON.stringify({
          id: '12345',
          firstName: 'William',
          lastName: 'Hackerman',

          bestFriend: {
            id: '11111',
            firstName: 'Barack',
            lastName: 'Obama',

            bestFriend: null,
            allFriends: null,
            isCool: true,
            isHawt: false,
            isGlam: false,
          },
          allFriends: [
            {
              id: '11111',
              firstName: 'Barack',
              lastName: 'Obama',

              bestFriend: null,
              allFriends: null,
              isCool: true,
              isHawt: false,
              isGlam: false,
            },
          ],
          isCool: true,
          isHawt: false,
          isGlam: false,
        }),
      )
    })
    it('should create a Person Model with boolean values set to default', () => {
      const args = {
        id: '12345',
        firstName: 'William',
        lastName: 'Hackerman',
        bestFriend: null,
        allFriends: null,
      }
      const person = new Person(args)
      assert.equal(true, person.isCool)
      assert.equal(false, person.isHawt)
      assert.equal(false, person.isGlam)
    })
    it('should create a Person Model with boolean values overridden', () => {
      const args1 = {
        id: '12345',
        firstName: 'William',
        lastName: 'Hackerman',
        bestFriend: null,
        allFriends: null,
        isCool: false,
        isHawt: true,
        isGlam: true,
      }
      const person1 = new Person(args1)
      assert.equal(false, person1.isCool)
      assert.equal(true, person1.isHawt)
      assert.equal(true, person1.isGlam)
    })
  })
  describe('#newCopy', function () {
    class PersonLastUnique extends Person {
      static lastName = new fields.CharField({ unique: true })
      static bestFriend = new fields.ModelField({ ModelClass: PersonLastUnique })
    }
    const testPersonDict = {
      first_name: 'newfirst',
      last_name: 'newlast',
      best_friend: null,
      all_friends: null,
      is_cool: false,
    }
    const testPersonDict1 = {
      first_name: 'newfirst1',
      last_name: 'newlast1',
      best_friend: null,
      all_friends: null,
      is_cool: false,
    }
    const testPersonDict2 = {
      first_name: 'newfirst2',
      last_name: 'newlast2',
      best_friend: null,
      all_friends: null,
      is_cool: false,
    }
    it('should create a new copy of the entity with new values for any unique fields (id is unique by default)', () => {
      const person = new Person(testPersonDict)
      const newCopyOfPerson = person.newCopy()
      assert.notEqual(person.id, newCopyOfPerson.id)
    })
    it('should create a new copy of the entity with new value for lastname that is set to unique', () => {
      const person = PersonLastUnique.fromAPI(testPersonDict1)
      const newCopyOfPerson = person.newCopy()
      assert.notEqual(person.lastName, newCopyOfPerson.lastName)
    })
    it('should create a new copy of the entity with new value for lastname of parent and nested models that is set to unique', () => {
      const person = PersonLastUnique.fromAPI({ ...testPersonDict, best_friend: testPersonDict1 })
      const copyPerson = person.newCopy()
      assert.notEqual(person.bestFriend.lastName, copyPerson.bestFriend.lastName)
    })
  })
})
