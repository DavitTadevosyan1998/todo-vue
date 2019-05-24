<template>
    <b-container>
        <h1 class="text-center">todos</h1>
        <div class="todos">
            <div class="text-center">
                <input @keyup.enter="saveText" type="text" v-model="text" id="addText" placeholder="What needs to be done?">
            </div>
            <div v-if="todos.length > 0">
                <todos-items :todos="todos" @modified="modified"></todos-items>
            </div>
        </div>
        <todos-footer-info></todos-footer-info>
    </b-container>
</template>

<script>
import TodosItems from './TodosItems'
import TodosFooterInfo from './TodosFooterInfo'

export default {
    name: 'TodosHeader',
    components:{
        TodosItems,
        TodosFooterInfo
    },
    data(){
        return{
            text:'',
            id:0,
            todos: [],
        }
    },
    methods:{
        saveText(){
            if (this.text.trim().length == 0) {
                return;
            }
            this.todos.push({
                id: this.id,
                text: this.text,
                comleted: false,
                editing: false,
                hover: false,
                filter: 'all',
            })
            this.text = '';
            this.id++
        },
        modified(data) {
            this.todos = data; 
        }
    }
}
</script>


<style>
    #body h1{
        width: 100%;
        font-size: 100px;
        font-weight: 400;
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
    }

    #body .todos{
        background: #fff;
        margin: 0 auto;
        width: 50%;
        position: relative;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
    }

    #body .todos > div  #addText{
        position: relative;
        width: 100%;
        font-size: 24px;
        opacity: 0.4;
        outline: none;
        padding: 16px 16px 16px 60px;
        border: none;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
    }
</style>