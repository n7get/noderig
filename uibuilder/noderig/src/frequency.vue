<template>
    <div class="mt-2 frequency-digits" :class="{tx: on}">
        <span v-html="mhz"></span>&nbsp;<span v-html="khz"></span>&nbsp;<span v-html="hz"></span>
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            mhz: 'mmm',
            khz: 'kkk',
            hz:  'hhh',
            on:  false
        }
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            if(msg.hasOwnProperty('vfo_a')) {
                self.mhz = msg.vfo_a.substring(0, 3).replace(/ /g,'&nbsp;');;
                self.khz = msg.vfo_a.substring(3, 6);
                self.hz  = msg.vfo_a.substring(6, 9);
            }

            if(msg.hasOwnProperty('transmit')) {
                self.on = msg.transmit;
            }
        });
    }
}
</script>

<style scoped>
    .frequency-digits {
        font-family: "Monaco", "Lucida Console", "Andalé Mono";
        font-size: 32px;
        color: green;
        padding-right: 0;
    }
    .frequency-digits.tx {
        color: red;
    }
</style>
