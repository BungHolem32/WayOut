<template>
    <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
    >

        <template v-slot:activator="{ on }">
            <v-text-field
                    v-model="date"
                    :label="label"
                    prepend-icon="event"
                    readonly
                    v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
                ref="picker"
                v-model="date"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
        ></v-date-picker>
    </v-menu>
</template>

<script>

    export default {
        props: ['defaultDate','label'],
        data: () => ({
            menu: false,
            date: null
        }),
        created(){
          this.date = this.defaultDate;
        },
        watch: {
            menu(val) {
                val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
            },
        },
        methods: {
            save(date) {
                let field = this.label.replace(/ /g,'_').toLowerCase();
                this.$emit('change',{date,field});
                this.$refs.menu.save(date);
            },
            updateDefaultDate(val){
                this.date = val;
            }
        }
    }
</script>

<style scoped>

</style>