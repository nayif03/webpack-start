const moment = require("moment")
class CountDown {
  constructor(selector, endDate) {
    this.element = this.selectEle(selector)
    this.now = moment()
    this.endDate = moment(endDate)
    this.duration = this.endDate - this.now
    this.updateInterval = 1000
    this.elements = {
      days: this.selectEle(".days", this.element),
      hoursEle: this.selectEle(".hours", this.element),
      minutesEle: this.selectEle(".minutes", this.element),
      secondsEle: this.selectEle(".seconds", this.element)
    }
    this.time = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }

    this.updateHandler()
  }

  selectEle(selector, parentElement) {
    if (parentElement) {
      return parentElement.querySelector(selector)
    }
    return document.querySelector(selector)
  }

  updateHandler() {
    setInterval(() => {
      this.duration = moment.duration(
        this.duration - this.updateInterval,
        "milliseconds"
      )

      this.time.days = this.duration.days() + this.duration.years() * 365
      this.time.hours = this.duration.hours()
      this.time.minutes = this.duration.minutes()
      this.time.seconds = this.duration.seconds()
      this.render()
    }, this.updateInterval)
  }

  template() {
    const { days, hours, minutes, seconds } = this.time
    return `
      <span class="days">${days}</span> Days :
      <span class="hours">${hours}</span> Hours :
      <span class="minutes">${minutes}</span> Minutes :
      <span class="seconds">${seconds}</span> Seconds
    `
  }

  render() {
    this.element.innerHTML = this.template()
  }
}

new CountDown("#countdown", { year: 2020, month: 2, day: 4, hour: 16 })
