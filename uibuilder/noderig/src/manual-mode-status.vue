<template>
    <div :class="{manual_mode: true, on: on}" @click="sendClick">
        MAN
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
            uibuilder.send({topic: 'op_mode', event: 'toggle_manual_mode'});
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 'manual_mode') {
                if(p.hasOwnProperty('value')) {
                    self.on = p.value;
                }
            }
        });
    }
}
</script>

<style scoped>
.manual_mode {
    color: lightgrey;
}
.manual_mode.on {
    color: black;
}
</style>
