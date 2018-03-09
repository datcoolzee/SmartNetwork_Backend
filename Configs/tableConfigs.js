export default {
	address_schema: {
		"type" : "object",
		"properties" : {
			"apartment_number": { "type" : "string", pattern: '^[0-9a-zA-Z]{0,}$' },
			"apartment_floor": { "type" : "string", pattern: '^[0-9a-zA-Z]{0,}$' },
			"city": { "type" : "string", pattern: '^.{1,}$', required: true  },
			"zipcode": { "type" : "string", pattern: '^.{5,}$', required: true  },
			"state": { "type" : "string", pattern: '^.{2,}$', required: true  },
			"street_address": { "type" : "string", pattern: '^.{1,}$', required: true  },
			"country": { "type" : "string", pattern: '^.{1,}$', required: true },
			"mac_address": { "type": "string", pattern: '^.{1,}$', required: true },
			"latitude": { "type" : "string", pattern: '^[0-9.-]{1,}$', required: true },
			"longitude": { "type" : "string", pattern: '^[0-9.-]{1,}$', required: true },
			"room": { "type" : "string", pattern: '^.{0,}$', required: false },
		}
	},
	heatmap_schema: {
		"type": "object",
		"properties" : {
			"time_created": { "type" : "string", pattern: '^[0-9]{1,}$', required: true },
			"time_modified": { "type" : "string", pattern: '^[0-9]{0,}$', required: true },
			"date_created": { "type" : "string", pattern: '^\\d{4}-\\d{2}-\\d{2}$', required: true},
			"mac_address": { "type": "string", pattern: '^.{1,}$', required: true },
		}
	},
	router_schema: {
		"type": "object",
		"properties" : {
			"latitude": { "type" : "string", pattern: '^[0-9.-]{1,}$', required: true },
			"longitude": { "type" : "string", pattern: '^[0-9.-]{1,}$', required: true },
			"time_created": { "type" : "string", pattern: '^[0-9]{1,}$', required: true },
			"time_modified": { "type" : "string", pattern: '^[0-9]{0,}$', required: true },
			"mac_address": { "type": "string", pattern: '^.{1,}$', required: true },
		}
	},
	pindrop_schema: { 
		"type": "object",
		"properties" : {
			"heatmap_id": { "type" : "string", pattern: '^.{1,}$', required: true },
			"latitude": { "type" : "string", pattern: '^[0-9.-]{1,}$', required: true },
			"longitude": { "type" : "string", pattern: '^[0-9.-]{1,}$', required: true },
			"time_created": { "type" : "string", pattern: '^[0-9]{1,}$', required: true },
			"time_modified": { "type": "string", pattern: '^.{0,}$', required: true },
			"connection_stat": { 
				"type": "object", 
				"properties" : {
					"upstream_bps": { "type" : "string", pattern: '^[0-9.-]{1,}$', required: true },
					"client_rssi": { "type" : "string", pattern: '^[0-9-]{1,}$', required: true },
					"router_rssi": { "type" : "string", pattern: '^[0-9-]{1,}$', required: true },
					"downstream_bps": { "type" : "string", pattern: '^[0-9.-]{1,}$', required: true },
					"client_transmit_speed": { "type": "string", pattern: '^.{1,}$', required: true },
					"client_receive_speed": { "type": "string", pattern: '^[0-9.-]{1,}$', required: true },
					"client_transmit_retries": { "type": "string", pattern: '^[0-9-]{0,}$', required: true },
					"client_retrieve_retries": { "type": "string", pattern: '^[0-9-]{0,}$', required: true },
				}
			},
		}
	},
	router_patch_schema: {
		"type": "object",
		"properties" : {
			"latitude": { "type" : "string", pattern: '^[0-9.-]{1,}$', required: false },
			"longitude": { "type" : "string", pattern: '^[0-9.-]{1,}$', required: false },
			"time_created": { "type" : "string", pattern: '^[0-9]{1,}$', required: false },
			"time_modified": { "type" : "string", pattern: '^[0-9]{0,}$', required: true },
			"mac_address": { "type": "string", pattern: '^.{1,}$', required: true },
		}
	},
	address_patch_schema: {
		"type" : "object",
		"properties" : {
			"apartment_number": { "type" : "string", pattern: '^[0-9]{0,}$' },
			"apartment_floor": { "type" : "string", pattern: '^[0-9]{0,}$' },
			"city": { "type" : "string", pattern: '^.{1,}$', required: false  },
			"zipcode": { "type" : "string", pattern: '^.{5,}$', required: false  },
			"state": { "type" : "string", pattern: '^.{2,}$', required: false  },
			"street_address": { "type" : "string", pattern: '^.{1,}$', required: false  },
			"country": { "type" : "string", pattern: '^.{1,}$', required: false },
			"mac_address": { "type": "string", pattern: '^.{1,}$', required: true },
			"latitude": { "type" : "string", pattern: '^[0-9.-]{1,}$', required: true },
			"longitude": { "type" : "string", pattern: '^[0-9.-]{1,}$', required: true },
		}
	}
}
