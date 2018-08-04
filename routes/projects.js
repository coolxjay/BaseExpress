const express = require('express');
const bodyParser = require('body-parser');
const Projects = require('../models/projects');
var authenticate = require('../authenticate');
const projectRouter = express.Router();
const cors = require('./cors');

projectRouter.use(bodyParser.json());

projectRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
	Projects.find(req.query)
	.then((projects) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(projects);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
	Projects.create(req.body)
	.then((project) => {
		console.log('Project Created ', project);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(project);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
	res.statusCode = 403;
	res.end('PUT operation not supported on /projects');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
	Projects.remove({})
	.then((resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err));
});

projectRouter.route('/:projectId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res,next) => {
	Projects.findById(req.params.projectId)
	.then((project) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(project);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
	Projects.findById(req.params.projectId)
	.then((project) => {
		if( project ) {
			var err = new Error('Project already exists So this request is aborted');
			err.status = 403;
			return next(err);
		}
		else {
			Project.create(req.body)
			.then((project) => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(project);
			}, (err) => next(er))
			.catch((err) => next(err));
		}
	}, (err) => next(err))
	.catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
	Projects.findByIdAndUpdate(req.params.projectId, {$set:req.body}, {new:true})
	.then((project) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(project);
	}, (err) => next(err))
	.catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req,res,next) => {
	Projects.findByIdAndRemove(req.params.projectId)
	.then((resp) => {
		res.statusCode = 200;
		res.setHeader('Content-Type', 'application/json');
		res.json(resp);
	}, (err) => next(err))
	.catch((err) => next(err));
});


module.exports = projectRouter;