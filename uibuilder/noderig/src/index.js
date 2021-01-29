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
    settings: {
        af_gain: { desc: 'AF GAIN', value: null, changed: false, fav: false, saved: false},
        tuner: { desc: 'ANTENNA TUNER CONTROL', value: null, changed: false, fav: false, saved: false},
        apf_freq: { desc: 'APF FREQ', value: null, changed: false, fav: false, saved: false},
        apf_on: { desc: 'APF ON/OFF', value: null, changed: false, fav: false, saved: false},
        auto_notch: { desc: 'AUTO NOTCH', value: null, changed: false, fav: false, saved: false},
        break_in: { desc: 'BREAK-IN', value: null, changed: false, fav: false, saved: false},
        clar: { desc: 'CLAR', value: null, changed: false, fav: false, saved: false},
        contour_freq: { desc: 'CONTOUR FREQ', value: null, changed: false, fav: false, saved: false},
        contour_on: { desc: 'CONTOUR ON/OFF', value: null, changed: false, fav: false, saved: false},
        ctcss: { desc: 'CTCSS', value: null, changed: false, fav: false, saved: false},
        ctcss_tone_frequency: { desc: 'CTCSS TONE FREQUENCY', value: null, changed: false, fav: false, saved: false},
        cw_break_in_delay_time: { desc: 'CW BREAK-IN DELAY TIME', value: null, changed: false, fav: false, saved: false},
        cw_spot: { desc: 'CW SPOT', value: null, changed: false, fav: false, saved: false},
        date: { desc: 'DATE', value: null, changed: false, fav: false, saved: false},
        dcs_tone_frequency: { desc: 'DCS TONE FREQUENCY', value: null, changed: false, fav: false, saved: false},
        fast_step: { desc: 'FAST STEP', value: null, changed: false, fav: false, saved: false},
        vfo_a: { desc: 'FREQUENCY VFO-A', value: null, changed: false, fav: false, saved: false},
        vfo_b: { desc: 'FREQUENCY VFO-B', value: null, changed: false, fav: false, saved: false},
        if_shift: { desc: 'IF-SHIFT', value: null, changed: false, fav: false, saved: false},
        key_pitch: { desc: 'KEY PITCH', value: null, changed: false, fav: false, saved: false},
        key_speed: { desc: 'KEY SPEED', value: null, changed: false, fav: false, saved: false},
        keyer: { desc: 'KEYER', value: null, changed: false, fav: false, saved: false},
        lock: { desc: 'LOCK', value: null, changed: false, fav: false, saved: false},
        manual_notch_level: { desc: 'MANUAL NOTCH LEVEL', value: null, changed: false, fav: false, saved: false},
        manual_notch_on: { desc: 'MANUAL NOTCH ON/OFF', value: null, changed: false, fav: false, saved: false},
        meter_sw: { desc: 'METER SW', value: null, changed: false, fav: false, saved: false},
        mic_gain: { desc: 'MIC GAIN', value: null, changed: false, fav: false, saved: false},
        mode: { desc: 'MODE', value: null, changed: false, fav: false, saved: false},
        monitor_level: { desc: 'MONITOR LEVEL', value: null, changed: false, fav: false, saved: false},
        monitor_on: { desc: 'MONITOR ON/OFF', value: null, changed: false, fav: false, saved: false},
        mox_set: { desc: 'MOX SET', value: null, changed: false, fav: false, saved: false},
        narrow: { desc: 'NARROW', value: null, changed: false, fav: false, saved: false},
        noise_blanker_level: { desc: 'NOISE BLANKER LEVEL', value: null, changed: false, fav: false, saved: false},
        noise_blanker_status: { desc: 'NOISE BLANKER STATUS', value: null, changed: false, fav: false, saved: false},
        noise_reduction: { desc: 'NOISE REDUCTION', value: null, changed: false, fav: false, saved: false},
        noise_reduction_level: { desc: 'NOISE REDUCTION LEVEL', value: null, changed: false, fav: false, saved: false},
        offset: { desc: 'OFFSET (REPEATER SHIFT)', value: null, changed: false, fav: false, saved: false},
        parametric_microphone_equalizer: { desc: 'PARAMETRIC MICROPHONE EQUALIZER', value: null, changed: false, fav: false, saved: false},
        pll_unlock_status: { desc: 'PLL UNLOCK STATUS', value: null, changed: false, fav: false, saved: false},
        power_level: { desc: 'POWER CONTROL', value: null, changed: false, fav: false, saved: false},
        pre_amp: { desc: 'PRE-AMP (IPO)', value: null, changed: false, fav: false, saved: false},
        radio_status: { desc: 'RADIO STATUS', value: null, changed: false, fav: false, saved: false},
        rf_attenuator: { desc: 'RF ATTENUATOR', value: null, changed: false, fav: false, saved: false},
        rf_gain: { desc: 'RF GAIN', value: null, changed: false, fav: false, saved: false},
        speech_processor_level: { desc: 'SPEECH PROCESSOR LEVEL', value: null, changed: false, fav: false, saved: false},
        speech_processor_on: { desc: 'SPEECH PROCESSOR ON/OFF', value: null, changed: false, fav: false, saved: false},
        squelclh_level: { desc: 'SQUELCLH LEVEL', value: null, changed: false, fav: false, saved: false},
        time: { desc: 'TIME', value: null, changed: false, fav: false, saved: false},
        time_differential: { desc: 'TIME DIFFERENTIAL', value: null, changed: false, fav: false, saved: false},
        transmit: { desc: 'TX SET', value: null, changed: false, fav: false, saved: false},
        tx_clar: { desc: 'TX CLAR', value: null, changed: false, fav: false, saved: false},
        txw: { desc: 'TXW', value: null, changed: false, fav: false, saved: false},
        vox_gain: { desc: 'VOX GAIN', value: null, changed: false, fav: false, saved: false},
        vox_status: { desc: 'VOX STATUS', value: null, changed: false, fav: false, saved: false},
    },
    menu_items: {
        1:   {desc: 'AGC FAST DELAY', value: null, changed: false, fav: false, saved: false},
        2:   {desc: 'AGC MID DELAY', value: null, changed: false, fav: false, saved: false},
        3:   {desc: 'AGC SLOW DELAY', value: null, changed: false, fav: false, saved: false},
        4:   {desc: 'HOME FUNCTION', value: null, changed: false, fav: false, saved: false},
        5:   {desc: 'MY CALL INDICATION', value: null, changed: false, fav: false, saved: false},
        6:   {desc: 'DISPLAY COLOR', value: null, changed: false, fav: false, saved: false},
        7:   {desc: 'DIMMER LED', value: null, changed: false, fav: false, saved: false},
        8:   {desc: 'DIMMER TFT', value: null, changed: false, fav: false, saved: false},
        9:   {desc: 'BAR MTR PEAK HOLD', value: null, changed: false, fav: false, saved: false},
        10:  {desc: 'DVS RX OUT LEVEL', value: null, changed: false, fav: false, saved: false},
        11:  {desc: 'DVS TX OUT LEVEL', value: null, changed: false, fav: false, saved: false},
        12:  {desc: 'KEYER TYPE', value: null, changed: false, fav: false, saved: false},
        13:  {desc: 'KEYER DOT/DASH', value: null, changed: false, fav: false, saved: false},
        14:  {desc: 'CW WEIGHT', value: null, changed: false, fav: false, saved: false},
        15:  {desc: 'BEACON INTERVAL', value: null, changed: false, fav: false, saved: false},
        16:  {desc: 'NUMBER STYLE', value: null, changed: false, fav: false, saved: false},
        17:  {desc: 'CONTEST NUMBER', value: null, changed: false, fav: false, saved: false},
        18:  {desc: 'CW MEMORY 1', value: null, changed: false, fav: false, saved: false},
        19:  {desc: 'CW MEMORY 2', value: null, changed: false, fav: false, saved: false},
        20:  {desc: 'CW MEMORY 3', value: null, changed: false, fav: false, saved: false},
        21:  {desc: 'CW MEMORY 4', value: null, changed: false, fav: false, saved: false},
        22:  {desc: 'CW MEMORY 5', value: null, changed: false, fav: false, saved: false},
        23:  {desc: 'NB WIDTH', value: null, changed: false, fav: false, saved: false},
        24:  {desc: 'NB REJECTION', value: null, changed: false, fav: false, saved: false},
        25:  {desc: 'NB LEVEL', value: null, changed: false, fav: false, saved: false},
        26:  {desc: 'BEEP LEVEL', value: null, changed: false, fav: false, saved: false},
        27:  {desc: 'TIME ZONE', value: null, changed: false, fav: false, saved: false},
        28:  {desc: 'GPS/232C SELECT', value: null, changed: false, fav: false, saved: false},
        29:  {desc: '232C RATE', value: null, changed: false, fav: false, saved: false},
        30:  {desc: '232C TOT', value: null, changed: false, fav: false, saved: false},
        31:  {desc: 'CAT RATE', value: null, changed: false, fav: false, saved: false},
        32:  {desc: 'CAT TOT', value: null, changed: false, fav: false, saved: false},
        33:  {desc: 'CAT RTS', value: null, changed: false, fav: false, saved: false},
        34:  {desc: 'MEM GROUP', value: null, changed: false, fav: false, saved: false},
        35:  {desc: 'QUICK SPLIT FREQ', value: null, changed: false, fav: false, saved: false},
        36:  {desc: 'TX TOT', value: null, changed: false, fav: false, saved: false},
        37:  {desc: 'MIC SCAN', value: null, changed: false, fav: false, saved: false},
        38:  {desc: 'MIC SCAN RESUME', value: null, changed: false, fav: false, saved: false},
        39:  {desc: 'REF FREQ ADJ', value: null, changed: false, fav: false, saved: false},
        40:  {desc: 'CLAR MODE SELECT', value: null, changed: false, fav: false, saved: false},
        41:  {desc: 'AM LCUT FREQ', value: null, changed: false, fav: false, saved: false},
        42:  {desc: 'AM LCUT SLOPE', value: null, changed: false, fav: false, saved: false},
        43:  {desc: 'AM HCUT FREQ', value: null, changed: false, fav: false, saved: false},
        44:  {desc: 'AM HCUT SLOPE', value: null, changed: false, fav: false, saved: false},
        45:  {desc: 'AM MIC SELECT', value: null, changed: false, fav: false, saved: false},
        46:  {desc: 'AM OUT LEVEL', value: null, changed: false, fav: false, saved: false},
        47:  {desc: 'AM PTT SELECT', value: null, changed: false, fav: false, saved: false},
        48:  {desc: 'AM PORT SELECT', value: null, changed: false, fav: false, saved: false},
        49:  {desc: 'AM DATA GAIN', value: null, changed: false, fav: false, saved: false},
        50:  {desc: 'CW LCUT FREQ', value: null, changed: false, fav: false, saved: false},
        51:  {desc: 'CW LCUT SLOPE', value: null, changed: false, fav: false, saved: false},
        52:  {desc: 'CW HCUT FREQ', value: null, changed: false, fav: false, saved: false},
        53:  {desc: 'CW HCUT SLOPE', value: null, changed: false, fav: false, saved: false},
        54:  {desc: 'CW OUT LEVEL', value: null, changed: false, fav: false, saved: false},
        55:  {desc: 'CW AUTO MODE', value: null, changed: false, fav: false, saved: false},
        56:  {desc: 'CW BK-IN TYPE', value: null, changed: false, fav: false, saved: false},
        57:  {desc: 'CW BK-IN DELAY', value: null, changed: false, fav: false, saved: false},
        58:  {desc: 'CW WAVE SHAPE', value: null, changed: false, fav: false, saved: false},
        59:  {desc: 'CW FREQ DISPLAY', value: null, changed: false, fav: false, saved: false},
        60:  {desc: 'PC KEYING', value: null, changed: false, fav: false, saved: false},
        61:  {desc: 'QSK DELAY TIME', value: null, changed: false, fav: false, saved: false},
        62:  {desc: 'DATA MODE', value: null, changed: false, fav: false, saved: false},
        63:  {desc: 'PSK TONE', value: null , changed: false, fav: false, saved: false},
        64:  {desc: 'OTHER DISP (SSB)', value: null, changed: false, fav: false, saved: false},
        65:  {desc: 'OTHER SHIFT (SSB)', value: null, changed: false, fav: false, saved: false},
        66:  {desc: 'DATA LCUT FREQ', value: null, changed: false, fav: false, saved: false},
        67:  {desc: 'DATA LCUT SLOPE', value: null, changed: false, fav: false, saved: false},
        68:  {desc: 'DATA HCUT FREQ', value: null, changed: false, fav: false, saved: false},
        69:  {desc: 'DATA HCUT SLOPE', value: null, changed: false, fav: false, saved: false},
        70:  {desc: 'DATA IN SELECT', value: null , changed: false, fav: false, saved: false},
        71:  {desc: 'DATA PTT SELECT', value: null , changed: false, fav: false, saved: false},
        72:  {desc: 'DATA PORT SELECT', value: null , changed: false, fav: false, saved: false},
        73:  {desc: 'DATA OUT LEVEL', value: null, changed: false, fav: false, saved: false},
        74:  {desc: 'FM MIC SELECT', value: null, changed: false, fav: false, saved: false},
        75:  {desc: 'FM OUT LEVEL', value: null, changed: false, fav: false, saved: false},
        76:  {desc: 'FM PKT PTT SELECT', value: null, changed: false, fav: false, saved: false},
        77:  {desc: 'FM PKT PORT SELECT', value: null, changed: false, fav: false, saved: false},
        78:  {desc: 'FM PKT TX GAIN', value: null, changed: false, fav: false, saved: false},
        79:  {desc: 'FM PKT MODE', value: null, changed: false, fav: false, saved: false},
        80:  {desc: 'RPT SHIFT 28MHz', value: null, changed: false, fav: false, saved: false},
        81:  {desc: 'RPT SHIFT 50MHz', value: null, changed: false, fav: false, saved: false},
        82:  {desc: 'RPT SHIFT 144MHz', value: null, changed: false, fav: false, saved: false},
        83:  {desc: 'RPT SHIFT 430MHz', value: null, changed: false, fav: false, saved: false},
        84:  {desc: 'ARS 144MHz', value: null, changed: false, fav: false, saved: false},
        85:  {desc: 'ARS 430MHz', value: null, changed: false, fav: false, saved: false},
        86:  {desc: 'DCS POLARITY', value: null, changed: false, fav: false, saved: false},
        87:  {desc: 'RADIO ID', value: null, changed: false, fav: false, saved: false},
        88:  {desc: 'GM DISPLY', value: null, changed: false, fav: false, saved: false},
        89:  {desc: 'DISTANCE', value: null, changed: false, fav: false, saved: false},
        90:  {desc: 'AMS TX MODE', value: null, changed: false, fav: false, saved: false},
        91:  {desc: 'STANDBY BEEP', value: null, changed: false, fav: false, saved: false},
        92:  {desc: 'RTTY LCUT FREQ', value: null, changed: false, fav: false, saved: false},
        93:  {desc: 'RTTY LCUT SLOPE', value: null, changed: false, fav: false, saved: false},
        94:  {desc: 'RTTY HCUT FREQ', value: null, changed: false, fav: false, saved: false},
        95:  {desc: 'RTTY HCUT SLOPE', value: null, changed: false, fav: false, saved: false},
        96:  {desc: 'RTTY SHIFT PORT', value: null, changed: false, fav: false, saved: false},
        97:  {desc: 'RTTY POLARITY-RX', value: null, changed: false, fav: false, saved: false},
        98:  {desc: 'RTTY POLARITY-TX', value: null, changed: false, fav: false, saved: false},
        99:  {desc: 'RTTY OUT LEVEL', value: null, changed: false, fav: false, saved: false},
        100: {desc: 'RTTY SHIFT FREQ', value: null, changed: false, fav: false, saved: false},
        101: {desc: 'RTTY MARK FREQ', value: null, changed: false, fav: false, saved: false},
        102: {desc: 'SSB LCUT FREQ', value: null, changed: false, fav: false, saved: false},
        103: {desc: 'SSB LCUT SLOPE', value: null, changed: false, fav: false, saved: false},
        104: {desc: 'SSB HCUT FREQ', value: null, changed: false, fav: false, saved: false},
        105: {desc: 'SSB HCUT SLOPE', value: null, changed: false, fav: false, saved: false},
        106: {desc: 'SSB MIC SELECT', value: null, changed: false, fav: false, saved: false},
        107: {desc: 'SSB OUT LEVEL', value: null, changed: false, fav: false, saved: false},
        108: {desc: 'SSB PTT SELECT', value: null, changed: false, fav: false, saved: false},
        109: {desc: 'SSB PORT SELECT', value: null, changed: false, fav: false, saved: false},
        110: {desc: 'SSB TX BPF', value: null, changed: false, fav: false, saved: false},
        111: {desc: 'APF WIDTH', value: null, changed: false, fav: false, saved: false},
        112: {desc: 'CONTOUR LEVEL', value: null, changed: false, fav: false, saved: false},
        113: {desc: 'CONTOUR WIDTH', value: null, changed: false, fav: false, saved: false},
        114: {desc: 'IF NOTCH WIDTH', value: null, changed: false, fav: false, saved: false},
        115: {desc: 'SCP DISPLAY MODE', value: null, changed: false, fav: false, saved: false},
        116: {desc: 'SCP SPAN FREQ', value: null, changed: false, fav: false, saved: false},
        117: {desc: 'SPECTRUM COLOR', value: null, changed: false, fav: false, saved: false},
        118: {desc: 'WATER FALL COLOR', value: null, changed: false, fav: false, saved: false},
        119: {desc: 'PRMTRC EQ1 FREQ', value: null, changed: false, fav: false, saved: false},
        120: {desc: 'PRMTRC EQ1 LEVEL', value: null, changed: false, fav: false, saved: false},
        121: {desc: 'PRMTRC EQ1 BWTH', value: null, changed: false, fav: false, saved: false},
        122: {desc: 'PRMTRC EQ2 FREQ', value: null, changed: false, fav: false, saved: false},
        123: {desc: 'PRMTRC EQ2 LEVEL', value: null, changed: false, fav: false, saved: false},
        124: {desc: 'PRMTRC EQ2 BWTH', value: null, changed: false, fav: false, saved: false},
        125: {desc: 'PRMTRC EQ3 FREQ', value: null, changed: false, fav: false, saved: false},
        126: {desc: 'PRMTRC EQ3 LEVEL', value: null, changed: false, fav: false, saved: false},
        127: {desc: 'PRMTRC EQ3 BWTH', value: null, changed: false, fav: false, saved: false},
        128: {desc: 'P-PRMTRC EQ1 FREQ', value: null, changed: false, fav: false, saved: false},
        129: {desc: 'P-PRMTRC EQ1 LEVEL', value: null, changed: false, fav: false, saved: false},
        130: {desc: 'P-PRMTRC EQ1 BWTH', value: null, changed: false, fav: false, saved: false},
        131: {desc: 'P-PRMTRC EQ2 FREQ', value: null, changed: false, fav: false, saved: false},
        132: {desc: 'P-PRMTRC EQ2 LEVEL', value: null, changed: false, fav: false, saved: false},
        133: {desc: 'P-PRMTRC EQ2 BWTH', value: null, changed: false, fav: false, saved: false},
        134: {desc: 'P-PRMTRC EQ3 FREQ', value: null, changed: false, fav: false, saved: false},
        135: {desc: 'P-PRMTRC EQ3 LEVEL', value: null, changed: false, fav: false, saved: false},
        136: {desc: 'P-PRMTRC EQ3 BWTH', value: null, changed: false, fav: false, saved: false},
        137: {desc: 'HF TX MAX POWER', value: null, changed: false, fav: false, saved: false},
        138: {desc: '50M TX MAX POWER', value: null, changed: false, fav: false, saved: false},
        139: {desc: '144M TX MAX POWER', value: null, changed: false, fav: false, saved: false},
        140: {desc: '430M TX MAX POWER', value: null, changed: false, fav: false, saved: false},
        141: {desc: 'TUNER SELECT', value: null, changed: false, fav: false, saved: false},
        142: {desc: 'VOX SELECT', value: null, changed: false, fav: false, saved: false},
        143: {desc: 'VOX GAIN', value: null, changed: false, fav: false, saved: false},
        144: {desc: 'VOX DELAY', value: null, changed: false, fav: false, saved: false},
        145: {desc: 'ANTI VOX GAIN', value: null, changed: false, fav: false, saved: false},
        146: {desc: 'DATA VOX GAIN', value: null, changed: false, fav: false, saved: false},
        147: {desc: 'DATA VOX DELAY', value: null, changed: false, fav: false, saved: false},
        148: {desc: 'ANTI DVOX GAIN', value: null, changed: false, fav: false, saved: false},
        149: {desc: 'EMERGENCY FREQ TX', value: null, changed: false, fav: false, saved: false},
        150: {desc: 'PRT/WIRES FREQ', value: null, changed: false, fav: false, saved: false},
        151: {desc: 'PRESET FREQUENCY', value: null, changed: false, fav: false, saved: false},
        152: {desc: 'SEARCH SETUP', value: null, changed: false, fav: false, saved: false},
        153: {desc: 'WIRES DG-ID', value: null, changed: false, fav: false, saved: false},
    },
    MenuValueConverter: (function () {
        function isEmptyValue(value) {
            if (typeof (value) === 'string' && value.length === 0) {
                return true;
            }

            if (value === null || value === undefined) {
                return true
            }

            return false;
        }

        function pad(len) {
            return function (value) {
                if (isEmptyValue(value)) {
                    return null;
                }

                let n = typeof (value) === 'string' ? value : value.toString();

                while (n.length < len) {
                    n = '0' + n;
                }

                return n;
            };
        }
        var pad1 = pad(1);
        var pad2 = pad(2);
        var pad3 = pad(3);
        var pad4 = pad(4);
        var pad9 = pad(9);

        // UI Iterface functions

        function defaultToUi(value) {
            return value;
        }
        function defaultFromUi(value) {
            return value;
        }

        function fromUiMaxPower(max) {
            return function (value) {
                if (value < 5) {
                    return '005';
                }
                if (value >= max) {
                    return pad3(max);
                }
                return pad3(value);
            }
        }

        function toUiInt(value) {
            return parseInt(value, 10).toString();
        }

        function fromUiIntBy20(value) {
            if (isEmptyValue(value)) {
                return null;
            }

            return pad4(value - (v % 20));
        }

        function toCutFreq(value, offset) {
            if (value === 0) {
                return 'OFF';
            }

            return ((value + offset) * 50).toString();
        }
        function fromCutFreq(value, offset) {
            if (value === 'OFF') {
                return '00';
            }

            return pad2(Math.floor((value / 50)) - offset);
        }
        function toUiLCutFreq(value) {
            return toCutFreq(value, 1);
        }
        function fromUiLCutFreq(value) {
            return fromCutFreq(value, 1);
        }
        function toUiHCutFreq(no, value) {
            return toCutFreq(value, 13);
        }
        function fromUiHCutFreq(no, value) {
            return fromCutFreq(value, 13);
        }

        // Start of maps

        var mic_select_map = {
            '0': 'MIC',
            '1': 'REAR',
        };

        var ptt_select_map = {
            '0': 'DAKY',
            '1': 'RTS',
            '2': 'DTR',
        };

        var port_select_map = {
            '0': 'DATA',
            '1': 'USB',
        };

        var slope_map = {
            '0': '6 dB',
            '1': '18 dB',
        };

        var cw_memory_map = {
            '0': 'TEXT',
            '1': 'MESSAGE',
        };

        var baud_rate_map = {
            '0': '4800',
            '1': '9600',
            '2': '19200',
            '3': '38400',
        };

        var serial_timeout_map = {
            '0': '10 ms',
            '1': '100 ms',
            '2': '1000 ms',
            '3': '3000 ms',
        };

        var enable_disable_map = {
            '0': 'DISABLE',
            '1': 'ENABLE',
        };

        var on_off_map = {
            '0': 'OFF',
            '1': 'ON',
        };

        var normal_reverse_map = {
            '0': 'NORMAL',
            '1': 'REVERSE',
        };

        var standard_colors_map = {
            '0': 'BLUE',
            '1': 'GRAY',
            '2': 'GREEN',
            '3': 'ORANGE',
            '4': 'PURPLE',
            '5': 'RED',
            '6': 'SKY BLUE',
        };


        var prmtrc_eq1_freq_map = {
            '00': 'OFF',
            '01': '100 Hz',
            '02': '200 Hz',
            '03': '300 Hz',
            '04': '400 Hz',
            '05': '500 Hz',
            '06': '600 Hz',
            '07': '700 Hz',
        };

        var prmtrc_eq2_freq_map = {
            '00': 'OFF',
            '01': '700 Hz',
            '02': '800 Hz',
            '03': '900 Hz',
            '04': '1000 Hz',
            '05': '1100 Hz',
            '06': '1200 Hz',
            '07': '1300 Hz',
            '08': '1400 Hz',
            '09': '1500 Hz',
        };

        var prmtrc_eq3_freq_map = {
            '00': 'OFF',
            '01': '1500 Hz',
            '02': '1600 Hz',
            '03': '1700 Hz',
            '04': '1800 Hz',
            '05': '1900 Hz',
            '06': '2000 Hz',
            '07': '2100 Hz',
            '08': '2200 Hz',
            '09': '2300 Hz',
            '10': '2400 Hz',
            '11': '2500 Hz',
            '12': '2600 Hz',
            '13': '2700 Hz',
            '14': '2800 Hz',
            '15': '2900 Hz',
            '16': '3000 Hz',
            '17': '3100 Hz',
            '18': '3800 Hz',
        };

        // End of maps

        var mi_table = {
            1: {
                toUi: toUiInt,
                fromUi: fromUiIntBy20,
            },
            2: {
                toUi: toUiInt,
                fromUi: fromUiIntBy20,
            },
            3: {
                toUi: toUiInt,
                fromUi: fromUiIntBy20,
            },
            4: {
                rig_ui_map: {
                    '0': 'SCOPE',
                    '1': 'FUNCTION',
                },
            },
            5: {
                toUi: toUiInt,
                fromUi: pad1,
            },
            6: {
                rig_ui_map: standard_colors_map,
            },
            7: {
                rig_ui_map: {
                    '0': '1',
                    '1': '2',
                },
            },
            8: {
                toUi: toUiInt,
                fromUi: pad2,
            },
            9: {
                rig_ui_map: {
                    '0': 'OFF',
                    '1': '0.5sec',
                    '2': '1.0sec',
                    '3': '2.0sec',
                },
            },
            10: {
                toUi: toUiInt,
                fromUi: pad3,
            },
            11: {
                toUi: toUiInt,
                fromUi: pad3,
            },
            12: {
                rig_ui_map: {
                    '0': 'OFF',
                    '1': 'BUG',
                    '2': 'ELEKEY-A',
                    '3': 'ELEKEY-B',
                    '4': 'ELEKEY-Y',
                    '5': 'ACS',
                },
            },
            13: {
                rig_ui_map: normal_reverse_map,
            },
            14: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
            15: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
            16: {
                rig_ui_map: {
                    '0': '1290',
                    '1': 'AUNO',
                    '2': 'AUNT',
                    '3': 'A2NO',
                    '4': 'A2NT',
                    '5': '12NO',
                    '6': '12NT',
                },
            },
            17: {
                toUi: toUiInt,
                fromUi: pad4,
            },
            18: {
                rig_ui_map: cw_memory_map,
            },
            19: {
                rig_ui_map: cw_memory_map,
            },
            20: {
                rig_ui_map: cw_memory_map,
            },
            21: {
                rig_ui_map: cw_memory_map,
            },
            22: {
                rig_ui_map: cw_memory_map,
            },
            23: {
                rig_ui_map: {
                    '0': '1 ms',
                    '1': '3 ms',
                    '2': '10 ms',
                },
            },
            24: {
                rig_ui_map: {
                    '0': '10 dB',
                    '1': '30 dB',
                    '2': '50 dB',
                },
            },
            25: {
                toUi: toUiInt,
                fromUi: pad2,
            },
            26: {
                toUi: toUiInt,
                fromUi: pad3,
            },
            27: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
            28: {
                rig_ui_map: {
                    '0': 'GPS1',
                    '1': 'GPS2',
                    '2': 'RS232C',
                },
            },
            29: {
                rig_ui_map: baud_rate_map,
            },
            30: {
                rig_ui_map: serial_timeout_map,
            },
            31: {
                rig_ui_map: baud_rate_map,
            },
            32: {
                rig_ui_map: serial_timeout_map,
            },
            33: {
                rig_ui_map: enable_disable_map,
            },
            34: {
                rig_ui_map: enable_disable_map,
            },
            35: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
            36: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
            37: {
                rig_ui_map: enable_disable_map,
            },
            38: {
                rig_ui_map: {
                    '0': 'PAUSE',
                    '1': 'TIME',
                },
            },
            39: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
            40: {
                rig_ui_map: {
                    '0': 'RX',
                    '1': 'TX',
                    '2': 'TRX',
                },
            },
            41: {
                toUi: toUiLCutFreq,
                fromUi: fromUiLCutFreq,
            },
            42: {
                rig_ui_map: slope_map,
            },
            43: {
                toUi: toUiHCutFreq,
                fromUi: fromUiHCutFreq,
            },
            44: {
                rig_ui_map: slope_map,
            },
            45: {
                rig_ui_map: mic_select_map,
            },
            46: {
                toUi: toUiInt,
                fromUi: pad3,
            },
            47: {
                rig_ui_map: ptt_select_map,
            },
            48: {
                rig_ui_map: port_select_map,
            },
            49: {
                toUi: toUiInt,
                fromUi: pad3,
            },
            50: {
                toUi: toUiLCutFreq,
                fromUi: fromUiLCutFreq,
            },
            51: {
                rig_ui_map: slope_map,
            },
            52: {
                toUi: toUiHCutFreq,
                fromUi: fromUiHCutFreq,
            },
            53: {
                rig_ui_map: slope_map,
            },
            54: {
                toUi: toUiInt,
                fromUi: pad3,
            },
            55: {
                rig_ui_map: {
                    '0': 'OFF',
                    '1': '50 MHz',
                    '2': 'ON',
                },
            },
            56: {
                rig_ui_map: {
                    '0': 'SEMI BREAK-IN',
                    '1': 'FULL BREAK-IN',
                },
            },
            57: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
            58: {
                rig_ui_map: {
                    '0': '1 ms',
                    '1': '2 ms',
                    '2': '4 ms',
                    '3': '6 ms',
                },
            },
            59: {
                rig_ui_map: {
                    '0': 'DIRECT FREQ',
                    '1': 'PITCH OFFSET',
                },
            },
            60: {
                rig_ui_map: {
                    '0': 'OFF',
                    '1': 'DAKY',
                    '2': 'RTS',
                    '3': 'DTR',
                },
            },
            61: {
                rig_ui_map: {
                    '0': '15 ms',
                    '1': '20 ms',
                    '2': '25 ms',
                    '3': '30 ms',
                },
            },
            62: {
                rig_ui_map: {
                    '0': 'PSK',
                    '1': 'OTHER',
                },
            },
            63: {
                rig_ui_map: {
                    '0': '1000 Hz',
                    '1': '1500 hz',
                    '2': '2000 Hz',
                },
            },
            64: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
            65: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
            66: {
                toUi: toUiLCutFreq,
                fromUi: fromUiLCutFreq,
            },
            67: {
                rig_ui_map: slope_map,
            },
            68: {
                toUi: toUiHCutFreq,
                fromUi: fromUiHCutFreq,
            },
            69: {
                rig_ui_map: slope_map,
            },
            70: {
                rig_ui_map: mic_select_map,
            },
            71: {
                rig_ui_map: ptt_select_map,
            },
            72: {
                rig_ui_map: port_select_map,
            },
            73: {
                toUi: toUiInt,
                fromUi: pad3,
            },
            74: {
                rig_ui_map: mic_select_map,
            },
            75: {
                toUi: toUiInt,
                fromUi: pad3,
            },
            76: {
                rig_ui_map: ptt_select_map,
            },
            77: {
                rig_ui_map: port_select_map,
            },
            78: {
                toUi: toUiInt,
                fromUi: pad3,
            },
            79: {
                rig_ui_map: {
                    '0': '1200',
                    '1': '9600',
                },
            },
            80: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
            81: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
            82: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
            83: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
            84: {
                rig_ui_map: on_off_map,
            },
            85: {
                rig_ui_map: on_off_map,
            },
            86: {
                rig_ui_map: {
                    '0': 'Tn-Rn',
                    '1': 'Tn-Riv',
                    '2': 'Tiv-Rn',
                    '3': 'Tiv-Riv',
                },
            },
            87: {
                toUi: defaultToUi,
            },
            88: {
                rig_ui_map: {
                    '0': 'DISTANCE',
                    '1': 'STRENGTH',
                },
            },
            89: {
                rig_ui_map: {
                    '0': 'km',
                    '1': 'mile',
                },
            },
            90: {
                rig_ui_map: {
                    '0': 'AUTO',
                    '1': 'MANUAL',
                    '2': 'DN',
                    '3': 'VW',
                    '4': 'ANALOG',
                },
            },
            91: {
                rig_ui_map: on_off_map,
            },
            92: {
                toUi: toUiLCutFreq,
                fromUi: fromUiLCutFreq,
            },
            93: {
                rig_ui_map: slope_map,
            },
            94: {
                toUi: toUiHCutFreq,
                fromUi: fromUiHCutFreq,
            },
            95: {
                rig_ui_map: slope_map,
            },
            96: {
                rig_ui_map: {
                    '0': 'SHIFT',
                    '1': 'DTR',
                    '2': 'DTR',
                },
            },
            97: {
                rig_ui_map: normal_reverse_map,
            },
            98: {
                rig_ui_map: normal_reverse_map,
            },
            99: {
                toUi: toUiInt,
                fromUi: pad3,
            },
            100: {
                rig_ui_map: {
                    '0': '170 Hz',
                    '1': '200 Hz',
                    '2': '425 Hz',
                    '3': '850 Hz',
                },
            },
            101: {
                rig_ui_map: {
                    '0': '1275 Hz',
                    '1': '2125 Hz',
                },
            },
            102: {
                toUi: toUiLCutFreq,
                fromUi: fromUiLCutFreq,
            },
            103: {
                rig_ui_map: slope_map,
            },
            104: {
                toUi: toUiHCutFreq,
                fromUi: fromUiHCutFreq,
            },
            105: {
                rig_ui_map: slope_map,
            },
            106: {
                rig_ui_map: mic_select_map,
            },
            107: {
                toUi: toUiInt,
                fromUi: pad3,
            },
            108: {
                rig_ui_map: ptt_select_map,
            },
            109: {
                rig_ui_map: port_select_map,
            },
            110: {
                rig_ui_map: {
                    '1': '50 ~ 3000',
                    '2': '100 ~ 2900',
                    '3': '200 ~ 2800',
                    '4': '300 ~ 2700',
                    '5': '400 ~ 2600',
                },
            },
            111: {
                rig_ui_map: {
                    '0': 'NARROW',
                    '1': 'MEDIUM',
                    '2': 'WIDE',
                },
            },
            112: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
            113: {
                toUi: toUiInt,
                fromUi: pad2,
            },
            114: {
                rig_ui_map: {
                    '0': 'NARROW',
                    '1': 'WIDE',
                },
            },
            115: {
                rig_ui_map: {
                    '0': 'SPECTRUM',
                    '1': 'WATER FALL',
                },
            },
            116: {
                rig_ui_map: {
                    '03': '50 kHx',
                    '04': '100 kHx',
                    '05': '200 kHx',
                    '06': '500 kHx',
                    '07': '1000 kHx',
                },
            },
            117: {
                rig_ui_map: standard_colors_map,
            },
            118: {
                rig_ui_map: {
                    '0': 'BLUE',
                    '1': 'GRAY',
                    '2': 'GREEN',
                    '3': 'ORANGE',
                    '4': 'PURPLE',
                    '5': 'RED',
                    '6': 'SKY BLUE',
                    '7': 'MULTI',
                },
            },
            119: {
                rig_ui_map: prmtrc_eq1_freq_map,
            },
            120: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
            121: {
                toUi: toUiInt,
                fromUi: pad2,
            },
            122: {
                rig_ui_map: prmtrc_eq2_freq_map,
            },
            123: {
                toUi: toUiInt,
                fromUi: defaultFromUi,
            },
            124: {
                toUi: toUiInt,
                fromUi: pad2,
            },
            125: {
                rig_ui_map: prmtrc_eq3_freq_map,
            },
            126: {
                toUi: toUiInt,
                fromUi: defaultFromUi,
            },
            127: {
                toUi: toUiInt,
                fromUi: pad2,
            },
            128: {
                rig_ui_map: prmtrc_eq1_freq_map,
            },
            129: {
                toUi: toUiInt,
                fromUi: defaultFromUi,
            },
            130: {
                toUi: toUiInt,
                fromUi: pad2,
            },
            131: {
                rig_ui_map: prmtrc_eq2_freq_map,
            },
            132: {
                toUi: toUiInt,
                fromUi: defaultFromUi,
            },
            133: {
                toUi: toUiInt,
                fromUi: pad2,
            },
            134: {
                rig_ui_map: prmtrc_eq3_freq_map,
            },
            135: {
                toUi: toUiInt,
                fromUi: defaultFromUi,
            },
            136: {
                toUi: toUiInt,
                fromUi: pad2,
            },
            137: {
                toUi: toUiInt,
                fromUi: fromUiMaxPower(100),
            },
            138: {
                toUi: toUiInt,
                fromUi: fromUiMaxPower(100),
            },
            139: {
                toUi: toUiInt,
                fromUi: fromUiMaxPower(50),
            },
            140: {
                toUi: toUiInt,
                fromUi: fromUiMaxPower(50),
            },
            141: {
                rig_ui_map: {
                    '0': 'OFF',
                    '1': 'INTERNAL',
                    '2': 'EXTERNAL',
                    '3': 'ATAS',
                    '4': 'LAMP',
                },
            },
            142: {
                rig_ui_map: {
                    '0': 'MIC',
                    '0': 'DATA',
                },
            },
            143: {
                toUi: toUiInt,
                fromUi: pad3,
            },
            144: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
            145: {
                toUi: toUiInt,
                fromUi: pad3,
            },
            146: {
                toUi: toUiInt,
                fromUi: pad3,
            },
            147: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
            148: {
                toUi: toUiInt,
                fromUi: pad3,
            },
            149: {
                rig_ui_map: enable_disable_map,
            },
            150: {
                rig_ui_map: {
                    '0': 'MANUAL',
                    '1': 'PRESET',
                },
            },
            151: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
            152: {
                rig_ui_map: {
                    '0': 'HISTORY',
                    '1': 'ACTIVITY',
                },
            },
            153: {
                toUi: defaultToUi,
                fromUi: defaultFromUi,
            },
        };

        return {
            toUi: function (no, value) {
                var mi = mi_table[no];

                if(isEmptyValue(mi)) {
                    throw new Error('MenuItems.toUi(' + no + ') not found');
                }

                if (isEmptyValue(value)) {
                    throw new Error('MenuItems.toUi(' + no + ') has no value');
                }

                if(mi.hasOwnProperty('rig_ui_map')) {
                    if(mi.rig_ui_map.hasOwnProperty(value)) {
                        return mi.rig_ui_map[value];
                    }
                }
                else if(mi.hasOwnProperty('toUi')) {
                    return mi.toUi(value);
                }
                throw new Error('MenuItems.toUi(' + no + '): unknown value: "' + value + '"');
            },

            fromUi: function (no, value) {
                var mi = mi_table[no];

                if(isEmptyValue(mi)) {
                    throw new Error('MenuItems.fromUi(' + no + ') not found');
                }
                
                if (value !== null) {
                    if(mi.hasOwnProperty('rig_ui_map')) {
                        if(!mi.hasOwnProperty('ui_rig_map')) {
                            mi.ui_rig_map = {};

                            for(var [k,v] of mi.rig_ui_map) {
                                mi.ui_rig_map[v] = k;
                            }
                        }

                        if(mi.ui_rig_map.hasOwnProperty(value)) {
                            return mi.ui_rig_map[value];
                        }
                    }
                    else if(mi.hasOwnProperty('fromUi')) {
                        return mi.fromUi(value);
                    }
                    throw new Error('MenuItems.fromUi(' + no + '): unknown value: "' + value + '"');
                }

                throw new Error('MenuItems.fromUi(' + no + ') has no value');
            },
        };
    })(),
};

var app1 = new Vue({
    el: '#app',

    components: {
        'controls':     httpVueLoader('controls.vue'),
        'menu-item':    httpVueLoader('menu-item.vue'),
        'settings':     httpVueLoader('settings.vue'),
    },
    mounted: function(){
        var self = this;
        
        uibuilder.start()

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 'alert') {
                console.log('alert: ', p.value);
                self.$bvModal.msgBoxOk(p.value, {});
            }
        });
    },

});
