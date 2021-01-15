
<template>
    <div>
        {{ mode }}
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            mode: 'mode'
        }
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            if(msg.hasOwnProperty('mode')) {
                self.mode = msg.mode;
            }
        });
    }
}
</script>
