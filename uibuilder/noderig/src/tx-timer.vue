<template>
<b-row v-show="tx_on">
    <div class="col-4 timer-label">
        TX Time:
    </div>
    <div class="timer col mt-1">
        {{ minutes }}:{{ seconds }}
    </div>
</b-row>
</template>

<script>
function increment(self) {
    self.counter++;
}

function pad2(value) {
    let n = value.toString();

    while(n.length < 2) {
        n = '0' + n;
    }

    return n;
}

module.exports = {
    data() {
        return {
            counter: 0,
            tx_on: false,
        }
    },
    computed: {
        minutes() {
            return Math.floor(this.counter / 60);
        },
        seconds() {
            return pad2(this.counter % 60);
        },
    },
    mounted() {
        const self = this;
        let intervalID;

        uibuilder.onChange('msg', msg => {
            if(msg.hasOwnProperty('transmit')) {

                self.tx_on = msg.transmit;

               if(msg.transmit) {
                   self.counter = 0;

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
</style>
