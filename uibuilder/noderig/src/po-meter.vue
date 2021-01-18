<template>
<b-row>
    <div class="col-4">
        PO:
    </div>
    <div class="po-meter col mt-1">
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
            if(msg.hasOwnProperty('po_meter')) {
                self.value = msg.po_meter;
            }
        });
    }
}
</script>

<style scoped>
.po-meter {
    padding-left:0;
}
</style>
