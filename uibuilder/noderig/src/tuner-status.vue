
<template>
    <div :class="{tuner: true, on: on}" @click="clicked().then(e => sendClick(...e))">
        TUNER
    </div>
</template>

<script>
module.exports = {
    mixins: [window.noderig.double_click_mixin],
    data: function() {
        return {
            on: false,
        }
    },
    methods: {
        sendClick: function(e, v) {
            console.log('sendClick: ' + e + ', value: ' + v);
            if(e === 'click') {
                uibuilder.send({topic: 'tuner', event: 'click'});
            }
            else {
                uibuilder.send({topic: 'tuner', event: 'dblclick'});
            }
        },
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
