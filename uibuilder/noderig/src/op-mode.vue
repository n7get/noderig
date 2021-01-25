<template>
    <b-button @click="clicked" @dblclick="dblclicked">{{ op_mode }}</b-button>
</template>

<script>
module.exports = {
    data: function() {
        return {
            op_mode: 'Op Mode',
        }
    },
    methods: {
        clicked: function(e) {

        },
        dblclicked: function(e) {

        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 'op_mode') {
console.log('p: ', p);
                self.op_mode = p.value;
            }
        });
    },
};