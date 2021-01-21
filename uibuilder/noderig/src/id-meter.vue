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
            var p = msg.payload;

            if(p.event === 'id_meter') {
                self.value = p.value;
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
