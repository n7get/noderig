<template>
<b-row v-show="tx_on">
    <div class="col-4">
        SWR:
    </div>
    <div class="swr-meter col mt-1">
        <b-progress :value="value" max="255"></b-progress>
    </div>
</b-row>
</template>

<script>
module.exports = {
    data: function() {
        return {
            value: 0,
            tx_on: false,
        }
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            if(msg.hasOwnProperty('swr_meter')) {
                self.value = parseInt(msg.swr_meter, 10);
            }
            
            if(msg.hasOwnProperty('transmit')) {
                self.tx_on = msg.transmit;
            }
        });
    }
}
</script>

<style scoped>
.swr-meter {
    padding-left:0;
}
</style>
