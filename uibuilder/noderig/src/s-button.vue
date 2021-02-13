<template>
    <b-button raised :pressed.sync="pressed" @click="click">{{ label }}</b-button>
</template>

<script>
module.exports = {
    /*
     * The following events work with this component:
     *  band_down
     *  band_up
     *  clar_clear
     *  ent_key
     *  mic_down
     *  mic_up
     *  qmb_recall
     *  qmb_store
     *  quick_split
     *  swap_vfo
     *  vfo_a_to_b
     *  vfo_b_to_a
     *  zero_in
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
    },
    data: function() {
        return {
            pressed: false,
        }
    },
    methods: {
        click: function(new_value) {
            var self = this;

            this.pressed = true;
            window.setTimeout(function() {
                self.pressed = false;
            }, 1000);

            uibuilder.send({topic: this.event, event: 'clicked', value: new_value});
        },
    },
};