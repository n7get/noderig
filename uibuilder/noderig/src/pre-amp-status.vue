
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
            uibuilder.send({topic: 'pre_amp', event: 'click'});
        },
    },
    mounted: function() {
        var self = this;
    
        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 'pre_amp') {
                if(p.hasOwnProperty('value')) {
                    self.pre_amp = p.value;
                }
            }
        });
    }
}
</script>
