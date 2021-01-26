<template>
    <div>
        <b-button @click="showList" @dblclick="toggleLastOpMode">{{ opMode }}</b-button>

        <b-modal
            id="list-op-modes"
            size="sm"
            hide-footer
        >
            <template #modal-header>
                <div class="px-2 d-flex justify-content-between align-items-left w-100">
                    <div @click="editOpMode">Edit</div>
                    <div>{{ opMode }}</div>
                    <div @click="saveOpMode">Save</div>
                </div>
            </template>
            <div v-for="name in opModes">
                <div @click="loadOpMode(name)">
                    {{ name }}
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
                invalid-feedback="Invalid name"
                :state="nameInputState"
            >
                <b-form-input
                    id="name"
                    ref="name-input"
                    @keyup.enter="handleOk"
                    v-model="opModeName"
                    :state="nameInputState"
                    required
                ></b-form-input>
            </b-form-group>
        </b-modal>
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            opMode: 'Op Mode',
            opModes: [],
            opModeName: '',
            nameInputState: null,
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
            this.opModeName = this.opMode;
            this.$bvModal.show('edit-op-mode');
        },
        loadOpMode: function(name) {
            this.$nextTick(function() {
                this.$bvModal.hide('list-op-modes');
            });

            uibuilder.send({topic: 'op_mode', event: 'load', value: name});
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
            if(this.opModeName) {
                this.resetModal();
                this.$nextTick(function() {
                    this.$bvModal.hide('edit-op-mode');
                });

                uibuilder.send({topic: 'op_mode', event: 'update', value: {name: this.opModeName}});
            }
            else {
                this.nameInputState = false;
                e.preventDefault();
            }
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 'op_mode') {
                self.opMode = p.value;
            }
            else if(p.name === 'op_modes') {
                self.opModes = p.value;
console.log('op_modes: ', p.value);
            }
        });
    },
};