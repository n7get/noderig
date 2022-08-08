<template>
    <b-row>
        <div @click="toggle" class="col-4">Power({{ value }})</div>
        <div v-if="pl_buttons" class="col-7 px-0">
            <button @click="powerLevel(5)" class="pl-btn" :class="{selected: value === 5}">5</button>
            <button @click="powerLevel(10)" class="pl-btn" :class="{selected: value === 10}">10</button>
            <button @click="powerLevel(20)" class="pl-btn" :class="{selected: value === 20}">20</button>
            <button @click="powerLevel(50)" class="pl-btn" :class="{selected: value === 50}">50</button>
            <button @click="powerLevel(100)" :class="{selected: value === 100}">100</button>
        </div>
        <b-form-input
            v-if="!pl_buttons"
	        class="col-7"
            v-model="value"
            type="range"
            min="0"
            max="100"
            @change="sendChange"
        ></b-form-input>
    </b-row>
</template>

<script>
module.exports = {
    data: function() {
        return {
            pl_buttons: true,
            value: 5,
        }
    },
    methods: {
        toggle: function() {
            this.pl_buttons = !this.pl_buttons;
        },
        powerLevel: function(new_value) {
            uibuilder.send({topic: 'power_level', event: 'set', value: new_value});
        },
        sendChange: function(new_value) {
            uibuilder.send({topic: 'power_level', event: 'set', value: new_value});
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 'power_level') {
                if(p.hasOwnProperty('value')) {
                    self.value = parseInt(p.value, 10);
                }
            }
        });
    }
}
</script>

<style scoped>
    .pl-btn {
        display: inline-block;
        min-width: 45px;
    }
    .selected {
        background-color: #bbb;
    }
</style>
