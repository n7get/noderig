<template>
<div v-show="!tx_on">
    <div>
        S-Meter:
    </div>
    <div class="progress">
        <div class="progress">
            <div
                class="progress-bar"
                role="progressbar"
                :style="value"
                aria-valuenow="50"
                aria-valuemin="0"
                aria-valuemax="100"
            ></div>
        </div>
    </div>
<div>
</template>

<script>
module.exports = {
    data() {
        return {
            s_meter: '025',
            tx_on: false,
        }
    },
    computed: {
         value() {
                return "width: " + this.s_meter + "%";
         }
    },
    mounted() {
        const self = this;

        uibuilder.onChange('msg', msg => {
            if(msg.hasOwnProperty('s_meter')) {
                self.s_meter = msg.s_meter;
            }
            
            if(msg.hasOwnProperty('transmit')) {
                self.tx_on = msg.transmit;
            }
        });
    }
}
</script>
<style scoped>
    .progress {
	    width: 100%;
    }
    .progress-bar {
        color: red;
    }
</style>
