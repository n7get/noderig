<template>
<b-row v-show="tx_on && enabled">
    <div class="col-4 timer-label">
        TX Rem:
    </div>
    <div class="timer col mt-1">
        <span :class="{warn: is_warn}">
            {{ minutes }}:{{ seconds }}
        </span>
    </div>
</b-row>
</template>

<script>
function increment(self) {
    if(self.counter) {
        self.counter--;
    }

    if(self.counter < self.warn) {
        self.is_warn = !self.is_warn;
    }
}

function pad2(value) {
    let n = value.toString();

    while(n.length < 2) {
        n = '0' + n;
    }

    return n;
}

module.exports = {
    props: {
        warn: {
            type: Number,
            default: 30,
        },
    },
    data: function() {
        return {
            counter: 0,
            enabled: false,
            is_warn: false,
            startTime: 90,
            tx_on: false,
        }
    },
    computed: {
        minutes: function() {
            const countDown = this.startTime - this.counter;

            return Math.floor(countDown / 60);
        },
        seconds: function() {
            const countDown = this.startTime - this.counter;

            return pad2(countDown % 60);
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 'op_mode') {
                self.enabled = p.value.enableCountdown;
                self.startTime = p.value.startTime || 90;
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
    .timer span {
        display: inline-block;
        padding: 0 5px;
    }
    .warn {
        background-color: red;
        color: white;
    }
</style>
