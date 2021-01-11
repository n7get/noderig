<template>
<b-row v-show="!tx_on">
    <div class="col-4">
        S-Meter:
    </div>
    <div class="s-meter col mt-1">
        <b-progress :value="value" max="255"></b-progress>
    </div>
</b-row>
</template>

<script>
module.exports = {
    data() {
        return {
            value: 0,
            tx_on: false,
        }
    },
    mounted() {
        const self = this;

        uibuilder.onChange('msg', msg => {
            if(msg.hasOwnProperty('s_meter')) {
                self.value = parseInt(msg.s_meter, 10);
            }
            
            if(msg.hasOwnProperty('transmit')) {
                self.tx_on = msg.transmit;
            }
        });
    }
}
</script>

<style scoped>
.s-meter {
    padding-left:0;
}
</style>
