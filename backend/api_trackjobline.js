const express = require('express');
const router = express.Router();
const axios = require('axios');
const formidable = require('formidable');

router.get('/orders', (req, res) => {
	axios
		.get('http://starmark.work/AxTrackJobService/api/trackjobline/data')
		.then(async (response) => {
			res.json(response.data);
		})
		.catch((error) => {
			res.json(error);
		});
});

router.put('/orders', (req, res) => {
	var form = new formidable.IncomingForm();
	form.parse(req, async (err, fields, files) => {
		axios
			.post('http://starmark.work/AxTrackJobService/api/trackjobline/edit', {
				//.put('http://localhost:5413/api/trackjobline/edit', {
				RecId: fields.RecId,
				ActStartDate: fields.ActStartDate,
				ActEndDate: fields.ActEndDate,
				Delay: fields.Delay,
				DelayPlan: fields.DelayPlan,
				OperName: fields.OperName,
				OperNo: fields.OperNo,
				PlanDays: fields.PlanDays,
				PlanStartDate: fields.PlanStartDate,
				PlanEndDate: fields.PlanEndDate,
				Remark: fields.Remark,
				SideDesign: fields.SideDesign,
				StmTrackId: fields.StmTrackId,
				TypeDesign: fields.TypeDesign,
				UserId: fields.UserId,
				UserName: fields.UserName,
			})
			.then(async (response) => {
				res.json(response.data);
			})
			.catch((error) => {
				throw error.response.data;
			});
	});
});

router.post('/orders', (req, res) => {
	var form = new formidable.IncomingForm();
	form.parse(req, async (err, fields, files) => {
		axios
			.post('http://starmark.work/AxTrackJobService/api/trackjobline/find', {
				DataSourceName: 'STMTrackJobLine',
				FieldName: fields.FieldName, //"UserId"
				Value: fields.Value,
			})
			.then(async (response) => {
				res.json(response.data);
			})
			.catch((error) => {
				throw error.response.data;
			});
	});
});

module.exports = router;
