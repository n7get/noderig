
<template>
    <div @click="sendClick">
        {{ pre_amp }}
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            pre_amp: 'unk'
        }
    },
    methods: {
        sendClick: e => {
            uibuilder.send({topic: 'PRE_AMP_EVENT', payload: 'click'});
        },
    },
    mounted: function() {
        var self = this;
    
        uibuilder.onChange('msg', msg => {
            if(msg.hasOwnProperty('pre_amp')) {
                self.pre_amp = msg.pre_amp;
            }
        });
    }
}
</script>
