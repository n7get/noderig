<template>
    <div class="mt-2 frequency-digits" :class="{tx: on}">
        <span v-html="mhz"></span>&nbsp;<span v-html="khz"></span>&nbsp;<span v-html="hz"></span>
    </div>
</template>

<script>
module.exports = {
    props: {
        vfo: {
            type: String,
            default: 'vfo_a',
            validator: function (value) {
                return ['vfo_a', 'vfo_b'].indexOf(value) !== -1
            },
        }
    },
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
            var p = msg.payload;

            if(p.event === self.vfo) {
                self.mhz = p.value.substring(0, 3).replace(/ /g,'&nbsp;');;
                self.khz = p.value.substring(3, 6);
                self.hz  = p.value.substring(6, 9);
            }

            if(p.event === 'transmit') {
                self.on = p.value;
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
