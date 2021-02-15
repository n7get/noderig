<template>
<div>
    <div class="d-flex justify-content-between">
        <op-mode></op-mode>
        <frequency class="pt-3"></frequency>
    </div>
    <!-- <b-row v-show="isOpMode(['data-hf', 'voice-ssh'])" class="mt-2"> -->
    <div class="ml-1 my-2 pb-1 border-bottom d-flex justify-content-between w-100">
        <tuner-status></tuner-status>
        <lock-status>></lock-status>
        <pre-amp-status>></pre-amp-status>
        <alc-status>></alc-status>
        <mode-status></mode-status>
        <manual-mode-status></manual-mode-status>
    </div>
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
    <tx-count-down :warn="30"></tx-count-down>
    <s-level label="Power" event="power_level" class="mt-2 mb-2"></s-level>
    <s-level 
        v-show="mode === 'FM' || mode === 'LSB' || mode === 'USB'"
        label="Mic-G"
        event="mic_gain"
        class="mt-2 mb-2"></s-level>
    <s-level
        v-show="mode === 'FM'"
        label="SQ"
        event="squelclh_level"
        class="mt-2 mb-2"></s-level>
    <s-level
        v-show="mode === 'DATA-USB'"
        label="Mon"
        event="monitor_level"
        toggle="monitor_on"
        class="mt-2 mb-2"></s-level>
    <s-level
        v-show="mode === 'LSB' || mode === 'USB'"
        label="NB"
        event="noise_blanker_level"
        toggle="noise_blanker_status"
        :max="10"
        class="mt-2 mb-2"></s-level>
    <s-level
        v-show="mode === 'LSB' || mode === 'USB'"
        label="NR"
        event="noise_reduction_level"
        toggle="noise_reduction"
        :min="1"
        :max="15"
        class="mt-2 mb-2"></s-level>
    <mi-level
        v-show="mode === 'DATA-USB'"
        :no="73"
        label="D-LVL"
        class="mt-2 mb-2"></mi-level>
    <div class="mb-2">
        <div>
        <s-button event="swap_vfo" label="Swap VFO" class="mt-2"></s-button>
        <s-button event="vfo_a_to_b" label="VFO A > B" class="mt-2"></s-button>
        <s-button event="vfo_b_to_a" label="VFO B > A" class="mt-2"></s-button>
        </div>
    </div>
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
        'manual-mode-status': httpVueLoader('manual-mode-status.vue'),
        'mi-level':         httpVueLoader('mi-level.vue'),
        'mode-status':      httpVueLoader('mode-status.vue'),
        'op-mode':          httpVueLoader('op-mode.vue'),
        'po-meter':         httpVueLoader('po-meter.vue'),
        'pre-amp-status':   httpVueLoader('pre-amp-status.vue'),
        's-button':         httpVueLoader('s-button.vue'),
        's-level':          httpVueLoader('s-level.vue'),
        's-meter':          httpVueLoader('s-meter-vue-bootstrap-progressbar.vue'),
//      's-toggle':         httpVueLoader('s-toggle.vue'),
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
            mode: undefined,
        }
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

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
            else if(p.name === 'mode') {
                if(p.hasOwnProperty('value')) {
                    self.mode = p.value;
                }
            }
        });
    },
}
</script>