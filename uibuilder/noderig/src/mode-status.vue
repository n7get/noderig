
<template>
    <div>
        <span @click="handleClick">{{ mode }}<span>

        <b-modal
            id="new-mode"
            size="sm"
            hide-footer
        >
            <template #modal-title>
                Set mode
            </template>
            <div class="font-weight-bold my-1 ml-0 py-3 pl-3 border text-light bg-primary" v-for="m in modeOptions" @click="selectMode(m)">{{ m }}</div>
        </b-modal>
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            mode: 'mode',
            modeOptions: this.$noderig.modeOptions,
        }
    },
    methods: {
        handleClick: function() {
            this.$bvModal.show('new-mode');
        },
        selectMode: function(m) {
            this.$nextTick(function() {
                this.$bvModal.hide('new-mode');
            });

            uibuilder.send({topic: 'mode', event: 'set', value: m});
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 'mode') {
                if(p.hasOwnProperty('value')) {
                    self.mode = p.value;
                }
            }
        });
    }
}
</script>
