<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-container fluid>
    <v-toolbar flat color="white">
      <v-toolbar-title class="font-weight-regular">Network List</v-toolbar-title>
      <v-spacer></v-spacer>
      <!--NEW/EDIT ITEM MODAL-->
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on" @click="createItem">New Item</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="editedItem.name" label="Network Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <date-field
                    :default-date="editedItem.time_created | toIso"
                    :label="'Time created'"
                    @change="updateDate"
                    ref="date1"
                  ></date-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-select
                    v-model="editedItem.network_type"
                    :items="network_types"
                    label="Select Network Type"
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <date-field
                    :default-date="editedItem.last_successful_connection | toIso"
                    :label="'Last successful connection'"
                    @change="updateDate"
                    ref="date2"
                  ></date-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

    <!--NETWORK PANELS-->
    <v-expansion-panel popout focusable light>
      <v-expansion-panel-content v-for="(record,i) in records" :key="i" header>
        <template v-slot:header>
          <div>{{record.name}}</div>
        </template>
        <v-card>
          <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
              <v-flex
                v-for="(rec, subject) in {'Type':record.network_type,'Time created':record.time_created,'Last successful connection':record.last_successful_connection,'Action':'Edit'}"
                :key="subject"
                xs3
              >
                <template v-if="subject === 'Action'">
                  <v-card-text class="font-weight-bold text-xs-right text-uppercase">Action</v-card-text>
                  <v-card-text class="text-xs-right">
                    <v-icon small class="mr-2" color="blue" @click="editItem(record)">edit</v-icon>
                    <v-icon small @click="deleteItem(record)" color="red">delete</v-icon>
                  </v-card-text>
                </template>
                <template v-else-if="isDateField(subject)">
                  <v-card-text class="px-0 font-weight-bold text-uppercase">{{subject}}</v-card-text>
                  <v-card-text>{{ rec | toIso }}</v-card-text>
                </template>
                <template v-else>
                  <v-card-text class="px-0 font-weight-bold text-uppercase">{{subject}}</v-card-text>
                  <v-card-text>{{rec}}</v-card-text>
                </template>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import dateField from "../../components/partials/dateRange";
import moment from "moment";

export default {
  name: "NetworksIndex",
  components: {
    dateField
  },
  data: () => ({
    dialog: false,
    networkTypeSelection: [],
    records: [],
    focusable: false,
    headers: [
      { text: "Name", align: "left", value: "name" },
      { text: "Time Created", align: "left", value: "time_created" },
      { text: "Network Type", align: "left", value: "network_type" },
      {
        text: "Last Successful Connection",
        align: "left",
        value: "last_successful_connection"
      }
    ],
    editedIndex: -1,
    editedItem: {
      id: "",
      name: 0,
      network_type: 0,
      time_created: 0,
      last_successful_connection: 0
    },
    defaultItem: {
      id: "",
      name: "",
      network_type: 0,
      time_created: 0,
      last_successful_connection: 0
    },
    network_types: ["Netgear", "TP-link", "D-link"]
  }),
  filters: {
    toIso: value => {
      return new Date(value).toISOString().substr(0, 10);
    },
    toTimestamp: date => {
      return moment.format("YYYY-MM-DD").unix(date);
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    ...mapGetters(["networks", "currentModel"])
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
    moment();
  },
  methods: {
    async initialize() {
      this.records = await this.getNetworks();
    },
    ...mapActions([
      "getNetworks",
      "getNetwork",
      "saveCurrentModel",
      "deleteNetwork"
    ]),

    editItem(item) {
      this.editedIndex = this.records.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.updateDefaultDate();
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.records.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.deleteNetwork(item.id);
      this.records.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      await this.saveCurrentModel(this.editedItem);

      if (this.editedIndex > -1) {
        Object.assign(this.records[this.editedIndex], this.editedItem);
      } else {
        this.records.push(this.editedItem);
      }

      await this.initialize();
      this.close();
    },
    isDateField(index) {
      return index === "Time created" || index === "Last successful connection";
    },
    updateDate({ date, field }) {
      this.editedItem[field] = new Date(date).getTime();
    },
    updateDefaultDate() {
      this.$refs.date1.updateDefaultDate(
        this.$options.filters.toIso(this.editedItem.time_created)
      );
      this.$refs.date2.updateDefaultDate(
        this.$options.filters.toIso(this.editedItem.last_successful_connection)
      );
    },
    createItem() {
      this.editedItem = this.defaultItem;
    }
  }
};
</script>

<style scoped>
</style>
