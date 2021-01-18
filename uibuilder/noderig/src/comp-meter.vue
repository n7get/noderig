<template>
<b-row>
    <div class="col-4">
        COMP:
    </div>
    <div class="comp-meter col mt-1">
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
            if(msg.hasOwnProperty('comp_meter')) {
                self.value = msg.comp_meter;
            }
        });
    }
}
</script>

<style scoped>
.comp-meter {
    padding-left:0;
}
</style>
