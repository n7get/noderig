<template>
<b-row v-show="tx_on">
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
        secs: {
            type: Number,
            required: true
        },
        warn: {
            type: Number,
            default: 30,
        },
    },
    data: function() {
        return {
            counter: 0,
            tx_on: false,
            is_warn: false,
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
        var self = this,
            intervalID;

        uibuilder.onChange('msg', msg => {
            if(msg.hasOwnProperty('transmit')) {

                self.tx_on = msg.transmit;

               if(msg.transmit) {
                   self.counter = self.secs;
                   self.is_warn = false;

                  intervalID = window.setInterval(increment, 1000, self);
               }
               else {
                  window.clearInterval(intervalID);
               }
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
