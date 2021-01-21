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

            if(p.event === 's_meter') {
                self.value = p.value;
            }
            
            if(p.event === 'transmit') {
                self.tx_on = p.value;
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
