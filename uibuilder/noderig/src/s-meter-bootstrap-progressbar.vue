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
    data: function() {
        return {
            s_meter: '025',
            tx_on: false,
        }
    },
    computed: {
         value: function() {
                return "width: " + this.s_meter + "%";
         }
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.event === 's_meter') {
                self.s_meter = p.value;
            }
            
            if(p.event === 'transmit') {
                self.tx_on = p.value;
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
