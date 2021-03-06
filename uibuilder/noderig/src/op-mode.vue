<template>
    <div class="pl-0">
        <b-button id="op-mode-button" @click="clicked().then(e => handleClick(...e))">{{ name }}</b-button>

        <b-modal
            id="list-op-modes"
            size="sm"
            hide-footer
        >
            <template #modal-header>
                <div class="px-2 d-flex justify-content-between align-items-left w-100">
                    <div @click="editOpMode">Edit</div>
                    <div @click="closeOpModeList()">{{ name }}</div>
                    <div @click="saveOpMode">Save</div>
                </div>
            </template>
            <div v-for="om in opModes">
                <b-row class="font-weight-bold pr-3 py-2 mx-2 my-1 border text-light bg-primary">
                    <div class="col" @click="loadOpMode(om.name)">{{ om.name }}</div>
                    <div class="col-1" @click="removeOpMode(om.name)"><b-icon-trash></b-icon-trash></div>
                </b-row>
            </div>
        </b-modal>

        <b-modal
            id="edit-op-mode"
            size="sm"
            @ok="handleOk"
            @shown="focusInput"
        >
            <b-form-group
                label="Name:"
                label-for="name"
                invalid-feedback="Op Mode name is required."
                :state="nameInputState"
            >
                <b-form-input
                    id="name"
                    ref="name-input"
                    v-model="nameInput"
                    :state="nameInputState"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-checkbox v-model="primaryInput" name="primary-button" switch class="mt-4">
                Primary Op Mode.
            </b-form-checkbox>

            <b-form-checkbox v-model="enabledInput" name="enabled-button" switch class="my-3">
                Enable trigger.
            </b-form-checkbox>

            <b-form-group
                label="Order:"
                label-for="order"
                label-cols="auto"
                content-cols="3"
                class="mt-2"
                inline
                invalid-feedback="Order is required"
                :state="orderInputState"
            >
                <b-form-input
                    id="order"
                    ref="order-input"
                    type="number"
                    v-model="orderInput"
                    :state="orderInputState"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-checkbox v-model="enableTimerInput" name="primary-button" switch class="mt-4">
                Enable timer.
            </b-form-checkbox>

            <b-form-checkbox v-model="enableCountdownInput" name="primary-button" switch class="mt-4">
                Enable countdown.
            </b-form-checkbox>

            <b-form-group
                label="Start time:"
                label-for="start-time"
                label-cols="auto"
                content-cols="3"
                class="mt-2"
                inline
                invalid-feedback="Start time is required"
                :state="startTimeInputState"
                v-show="enableCountdownInput"
            >
                <b-form-input
                    id="start-time"
                    ref="start-time-input"
                    type="number"
                    v-model="startTimeInput"
                    :state="startTimeInputState"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                label="Trigger:"
                label-for="trigger"
                label-class="mt-2"
                :invalid-feedback="triggerError"
                :state="triggerInputState"
            >
                <b-form-textarea
                    id="trigger"
                    v-model="triggerInput"
                    :state="triggerInputState"
                    placeholder="Op Mode Trigger"
                    rows="6"
                ></b-form-textarea>
        </b-modal>
    </div>
</template>

<script>
module.exports = {
    mixins: [window.noderig.double_click_mixin],
    data: function() {
        return {
            opModes: [],

            name: 'Op Mode',
            nameInput: '',
            nameInputState: null,

            primary: true,
            primaryInput: true,

            enabled: true,
            enabledInput: true,

            order: 0,
            orderInput: 0,
            orderInputState: null,

            enableTimer: false,
            enableTimerInput: false,

            enableCountdown: false,
            enableCountdownInput: false,

            startTime: 0,
            startTimeInput: 0,
            startTimeInputState: null,

            trigger: '',
            triggerInput: '',
            triggerInputState: null,
            triggerError: 'an error message',
        }
    },
    methods: {
        handleClick: function(e, v) {
            if(e === 'click') {
                this.resetModal();

                this.$bvModal.show('list-op-modes');
            }
            else {
                uibuilder.send({topic: 'op_mode', event: 'load_primary'});
            }
        },
        closeOpModeList: function() {
            this.$bvModal.hide('list-op-modes');
        },
        editOpMode: function() {
            this.nameInput = this.name;
            this.primaryInput = this.primary;
            this.enabledInput = this.enabled;
            this.orderInput = this.order;
            this.enableTimerInput = this.enableTimer;
            this.enableCountdownInput = this.enableCountdown;
            this.startTimeInput = this.startTime;
            this.triggerInput = this.trigger;
            this.$bvModal.show('edit-op-mode');
            this.resetModal();
        },
        loadOpMode: function(name) {
            this.$nextTick(function() {
                this.$bvModal.hide('list-op-modes');
            });

            uibuilder.send({topic: 'op_mode', event: 'load', value: name});
        },
        removeOpMode: function(name) {
            this.$bvModal.msgBoxConfirm('Delete Op Mode ' + name + '?', {})
                .then(function(result) {
                    if(result) {
                        uibuilder.send({topic: 'op_mode', event: 'remove', value: name});
                    }
                });
        },
        saveOpMode: function() {
            this.$nextTick(function() {
                this.$bvModal.hide('list-op-modes');
            });

            uibuilder.send({topic: 'op_mode', event: 'save', value: name});
        },
        focusInput: function() {
            this.$refs['name-input'].focus();
            this.$refs['name-input'].select();
        },
        resetModal: function() {
            this.nameInputState = null;
            this.orderInputState = null;
            this.startTimeInputState = null;
            this.triggerInputState = null;
        },
        handleOk: function(e) {
            let hasErrors = false;

            if(!this.nameInput) {
                hasErrors = true;
                this.nameInputState = false;
            }
            if(!this.orderInput) {
                hasErrors = true;
                this.orderInputState = false;
            }
            if(this.enableCountdownInput && !this.startTimeInput) {
                hasErrors = true;
                this.startTimeInputState = false;
            }
            if(this.triggerInput) {
                try {
                    new Function(this.triggerInput);
                } catch (error) {
                    this.triggerError = error.message;
                    this.triggerInputState = false;
                    hasErrors = true;
                }
            }

            if(hasErrors) {
                e.preventDefault();
            }
            else {
                this.resetModal();
                this.$nextTick(function() {
                    this.$bvModal.hide('edit-op-mode');
                });

                var update = {
                    name: this.nameInput,
                    primary: this.primaryInput,
                    enabled: this.enabledInput,
                    order: this.orderInput,
                    enableTimer: this.enableTimerInput,
                    enableCountdown: this.enableCountdownInput,
                    startTime: this.startTimeInput,
                    trigger: this.triggerInput
                };
                uibuilder.send({topic: 'op_mode', event: 'update', value: update});
            }
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 'op_mode') {
                self.name = p.value.name;
                self.order = p.value.order || 0;
                self.enabled = p.value.enabled || false;
                self.primary = p.value.primary || false;
                self.enableTimer = p.value.enableTimer || false;
                self.enableCountdown = p.value.enableCountdown || false;
                self.startTime = p.value.startTime || 0;
                self.trigger = p.value.trigger;
            }
            else if(p.name === 'op_modes') {
                self.opModes = p.value;
            }
        });
    },
};
</script>

<style scoped>
    #op-mode-button {
        height: 64px;
        width: 80px;
    }
</style>
