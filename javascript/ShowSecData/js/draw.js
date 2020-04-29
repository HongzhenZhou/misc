
function draw1c(o, sid, yls, qls)
{
	var txaxis = null;
	var pxaxis = null;

	if (qls.length > 9)
	{
		txaxis = yls;
		pxaxis = qls.slice(qls.length - 9);
	}
	else
	{
		txaxis = qls;
	}

	showBS(o, sid, yls, qls, txaxis, pxaxis);
	showPS(o, sid, yls, qls, txaxis, pxaxis);
	showCF(o, sid, yls, qls, txaxis, pxaxis);
}

function showBS(o, sid, yls, qls, txaxis, pxaxis)
{
	var tassets = new Array();
	var nassets = new Array();
	var ylast = qls[qls.length - 1].slice(0, 4);
	var qnlast = qls[qls.length - 1].slice(4);
	var t = 0;
	var xfound = false;
	var xaxis = txaxis;

	for (var i = 0; i + 1 < yls.length; i++)
	{
		if (!('4' in o[sid][yls[i]]))
		{
			tassets.push(null);
			nassets.push(null);
		}
		else
		{ 
			tassets.push(o[sid][yls[i]]['4']['bs_038']);
			nassets.push(o[sid][yls[i]]['4']['bs_082']);
		}
	}

	tassets.push(o[sid][ylast][qnlast]['bs_038']);
	nassets.push(o[sid][ylast][qnlast]['bs_082']);

	$(function (o) 
	{
		$('#pic1').highcharts(
		{
			chart: {
				zoomType: 'xy'
			},
			title: {
				text: '总资产和股东权益'
			},
			xAxis: [{
				categories: yls
			}],
			yAxis: [{
				labels: {
					style: {
						color: '#89A54E'
					}
				},
				title: {
					text: '股东权益',
					style: {
						color: '#89A54E'
					}
				},
				opposite: true
			}, { 
				gridLineWidth: 0,
				title: {
					text: '总资产',
					style: {
						color: '#AA4643'
					}
				},
				labels: {
					style: {
						color: '#AA4643'
					}
				}
			}],
			credits: {
				enabled: false
			},
			tooltip: {
				shared: true
			},
			/*legend: {
				layout: 'vertical',
				align: 'left',
				verticalAlign: 'top',
				x: 120,
				y: 80,
				floating: true,
				backgroundColor: '#FFFFFF'
			},*/
			series: [{
                		name: '股东权益',
				type: 'spline',
				color: '#89A54E',
				tooltip: {
					valueSuffix: '元'
				},
                		data: nassets
			}, {
		                name: '总资产',
				type: 'spline',
				color: '#AA4643',
				yAxis: 1,
				tooltip: {
					valueSuffix: '元'
				},
                		data: tassets
			}]
		});
	});

	var hbzj = new Array();
	var yspj = new Array();
	var yszk = new Array();
	var yfkx = new Array();
	var chxx = new Array();
	var qtyskx = new Array();
	var qtldzc = new Array();
	var ys = null;
	var qs = null;

	for (var i = 0; i < txaxis.length; i++)
	{
		if (qls.length > 9)
		{
			if (i + 1 < txaxis.length)
				qs = '4';
			else
				qs = qnlast;

			if (!(qs in o[sid][yls[i]]))
			{
				if (xfound)
				{
					hbzj.push(null);
					yspj.push(null);
					yszk.push(null);
					yfkx.push(null);
					chxx.push(null);
					qtyskx.push(null);
					qtldzc.push(null);
				}
			}
			else
			{
				if (!xfound)
				{
					xfound = true;
					xaxis = txaxis.slice(i);
				}

				hbzj.push(o[sid][yls[i]][qs]['bs_001']);
				yspj.push(o[sid][yls[i]][qs]['bs_005']);
				yszk.push(o[sid][yls[i]][qs]['bs_006']);
				yfkx.push(o[sid][yls[i]][qs]['bs_007']);
				chxx.push(o[sid][yls[i]][qs]['bs_015']);
				qtyskx.push(o[sid][yls[i]][qs]['bs_013']);
				t = o[sid][yls[i]][qs]['bs_018'] - o[sid][yls[i]][qs]['bs_001'] - o[sid][yls[i]][qs]['bs_005'] - o[sid][yls[i]][qs]['bs_006'] - o[sid][yls[i]][qs]['bs_007'] - o[sid][yls[i]][qs]['bs_015'] - o[sid][yls[i]][qs]['bs_013'];
				qtldzc.push(t > 0 ? t : 0);
			}
		}
		else
		{
			ys = qls[i].substring(0, 4);
			qs = qls[i].substring(4);

			hbzj.push(o[sid][ys][qs]['bs_001']);
			yspj.push(o[sid][ys][qs]['bs_005']);
			yszk.push(o[sid][ys][qs]['bs_006']);
			yfkx.push(o[sid][ys][qs]['bs_007']);
			chxx.push(o[sid][ys][qs]['bs_015']);
			qtyskx.push(o[sid][ys][qs]['bs_013']);
			t = o[sid][ys][qs]['bs_018'] - o[sid][ys][qs]['bs_001'] - o[sid][ys][qs]['bs_005'] - o[sid][ys][qs]['bs_006'] - o[sid][ys][qs]['bs_007'] - o[sid][ys][qs]['bs_015'] - o[sid][ys][qs]['bs_013'];
			qtldzc.push(t > 0 ? t : 0);
		}
	}

	$(function (o) {
		$('#pic2').highcharts({
			chart: {
				type: 'column'
			},
			title: {
				text: '往年流动资产各项占比'
			},
			xAxis: {
				categories: xaxis
			},
			yAxis: {
				min: 0,
				title: {
					text: '流动资产'
				}
			},
			credits: {
				enabled: false
			},
			tooltip: {
				pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
				shared: true
			},
			plotOptions: {
				column: {
				stacking: 'percent'
				}
			},
			series: [{
				name: '货币资金',
				data: hbzj
			}, {
				name: '应收票据',
				data: yspj
			}, {
				name: '应收帐款',
				data: yszk
			}, {
				name: '预付款项',
				data: yfkx
			}, {
				name: '存货',
				data: chxx
			}, {
				name: '其他应收款',
				data: qtyskx
			}, {
				name: '其他流动资产',
				data: qtldzc
			}]
		});
	});
    
	if(pxaxis)
	{
		hbzj = new Array();
		yspj = new Array();
		yszk = new Array();
		yfkx = new Array();
		chxx = new Array();
		qtyskx = new Array();
		qtldzc = new Array();
		ys = null;
		qs = null;

		for (var i = 0; i < pxaxis.length; i++)
		{
			ys = pxaxis[i].substring(0, 4);
			qs = pxaxis[i].substring(4);

			hbzj.push(o[sid][ys][qs]['bs_001']);
			yspj.push(o[sid][ys][qs]['bs_005']);
			yszk.push(o[sid][ys][qs]['bs_006']);
			yfkx.push(o[sid][ys][qs]['bs_007']);
			chxx.push(o[sid][ys][qs]['bs_015']);
			qtyskx.push(o[sid][ys][qs]['bs_013']);
			t = o[sid][ys][qs]['bs_018'] - o[sid][ys][qs]['bs_001'] - o[sid][ys][qs]['bs_005'] - o[sid][ys][qs]['bs_006'] - o[sid][ys][qs]['bs_007'] - o[sid][ys][qs]['bs_015'] - o[sid][ys][qs]['bs_013'];
			qtldzc.push(t > 0 ? t : 0);
		}

		$(function (o) {
			$('#pic3').highcharts({
				chart: {
					type: 'column'
				},
				title: {
					text: '近期流动资产按季度各项占比'
				},
				xAxis: {
					categories: pxaxis
				},
				yAxis: {
					min: 0,
					title: {
						text: '流动资产'
					}
				},
				credits: {
					enabled: false
				},
				tooltip: {
					pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
					shared: true
				},
				plotOptions: {
					column: {
					stacking: 'percent'
					}
				},
				series: [{
					name: '货币资金',
					data: hbzj
				}, {
					name: '应收票据',
					data: yspj
				}, {
					name: '应收帐款',
					data: yszk
				}, {
					name: '预付款项',
					data: yfkx
				}, {
					name: '存货',
					data: chxx
				}, {
					name: '其他应收款',
					data: qtyskx
				}, {
					name: '其他流动资产',
					data: qtldzc
				}]
			});
		});
	}

	var dqjk = new Array();
	var yfpj = new Array();
	var yfzk = new Array();
	var yskx = new Array();
	var yfxc = new Array();
	var yjsf = new Array();
	var qtyfk = new Array();
	var dqfldfz = new Array();
	var cqjk = new Array();
	var yfzq = new Array();
	var cqyfk = new Array();
	var qtfz = new Array();
	xfound = false;
	xaxis = txaxis;

	for (var i = 0; i < txaxis.length; i++)
	{
		if (qls.length > 9)
		{
			if (i + 1 < txaxis.length)
				qs = '4';
			else
				qs = qnlast;

			if (!(qs in o[sid][yls[i]]))
			{
				if (xfound)
				{
					dqjk.push(null);
					yfpj.push(null);
					yfzk.push(null);
					yskx.push(null);
					yfxc.push(null);
					qtyfk.push(null);
					dqfldfz.push(null);
					cqjk.push(null);
					yfzq.push(null);
					cqyfk.push(null);
					qtfz.push(null);
				}
			}
			else
			{
				if (!xfound)
				{
					xfound = true;
					xaxis = txaxis.slice(i);
				}

				dqjk.push(o[sid][yls[i]][qs]['bs_040']);
				yfpj.push(o[sid][yls[i]][qs]['bs_045']);
				yfzk.push(o[sid][yls[i]][qs]['bs_046']);
				yskx.push(o[sid][yls[i]][qs]['bs_047']);
				yfxc.push(o[sid][yls[i]][qs]['bs_050']);
				qtyfk.push(o[sid][yls[i]][qs]['bs_054']);
				dqfldfz.push(o[sid][yls[i]][qs]['bs_059']);
				cqjk.push(o[sid][yls[i]][qs]['bs_062']);
				yfzq.push(o[sid][yls[i]][qs]['bs_063']);
				cqyfk.push(o[sid][yls[i]][qs]['bs_064']);
				t = o[sid][yls[i]][qs]['bs_070'] - o[sid][yls[i]][qs]['bs_040'] - o[sid][yls[i]][qs]['bs_045'] - o[sid][yls[i]][qs]['bs_046'] - o[sid][yls[i]][qs]['bs_047'] - o[sid][yls[i]][qs]['bs_050'] - o[sid][yls[i]][qs]['bs_054'] - o[sid][yls[i]][qs]['bs_059'] - o[sid][yls[i]][qs]['bs_062'] - o[sid][yls[i]][qs]['bs_063'] - o[sid][yls[i]][qs]['bs_064'];
				qtfz.push(t > 0 ? t : 0);
			}
		}
		else
		{
			ys = qls[i].substring(0, 4);
			qs = qls[i].substring(4);

			dqjk.push(o[sid][ys][qs]['bs_040']);
			yfpj.push(o[sid][ys][qs]['bs_045']);
			yfzk.push(o[sid][ys][qs]['bs_046']);
			yskx.push(o[sid][ys][qs]['bs_047']);
			yfxc.push(o[sid][ys][qs]['bs_050']);
			yjsf.push(o[sid][ys][qs]['bs_051']);
			qtyfk.push(o[sid][ys][qs]['bs_054']);
			dqfldfz.push(o[sid][ys][qs]['bs_059']);
			cqjk.push(o[sid][ys][qs]['bs_062']);
			yfzq.push(o[sid][ys][qs]['bs_063']);
			cqyfk.push(o[sid][ys][qs]['bs_064']);
			t = o[sid][ys][qs]['bs_070'] - o[sid][ys][qs]['bs_040'] - o[sid][ys][qs]['bs_045'] - o[sid][ys][qs]['bs_046'] - o[sid][ys][qs]['bs_047'] - o[sid][ys][qs]['bs_050'] - o[sid][ys][qs]['bs_054'] - o[sid][ys][qs]['bs_059'] - o[sid][ys][qs]['bs_062'] - o[sid][ys][qs]['bs_063'] - o[sid][ys][qs]['bs_064'];
			qtfz.push(t > 0 ? t : 0);
		}
	}

	$(function (o) {
		$('#pic4').highcharts({
			chart: {
				type: 'column'
			},
			title: {
				text: '往年负债结构分析'
			},
			xAxis: {
				categories: txaxis
			},
			yAxis: {
				min: 0,
				title: {
					text: '负债结构'
				}
			},
			credits: {
				enabled: false
			},
			tooltip: {
				pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
				shared: true
			},
			plotOptions: {
				column: {
				stacking: 'percent'
				}
			},
			series: [{
				name: '短期借款',
				data: dqjk
			}, {
				name: '应付票据',
				data: yfpj
			}, {
				name: '应付帐款',
				data: yfzk
			}, {
				name: '预收款项',
				data: yskx
			}, {
				name: '应付职工薪酬',
				data: yfxc
			}, {
				name: '其他应付款',
				data: qtyfk
			}, {
				name: '一年内到期的非流动负债',
				data: dqfldfz
			}, {
				name: '长期借款',
				data: cqjk
			}, {
				name: '应付债券',
				data: yfzq
			}, {
				name: '长期应付款',
				data: cqyfk
			}, {
				name: '其他负债',
				data: qtfz
			}]
		});
	});
    
	if(pxaxis)
	{
		dqjk = new Array();
		yfpj = new Array();
		yfzk = new Array();
		yskx = new Array();
		yfxc = new Array();
		yjsf = new Array();
		qtyfk = new Array();
		dqfldfz = new Array();
		cqjk = new Array();
		yfzq = new Array();
		cqyfk = new Array();
		qtfz = new Array();
		ys = null;
		qs = null;

		for (var i = 0; i < pxaxis.length; i++)
		{
			ys = pxaxis[i].substring(0, 4);
			qs = pxaxis[i].substring(4);

			dqjk.push(o[sid][ys][qs]['bs_040']);
			yfpj.push(o[sid][ys][qs]['bs_045']);
			yfzk.push(o[sid][ys][qs]['bs_046']);
			yskx.push(o[sid][ys][qs]['bs_047']);
			yfxc.push(o[sid][ys][qs]['bs_050']);
			qtyfk.push(o[sid][ys][qs]['bs_054']);
			dqfldfz.push(o[sid][ys][qs]['bs_059']);
			cqjk.push(o[sid][ys][qs]['bs_062']);
			yfzq.push(o[sid][ys][qs]['bs_063']);
			cqyfk.push(o[sid][ys][qs]['bs_064']);
			t = o[sid][ys][qs]['bs_070'] - o[sid][ys][qs]['bs_040'] - o[sid][ys][qs]['bs_045'] - o[sid][ys][qs]['bs_046'] - o[sid][ys][qs]['bs_047'] - o[sid][ys][qs]['bs_050'] - o[sid][ys][qs]['bs_054'] - o[sid][ys][qs]['bs_059'] - o[sid][ys][qs]['bs_062'] - o[sid][ys][qs]['bs_063'] - o[sid][ys][qs]['bs_064'];
			qtfz.push(t > 0 ? t : 0);
		}

		$(function (o) {
			$('#pic5').highcharts({
				chart: {
					type: 'column'
				},
				title: {
					text: '按季度近期负债结构分析'
				},
				xAxis: {
					categories: pxaxis
				},
				yAxis: {
					min: 0,
					title: {
						text: '负债结构'
					}
				},
				credits: {
					enabled: false
				},
				tooltip: {
					pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
					shared: true
				},
				plotOptions: {
					column: {
					stacking: 'percent'
					}
				},
				series: [{
					name: '短期借款',
					data: dqjk
				}, {
					name: '应付票据',
					data: yfpj
				}, {
					name: '应付帐款',
					data: yfzk
				}, {
					name: '预收款项',
					data: yskx
				}, {
					name: '应付职工薪酬',
					data: yfxc
				}, {
					name: '其他应付款',
					data: qtyfk
				}, {
					name: '一年内到期的非流动负债',
					data: dqfldfz
				}, {
					name: '长期借款',
					data: cqjk
				}, {
					name: '应付债券',
					data: yfzq
				}, {
					name: '长期应付款',
					data: cqyfk
				}, {
					name: '其他负债',
					data: qtfz
				}]
			});
		});
	}

	var zcfzl = new Array();
	xfound = false;
	xaxis = yls;

	for (var i = 0; i + 1 < yls.length; i++)
	{
		if (!('4' in o[sid][yls[i]]))
		{
			if (xfound)
				zcfzl.push(null);
		}
		else
		{
			if (!xfound)
			{
				xfound = true;
				xaxis = yls.slice(i);
			}

			zcfzl.push(floatDiv(100 * o[sid][yls[i]]['4']['bs_070'], o[sid][yls[i]]['4']['bs_038']));
		}
	}

	zcfzl.push(floatDiv(100 * o[sid][ylast][qnlast]['bs_070'], o[sid][ylast][qnlast]['bs_038']));

	$(function (o) 
	{
		$('#pic6').highcharts(
		{
			chart: {
				type: 'line',
				marginRight: 130,
				marginBottom: 25
			},
			title: {
				text: '资产负债率',
				x: -20 //center
			},
			xAxis: {
				categories: xaxis
			},
			yAxis: {
				title: {
					text: '%'
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			credits: {
				enabled: false
			},
			tooltip: {
				valueSuffix: '%'
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'top',
				x: -10,
				y: 100,
				borderWidth: 0
			},
			series: [{
		                name: '资产负债率',
                		data: zcfzl
			}]
		});
	});

	var ldzczb = new Array();
	var ldfzzb = new Array();
	var gdzczb = new Array();
	xfound = false;
	xaxis = yls;

	for (var i = 0; i + 1 < yls.length; i++)
	{
		if (!('4' in o[sid][yls[i]]))
		{
			if (xfound)
			{
				ldzczb.push(null);
				ldfzzb.push(null);
				gdzczb.push(null);
			}
		}
		else
		{
			if (!xfound)
			{
				xfound = true;
				xaxis = yls.slice(i);
			}

			ldzczb.push(floatDiv(100 * o[sid][yls[i]]['4']['bs_018'], o[sid][yls[i]]['4']['bs_038']));
			ldfzzb.push(floatDiv(100 * o[sid][yls[i]]['4']['bs_061'], o[sid][yls[i]]['4']['bs_070']));
			gdzczb.push(floatDiv(100 * (o[sid][yls[i]]['4']['bs_025'] + o[sid][yls[i]]['4']['bs_026'] + o[sid][yls[i]]['4']['bs_034']), o[sid][yls[i]]['4']['bs_038']));
		}
	}

	ldzczb.push(floatDiv(100 * o[sid][ylast][qnlast]['bs_018'], o[sid][ylast][qnlast]['bs_038']));
	ldfzzb.push(floatDiv(100 * o[sid][ylast][qnlast]['bs_061'], o[sid][ylast][qnlast]['bs_070']));
	gdzczb.push(floatDiv(100 * (o[sid][ylast][qnlast]['bs_025'] + o[sid][ylast][qnlast]['bs_026'] + o[sid][ylast][qnlast]['bs_034']), o[sid][ylast][qnlast]['bs_038']));

	$(function (o) 
	{
		$('#pic7').highcharts(
		{
			chart: {
				type: 'line',
				marginRight: 130,
				marginBottom: 25
			},
			title: {
				text: '各大类资产及负债占比',
				x: -20 //center
			},
			xAxis: {
				categories: xaxis
			},
			yAxis: {
				title: {
					text: '%'
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			credits: {
				enabled: false
			},
			tooltip: {
				valueSuffix: '%'
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'top',
				x: -10,
				y: 100,
				borderWidth: 0
			},
			series: [{
                		name: '流动资产占比',
                		data: ldzczb
			}, {
		                name: '流动负债占比',
                		data: ldfzzb
			}, {
                		name: '固定及长期待摊资产占比',
                		data: gdzczb
			}]
		});
	});

	var yschzb = new Array();
	var pjyschzb = new Array();
	var pjyffzzb = new Array();
	xfound = false;
	xaxis = yls;

	for (var i = 0; i + 1 < yls.length; i++)
	{
		if (!('4' in o[sid][yls[i]]))
		{
			if (xfound)
			{
				yschzb.push(null);
				pjyschzb.push(null);
				pjyffzzb.push(null);
			}
		}
		else
		{
			if (!xfound)
			{
				xfound = true;
				xaxis = yls.slice(i);
			}

			yschzb.push(floatDiv(100 * (o[sid][yls[i]]['4']['bs_006'] + o[sid][yls[i]]['4']['bs_015']), o[sid][yls[i]]['4']['bs_038']));
			pjyschzb.push(floatDiv(100 * (o[sid][yls[i]]['4']['bs_005'] + o[sid][yls[i]]['4']['bs_006'] + o[sid][yls[i]]['4']['bs_015']), o[sid][yls[i]]['4']['bs_038']));
			pjyffzzb.push(floatDiv(100 * (o[sid][yls[i]]['4']['bs_045'] + o[sid][yls[i]]['4']['bs_046'] + o[sid][yls[i]]['4']['bs_047']), o[sid][yls[i]]['4']['bs_070']));
		}
	}

	yschzb.push(floatDiv(100 * (o[sid][ylast][qnlast]['bs_006'] + o[sid][ylast][qnlast]['bs_015']), o[sid][ylast][qnlast]['bs_038']));
	pjyschzb.push(floatDiv(100 * (o[sid][ylast][qnlast]['bs_005'] + o[sid][ylast][qnlast]['bs_006'] + o[sid][ylast][qnlast]['bs_015']), o[sid][ylast][qnlast]['bs_038']));
	pjyffzzb.push(floatDiv(100 * (o[sid][ylast][qnlast]['bs_045'] + o[sid][ylast][qnlast]['bs_046'] + o[sid][ylast][qnlast]['bs_047']), o[sid][ylast][qnlast]['bs_070']));

	$(function (o) 
	{
		$('#pic8').highcharts(
		{
			chart: {
				type: 'line',
				marginRight: 130,
				marginBottom: 25
			},
			title: {
				text: '各大类资产及负债占比(续)',
				x: -20 //center
			},
			xAxis: {
				categories: xaxis
			},
			yAxis: {
				title: {
					text: '%'
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			credits: {
				enabled: false
			},
			tooltip: {
				valueSuffix: '%'
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'top',
				x: -10,
				y: 100,
				borderWidth: 0
			},
			series: [{
                		name: '应收款及存货资产占比',
                		data: yschzb
			}, {
                		name: '应收票据，款项及存货资产占比',
                		data: pjyschzb
			}, {
                		name: '应付票据，款项及预收负债占比',
                		data: pjyffzzb
			}]
		});
	});

	var ldbl = new Array();
	var sdbl = new Array();
	xfound = false;
	xaxis = txaxis;

	for (var i = 0; i < txaxis.length; i++)
	{
		if (qls.length > 9)
		{
			if (i + 1 < txaxis.length)
				qs = '4';
			else
				qs = qnlast;

			if (!(qs in o[sid][yls[i]]))
			{
				if (xfound)
				{
					ldbl.push(null);
					sdbl.push(null);
				}
			}
			else
			{
				if (!xfound)
				{
					xfound = true;
					xaxis = txaxis.slice(i);
				}

				ldbl.push(floatDiv(o[sid][yls[i]][qs]['bs_018'], o[sid][yls[i]][qs]['bs_061']));
				sdbl.push(floatDiv(o[sid][yls[i]][qs]['bs_018']- o[sid][yls[i]][qs]['bs_015'], o[sid][yls[i]][qs]['bs_061']));
			}
		}
		else
		{
			ys = qls[i].substring(0, 4);
			qs = qls[i].substring(4);

			ldbl.push(floatDiv(o[sid][ys][qs]['bs_018'], o[sid][ys][qs]['bs_061']));
			sdbl.push(floatDiv(o[sid][ys][qs]['bs_018'] - o[sid][ys][qs]['bs_015'], o[sid][ys][qs]['bs_061']));
		}
	}

	$(function (o) 
	{
		$('#pic9').highcharts(
		{
			chart: {
				type: 'line',
				marginRight: 130,
				marginBottom: 25
			},
			title: {
				text: '流动比率和速动比率',
				x: -20 //center
			},
			xAxis: {
				categories: xaxis
			},
			yAxis: {
				title: {
					text: ''
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			credits: {
				enabled: false
			},
			tooltip: {
				valueSuffix: ''
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'top',
				x: -10,
				y: 100,
				borderWidth: 0
			},
			series: [{
                		name: '流动比率',
                		data: ldbl
			}, {
                		name: '速动比率',
                		data: sdbl
			}]
		});
	});
}

function showPS(o, sid, yls, qls, txaxis, pxaxis)
{
	var ylast = qls[qls.length - 1].slice(0, 4);
	var qnlast = qls[qls.length - 1].slice(4);
	var sr = new Array();
	var jlr = new Array();
	var srzs = new Array();
	var jlrzs = new Array();
	var t1 = 0;
	var t2 = 0;
	var t = 0;
	var i = 0;
	var len = ('4' == qnlast ? yls.length : yls.length - 1);
	var useloga = false;
	var xaxis = yls;
	var xfound = false;

	for (i = 0; i < len; i++)
	{
		if (!('4' in o[sid][yls[i]]))
		{
			if (xfound)
			{
				sr.push(null);
				jlr.push(null);
				srzs.push(null);
				jlrzs.push(null);
			}

			t = 0;
		}
		else
		{ 
			if (!xfound)
			{
				xfound = true;
				xaxis = yls.slice(i);
			}

			sr.push(o[sid][yls[i]]['4']['ps_001']);
			jlr.push(o[sid][yls[i]]['4']['ps_031']);

			if (t > 0)
			{
				var xxx = floatDiv(100 * (o[sid][yls[i]]['4']['ps_001'] - t1), t1);
				if (xxx > 200)
				{
					useloga = true;
					//xxx = 100;
				}
				srzs.push(xxx);

				xxx = floatDiv(100 * (o[sid][yls[i]]['4']['ps_031'] - t2), t2);
				if (xxx > 200)
				{
					useloga = true;
					//xxx = 100;
				}
				jlrzs.push(xxx);
			}
			else
			{
				srzs.push(null);
				jlrzs.push(null);
			}

			t = 1;
			t1 = o[sid][yls[i]]['4']['ps_001'];
			t2 = o[sid][yls[i]]['4']['ps_031'];
		}
	}

	$(function (o) 
	{
		$('#pic11').highcharts(
		{
			chart: {
				zoomType: 'xy'
			},
			title: {
				text: '营业收入和归属母公司的净利润(年度)'
			},
			xAxis: [{
				categories: xaxis
			}],
			yAxis: [{
				labels: {
					style: {
						color: 'SteelBlue'
					}
				},
				title: {
					text: '净利润',
					style: {
						color: 'SteelBlue'
					}
				},
				opposite: true
			}, { 
				gridLineWidth: 0,
				title: {
					text: '营业收入',
					style: {
						color: 'Tomato'
					}
				},
				labels: {
					style: {
						color: 'Tomato'
					}
				}
			}, { 
				gridLineWidth: 0,
				title: {
					text: '营业收入和净利润增速',
					style: {
						color: 'green'
					}
				},
				labels: {
					formatter: function() {
						return this.value + '%';
					},
					style: {
						color: 'green'
					}
				},
				opposite: true
			}],
			tooltip: {
				shared: true
			},
			credits: {
				enabled: false
			},
			/*legend: {
				layout: 'vertical',
				align: 'left',
				verticalAlign: 'top',
				x: 120,
				y: 80,
				floating: true,
				backgroundColor: '#FFFFFF'
			},*/
			series: [{
				name: '净利润增速',
				color: 'SteelBlue',
				type: 'column',
				yAxis: 2,
				data: jlrzs,
				tooltip: {
					valueSuffix: '%'
				}
			}, {
				name: '营业收入增速',
				color: 'Tomato',
				type: 'column',
				yAxis: 2,
				data: srzs,
				tooltip: {
					valueSuffix: '%'
				}
			}, {
                		name: '净利润',
				type: 'spline',
				color: 'SteelBlue',
				tooltip: {
					valueSuffix: '元'
				},
                		data: jlr
			}, {
		                name: '营业收入',
				type: 'spline',
				color: 'Tomato',
				yAxis: 1,
				tooltip: {
					valueSuffix: '元'
				},
                		data: sr
			}]
		});
	});

	var srzs = [[], [], [], []];
	var jlrzs = [[], [], [], []];
	var yaxis1 = {title: {text: '%'}};
	var yaxis2 = {title: {text: '%'}};
	var sra = [[], [], [], []];
	var jlra = [[], [], [], []];
	xfound = false;
	xaxis = yls;

	for (i = 0; i < yls.length; i++)
	{
		for (var j = 0; j < 4; j++)
		{
			var q = (j + 1).toString();
			var xxx = 0;

			if (!(yls[i] in o[sid]) || !(yls[i - 1] in o[sid]))
			{
				if (xfound)
				{
					srzs[j].push(null);
					jlrzs[j].push(null);
                    
                    if (yls[i] in o[sid] && q in o[sid][yls[i]])
                    {
                        if (j == 0)
                        {
                            sra[j].push(o[sid][yls[i]][q]['ps_001']);
                            jlra[j].push(o[sid][yls[i]][q]['ps_031']);
                        }
                        else if (j.toString() in o[sid][yls[i]])
                        {
                            sra[j].push(o[sid][yls[i]][q]['ps_001'] - o[sid][yls[i]][j.toString()]['ps_001']);
                            jlra[j].push(o[sid][yls[i]][q]['ps_031'] - o[sid][yls[i]][j.toString()]['ps_031']);
                        }
                        else
                        {
                            sra[j].push(null);
                            jlra[j].push(null);
                        }
                    }
                    else
                    {
                        sra[j].push(null);
                        jlra[j].push(null);
                    }
				}
			}
			else if (!(q in o[sid][yls[i]]) || !(q in o[sid][yls[i - 1]]))
			{

				if (q in o[sid][yls[i]])
				{
                    if (!xfound)
                    {
                        xfound = true;
                        xaxis = yls.slice(i);
                        
                        for (var k = 0; k < j; k++)
                        {
                            srzs[k].push(null);
                            jlrzs[k].push(null);
                            sra[k].push(null);
                            jlra[k].push(null);
                        }
                    }
                    
                    if (j == 0)
					{
						sra[j].push(o[sid][yls[i]][q]['ps_001']);
						jlra[j].push(o[sid][yls[i]][q]['ps_031']);
					}
					else if (j.toString() in o[sid][yls[i]])
					{
						sra[j].push(o[sid][yls[i]][q]['ps_001'] - o[sid][yls[i]][j.toString()]['ps_001']);
						jlra[j].push(o[sid][yls[i]][q]['ps_031'] - o[sid][yls[i]][j.toString()]['ps_031']);
					}
					else
					{
                        sra[j].push(null);
                        jlra[j].push(null);
					}
				}
				else
				{
					if (xfound)
					{
						sra[j].push(null);
						jlra[j].push(null);
					}
				}

				if (xfound)
				{
					srzs[j].push(null);
					jlrzs[j].push(null);
				}
			}
			else if (j > 0 && (!(j.toString() in o[sid][yls[i]]) || !(j.toString() in o[sid][yls[i - 1]])))
			{
                if (j.toString() in o[sid][yls[i]])
				{
                    if (!xfound)
					{
						xfound = true;
						xaxis = yls.slice(i);
                        
                        for (var k = 0; k < j; k++)
                        {
                            srzs[k].push(null);
                            jlrzs[k].push(null);
                            sra[k].push(null);
                            jlra[k].push(null);
                        }
                    }
					
                    sra[j].push(o[sid][yls[i]][q]['ps_001'] - o[sid][yls[i]][j.toString()]['ps_001']);
					jlra[j].push(o[sid][yls[i]][q]['ps_031'] - o[sid][yls[i]][j.toString()]['ps_031']);
				}
				else if (xfound)
				{
					sra[j].push(null);
					jlra[j].push(null);
				}

				if (xfound)
				{
					srzs[j].push(null);
					jlrzs[j].push(null);
				}
			}
			else
			{ 
				if (!xfound)
				{
					xfound = true;
					xaxis = yls.slice(i);

					for (var k = 0; k < j; k++)
					{
						srzs[k].push(null);
						jlrzs[k].push(null);
						sra[k].push(null);
						jlra[k].push(null);
					}
				}

				if (j == 0)
				{
					t1 = 0;
					t2 = 0;
					sra[j].push(o[sid][yls[i]][q]['ps_001']);
					jlra[j].push(o[sid][yls[i]][q]['ps_031']);
				}
				else
				{
					t1 = o[sid][yls[i]][j.toString()]['ps_001'];
					t2 = o[sid][yls[i - 1]][j.toString()]['ps_001'];
					sra[j].push(o[sid][yls[i]][q]['ps_001'] - o[sid][yls[i]][j.toString()]['ps_001']);
					jlra[j].push(o[sid][yls[i]][q]['ps_031'] - o[sid][yls[i]][j.toString()]['ps_031']);
				}

				xxx = floatDiv(100 * (o[sid][yls[i]][q]['ps_001'] - t1 - o[sid][yls[i - 1]][q]['ps_001'] + t2), o[sid][yls[i - 1]][q]['ps_001'] - t2);
				srzs[j].push(xxx);
				if (xxx > 300 || xxx < -300)
				{
					yaxis2.labels = {
						formatter: function() {
							if(this.value >= 300)
								return 'MAX';
							else if(this.value <= -300)
								return '-MAX';
							else
								return this.value;
						}
					};
				}

				if (xxx < -300)
					yaxis2.min = -300;
				if (xxx > 300)
					yaxis2.max = 300;

				if (j == 0)
				{
					t1 = 0;
					t2 = 0;
				}
				else
				{
					t1 = o[sid][yls[i]][j.toString()]['ps_031'];
					t2 = o[sid][yls[i - 1]][j.toString()]['ps_031'];
				}

				xxx = floatDiv(100 * (o[sid][yls[i]][q]['ps_031'] - t1 - o[sid][yls[i - 1]][q]['ps_031'] + t2), o[sid][yls[i - 1]][q]['ps_031'] - t2);
				jlrzs[j].push(xxx);

				if (xxx > 300 || xxx < -300)
				{
					yaxis1.labels = {
						formatter: function() {
							if(this.value >= 300)
								return 'MAX';
							else if(this.value <= -300)
								return '-MAX';
							else
								return this.value;
						}
					};
				}

				if (xxx < -300)
					yaxis1.min = -300;
				if (xxx > 300)
					yaxis1.max = 300;
			}
		}
	}

	$(function (o) 
	{
		$('#pic12').highcharts(
		{
			chart: {
				type: 'column'
			},
			title: {
				text: '归属母公司的净利润(分季度)'
			},
			xAxis: {
				categories: xaxis
			},
			yAxis: {
				title: {
					text: '元'
				}
			},
			credits: {
				enabled: false
			},
			tooltip: {
				valueSuffix: '元'
			},
			series: [{
				name: 'Q1净利润',
				data: jlra[0],
			}, {
				name: 'Q2净利润',
				data: jlra[1],
			}, {
				name: 'Q3净利润',
				data: jlra[2],
			}, {
				name: 'Q4净利润',
				data: jlra[3],
			}]
		});
	});

	$(function (o) 
	{
		$('#pic13').highcharts(
		{
			chart: {
				type: 'column'
			},
			title: {
				text: '归属母公司的净利润增长(分季度)'
			},
			xAxis: {
				categories: xaxis
			},
			yAxis: yaxis1,
			credits: {
				enabled: false
			},
			tooltip: {
				valueSuffix: '%'
			},
			series: [{
				name: 'Q1净利润增速',
				data: jlrzs[0],
			}, {
				name: 'Q2净利润增速',
				data: jlrzs[1],
			}, {
				name: 'Q3净利润增速',
				data: jlrzs[2],
			}, {
				name: 'Q4净利润增速',
				data: jlrzs[3],
			}]
		});
	});

	$(function (o) 
	{
		$('#pic14').highcharts(
		{
			chart: {
				type: 'column'
			},
			title: {
				text: '营业收入(分季度)'
			},
			xAxis: {
				categories: xaxis
			},
			yAxis: {
				title: {
					text: '元'
				}
			},
			credits: {
				enabled: false
			},
			tooltip: {
				valueSuffix: '元'
			},
			series: [{
				name: 'Q1营业收入',
				data: sra[0],
			}, {
				name: 'Q2营业收入',
				data: sra[1],
			}, {
				name: 'Q3营业收入',
				data: sra[2],
			}, {
				name: 'Q4营业收入',
				data: sra[3],
			}]
		});
	});

	$(function (o) 
	{
		$('#pic15').highcharts(
		{
			chart: {
				type: 'column'
			},
			title: {
				text: '营业收入增长(分季度)'
			},
			xAxis: {
				categories: xaxis
			},
			yAxis: yaxis2,
			credits: {
				enabled: false
			},
			tooltip: {
				valueSuffix: '%'
			},
			series: [{
				name: 'Q1营业收入增速',
				data: srzs[0],
			}, {
				name: 'Q2营业收入增速',
				data: srzs[1],
			}, {
				name: 'Q3营业收入增速',
				data: srzs[2],
			}, {
				name: 'Q4营业收入增速',
				data: srzs[3],
			}]
		});
	});

	var roes = new Array();
	var roas = new Array();
	xaxis = yls;
	xfound = false;

	for (var i = 0; i + 1 < yls.length; i++)
	{
		if (!('4' in o[sid][yls[i]]))
		{
			if (xfound)
			{
				roes.push(null);
				roas.push(null);
			}
		}
		else
		{
			if (!xfound)
			{
				xfound = true;
				xaxis = yls.slice(i);
			}
 
			roes.push(floatDiv(100 * o[sid][yls[i]]['4']['ps_030'], o[sid][yls[i]]['4']['bs_082']));
			roas.push(floatDiv(100 * o[sid][yls[i]]['4']['ps_030'], o[sid][yls[i]]['4']['bs_038']));
		}
	}

	if (!('4' in o[sid][yls[yls.length - 1]]))
		xaxis = xaxis.slice(0, xaxis.length - 1);
	else
	{
		roes.push(floatDiv(100 * o[sid][yls[yls.length - 1]]['4']['ps_030'], o[sid][yls[yls.length - 1]]['4']['bs_082']));
		roas.push(floatDiv(100 * o[sid][yls[yls.length - 1]]['4']['ps_030'], o[sid][yls[yls.length - 1]]['4']['bs_038']));
	}

	$(function (o) 
	{
		$('#pic16').highcharts(
		{
			chart: {
				zoomType: 'xy'
			},
			title: {
				text: 'ROA,ROE'
			},
			xAxis: [{
				categories: xaxis
			}],
			yAxis: [{
				gridLineWidth: 0,
				title: {
					text: 'ROE(%)',
					style: {
						color: '#AA4643'
					}
				},
				labels: {
					style: {
						color: '#AA4643'
					}
				}
			}, { 
				labels: {
					style: {
						color: '#89A54E'
					}
				},
				title: {
					text: 'ROA(%)',
					style: {
						color: '#89A54E'
					}
				},
				opposite: true
			}],
			credits: {
				enabled: false
			},
			tooltip: {
				shared: true
			},
			/*legend: {
				layout: 'vertical',
				align: 'left',
				verticalAlign: 'top',
				x: 120,
				y: 80,
				floating: true,
				backgroundColor: '#FFFFFF'
			},*/
			series: [{
                		name: 'ROE',
				type: 'spline',
				color: '#AA4643',
				tooltip: {
					valueSuffix: '%'
				},
                		data: roes
			}, {
		                name: 'ROA',
				type: 'spline',
				color: '#89A54E',
				tooltip: {
					valueSuffix: '%'
				},
				yAxis: 1,
                		data: roas
			}]
		});
	});

	if(pxaxis)
	{
		fjcxsr = new Array();
		ys = null;
		qs = null;

		for (var i = 0; i < pxaxis.length; i++)
		{
			ys = pxaxis[i].substring(0, 4);
			qs = pxaxis[i].substring(4);

			t = o[sid][ys][qs]['ps_020'] + o[sid][ys][qs]['ps_021'] + o[sid][ys][qs]['ps_025'] - o[sid][ys][qs]['ps_026'] - o[sid][ys][qs]['ps_019'];
			fjcxsr.push(floatDiv(100 * t, o[sid][ys][qs]['ps_030']));
		}

		$(function (o) {
			$('#pic17').highcharts({
				chart: {
					type: 'column'
				},
				title: {
					text: '非经营性收入占净利润比'
				},
				xAxis: {
					categories: pxaxis
				},
				yAxis: {
					min: 0,
					title: {
						text: '非经营性收入(%)'
					}
				},
				credits: {
					enabled: false
				},
				tooltip: {
					valueSuffix: '%'
				},
				series: [{
					name: '非经营性收入',
					data: fjcxsr
				}]
			});
		});
	}

	var xsfy = new Array();
	var glfy = new Array();
	var cwfy = new Array();
	xfound = false;
	xaxis = yls;

	for (var i = 0; i + 1 < yls.length; i++)
	{
		if (!('4' in o[sid][yls[i]]))
		{
			if (xfound)
			{
				xsfy.push(null);
				glfy.push(null);
				cwfy.push(null);
			}
		}
		else
		{
			if (!xfound)
			{
				xfound = true;
				xaxis = yls.slice(i);
			}
 
			xsfy.push(floatDiv(100 * o[sid][yls[i]]['4']['ps_016'], o[sid][yls[i]]['4']['ps_001']));
			glfy.push(floatDiv(100 * o[sid][yls[i]]['4']['ps_017'], o[sid][yls[i]]['4']['ps_001']));
			cwfy.push(floatDiv(100 * o[sid][yls[i]]['4']['ps_018'], o[sid][yls[i]]['4']['ps_001']));
		}
	}

	xsfy.push(floatDiv(100 * o[sid][ylast][qnlast]['ps_016'], o[sid][ylast][qnlast]['ps_001']));
	glfy.push(floatDiv(100 * o[sid][ylast][qnlast]['ps_017'], o[sid][ylast][qnlast]['ps_001']));
	cwfy.push(floatDiv(100 * o[sid][ylast][qnlast]['ps_018'], o[sid][ylast][qnlast]['ps_001']));

	$(function () {
		$('#pic18').highcharts({
			chart: {
				type: 'column'
			},
			title: {
				text: '销售、管理和财务费用占收入比'
			},
			xAxis: {
				categories: xaxis
			},
			yAxis: {
				min: 0,
				title: {
					text: '销售、管理和财务费用占收入比(%)'
				},
				stackLabels: {
					enabled: true,
					style: {
						fontWeight: 'bold',
						color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
					}
				}
			},
			/*legend: {
				align: 'right',
				x: -100,
				verticalAlign: 'top',
				y: 20,
				floating: true,
				backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
				borderColor: '#CCC',
				borderWidth: 1,
				shadow: false
			},*/
			tooltip: {
				formatter: function() {
					return '<b>'+ this.x +'</b><br/>'+ this.series.name +': '+ this.y +'%<br/>'+ 'Total: '+ this.point.stackTotal + '%';
				}
			},
			credits: {
				enabled: false
			},
			plotOptions: {
				column: {
					stacking: 'normal',
					dataLabels: {
						enabled: true,
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
					}
				}
			},
			series: [{
				name: '财务费用占比',
				color: 'DarkRed',
				data: cwfy
			}, {
				name: '管理费用占比',
				data: glfy
			}, {
				name: '销售费用占比',
				data: xsfy
			}]
		});
	});

	var jlls = new Array();
	var mlls = new Array();
	xaxis = yls;
	xfound = false;

	for (var i = 0; i + 1 < yls.length; i++)
	{
		if (!('4' in o[sid][yls[i]]))
		{
			if (xfound)
			{
				mlls.push(null);
				jlls.push(null);
			}
		}
		else
		{
			if (!xfound)
			{
				xfound = true;
				xaxis = yls.slice(i);
			}
 
			mlls.push(floatDiv(100 * (o[sid][yls[i]]['4']['ps_002'] - o[sid][yls[i]]['4']['ps_007']), o[sid][yls[i]]['4']['ps_002']));
			jlls.push(floatDiv(100 * o[sid][yls[i]]['4']['ps_030'], o[sid][yls[i]]['4']['ps_001']));
		}
	}

	mlls.push(floatDiv(100 * (o[sid][ylast][qnlast]['ps_002'] - o[sid][ylast][qnlast]['ps_007']), o[sid][ylast][qnlast]['ps_002']));
	jlls.push(floatDiv(100 * o[sid][ylast][qnlast]['ps_030'], o[sid][ylast][qnlast]['ps_001']));

	$(function (o) 
	{
		$('#pic19').highcharts(
		{
			chart: {
				zoomType: 'xy'
			},
			title: {
				text: '净利率和毛利率'
			},
			xAxis: [{
				categories: xaxis
			}],
			yAxis: [{
				gridLineWidth: 0,
				title: {
					text: '净利率(%)',
					style: {
						color: '#AA4643'
					}
				},
				labels: {
					style: {
						color: '#AA4643'
					}
				}
			}, { 
				labels: {
					style: {
						color: '#89A54E'
					}
				},
				title: {
					text: '毛利率(%)',
					style: {
						color: '#89A54E'
					}
				},
				opposite: true
			}],
			credits: {
				enabled: false
			},
			tooltip: {
				shared: true
			},
			/*legend: {
				layout: 'vertical',
				align: 'left',
				verticalAlign: 'top',
				x: 120,
				y: 80,
				floating: true,
				backgroundColor: '#FFFFFF'
			},*/
			series: [{
                		name: '净利率',
				type: 'spline',
				color: '#AA4643',
				tooltip: {
					valueSuffix: '%'
				},
                		data: jlls
			}, {
		                name: '毛利率',
				type: 'spline',
				color: '#89A54E',
				tooltip: {
					valueSuffix: '%'
				},
				yAxis: 1,
                		data: mlls
			}]
		});
	});

	var yfks = new Array();
	var ysks = new Array();
	var tysks = new Array();
	xaxis = yls;
	xfound = false;

	for (var i = 0; i + 1 < yls.length; i++)
	{
		if (!('4' in o[sid][yls[i]]))
		{
			if (xfound)
			{
				yfks.push(null);
				ysks.push(null);
				tysks.push(null);
			}
		}
		else
		{
			if (!xfound)
			{
				xfound = true;
				xaxis = yls.slice(i);
			}
 
			ysks.push(floatDiv(100 * o[sid][yls[i]]['4']['bs_006'], o[sid][yls[i]]['4']['ps_001']));
			tysks.push(floatDiv(100 * (o[sid][yls[i]]['4']['bs_005'] + o[sid][yls[i]]['4']['bs_006'] + o[sid][yls[i]]['4']['bs_013']), o[sid][yls[i]]['4']['ps_001']));
			yfks.push(floatDiv(100 * o[sid][yls[i]]['4']['bs_046'], o[sid][yls[i]]['4']['ps_001']));
		}
	}

	if (!('4' in o[sid][yls[yls.length - 1]]))
		xaxis = xaxis.slice(0, xaxis.length - 1);
	else
	{
		ysks.push(floatDiv(100 * o[sid][ylast][qnlast]['bs_006'], o[sid][ylast][qnlast]['ps_001']));
		tysks.push(floatDiv(100 * (o[sid][ylast][qnlast]['bs_005'] + o[sid][ylast][qnlast]['bs_006'] + o[sid][ylast][qnlast]['bs_013']), o[sid][ylast][qnlast]['ps_001']));
		yfks.push(floatDiv(100 * o[sid][ylast][qnlast]['bs_046'], o[sid][ylast][qnlast]['ps_001']));
	}

	$(function (o) 
	{
		$('#pic20').highcharts(
		{
			chart: {
				zoomType: 'xy'
			},
			title: {
				text: '应收应付款占收入比'
			},
			xAxis: [{
				categories: xaxis
			}],
			yAxis: [{
				gridLineWidth: 0,
				title: {
					text: '应收款(%)',
					style: {
						color: 'Tomato'
					}
				},
				labels: {
					style: {
						color: 'Tomato'
					}
				}
			}, { 
				title: {
					text: '应付款(%)',
					style: {
						color: 'SteelBlue'
					}
				},
				labels: {
					style: {
						color: 'SteelBlue'
					}
				},
				opposite: true
			}, { 
				title: {
					text: '应收款、票据及其他应收款(%)',
					style: {
						color: 'Green'
					}
				},
				labels: {
					style: {
						color: 'Green'
					}
				},
				opposite: true
			}],
			credits: {
				enabled: false
			},
			tooltip: {
				shared: true
			},
			/*legend: {
				layout: 'vertical',
				align: 'left',
				verticalAlign: 'top',
				x: 120,
				y: 80,
				floating: true,
				backgroundColor: '#FFFFFF'
			},*/
			series: [{
                		name: '应收款',
				type: 'spline',
				color: 'Tomato',
				tooltip: {
					valueSuffix: '%'
				},
                		data: ysks
			}, {
		                name: '应付款',
				type: 'spline',
				color: 'SteelBlue',
				tooltip: {
					valueSuffix: '%'
				},
				yAxis: 1,
                		data: yfks
			}, {
		                name: '应收款、票据及其他应收款',
				type: 'spline',
				color: 'Green',
				tooltip: {
					valueSuffix: '%'
				},
				yAxis: 2,
                		data: tysks
			}]
		});
	});

	ysks = new Array();
	yfks = new Array();
	tysks = new Array();
	jlrs = new Array();
	xaxis = yls;
	xfound = false;

	for (var i = 0; i + 1 < yls.length; i++)
	{
		if (!('4' in o[sid][yls[i]]))
		{
			if (xfound)
			{
				yfks.push(null);
				ysks.push(null);
				tysks.push(null);
				jlrs.push(null);
			}
		}
		else
		{
			lys = (parseInt(yls[i], 10) - 1).toString();

			if (!(lys in o[sid]) || !('4' in o[sid][lys]))
			{
				if (xfound)
				{
					ysks.push(null);
					tysks.push(null);
					yfks.push(null);
					jlrs.push(null);
				}
			}
			else
			{
				if (!xfound)
				{
					xfound = true;
					xaxis = yls.slice(i);
				}
 
				ysks.push(floatDiv(100 * (o[sid][yls[i]]['4']['bs_006'] - o[sid][lys]['4']['bs_006']), o[sid][lys]['4']['bs_006']));
				tysks.push(floatDiv(100 * (o[sid][yls[i]]['4']['bs_005'] + o[sid][yls[i]]['4']['bs_006'] + o[sid][yls[i]]['4']['bs_013'] - o[sid][lys]['4']['bs_005'] - o[sid][lys]['4']['bs_006'] - o[sid][lys]['4']['bs_013']), o[sid][lys]['4']['bs_005'] + o[sid][lys]['4']['bs_006'] + o[sid][lys]['4']['bs_013']));
				yfks.push(floatDiv(100 * (o[sid][yls[i]]['4']['bs_046'] - o[sid][lys]['4']['bs_046']), o[sid][lys]['4']['bs_046']));
				jlrs.push(floatDiv(100 * (o[sid][yls[i]]['4']['ps_030'] - o[sid][lys]['4']['ps_030']), o[sid][lys]['4']['ps_030']));
			}
		}
	}

	if (!('4' in o[sid][yls[yls.length - 1]]))
		xaxis = xaxis.slice(0, xaxis.length - 1);
	else
	{
		lys = (parseInt(ylast, 10) - 1).toString();

		ysks.push(floatDiv(100 * (o[sid][ylast]['4']['bs_006'] - o[sid][lys]['4']['bs_006']), o[sid][lys]['4']['bs_006']));
		tysks.push(floatDiv(100 * (o[sid][ylast]['4']['bs_005'] + o[sid][ylast]['4']['bs_006'] + o[sid][ylast]['4']['bs_013'] - o[sid][lys]['4']['bs_005'] - o[sid][lys]['4']['bs_006'] - o[sid][lys]['4']['bs_013']), o[sid][lys]['4']['bs_005'] + o[sid][lys]['4']['bs_006'] + o[sid][lys]['4']['bs_013']));
		yfks.push(floatDiv(100 * (o[sid][ylast]['4']['bs_046'] - o[sid][lys]['4']['bs_046']), o[sid][lys]['4']['bs_046']));
		jlrs.push(floatDiv(100 * (o[sid][ylast]['4']['ps_030'] - o[sid][lys]['4']['ps_030']), o[sid][lys]['4']['ps_030']));
	}


	$(function (o) 
	{
		$('#pic21').highcharts(
		{
			chart: {
				zoomType: 'xy'
			},
			title: {
				text: '应收应付款同比增速(年度)'
			},
			xAxis: [{
				categories: xaxis
			}],
			yAxis: [{
				gridLineWidth: 0,
				title: {
					text: '应收款增速(%)',
					style: {
						color: 'Tomato'
					}
				},
				labels: {
					style: {
						color: 'Tomato'
					}
				}
			}, { 
				title: {
					text: '应付款增速(%)',
					style: {
						color: 'SteelBlue'
					}
				},
				labels: {
					style: {
						color: 'SteelBlue'
					}
				},
				opposite: true
			}, { 
				title: {
					text: '应收款、票据及其他应收款增速(%)',
					style: {
						color: 'Green'
					}
				},
				labels: {
					style: {
						color: 'Green'
					}
				},
				opposite: true
			}, { 
				title: {
					text: '净利润增速(%)',
					style: {
						color: 'Black'
					}
				},
				labels: {
					style: {
						color: 'Black'
					}
				}
			}],
			credits: {
				enabled: false
			},
			tooltip: {
				shared: true
			},
			series: [{
				name: '应收款增速',
				type: 'spline',
				color: 'Tomato',
				tooltip: {
					valueSuffix: '%'
				},
				data: ysks
			}, {
				name: '应付款增速',
				type: 'spline',
				color: 'SteelBlue',
				tooltip: {
					valueSuffix: '%'
				},
				yAxis: 1,
				data: yfks
			}, {
				name: '应收款、票据及其他应收款增速',
				type: 'spline',
				color: 'Green',
				tooltip: {
					valueSuffix: '%'
				},
				yAxis: 2,
				data: tysks
			}, {
				name: '净利润增速',
				type: 'spline',
				color: 'Black',
				tooltip: {
					valueSuffix: '%'
				},
				yAxis: 3,
				data: jlrs
			}]
		});
	});

	if(pxaxis)
	{
		ysks = new Array();
		yfks = new Array();
		tysks = new Array();
		ys = null;
		qs = null;

		for (var i = 0; i < pxaxis.length; i++)
		{
			ys = pxaxis[i].substring(0, 4);
			qs = pxaxis[i].substring(4);
			lys = (parseInt(ys, 10) - 1).toString();

			if (!(lys in o[sid]) || !(qs in o[sid][lys]))
			{
				ysks.push(null);
				tysks.push(null);
				yfks.push(null);
			}
			else
			{
				ysks.push(floatDiv(100 * (o[sid][ys][qs]['bs_006'] - o[sid][lys][qs]['bs_006']), o[sid][lys][qs]['bs_006']));
				tysks.push(floatDiv(100 * (o[sid][ys][qs]['bs_005'] + o[sid][ys][qs]['bs_006'] + o[sid][ys][qs]['bs_013'] - o[sid][lys][qs]['bs_005'] - o[sid][lys][qs]['bs_006'] - o[sid][lys][qs]['bs_013']), o[sid][lys][qs]['bs_005'] + o[sid][lys][qs]['bs_006'] + o[sid][lys][qs]['bs_013']));
				yfks.push(floatDiv(100 * (o[sid][ys][qs]['bs_046'] - o[sid][lys][qs]['bs_046']), o[sid][lys][qs]['bs_046']));
			}
		}


		$(function (o) 
		{
			$('#pic22').highcharts(
			{
				chart: {
					zoomType: 'xy'
				},
				title: {
					text: '应收应付款同比增速(年初到报告期)'
				},
				xAxis: [{
					categories: pxaxis
				}],
				yAxis: [{
					gridLineWidth: 0,
					title: {
						text: '应收款增速(%)',
						style: {
							color: 'Tomato'
						}
					},
					labels: {
						style: {
							color: 'Tomato'
						}
					}
				}, { 
					title: {
						text: '应付款增速(%)',
						style: {
							color: 'SteelBlue'
						}
					},
					labels: {
						style: {
							color: 'SteelBlue'
						}
					},
					opposite: true
				}, { 
					title: {
						text: '应收款、票据及其他应收款增速(%)',
						style: {
							color: 'Green'
						}
					},
					labels: {
						style: {
							color: 'Green'
						}
					},
					opposite: true
				}],
				credits: {
					enabled: false
				},
				tooltip: {
					shared: true
				},
				series: [{
	       	         		name: '应收款增速',
					type: 'spline',
					color: 'Tomato',
					tooltip: {
						valueSuffix: '%'
					},
					data: ysks
				}, {
			                name: '应付款增速',
					type: 'spline',
					color: 'SteelBlue',
					tooltip: {
						valueSuffix: '%'
					},
					yAxis: 1,
					data: yfks
				}, {
			                name: '应收款、票据及其他应收款增速',
					type: 'spline',
					color: 'Green',
					tooltip: {
						valueSuffix: '%'
					},
					yAxis: 2,
					data: tysks
				}]
			});
		});
	}

	var chs = new Array();
	var yfhks = new Array();
	var yshks = new Array();
	xaxis = yls;
	xfound = false;

	for (var i = 0; i + 1 < yls.length; i++)
	{
		if (!('4' in o[sid][yls[i]]))
		{
			if (xfound)
			{
				chs.push(null);
				yfhks.push(null);
				yshks.push(null);
			}
		}
		else
		{
			if (!xfound)
			{
				xfound = true;
				xaxis = yls.slice(i);
			}
 
			yshks.push(floatDiv(100 * o[sid][yls[i]]['4']['bs_047'], o[sid][yls[i]]['4']['ps_001']));
			chs.push(floatDiv(100 * o[sid][yls[i]]['4']['bs_015'], o[sid][yls[i]]['4']['ps_001']));
			yfhks.push(floatDiv(100 * o[sid][yls[i]]['4']['bs_007'], o[sid][yls[i]]['4']['ps_001']));
		}
	}

	if (!('4' in o[sid][yls[yls.length - 1]]))
		xaxis = xaxis.slice(0, xaxis.length - 1);
	else
	{
		yshks.push(floatDiv(100 * o[sid][ylast][qnlast]['bs_047'], o[sid][ylast][qnlast]['ps_001']));
		chs.push(floatDiv(100 * o[sid][ylast][qnlast]['bs_015'], o[sid][ylast][qnlast]['ps_001']));
		yfhks.push(floatDiv(100 * o[sid][ylast][qnlast]['bs_007'], o[sid][ylast][qnlast]['ps_001']));
	}

	$(function (o) 
	{
		$('#pic23').highcharts(
		{
			chart: {
				zoomType: 'xy'
			},
			title: {
				text: '存货预付预收款占收入比'
			},
			xAxis: [{
				categories: xaxis
			}],
			yAxis: [{
				gridLineWidth: 0,
				title: {
					text: '预收款(%)',
					style: {
						color: 'Tomato'
					}
				},
				labels: {
					style: {
						color: 'Tomato'
					}
				}
			}, { 
				title: {
					text: '预付款(%)',
					style: {
						color: 'SteelBlue'
					}
				},
				labels: {
					style: {
						color: 'SteelBlue'
					}
				},
				opposite: true
			}, { 
				title: {
					text: '存货(%)',
					style: {
						color: 'Green'
					}
				},
				labels: {
					style: {
						color: 'Green'
					}
				},
				opposite: true
			}],
			credits: {
				enabled: false
			},
			tooltip: {
				shared: true
			},
			series: [{
                		name: '预收款',
				type: 'spline',
				color: 'Tomato',
				tooltip: {
					valueSuffix: '%'
				},
                		data: yshks
			}, {
		                name: '预付款',
				type: 'spline',
				color: 'SteelBlue',
				tooltip: {
					valueSuffix: '%'
				},
				yAxis: 1,
                		data: yfhks
			}, {
		                name: '存货',
				type: 'spline',
				color: 'Green',
				tooltip: {
					valueSuffix: '%'
				},
				yAxis: 2,
                		data: chs
			}]
		});
	});

	chs = new Array();
	yfhks = new Array();
	yshks = new Array();
	jlrs = new Array();
	xaxis = yls;
	xfound = false;

	for (var i = 0; i + 1 < yls.length; i++)
	{
		if (!('4' in o[sid][yls[i]]))
		{
			if (xfound)
			{
				chs.push(null);
				yfhks.push(null);
				yshks.push(null);
				jlrs.push(null);
			}
		}
		else
		{
			lys = (parseInt(yls[i], 10) - 1).toString();

			if (!(lys in o[sid]) || !('4' in o[sid][lys]))
			{
				if (xfound)
				{
					yshks.push(null);
					chks.push(null);
					yfhks.push(null);
					jlrs.push(null);
				}
			}
			else
			{
				if (!xfound)
				{
					xfound = true;
					xaxis = yls.slice(i);
				}
 
				yfhks.push(floatDiv(100 * (o[sid][yls[i]]['4']['bs_007'] - o[sid][lys]['4']['bs_007']), o[sid][lys]['4']['bs_007']));
				chs.push(floatDiv(100 * (o[sid][yls[i]]['4']['bs_015'] - o[sid][lys]['4']['bs_015']), o[sid][lys]['4']['bs_015']));
				yshks.push(floatDiv(100 * (o[sid][yls[i]]['4']['bs_047'] - o[sid][lys]['4']['bs_047']), o[sid][lys]['4']['bs_047']));
				jlrs.push(floatDiv(100 * (o[sid][yls[i]]['4']['ps_030'] - o[sid][lys]['4']['ps_030']), o[sid][lys]['4']['ps_030']));
			}
		}
	}

	if (!('4' in o[sid][yls[yls.length - 1]]))
		xaxis = xaxis.slice(0, xaxis.length - 1);
	else
	{
		lys = (parseInt(ylast, 10) - 1).toString();

		yfhks.push(floatDiv(100 * (o[sid][ylast]['4']['bs_007'] - o[sid][lys]['4']['bs_007']), o[sid][lys]['4']['bs_007']));
		chs.push(floatDiv(100 * (o[sid][ylast]['4']['bs_015'] - o[sid][lys]['4']['bs_015']), o[sid][lys]['4']['bs_015']));
		yshks.push(floatDiv(100 * (o[sid][ylast]['4']['bs_047'] - o[sid][lys]['4']['bs_047']), o[sid][lys]['4']['bs_047']));
		jlrs.push(floatDiv(100 * (o[sid][ylast]['4']['ps_030'] - o[sid][lys]['4']['ps_030']), o[sid][lys]['4']['ps_030']));
	}

	$(function (o) 
	{
		$('#pic24').highcharts(
		{
			chart: {
				zoomType: 'xy'
			},
			title: {
				text: '存货预付预收款同比增速(年度)'
			},
			xAxis: [{
				categories: xaxis
			}],
			yAxis: [{
				gridLineWidth: 0,
				title: {
					text: '预收款增速(%)',
					style: {
						color: 'Tomato'
					}
				},
				labels: {
					style: {
						color: 'Tomato'
					}
				}
			}, { 
				title: {
					text: '预付款增速(%)',
					style: {
						color: 'SteelBlue'
					}
				},
				labels: {
					style: {
						color: 'SteelBlue'
					}
				},
				opposite: true
			}, { 
				title: {
					text: '存货增速(%)',
					style: {
						color: 'Green'
					}
				},
				labels: {
					style: {
						color: 'Green'
					}
				},
				opposite: true
			}, { 
				title: {
					text: '净利润增速(%)',
					style: {
						color: 'Black'
					}
				},
				labels: {
					style: {
						color: 'Black'
					}
				}
			}],
			credits: {
				enabled: false
			},
			tooltip: {
				shared: true
			},
			series: [{
       	         		name: '预收款增速',
				type: 'spline',
				color: 'Tomato',
				tooltip: {
					valueSuffix: '%'
				},
				data: yshks
			}, {
		                name: '预付款增速',
				type: 'spline',
				color: 'SteelBlue',
				tooltip: {
					valueSuffix: '%'
				},
				yAxis: 1,
				data: yfhks
			}, {
		                name: '存货增速',
				type: 'spline',
				color: 'Green',
				tooltip: {
					valueSuffix: '%'
				},
				yAxis: 2,
				data: chs
			}, {
		                name: '净利润增速',
				type: 'spline',
				color: 'Black',
				tooltip: {
					valueSuffix: '%'
				},
				yAxis: 3,
				data: jlrs
			}]
		});
	});

	if(pxaxis)
	{
		yshks = new Array();
		yfhks = new Array();
		chs = new Array();
		ys = null;
		qs = null;

		for (var i = 0; i < pxaxis.length; i++)
		{
			ys = pxaxis[i].substring(0, 4);
			qs = pxaxis[i].substring(4);
			lys = (parseInt(ys, 10) - 1).toString();

			if (!(lys in o[sid]) || !(qs in o[sid][lys]))
			{
				yshks.push(null);
				chs.push(null);
				yfhks.push(null);
			}
			else
			{
				yshks.push(floatDiv(100 * (o[sid][ys][qs]['bs_047'] - o[sid][lys][qs]['bs_047']), o[sid][lys][qs]['bs_047']));
				chs.push(floatDiv(100 * (o[sid][ys][qs]['bs_015'] - o[sid][lys][qs]['bs_015']), o[sid][lys][qs]['bs_015']));
				yfhks.push(floatDiv(100 * (o[sid][ys][qs]['bs_007'] - o[sid][lys][qs]['bs_007']), o[sid][lys][qs]['bs_007']));
			}
		}

		$(function (o) 
		{
			$('#pic25').highcharts(
			{
				chart: {
					zoomType: 'xy'
				},
				title: {
					text: '存货预付预收款同比增速(年初到报告期)'
				},
				xAxis: [{
					categories: pxaxis
				}],
				yAxis: [{
					gridLineWidth: 0,
					title: {
						text: '预收款增速(%)',
						style: {
							color: 'Tomato'
						}
					},
					labels: {
						style: {
							color: 'Tomato'
						}
					}
				}, { 
					title: {
						text: '预付款增速(%)',
						style: {
							color: 'SteelBlue'
						}
					},
					labels: {
						style: {
							color: 'SteelBlue'
						}
					},
					opposite: true
				}, { 
					title: {
						text: '存货增速(%)',
						style: {
							color: 'Green'
						}
					},
					labels: {
						style: {
							color: 'Green'
						}
					},
					opposite: true
				}],
				credits: {
					enabled: false
				},
				tooltip: {
					shared: true
				},
				series: [{
	       	         		name: '预收款增速',
					type: 'spline',
					color: 'Tomato',
					tooltip: {
						valueSuffix: '%'
					},
					data: yshks
				}, {
			                name: '预付款增速',
					type: 'spline',
					color: 'SteelBlue',
					tooltip: {
						valueSuffix: '%'
					},
					yAxis: 1,
					data: yfhks
				}, {
			                name: '存货增速',
					type: 'spline',
					color: 'Green',
					tooltip: {
						valueSuffix: '%'
					},
					yAxis: 2,
					data: chs
				}]
			});
		});
	}

	try
	{
	if (papercode && totalcapital > 0 && price_5_ago > 0 && papercode.substring(2) == sid)
	{
		var pft4 = 0; 
		var inc4 = 0;
		var dcorr = true;
		var lqs = 0;

		if (qls.length <= 9)
		{
			var lasty = parseInt(txaxis[txaxis.length - 1].substring(0, 4), 10);

			for (var i = 1; i < 5; i++)
			{
				var curry = parseInt(txaxis[txaxis.length - i].substring(0, 4), 10);
				if (lasty > curry + 1 || lasty < curry)
				{
					dcorr = false;
					break;
				}

				ys = txaxis[txaxis.length - i].substring(0, 4);
				qs = txaxis[txaxis.length - i].substring(4);

				if (qs == "1")
				{
					pft4 += o[sid][ys][qs]['ps_031'];
					inc4 += o[sid][ys][qs]['ps_001'];
					//alert(ys + qs + ": " + o[sid][ys][qs]['ps_031']);
				}
				else
				{
					lqs = (parseInt(qs, 10) - 1).toString();
					if (!(lqs in o[sid][ys]))
					{
						dcorr = false;
						break;
					}

					pft4 += (o[sid][ys][qs]['ps_031'] - o[sid][ys][lqs]['ps_031']); 
					inc4 += (o[sid][ys][qs]['ps_001'] - o[sid][ys][lqs]['ps_001']); 
					//alert(ys + qs + ": " + (o[sid][ys][qs]['ps_031'] - o[sid][ys][lqs]['ps_031']));
				}
			}		

		}
		else if (pxaxis)
		{
			var lasty = parseInt(pxaxis[pxaxis.length - 1].substring(0, 4), 10);

			for (var i = 1; i < 5; i++)
			{
				var curry = parseInt(pxaxis[pxaxis.length - i].substring(0, 4), 10);
				if (lasty > curry + 1 || lasty < curry)
				{
					dcorr = false;
					break;
				}

				ys = pxaxis[pxaxis.length - i].substring(0, 4);
				qs = pxaxis[pxaxis.length - i].substring(4);

				if (qs == "1")
				{
					pft4 += o[sid][ys][qs]['ps_031'];
					inc4 += o[sid][ys][qs]['ps_001'];
					//alert(ys + qs + ": " + o[sid][ys][qs]['ps_031']);
				}
				else
				{
					lqs = (parseInt(qs, 10) - 1).toString();
					if (!(lqs in o[sid][ys]))
					{
						dcorr = false;
						break;
					}

					pft4 += (o[sid][ys][qs]['ps_031'] - o[sid][ys][lqs]['ps_031']);
					inc4 += (o[sid][ys][qs]['ps_001'] - o[sid][ys][lqs]['ps_001']); 
					//alert(ys + qs + ": " + (o[sid][ys][qs]['ps_031'] - o[sid][ys][lqs]['ps_031']));
				}
			}
		}

		if (dcorr && pft4 > 0)
		{
			var pe = floatDiv(totalcapital * price_5_ago * 10000, pft4); 
			var ps = floatDiv(totalcapital * price_5_ago * 10000, inc4); 
			var pediv = document.getElementById("pic26");

			if (pe)
				pediv.innerHTML = "<span class=\"phead\">PE(TTM) 5 day ago: " + pe.toString() + "</span>";

			if (ps)
				pediv.innerHTML += "<p><span class=\"phead\">PS(TTM) 5 day ago: " + ps.toString() + "</span>";
		}
	}
	}
	catch (e) {}
}

function showCF(o, sid, yls, qls, txaxis, pxaxis)
{
	var ylast = qls[qls.length - 1].slice(0, 4);
	var qnlast = qls[qls.length - 1].slice(4);
	var xaxis = yls;
	var xaxis2 = yls;
	var xfound = false;
	var xfound2 = false;
	var jyxjl = new Array();
	var tzxjl = new Array();
	var rzxjl = new Array();
	var zyxjl = new Array();
	var jlr = new Array();
	var jyxjlzs = new Array();
	var tzxjlzs = new Array();
	var rzxjlzs = new Array();
	var zyxjlzs = new Array();
	var jlrzs = new Array()
	var yaxis = {
		title: {
			text: '%'
		}
	};	

	for (var i = 0; i + 1 < yls.length; i++)
	{
		if (!('4' in o[sid][yls[i]]))
		{
			if (xfound)
			{
				jyxjl.push(null);
				tzxjl.push(null);
				rzxjl.push(null);
				zyxjl.push(null);
				jlr.push(null);
			}

			if (xfound2)
			{
				jyxjlzs.push(null);
				tzxjlzs.push(null);
				rzxjlzs.push(null);
				zyxjlzs.push(null);
				jlrzs.push(null);
			}
		}
		else
		{
			if (!xfound)
			{
				xfound = true;
				xaxis = yls.slice(i);
			}

			jyxjl.push(o[sid][yls[i]]['4']['cf_026']);
			tzxjl.push(o[sid][yls[i]]['4']['cf_042']);
			rzxjl.push(o[sid][yls[i]]['4']['cf_055']);
			zyxjl.push(o[sid][yls[i]]['4']['cf_026'] + o[sid][yls[i]]['4']['cf_042']);
			jlr.push(o[sid][yls[i]]['4']['ps_030']);

			lys = (parseInt(yls[i], 10) - 1).toString();

			if (!(lys in o[sid]) || !('4' in o[sid][lys]))
			{
				if (xfound2)
				{
					jyxjlzs.push(null);
					tzxjlzs.push(null);
					rzxjlzs.push(null);
					zyxjlzs.push(null);
					jlrzs.push(null);
				}
			}
			else
			{
				if (!xfound2)
				{
					xfound2 = true;
					xaxis2 = yls.slice(i);
				}
 
				xxx = floatDiv(100 * (o[sid][yls[i]]['4']['cf_026'] - o[sid][lys]['4']['cf_026']), o[sid][lys]['4']['cf_026']);
				if (xxx > 300)
					yaxis.max = 300;
				if (xxx < -300)
					yaxis.min = -300;
				if (xxx > 300 || xxx < -300)
				{
					yaxis.labels = {
						formatter: function() {
							if(this.value >= 300)
								return 'MAX';
							else if(this.value <= -300)
								return '-MAX';
							else
								return this.value;
						}
					};
				}

				jyxjlzs.push(xxx);

				xxx = floatDiv(100 * (o[sid][yls[i]]['4']['cf_042'] - o[sid][lys]['4']['cf_042']), o[sid][lys]['4']['cf_042']);
				if (xxx > 300)
					yaxis.max = 300;
				if (xxx < -300)
					yaxis.min = -300;
				if (xxx > 300 || xxx < -300)
				{
					yaxis.labels = {
						formatter: function() {
							if(this.value >= 300)
								return 'MAX';
							else if(this.value <= -300)
								return '-MAX';
							else
								return this.value;
						}
					};
				}

				tzxjlzs.push(xxx);

				xxx = floatDiv(100 * (o[sid][yls[i]]['4']['cf_026'] + o[sid][yls[i]]['4']['cf_042'] - o[sid][lys]['4']['cf_026'] - o[sid][lys]['4']['cf_042']), o[sid][lys]['4']['cf_026'] + o[sid][lys]['4']['cf_042']);
				if (xxx > 300)
					yaxis.max = 300;
				if (xxx < -300)
					yaxis.min = -300;
				if (xxx > 300 || xxx < -300)
				{
					yaxis.labels = {
						formatter: function() {
							if(this.value >= 300)
								return 'MAX';
							else if(this.value <= -300)
								return '-MAX';
							else
								return this.value;
						}
					};
				}

				zyxjlzs.push(xxx);

				xxx = floatDiv(100 * (o[sid][yls[i]]['4']['cf_055'] - o[sid][lys]['4']['cf_055']), o[sid][lys]['4']['cf_055']);
				if (xxx > 300)
					yaxis.max = 300;
				if (xxx < -300)
					yaxis.min = -300;
				if (xxx > 300 || xxx < -300)
				{
					yaxis.labels = {
						formatter: function() {
							if(this.value >= 300)
								return 'MAX';
							else if(this.value <= -300)
								return '-MAX';
							else
								return this.value;
						}
					};
				}

				rzxjlzs.push(xxx);

				xxx = floatDiv(100 * (o[sid][yls[i]]['4']['ps_030'] - o[sid][lys]['4']['ps_030']), o[sid][lys]['4']['ps_030']);
				if (xxx > 300)
					yaxis.max = 300;
				if (xxx < -300)
					yaxis.min = -300;
				if (xxx > 300 || xxx < -300)
				{
					yaxis.labels = {
						formatter: function() {
							if(this.value >= 300)
								return 'MAX';
							else if(this.value <= -300)
								return '-MAX';
							else
								return this.value;
						}
					};
				}

				jlrzs.push(xxx);
			}
		}
	}

	if (!('4' in o[sid][yls[yls.length - 1]]))
	{
		//xaxis = xaxis.slice(0, xaxis.length - 1);
		xaxis2 = xaxis2.slice(0, xaxis2.length - 1);

		//
		jyxjl.push(o[sid][yls[yls.length - 1]][qnlast]['cf_026']);
		tzxjl.push(o[sid][yls[yls.length - 1]][qnlast]['cf_042']);
		rzxjl.push(o[sid][yls[yls.length - 1]][qnlast]['cf_055']);
		zyxjl.push(o[sid][yls[yls.length - 1]][qnlast]['cf_026'] + o[sid][yls[yls.length - 1]][qnlast]['cf_042']);
	}
	else
	{
		jyxjl.push(o[sid][yls[yls.length - 1]]['4']['cf_026']);
		tzxjl.push(o[sid][yls[yls.length - 1]]['4']['cf_042']);
		rzxjl.push(o[sid][yls[yls.length - 1]]['4']['cf_055']);
		zyxjl.push(o[sid][yls[yls.length - 1]]['4']['cf_026'] + o[sid][yls[yls.length - 1]]['4']['cf_042']);
		jlr.push(o[sid][yls[yls.length - 1]]['4']['ps_030']);

		if (!((yls.length - 2) in yls) || !(yls[yls.length - 2] in o[sid]) || !('4' in o[sid][yls[yls.length - 2]]))
			xaxis2 = xaxis2.slice(0, xaxis2.length - 1);
		else
		{
			xxx = floatDiv(100 * (o[sid][yls[yls.length - 1]]['4']['cf_026'] - o[sid][yls[yls.length - 2]]['4']['cf_026']), o[sid][yls[yls.length - 2]]['4']['cf_026']);
			if (xxx > 300)
				yaxis.max = 300;
			if (xxx < -300)
				yaxis.min = -300;
			if (xxx > 300 || xxx < -300)
			{
				yaxis.labels = {
					formatter: function() {
						if(this.value >= 300)
							return 'MAX';
						else if(this.value <= -300)
							return '-MAX';
						else
							return this.value;
					}
				};
			}

			jyxjlzs.push(xxx);

			xxx = floatDiv(100 * (o[sid][yls[yls.length - 1]]['4']['cf_042'] - o[sid][yls[yls.length - 2]]['4']['cf_042']), o[sid][yls[yls.length - 2]]['4']['cf_042']);
			if (xxx > 300)
				yaxis.max = 300;
			if (xxx < -300)
				yaxis.min = -300;
			if (xxx > 300 || xxx < -300)
			{
				yaxis.labels = {
					formatter: function() {
						if(this.value >= 300)
							return 'MAX';
						else if(this.value <= -300)
							return '-MAX';
						else
							return this.value;
					}
				};
			}

			tzxjlzs.push(xxx);

			xxx = floatDiv(100 * (o[sid][yls[yls.length - 1]]['4']['cf_026'] + o[sid][yls[yls.length - 1]]['4']['cf_042'] - o[sid][yls[yls.length - 2]]['4']['cf_026'] - o[sid][yls[yls.length - 2]]['4']['cf_042']), o[sid][yls[yls.length - 2]]['4']['cf_026'] + o[sid][yls[yls.length - 2]]['4']['cf_042']);
			if (xxx > 300)
				yaxis.max = 300;
			if (xxx < -300)
				yaxis.min = -300;
			if (xxx > 300 || xxx < -300)
			{
				yaxis.labels = {
					formatter: function() {
						if(this.value >= 300)
							return 'MAX';
						else if(this.value <= -300)
							return '-MAX';
						else
							return this.value;
					}
				};
			}

			zyxjlzs.push(xxx);
/*
			xxx = floatDiv(100 * (o[sid][yls[yls.length - 1]]['4']['cf_055'] - o[sid][yls[yls.length - 2]]['4']['cf_055']), o[sid][yls[yls.length - 2]]['4']['cf_055']);
			if (xxx > 300)
				yaxis.max = 300;
			if (xxx < -300)
				yaxis.min = -300;
			if (xxx > 300 || xxx < -300)
			{
				yaxis.labels = {
					formatter: function() {
						if(this.value >= 300)
							return 'MAX';
						else if(this.value <= -300)
							return '-MAX';
						else
							return this.value;
					}
				};
			}

			rzxjlzs.push(xxx);
*/
			xxx = floatDiv(100 * (o[sid][yls[yls.length - 1]]['4']['ps_030'] - o[sid][yls[yls.length - 2]]['4']['ps_030']), o[sid][yls[yls.length - 2]]['4']['ps_030']);
			if (xxx > 300)
				yaxis.max = 300;
			if (xxx < -300)
				yaxis.min = -300;
			if (xxx > 300 || xxx < -300)
			{
				yaxis.labels = {
					formatter: function() {
						if(this.value >= 300)
							return 'MAX';
						else if(this.value <= -300)
							return '-MAX';
						else
							return this.value;
					}
				};
			}

			jlrzs.push(xxx);
		}
	}

	$(function (o) 
	{
		$('#pic27').highcharts(
		{
			chart: {
				type: 'column'
			},
			title: {
				text: '现金流'
			},
			xAxis: {
				categories: xaxis
			},
			yAxis: {
				title: {
					text: '元'
				}
			},
			credits: {
				enabled: false
			},
			tooltip: {
				valueSuffix: '元'
			},
			series: [{
				name: '经营现金流',
				data: jyxjl
			}, {
				name: '投资现金流',
				data: tzxjl
			}, {
				name: '融资现金流',
				data: rzxjl
			}, {
				name: '自由现金流',
				data: zyxjl
			}]
		});
	});

	/*
	$(function (o) 
	{
		$('#pic28').highcharts(
		{
			chart: {
				type: 'column'
			},
			title: {
				text: '现金流增速'
			},
			xAxis: {
				categories: xaxis2
			},
			yAxis: yaxis,
			credits: {
				enabled: false
			},
			tooltip: {
				valueSuffix: '%'
			},
			series: [{
				name: '经营现金流增速',
				data: jyxjlzs
			}, {
				name: '投资现金流增速',
				data: tzxjlzs
			}, {
				name: '自由现金流增速',
				data: zyxjlzs
			}, {
				name: '净利润增速',
				data: jlrzs
			}]
		});
	});
	*/
}
