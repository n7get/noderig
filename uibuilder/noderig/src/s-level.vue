<template>
    <b-row>
        <div @click="sendToggle" class="col-4" :class="{disabled: disabled}">
            {{ label }}<span v-if="show !== 'none'"> ({{ value }})</span>
        </div>
        <b-form-input
	    class="col-7"
            v-model="value"
            type="range"
            :min="min"
            :max="max"
            @change="sendChange"
            :disabled="disabled"
        ></b-form-input>
    </b-row>
</template>

<script>
module.exports = {
    props: {
        event: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            max: 100,
        },
        show: {
            type: String,
            default: '',
        },
        'toggle': {
            type: String,
            default: null,
        }
    },
    data: function() {
        return {
            disabled: false,
            value: undefined,
        }
    },
    methods: {
        sendChange: function(new_value) {
            uibuilder.send({topic: this.event, event: 'set', value: new_value});
        },
        sendToggle: function() {
            if(this.toggle) {
                uibuilder.send({topic: this.toggle, event: 'toggle'});
            }
        }
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === self.event) {
                if(p.hasOwnProperty('value')) {
                    self.value = p.value;
                }
            }
            else if(self.toggle && p.name === self.toggle) {
                if(p.hasOwnProperty('value')) {
                    self.disabled = !p.value;
                }
            }
        });
    }
}
</script>

<style scoped>
    .disabled {
        color: lightgray;
    }
</style>
