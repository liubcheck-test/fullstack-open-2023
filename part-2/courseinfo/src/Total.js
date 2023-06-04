const Total = ({parts}) => {
    const exercisesTotal = parts.map(x => x.exercises)
        .reduce((a,b) => a+b, 0)
    return <b>total of {exercisesTotal} exercises</b>
}

export default Total; 