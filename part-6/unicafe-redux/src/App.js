import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { incrementGood, incrementOk, incrementBad, resetCounters } from "./reducer"

const App = () => {
  const dispatch = useDispatch()
  const { good, ok, bad } = useSelector((state) => state)

  const handleGoodClick = () => {
    dispatch(incrementGood())
  }

  const handleOkClick = () => {
    dispatch(incrementOk())
  }

  const handleBadClick = () => {
    dispatch(incrementBad())
  }

  const handleZeroClick = () => {
    dispatch(resetCounters())
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodClick}>Good</button>
      <button onClick={handleOkClick}>Ok</button>
      <button onClick={handleBadClick}>Bad</button>
      <button onClick={handleZeroClick}>Reset</button>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Ok: {ok}</p>
      <p>Bad: {bad}</p>
    </div>
  )
}

export default App
