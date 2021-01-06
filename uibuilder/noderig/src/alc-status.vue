
<template>
    <div :class="{'alc-status': true, on: on}" @click="sendClick">
        ALC
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
        uibuilder.send({topic: 'LOCK_EVENT', payload: 'click'});
        },
    },
    mounted() {
        const self = this;

        uibuilder.onChange('msg', msg =>{
            if(msg.hasOwnProperty('alc_status')) {
                console.log('msg: ' + JSON.stringify(msg));

                if(msg.alc_status) {
                    self.on = true;
                }
                else {
                    self.on = false;
                }
            }
        });
    }
}
</script>

<style scoped>
.alc-status {
    color: lightgrey;
}
.alc-status.on {
    color: black;
}
</style>
