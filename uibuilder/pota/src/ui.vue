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
                        <b-row class="pb-2" no-gutters>
                            <b-col cols="2">
                                <label class="pt-1" for="band">Band:</label>
                            </b-col>
                            <b-col cols="4">
                                <b-form-select
                                    id="band"
                                    v-model="band"
                                    :options="bands"
                                ></b-form-select>
                            </b-col>
                            <b-col cols="2">
                                <label class="pt-1 pl-1" for="mode"
                                    >Mode:</label
                                >
                            </b-col>
                            <b-col cols="4">
                                <b-form-select
                                    id="mode"
                                    v-model="mode"
                                    :options="modes"
                                ></b-form-select>
                            </b-col>
                        </b-row>
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
                        <b-row class="my-1" no-gutters>
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
                                <b-button class="mr-2" @click.stop="worked(a)">
                                    <b-icon-check></b-icon-check>
                                </b-button>
                                <b-button @click.stop="skip(a)">X</b-button>
                            </b-col>
                        </b-row>
                    </b-container>
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
            band: null,
            bands: [],
            bandList: [
                {
                    text: "All",
                    value: { start: 0.0, stop: 999999.0 },
                },
                {
                    text: "2200",
                    value: { start: 135.7, stop: 137.8 },
                },
                {
                    text: "630",
                    value: { start: 472.0, stop: 479.0 },
                },
                {
                    text: "160",
                    value: { start: 1800.0, stop: 2000.0 },
                },
                {
                    text: "80",
                    value: { start: 3500.0, stop: 4000.0 },
                },
                {
                    text: "60",
                    value: { start: 5000.0, stop: 5999.0 },
                },
                {
                    text: "40",
                    value: { start: 7000.0, stop: 7300.0 },
                },
                {
                    text: "30",
                    value: { start: 10100.0, stop: 10150.0 },
                },
                {
                    text: "20",
                    value: { start: 14000.0, stop: 14350.0 },
                },
                {
                    text: "17",
                    value: { start: 18068.0, stop: 18168.0 },
                },
                {
                    text: "15",
                    value: { start: 21000.0, stop: 21450.0 },
                },
                {
                    text: "12",
                    value: { start: 24890.0, stop: 24990.0 },
                },
                {
                    text: "10",
                    value: { start: 28000.0, stop: 29700.0 },
                },
                {
                    text: "6",
                    value: { start: 50000.0, stop: 54000.0 },
                },
                {
                    text: "2",
                    value: { start: 144000.0, stop: 148000.0 },
                },
                {
                    text: "1.25",
                    value: { start: 219000.0, stop: 225000.0 },
                },
                {
                    text: "70cm",
                    value: { start: 420000.0, stop: 450000.0 },
                },
            ],
            mode: "*",
            modes: null,
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
            var b = this.band;
            if (b) {
                var f = parseFloat(a.frequency);

                if (f < b.start || f > b.stop) {
                    return false;
                }
            }

            if (this.mode !== "*") {
                if (this.mode !== a.mode) {
                    return false;
                }
            }

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

        self.band = self.bandList[0].value;

        uibuilder.start();

        uibuilder.onChange("msg", function (msg) {
            var p = msg.payload;

            switch (p.name) {
                case "activators":
                    self.activators = p.value;

                    self.bands = [];
                    self.bandList.forEach((b) => {
                        if (
                            self.activators.some((a) => {
                                var f = parseFloat(a.frequency);

                                return f >= b.value.start && f <= b.value.stop;
                            })
                        ) {
                            console.log("push", b);
                            self.bands.push(b);
                        }
                    });

                    var modes = {};
                    self.activators.forEach((a) => {
                        if (a.mode.length > 0) {
                            if (modes.hasOwnProperty(a.mode)) {
                                modes[a.mode]++;
                            } else {
                                modes[a.mode] = 1;
                            }
                        }
                    });

                    self.modes = [{ text: "All", value: "*" }];
                    for (const [k, v] of Object.entries(modes)) {
                        self.modes.push({ text: k, value: k });
                    }

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