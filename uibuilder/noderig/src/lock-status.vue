
<template>
    <div :class="{lock: true, on: on}" @click="toggle">
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
        toggle: e => {
            uibuilder.send({topic: 'lock', event: 'toggle'});
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
