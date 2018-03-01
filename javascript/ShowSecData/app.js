var express = require('express');
var sqlite3 = require('sqlite3');
var lcache = {};
var app = express();
var rpath = '/home/master/work/ShowSecData/';
var dpath = '/home/master/work/codepy/baksecdataminer/ChinaSecData.db';
var db = new sqlite3.Database(dpath, sqlite3.OPEN_READONLY, function (err) {
	if (err)
		db = null;
});

app.use('/js', express.static(rpath + 'js'));
app.use('/css', express.static(rpath + 'css'));
app.listen(8780);

app.get('/', function(req, res) {
	if (!db) 
		res.status(500).send('Database is not online!');
	else
	{
		res.sendfile(rpath + 'p1c.html');
	}
});

app.get('/q/:sid', function(req, res) {
	var sid = req.params.sid;
	var qs = null;

	if (!db) 
		res.status(500).json({error: 'Database is not online!'});
	else
	{
		if (sid.match(/^[0-9]{6}$/))
			qs = "SELECT * FROM chinasec_ind WHERE sid = ?";
		else if (sid.match(/^[a-zA-Z0-9\*]{0,9}$/i))
			qs = "SELECT * FROM chinasec_ind WHERE abbr LIKE ?";
		else
			res.status(500).json({error: 'Unknown query arguments!'});

		db.all(qs, sid, function(err, rows) {
			if (err)
				res.status(500).json({error: err.message});
			else
			{
				if (!rows || rows.length == 0)
					res.status(404).json({error: 'No expected data found!'});
				else
					res.json({error: null, rows: rows});
			}
		});
	}
});

app.get('/d/:sid', function(req, res) {
	var sid = req.params.sid;

	if (!db) 
		res.status(500).json({error: 'Database is not online!'});
	else if (!sid.match(/^[0-9]{6,9}$/))
		res.status(500).json({error: 'Unknown query sid!'});
	else
	{
		db.all("SELECT * FROM chinasec_bsdata, chinasec_psdata, chinasec_cfdata WHERE chinasec_bsdata.sid = ? and chinasec_psdata.sid = chinasec_bsdata.sid and chinasec_cfdata.sid = chinasec_bsdata.sid and chinasec_bsdata.year = chinasec_psdata.year and chinasec_bsdata.year = chinasec_cfdata.year and chinasec_bsdata.qn = chinasec_psdata.qn and chinasec_bsdata.qn = chinasec_cfdata.qn ORDER BY chinasec_bsdata.year, chinasec_bsdata.qn", sid, function(err, rows) {
			if (err)
				res.status(500).json({error: err.message});
			else
			{
				if (!rows || rows.length == 0)
					res.status(404).json({error: 'No expected data found!'});
				else
					res.json({error: null, rows: rows});
			}
		});
	}
});
