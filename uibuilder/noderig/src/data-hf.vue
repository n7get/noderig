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
</div>
</template>

<script>
module.exports = {
    components: {
        'alc-status':    httpVueLoader('alc-status.vue'),
         'frequency':    httpVueLoader('frequency.vue'),
         'lock-status':    httpVueLoader('lock-status.vue'),
         'mode-status':    httpVueLoader('mode-status.vue'),
         'pre-amp-status': httpVueLoader('pre-amp-status.vue'),
         'tuner-status':    httpVueLoader('tuner-status.vue'),
    }
}
</script>

<style scoped>
</style>
