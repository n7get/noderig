<template>
    <div>
        <b-row @click="toggleDisplayMode">
            <div class="col-9">Description</div>
            <div class="col-3">Value</div>
        </b-row>
        <b-row
            v-for="(s, name) in settings"
            :key="name"
            v-show="showConfigSetting(s)">

            <div class="col-7">{{ s.desc }}</div>
            <div class="col">{{ s.value }}</div>
        </b-row>
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            display_mode: 'fav',
            show_changed_only: false,
            settings: this.$noderig.settings,
        };
    },
    methods: {
        toggleDisplayMode: function() {
            if(this.display_mode === 'all') {
                this.display_mode = 'saved';
            }
            else if(this.display_mode === 'saved') {
                this.display_mode = 'fav';
            }
            else {
                this.display_mode = 'all';
            }
        },
        showConfigSetting: function(s) {
            if(this.display_mode === 'all') {
                return (this.show_changed_only && s.changed) || !this.show_changed_only;
            }
            if(this.display_mode === 'fav') {
                return s.fav && ((this.show_changed_only && s.changed) || !this.show_changed_only);
            }
            if(this.display_mode === 'saved') {
                return s.saved && ((this.show_changed_only && s.changed) || !this.show_changed_only);
            }
            return false;
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(self.settings.hasOwnProperty(p.name)) {
                if(p.hasOwnProperty('changed')) {
                    self.settings[p.name].changed = p.changed;
                }
                if(p.hasOwnProperty('fav')) {
                    self.settings[p.name].fav = p.fav;
                }
                if(p.hasOwnProperty('saved')) {
                    self.settings[p.name].saved = p.saved;
                }
                if(p.hasOwnProperty('value')) {
                    self.settings[p.name].value = p.value;
                }
            }
        });
    }
}
</script>

