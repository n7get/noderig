<template>
    <div :class="{'alc-status': true, on: on}">
        ALC
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            on: false
        }
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg =>{
            if(msg.hasOwnProperty('alc_status')) {
                self.on = msg.alc_status;
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
