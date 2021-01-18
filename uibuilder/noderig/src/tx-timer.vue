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
    data: function() {
        return {
            counter: 0,
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
        var self = this,
            intervalID = null;

        uibuilder.onChange('msg', msg => {
            if(msg.hasOwnProperty('transmit')) {

                self.tx_on = msg.transmit;

               if(msg.transmit) {
                  if(intervalID == null) {
                      self.counter = 0;

                      intervalID = window.setInterval(increment, 1000, self);
                  }
               }
               else {
                  window.clearInterval(intervalID);
                  intervalID = null;
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
