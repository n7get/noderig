
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
            var p = msg.payload;

            if(p.event === 'mode') {
                self.mode = p.value;
            }
        });
    }
}
</script>
