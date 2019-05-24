<template>
    <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>Credits:
            <a href="http://twitter.com/cburgdorf">Christoph Burgdorf</a>,
            <a href="http://ericbidelman.com">Eric Bidelman</a>,
            <a href="http://jacobmumm.com">Jacob Mumm</a>,
            <a href="http://blog.igorminar.com">Igor Minar</a>
        </p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
</template>

<script>
export default {
    name: 'TodosFooterInfo'

}
</script>

<style>
    .info {
        margin: 80px auto;
        color: #bfbfbf;
        font-size: 10px;
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
        text-align: center;
    }

    .info>p {
        line-height: 1;
    }

    .info>p>a {
        color: inherit;
        text-decoration: none;
        font-weight: 400;
    }
</style>


