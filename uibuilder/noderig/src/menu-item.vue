<template>
    <div>
            <b-row
                v-for="(ci, no) in menu_items"
                :key="no"
		v-show="showMenuItem(no)"
            >
	        <div class="col-1">{{ no }}</div>
	        <div class="col-7">{{ ci.desc }}</div>
	        <div class="col-3">{{ ci.value }}</div>
            </b-row>
    </div>
</template>

<script>
module.exports = {
    props: [
        'items',
    ],
    data: function() {
        return {
            menu_items: this.$noderig.menu_items,
        };
    },
    methods: {
	showMenuItem: function(item_number) {
            if(this.items.length > 0) {
		return this.items.find( e => e === item_number );
            }
            else {
                return true;
            }
        },
        sendClick: function() {
            uibuilder.send({topic: 'CONFIG_EVENT', payload: 'click'});
        },
    },
    mounted: function() {
        var self = this;

        uibuilder.onChange('msg', msg => {
            var p = msg.payload;

            if(p.name === 'menu_item') {
                if(p.hasOwnProperty('value')) {
                    self.menu_items[p.no].value = p.value;
                }
            }
        });
    }
}
</script>

