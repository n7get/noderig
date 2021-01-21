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
</div>
</template>

<script>
module.exports = {
    mixins: [window.noderig.op_mode_mixin],
    components: {
        'alc-meter':        httpVueLoader('alc-meter.vue'),
        'alc-meter':        httpVueLoader('alc-meter.vue'),
        'alc-status':       httpVueLoader('alc-status.vue'),
        'comp-meter':        httpVueLoader('comp-meter.vue'),
        'frequency':        httpVueLoader('frequency.vue'),
        'id-meter':         httpVueLoader('id-meter.vue'),
        'lock-status':      httpVueLoader('lock-status.vue'),
        'mode-status':      httpVueLoader('mode-status.vue'),
        'po-meter':         httpVueLoader('po-meter.vue'),
        'power-level':      httpVueLoader('power-level.vue'),
        'pre-amp-status':   httpVueLoader('pre-amp-status.vue'),
        's-meter':          httpVueLoader('s-meter-vue-bootstrap-progressbar.vue'),
        'swr-meter':        httpVueLoader('swr-meter.vue'),
        'tuner-status':     httpVueLoader('tuner-status.vue'),
        'tx-count-down':    httpVueLoader('tx-count-down.vue'),
        'tx-timer':         httpVueLoader('tx-timer.vue'),
        'vdd-meter':        httpVueLoader('vdd-meter.vue'),
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
            var p = msg.payload;

            // if(p.name !== 'menu_item') {
            //     console.log('p: ', p);
            // }
            if(p.name === 'transmit') {
                if(p.hasOwnProperty('value')) {
                    self.tx_on = p.value;
                }
            }
            else if(p.name === 'meter_switch') {
                if(p.hasOwnProperty('value')) {
                    self.meter_switch = p.value;
                }
            }
        });
    },
}
</script>

<style scoped>
</style>
