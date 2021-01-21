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
            var p = msg.payload;

            if(p.event === 'alc_status') {
                self.on = p.value;
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
