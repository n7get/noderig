<template>
<b-row v-show="tx_on && enabled">
    <div class="col-4 timer-label">
        TX Time:
    </div>
    <div class="timer col mt-1">
        {{ minutes }}:{{ seconds }}
    </div>
</b-row>
</template>

<script>
function pad2(value) {
    let n = value.toString();

    while(n.length < 2) {
        n = '0' + n;
    }

    return n;
}

module.exports = {
    data: function() {
        return {
            counter: 0,
            enabled: false,
            tx_on: false,
        }
    },
    computed: {
        minutes: function() {
            return Math.floor(this.counter / 60);
        },
        seconds: function() {
            return pad2(this.counter % 60);
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 'op_mode') {
                self.enabled = p.value.enableTimer;
            }
            else if(p.name === 'transmit') {
                self.tx_on = p.value;
                self.counter = 0;
            }
            else if(p.name === 'interval') {
                self.counter = p.value;
            }
        });
    }
}
</script>

<style scoped>
    .timer-label {
        margin-top: 10px;
    }
    .timer {
        font-family: "Monaco", "Lucida Console", "Andalé Mono";
        font-size: 24px;
    }
</style>
