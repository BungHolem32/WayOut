"use strict";

import Model from "./model";
const uuid = require("uuid/v4");

export default class Network extends Model {
  get table() {
    return "networks";
  }

  get att() {
    return {
      id: {
        type: this.Sequalize.UUID,
        primaryKey: true,
        defaultValue: uuid()
      },
      name: this.Sequalize.STRING,
      time_created: {
        type: "TIMESTAMP",
        defaultValue: this.Sequalize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
      },
      network_type: this.Sequalize.ENUM("Tp-link", "D-link", "Netgear"),
      last_successful_connection: {
        type: "TIMESTAMP",
        defaultValue: this.Sequalize.literal("CURRENT_TIMESTAMP"),
        allowNull: false
      }
    };
  }
}
