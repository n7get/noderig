
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
            uibuilder.send({topic: 'LOCK_EVENT', payload: 'click'});
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            if(msg.hasOwnProperty('lock')) {
                self.on = msg.lock;
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
