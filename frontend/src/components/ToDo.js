import React from 'react'


const ToDoListItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.text}</td>
            <td>{item.date}</td>
            <td>{item.project}</td>
            <td>{item.user}</td>
        </tr>
    )
}

const ToDoList = ({items}) => {
    //console.log(users)
    return (
        <table className="table">
            <tr>
                <th>Id</th>
                <th>Text</th>
                <th>Date</th>
                <th>Project</th>
                <th>Creator</th>
            </tr>
            {items.map((item) => <ToDoListItem item={item} />)}
        </table>
    )
}

export default ToDoList