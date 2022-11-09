import Pagination, { IPagination } from '../src/ts/pagination'
import assert from 'assert'

describe('Pagination', function () {
  describe('# Pagination Constructor', () => {
    it('Should create a pagination object with defaults', () => {
      let pagination = Pagination.create()
      assert.equal(pagination.size, 25)
      assert.equal(pagination.totalCount, 0)
      assert.equal(pagination.next, null)
      assert.equal(pagination.previous, null)
      assert.equal(pagination.page, 1)
    })
    it('Should create a pagination object with user defined obj', () => {
      let paginationObj = {
        page: 1,
        totalCount: 1,
        next: null,
        previous: null,
        size: 25,
      }
      let pagination = Pagination.create(paginationObj)
      assert.equal(pagination.size, 25)
      assert.equal(pagination.totalCount, 1)
      assert.equal(pagination.next, null)
      assert.equal(pagination.previous, null)
      assert.equal(pagination.page, 1)
    })
    it('Should have a next page', () => {
      let paginationObj = {
        page: 1,
        totalCount: 26,
        next: null,
        previous: null,
        size: 25,
      }
      let pagination = Pagination.create(paginationObj)
      assert.equal(pagination.hasNextPage, true)
    })
    it('Should have a prev page', () => {
      let paginationObj = {
        page: 2,
        totalCount: 26,
        next: null,
        previous: null,
        size: 25,
      }
      let pagination = Pagination.create(paginationObj)
      assert.equal(pagination.hasPrevPage, true)
    })
    it('Should set the correct nextpage', () => {
      let paginationObj = {
        page: 1,
        totalCount: 26,
        next: null,
        previous: null,
        size: 25,
      }
      let pagination = Pagination.create(paginationObj)
      pagination.setNextPage()
      assert.equal(pagination.page, 2)
    })
    it('Should set the correct prevpage', () => {
      let paginationObj = {
        page: 2,
        totalCount: 26,
        next: null,
        previous: null,
        size: 25,
      }
      let pagination = Pagination.create(paginationObj)
      pagination.setPrevPage()
      assert.equal(pagination.page, 1)
    })
  })
})
