<template>
    <div class="power_level">
        <p>Power({{ value }})</p>
        <b-form-input
            v-model="value"
            type="range"
            min="0"
            max="100"
            @change="sendChange"
        ></b-form-input>
    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            value: 5,
        }
    },
    methods: {
        sendChange: new_value => {
            uibuilder.send({topic: 'POWER_CHANGE_EVENT', payload: new_value});
        },
    },
    mounted() {
        const self = this;

        uibuilder.onChange('msg', msg => {
            if(msg.hasOwnProperty('power_level')) {
                self.value = msg.power_level;
            }
        });
    }
}
</script>

<style scoped>
    .power_level {
        width: 100%;
    }
</style>
