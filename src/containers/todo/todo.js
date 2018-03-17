import React from "react";
import { connect } from "react-redux";
import TodoList from "../../components/todo/todoList"
import { addTodo, toggleTodo } from "../../actions"
class Todo extends React.Component {
    activeFilter;
    constructor(props) {
        super(props);
        this.toggleTodo = this.toggleTodo.bind(this);
        this.addTodo = this.addTodo.bind(this);
        this.onFilterClick = this.onFilterClick.bind(this);
        this.state = {
            todos: []
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.todos)
            this.setState({
                todos: nextProps.todos
            })
    }

    toggleTodo(id) {
        this.props.dispatch(toggleTodo(id))
    }

    addTodo(value) {
        if (value)
            this.props.dispatch(addTodo(value))
    }
    onFilterClick(filter) {
        this.activeFilter = filter;
        switch (filter) {
            case "ALL":
                this.setState({
                    todos: this.props.todos
                })
                break;
            case "ACTIVE":
                this.setState({
                    todos: this.props.todos.filter(todo => {
                        return todo.completed === false
                    })
                })
                break;
            case "COMPLETED":
                this.setState({
                    todos: this.props.todos.filter(todo => {
                        return todo.completed === true
                    })
                })
                break;
            default:
                this.setState({
                    todos: this.props.todos
                })
                break;
        }
    }


    render() {
        let input
        const AddTodo = (<form onSubmit={
            (e) => {
                e.preventDefault();
                this.addTodo(input.value);
                input.value = ''
            }
        }>
            <input type="text" ref={node => input = node} />
            <button type="submit" >Add Todo</button>
        </form>)

        const FilterButtons = this.state.todos.length > 0 ? (
            <div className="filters">
                <button type="button" onClick={() => this.onFilterClick('ALL')}>All</button>
                <button type="button" onClick={() => this.onFilterClick('ACTIVE')} >Active</button>
                <button type="button" onClick={() => this.onFilterClick('COMPLETED')} >Completed</button>
            </div>
        ) : null


        return <div>
            {AddTodo}
            {FilterButtons}
            <TodoList todos={this.state.todos} toggleTodo={this.toggleTodo} />
        </div>

    }


}

const mapStateToProps = state => {
    return {
        todos: state.todos
    }
}

export default connect(mapStateToProps, null)(Todo);