import { useState } from 'react'
import Display from './Display'
import Button from './Button'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0,0,0])

  function randomSelected () {
    return Math.floor(Math.random() * anecdotes.length)
  }

  const vote = () => {
    const pointsCopy = [ ...points ]
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
  }

  const maxPoints = Math.max(...(Object.values(points)))

  return (
    <div>
      <Display value="Anecdote of the day" />
      {anecdotes[selected]}
      <p>has {points[selected]} votes</p>
      <Button handleClick={() => vote(selected)} text="vote" />
      <Button handleClick={() => setSelected(randomSelected())} text="next anecdote" />
      <br/>
      <Display value="Anecdote with most votes" />
      {maxPoints > 0 ? (
      <div>
        {anecdotes[points.indexOf(maxPoints)]}
        <p>has {maxPoints} votes</p>
      </div>
    ) : (
      <p>No anecdote has a vote</p>
    )}
    </div>
  )
}

export default App