<template>
    <b-card class="pb-2" no-body border-variant="secondary">
        <b-card-header class="mx-auto">
            <div @click="togglePota">POTA</div>
            <div @click="clear">Clear</div>
            <div @click="redresh">Refresh</div>
        </b-card-header>
        <div v-show="showPota" flush>
            <div class="" v-for="a in activators" :key="a.spotId">
                <div>{{ a.activator }} {{ a.frequency }}</div>
            </div>
        </div>
    </b-card>
</template>

<script>
const { default: func } = require("./vue-temp/vue-editor-bridge");

module.exports = {
    data: function () {
        return {
            activators: [],
            showPota: false,
        };
    },
    methors: {
        clear: function () {
            uibuilder.send({ topic: "activators", event: "clear" });
        },
        refresh: function () {
            uibuilder.send({ topic: "activators", event: "refresh" });
        },
        togglePota: function () {
            this.showPota = !this.showPota;
        },
    },
    mounted: function () {
        var self = this;

        uibuilder.onChange("msg", (msg) => {
            var p = msg.payload;

            if (p.name === "activators") {
                if (p.hasOwnProperty("value")) {
                    self.activators = p.value;
                }
            }
        });
    },
};
</script>
