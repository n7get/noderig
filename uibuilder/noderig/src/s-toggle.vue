<template>
    <b-button
        :class="{on: value === true, off: value === false}"
        @click="click"
    >{{ label }}</b-button>
</template>

<script>
module.exports = {
    /*
     * The following events work with this component:
     *  auto_notch
     *  break_in
     *  clar
     *  cw_spot
     *  fast_step
     *  keyer
     *  monitor_on
     *  mox_set
     *  narrow
     *  noise_blanker_status
     *  noise_reduction
     *  rf_attenuator
     *  speech_processor_on
     *  txw
     *  tx_clar
     *  vox_status
     */
    props: {
        event: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        on: {
            type: String,
        },
        off: {
            type: String,
        },
    },
    data: function() {
        return {
            value: null,
        }
    },
    methods: {
        click: function(new_value) {
            var self = this;

            uibuilder.send({topic: this.event, event: 'toggle', value: new_value});
        },
    },
    mounted: function() {
        var self = this;
        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === this.event) {
                if(p.hasOwnProperty('value')) {
                    if(self.on && self.off) {
                        if(p.value === self.on) {
                            self.value = true;
                        }
                        else if(p.value === self.off) {
                            self.value = false;
                        }
                        else {
                            console.warn('s-toggle(' + self.label + ') unknown value: ' + p.value);
                            self.value = undefined;
                        }
                    }
                    else {
                        self.value = p.value;
                    }
                }
            }
        });
    }
};
</script>

<style scoped>
    .on {
        background-color: green;
    }
    .off {
        background-color: red;
    }
</style>