<template>
<div>
    <b-row>
        <b-button class="col-3">Data HF</b-button>
        <frequency class="col-9"></frequency>
    </b-row>
    <!-- <b-row v-show="isOpMode(['data-hf', 'voice-ssh'])" class="mt-2"> -->
    <b-row class="mt-2">
        <tuner-status class="mr-2"></tuner-status>
        <lock-status class="mr-2">></lock-status>
        <pre-amp-status class="mr-2">></pre-amp-status>
        <alc-status class="mr-2">></alc-status>
        <mode-status></mode-status>
    </b-row>
    <s-meter v-show="!tx_on" class="mt-2"></s-meter>
    <swr-meter v-show="tx_on" class="mt-2"></swr-meter>
    <div v-show="tx_on" class="mt-2">
        <alc-meter v-show="meter_switch === 'ALC'"></alc-meter>
        <comp-meter v-show="meter_switch === 'COMP'"></comp-meter>
        <id-meter v-show="meter_switch === 'ID'"></id-meter>
        <po-meter v-show="meter_switch === 'PO'"></po-meter>
        <vdd-meter v-show="meter_switch === 'VDD'"></vdd-meter>
    </div>
    <tx-timer class="mt-2"></tx-timer>
    <!-- <tx-count-down secs="90" warn="30"></tx-count-down> -->
    <power-level class="mt-2 mb-2"></power-level>
    <menu-item :items="['62', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '146', '147']"></menu-item>
</div>
</template>

<script>
module.exports = {
    mixins: [window.noderig.op_mode_mixin],
    components: {
        'menu-item':        httpVueLoader('menu-item.vue'),
        'alc-status':       httpVueLoader('alc-status.vue'),
        'frequency':        httpVueLoader('frequency.vue'),
        'lock-status':      httpVueLoader('lock-status.vue'),
        'mode-status':      httpVueLoader('mode-status.vue'),
        'power-level':      httpVueLoader('power-level.vue'),
        'pre-amp-status':   httpVueLoader('pre-amp-status.vue'),
//      's-meter':          httpVueLoader('s-meter-bootstrap-progressbar.vue'),
//      's-meter':          httpVueLoader('s-meter-html5-progress.vue'),
        's-meter':          httpVueLoader('s-meter-vue-bootstrap-progressbar.vue'),
        'alc-meter':        httpVueLoader('alc-meter.vue'),
        'comp-meter':        httpVueLoader('comp-meter.vue'),
        'id-meter':        httpVueLoader('id-meter.vue'),
        'po-meter':        httpVueLoader('po-meter.vue'),
        'swr-meter':        httpVueLoader('swr-meter.vue'),
        'vdd-meter':        httpVueLoader('vdd-meter.vue'),
        'tuner-status':     httpVueLoader('tuner-status.vue'),
        'tx-timer':         httpVueLoader('tx-timer.vue'),
        'tx-count-down':    httpVueLoader('tx-count-down.vue'),
    },
    data: function() {
        return {
            meter_switch: '',
            tx_on: false,
        }
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            // if(!msg.hasOwnProperty('menu_item')) {
            //     console.log('msg: ', msg);
            // }
            if(msg.hasOwnProperty('transmit')) {
                self.tx_on = msg.transmit;
            }
            else if(msg.hasOwnProperty('meter_switch')) {
                self.meter_switch = msg.meter_switch;
            }
        });
    },
}
</script>

<style scoped>
</style>
