
<template>
    <div>
        {{ mode }}
    </div>
</template>

<script>
module.exports = {
    data() {
        return {
            mode: 'mode'
        }
    },
    mounted() {
        const self = this;

        uibuilder.onChange('msg', msg => {
            if(msg.hasOwnProperty('mode')) {
                self.mode = msg.mode;
            }
        });
    }
}
</script>
