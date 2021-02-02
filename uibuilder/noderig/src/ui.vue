<template>
    <div>
        <b-container id="app_container">
            <b-row>
                <controls class="col-sm-12 col-md-6 col-lg-4"></controls>
                <settings class="col-sm-12 col-md-6 col-lg-4"></settings>
                <menu-item class="col-sm-12 col-md-6 col-lg-4"></menu-item>
            </b-row>
        </b-container>
        
        <b-modal
            id="alert"
            size="sm"
            @ok="handleOk"
            header-bg-variant="danger"
            header-text-variant="light"
        >
            <template #modal-title>
                High SWR
            </template>
            <div>Transmit is disabled until OK is clicked.</div>
        </b-modal>
    </div>
</template>

<script>
module.exports = {
    components: {
        'controls':     httpVueLoader('controls.vue'),
        'menu-item':    httpVueLoader('menu-item.vue'),
        'settings':     httpVueLoader('settings.vue'),
    },
    methods: {
        handleOk: function(e) {
            uibuilder.send({topic: 'rig_status', event: 'enable_transmit', value: true});
        },
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
            else if(p.name === 'high_swr') {
console.log('high_swr: ', p);
                if(p.value) {
                    this.$bvModal.show('alert');
                }
                else {
                    this.$bvModal.hide('alert');
                }
            }
        });
    },
}
</script>