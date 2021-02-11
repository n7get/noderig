<template>
    <div>
        <div>
            <controls class="col-sm-12 col-md-6 col-lg-4"></controls>
            <settings class="col-sm-12 col-md-6 col-lg-4"></settings>
            <menu-item class="col-sm-12 col-md-6 col-lg-4"></menu-item>
            <config></config>
        </div>

        <b-modal
            id="alert"
            size="sm"
            @ok="handleOk"
            no-close-on-esc
            no-close-on-backdrop
            ok-only
            hide-header-close
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
        'config':       httpVueLoader('config.vue'),
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
                self.$bvModal.msgBoxOk(p.value, {});
            }
            else if(p.name === 'high_swr') {
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
