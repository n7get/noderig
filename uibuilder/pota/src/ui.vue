<template>
    <div>
        <div class="col-sm-12 col-md-6 col-lg-4 px-0">
            <b-card class="pb-2" no-body border-variant="secondary">
                <b-card-header
                    class="px-2 d-flex justify-content-between align-items-left"
                >
                    <div @click="clear">Clear</div>
                    <div text-variant="white" bg-variant="secondary">POTA</div>
                    <div @click="refresh">Refresh</div>
                </b-card-header>
                <div class="px-1 my-2">
                    <b-form-checkbox v-model="autoRefresh" name="check-button" switch>
                        Auto refresh
                    </b-form-checkbox>
                    <b-form-checkbox v-model="showQRT" name="check-button" switch>
                        Show QRT
                    </b-form-checkbox>
                </div>
                <div flush>
                    <div
                    class="px-1 my-3"
                        @click="toggleSelected(a)"
                        v-for="a in activators"
                        :key="a.spotId"
                        v-show="showActivation(a)"
                    >
                    <div 
                        class="
                            my-1
                            d-flex
                            justify-content-between
                            align-items-left
                        ">
                        <div>
                            {{ a.activator }}
                        </div>
                        <div>{{ a.frequency }}</div>
                        <div>{{ a.locationDesc }}</div>
                        <div>{{ a.mode }}</div>
                    </div>
                    <div v-show="a.selected">
                    <div class="pl-2 my-1">
                        <div>{{ a.reference }} {{ a.grid6 }}</div>
                    </div>
                    <div class="pl-2 my-1">{{ a.parkName }}</div>
                    <div class="pl-2 my-1">{{ a.comments }}</div>
                    </div>
                </div>
            </b-card>
        </div>
    </div>
</template>

<script>
module.exports = {
    data: function () {
        return {
            activators: [],
            autoRefresh: false,
            band: "",
            mode: "",
            selected: false,
            showQRT: false,
        };
    },
    methods: {
        clear: function () {
            uibuilder.send({ topic: "activators", event: "clear" });
        },
        refresh: function () {
            uibuilder.send({ topic: "activators", event: "refresh" });
        },
        showActivation: function (a) {
            if (!this.showQRT) {
                if (a.comments.toLowerCase().indexOf("qrt") !== -1) {
                    return false;
                }
            }
            return true;
        },
        toggleSelected: function (a) {
            console.log("toggleSelected: ", a);
            this.activators.forEach((element) => {
                element.selected = false;
            });
            a.selected = true;
            uibuilder.send({
                topic: "activators",
                event: "selected",
                value: a.spotId,
            });
        },
    },
    mounted: function () {
        var self = this;

        console.log("mounted");

        uibuilder.start();

        uibuilder.onChange("msg", function (msg) {
            console.log("activators: ", msg.payload);
            self.activators = msg.payload;
        });

        setInterval(() => {
            if (self.autoRefresh) {
                uibuilder.send({ topic: "activators", event: "refresh" });
            }
        }, 30000);
    },
};
</script>
