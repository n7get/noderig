<template>
    <div
        @click="clicked" @dblclick="dblclicked"
        class="frequency-digits"
        :class="{tx: tx_on}">

        <span v-html="mhz"></span>&nbsp;<span v-html="khz"></span>&nbsp;<span v-html="hz"></span>

        <b-modal
            id="new-freq"
            size="sm"
            @ok="handleOk"
            @shown="focusInput"
        >
            <template #modal-title>
                Set VFO
            </template>
            <b-form-group
                label="Freq:"
                label-for="freq-input"
                invalid-feedback="Invalid frequency"
                :state="freqState"
            >
                <b-form-input
                    id="freq-input"
                    ref="freqInput"
                    v-model="edit_freq"
                    :state="freqState"
                    required
                ></b-form-input>
            </b-form-group>
        </form>
        </b-modal>
    </div>
</template>

<script>
function trim_zeros(value) {
    if(value.substring(value.length - 1) === '0') {
        return trim_zeros(value.substring(0, value.length - 1));
    }

    if(value.substring(value.length - 1) === '.') {
        return value.substring(0, value.length - 1);
    }

    return value;
}

function padTo(value, l) {
    if(value.length < l) {
        return padTo(value + '0', l);
    }

    if(value.length === l) {
        return value;
    }

    return value.substring(0, l);
}

function add_dec_frac(dec, frac) {
    if(dec < 1000) {
        return dec * 1000000 + frac;
    }

    if(dec < 1000000) {
        return dec * 1000 + frac;
    }

    return dec;
}

function scale_frac(dec, value) {
    if(dec < 1000) {
        return parseInt(padTo(value, 6), 10);
    }

    if(dec < 1000000) {
        return parseInt(padTo(value, 3), 10);
    }
    
    return 0;
}

function freq_hz(value) {
    var dot = value.indexOf('.'),
    dec = parseInt(value.substring(0, dot), 10),
        frac = scale_frac(dec, value.substring(dot + 1));
        freq = add_dec_frac(dec, frac);

    if(dot === -1) {
        return add_dec_frac(parseInt(value, 10), 0);
    }

    return freq;
}

function convFreq(arg) {
    if(typeof(arg) === 'number') {
        convFreq(arg.toString());
    }

    var freq = freq_hz(arg.trim());
    
    var valid_freqs = [
        [  1800000,   2000000],
        [  3500000,   4000000],
        [  5332000,   5332000],
        [  5348000,   5348000],
        [  5358500,   5358500],
        [  5373000,   5373000],
        [  5405000,   5405000],
        [  7000000,   7300000],
        [ 10100000,  10150000],
        [ 14000000,  14350000],
        [ 18068000,  18168000],
        [ 21000000,  21450000],
        [ 24890000,  24990000],
        [ 28000000,  29700000],
        [ 50000000,  54000000],
        [144000000, 148000000],
        [420000000, 450000000],
    ];
    
    if(valid_freqs.some( function(f) {
        return (freq >= f[0] && freq <= f[1]);
    })) {
        return freq;    
    }

    return null;
}

module.exports = {
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
            edit_freq: '',
            freqState: null,
        }
    },
    methods: {
        clicked: function(e) {
            var m, k, h;

            this.resetModal();

            if(this.freq.length === 7) {
                m = this.freq.substring(0,1);
                k = this.freq.substring(1,4);
                h = this.freq.substring(4);
            }
            else if(this.freq.length === 8) {
                m = this.freq.substring(0,2);
                k = this.freq.substring(2,5);
                h = this.freq.substring(5);
            }
            else if(this.freq.length === 9) {
                m = this.freq.substring(0,3);
                k = this.freq.substring(3,6);
                h = this.freq.substring(6);
            }
            this.edit_freq = trim_zeros(m + k + '.' + h);

            this.$bvModal.show('new-freq');
        },
        dblclicked: function(e) {
            uibuilder.send({topic: 'swap_vfo', event: 'dblclick'});
        },
        focusInput: function() {
            this.$refs.freqInput.focus();
            this.$refs.freqInput.select();
        },
        checkFormValidity: function() {
            var valid = this.$refs.form.checkValidity();

            this.freqState = valid;
            return valid
        },
        resetModal: function() {
            this.freqState = null;
        },
        handleOk: function(e) {
            var new_freq = convFreq(this.edit_freq);

            if(new_freq) {
                this.resetModal();
                this.$nextTick(function() {
                    this.$bvModal.hide('new-freq');
                });

                uibuilder.send({topic: this.vfo, event: 'set', value: new_freq});
            }
            else {
                this.freqState = false;
                e.preventDefault();
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
                        self.last_freq = self.freq;
                        self.freq = p.value;

                        self.mhz = p.value.substring(0, 3).replace(/ /g,'&nbsp;');;
                        self.khz = p.value.substring(3, 6);
                        self.hz  = p.value.substring(6, 9);
                    }
                }
            }

            if(p.name === 'transmit') {
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
