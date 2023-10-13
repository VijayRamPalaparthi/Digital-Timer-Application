// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {isPaused: false, minutes: 25, seconds: 0}
class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  onIncreaseTime = () => {
    console.log('permission for time change')

    this.setState(prev => ({minutes: prev.minutes + 1}))
  }

  onDecreaseTime = () => {
    const {minutes} = this.state
    if (minutes > 1) {
      console.log('permission for time change')

      this.setState(prev => ({minutes: prev.minutes - 1}))
    }
  }

  onReset = () => {
    console.log('reset-clicked')
    clearInterval(this.intervalId)
    this.setState(initialState)
  }

  renderTimerLimitController = () => {
    const {minutes, seconds} = this.state
    const isButtonsDisabled = seconds > 0
    return (
      <div className="set-time-container">
        <p className="description"> Set Timer Limit</p>
        <div className="increment-container">
          <button
            className="button1"
            type="button"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTime}
          >
            -
          </button>
          <p className="time">{minutes}</p>
          <button
            className="button1"
            type="button"
            onClick={this.onIncreaseTime}
            disabled={isButtonsDisabled}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  incrementTimeElapsedInSeconds = () => {
    const {minutes, seconds} = this.state
    const isTimerCompleted = seconds === minutes * 60
    if (isTimerCompleted) {
      clearInterval(this.intervalId)
    } else {
      this.setState(prev => ({seconds: prev.seconds + 1}))
    }
  }

  onStartOrPauseTimer = () => {
    const {isPaused, seconds, minutes} = this.state
    const isTimerCompleted = seconds === minutes * 60
    if (isTimerCompleted) {
      this.setState({seconds: 0})
    }
    if (isPaused) {
      clearInterval(this.intervalId)
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prev => ({isPaused: !prev.isPaused}))
  }

  render() {
    const {isPaused, minutes, seconds} = this.state
    const totalRemaining = minutes * 60 - seconds
    const minutesValue = Math.floor(totalRemaining / 60)
    const secondsValue = Math.floor(totalRemaining % 60)
    const stringMinutes = minutesValue > 9 ? minutesValue : `0${minutesValue}`
    const stringSeconds = secondsValue > 9 ? secondsValue : `0${secondsValue}`
    return (
      <div className="bg-container">
        <h1 className="heading">Digital Timer </h1>
        <div className="body-container">
          <div className="bg-image-container">
            <div className="round-timer">
              <h1 className="timer">
                {stringMinutes}:{stringSeconds}
              </h1>
              <p className="status"> {isPaused ? 'Running' : 'Paused'} </p>
            </div>
          </div>
          <div className="inputs-container">
            <div className="commands-container">
              <div className="start-container">
                <button
                  type="button"
                  className="button start-container"
                  onClick={this.onStartOrPauseTimer}
                >
                  {isPaused ? (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      alt="pause icon"
                      className="image"
                    />
                  ) : (
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      alt="play icon"
                      className="image"
                    />
                  )}
                  <h1 className="heading-2">{isPaused ? 'Pause' : 'Start'}</h1>
                </button>
              </div>
              <div className="reset-container">
                <button
                  className="button reset-container"
                  type="button"
                  onClick={this.onReset}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="image"
                  />
                  <h1 className="heading-2">Reset</h1>
                </button>
              </div>
            </div>
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
