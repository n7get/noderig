<template>
<div class="s-meter" v-show="!tx_on">
    <div>
        S-Meter:
    </div>
    <b-progress :value="value" max="255"></b-progress>
<div>
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
        width: 100%;
    }
</style>
