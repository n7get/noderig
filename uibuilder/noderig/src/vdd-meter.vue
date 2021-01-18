<template>
<b-row>
    <div class="col-4">
        VDD:
    </div>
    <div class="vdd-meter col mt-1">
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
            if(msg.hasOwnProperty('vdd_meter')) {
                self.value = parseInt(msg.vdd_meter, 10);
            }
        });
    }
}
</script>

<style scoped>
.vdd-meter {
    padding-left:0;
}
</style>
