import React, { Fragment, useEffect, useState, useReducer } from 'react'
import { initialState, reducer } from '../reducers/reducer';

export default () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [title, setTitle] = useState("");
    const [dueList, setDueList] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const seconds = Date.now();
            state.todos.forEach(item => {
                if (item.due < seconds) {
                    if (!item.id) return;
                    setDueList([...dueList, item.id]);
                }
            })
         }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, [state])

    const handleSubmit = e => {
        e.preventDefault();
        if (title.trim() === "") return;
        dispatch({ type: "ADD_TODO", title })
        setTitle('');
    }

    const handleClickedItem = e => {
        e.preventDefault();
        const { id } = e.target.dataset;
        dispatch({ type: "TOGGLE_COMPLETE", id })
    }

    return (
        <Fragment>
            <ul>
                {
                    state.todos.map(todo => {
                        return (<li
                            key={todo.id}
                            data-id={todo.id}
                            onClick={e => handleClickedItem(e)}
                            className={`${todo.completed ? 'completed' : ''} ${dueList.includes(todo.id) ? "due" : ""}`}
                        >{todo.item}</li>)
                    })
                }
            </ul>
            <form onSubmit={handleSubmit}>
                <input type='text' value={title} onChange={e => setTitle(e.target.value)} placeholder='Item Name' />
                <input type='submit' value='Submit' />
                <button onClick={e => {
                    e.preventDefault();
                    dispatch({ type: "CLEAR_COMPLETED" })
                }}>Clear Completed</button>
            </form>
        </Fragment>
    )
}
