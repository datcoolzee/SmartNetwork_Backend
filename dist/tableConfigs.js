"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	address_schema: {
		"type": "object",
		"properties": {
			"address_id": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
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
			"heatmap_id": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"time_created": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"time_modified": { "type": "string", pattern: '^[0-9]{0,}$', required: true },
			"address_id": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"router_id": { "type": "string", pattern: '^[0-9]{1,}$', required: true }
		}
	},
	router_schema: {
		"type": "object",
		"properties": {
			"router_id": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"latitude": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"longitude": { "type": "string", pattern: '^[0-9]{0,}$', required: true },
			"time_created": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"time_modified": { "type": "string", pattern: '^[0-9]{0,}$', required: true },
			"mac_address": { "type": "string", pattern: '^[0-9]{1,}$', required: true }
		}
	}
};