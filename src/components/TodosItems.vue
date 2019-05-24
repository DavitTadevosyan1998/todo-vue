<template>
    <div>
        <main>
            <input v-if="todos.length > 0" :checked="!anyRemaining" @change="allItems" id="toggle-all" type="checkbox">
            <ul id="todo-list">
                <li v-for="(todo,key) in todosFiltered" :key="'todos_'+key" class="todoLi" :id="'todoLi'+key">
                    <div class="view" @dblclick="editTodo(todo)" @mouseover="todo.hover = true" @mouseleave="todo.hover = false">
                        <input class="toggle" v-model="todo.comleted" type="checkbox">
                        <label :for="'toggleId'+key"  :id="'label'+key" :class="{comleted : todo.comleted}" class="todoLabel">{{ todo.text }}</label>
                        <button v-if="todo.hover" @click="removeTodos(key)" class="destory">x</button>
                    </div>
                    <input type="text" v-if="todo.editing" v-model="todo.text" class="edit" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" v-focus>
                </li>
            </ul>
        </main>
        <footer class="footer">
            <span id="todoCount">{{ remaining }} items left</span>
            <ul class="filters">
                <li>
                    <button :class="{active : filter == 'all'}" @click="filter = 'all'">All</button>
                </li>
                <li>
                    <button :class="{active : filter == 'active'}" @click="filter = 'active'">Active</button>
                </li>
                <li>
                    <button :class="{active : filter == 'completed'}" @click="filter = 'completed'">Completed</button>
                </li>
            </ul>
            <button v-if="showClearCompletedButton" @click="clearCompleted" id="clear-completed">Clear-comleted</button>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'TodosItems',
    props: {
        todos: Array,
        required: true
    },
    data(){
        return{
            filter: 'all',
        }
    },
    directives: {
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
    },
    computed:{
        remaining(){
            return this.todos.filter(todo => !todo.comleted).length
        },
        anyRemaining(){
            return this.remaining !== 0;
        },
        todosFiltered(){
            if (this.filter == 'all') {
                return this.todos
            }else if (this.filter == 'active') {
                return this.todos.filter(todo => !todo.comleted)
            }else if (this.filter == 'completed') {
                return this.todos.filter(todo => todo.comleted)
            }
            return this.todos
        },
        showClearCompletedButton(){
            return this.todos.filter(todo => todo.comleted).length > 0
        }
    },
    methods:{
        editTodo(todo){
            todo.editing = true
        },
        doneEdit(todo){
            todo.editing = false
        },
        allItems(){
            this.todos.forEach( (todo) => todo.comleted = event.target.checked)
        },
        clearCompleted(){
            let newTodos = this.todos.filter(todo => !todo.comleted);
            this.$emit('modified', newTodos)
        },
        removeTodos(index){
            this.todos.splice(index,1)
        },
    }
}
</script>

<style scoped>
    main {
        position: relative;
        z-index: 2;
        border-top: 1px solid #e6e6e6;
    }

    #toggle-all {
        position: absolute;
        top: -58px;
        left: -6px;
        width: 60px;
        height: 34px;
        text-align: center;
        border: none;
        transform: rotate(90deg);
        -webkit-appearance: none;
        outline: none;
    }

    #toggle-all:before {
        content: "❯";
        font-size: 22px;
        color: #e6e6e6;
        padding: 10px 27px 10px 27px;
    }

    #toggle-all.black:before {
        color:#000000;
    }

    #toggle-all:checked:before {
        color: #737373;
    }

    label{
        display: none;
    }

    #todo-list {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    #todo-list li {
        position: relative;
        border: none;
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
        width: 100%;
        height: 70px;
        background-color: white;
        font-size: 24px;
        outline: none;
    }

    #todo-list li:last-child {
        border-bottom: none;
    }

    #todo-list li .toggle {
        text-align: center;
        width: 40px;
        line-height: 70px;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: 10px 0px;
        border: none;
        -webkit-appearance: none;
        outline: none;
    }

    #todo-list li .toggle:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="%23ededed" stroke-width="3"/></svg>');
    }

    #todo-list li .toggle:checked:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="%23bddad5" stroke-width="3"/><path fill="%235dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
    }

    #todo-list li label {
        white-space: pre-line;
        word-break: break-all;
        padding: 15px 60px 15px 15px;
        margin-left: 45px;
        display: block;
        line-height: 35px;
        transition: color 0.4s;
    }

    .comleted{
        text-decoration: line-through;
        color:#e6e6e6;
    }

    #todo-list li .destroy {
        display: none;
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
    }


    button.destory {
        outline: none;
        border: none;
        background: none;
        position: absolute;
        top: 0px;
        right: 10px;
        height: 70px;
        margin: auto 0px;
        font-size: 30px;
        color: #cc9a9a;
        transition: color 0.2s ease-out;
    }

    button.destory:hover{
        color: #af5b5e;
    }

    .edit {
        position: relative;
        top: -72px;
        left: 55px;
        width: 90%;
        font-size: 24px;
        outline: none;
        color: inherit;
        padding: 15px 60px 15px 15px;
        border: 1px solid #999;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
    }

    .footer{
        color: #777;
        padding: 10px 15px;
        height: 50px;
        text-align: center;
        border-top: 1px solid #e6e6e6;
    }

    .footer:before {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 50px;
        overflow: hidden;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6, 
                    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6, 
                    0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }

    #todoCount{
        float: left;
        text-align: left;
    }

    .filters{
        margin: 0;
        padding: 0;
        list-style: none;
        position: absolute;
        right: 0;
        left: 0;
    }

    .filters>li {
        display: inline;
    }

    .filters li button {
        color: inherit;
        margin: -3px;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
        background-color: unset;
        outline: unset;
    }

    #app .active {
        border-color: rgba(175, 47, 47, 0.2);
    }

    #clear-completed{
        color: inherit;
        float: right;
        position: relative;
        line-height: 20px;
        text-decoration: none;
        cursor: pointer;
        border: none;
        background-color: unset;
        outline: none;
    }
</style>
