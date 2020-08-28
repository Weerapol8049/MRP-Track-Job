const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/orders', (req, res) => {
	var result = [];
	axios
		.get('http://starmark.work/AxTrackJobService/api/trackjob/data')
		.then(async (response) => {
			res.json(response.data);
		})
		.catch((error) => {
			res.json(error);
		});
});

router.get('/trackstatus', (req, res) => {
	var result = [];
	axios
		.get('http://starmark.work/AxTrackJobService/api/trackjob/trackstatus')
		.then(async (response) => {
			res.json(response.data);
		})
		.catch((error) => {
			res.json(error);
		});
});

router.get('/bu', (req, res) => {
	var result = [];
	axios
		.get('http://starmark.work/AxTrackJobService/api/trackjob/bu')
		.then(async (response) => {
			res.json(response.data);
		})
		.catch((error) => {
			res.json(error);
		});
});

router.get('/typeroom', (req, res) => {
	var result = [];
	axios
		.get('http://starmark.work/AxTrackJobService/api/trackjob/typeroom')
		.then(async (response) => {
			res.json(response.data);
		})
		.catch((error) => {
			res.json(error);
		});
});

router.get('/Create', (req, res) => {
	axios
		.post('http://starmark.work/AxTrackJobService/api/trackjob/create', {
			TrackId: '',
			BU: '',
			ProjId: '',
			Name: '',
			Stage: '',
			TypeRoom: '',
			Unit: '',
			StartDate: '',
			FinishDate: '',
			CreateDate: '',
			RefTrackId: '',
			ProjAmount: '',
			TrackStatus: ''
		})
		.then((response) => response.data)
		.catch((error) => {
			throw error.response.data;
		});
});

module.exports = router;