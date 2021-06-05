import { Builder, By, until } from 'selenium-webdriver'
import firefox from 'selenium-webdriver/firefox'
import 'geckodriver'

const getFirefoxDriver = () => {
  return new Builder().forBrowser('firefox')
    .setFirefoxOptions(new firefox.Options().headless())
    .build()
}

class LocationPage {
  constructor (driver) {
    this.driver = driver
    this.localityBy = By.css('#locality')
  }

  async localityName () {
    await this.driver.wait(until.elementLocated(this.localityBy))
  }
}

class LoadingPage {
  constructor (driver) {
    this.driver = driver
    this.loadingIconBy = By.css('#loading-icon')
  }

  async displayLoadingIcon () {
    await this.driver.wait(until.elementLocated(this.loadingIconBy))
    return new LocationPage(this.driver)
  }
}

class SearchPage {
  constructor (driver) {
    this.driver = driver
    this.inputBy = By.css('input[type="text"]')
    this.buttonBy = By.css('#search-button')
  }

  async searchLocation (text) {
    await this.driver.findElement(this.inputBy).sendKeys(text)
    await this.driver.findElement(this.buttonBy).click()
    return new LoadingPage(this.driver)
  }
}

const url = 'http://localhost:3010'

describe('app', () => {
  let driver
  beforeAll(async () => {
    driver = await getFirefoxDriver()
  })
  afterAll(async () => {
    await driver.quit()
  })

  it('should be able to search for location', async () => {
    await driver.get(url)

    const searchPage = new SearchPage(driver)
    const loadingPage = await searchPage.searchLocation('Los Angeles')
    const locationPage = await loadingPage.displayLoadingIcon()
    await locationPage.localityName()
  })
})
