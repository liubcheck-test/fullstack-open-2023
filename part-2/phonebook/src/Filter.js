const Filter = ({handleFilterValue}) => {
    return (
        <div>filter shown with: 
            <input onChange={handleFilterValue}/>
        </div>
    )
}

export default Filter; 