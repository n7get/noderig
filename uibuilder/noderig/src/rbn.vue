<template>
    <b-card
        v-show="mode === 'CW' || mode === 'CW-R'"
        class="pb-2"
        no-body
        border-variant="secondary"
    >
        <b-card-header
            class="px-2 d-flex justify-content-between align-items-left"
        >
            <div @click="openTextEdit">Edit</div>
            <div @click="toggleRBN" text-variant="white" bg-variant="secondary">
                RBN
            </div>
            <div @click="openAddCallsign">Add</div>
        </b-card-header>
        <div v-show="showRBN" flush>
            <div class="list-area pb-3">
                <div
                    class="
                        px-2
                        pt-3
                        d-flex
                        justify-content-between
                        align-items-left
                    "
                    v-for="(cs, no) in callsigns"
                    :key="cs"
                >
                    <div class="col-1" @click="sendRBN(cs)">
                        <b-icon-play-fill
                            v-if="cs == currentCallsign"
                        ></b-icon-play-fill>
                    </div>
                    <div class="col" @click="selectCallsign(cs)">{{ cs }}</div>
                    <div class="col-1" @click="removeCallsign(cs)">
                        <b-icon-trash></b-icon-trash>
                    </div>
                </div>
            </div>
        </div>
        <b-modal
            id="add-callsign"
            size="sm"
            @ok="handleCallsignOk"
            @shown="focusCallsignAdd"
        >
            <template #modal-title>Add Callsign</template>
            <b-form-group
                label="Callsign:"
                label-for="callsign"
                invalid-feedback="Callsign is required."
                :state="callsignInputState"
            >
                <b-form-input
                    id="callsign"
                    ref="callsign-input"
                    v-model="callsignInput"
                    :state="callsignInputState"
                    required
                ></b-form-input>
            </b-form-group>
        </b-modal>
        <b-modal id="edit-text" size="sm" @ok="handleTextOk" @shown="focusEdit">
            <template #modal-title>Edit RBN Text</template>
            <b-form-group
                label="RBN Text:"
                label-for="text"
                invalid-feedback="RBN Text is required."
                :state="textInputState"
            >
                <b-form-input
                    id="text"
                    ref="text-input"
                    v-model="textInput"
                    :state="textInputState"
                    required
                ></b-form-input>
            </b-form-group>
        </b-modal>
    </b-card>
</template>

<script>
module.exports = {
    data: function () {
        return {
            callsigns: [],
            callsignInput: "",
            callsignInputState: "",
            currentCallsign: "",
            mode: "",
            showRBN: false,
            text: "",
            textInput: "",
            textInputState: "",
        };
    },
    methods: {
        focusCallsignAdd: function () {
            this.$refs["callsign-input"].focus();
        },
        handleCallsignOk: function (e) {
            if (this.callsignInput) {
                uibuilder.send({
                    topic: "rbn",
                    event: "add",
                    value: this.callsignInput.toUpperCase(),
                });
            } else {
                this.callsignInputState = false;
                e.preventDefault();
            }
        },
        openAddCallsign: function () {
            this.callsignInput = "";
            this.callsignInputState = null;
            this.$bvModal.show("add-callsign");
        },
        removeCallsign: function (callsign) {
            uibuilder.send({
                topic: "rbn",
                event: "remove",
                value: callsign,
            });
        },
        selectCallsign: function (callsign) {
            uibuilder.send({
                topic: "rbn",
                event: "select",
                value: callsign,
            });
        },
        sendRBN: function (callsign) {
            uibuilder.send({
                topic: "rbn",
                event: "send",
                value: callsign,
            });
        },
        toggleRBN: function () {
            this.showRBN = !this.showRBN;
            if (this.showRBN) {
                uibuilder.send({ topic: "rbn", event: "refresh" });
            }
        },

        focusEdit: function () {
            this.$refs["text-input"].focus();
            this.$refs["text-input"].select();
        },
        handleTextOk: function (e) {
            if (this.textInput) {
                uibuilder.send({
                    topic: "rbn",
                    event: "text",
                    value: this.textInput.toUpperCase(),
                });
            } else {
                this.textInputState = false;
                e.preventDefault();
            }
        },
        openTextEdit: function () {
            this.textInput = this.text;
            this.textInputState = null;
            this.$bvModal.show("edit-text");
        },
    },
    mounted: function () {
        var self = this;

        uibuilder.onChange("msg", (msg) => {
            var p = msg.payload;

            if (p.name === "RBN") {
                const v = p.value;

                if (v.hasOwnProperty("callsigns")) {
                    self.callsigns = v.callsigns;
                }
                if (v.hasOwnProperty("current")) {
                    self.currentCallsign = v.current;
                }
                if (v.hasOwnProperty("text")) {
                    self.text = v.text;
                }
            } else if (p.name === "mode") {
                if (p.hasOwnProperty("value")) {
                    self.mode = p.value;
                }
            }
        });
    },
};
</script>

<style scoped>
.list-area {
    overflow: auto;
    max-height: 20em;
    min-height: 5em;
}
.pad {
    padding-left: 0.5em;
}
</style>
