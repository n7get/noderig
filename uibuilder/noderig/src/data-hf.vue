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
    <s-meter class="mt-2"></s-meter>
    <power-level class="mt-2 mb-2"></power-level>
    <config :items="['62', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '146', '147']"></config>
</div>
</template>

<script>
module.exports = {
    mixins: [window.noderig.op_mode_mixin],
    components: {
        'config':           httpVueLoader('config.vue'),
        'alc-status':       httpVueLoader('alc-status.vue'),
        'frequency':        httpVueLoader('frequency.vue'),
        'lock-status':      httpVueLoader('lock-status.vue'),
        'mode-status':      httpVueLoader('mode-status.vue'),
        'power-level':      httpVueLoader('power-level.vue'),
        'pre-amp-status':   httpVueLoader('pre-amp-status.vue'),
//      's-meter':          httpVueLoader('s-meter-bootstrap-progressbar.vue'),
//      's-meter':          httpVueLoader('s-meter-html5-progress.vue'),
        's-meter':          httpVueLoader('s-meter-vue-bootstrap-progressbar.vue'),
        'tuner-status':     httpVueLoader('tuner-status.vue'),
        }
}
</script>

<style scoped>
</style>
