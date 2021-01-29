<template>
    <div>
        <b-button @click="showList" @dblclick="toggleLastOpMode">{{ name }}</b-button>

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
                :invalid-feedback="errorMessage"
                :state="nameInputState"
            >
                <b-form-input
                    id="name"
                    ref="name-input"
                    v-model="nameInput"
                    :state="nameInputState"
                    required
                ></b-form-input>
                <b-form-textarea
                    id="trigger"
                    v-model="triggerInput"
                    placeholder="Op Mode Trigger"
                    rows="6"
                ></b-form-textarea>
            </b-form-group>
        </b-modal>
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            name: 'Op Mode',
            trigger: '',
            opModes: [],
            nameInput: '',
            triggerInput: '',
            nameInputState: null,
            errorMessage: 'an error message',
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
            this.triggerInput = this.trigger;
            this.$bvModal.show('edit-op-mode');
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
        checkFormValidity: function() {
            var valid = this.$refs.form.checkValidity();

            this.nameInputState = valid;
            return valid
        },
        resetModal: function() {
            this.nameInputState = null;
        },
        handleOk: function(e) {
            let hasErrors = false;

            if(!this.nameInput) {
                this.errorMessage = 'Op Mode name is required';
                hasErrors = true;
            }
            if(this.triggerInput) {
                console.log('trigger: ' + this.triggerInput);
                try {
                    new Function(this.triggerInput);                    
                } catch (error) {
                    this.errorMessage = error.message;
                    hasErrors = true;
                }
            }

            if(hasErrors) {
                this.nameInputState = false;
                e.preventDefault();
            }
            else {
                this.resetModal();
                this.$nextTick(function() {
                    this.$bvModal.hide('edit-op-mode');
                });

                var update = {name: this.nameInput, trigger: this.triggerInput};
                uibuilder.send({topic: 'op_mode', event: 'update', value: update});
            }
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 'op_mode') {
console.log('op_mode: ', p.value);
                self.name = p.value.name;
                if(typeof(p.value.trigger) === 'object') {
                    self.trigger = JSON.stringify(p.value.trigger);
                }
                else {
                    self.trigger = p.value.trigger;
                }
            }
            else if(p.name === 'op_modes') {
                self.opModes = p.value;
            }
        });
    },
};