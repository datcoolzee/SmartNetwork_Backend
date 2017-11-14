"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	address_schema: {
		"type": "object",
		"properties": {
			"apartment_number": { "type": "string", pattern: '^[0-9]{1,}$' },
			"apartment_floor": { "type": "string", pattern: '^[0-9]{1,}$' },
			"city": { "type": "string", pattern: '^.{1,}$', required: true },
			"zipcode": { "type": "string", pattern: '^.{5,}$', required: true },
			"state": { "type": "string", pattern: '^.{2,}$', required: true },
			"street_address": { "type": "string", pattern: '^.{1,}$', required: true },
			"country": { "type": "string", pattern: '^.{1,}$', required: true }
		}
	},
	heatmap_schema: {
		"type": "object",
		"properties": {
			"time_created": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"time_modified": { "type": "string", pattern: '^[0-9]{0,}$', required: true },
			"address_id": { "type": "string", pattern: '^[0-9]{1,}$' },
			"router_id": { "type": "string", pattern: '^[0-9]{1,}$' }
		}
	},
	router_schema: {
		"type": "object",
		"properties": {
			"latitude": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"longitude": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"time_created": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"time_modified": { "type": "string", pattern: '^[0-9]{0,}$', required: true },
			"mac_address": { "type": "string", pattern: '^.{1,}$', required: true }
		}
	},
	pindrop_schema: {
		"type": "object",
		"properties": {
			"heatmap_id": { "type": "string", pattern: '^[0-9]{1,}$' },
			"latitude": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"longitude": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"time_created": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"time_modified": { "type": "string", pattern: '^.{0,}$', required: true },
			"connection_stats_id": { "type": "string", pattern: '^[0-9]{1,}$' }
		}
	},
	conn_stat_schema: {
		"type": "object",
		"properties": {
			"upstream_bps": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"client_rssi": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"router_rssi": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"downstream_bps": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"client_transmit_speed": { "type": "string", pattern: '^.{1,}$', required: true },
			"client_receive_speed": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"client_transmit_retries": { "type": "string", pattern: '^[0-9]{0,}$', required: true },
			"client_retrieve_retries": { "type": "string", pattern: '^[0-9]{0,}$', required: true }
		}
	}
};