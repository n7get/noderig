<template>
    <div>
        <div class="col-sm-12 col-md-6 col-lg-4 px-0">
            <b-card class="" no-body border-variant="secondary">
                <b-card-header
                    class="px-2 d-flex justify-content-between align-items-left"
                >
                    <div @click="clear">Clear</div>
                    <div text-variant="white" bg-variant="secondary">POTA</div>
                    <div @click="refresh">Refresh</div>
                </b-card-header>
                <div class="px-1 py-2 border-primary border-bottom">
                    <b-container>
                        <b-row no-gutters>
                            <b-col>
                                <b-form-checkbox
                                    v-model="autoRefresh"
                                    name="check-button"
                                    switch
                                >
                                    Auto refresh
                                </b-form-checkbox>
                            </b-col>
                            <b-col>
                                <b-form-checkbox
                                    v-model="showQRT"
                                    name="check-button"
                                    switch
                                >
                                    Show QRT
                                </b-form-checkbox>
                            </b-col>
                        </b-row>
                        <b-row no-gutters>
                            <b-col>
                                <b-form-checkbox
                                    v-model="showSkipped"
                                    name="check-button"
                                    switch
                                >
                                    Show Skipped
                                </b-form-checkbox>
                            </b-col>
                            <b-col>
                                <b-form-checkbox
                                    v-model="showWorked"
                                    name="check-button"
                                    switch
                                >
                                    Show Worked
                                </b-form-checkbox>
                            </b-col>
                        </b-row>
                    </b-container>
                </div>
                <div flush>
                    <b-container
                        class="
                            px-1
                            py-1
                            border-primary border-bottom
                            activation
                        "
                        @click="toggleSelected(a)"
                        v-for="a in activators"
                        :key="a.id"
                        v-show="showActivation(a)"
                        :class="{
                            selected: a.selected,
                            new: a.status === 'new',
                            worked: a.status === 'worked',
                            skip: a.status === 'skip',
                        }"
                    >
                        <b-row class="my-1"  no-gutters>
                            <b-col cols="4">{{ a.activator }}</b-col>
                            <b-col cols="3">{{ a.frequency }}</b-col>
                            <b-col cols="3">{{ locationDesc(a) }}</b-col>
                            <b-col cols="2">{{ a.mode }}</b-col>
                        </b-row>
                        <b-row class="pl-2" v-show="a.selected">
                            <b-col cols="7">
                                <div>{{ a.reference }}</div>
                                <div>{{ a.parkName }}</div>
                                <div>{{ a.comments }}</div>
                            </b-col>
                            <b-col cols="5" class="pt-3">
                                <b-button
                                    class="mr-2"
                                    @click.stop="worked(a)"
                                >
                                    <b-icon-check></b-icon-check>
                                </b-button>
                                <b-button @click.stop="skip(a)">X</b-button>
                            </b-col>
                        </b-row>
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
            showSkipped: false,
            showWorked: true,
            showQRT: false,
        };
    },
    methods: {
        clear: function () {
            uibuilder.send({ topic: "activators", event: "clear" });
        },
        locationDesc: function (a) {
            var tkn = a.locationDesc.split(",");
            if (tkn.length > 1) {
                return tkn[0] + "+" + (tkn.length - 1);
            }
            return a.locationDesc;
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
            if (a.status == "skip") {
                return this.showSkipped;
            }
            if (a.status === "worked") {
                return this.showWorked;
            }
            return true;
        },
        skip: function (a) {
            uibuilder.send({
                topic: "activators",
                event: "skip",
                value: a.id,
            });
        },
        toggleSelected: function (a) {
            uibuilder.send({
                topic: "activators",
                event: "selected",
                value: a.id,
            });
        },
        worked: function (a) {
            uibuilder.send({
                topic: "activators",
                event: "worked",
                value: a.id,
            });
        },
    },
    mounted: function () {
        var self = this;

        console.log("mounted");

        uibuilder.start();

        uibuilder.onChange("msg", function (msg) {
            var p = msg.payload;

            switch (p.name) {
                case "activators":
                    self.activators = p.value;
                    break;

                case "selected":
                    self.activators.forEach((a) => {
                        if (p.id === a.id) {
                            a.selected = p.value;
                        }
                    });
                    break;

                case "status":
                    self.activators.forEach((a) => {
                        if (p.id === a.id) {
                            a.status = p.value;
                            console.log("status change", a);
                        }
                    });
                    break;
            }
        });

        setInterval(() => {
            if (self.autoRefresh) {
                uibuilder.send({ topic: "activators", event: "refresh" });
            }
        }, 300000);
    },
};
</script>

<style>
.activation {
    background-color: #fff;
}
.new {
    font-weight: bold;
}
.selected {
    background-color: #fff;
}
.skip {
    background-color: #555;
}
.worked {
    background-color: lightgreen;
}
</style>