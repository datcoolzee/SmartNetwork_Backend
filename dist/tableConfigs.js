'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	address_fields: ['address_id', 'apartment_number', 'apartment_floor', 'city', 'zipcode', 'state', 'street_address', 'country'],
	address_schema: {
		"type": "object",
		"properties": {
			"address_id": { "type": "string", pattern: '^[0-9]{1,}$', required: true },
			"apartment_number": { "type": "string", pattern: '^[0-9]{1,}$' },
			"apartment_floor": { "type": "string", pattern: '^[0-9]{1,}$' },
			"city": { "type": "string", pattern: '^.{1,}$', required: true },
			"zipcode": { "type": "string", pattern: '^.{5,}$$', required: true },
			"state": { "type": "string", pattern: '^.{2,}$', required: true },
			"street_address": { "type": "string", pattern: '^.{1,}$', required: true },
			"country": { "type": "string", pattern: '^.{1,}$', required: true }
		}
	}
};