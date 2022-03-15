// pages/draw/draw.js.js
import * as echarts from "../../ec-canvas/echarts";

const MAXCOL = 9;

var charts = {
    "c1": undefined, //1
    "c2": undefined,
    "c3": undefined,
    "c4": undefined,
    "c5": undefined, //5
    "c6": undefined,
    "c7": undefined,
    "c8": undefined,
    "c9": undefined,
    "c10": undefined, //10
    "c11": undefined,
    "c12": undefined,
    "c13": undefined,
    "c14": undefined,
    "c15": undefined, //15
    "c16": undefined,
    "c17": undefined,
    "c18": undefined,
    "c19": undefined,
    "c20": undefined //20
};

function floatDiv(a1, a2)
{
	let t1 = 0;
	let t2 = 0;
	let r1, r2;
	let t = 0;
	let isneg = false;

	if (a2 == 0 || a2 == 0.0)
		return null;

	if (a1 < 0)
	{
		isneg = true;
		a1 = Math.abs(a1);
	}

	a2 = Math.abs(a2);

	try
	{
		t1 = a1.toString().split('.')[1].length;
	}
	catch (e) {}

	try
	{
		t2 = a2.toString().split('.')[1].length;
	}
	catch (e) {}

	r1 = Number(a1.toString().replace('.', ''));
	r2 = Number(a2.toString().replace('.', ''));
	if (r2 == 0)
		return null;

	t = (r1 / r2) * Math.pow(10, t2 - t1);
	if (isneg)
	{
		t = 0 - t;
	}

	return parseFloat(t.toFixed(2));
}

