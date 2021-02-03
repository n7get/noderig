<template>
    <div>
        <b-button id="op-mode-button" @click="showList" @dblclick="toggleLastOpMode">{{ name }}</b-button>

        <b-modal
            id="list-op-modes"
            size="sm"
            hide-footer
        >
            <template #modal-header>
                <div class="px-2 d-flex justify-content-between align-items-left w-100">
                    <div @click="editOpMode">Edit</div>
                    <div>{{ name }}</div>
                    <div @click="saveOpMode">Save</div>
                </div>
            </template>
            <div v-for="om in opModes">
                <div class="font-weight-bold my-1 ml-2 py-3 px-3 border text-light bg-primary d-flex justify-content-between align-items-left">
                    <div @click="loadOpMode(om.name)">{{ om.name }}</div>
                    <div @click="removeOpMode(om.name)" v-if="om.can_delete"><b-icon-trash></b-icon-trash></div>
                </div>
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
                label-cols="3"
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

            <b-form-group
                label="Trigger:"
                label-for="trigger"
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

            trigger: '',
            triggerInput: '',
            triggerInputState: null,
            triggerError: 'an error message',
        }
    },
    methods: {
        showList: function(e) {
            this.resetModal();

            this.$bvModal.show('list-op-modes');
        },
        toggleLastOpMode: function(e) {
            uibuilder.send({topic: 'op_mode', event: 'dblclick'});
        },
        editOpMode: function() {
            this.nameInput = this.name;
            this.primaryInput = this.primary;
            this.enabledInput = this.enabled;
            this.orderInput = this.order;
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
            this.triggerInputState = null;
        },
        handleOk: function(e) {
            let hasErrors = false;

            if(!this.nameInput) {
                this.nameInputState = false;
                hasErrors = true;
            }
            if(!this.orderInput) {
                hasErrors = true;
                this.orderInputState = false;
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
                    trigger: this.triggerInput
                };
                // console.log('save: ', {topic: 'op_mode', event: 'update', value: update});
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