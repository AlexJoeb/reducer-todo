import moment from 'moment';

export const initialState = {
    todos: [
        {
            item: 'Learn about reducers',
            completed: false,
            id: 3892987589,
            due: moment().add(5, 'seconds'),
        }
    ],
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TODO":
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        item: action.title,
                        completed: false,
                        id: Date.now(),
                        due: moment().add(5, 'seconds'),
                    }
                ]
            };
        case "TOGGLE_COMPLETE":
            return {
                ...state,
                todos: state.todos.map(item => item.id === parseInt(action.id) ? {
                    item: item.item,
                    completed: !item.completed,
                    id: item.id,
                    due: item.due,
                } : item),
            }
        case "CLEAR_COMPLETED":
            return {
                ...state,
                todos: state.todos.filter(item => !item.completed),
            }
        default:
            return state;
    }
} 