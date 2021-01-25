
<template>
    <div :class="{lock: true, on: on}" @click="sendClick">
        LOCK
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
            uibuilder.send({topic: 'lock', event: 'click'});
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 'lock') {
                if(p.hasOwnProperty('value')) {
                    self.on = p.value;
                }
            }
        });
    }
}
</script>

<style scoped>
.lock {
    color: lightgrey;
}
.lock.on {
    color: black;
}
</style>
