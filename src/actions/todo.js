let nextTodoId = 0;

export const addTodo = text => ({
    type: 'ADD_TODO',
    text,
    id: nextTodoId++
})

export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id
})