import fetch from 'isomorphic-fetch';

const queryTypes = {
	GET: 'GET',
	POST: 'POST',
	PUT: 'PUT',
	DELETE: 'DELETE'
};

let baseFetchSettings = {
	mode: 'cors'
};

let baseUrl = 'http://localhost:3000/'

export function getAsync(specifyingUrl, specifyingSettings = {}) {
	let url = baseUrl + specifyingUrl;

	let settings = Object.assign({}, specifyingSettings, baseFetchSettings);
	settings.method = queryTypes.GET;

	return fetch(url, settings)
	.then(function(response) {
		return response.json() || null;
	});
}

export function postAsync(specifyingUrl, data, specifyingSettings = {}) {
	let url = baseUrl + specifyingUrl;

	let settings = Object.assign({}, specifyingSettings, baseFetchSettings);
	settings.method = queryTypes.POST;

	settings.body = JSON.stringify(data);
	settings.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

	return fetch(url, settings)
	.then(function(response) {
		return response.json() || null;
	});
}

export function putAsync(specifyingUrl, data, specifyingSettings = {}) {
	let url = baseUrl + specifyingUrl;

	let settings = Object.assign({}, specifyingSettings, baseFetchSettings);
	settings.method = queryTypes.PUT;

	settings.body = JSON.stringify(data);
	settings.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

	return fetch(url, settings)
	.then(function(response) {
		return response.json() || null;
	});
}

export function deleteAsync(specifyingUrl, specifyingSettings = {}) {
	let url = baseUrl + specifyingUrl;

	let settings = Object.assign({}, specifyingSettings, baseFetchSettings);
	settings.method = queryTypes.DELETE;

	return fetch(url, settings)
		.then( response => response.json() || null);
}