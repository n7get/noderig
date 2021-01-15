<template>
    <div class="mt-2" :class="{'frequency-digits': true, tx: on}">
        {{ mhz }}&nbsp;{{ khz }}&nbsp;{{ hz }}
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
            if(msg.hasOwnProperty('frequency')) {
                self.mhz = msg.frequency.substring(0, 3);
                self.khz = msg.frequency.substring(3, 6);
                self.hz  = msg.frequency.substring(6, 9);
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
    }
    .frequency-digits.tx {
        color: red;
    }
</style>
