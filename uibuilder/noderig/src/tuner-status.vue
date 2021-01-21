
<template>
    <div :class="{tuner: true, on: on}" @click="sendClick" @dblclick="sendDblclick">
        TUNER
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            on: false
        }
    },
    methods: {
        sendClick: e => {
            uibuilder.send({topic: 'tuner', payload: 'click'});
        },
        sendDblclick: e => {
            uibuilder.send({topic: 'tuner', payload: 'dblclick'});
        }
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg =>{
            var p = msg.payload;

            if(p.event === 'tuner') {
                self.on = p.value === 'on';
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
