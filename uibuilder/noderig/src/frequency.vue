<template>
    <div
        @click="clicked().then(e => freqHandleClicks(...e))"
        class="frequency-digits"
        :class="{tx: tx_on}">

        <span v-html="mhz"></span>&nbsp;<span v-html="khz"></span>&nbsp;<span v-html="hz"></span>

        <b-modal
            id="new-freq"
            size="sm"
            @ok="freqHandleOk"
            @shown="freqFocusInput"
        >
            <template #modal-title>
                Set VFO
            </template>
            <b-form-group
                label="Freq:"
                label-for="freq-input"
                invalid-feedback="Invalid frequency"
                :state="freqInputState"
            >
                <b-form-input
                    id="freq-input"
                    ref="freqInput"
                    @keyup.enter="freqHandleOk"
                    v-model="freqInput"
                    :state="freqInputState"
                    required
                ></b-form-input>
            </b-form-group>
        </b-modal>

        <b-modal
            id="memory-channel-list"
            size="sm"
            hide-footer
        >
            <template #modal-header>
                <div class="px-2 d-flex justify-content-between align-items-left w-100">
                    <div>All</div>
                    <div>Memory Channels</div>
                    <div @click="addMemoryChannel()">Add</div>
                </div>
            </template>

            <div v-for="mc in memoryChannels" :key="mc.no">
                <b-row class="font-weight-bold pr-3 py-2 mx-2 my-1 border text-light bg-primary">
                    <div class="col" @click="clicked(mc).then(e => mcHandleClickEvent(...e))">{{ mc.name }}</div>
                    <div class="col-1" @click="mcRemove(mc)"><b-icon-trash></b-icon-trash></div>
                </b-row>
            </div>
        </b-modal>

        <b-modal
            id="memory-channel-edit"
            size="sm"
            @ok="mcHandleOk"
            @shown="mcFocusInput"
        >
            <b-form-group
                label="Name:"
                label-for="mc-name"
                invalid-feedback="Name is required."
                :state="mcNameInputState"
            >
                <b-form-input
                    id="mc-name"
                    ref="mc-name-input"
                    v-model="mcEdit.name"
                    :state="mcNameInputState"
                    required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                label="Frequency:"
                label-for="mc-frequency"
                :invalid-feedback="mcFrequencyFeedback"
                :state="mcFrequencyInputState"
            >
                <b-form-input
                    id="mc-frequency"
                    ref="mc-frequency-input"
                    v-model="mcEdit.frequency"
                    :state="mcFrequencyInputState"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                label="Mode:"
                label-for="mc-mode"
            >
                <b-form-select
                    id="mc-mode"
                    v-model="mcEdit.mode"
                    :options="modeOptions"
                ></b-form-select>
            </b-form-group>

            <div v-if="mcEdit.mode === 'FM'">
                <b-form-group
                    label="Offset:"
                    label-for="mc-offset"
                >
                    <b-form-select
                        id="mc-offset"
                        v-model="mcEdit.offset"
                        :options="offsetOptions"
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                    label="Squelch:"
                    label-for="mc-squelch-mode"
                >
                    <b-form-select
                        id="mc-squelch-mode"
                        v-model="mcEdit.squelchMode"
                        :options="squelchModeOptions"
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                    label="CTCSS Tone:"
                    label-for="mc-ctcss-tone"
                    v-show="mcEdit.squelchMode=== 'CTCSS ENC/DEC' || mcEdit.squelchMode=== 'CTCSS ENC'"
                >
                    <b-form-select
                        id="mc-ctcss-tone"
                        v-model="mcEdit.ctcssTone"
                        :options="ctcssToneOptions"
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                    label="DCS Tone:"
                    label-for="mc-dcs-tome"
                    v-show="mcEdit.squelchMode=== 'DCS ENC/DEC' || mcEdit.squelchMode=== 'DCS ENC'"
                >
                    <b-form-select
                        id="mc-dcs-tome"
                        v-model="mcEdit.dcsTone"
                        :options="dcsToneOptions"
                    ></b-form-select>
                </b-form-group>
            </div>
        </b-modal>
    </div>
</template>

