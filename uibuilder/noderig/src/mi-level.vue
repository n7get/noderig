<template>
    <b-row>
        <div class="col-4">
            {{ label }}<span v-if="show !== 'none'"> ({{ value }})</span>
        </div>
        <b-form-input
	    class="col-7"
            v-model="value"
            type="range"
            :min="min"
            :max="max"
            @change="sendChange"
        ></b-form-input>
    </b-row>
</template>

<script>
module.exports = {
    props: {
        no: {
            type: Number,
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
    },
    data: function() {
        return {
            value: undefined,
        }
    },
    methods: {
        sendChange: function(new_value) {
            uibuilder.send({topic: 'menu_item', event: 'set', value: {no: this.no, value: new_value}});
        },
    },
    mounted: function() {
        var self = this;
        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 'menu_item' && p.no === self.no) {
                if(p.hasOwnProperty('value')) {
                    self.value = p.value;
                }
            }
        });
    }
}
</script>

<style scoped>
</style>
