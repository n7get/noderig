<template>
    <div>
            <b-row
                v-for="(s, name) in settings"
                :key="name"
		        v-show="showConfigSetting(name)">

                <div class="col-7">{{ s.desc }}</div>
                <div class="col">{{ s.value }}</div>
            </b-row>
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            settings: this.$noderig.settings,
        };
    },
    methods: {
        showConfigSetting: function(name) {
            return true;
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(self.settings.hasOwnProperty(p.name)) {
                console.log('p: ', p);
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

