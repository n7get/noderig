<template>
    <b-row>
        <div class="col-4">Power({{ value }})</div>
        <b-form-input
	    class="col-7"
            v-model="value"
            type="range"
            min="0"
            max="100"
            @change="sendChange"
        ></b-form-input>
    </b-row>
</template>

<script>
module.exports = {
    data: function() {
        return {
            value: 5,
        }
    },
    methods: {
        sendChange: new_value => {
            uibuilder.send({topic: 'POWER_CHANGE_EVENT', payload: new_value});
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            if(msg.hasOwnProperty('power_level')) {
                self.value = msg.power_level;
            }
        });
    }
}
</script>

<style scoped>
</style>
