const Total = ({parts}) => {
    const exercisesTotal = parts[0].exercises 
    + parts[1].exercises 
    + parts[2].exercises
    return <p>Number of exercises {exercisesTotal}</p>
}

export default Total; 