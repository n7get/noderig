<template>
    <div v-show="!tx_on">
        <div>
            S-Meter:
        </div>
        <progress class="s_meter" max="100" :value="value"></progress>
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            value: 0,
            tx_on: false,
        }
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 's_meter') {
                if(p.hasOwnProperty('value')) {
                    self.value = p.value;
                }
            }
            
            if(p.name === 'transmit') {
                if(p.hasOwnProperty('value')) {
                    self.tx_on = p.value;
                }
            }
        });
    }
}
</script>
<style scoped>
    .s_meter {
        color: red;
        font-size: 2em;
        width: 100%;
    }
</style>
