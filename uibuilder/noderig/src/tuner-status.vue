
<template>
    <div :class="{tuner: true, on: on}" @click="sendClick" @dblclick="sendDblclick">
        TUNER
    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            on: false
        }
    },
    methods: {
        sendClick: e => {
            uibuilder.send({topic: 'TUNER_EVENT', payload: 'click'});
        },
        sendDblclick: e => {
            uibuilder.send({topic: 'TUNER_EVENT', payload: 'dblclick'});
        }
    },
    mounted() {
        const self = this;

        uibuilder.onChange('msg', msg =>{
            if(msg.hasOwnProperty('tuner')) {
                self.on = msg.tuner === 'on';
            }
        });
    }
}
</script>

<style scoped>
.tuner {
    color: lightgrey;
}
.tuner.on {
    color: black;
}
</style>
