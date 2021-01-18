<template>
<b-row>
    <div class="col-4">
        IDD:
    </div>
    <div class="ad-meter col mt-1">
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
            if(msg.hasOwnProperty('id_meter')) {
                self.value = msg.id_meter;
            }
        });
    }
}
</script>

<style scoped>
.ad-meter {
    padding-left:0;
}
</style>
