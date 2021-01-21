<template>
<b-row>
    <div class="col-4">
        ALC:
    </div>
    <div class="alc-meter col mt-1">
        <b-progress :value="value" max="255"></b-progress>
    </div>
</b-row>
</template>

<script>
module.exports = {
    data: function() {
        return {
            value: 0,
        }
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 'alc_meter') {
                if(p.hasOwnProperty('value')) {
                    self.value = p.value;
                }
            }
        });
    }
}
</script>

<style scoped>
.alc-meter {
    padding-left:0;
}
</style>