Page({
    data: {
        h: 0,
        w: 0,

        w1: 300,
        w2: 300,
        w3: 300,
        w4: 300,
        w5: 300,
        w6: 300,
        w7: 300,
        w8: 300,
        w9: 300,
        w10: 300,
        w11: 300,
        w12: 300,
        w13: 300,
        w14: 300,
        w15: 300,
        w16: 300,
        w17: 300,
        w18: 300,
        w19: 300,
        w20: 300,
        w21: 300,
        w22: 300,

        ec1: {lazyLoad: true},
        ec2: {lazyLoad: true},
        ec3: {lazyLoad: true},
        ec4: {lazyLoad: true},
        ec5: {lazyLoad: true},
        ec6: {lazyLoad: true},
        ec7: {lazyLoad: true},
        ec8: {lazyLoad: true},
        ec9: {lazyLoad: true},
        ec10: {lazyLoad: true},
        ec11: {lazyLoad: true},
        ec12: {lazyLoad: true},
        ec13: {lazyLoad: true},
        ec14: {lazyLoad: true},
        ec15: {lazyLoad: true},
        ec16: {lazyLoad: true},
        ec17: {lazyLoad: true},
        ec18: {lazyLoad: true},
        ec19: {lazyLoad: true},
        ec20: {lazyLoad: true},

        isLoaded: false,
        isDisposed: false,

        sid: "",
        name: "",
        sheets: [],
        total: 0,
        rpt: ""
    },

    initChart(cid, title, legend, categories, series, rev = true, y2 = false, enlog = false) {
        let mychart = this.selectComponent("#" + cid);

        mychart.init((canvas, width, height, dpr) => {
            let chart = undefined;

            if (charts[cid] === undefined) {
                chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr 
                });
            } else {
                chart = charts[cid];
                chart.clear();
            }
          
            var option = {
                //darkMode: true,
                //backgroundColor: "#000000",
                title: {
                    text: title,
                    textStyle: {
                        fontSize: 15,
                    },
                },
                legend: {
                    data: legend,
                    show: false,
                    type: "scroll",
                    bottom: 1,
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    axisPointer: { 
                        type: 'shadow'
                    },
                    textStyle: {
                        fontSize: 8,
                    },
                    confine: true
                },
                xAxis: rev ? {
                    type: 'value',
                    show: false,
                    boundaryGap: false,
                } : {
                    //offset: 10,
                    type: 'category',
                    boundaryGap: false,
                    data: categories,
                    axisLine: {
                        show: true,
                    },
                    axisTick: {
                        show: true,
                    },
                    axisLabel: {
                        fontSize: 10,
                    },
                    nameTextStyle: {
                        fontSize: 10,
                    },
                },
                yAxis: !y2 ? (rev ? {
                    type: 'category',
                    boundaryGap: false,
                    data: categories,
                    axisLine: {
                        show: true,
                    },
                    axisTick: {
                        show: false,
                    },
                } : {
                    type: enlog ? 'log' : 'value',
                    show: true,
                    //boundaryGap: false,
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        show: false,
                    },
                    axisTick: {
                        show: false,
                    },
                }) : [
                    {
                        type: enlog ? 'log' : 'value',
                        show: true,
                        //boundaryGap: false,
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                    }, 
                    {
                        type: enlog ? 'log' : 'value',
                        show: false,
                        //boundaryGap: false,
                        axisLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                    }
                ],
                series: series,
            };
          
            chart.setOption(option);
            if (charts[cid] === undefined) 
                charts[cid] = chart;
            return chart;
        });
    },

    onUnload() {
        this.dispose();
    },

    dispose() {
        for (let c in charts) {
            if (charts.hasOwnProperty(c) && charts[c] !== undefined) {
                charts[c].dispose();
                charts[c] = undefined;
            }
        } 
        this.setData({isDisposed: true});
    },

    onLoad: function (options) {
        let t = JSON.parse(options.sheets);
        this.setData({sheets: t.sheets});
        delete options.sheets;
        this.setData({...options});
        this.setData({
            w1: this.data.w,
            w2: this.data.w,
            w3: this.data.w,
            w4: this.data.w,
            w5: this.data.w,
            w6: this.data.w,
            w7: this.data.w,
            w8: this.data.w,
            w9: this.data.w,
            w10: this.data.w,
            w11: this.data.w,
            w12: this.data.w,
            w13: this.data.w,
            w14: this.data.w,
            w15: this.data.w,
            w16: this.data.w,
            w17: this.data.w,
            w18: this.data.w,
            w19: this.data.w,
            w20: this.data.w,
        })
    },
        
    init: function () {
        this.setData({
            isLoaded: true,
        });

        wx.showToast({title: "绘制图形中", icon: "loading", duration: 2000})

        let cq = this.data.sheets[0].ym[0] % 10;
        let t = 1 + Math.ceil((this.data.total - cq) / 4);
        let ylen = MAXCOL > t ? t : MAXCOL;
        let qlen = MAXCOL > this.data.total ? this.data.total : MAXCOL;
        let rya = [];
        let rqa = [];
        let data = {};

        //year
        for (let i = 0, j = 0; i < ylen; i++) {
            let q = this.data.sheets[0].ym[j] % 10;
            rya.push(String((this.data.sheets[0].ym[j] - q) / 10));
            j += (i == 0 ? cq : 4);
        }
        //Q
        for (let i = 0; i < qlen; i++) {
            let qs = String(this.data.sheets[0].ym[i]);
            qs = qs.slice(0, 4) + "Q" + qs.slice(4);
            rqa.push(qs);
        }

        let ya = rya.slice(0);
        let qa = rqa.slice(0);
        rya.reverse();
        rqa.reverse();

        /////////////////////////////////
        //c1: 总资产和股东权益
        try {
            data = {categories: [], series: [], legend:[], title: "总资产和股东权益(元)"};
            let zzc = [];
            let gdqy = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let bs = this.data.sheets[0].data[j];

                zzc.unshift(bs.bs_038 ? bs.bs_038 : 0);
                gdqy.unshift(bs.bs_082 ? bs.bs_082 : 0);
                
                j += (i == 0 ? cq : 4);
            }

            data.categories = rya;
            data.legend = ["总资产", "股东权益"];
            data.series.push({type: "line", name: "总资产", data: zzc});
            data.series.push({type: "line", name: "股东权益", data: gdqy});
            //data.series.push({yAxisIndex: 1, type: "line", name: "股东权益", data: gdqy});
            this.initChart("c1", data.title, data.legend, data.categories, data.series, false);
            //this.initChart("c1", data.title, data.legend, data.categories, data.series, false, true);
        }
        catch (e) {
            console.log(e);
            this.setData({w1: 0});
        }

        /////////////////////////////////////
        //c2: 往年流动资产各项占比
        try {
            data = {categories: [], series: [], legend:[], title: "往年流动资产各项占比(元)"};
            let bs003 = [];
            let bs004 = [];
            let bs014 = [];
            let hbzj = [];
            let cczj = [];
            let yspj = [];
            let yszk = [];
            let yszkrz = [];
            let htzc = [];
            let yfkx = [];
            let chxx = [];
            let qtyskx = [];
            let qtldzc = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let bs = this.data.sheets[0].data[j];

                bs003.unshift(bs.bs_003 ? bs.bs_003 : 0);
                bs004.unshift(bs.bs_004 ? bs.bs_004 : 0);
                bs014.unshift(bs.bs_014 ? bs.bs_014 : 0);
                hbzj.unshift(bs.bs_001 ? bs.bs_001 : 0);
                htzc.unshift(bs.bs_009 ? bs.bs_009 : 0);
                cczj.unshift(bs.bs_002 ? bs.bs_002 : 0);
                yspj.unshift(bs.bs_005 ? bs.bs_005 : 0);
                yszk.unshift(bs.bs_006 ? bs.bs_006 : 0);
                yszkrz.unshift(bs.bs_008 ? bs.bs_008 : 0);
                yfkx.unshift(bs.bs_007 ? bs.bs_007 : 0);
                chxx.unshift(bs.bs_015 ? bs.bs_015 : 0);
                qtyskx.unshift(bs.bs_013 ? bs.bs_013 : 0);

                if (bs.bs_018) {
                    t = bs.bs_018 -
                        (bs.bs_003 ? bs.bs_003 : 0) -
                        (bs.bs_004 ? bs.bs_004 : 0) -
                        (bs.bs_014 ? bs.bs_014 : 0) -
                        (bs.bs_001 ? bs.bs_001 : 0) -
                        (bs.bs_002 ? bs.bs_002 : 0) -
                        (bs.bs_005 ? bs.bs_005 : 0) -
                        (bs.bs_006 ? bs.bs_006 : 0) -
                        (bs.bs_007 ? bs.bs_007 : 0) -
                        (bs.bs_015 ? bs.bs_015 : 0) -
                        (bs.bs_013 ? bs.bs_013 : 0) -
                        (bs.bs_008 ? bs.bs_008 : 0) -
                        (bs.bs_009 ? bs.bs_009 : 0);
                    t = Math.round((t + Number.EPSILON) * 100) / 100
                    qtldzc.unshift(t > 0 ? t : 0);
                } else 
                    qtldzc.unshift(0);
                    
                //
                j += (i == 0 ? cq : 4);
            }

            data.categories = rya;
            data.legend = ["货币资金",  "应收票据", "应收帐款", "应收帐款融资", "合同资产", "预付款项", "存货", 
                "其他应收款", "其他流动资产", "交易性金融资产", "衍生金融资产", "买入返售金融资产", "拆出资金"
            ];
            data.series.push({type: "bar", stack: "total", name: "货币资金", data: hbzj});
            data.series.push({type: "bar", stack: "total", name: "应收票据", data: yspj});
            data.series.push({type: "bar", stack: "total", name: "应收帐款", data: yszk});
            data.series.push({type: "bar", stack: "total", name: "应收帐款融资", data: yszkrz});
            data.series.push({type: "bar", stack: "total", name: "合同资产", data: htzc});
            data.series.push({type: "bar", stack: "total", name: "预付款项", data: yfkx});
            data.series.push({type: "bar", stack: "total", name: "存货", data: chxx});
            data.series.push({type: "bar", stack: "total", name: "其他应收款", data: qtyskx});
            data.series.push({type: "bar", stack: "total", name: "其他流动资产", data: qtldzc});
            data.series.push({type: "bar", stack: "total", name: "交易性金融资产", data: bs003});
            data.series.push({type: "bar", stack: "total", name: "衍生金融资产", data: bs004});
            data.series.push({type: "bar", stack: "total", name: "买入返售金融资产", data: bs014});
            data.series.push({type: "bar", stack: "total", name: "拆出资金", data: cczj});
            //this.initChart("c2", data.title, data.legend, data.categories, data.series);
            this.initChart("c2", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            console.log(e);
            this.setData({w2: 0});
        }

        //////////////////////////////////////
        //c3: 近期流动资产按季度各项占比
        try {
            data = {categories: [], series: [], legend:[], title: "近期流动资产按季度各项占比(元)"};
            let bs003 = [];
            let bs004 = [];
            let bs014 = [];
            let hbzj = [];
            let cczj = [];
            let yspj = [];
            let yszk = [];
            let yszkrz = [];
            let htzc = [];
            let yfkx = [];
            let chxx = [];
            let qtyskx = [];
            let qtldzc = [];

            for (let i = 0; i < qlen; i++) {
                let bs = this.data.sheets[0].data[i];

                bs003.push(bs.bs_003 ? bs.bs_003 : 0);
                bs004.push(bs.bs_004 ? bs.bs_004 : 0);
                bs014.push(bs.bs_014 ? bs.bs_014 : 0);
                hbzj.push(bs.bs_001 ? bs.bs_001 : 0);
                htzc.push(bs.bs_009 ? bs.bs_009 : 0);
                cczj.push(bs.bs_002 ? bs.bs_002 : 0);
                yspj.push(bs.bs_005 ? bs.bs_005 : 0);
                yszk.push(bs.bs_006 ? bs.bs_006 : 0);
                yszkrz.push(bs.bs_008 ? bs.bs_008 : 0);
                yfkx.push(bs.bs_007 ? bs.bs_007 : 0);
                chxx.push(bs.bs_015 ? bs.bs_015 : 0);
                qtyskx.push(bs.bs_013 ? bs.bs_013 : 0);

                if (bs.bs_018) {
                    t = bs.bs_018 -
                        (bs.bs_003 ? bs.bs_003 : 0) -
                        (bs.bs_004 ? bs.bs_004 : 0) -
                        (bs.bs_014 ? bs.bs_014 : 0) -
                        (bs.bs_001 ? bs.bs_001 : 0) -
                        (bs.bs_002 ? bs.bs_002 : 0) -
                        (bs.bs_005 ? bs.bs_005 : 0) -
                        (bs.bs_006 ? bs.bs_006 : 0) -
                        (bs.bs_007 ? bs.bs_007 : 0) -
                        (bs.bs_015 ? bs.bs_015 : 0) -
                        (bs.bs_013 ? bs.bs_013 : 0) -
                        (bs.bs_008 ? bs.bs_008 : 0) -
                        (bs.bs_009 ? bs.bs_009 : 0);
                    t = Math.round((t + Number.EPSILON) * 100) / 100
                    qtldzc.push(t > 0 ? t : 0);
                } else
                    qtldzc.push(0);
            }

            data.categories = qa;
            data.legend = ["货币资金",  "应收票据", "应收帐款", "应收帐款融资", "合同资产", "预付款项", "存货", 
                "其他应收款", "其他流动资产", "交易性金融资产", "衍生金融资产", "买入返售金融资产", "拆出资金"
            ];
            data.series.push({type: "bar", stack: "total", name: "货币资金", data: hbzj});
            data.series.push({type: "bar", stack: "total", name: "应收票据", data: yspj});
            data.series.push({type: "bar", stack: "total", name: "应收帐款", data: yszk});
            data.series.push({type: "bar", stack: "total", name: "应收帐款融资", data: yszkrz});
            data.series.push({type: "bar", stack: "total", name: "合同资产", data: htzc});
            data.series.push({type: "bar", stack: "total", name: "预付款项", data: yfkx});
            data.series.push({type: "bar", stack: "total", name: "存货", data: chxx});
            data.series.push({type: "bar", stack: "total", name: "其他应收款", data: qtyskx});
            data.series.push({type: "bar", stack: "total", name: "其他流动资产", data: qtldzc});
            data.series.push({type: "bar", stack: "total", name: "交易性金融资产", data: bs003});
            data.series.push({type: "bar", stack: "total", name: "衍生金融资产", data: bs004});
            data.series.push({type: "bar", stack: "total", name: "买入返售金融资产", data: bs014});
            data.series.push({type: "bar", stack: "total", name: "拆出资金", data: cczj});
            this.initChart("c3", data.title, data.legend, data.categories, data.series);
            //this.initChart("c3", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            console.log(e);
            this.setData({w3: 0});
        }

        /////////////////////////////////////
        //c4: 往年负债结构分析
        try {
            data = {categories: [], series: [], legend:[], title: "往年负债结构分析(元)"};
            let bs042 = [];
            let bs043 = [];
            let zlfz = [];
            let yfyj = [];
            let yfdqzq = [];
            let yflx = [];
            let dqjk = [];
            let yfpj = [];
            let yfzk = [];
            let yskx = [];
            let htfz = [];
            let yfxc = [];
            let qtyfk = [];
            let dqfldfz = [];
            let cqjk = [];
            let yfzq = [];
            let cqyfk = [];
            let qtfz = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let bs = this.data.sheets[0].data[j];

                bs042.unshift(bs.bs_042 ? bs.bs_042 : 0);
                bs043.unshift(bs.bs_043 ? bs.bs_043 : 0);
                yfyj.unshift(bs.bs_049 ? bs.bs_049 : 0);
                yflx.unshift(bs.bs_053 ? bs.bs_053 : 0);
                yfdqzq.unshift(bs.bs_060 ? bs.bs_060 : 0);
                zlfz.unshift(bs.bs_065 ? bs.bs_065 : 0);
                dqjk.unshift(bs.bs_040 ? bs.bs_040 : 0);
                yfpj.unshift(bs.bs_045 ? bs.bs_045 : 0);
                yfzk.unshift(bs.bs_046 ? bs.bs_046 : 0);
                yskx.unshift(bs.bs_047 ? bs.bs_047 : 0);
                htfz.unshift(bs.bs_048 ? bs.bs_048 : 0);
                yfxc.unshift(bs.bs_050 ? bs.bs_050 : 0);
                qtyfk.unshift(bs.bs_054 ? bs.bs_054 : 0);
                dqfldfz.unshift(bs.bs_059 ? bs.bs_059 : 0);
                cqjk.unshift(bs.bs_062 ? bs.bs_062 : 0);
                yfzq.unshift(bs.bs_063 ? bs.bs_063 : 0);
                cqyfk.unshift(bs.bs_064 ? bs.bs_064 : 0);

                if (bs.bs_070) {
                    t = bs.bs_070 -
                        (bs.bs_042 ? bs.bs_042 : 0) -
                        (bs.bs_043 ? bs.bs_043 : 0) -
                        (bs.bs_049 ? bs.bs_049 : 0) -
                        (bs.bs_053 ? bs.bs_053 : 0) -
                        (bs.bs_065 ? bs.bs_065 : 0) -
                        (bs.bs_060 ? bs.bs_060 : 0) -
                        (bs.bs_040 ? bs.bs_040 : 0) -
                        (bs.bs_045 ? bs.bs_045 : 0) -
                        (bs.bs_046 ? bs.bs_046 : 0) -
                        (bs.bs_047 ? bs.bs_047 : 0) -
                        (bs.bs_050 ? bs.bs_050 : 0) -
                        (bs.bs_054 ? bs.bs_054 : 0) -
                        (bs.bs_059 ? bs.bs_059 : 0) -
                        (bs.bs_062 ? bs.bs_062 : 0) -
                        (bs.bs_063 ? bs.bs_063 : 0) -
                        (bs.bs_064 ? bs.bs_064 : 0) -
                        (bs.bs_048 ? bs.bs_048 : 0);
                    t = Math.round((t + Number.EPSILON) * 100) / 100
                    qtfz.unshift(t > 0 ? t : 0);
                } else 
                    qtfz.unshift(0);
                    
                //
                j += (i == 0 ? cq : 4);
            }

            data.categories = rya;
            data.legend = ["短期借款", "应付票据", "应付帐款", "预收款项", "合同负债", "应付手续费及佣金", 
                "应付职工薪酬", "应付利息", "其他应付款", "应付短期债券", 
                "一年内到期的非流动负债", "长期借款", "应付债券", "长期应付款", "其他负债",
                "交易性金融负债", "衍生金融负债", "租赁负债" 
            ];
            data.series.push({type: "bar", stack: "total", name: "短期借款", data: dqjk});
            data.series.push({type: "bar", stack: "total", name: "应付票据", data: yfpj});
            data.series.push({type: "bar", stack: "total", name: "应付帐款", data: yfzk});
            data.series.push({type: "bar", stack: "total", name: "预收款项", data: yskx});
            data.series.push({type: "bar", stack: "total", name: "合同负债", data: htfz});
            data.series.push({type: "bar", stack: "total", name: "应付手续费及佣金", data: yfyj});
            data.series.push({type: "bar", stack: "total", name: "应付职工薪酬", data: yfxc});
            data.series.push({type: "bar", stack: "total", name: "应付利息", data: yflx});
            data.series.push({type: "bar", stack: "total", name: "其他应付款", data: qtyfk});
            data.series.push({type: "bar", stack: "total", name: "应付短期债券", data: yfdqzq});
            data.series.push({type: "bar", stack: "total", name: "一年内到期的非流动负债", data: dqfldfz});
            data.series.push({type: "bar", stack: "total", name: "长期借款", data: cqjk});
            data.series.push({type: "bar", stack: "total", name: "应付债券", data: yfzq});
            data.series.push({type: "bar", stack: "total", name: "长期应付款", data: cqyfk});
            data.series.push({type: "bar", stack: "total", name: "其他负债", data: qtfz});
            data.series.push({type: "bar", stack: "total", name: "交易性金融负债", data: bs042});
            data.series.push({type: "bar", stack: "total", name: "衍生金融负债", data: bs043});
            data.series.push({type: "bar", stack: "total", name: "租赁负债", data: zlfz});

            //this.initChart("c4", data.title, data.legend, data.categories, data.series);
            this.initChart("c4", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            console.log(e);
            this.setData({w4: 0});
        }

        /////////////////////////////////////
        //c5: 按季度近期负债结构分析
        try {
            data = {categories: [], series: [], legend:[], title: "按季度近期负债结构分析(元)"};
            let bs042 = [];
            let bs043 = [];
            let zlfz = [];
            let yfyj = [];
            let yfdqzq = [];
            let yflx = [];
            let dqjk = [];
            let yfpj = [];
            let yfzk = [];
            let yskx = [];
            let htfz = [];
            let yfxc = [];
            let qtyfk = [];
            let dqfldfz = [];
            let cqjk = [];
            let yfzq = [];
            let cqyfk = [];
            let qtfz = [];

            for (let i = 0; i < qlen; i++) {
                let bs = this.data.sheets[0].data[i];

                bs042.push(bs.bs_042 ? bs.bs_042 : 0);
                bs043.push(bs.bs_043 ? bs.bs_043 : 0);
                yfyj.push(bs.bs_049 ? bs.bs_049 : 0);
                yflx.push(bs.bs_053 ? bs.bs_053 : 0);
                yfdqzq.push(bs.bs_060 ? bs.bs_060 : 0);
                zlfz.push(bs.bs_065 ? bs.bs_065 : 0);
                dqjk.push(bs.bs_040 ? bs.bs_040 : 0);
                yfpj.push(bs.bs_045 ? bs.bs_045 : 0);
                yfzk.push(bs.bs_046 ? bs.bs_046 : 0);
                yskx.push(bs.bs_047 ? bs.bs_047 : 0);
                htfz.push(bs.bs_048 ? bs.bs_048 : 0);
                yfxc.push(bs.bs_050 ? bs.bs_050 : 0);
                qtyfk.push(bs.bs_054 ? bs.bs_054 : 0);
                dqfldfz.push(bs.bs_059 ? bs.bs_059 : 0);
                cqjk.push(bs.bs_062 ? bs.bs_062 : 0);
                yfzq.push(bs.bs_063 ? bs.bs_063 : 0);
                cqyfk.push(bs.bs_064 ? bs.bs_064 : 0);

                if (bs.bs_070) {
                    t = bs.bs_070 -
                        (bs.bs_042 ? bs.bs_042 : 0) -
                        (bs.bs_043 ? bs.bs_043 : 0) -
                        (bs.bs_049 ? bs.bs_049 : 0) -
                        (bs.bs_053 ? bs.bs_053 : 0) -
                        (bs.bs_065 ? bs.bs_065 : 0) -
                        (bs.bs_060 ? bs.bs_060 : 0) -
                        (bs.bs_040 ? bs.bs_040 : 0) -
                        (bs.bs_045 ? bs.bs_045 : 0) -
                        (bs.bs_046 ? bs.bs_046 : 0) -
                        (bs.bs_047 ? bs.bs_047 : 0) -
                        (bs.bs_050 ? bs.bs_050 : 0) -
                        (bs.bs_054 ? bs.bs_054 : 0) -
                        (bs.bs_059 ? bs.bs_059 : 0) -
                        (bs.bs_062 ? bs.bs_062 : 0) -
                        (bs.bs_063 ? bs.bs_063 : 0) -
                        (bs.bs_064 ? bs.bs_064 : 0) -
                        (bs.bs_048 ? bs.bs_048 : 0);
                    t = Math.round((t + Number.EPSILON) * 100) / 100
                    qtfz.push(t > 0 ? t : 0);
                } else 
                    qtfz.push(0);
            }

            data.categories = qa;
            data.legend = ["短期借款", "应付票据", "应付帐款", "预收款项", "合同负债", "应付手续费及佣金", 
                "应付职工薪酬", "应付利息", "其他应付款", "应付短期债券", 
                "一年内到期的非流动负债", "长期借款", "应付债券", "长期应付款", "其他负债",
                "交易性金融负债", "衍生金融负债", "租赁负债" 
            ];
            data.series.push({type: "bar", stack: "total", name: "短期借款", data: dqjk});
            data.series.push({type: "bar", stack: "total", name: "应付票据", data: yfpj});
            data.series.push({type: "bar", stack: "total", name: "应付帐款", data: yfzk});
            data.series.push({type: "bar", stack: "total", name: "预收款项", data: yskx});
            data.series.push({type: "bar", stack: "total", name: "合同负债", data: htfz});
            data.series.push({type: "bar", stack: "total", name: "应付手续费及佣金", data: yfyj});
            data.series.push({type: "bar", stack: "total", name: "应付职工薪酬", data: yfxc});
            data.series.push({type: "bar", stack: "total", name: "应付利息", data: yflx});
            data.series.push({type: "bar", stack: "total", name: "其他应付款", data: qtyfk});
            data.series.push({type: "bar", stack: "total", name: "应付短期债券", data: yfdqzq});
            data.series.push({type: "bar", stack: "total", name: "一年内到期的非流动负债", data: dqfldfz});
            data.series.push({type: "bar", stack: "total", name: "长期借款", data: cqjk});
            data.series.push({type: "bar", stack: "total", name: "应付债券", data: yfzq});
            data.series.push({type: "bar", stack: "total", name: "长期应付款", data: cqyfk});
            data.series.push({type: "bar", stack: "total", name: "其他负债", data: qtfz});
            data.series.push({type: "bar", stack: "total", name: "交易性金融负债", data: bs042});
            data.series.push({type: "bar", stack: "total", name: "衍生金融负债", data: bs043});
            data.series.push({type: "bar", stack: "total", name: "租赁负债", data: zlfz});

            this.initChart("c5", data.title, data.legend, data.categories, data.series);
            //this.initChart("c5", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            console.log(e);
            this.setData({w5: 0});
        }

        /////////////////////////////////////
        //c6: 资产负债率和有息负债率
        try {
            data = {categories: [], series: [], legend:[], title: "资产负债率和有息负债率(%)"};
            let zcfzl = [];
            let yxfzl = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let bs = this.data.sheets[0].data[j];

                zcfzl.unshift(floatDiv(100 * bs.bs_070, bs.bs_038));
                let t = (bs.bs_040 ? bs.bs_040 : 0) +
                    (bs.bs_041 ? bs.bs_041 : 0) +
                    (bs.bs_042 ? bs.bs_042 : 0) +
                    (bs.bs_043 ? bs.bs_043 : 0) +
                    (bs.bs_052 ? bs.bs_052 : 0) +
                    (bs.bs_059 ? bs.bs_059 : 0) +
                    (bs.bs_060 ? bs.bs_060 : 0) +
                    (bs.bs_062 ? bs.bs_062 : 0) +
                    (bs.bs_063 ? bs.bs_063 : 0);
                yxfzl.unshift(floatDiv(100 * t, bs.bs_038));
                    
                //
                j += (i == 0 ? cq : 4);
            }

            data.categories = rya;
            data.legend = ["资产负债率", "有息负债率"
            ];
            data.series.push({type: "line", name: "资产负债率", data: zcfzl});
            data.series.push({yAxisIndex: 1, type: "line", name: "有息负债率", data: yxfzl});

            this.initChart("c6", data.title, data.legend, data.categories, data.series, false, true);
        }
        catch (e) {
            console.log(e);
            this.setData({w6: 0});
        }

        /////////////////////////////////////
        //c7: 流动资产及负债占总资产及负债比
        try {
            data = {categories: [], series: [], legend:[], title: "流动资产及负债占比(%)"};
            let ldzczb = [];
            let ldfzzb = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let bs = this.data.sheets[0].data[j];

                ldzczb.unshift(floatDiv(100 * bs.bs_018, bs.bs_038));
                ldfzzb.unshift(floatDiv(100 * bs.bs_061, bs.bs_070));
                    
                //
                j += (i == 0 ? cq : 4);
            }

            data.categories = rya;
            data.legend = ["流动资产占总资产比", "流动负债占总负债比"
            ];
            data.series.push({type: "line", name: "流动资产占总资产比", data: ldzczb});
            data.series.push({yAxisIndex: 1, type: "line", name: "流动负债占总负债比", data: ldfzzb});

            this.initChart("c7", data.title, data.legend, data.categories, data.series, false, true);
        }
        catch (e) {
            console.log(e);
            this.setData({w7: 0});
        }

        /////////////////////////////////////
        //c8:  流动比率和速动比率
        try {
            data = {categories: [], series: [], legend:[], title: "流动比率和速动比率(%)"};
            let ldbl = [];
            let sdbl = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let bs = this.data.sheets[0].data[j];

                if (bs.bs_018) {
                    ldbl.unshift(floatDiv(bs.bs_018, bs.bs_061));
                    sdbl.unshift(floatDiv((bs.bs_018 - (bs.bs_015 ? bs.bs_015 : 0)), bs.bs_061));
                } else {
                    ldbl.unshift(0);
                    sdbl.unshift(0);
                }
                    
                //
                j += (i == 0 ? cq : 4);
            }

            data.categories = rya;
            data.legend = ["流动比率", "速动比率"
            ];
            data.series.push({type: "line", name: "流动比率", data: ldbl});
            //data.series.push({yAxisIndex: 1, type: "line", stack: "total", name: "速动比率", data: sdbl});
            data.series.push({type: "line", name: "速动比率", data: sdbl});

            //this.initChart("c8", data.title, data.legend, data.categories, data.series, false, true);
            this.initChart("c8", data.title, data.legend, data.categories, data.series, false);
        }
        catch (e) {
            console.log(e);
            this.setData({w8: 0});
        }


        /////////////////////////////////////
        //c9: 商誉、无形、油气、生物资产
        try {
            data = {categories: [], series: [], legend:[], title: "商誉、无形、油气、生物资产(元)"};
            let bs029 = [];
            let bs030 = [];
            let bs031 = [];
            let bs033 = [];
            let bsoft = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let bs = this.data.sheets[0].data[j];

                bs029.unshift(bs.bs_029 ? bs.bs_029 : 0);
                bs030.unshift(bs.bs_030 ? bs.bs_030 : 0);
                bs031.unshift(bs.bs_031 ? bs.bs_031 : 0);
                bs033.unshift(bs.bs_033 ? bs.bs_033 : 0);
                if (bs.bs_038) {
                    t = bs.bs_038 -
                        (bs.bs_029 ? bs.bs_029 : 0) -
                        (bs.bs_030 ? bs.bs_030 : 0) -
                        (bs.bs_031 ? bs.bs_031 : 0) -
                        (bs.bs_033 ? bs.bs_033 : 0);
                    t = Math.round((t + Number.EPSILON) * 100) / 100
                    bsoft.unshift(t > 0 ? t : 0);
                } else 
                    bsoft.unshift(0);
                    
                //
                j += (i == 0 ? cq : 4);
            }

            data.categories = rya;
            data.legend = ["其它资产", "生产性生物资产", "油气资产", "无形资产", "商誉" 
            ];
            data.series.push({type: "bar", stack: "total", name: "其它资产", data: bsoft});
            data.series.push({type: "bar", stack: "total", name: "生产性生物资产", data: bs029});
            data.series.push({type: "bar", stack: "total", name: "油气资产", data: bs030});
            data.series.push({type: "bar", stack: "total", name: "无形资产", data: bs031});
            data.series.push({type: "bar", stack: "total", name: "商誉", data: bs033});

            //this.initChart("c9", data.title, data.legend, data.categories, data.series);
            this.initChart("c9", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            console.log(e);
            this.setData({w9: 0});
        }

        /////////////////////////////////////
        //c10: 年营业收入和归母净利润(元)
        try {
            data = {categories: [], series: [], legend:[], title: "年营业收入和归母净利润(元)"};
            let sr = [];
            let jlr = [];
            let enlog = false;
            let dislog = false;

            for (let i = 0, j = 0; i < ylen; i++) {
                let ps = this.data.sheets[1].data[j];
                let t = 0;

                t = ps.ps_001 ? ps.ps_001 : ps.ps_002 ? ps.ps_002 : 0;
                if (!enlog && !dislog) {
                    if (sr.length > 0 && t >= 0 && sr[0] >= 0 && Math.abs(floatDiv(100 * (t - sr[0]), sr[0])) > 200)
                        enlog = true;
                } else if (!dislog) {
                    if (t < 0 || sr[0] < 0) {
                        enlog = false;
                        dislog = true;
                    }
                }

                sr.unshift(t);
                t = ps.ps_031 ? ps.ps_031 : 0;
                if (!enlog && !dislog) {
                    if (jlr.length > 0 && t >= 0 && jlr[0] >= 0 && Math.abs(floatDiv(100 * (t - jlr[0]), jlr[0])) > 200)
                        enlog = true;
                } else if (!dislog) {
                    if (t < 0 || jlr[0] < 0) {
                        enlog = false;
                        dislog = true;
                    }
                }

                jlr.unshift(t);
                    
                //
                j += (i == 0 ? cq : 4);
            }

            if (enlog)
                data.title += "-对数";
            data.categories = rya;
            data.legend = ["营业收入", "净利润"
            ];
            data.series.push({type: "line", name: "营业收入", data: sr});
            data.series.push({yAxisIndex:1, type: "line", name: "净利润", data: jlr});

            this.initChart("c10", data.title, data.legend, data.categories, data.series, false, true, enlog);
        }
        catch (e) {
            console.log(e);
            this.setData({w10: 0});
        }

        
        /////////////////////////////////////
        //c11: 营业收入和归母净利润年增速
        try {
            data = {categories: [], series: [], legend:[], title: "营收和归母净利润年增速(%)"};
            let sr = [];
            let jlr = [];
            let enlog = false;
            let dislog = false;

            data.categories = cq == 4 ? rya : rya.slice(0, rya.length - 1);

            for (let i = 0, j = cq == 4 ? 0 : cq; i < ylen && i < data.categories.length; i++, j += 4) {
                if (j + 4 >= this.data.sheets[1].data.length)
                    break;

                let ps1 = this.data.sheets[1].data[j];
                let ps2 = this.data.sheets[1].data[j + 4];
                let t1 = 0, t2 = 0, t = 0;

                t1 = ps1.ps_001 ? ps1.ps_001 : ps1.ps_002 ? ps1.ps_002 : 0;
                t2 = ps2.ps_001 ? ps2.ps_001 : ps2.ps_002 ? ps2.ps_002 : 0;
                t = floatDiv(100 * (t1 - t2), t2);
                if (!enlog && !dislog) {
                    //if (sr.length > 0 && t >= 0 && sr[0] >= 0 && Math.abs(floatDiv(100 * (t - sr[0]), sr[0])) > 200)
                    if (t >= 200)
                        enlog = true;
                    else if (t < 0)
                        dislog = true;
                } else if (!dislog) {
                    //if (t < 0 || sr[0] < 0) {
                    if (t < 0) {
                        enlog = false;
                        dislog = true;
                    }
                }

                sr.unshift(t);
                t1 = ps1.ps_031 ? ps1.ps_031 : 0;
                t2 = ps2.ps_031 ? ps2.ps_031 : 0;
                t = floatDiv(100 * (t1 - t2), t2);
                if (!enlog && !dislog) {
                    //if (jlr.length > 0 && t >= 0 && jlr[0] >= 0 && Math.abs(floatDiv(100 * (t - jlr[0]), jlr[0])) > 200)
                    if (t >= 200)
                        enlog = true;
                    else if (t < 0)
                        dislog = true;
                } else if (!dislog) {
                    //if (t < 0 || jlr[0] < 0) {
                    if (t < 0) {
                        enlog = false;
                        dislog = true;
                    }
                }

                jlr.unshift(t);
            }

            if (data.categories.length > sr.length) 
                data.categories = data.categories.slice(data.categories.length - sr.length);

            if (enlog)
                data.title += "-对数";
            data.legend = ["营业收入增速", "净利润增速"
            ];
            data.series.push({type: "bar", name: "营业收入增速", data: sr, barGap: 0});
            //data.series.push({yAxisIndex:1, type: "bar", name: "净利润增速", data: jlr});
            data.series.push({type: "bar", name: "净利润增速", data: jlr});

            this.initChart("c11", data.title, data.legend, data.categories, data.series, false, false, enlog);
        }
        catch (e) {
            //console.log(e);
            console.log(e);
            this.setData({w11: 0});
        }

        /////////////////////////////////////
        //c12: 归母分季度净利润
        try {
            data = {categories: [], series: [], legend:[], title: "归母分季度净利润(元)"};
            let jlr = [[], [], [], []];
            let enlog = false;
            let dislog = false;

            for (let k = 0; k < jlr.length; k++) {
                let j = cq - k - 1;
                let len = ylen;
                if (j < 0) {
                    j += 4;
                    len--;
                }

                for (let i = 0; i < len; i++, j += 4) {
                    if (j >= this.data.sheets[1].data.length || (k > 0 && j + 1 >= this.data.sheets[1].data.length))
                        break;

                    let ps1 = this.data.sheets[1].data[j];
                    let ps2 = k > 0 ? this.data.sheets[1].data[j + 1] : null;
                    let t1 = 0, t2 = 0, t = 0;

                    t1 = ps1.ps_031 ? ps1.ps_031 : 0;
                    t2 = (ps2 && ps2.ps_031) ? ps2.ps_031 : 0;
                    t = k > 0 ? parseFloat((t1 - t2).toFixed(2)) : t1;

                    if (!enlog && !dislog) {
                        if (jlr.length > 0 && t >= 0 && jlr[0] > 0 && Math.abs(floatDiv(100 * (t - jlr[0]), jlr[0])) > 200)
                                enlog = true;
                    } 
                    if (!dislog && (t < 0 || jlr[0] < 0)) {
                        enlog = false;
                        dislog = true;
                    }

                    jlr[k].unshift(t);
                }
            }

            if (cq < 4) {
                for (let k = 3; k + 1 > cq; k--) 
                    jlr[k].push(null);
            }

            if (enlog)
                data.title += "-对数";
            data.categories = rya;
            data.legend = ["Q1净利润", "Q2净利润", "Q3净利润", "Q4净利润"
            ];
            data.series.push({type: "bar", name: "Q1净利润", data: jlr[0], barGap: 0});
            data.series.push({type: "bar", name: "Q2净利润", data: jlr[1]});
            data.series.push({type: "bar", name: "Q3净利润", data: jlr[2]});
            data.series.push({type: "bar", name: "Q4净利润", data: jlr[3]});

            this.initChart("c12", data.title, data.legend, data.categories, data.series, false, false, enlog);
        }
        catch (e) {
            //console.log(e);
            console.log(e);
            this.setData({w12: 0});
        }

        /////////////////////////////////////
        //c13: 归母净利润分季度增速
        try {
            data = {categories: [], series: [], legend:[], title: "归母净利润分季度增速(%)"};
            let jlr = [[], [], [], []];
            let enlog = false;
            let dislog = false;
            let lmax = 0;

            for (let k = 0; k < jlr.length; k++) {
                let j = cq - k - 1;
                let len = ylen;
                if (j < 0) {
                    j += 4;
                    len--;
                }

                for (let i = 0; i < len; i++, j += 4) {
                    if (j >= this.data.sheets[1].data.length || j + 4 + (cq > 1 ? 1 : 0) >= this.data.sheets[1].data.length)
                        break;

                    let t1 = cq > 1 ? 
                        (this.data.sheets[1].data[j].ps_031 ? this.data.sheets[1].data[j].ps_031 : 0) - 
                            (this.data.sheets[1].data[j + 1].ps_031 ? this.data.sheets[1].data[j + 1].ps_031 : 0) : 
                        (this.data.sheets[1].data[j].ps_031 ? this.data.sheets[1].data[j].ps_031 : 0);
                    let t2 = cq > 1 ? 
                        (this.data.sheets[1].data[j + 4].ps_031 ? this.data.sheets[1].data[j + 4].ps_031 : 0) - 
                            (this.data.sheets[1].data[j + 5].ps_031 ? this.data.sheets[1].data[j + 5].ps_031 : 0) : 
                        (this.data.sheets[1].data[j + 4].ps_031 ? this.data.sheets[1].data[j + 4].ps_031 : 0);
                    let t = 0;

                    t = floatDiv(100 * (t1 - t2), t2);

                    if (!enlog && !dislog) {
                        if (t >= 200)
                            enlog = true;
                        else if (t < 0)
                            dislog = true;
                    } 
                    if (!dislog && t < 0) {
                        enlog = false;
                        dislog = true;
                    }

                    jlr[k].unshift(t);
                    if (lmax < i + 1)
                        lmax = i + 1;
                }
            }

            if (cq < 4) {
                for (let k = 3; k + 1 > cq; k--) 
                    jlr[k].push(null);
            }

            if (enlog)
                data.title += "-对数";
            data.categories = rya.length > lmax ? rya.slice(rya.length - lmax) : rya;
            data.legend = ["Q1净利润增速", "Q2净利润增速", "Q3净利润增速", "Q4净利润增速"
            ];
            data.series.push({type: "bar", name: "Q1净利润增速", data: jlr[0], barGap: 0});
            data.series.push({type: "bar", name: "Q2净利润增速", data: jlr[1]});
            data.series.push({type: "bar", name: "Q3净利润增速", data: jlr[2]});
            data.series.push({type: "bar", name: "Q4净利润增速", data: jlr[3]});

            this.initChart("c13", data.title, data.legend, data.categories, data.series, false, false, enlog);
        }
        catch (e) {
            //console.log(e);
            console.log(e);
            this.setData({w13: 0});
        }

        /////////////////////////////////////
        //c14: 分季度营业收入
        try {
            data = {categories: [], series: [], legend:[], title: "分季度营业收入(元)"};
            let jlr = [[], [], [], []];
            let enlog = false;
            let dislog = false;

            for (let k = 0; k < jlr.length; k++) {
                let j = cq - k - 1;
                let len = ylen;
                if (j < 0) {
                    j += 4;
                    len--;
                }

                for (let i = 0; i < len; i++, j += 4) {
                    if (j >= this.data.sheets[1].data.length || (k > 0 && j + 1 >= this.data.sheets[1].data.length))
                        break;

                    let ps1 = this.data.sheets[1].data[j];
                    let ps2 = k > 0 ? this.data.sheets[1].data[j + 1] : null;
                    let t1 = 0, t2 = 0, t = 0;

                    t1 = ps1.ps_001 ? ps1.ps_001 : ps1.ps_002 ? ps1.ps_002 : 0;
                    t2 = (ps2 && ps2.ps_001) ? ps2.ps_001 : (ps2 && ps2.ps_002) ? ps2.ps_002 : 0;
                    t = k > 0 ? parseFloat((t1 - t2).toFixed(2)) : t1;

                    if (!enlog && !dislog) {
                        if (jlr.length > 0 && t >= 0 && jlr[0] > 0 && Math.abs(floatDiv(100 * (t - jlr[0]), jlr[0])) > 200)
                                enlog = true;
                    } 
                    if (!dislog && (t < 0 || jlr[0] < 0)) {
                        enlog = false;
                        dislog = true;
                    }

                    jlr[k].unshift(t);
                }
            }

            if (cq < 4) {
                for (let k = 3; k + 1 > cq; k--) 
                    jlr[k].push(null);
            }

            if (enlog)
                data.title += "-对数";
            data.categories = rya;
            data.legend = ["Q1营业收入", "Q2营业收入", "Q3营业收入", "Q4营业收入"
            ];
            data.series.push({type: "bar", name: "Q1营业收入", data: jlr[0], barGap: 0});
            data.series.push({type: "bar", name: "Q2营业收入", data: jlr[1]});
            data.series.push({type: "bar", name: "Q3营业收入", data: jlr[2]});
            data.series.push({type: "bar", name: "Q4营业收入", data: jlr[3]});

            this.initChart("c14", data.title, data.legend, data.categories, data.series, false, false, enlog);
        }
        catch (e) {
            //console.log(e);
            console.log(e);
            this.setData({w14: 0});
        }

        /////////////////////////////////////
        //c15: 营业收入分季度增速
        try {
            data = {categories: [], series: [], legend:[], title: "营业收入分季度增速(%)"};
            let jlr = [[], [], [], []];
            let enlog = false;
            let dislog = false;
            let ps = this.data.sheets[1];
            let lmax = 0;

            for (let k = 0; k < jlr.length; k++) {
                let j = cq - k - 1;
                let len = ylen;
                if (j < 0) {
                    j += 4;
                    len--;
                }

                for (let i = 0; i < len; i++, j += 4) {
                    if (j >= ps.data.length || j + 4 + (cq > 1 ? 1 : 0) >= ps.data.length)
                        break;

                    let t1 = cq > 1 ? 
                        (ps.data[j].ps_001 ? ps.data[j].ps_001 : ps.data[j].ps_002 ? ps.data[j].ps_002 : 0) - 
                            (ps.data[j + 1].ps_001 ? ps.data[j + 1].ps_001 : ps.data[j + 1].ps_002 ? ps.data[j + 1].ps_002 : 0) : 
                        (ps.data[j].ps_001 ? ps.data[j].ps_001 : ps.data[j].ps_002 ? ps.data[j].ps_002 : 0);
                    let t2 = cq > 1 ? 
                        (ps.data[j + 4].ps_001 ? ps.data[j + 4].ps_001 : ps.data[j + 4].ps_002 ? ps.data[j + 4].ps_002 : 0) - 
                            (ps.data[j + 5].ps_001 ? ps.data[j + 5].ps_001 : ps.data[j + 5].ps_002 ? ps.data[j + 5].ps_002 : 0) : 
                        (ps.data[j + 4].ps_001 ? ps.data[j + 4].ps_001 : ps.data[j + 4].ps_002 ? ps.data[j + 4].ps_002 : 0);
                    let t = 0;

                    t = floatDiv(100 * (t1 - t2), t2);

                    if (!enlog && !dislog) {
                        if (t >= 200)
                            enlog = true;
                        else if (t < 0)
                            dislog = true;
                    } 
                    if (!dislog && t < 0) {
                        enlog = false;
                        dislog = true;
                    }

                    jlr[k].unshift(t);
                    if (lmax < i + 1)
                        lmax = i + 1;
                }
            }

            if (cq < 4) {
                for (let k = 3; k + 1 > cq; k--) 
                    jlr[k].push(null);
            }

            if (enlog)
                data.title += "-对数";
            data.categories = rya.length > lmax ? rya.slice(rya.length - lmax) : rya;
            data.legend = ["Q1营业收入增速", "Q2营业收入增速", "Q3营业收入增速", "Q4营业收入增速"
            ];
            data.series.push({type: "bar", name: "Q1营业收入增速", data: jlr[0], barGap: 0});
            data.series.push({type: "bar", name: "Q2营业收入增速", data: jlr[1]});
            data.series.push({type: "bar", name: "Q3营业收入增速", data: jlr[2]});
            data.series.push({type: "bar", name: "Q4营业收入增速", data: jlr[3]});

            this.initChart("c15", data.title, data.legend, data.categories, data.series, false, false, enlog);
        }
        catch (e) {
            //console.log(e);
            console.log(e);
            this.setData({w15: 0});
        }

        /////////////////////////////////////
        //c16: ROE和ROA
        try {
            data = {categories: [], series: [], legend:[], title: "ROE和ROA"};
            let roe = [];
            let roa = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let bs = this.data.sheets[0].data[j];
                let ps = this.data.sheets[1].data[j];

                roe.unshift(floatDiv(100 * ps.ps_031, bs.bs_080));
                roa.unshift(floatDiv(100 * ps.ps_030, bs.bs_038));

                j += (i == 0 ? cq : 4);
            }

            if (cq == 4)
                data.categories = rya;
            else {
                let tya = ya.slice(0);
                tya[0] = tya[0] + "Q" + cq;
                data.categories = tya.reverse();
            }
            data.legend = ["ROE", "ROA"
            ];
            data.series.push({type: "line", name: "ROE", data: roe});
            data.series.push({type: "line", name: "ROA", data: roa});

            this.initChart("c16", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            console.log(e);
            this.setData({w16: 0});
        }

        /////////////////////////////////////
        //c17: 非经营性收入占净利润比
        try {
            data = {categories: [], series: [], legend:[], title: "非经营性收入占净利润比(%)"};
            let fjxx = [];

            for (let i = 0; i < qlen; i++) {
                let ps = this.data.sheets[1].data[i];
                let t = (ps.ps_020 ? ps.ps_020 : 0) +
                    (ps.ps_021 ? ps.ps_021 : 0) +
                    (ps.ps_025 ? ps.ps_025 : 0) -
                    (ps.ps_026 ? ps.ps_026 : 0) -
                    (ps.ps_019 ? ps.ps_019 : 0);

                fjxx.push(ps.ps_030 ? floatDiv(100 * t, ps.ps_030) : null);
            }

            data.categories = qa;
            data.legend = ["非经营性收入占比"
            ];
            data.series.push({type: "bar", name: "非经营性收入占比", data: fjxx});

            this.initChart("c17", data.title, data.legend, data.categories, data.series);
        }
        catch (e) {
            console.log(e);
            this.setData({w17: 0});
        }

        /////////////////////////////////////
        //c18: 销售、管理、财务和研发费用占收入比
        try {
            data = {categories: [], series: [], legend:[], title: "销售、管理、财务和研发费用占收入比(%)"};
            let ps016 = [];
            let ps017 = [];
            let ps018 = [];
            let ps015 = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let ps = this.data.sheets[1].data[j];
                let t = ps.ps_001 ? ps.ps_001 : ps.ps_002 ? ps.ps_002 : 0;

                ps016.unshift(ps.ps_016 && t != 0 ? floatDiv(100 * ps.ps_016, t) : null);
                ps017.unshift(ps.ps_017 && t != 0 ? floatDiv(100 * ps.ps_017, t) : null);
                ps018.unshift(ps.ps_018 && t != 0 ? floatDiv(100 * ps.ps_018, t) : null);
                ps015.unshift(ps.ps_015 && t != 0 ? floatDiv(100 * ps.ps_015, t) : null);
                    
                //
                j += (i == 0 ? cq : 4);
            }

            data.categories = rya;
            data.legend = ["销售费用占比", "管理费用占比", "财务费用占比", "研发费用占比" 
            ];
            data.series.push({type: "bar", stack: "total", name: "销售费用占比", data: ps016});
            data.series.push({type: "bar", stack: "total", name: "管理费用占比", data: ps017});
            data.series.push({type: "bar", stack: "total", name: "财务费用占比", data: ps018});
            data.series.push({type: "bar", stack: "total", name: "研发费用占比", data: ps015});

            this.initChart("c18", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            console.log(e);
            this.setData({w18: 0});
        }

        /////////////////////////////////////
        //c19: 净利率和毛利率
        try {
            data = {categories: [], series: [], legend:[], title: "净利率和毛利率(%)"};
            let mlv = [];
            let jlv = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let ps = this.data.sheets[1].data[j];

                mlv.unshift(ps.ps_002 !== undefined && ps.ps_007 !== undefined ? floatDiv(100 * (ps.ps_002 - ps.ps_007), ps.ps_002) : null);
                jlv.unshift(ps.ps_030 !== undefined && ps.ps_001 !== undefined ? floatDiv(100 * ps.ps_030, ps.ps_001) : null);

                j += (i == 0 ? cq : 4);
            }

            if (cq == 4)
                data.categories = rya;
            else {
                let tya = ya.slice(0);
                tya[0] = tya[0] + "Q" + cq;
                data.categories = tya.reverse();
            }
            data.legend = ["毛利率", "净利率"
            ];
            data.series.push({type: "line", name: "毛利率", data: mlv});
            data.series.push({type: "line", name: "净利率", data: jlv});

            this.initChart("c19", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            console.log(e);
            this.setData({w19: 0});
        }

        /////////////////////////////////////
        //c20: 现金流
        try {
            data = {categories: [], series: [], legend:[], title: "现金流(元)"};
            let jy = [];
            let tz = [];
            let rz = [];
            let zy = [];
            let jlr = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let ps = this.data.sheets[1].data[j];
                let cf = this.data.sheets[2].data[j];

                jy.unshift(cf.cf_026 ? cf.cf_026 : 0);
                tz.unshift(cf.cf_042 ? cf.cf_042 : 0);
                rz.unshift(cf.cf_055 ? cf.cf_055 : 0);
                zy.unshift((cf.cf_026 ? cf.cf_026 : 0) + (cf.cf_042 ? cf.cf_042 : 0));
                jlr.unshift(ps.ps_030 ? ps.ps_030 : 0);
                j += (i == 0 ? cq : 4);
            }

            if (cq != 4) {
                let tl = rya[rya.length - 1] + "Q" + cq;
                data.categories = rya.slice(0, rya.length - 1);
                data.categories.push(tl);
            } else 
                data.categories = rya;
            //data.categories = cq == 4 ? rya : rya.slice(0, rya.length - 1);
            data.legend = ["净利润", "经营现金流", "投资现金流", "融资现金流", "自由现金流"
            ];
            data.series.push({type: "bar", name: "净利润", data: jlr, barGap: 0});
            data.series.push({type: "bar", name: "经营现金流", data: jy});
            data.series.push({type: "bar", name: "投资现金流", data: tz});
            data.series.push({type: "bar", name: "融资现金流", data: rz});
            data.series.push({type: "bar", name: "自由现金流", data: zy});

            this.initChart("c20", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            console.log(e);
            this.setData({w20: 0});
        }

        return null;
    }
});