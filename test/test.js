import { objectToSnakeCase, toSnakeCase } from '@thinknimble/tn-utils'
import assert from 'assert'

import Model, { fields } from '../src/models'
import ModelAPI from '../src/models'

// Create classes for tests. This serves as a smoke test
// for the basic syntax.
class MockApiClient {}

class PersonAPI extends ModelAPI {
  static client = new MockApiClient()
}
class ReadOnlyPerson extends Model {
  static id = new fields.IdField({ readOnly: true })
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
      console.log(ReadOnlyPerson.getReadOnlyFields())
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
  describe('#newCopy & #duplicate', function () {
    class PersonLastUnique extends Person {
      static lastName = new fields.CharField({ unique: true })
      static bestFriend = new fields.ModelField({ ModelClass: PersonLastUnique })
      static allFriends = new fields.ModelField({ ModelClass: PersonLastUnique, many: true })
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

    const testPersonFS = {
      first_name: 'newfirst2',
      last_name: 'newlast2',
      best_friend: null,
      all_friends: [testPersonDict1],
      is_cool: false,
    }
    it('should create a new copy of the entity with new values for any unique fields (id is unique by default)', () => {
      const person = Person.fromAPI(testPersonDict)
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
    it('should create a new copy of the entity with new value for lastname of parent and nested models that is set to unique', () => {
      const person = PersonLastUnique.fromAPI({ ...testPersonFS })
      const copyPerson = person.newCopy()
      assert.notEqual(person.allFriends[0].lastName, copyPerson.allFriends[0].lastName)
    })
    it('should create an exact replica of the entity', () => {
      const person = Person.fromAPI(testPersonDict)
      const spreadPerson = person.duplicate()
      assert.equal(person.firstName, spreadPerson.firstName)
    })
    it('should create an exact replica of the entity with a model array', () => {
      const person = Person.fromAPI(testPersonFS)
      const spreadPerson = person.duplicate()
      assert.equal(person.allFriends[0].lastName, spreadPerson.allFriends[0].lastName)
    })

    it('should have replica with a different object in memory', () => {
      const person = Person.fromAPI(testPersonDict)
      const spreadPerson = person.duplicate()
      person.firstName = 'test'
      assert.notEqual(person.firstName, spreadPerson.firstName)
    })

    it('should create an exact replica of the entity with a model array', () => {
      const person = Person.fromAPI(testPersonFS)
      const spreadPerson = person.duplicate()
      person.allFriends[0].lastName = 'test'
      assert.notEqual(person.allFriends[0].lastName, spreadPerson.allFriends[0].lastName)
    })
    it('should have replica with the same object in memory', () => {
      const person = Person.fromAPI(testPersonDict)
      const spreadPerson = person
      person.firstName = 'test'
      assert.equal(person.firstName, spreadPerson.firstName)
    })
    it('should be able to apply copy logic to 100 new instances', () => {
      const person = Person.fromAPI(testPersonDict)
      let count = 0

      let people = []
      while (count <= 99) {
        // create 100 new persons
        people.push(person.newCopy())
        count++
      }
      for (let i = people.length - 1; i >= 0; i--) {
        if (i == 0) {
          person.bestFriend = people[0]
        } else {
          people[i - 1].bestFriend = people[i]
        }
      }
      let iterations = 0
      let friend = null
      while (iterations <= people.length) {
        if (iterations == 0) {
          friend = person.bestFriend
        } else {
          friend = friend.bestFriend
        }
        iterations++
      }
    })
  })
  describe('#toDict', function () {
    const testPersonDict1 = {
      first_name: 'newfirst',
      last_name: 'newlast',
      best_friend: null,
      all_friends: null,
      is_cool: false,
      is_hawt: true,
      is_glam: true,
    }
    const testPersonDict2 = {
      first_name: 'newfirst1',
      last_name: 'newlast',
      best_friend: null,
      all_friends: null,
      is_cool: false,
      is_hawt: true,
      is_glam: true,
    }
    const testPersonDict3 = {
      first_name: 'newfirst',
      last_name: 'newlast',
      best_friend: testPersonDict1,
      all_friends: null,
      is_cool: false,
      is_hawt: true,
      is_glam: true,
    }
    const testPersonDict4 = {
      first_name: 'newfirst',
      last_name: 'newlast',
      best_friend: null,
      all_friends: [testPersonDict2],
      is_cool: false,
      is_hawt: true,
      is_glam: true,
    }
    const testPersonDict = {
      first_name: 'newfirst',
      last_name: 'newlast',
      best_friend: null,
      all_friends: null,
      is_cool: false,
      is_hawt: true,
      is_glam: true,
    }

    it('# should return a dictionary representation of a model', () => {
      const person = Person.fromAPI(testPersonDict)
      const personDict = person.toDict()

      Object.entries(personDict).forEach(([k, v]) => {
        if (Object.keys(testPersonDict).includes(toSnakeCase(k))) {
          assert.equal(testPersonDict[toSnakeCase(k)], v)
        }
      })
    })
    it('# should return a dictionary representation of a model including th model field', () => {
      const person = Person.fromAPI(testPersonDict3)
      const personDict = person.toDict()

      Object.entries(personDict).forEach(([k, v]) => {
        if (Object.keys(testPersonDict3).includes(toSnakeCase(k))) {
          if (k != 'bestFriend') {
            assert.equal(testPersonDict3[toSnakeCase(k)], v)
          } else {
            Object.entries(personDict['bestFriend']).forEach(([bk, bv]) => {
              if (Object.keys(testPersonDict3['best_friend']).includes(toSnakeCase(bk))) {
                assert.equal(testPersonDict3['best_friend'][toSnakeCase(bk)], bv)
              }
            })
          }
        }
      })
    })
    it('# should return a dictionary representation of a model including th model ARRAY field', () => {
      const person = Person.fromAPI(testPersonDict4)
      const personDict = person.toDict()

      Object.entries(personDict).forEach(([k, v]) => {
        if (Object.keys(testPersonDict4).includes(toSnakeCase(k))) {
          if (k != 'allFriends') {
            assert.equal(testPersonDict4[toSnakeCase(k)], v)
          } else {
            personDict['allFriends'].forEach((friend, i) => {
              Object.entries(friend).forEach(([k, v]) => {
                if (Object.keys(testPersonDict4['all_friends'][i]).includes(toSnakeCase(k))) {
                  assert.equal(testPersonDict4['all_friends'][i][toSnakeCase(k)], v)
                }
              })
            })
          }
        }
      })
    })
  })
})
