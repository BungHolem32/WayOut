<template>
    <v-container>
        <form>
            <v-text-field
                    v-model="currentModel.name"
                    v-validate="'required|max:10'"
                    :counter="100"
                    :error-messages="errors.collect('name')"
                    label="Name"
                    data-vv-name="name"
                    required
            ></v-text-field>
            <v-select
                    v-model="currentModel.network_type"
                    v-validate="'required'"
                    :items="items"
                    :error-messages="errors.collect('network_type')"
                    label="Select Network Type"
                    data-vv-name="network_type"
                    required
            ></v-select>

            <v-btn @click="submit(currentModel)">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
        </form>
    </v-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "NetworkEdit",
        $_veeValidate: {
            validator: 'new'
        },
        data: () => ({
            items: ['Tp-link', 'Netgear', 'D-link'],
            checkbox: null,
            dictionary: {
                attributes: {
                    email: 'E-mail Address'
                    // custom attributes
                },
                custom: {
                    name: {
                        required: () => 'Name can not be empty',
                        max: 'The name field may not be greater than 100 characters'
                        // custom messages
                    },
                    network_type: {
                        required: 'Select field is required'
                    }
                },
            },
        }),
        mounted() {
            this.$validator.localize('en', this.dictionary)
        },
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
            },
            ...mapGetters([
                'currentModel'
            ]),
        },
        created() {
            this.getNetwork(this.$route.params.networkId);
        },
        methods: {
            ...mapActions([
                'getNetwork',
                'saveCurrentModel'
            ]),
            submit(model) {
                this.$validator.validateAll();
                this.saveCurrentModel(model).then(() => {
                    this.$route.redirect('/');
                });
            },
            clear() {
                this.$validator.reset();
            }
        }
    };
</script>

<style scoped>

</style>
