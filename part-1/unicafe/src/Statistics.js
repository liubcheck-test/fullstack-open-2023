import StatisticLine from './StatisticLine'

const Statistics = ({good, neutral, bad}) => {
    const all = good + neutral + bad;
    const average = (good - bad) / all
    const positive = good / all * 100
  
    if (all > 0) {
      return (
        <table>
            <tbody>
                <tr>
                    <StatisticLine text="good" value={good} />
                </tr>
                <tr>
                    <StatisticLine text="neutral" value={neutral} />
                </tr>
                <tr>
                    <StatisticLine text="bad" value={bad} />
                </tr>
                <tr>
                    <StatisticLine text="all" value={all} />
                </tr>
                <tr>
                    <StatisticLine text="average" value={average} />
                </tr>
                <tr>
                    <StatisticLine text="positive" value={positive + " %"} />
                </tr>
            </tbody>
        </table>
      )
    }
  
    return <div>No feedback given</div>
}

export default Statistics