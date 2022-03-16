import {
  jest,
  expect,
  describe,
  test,
  beforeEach
} from '@jest/globals'
import config from '../../../server/config.js'
import {
  Controller
} from '../../../server/controller.js'
import {
  Service
} from '../../../server/service'

const {
  pages,
  location,
  constants: {
    CONTENT_TYPE
  }
} = config

describe('#Controller - test site for api response', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.clearAllMocks()
  })

  test(`should execute getFileStream`, async () => {

    jest.spyOn(
      Service.prototype,
      Service.prototype.getFileStream.name,
    ).mockResolvedValue()
    
    const controller = new Controller
    await controller.getFileStream(pages.homeHTML)

    expect(Service.prototype.getFileStream).toBeCalledWith(pages.homeHTML)
  
  })
  
})