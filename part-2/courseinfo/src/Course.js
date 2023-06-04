import Header from './Header'
import Part from './Part';
import Total from './Total';

const Course = ({course}) => {
    let parts = course.parts; 

    return (
        <div> 
            <Header name={course.name} />
            {parts.map(part => {
                return <Part key={part.id} part={part} />
            })}
            <Total parts={parts}/> 
        </div>   
    )
    
}

export default Course; 