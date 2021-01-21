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
            var p = msg.payload;

            if(p.name === 'comp_meter') {
                if(p.hasOwnProperty('value')) {
                    self.value = p.value;
                }
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
