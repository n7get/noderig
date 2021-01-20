/* jshint browser: true, esversion: 5 */
/* globals document,Vue,window,uibuilder,httpVueLoader */
// @ts-nocheck
/*
  Copyright (c) 2019 Julian Knight (Totally Information)

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
'use strict'

/** @see https://github.com/TotallyInformation/node-red-contrib-uibuilder/wiki/Front-End-Library---available-properties-and-methods */

window.noderig = {
    op_mode_mixin: {
        data: function () {
            return {
                op_mode: ''
            }
        },
        created() {
            var self = this;

            uibuilder.onChange('msg', msg => {
                if(msg.hasOwnProperty('op_mode')) {
                    self.$data.op_mode = msg.op_mode;
                }
            });
        },
        methods: {
            isOpMode(arg) {
                if(typeof(arg) === 'string') {
                    return this.op_mode === arg;
                }

                if(Array.isArray(arg)) {
                    return arg.find( e => e === this.op_mode );
                }
            }
        }
    },
};

Vue.prototype.$noderig = {
    menu_items: {
	1:   {desc: 'AGC FAST DELAY', value: undefined},
        2:   {desc: 'AGC MID DELAY', value: undefined},
        3:   {desc: 'AGC SLOW DELAY', value: undefined},
        4:   {desc: 'HOME FUNCTION', value: undefined},
        5:   {desc: 'MY CALL INDICATION', value: undefined},
        6:   {desc: 'DISPLAY COLOR', value: undefined},
        7:   {desc: 'DIMMER LED', value: undefined},
        8:   {desc: 'DIMMER TFT', value: undefined},
        9:   {desc: 'BAR MTR PEAK HOLD', value: undefined},
        10:  {desc: 'DVS RX OUT LEVEL', value: undefined},
        11:  {desc: 'DVS TX OUT LEVEL', value: undefined},
        12:  {desc: 'KEYER TYPE', value: undefined},
        13:  {desc: 'KEYER DOT/DASH', value: undefined},
        14:  {desc: 'CW WEIGHT', value: undefined},
        15:  {desc: 'BEACON INTERVAL', value: undefined},
        16:  {desc: 'NUMBER STYLE', value: undefined},
        17:  {desc: 'CONTEST NUMBER', value: undefined},
        18:  {desc: 'CW MEMORY 1', value: undefined},
        19:  {desc: 'CW MEMORY 2', value: undefined},
        20:  {desc: 'CW MEMORY 3', value: undefined},
        21:  {desc: 'CW MEMORY 4', value: undefined},
        22:  {desc: 'CW MEMORY 5', value: undefined},
        23:  {desc: 'NB WIDTH', value: undefined},
        24:  {desc: 'NB REJECTION', value: undefined},
        25:  {desc: 'NB LEVEL', value: undefined},
        26:  {desc: 'BEEP LEVEL', value: undefined},
        27:  {desc: 'TIME ZONE', value: undefined},
        28:  {desc: 'GPS/232C SELECT', value: undefined},
        29:  {desc: '232C RATE', value: undefined},
        30:  {desc: '232C TOT', value: undefined},
        31:  {desc: 'CAT RATE', value: undefined},
        32:  {desc: 'CAT TOT', value: undefined},
        33:  {desc: 'CAT RTS', value: undefined},
        34:  {desc: 'MEM GROUP', value: undefined},
        35:  {desc: 'QUICK SPLIT FREQ', value: undefined},
        36:  {desc: 'TX TOT', value: undefined},
        37:  {desc: 'MIC SCAN', value: undefined},
        38:  {desc: 'MIC SCAN RESUME', value: undefined},
        39:  {desc: 'REF FREQ ADJ', value: undefined},
        40:  {desc: 'CLAR MODE SELECT', value: undefined},
        41:  {desc: 'AM LCUT FREQ', value: undefined},
        42:  {desc: 'AM LCUT SLOPE', value: undefined},
        43:  {desc: 'AM HCUT FREQ', value: undefined},
        44:  {desc: 'AM HCUT SLOPE', value: undefined},
        45:  {desc: 'AM MIC SELECT', value: undefined},
        46:  {desc: 'AM OUT LEVEL', value: undefined},
        47:  {desc: 'AM PTT SELECT', value: undefined},
        48:  {desc: 'AM PORT SELECT', value: undefined},
        49:  {desc: 'AM DATA GAIN', value: undefined},
        50:  {desc: 'CW LCUT FREQ', value: undefined},
        51:  {desc: 'CW LCUT SLOPE', value: undefined},
        52:  {desc: 'CW HCUT FREQ', value: undefined},
        53:  {desc: 'CW HCUT SLOPE', value: undefined},
        54:  {desc: 'CW OUT LEVEL', value: undefined},
        55:  {desc: 'CW AUTO MODE', value: undefined},
        56:  {desc: 'CW BK-IN TYPE', value: undefined},
        57:  {desc: 'CW BK-IN DELAY', value: undefined},
        58:  {desc: 'CW WAVE SHAPE', value: undefined},
        59:  {desc: 'CW FREQ DISPLAY', value: undefined},
        60:  {desc: 'PC KEYING', value: undefined},
        61:  {desc: 'QSK DELAY TIME', value: undefined},
        62:  {desc: 'DATA MODE', value: undefined},
        63:  {
                 desc: 'PSK TONE',
                 editor: 'list',
                 list: ['PSK', 'OTHER'],
		 value: undefined
             },
	64:  {desc: 'OTHER DISP (SSB)', value: undefined},
        65:  {desc: 'OTHER SHIFT (SSB)', value: undefined},
        66:  {desc: 'DATA LCUT FREQ', value: undefined},
        67:  {desc: 'DATA LCUT SLOPE', value: undefined},
        68:  {desc: 'DATA HCUT FREQ', value: undefined},
        69:  {desc: 'DATA HCUT SLOPE', value: undefined},
        70:  {
                 desc: 'DATA IN SELECT',
                 editor: 'list',
                 list: ['MIC', 'REAR'],
		 value: undefined
             },
        71:  {
                 desc: 'DATA PTT SELECT',
                 editor: 'list',
                 list: ['OFF', 'DAKY', 'RTS', 'DTR'],
		 value: undefined
             },
        72:  {
                 desc: 'DATA PORT SELECT',
                 editor: 'list',
                 list: ['DATA', 'USB'],
		 value: undefined
             },
	73:  {desc: 'DATA OUT LEVEL', value: undefined},
        74:  {desc: 'FM MIC SELECT', value: undefined},
        75:  {desc: 'FM OUT LEVEL', value: undefined},
        76:  {desc: 'FM PKT PTT SELECT', value: undefined},
        77:  {desc: 'FM PKT PORT SELECT', value: undefined},
        78:  {desc: 'FM PKT TX GAIN', value: undefined},
        79:  {desc: 'FM PKT MODE', value: undefined},
        80:  {desc: 'RPT SHIFT 28MHz', value: undefined},
        81:  {desc: 'RPT SHIFT 50MHz', value: undefined},
        82:  {desc: 'RPT SHIFT 144MHz', value: undefined},
        83:  {desc: 'RPT SHIFT 430MHz', value: undefined},
        84:  {desc: 'ARS 144MHz', value: undefined},
        85:  {desc: 'ARS 430MHz', value: undefined},
        86:  {desc: 'DCS POLARITY', value: undefined},
        87:  {desc: 'RADIO ID', value: undefined},
        88:  {desc: 'GM DISPLY', value: undefined},
        89:  {desc: 'DISTANCE', value: undefined},
        90:  {desc: 'AMS TX MODE', value: undefined},
        91:  {desc: 'STANDBY BEEP', value: undefined},
        92:  {desc: 'RTTY LCUT FREQ', value: undefined},
        93:  {desc: 'RTTY LCUT SLOPE', value: undefined},
        94:  {desc: 'RTTY HCUT FREQ', value: undefined},
        95:  {desc: 'RTTY HCUT SLOPE', value: undefined},
        96:  {desc: 'RTTY SHIFT PORT', value: undefined},
        97:  {desc: 'RTTY POLARITY-RX', value: undefined},
        98:  {desc: 'RTTY POLARITY-TX', value: undefined},
        99:  {desc: 'RTTY OUT LEVEL', value: undefined},
        100: {desc: 'RTTY SHIFT FREQ', value: undefined},
        101: {desc: 'RTTY MARK FREQ', value: undefined},
        102: {desc: 'SSB LCUT FREQ', value: undefined},
        103: {desc: 'SSB LCUT SLOPE', value: undefined},
        104: {desc: 'SSB HCUT FREQ', value: undefined},
        105: {desc: 'SSB HCUT SLOPE', value: undefined},
        106: {desc: 'SSB MIC SELECT', value: undefined},
        107: {desc: 'SSB OUT LEVEL', value: undefined},
        108: {desc: 'SSB PTT SELECT', value: undefined},
        109: {desc: 'SSB PORT SELECT', value: undefined},
        110: {desc: 'SSB TX BPF', value: undefined},
        111: {desc: 'APF WIDTH', value: undefined},
        112: {desc: 'CONTOUR LEVEL', value: undefined},
        113: {desc: 'CONTOUR WIDTH', value: undefined},
        114: {desc: 'IF NOTCH WIDTH', value: undefined},
        115: {desc: 'SCP DISPLAY MODE', value: undefined},
        116: {desc: 'SCP SPAN FREQ', value: undefined},
        117: {desc: 'SPECTRUM COLOR', value: undefined},
        118: {desc: 'WATER FALL COLOR', value: undefined},
        119: {desc: 'PRMTRC EQ1 FREQ', value: undefined},
        120: {desc: 'PRMTRC EQ1 LEVEL', value: undefined},
        121: {desc: 'PRMTRC EQ1 BWTH', value: undefined},
        122: {desc: 'PRMTRC EQ2 FREQ', value: undefined},
        123: {desc: 'PRMTRC EQ2 LEVEL', value: undefined},
        124: {desc: 'PRMTRC EQ2 BWTH', value: undefined},
        125: {desc: 'PRMTRC EQ3 FREQ', value: undefined},
        126: {desc: 'PRMTRC EQ3 LEVEL', value: undefined},
        127: {desc: 'PRMTRC EQ3 BWTH', value: undefined},
        128: {desc: 'P-PRMTRC EQ1 FREQ', value: undefined},
        129: {desc: 'P-PRMTRC EQ1 LEVEL', value: undefined},
        130: {desc: 'P-PRMTRC EQ1 BWTH', value: undefined},
        131: {desc: 'P-PRMTRC EQ2 FREQ', value: undefined},
        132: {desc: 'P-PRMTRC EQ2 LEVEL', value: undefined},
        133: {desc: 'P-PRMTRC EQ2 BWTH', value: undefined},
        134: {desc: 'P-PRMTRC EQ3 FREQ', value: undefined},
        135: {desc: 'P-PRMTRC EQ3 LEVEL', value: undefined},
        136: {desc: 'P-PRMTRC EQ3 BWTH', value: undefined},
        137: {desc: 'HF TX MAX POWER', value: undefined},
        138: {desc: '50M TX MAX POWER', value: undefined},
        139: {desc: '144M TX MAX POWER', value: undefined},
        140: {desc: '430M TX MAX POWER', value: undefined},
        141: {desc: 'TUNER SELECT', value: undefined},
        142: {desc: 'VOX SELECT', value: undefined},
        143: {desc: 'VOX GAIN', value: undefined},
        144: {desc: 'VOX DELAY', value: undefined},
        145: {desc: 'ANTI VOX GAIN', value: undefined},
        146: {desc: 'DATA VOX GAIN', value: undefined},
        147: {desc: 'DATA VOX DELAY', value: undefined},
        148: {desc: 'ANTI DVOX GAIN', value: undefined},
        149: {desc: 'EMERGENCY FREQ TX', value: undefined},
        150: {desc: 'PRT/WIRES FREQ', value: undefined},
        151: {desc: 'PRESET FREQUENCY', value: undefined},
        152: {desc: 'SEARCH SETUP', value: undefined},
        153: {desc: 'WIRES DG-ID', value: undefined}
    },
}

// eslint-disable-next-line no-unused-vars
var app1 = new Vue({
    el: '#app',

    /** Load external component files
     *  Make sure there is no leading / in the name
     *  To load from the common folder use like: 'common/component-name.vue' */
    components: {
        'data-hf': httpVueLoader('data-hf.vue'),
    }, // --- End of components --- //

    data: {
    }, // --- End of data --- //

    computed: {
    }, // --- End of computed --- //

    methods: {
    }, // --- End of methods --- //

    // Available hooks: init,mounted,updated,destroyed
    mounted: function(){
        /** **REQUIRED** Start uibuilder comms with Node-RED @since v2.0.0-dev3
         * Pass the namespace and ioPath variables if hosting page is not in the instance root folder
         * e.g. If you get continual `uibuilderfe:ioSetup: SOCKET CONNECT ERROR` error messages.
         * e.g. uibuilder.start('/nr/uib', '/nr/uibuilder/vendor/socket.io') // change to use your paths/names
         */
        uibuilder.start()

        var vueApp = this

    } // --- End of mounted hook --- //

}) // --- End of app1 --- //

// EOF
