<template>
    <b-card class="pb-2" no-body border-variant="secondary">
        <b-card-header class="mx-auto">
            <div @click="toggleConfigOptions">
                Configuration
            </div>
        </b-card-header>
        <div v-show="showConfigOptions" flush>
            <b-button class="mt-2 ml-2" @click="openExportJson('op_mode')">Export Op Modes</b-button>
            <b-button class="mt-2 ml-2" @click="openImportJson('op_mode')">Import Op Modes</b-button>

            <b-button class="mt-2 ml-2" @click="openExportJson('memory_channels')">Export Memory Channels</b-button>
            <b-button class="mt-2 ml-2" @click="openImportJson('memory_channels')">Import Memory Channels</b-button>

            <b-modal
                id="export-json"
                size="sm"
                hide-footer
            >
                <template #modal-header>
                    <div class="px-2 d-flex justify-content-between align-items-left w-100">
                        <div @click="closeExportJson">{{ title }}</div>
                    </div>
                </template>
                <div>
                    <b-form-textarea
                        id="json-text"
                        v-model="jsonText"
                        readonly
                        rows="6"
                        ></b-form-textarea>
                </div>
                <div class="mt-2">
                    <b-button @click.prevent="download">Download</b-button>
                    <b-button @click="copyToClipboard">Copy to Clipboard</b-button>
                </div>
            </b-modal>

            <b-modal
                id="import-json"
                size="sm"
                @ok="handleOk"
            >
                <template #modal-header>
                    <div class="px-2 d-flex justify-content-between align-items-left w-100">
                        <div @click="closeExportJson">{{ title }}</div>
                    </div>
                </template>
                <b-form-group
                    label="JSON:"
                    label-for="json-text"
                    :invalid-feedback="jsonTextInputError"
                    :state="jsonTextInputState"
                >
                    <b-form-textarea
                        id="json-text"
                        v-model="jsonTextInput"
                        rows="6"
                        required
                    ></b-form-textarea>
                </b-form-group>
            </b-modal>
        </div>
    </b-card>
</template>

<script>
module.exports = {
    data: function() {
        return {
            jsonText: '',
            jsonTextInput: '',
            jsonTextInputError: '',
            jsonTextInputState: null,
            showConfigOptions: false,
            title: '',
            which: '',
        };
    },
    methods: {
        openExportJson: function(e) {
            this.topic = e;
            this.title = 'Export';
            uibuilder.send({topic: this.topic, event: 'get_json'});
        },
        closeExportJson: function() {
            this.$bvModal.hide('export-json');
        },
        download: function() {
            var link = document.createElement('a');

            link.href = '/noderig/' + this.topic + '.json';
            link.download = this.topic + '.json';
            link.click();

            this.closeExportJson();
        },
        copyToClipboard: function() {
            var copyText = document.getElementById("json-text");
            copyText.select(); 
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");

            this.closeExportJson();
        },
        openImportJson: function(e) {
            this.topic = e;
            this.title = 'Import';
            this.jsonTextInputState = null;
            this.jsonTextInputError = '';

            this.$bvModal.show('import-json');
        },
        handleOk: function(e) {
            if(!this.jsonTextInput) {
                this.jsonTextInputState = false;
                this.jsonTextInputError = 'JSON data is required';
            }
            else {
                this.jsonTextInputState = true;
                this.jsonTextInputError = '';

                var paylaod = {topic: this.topic, event: 'save_json', value: this.jsonTextInput};
console.log('payload: ', paylaod);
                uibuilder.send(paylaod);
            }

            e.preventDefault();
        },
        toggleConfigOptions: function() {
            this.showConfigOptions = !this.showConfigOptions;
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 'export_json') {
                self.jsonText = p.value;
                this.$bvModal.show('export-json');
            }
            else if(p.name === 'json_validation') {
                if(p.value) {
                    this.jsonTextInputState = false;
                    this.jsonTextInputError = p.value;
                }
                else {
                    this.$bvModal.hide('import-json');
                }
            }
        });
    },
};
</script>