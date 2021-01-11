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

Vue.prototype.$noderig = {
    config_items: {
        1:   {desc: 'AGC FAST DELAY',},
        2:   {desc: 'AGC MID DELAY',},
        3:   {desc: 'AGC SLOW DELAY',},
        4:   {desc: 'HOME FUNCTION',},
        5:   {desc: 'MY CALL INDICATION',},
        6:   {desc: 'DISPLAY COLOR',},
        7:   {desc: 'DIMMER LED',},
        8:   {desc: 'DIMMER TFT',},
        9:   {desc: 'BAR MTR PEAK HOLD',},
        10:  {desc: 'DVS RX OUT LEVEL',},
        11:  {desc: 'DVS TX OUT LEVEL',},
        12:  {desc: 'KEYER TYPE',},
        13:  {desc: 'KEYER DOT/DASH',},
        14:  {desc: 'CW WEIGHT',},
        15:  {desc: 'BEACON INTERVAL',},
        16:  {desc: 'NUMBER STYLE',},
        17:  {desc: 'CONTEST NUMBER',},
        18:  {desc: 'CW MEMORY 1',},
        19:  {desc: 'CW MEMORY 2',},
        20:  {desc: 'CW MEMORY 3',},
        21:  {desc: 'CW MEMORY 4',},
        22:  {desc: 'CW MEMORY 5',},
        23:  {desc: 'NB WIDTH',},
        24:  {desc: 'NB REJECTION',},
        25:  {desc: 'NB LEVEL',},
        26:  {desc: 'BEEP LEVEL',},
        27:  {desc: 'TIME ZONE',},
        28:  {desc: 'GPS/232C SELECT',},
        29:  {desc: '232C RATE',},
        30:  {desc: '232C TOT',},
        31:  {desc: 'CAT RATE',},
        32:  {desc: 'CAT TOT',},
        33:  {desc: 'CAT RTS',},
        34:  {desc: 'MEM GROUP',},
        35:  {desc: 'QUICK SPLIT FREQ',},
        36:  {desc: 'TX TOT',},
        37:  {desc: 'MIC SCAN',},
        38:  {desc: 'MIC SCAN RESUME',},
        39:  {desc: 'REF FREQ ADJ',},
        40:  {desc: 'CLAR MODE SELECT',},
        41:  {desc: 'AM LCUT FREQ',},
        42:  {desc: 'AM LCUT SLOPE',},
        43:  {desc: 'AM HCUT FREQ',},
        44:  {desc: 'AM HCUT SLOPE',},
        45:  {desc: 'AM MIC SELECT',},
        46:  {desc: 'AM OUT LEVEL',},
        47:  {desc: 'AM PTT SELECT',},
        48:  {desc: 'AM PORT SELECT',},
        49:  {desc: 'AM DATA GAIN',},
        50:  {desc: 'CW LCUT FREQ',},
        51:  {desc: 'CW LCUT SLOPE',},
        52:  {desc: 'CW HCUT FREQ',},
        53:  {desc: 'CW HCUT SLOPE',},
        54:  {desc: 'CW OUT LEVEL',},
        55:  {desc: 'CW AUTO MODE',},
        56:  {desc: 'CW BK-IN TYPE',},
        57:  {desc: 'CW BK-IN DELAY',},
        58:  {desc: 'CW WAVE SHAPE',},
        59:  {desc: 'CW FREQ DISPLAY',},
        60:  {desc: 'PC KEYING',},
        61:  {desc: 'QSK DELAY TIME',},
        62:  {desc: 'DATA MODE',},
        63:  {
                 desc: 'PSK TONE',
                 editor: 'list',
                 list: ['PSK', 'OTHER'],
             },
        64:  {desc: 'OTHER DISP (SSB)',},
        65:  {desc: 'OTHER SHIFT (SSB)',},
        66:  {desc: 'DATA LCUT FREQ',},
        67:  {desc: 'DATA LCUT SLOPE',},
        68:  {desc: 'DATA HCUT FREQ',},
        69:  {desc: 'DATA HCUT SLOPE',},
        70:  {
                 desc: 'DATA IN SELECT',
                 editor: 'list',
                 list: ['MIC', 'REAR'],
             },
        71:  {
                 desc: 'DATA PTT SELECT',
                 editor: 'list',
                 list: ['OFF', 'DAKY', 'RTS', 'DTR'],
             },
        72:  {
                 desc: 'DATA PORT SELECT',
                 editor: 'list',
                 list: ['DATA', 'USB'],
             },
        73:  {desc: 'DATA OUT LEVEL',},
        74:  {desc: 'FM MIC SELECT',},
        75:  {desc: 'FM OUT LEVEL',},
        76:  {desc: 'FM PKT PTT SELECT',},
        77:  {desc: 'FM PKT PORT SELECT',},
        78:  {desc: 'FM PKT TX GAIN',},
        79:  {desc: 'FM PKT MODE',},
        80:  {desc: 'RPT SHIFT 28MHz',},
        81:  {desc: 'RPT SHIFT 50MHz',},
        82:  {desc: 'RPT SHIFT 144MHz',},
        83:  {desc: 'RPT SHIFT 430MHz',},
        84:  {desc: 'ARS 144MHz',},
        85:  {desc: 'ARS 430MHz',},
        86:  {desc: 'DCS POLARITY',},
        87:  {desc: 'RADIO ID',},
        88:  {desc: 'GM DISPLY',},
        89:  {desc: 'DISTANCE',},
        90:  {desc: 'AMS TX MODE',},
        91:  {desc: 'STANDBY BEEP',},
        92:  {desc: 'RTTY LCUT FREQ',},
        93:  {desc: 'RTTY LCUT SLOPE',},
        94:  {desc: 'RTTY HCUT FREQ',},
        95:  {desc: 'RTTY HCUT SLOPE',},
        96:  {desc: 'RTTY SHIFT PORT',},
        97:  {desc: 'RTTY POLARITY-RX',},
        98:  {desc: 'RTTY POLARITY-TX',},
        99:  {desc: 'RTTY OUT LEVEL',},
        100: {desc: 'RTTY SHIFT FREQ',},
        101: {desc: 'RTTY MARK FREQ',},
        102: {desc: 'SSB LCUT FREQ',},
        103: {desc: 'SSB LCUT SLOPE',},
        104: {desc: 'SSB HCUT FREQ',},
        105: {desc: 'SSB HCUT SLOPE',},
        106: {desc: 'SSB MIC SELECT',},
        107: {desc: 'SSB OUT LEVEL',},
        108: {desc: 'SSB PTT SELECT',},
        109: {desc: 'SSB PORT SELECT',},
        110: {desc: 'SSB TX BPF',},
        111: {desc: 'APF WIDTH',},
        112: {desc: 'CONTOUR LEVEL',},
        113: {desc: 'CONTOUR WIDTH',},
        114: {desc: 'IF NOTCH WIDTH',},
        115: {desc: 'SCP DISPLAY MODE',},
        116: {desc: 'SCP SPAN FREQ',},
        117: {desc: 'SPECTRUM COLOR',},
        118: {desc: 'WATER FALL COLOR',},
        119: {desc: 'PRMTRC EQ1 FREQ',},
        120: {desc: 'PRMTRC EQ1 LEVEL',},
        121: {desc: 'PRMTRC EQ1 BWTH',},
        122: {desc: 'PRMTRC EQ2 FREQ',},
        123: {desc: 'PRMTRC EQ2 LEVEL',},
        124: {desc: 'PRMTRC EQ2 BWTH',},
        125: {desc: 'PRMTRC EQ3 FREQ',},
        126: {desc: 'PRMTRC EQ3 LEVEL',},
        127: {desc: 'PRMTRC EQ3 BWTH',},
        128: {desc: 'P-PRMTRC EQ1 FREQ',},
        129: {desc: 'P-PRMTRC EQ1 LEVEL',},
        130: {desc: 'P-PRMTRC EQ1 BWTH',},
        131: {desc: 'P-PRMTRC EQ2 FREQ',},
        132: {desc: 'P-PRMTRC EQ2 LEVEL',},
        133: {desc: 'P-PRMTRC EQ2 BWTH',},
        134: {desc: 'P-PRMTRC EQ3 FREQ',},
        135: {desc: 'P-PRMTRC EQ3 LEVEL',},
        136: {desc: 'P-PRMTRC EQ3 BWTH',},
        137: {desc: 'HF TX MAX POWER',},
        138: {desc: '50M TX MAX POWER',},
        139: {desc: '144M TX MAX POWER',},
        140: {desc: '430M TX MAX POWER',},
        141: {desc: 'TUNER SELECT',},
        142: {desc: 'VOX SELECT',},
        143: {desc: 'VOX GAIN',},
        144: {desc: 'VOX DELAY',},
        145: {desc: 'ANTI VOX GAIN',},
        146: {desc: 'DATA VOX GAIN',},
        147: {desc: 'DATA VOX DELAY',},
        148: {desc: 'ANTI DVOX GAIN',},
        149: {desc: 'EMERGENCY FREQ TX',},
        150: {desc: 'PRT/WIRES FREQ',},
        151: {desc: 'PRESET FREQUENCY',},
        152: {desc: 'SEARCH SETUP',},
        153: {desc: 'WIRES DG-ID'},
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
