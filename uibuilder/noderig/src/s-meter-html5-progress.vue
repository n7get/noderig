<template>
    <div v-show="!tx_on">
        <div>
            S-Meter:
        </div>
        <progress class="s_meter" max="100" :value="value"></progress>
    </div>
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
    .s_meter {
        color: red;
        font-size: 2em;
        width: 100%;
    }
</style>
