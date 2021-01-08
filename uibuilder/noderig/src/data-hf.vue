<template>
<div>
    <b-row>
        <div>Data-HF</div>
        <frequency></frequency>
    </b-row>
    <b-row>
        <tuner-status></tuner-status>&nbsp;
        <lock-status></lock-status>&nbsp;
        <pre-amp-status></pre-amp-status>&nbsp;
        <alc-status></alc-status>&nbsp;
        <mode-status></mode-status>
    </b-row>
    <b-row>
        <s-meter></s-meter>
    </b-row>
    <b-row>
        <power-level></power-level>
    </b-row>
    <b-row>
        <config :items="['62', '66', '67', '68', '69', '70', '71', '72', '73', '146', '147']"></config>
    </b-row>
</div>
</template>

<script>
module.exports = {
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
