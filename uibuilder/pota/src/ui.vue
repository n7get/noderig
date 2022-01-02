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
                    <b-form-checkbox v-model="autoRefresh" name="check-button" switch>
                        Auto refresh
                    </b-form-checkbox>
                    <b-form-checkbox v-model="showQRT" name="check-button" switch>
                        Show QRT
                    </b-form-checkbox>
                </div>
                <div flush>
                    <div
                        class="px-1 py-1 border-primary border-bottom activation"
                        @click="toggleSelected(a)"
                        v-for="a in activators"
                        :key="a.id"
                        v-show="showActivation(a)"
                        :class="{selected: a.selected, new: a.status === 'new', worked: a.status === 'worked', skip: a.status === 'skip'}"
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
                            <div>{{ locationDesc(a) }}</div>
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
            return true;
        },
        toggleSelected: function (a) {
            uibuilder.send({
                topic: "activators",
                event: "selected",
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

<style scoped>
    .activation {
        background-color: #ddd;
    }
    .new {
        font-weight: bold;
    }
    .selected {
        background-color: #fff;
    }
</stype>