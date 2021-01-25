
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
        sendClick: function(e) {
            uibuilder.send({topic: 'tuner', event: 'click'});
        },
        sendDblclick: function(e) {
            uibuilder.send({topic: 'tuner', event: 'dblclick'});
        }
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg =>{
            var p = msg.payload;

            if(p.name === 'tuner') {
                if(p.hasOwnProperty('value')) {
                    self.on = p.value === 'on';
                }
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