<script>
module.exports = {
    mixins: [window.noderig.double_click_mixin],
    props: {
        vfo: {
            type: String,
            default: 'vfo_a',
            validator: function (value) {
                return ['vfo_a', 'vfo_b'].indexOf(value) !== -1
            },
        }
    },
    data: function() {
        return {
            freq: null,
            mhz: 'mmm',
            khz: 'kkk',
            hz:  'hhh',
            tx_on:  false,
            freqInput: '',
            freqInputState: null,
            memoryChannels: [],
            currentConfig: {name: 'New Memory Channel',},

            mcEdit: {},
            mcNameInputState: null,
            mcFrequencyInputState: null,
            mcFrequencyFeedback: '',

            modeOptions: this.$noderig.modeOptions,
            offsetOptions: this.$noderig.offsetOptions,
            squelchModeOptions: this.$noderig.squelchModeOptions,
            ctcssToneOptions: this.$noderig.ctcssToneOptions,
            dcsToneOptions: this.$noderig.dcsToneOptions,
        }
    },
    methods: {
        freqHandleClicks: function(e, v) {
            if(e === 'click') {
                this.freqOpenDialog(v);
            }
            else {
                this.openMemoryChannelList(v);
            }
        },
        freqOpenDialog: function(e) {
            var FreqUtils = this.$noderig.FreqUtils;

            this.freqResetModal();

            this.freqInput = FreqUtils.formatFreq(this.freq);

            this.$bvModal.show('new-freq');
        },
        freqFocusInput: function() {
            this.$refs.freqInput.focus();
            this.$refs.freqInput.select();
        },
        freqCheckFormValidity: function() {
            var valid = this.$refs.form.checkValidity();

            this.freqInputState = valid;
            return valid
        },
        freqResetModal: function() {
            this.freqInputState = null;
        },
        freqHandleOk: function(e) {
            var FreqUtils = this.$noderig.FreqUtils,
                new_freq = FreqUtils.convFreq(this.freqInput);

            if(new_freq) {
                this.freqResetModal();
                this.$nextTick(function() {
                    this.$bvModal.hide('new-freq');
                });

                uibuilder.send({topic: this.vfo, event: 'set', value: new_freq});
            }
            else {
                this.freqInputState = false;
                e.preventDefault();
            }
        },
        mcModalReset: function() {
            this.mcNameInputState = null;
            this.mcFrequencyInputState = null;
            this.mcFrequencyFeedback = '';
        },
        openMemoryChannelList: function(e) {
            this.mcModalReset();

            this.$bvModal.show('memory-channel-list');
        },
        mcHandleClickEvent(e, mc) {
            if(e === 'click') {
                this.loadMemoryChannel(mc);
            }
            else {
                this.editMemoryChannel(mc);
            }
        },
        loadMemoryChannel: function(mc) {
            this.$bvModal.hide('memory-channel-list');

            uibuilder.send({topic: 'memory_channel', event: 'load', value: mc.no});
        },
        mcOpenEditModal: function(mc) {
            var FreqUtils = this.$noderig.FreqUtils;

            this.mcEdit = Object.assign({name: 'New Memory Channel'}, mc, {frequency: FreqUtils.formatFreq(mc.frequency)});

            this.mcModalReset();

            this.$bvModal.show('memory-channel-edit');
        },
        addMemoryChannel: function() {
            this.mcOpenEditModal(this.currentConfig);
        },
        editMemoryChannel: function(mc) {
            this.mcOpenEditModal(mc);
        },
        mcRemove: function(mc, e) {
            this.$bvModal.msgBoxConfirm('Delete Memory Channel ' + mc.name + '?', {})
                .then(function(result) {
                    if(result) {
                        uibuilder.send({topic: 'memory_channel', event: 'remove', value: mc.no});
                    }
                });
        },
        mcFocusInput: function() {
            this.$refs['mc-name-input'].focus();
            this.$refs['mc-name-input'].select();
        },
        mcHandleOk: function(e) {
            var FreqUtils = this.$noderig.FreqUtils,
                hasErrors = false,
                newMc = {};

            if(!this.mcEdit.name) {
                this.mcNameInputState = false;
                hasErrors = true;
            }
            else {
                this.mcNameInputState = true;
            }

            if(!this.mcEdit.frequency) {
                this.mcFrequencyInputState = false;
                this.mcFrequencyFeedback = 'Frequency is required.';
                hasErrors = true;
            }
            else if(!FreqUtils.convFreq(this.mcEdit.frequency)) {
                this.mcFrequencyInputState = false;
                this.mcFrequencyFeedback = 'Frequency is not valid.';
                hasErrors = true;
            }
            else {
                this.mcFrequencyInputState = false;
            }

            if(hasErrors) {
                e.preventDefault();
            }
            else {
                this.mcModalReset();
                this.$nextTick(function() {
                    this.$bvModal.hide('memory-channel-edit');
                });

                newMc.no = this.mcEdit.no;
                newMc.name = this.mcEdit.name;
                newMc.frequency = FreqUtils.convFreq(this.mcEdit.frequency);
                newMc.mode = this.mcEdit.mode;
                if(this.mcEdit.mode === 'FM') {
                    newMc.offset = this.mcEdit.offset;
                    newMc.squelchMode = this.mcEdit.squelchMode;
                    newMc.ctcssTone = this.mcEdit.ctcssTone;
                    newMc.dcsTone = this.mcEdit.dcsTone;
                }
                uibuilder.send({topic: 'memory_channel', event: 'update', value: newMc});
            }
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === self.vfo) {
                if(p.hasOwnProperty('value')) {
                    if(p.freq !== self.freq) {
                        let value = p.value.toString();
                        while(value.length < 9) {
                            value = ' ' + value;
                        }
                        self.freq = value;
                        self.currentConfig.frequency = p.value;

                        self.mhz = value.substring(0, 3).replace(/ /g,'&nbsp;');;
                        self.khz = value.substring(3, 6);
                        self.hz  = value.substring(6, 9);
                    }
                }
            }
            else if(p.name === 'memory_channels') {
                self.memoryChannels = p.value;
            }
            else if(p.name === 'offset') {
                self.currentConfig.offset = p.value;
            }
            else if(p.name === 'mode') {
                self.currentConfig.mode = p.value;
            }
            else if(p.name === 'ctcss') {
                self.currentConfig.squelchMode = p.value;
            }
            else if(p.name === 'ctcss_tone_frequency') {
                self.currentConfig.ctcssTone = p.value;
            }
            else if(p.name === 'dcs_tone_frequency') {
                self.currentConfig.dcsTone = p.value;
            }
            else if(p.name === 'transmit') {
                if(p.hasOwnProperty('value')) {
                    self.tx_on = p.value;
                }
            }
        });
    }
}
</script>

<style scoped>
    .frequency-digits {
        font-family: "Monaco", "Lucida Console", "Andalé Mono";
        font-size: 32px;
        color: green;
        padding-right: 0;
    }
    .frequency-digits.tx {
        color: red;
    }
</style>