<template>
    <div>
        <b-row @click="toggleDisplayMode">
            <div class="col-1">no</div>
            <div class="col-7">Description</div>
            <div class="col-3">Value</div>
        </b-row>
        <b-row
            v-for="(ci, no) in menu_items"
            :key="no"
            v-show="showMenuItem(ci)">

            <div class="col-1">{{ no }}</div>
            <div class="col-7">{{ ci.desc }}</div>
            <div class="col-3">{{ ci.value }}</div>
        </b-row>
    </div>
</template>

<script>
module.exports = {
    data: function() {
        return {
            display_mode: 'fav',
            show_changed_only: false,
            menu_items: this.$noderig.menu_items,
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
        showMenuItem: function(ci) {
            if(this.display_mode === 'all') {
                return (this.show_changed_only && ci.changed) || !this.show_changed_only;
            }
            if(this.display_mode === 'fav') {
                return ci.fav && ((this.show_changed_only && ci.changed) || !this.show_changed_only);
            }
            if(this.display_mode === 'saved') {
                return ci.saved && ((this.show_changed_only && ci.changed) || !this.show_changed_only);
            }
            return false;
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 'menu_item') {
                if(p.hasOwnProperty('changed')) {
                    self.menu_items[p.no].changed = p.changed;
                }
                if(p.hasOwnProperty('fav')) {
                    self.menu_items[p.no].fav = p.fav;
                }
                if(p.hasOwnProperty('saved')) {
                    self.menu_items[p.no].saved = p.saved;
                }
                if(p.hasOwnProperty('value')) {
                    self.menu_items[p.no].value = p.value;
                }
            }

            if(p.name === 'config') {
                console.log('config: ' + config);
            }
        });
    }
}
</script>

