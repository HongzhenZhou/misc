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
    "c20": undefined, //20
    "c21": undefined,
    "c22": undefined,
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
        isbank: false,
        os: 'android',
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
        ec21: {lazyLoad: true},
        ec22: {lazyLoad: true},

        isLoaded: false,
        isDisposed: false,

        sid: "",
        name: "",
        sheets: [],
        total: 0,
        rpt: "",

        wid: 0,
        pindex: 0,
        parray: [
            "总资产和股东权益", //1
            "往年流动资产各项占比",
            "近期流动资产按季度各项占比",
            "往年负债结构分析",
            "按季度近期负债结构分析",
            "资产负债率和有息负债率", //6
            "流动资产及负债占比",
            "流动比率和速动比率",
            "商誉、无形、油气、生物资产",
            "年营业收入和归母净利润",
            "营收和归母净利润年增速", //11
            "归母分季度净利润",
            "归母净利润分季度增速",
            "分季度营业收入",
            "营业收入分季度增速",
            "ROE和ROA", //16
            "非经营性收入占净利润比", 
            "各项费用占收入比",
            "净利率和毛利率",
            "现金流", //20
            "应收款和存货周转天数",
            "eps增速",
        ],
        pbank: [
            "风险加权资产收益率RORWA", //1
            "净息差",
            "拨备覆盖率",
            "不良贷款率",
            "资本充足率", //5
            "非息净收入占比", 
            "归母分季度净利润",
            "归母净利润分季度增速",
            "分季度营业收入",
            "营业收入分季度增速", //10
            "年营业收入和归母净利润",
            "营收和归母净利润年增速", 
            "拨备前净利润增速", 
            "减值损失增速",
            "非息收入增速", //15
            "业务及管理费增速",
            "往年各项资产各项占比",
            "近期各项资产按季度占比",
            "往年负债结构分析",
            "按季度近期负债结构分析", //20
            "存贷比",
            "eps增速",
        ],

    },

    initChart(cid, title, legend, categories, series, rev = true, y2 = false, enlog = false) {
        let mychart = this.selectComponent("#" + cid);

        mychart.init((canvas, width, height, dpr) => {
            let chart = undefined;

            if (charts[cid] === undefined) {
                //console.log("init " + cid)
                chart = echarts.init(canvas, null, {
                    width: width,
                    height: height,
                    devicePixelRatio: dpr 
                });
            } else {
                //console.log("reuse " + cid)
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
                    //boundaryGap: false,
                    boundaryGap: ["1%", "1%"],
                    data: categories,
                    axisLine: {
                        show: true,
                    },
                    axisTick: {
                        show: true,
                    },
                    axisLabel: {
                        fontSize: 9,
                    },
                    nameTextStyle: {
                        fontSize: 9,
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
                //console.log("dispose")
                charts[c].dispose();
                charts[c] = undefined;
            }
        } 
        this.setData({isDisposed: true});
    },

    onLoad: function (options) {
        let sheets = JSON.parse(options.sheets).sheets;
        let isbank = options.isbank == "true" ? true : false;
        delete options.isbank;
        delete options.sheets;
        this.setData({sheets, isbank, ...options});
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
            w21: this.data.w,
            w22: this.data.w,
        })
    },
        
    changePic(e) {
        const v = parseInt(e.detail.value, 10);
        
        if (this.data.pindex != v) {
            this.setData({pindex: v, wid: v + 1});
            this.data.isbank ? this.initBank() : this.init();
        }
      },

    initBank: function () {
        if (!this.data.isLoaded) 
            this.setData({isLoaded: true,});

        let wid = this.data.wid;
        
        if (this.data.os == "ios" && wid == 0)
            wid = 1;
    
        if (wid == 0)
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

        ///////////////////////////////
        //c1: 风险加权资产收益率RORWA
        if (wid == 0 || wid == 1) {
            try {
                data = {categories: [], series: [], legend:[], title: "风险加权资产收益率RORWA(%)"};
                let rorwa = [];
    
                for (let i = 0, j = 0; i < ylen; i++) {
                    let ps = this.data.sheets[1].data[j];
                    let bk = this.data.sheets[2].data[j];
                    //console.log(`${ps.ps_031}  ${bk.bk_013}`);
                    rorwa.unshift(bk.bk_013 ? floatDiv(100 * (ps.ps_031 ? ps.ps_031 : 0), bk.bk_013) : null);
                    
                    j += (i == 0 ? cq : 4);
                }
    
                if (cq != 4) {
                    let tl = rya[rya.length - 1] + "Q" + cq;
                    data.categories = rya.slice(0, rya.length - 1);
                    data.categories.push(tl);
                } else 
                    data.categories = rya;
                data.legend = ["RORWA"];
                data.series.push({type: "line", name: "RORWA", data: rorwa});
                this.initChart("c1", data.title, data.legend, data.categories, data.series, false);
            }
            catch (e) {
                //console.log(e);
                this.setData({w1: 0});
            }
        }

        /////////////////////////////////////
        //c2: 净息差
        if (wid == 0 || wid == 2) {
            try {
                data = {categories: [], series: [], legend:[], title: "净息差(%)"};
                let jxc = [[], [], [], []];
    
                for (let k = jxc.length - 1; k >= 0; k--) {
                    let i = 0;
                    let j = cq - k - 1;
                    let len = ylen;
                    if (j < 0) {
                        j += 4;
                        jxc[k].unshift(null);
                        i = 1;
                    }
    
                    for (; i < len; i++, j += 4) {
                        if (j >= this.data.sheets[2].data.length) {
                            jxc[k].unshift(null);
                            break;
                        } 
    
                        if (j + 1 == this.data.sheets[2].data.length && k > 0) {
                            jxc[k].unshift(null);
                            break;
                        }
    
                        let bk1 = this.data.sheets[2].data[j];
                        let ps1 = this.data.sheets[1].data[j];
                        let bk2 = k > 0 ? this.data.sheets[2].data[j + 1] : null;
                        let ps2 = k > 0 ? this.data.sheets[1].data[j + 1] : null;
                        let tb1 = 0, tb2 = 0, tb = 0, tp1 = 0, tp2 = 0, tp = 0, t = 0;
                        let tq = this.data.sheets[0].ym[j] % 10;
                        let ty = (this.data.sheets[0].ym[j] - tq) / 10;
                        let ds = 0; k == 3 ? 365 : k == 2 ? 273 : k == 1 ? 181 : 90;
                        let lds = 0; k == 3 ? 273 : k == 2 ? 181 : k == 1 ? 90 : 0;
                        if ((ty % 4 == 0 && ty % 100 != 0) || (ty % 400 == 0)) {
                            ds = k == 3 ? 366 : k == 2 ? 274 : k == 1 ? 182 : 91;
                            lds = k == 3 ? 274 : k == 2 ? 182 : k == 1 ? 91 : 0;
                        } else {
                            ds = k == 3 ? 365 : k == 2 ? 273 : k == 1 ? 181 : 90;
                            lds = k == 3 ? 273 : k == 2 ? 181 : k == 1 ? 90 : 0;
                        }
    
                        tp1 = ps1.ps_003 ? ps1.ps_003 : 0;
                        tp2 = (ps2 && ps2.ps_003) ? ps2.ps_003 : 0;
                        tp = k > 0 ? (tp1 - tp2) : tp1;

                        tb1 = bk1.bk_017 ? bk1.bk_017 : 0;
                        tb2 = (bk2 && bk2.bk_017) ? bk2.bk_017 : 0;
                        if (k > 0) {
                            t = floatDiv(4 * tp, floatDiv(ds * floatDiv(4 * tp1, (k + 1) * tb1) - lds * floatDiv(4 * tp2, k * tb2), ds - lds));
                            if (t > 10) { 
                                if (tb2 < 1.9 && tb1 >= 1.9) {
                                    //console.log(tb1 + " " + tb2 + " " + t);
                                    t = floatDiv(bk2.bk_017 * 4, k);
                                    if (t < 5) {
                                        bk2.bk_017 = t;
                                        tb2 = bk2.bk_017;
                                    }
                                    //console.log(tb1 + " " + tb2);
                                } else if (tb1 < 1.9 && tb2 >= 1.9) {
                                    //console.log(tb1 + " " + tb2 + " " + t);
                                    t = floatDiv(bk1.bk_017 * 4, k + 1);
                                    if (t < 5) {
                                        bk1.bk_017 = t;
                                        tb1 = bk1.bk_017;
                                    }
                                    //console.log(tb1 + " " + tb2);
                                }
                            }
                        }
                        tb = k > 0 ? floatDiv(ds * floatDiv(4 * tp1, (k + 1) * tb1) - lds * floatDiv(4 * tp2, k * tb2), ds - lds) : floatDiv(4 * tp1, tb1);
                        //console.log(`${ty}-Q${tq}[${i}]: (${floatDiv(4 * tp1, (k+1)*tb1)}, ${floatDiv(4 * tp2, k*tb2)})  ${tb} ${tp}`)
    
                        jxc[k].unshift(floatDiv(4 * tp, tb));
                    }
                }
    
                data.categories = rya;
                data.legend = ["Q1净息差", "Q2净息差", "Q3净息差", "Q4净息差"
                ];
                data.series.push({type: "bar", name: "Q1净息差", data: jxc[0], barGap: 0});
                data.series.push({type: "bar", name: "Q2净息差", data: jxc[1]});
                data.series.push({type: "bar", name: "Q3净息差", data: jxc[2]});
                data.series.push({type: "bar", name: "Q4净息差", data: jxc[3]});
    
                this.initChart(wid == 0 ? "c2" : "c1", data.title, data.legend, data.categories, data.series, false);
            }
            catch (e) {
                //console.log(e);
                this.setData({w2: 0});
            }
        }

        ///////////////////////////////
        //c3: 拨备覆盖率
        if (wid == 0 || wid == 3) {
            try {
                data = {categories: [], series: [], legend:[], title: "拨备覆盖率(%)"};
                let rorwa = [];
    
                for (let i = 0, j = 0; i < ylen; i++) {
                    let bk = this.data.sheets[2].data[j];
                    rorwa.unshift(bk.bk_003 ? parseFloat(bk.bk_003).toFixed(2) : null);
                    
                    j += (i == 0 ? cq : 4);
                }
    
                if (cq != 4) {
                    let tl = rya[rya.length - 1] + "Q" + cq;
                    data.categories = rya.slice(0, rya.length - 1);
                    data.categories.push(tl);
                } else 
                    data.categories = rya;
                data.legend = ["拨备覆盖率"];
                data.series.push({type: "line", name: "拨备覆盖率", data: rorwa});
                this.initChart(wid == 0 ? "c3" : "c1", data.title, data.legend, data.categories, data.series, false);
            }
            catch (e) {
                //console.log(e);
                this.setData({w3: 0});
            }
        }

        ///////////////////////////////
        //c4: 不良贷款率
        if (wid == 0 || wid == 4) {
            try {
                data = {categories: [], series: [], legend:[], title: "不良贷款率(%)"};
                let rorwa = [];
    
                for (let i = 0, j = 0; i < ylen; i++) {
                    let bk = this.data.sheets[2].data[j];
                    rorwa.unshift(bk.bk_008 ? parseFloat(bk.bk_008).toFixed(2) : null);
                    
                    j += (i == 0 ? cq : 4);
                }
    
                if (cq != 4) {
                    let tl = rya[rya.length - 1] + "Q" + cq;
                    data.categories = rya.slice(0, rya.length - 1);
                    data.categories.push(tl);
                } else 
                    data.categories = rya;
                data.legend = ["不良贷款率"];
                data.series.push({type: "line", name: "不良贷款率", data: rorwa});
                this.initChart(wid == 0 ? "c4" : "c1", data.title, data.legend, data.categories, data.series, false);
            }
            catch (e) {
                //console.log(e);
                this.setData({w4: 0});
            }
        }

        ///////////////////////////////
        //c5: 资本充足率
        if (wid == 0 || wid == 5) {
            try {
                data = {categories: [], series: [], legend:[], title: "资本充足率(%)"};
                let rorwa = [];
    
                for (let i = 0, j = 0; i < ylen; i++) {
                    let bk = this.data.sheets[2].data[j];
                    rorwa.unshift(bk.bk_001 ? parseFloat(bk.bk_001).toFixed(2) : bk.bk_002 ? parseFloat(bk.bk_002).toFixed(2) : null);
                    
                    j += (i == 0 ? cq : 4);
                }
    
                if (cq != 4) {
                    let tl = rya[rya.length - 1] + "Q" + cq;
                    data.categories = rya.slice(0, rya.length - 1);
                    data.categories.push(tl);
                } else 
                    data.categories = rya;
                data.legend = ["资本充足率"];
                data.series.push({type: "line", name: "资本充足率", data: rorwa});
                this.initChart(wid == 0 ? "c5" : "c1", data.title, data.legend, data.categories, data.series, false);
            }
            catch (e) {
                //console.log(e);
                this.setData({w5: 0});
            }
        }

        /////////////////////////////////////
        //c6: 非息收入占比
        if (wid == 6 || wid == 0) {
            try {
                data = {categories: [], series: [], legend:[], title: "非息收入占比(%)"};
                let sxf = [];
                let fx = [];
    
                for (let i = 0, j = 0; i < ylen; i++) {
                    let ps = this.data.sheets[1].data[j];
                    let bk = this.data.sheets[2].data[j];
    
                    sxf.unshift(ps.ps_001 !== undefined && ps.ps_043 !== undefined ? floatDiv(100 * ps.ps_043, ps.ps_001) : null);
                    fx.unshift(bk.bk_016 ? parseFloat(bk.bk_016).toFixed(2) : null);
    
                    j += (i == 0 ? cq : 4);
                }
    
                if (cq == 4)
                    data.categories = rya;
                else {
                    let tya = ya.slice(0);
                    tya[0] = tya[0] + "Q" + cq;
                    data.categories = tya.reverse();
                }
                data.legend = ["手续费及佣金净收入占比", "非息收入占比"
                ];
                data.series.push({type: "line", name: "手续费及佣金净收入占比", data: sxf});
                data.series.push({type: "line", name: "非息收入占比", data: fx});
    
                this.initChart(wid == 0 ? "c6" : "c1", data.title, data.legend, data.categories, data.series, false, false);
            }
            catch (e) {
                //console.log(e);
                this.setData({w6: 0});
            }
        }

        /////////////////////////////////////
        //c7: 归母分季度净利润
        if (wid == 0 || wid == 7) {
            try {
                data = {categories: [], series: [], legend:[], title: "归母分季度净利润(元)"};
                let jlr = [[], [], [], []];
                let enlog = false;
                let dislog = false;
    
                for (let k = jlr.length - 1; k >= 0; k--) {
                    let i = 0;
                    let j = cq - k - 1;
                    let len = ylen;
                    if (j < 0) {
                        j += 4;
                        jlr[k].unshift(null);
                        i = 1;
                    }
    
                    for (; i < len; i++, j += 4) {
                        if (j >= this.data.sheets[1].data.length) {
                            jlr[k].unshift(null);
                            break;
                        } 
    
                        if (j + 1 == this.data.sheets[1].data.length && k > 0) {
                            jlr[k].unshift(null);
                            break;
                        }
    
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
    
                /*
                if (cq < 4) {
                    for (let k = 3; k + 1 > cq; k--) 
                        jlr[k].push(null);
                }
                */
    
                if (enlog)
                    data.title += "-对数";
                data.categories = rya;
                data.legend = ["Q1净利润", "Q2净利润", "Q3净利润", "Q4净利润"
                ];
                data.series.push({type: "bar", name: "Q1净利润", data: jlr[0], barGap: 0});
                data.series.push({type: "bar", name: "Q2净利润", data: jlr[1]});
                data.series.push({type: "bar", name: "Q3净利润", data: jlr[2]});
                data.series.push({type: "bar", name: "Q4净利润", data: jlr[3]});
    
                this.initChart(wid == 0 ? "c7" : "c1", data.title, data.legend, data.categories, data.series, false, false, enlog);
            }
            catch (e) {
                //console.log(e);
                this.setData({w7: 0});
            }
        }
    
        /////////////////////////////////////
        //c8: 归母净利润分季度增速
        if (wid == 8 || wid == 0) {
            try {
                data = {categories: [], series: [], legend:[], title: "归母净利润分季度增速(%)"};
                let jlr = [[], [], [], []];
                let enlog = false;
                let dislog = false;
                let lmax = 0;
    
                for (let k = jlr.length - 1; k >= 0; k--) {
                    let i = 0;
                    let j = cq - k - 1;
                    let len = ylen;
                    if (j < 0) {
                        j += 4;
                        jlr[k].unshift(null);
                        i = 1;
                    }
    
                    for (; i < len; i++, j += 4) {
                        if (j >= this.data.sheets[1].data.length) {
                            jlr[k].unshift(null);
                            break;
                        } 
    
                        if (j + 4 + (cq > 1 ? 1 : 0) >= this.data.sheets[1].data.length) {
                            jlr[k].unshift(null);
                            break;
                        }
    
                        let t1 = k > 0 ? 
                            (this.data.sheets[1].data[j].ps_031 ? this.data.sheets[1].data[j].ps_031 : 0) - 
                                (this.data.sheets[1].data[j + 1].ps_031 ? this.data.sheets[1].data[j + 1].ps_031 : 0) : 
                            (this.data.sheets[1].data[j].ps_031 ? this.data.sheets[1].data[j].ps_031 : 0);
                        let t2 = k > 0 ? 
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
    
                for (let k = 0; k < jlr.length; k++) {
                    if (jlr[k].length > lmax) 
                        jlr[k] = jlr[k].slice(jlr[k].length - lmax);
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
    
                this.initChart(wid == 0 ? "c8" : "c1", data.title, data.legend, data.categories, data.series, false, false, enlog);
            }
            catch (e) {
                //console.log(e);
                this.setData({w8: 0});
            }
        }
    
        /////////////////////////////////////
        //c9: 分季度营业收入
        if (wid == 0 || wid == 9) {
            try {
                data = {categories: [], series: [], legend:[], title: "分季度营业收入(元)"};
                let jlr = [[], [], [], []];
                let enlog = false;
                let dislog = false;
    
                for (let k = jlr.length - 1; k >= 0; k--) {
                    let j = cq - k - 1;
                    let i = 0;
                    let len = ylen;
                    if (j < 0) {
                        j += 4;
                        jlr[k].unshift(null);
                        i = 1;
                    }
    
                    for (; i < len; i++, j += 4) {
                        if (j >= this.data.sheets[1].data.length) {
                            jlr[k].unshift(null);
                            break;
                        } 
    
                        if (j + 1 == this.data.sheets[1].data.length && k > 0) {
                            jlr[k].unshift(null);
                            break;
                        }
    
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
    
                /*
                if (cq < 4) {
                    for (let k = 3; k + 1 > cq; k--) 
                        jlr[k].push(null);
                }
                */
    
                if (enlog)
                    data.title += "-对数";
                data.categories = rya;
                data.legend = ["Q1营业收入", "Q2营业收入", "Q3营业收入", "Q4营业收入"
                ];
                data.series.push({type: "bar", name: "Q1营业收入", data: jlr[0], barGap: 0});
                data.series.push({type: "bar", name: "Q2营业收入", data: jlr[1]});
                data.series.push({type: "bar", name: "Q3营业收入", data: jlr[2]});
                data.series.push({type: "bar", name: "Q4营业收入", data: jlr[3]});
    
                this.initChart(wid == 0 ? "c9" : "c1", data.title, data.legend, data.categories, data.series, false, false, enlog);
            }
            catch (e) {
                //console.log(e);
                this.setData({w9: 0});
            }
        }
    
        /////////////////////////////////////
        //c10: 营业收入分季度增速
        if (wid == 10 || wid == 0) {
            try {
                data = {categories: [], series: [], legend:[], title: "营业收入分季度增速(%)"};
                let jlr = [[], [], [], []];
                let enlog = false;
                let dislog = false;
                let ps = this.data.sheets[1];
                let lmax = 0;
    
                for (let k = jlr.length - 1; k >= 0; k--) {
                    let i = 0;
                    let j = cq - k - 1;
                    let len = ylen;
                    if (j < 0) {
                        j += 4;
                        jlr[k].unshift(null);
                        i = 1;
                    }
    
                    for (; i < len; i++, j += 4) {
                        if (j >= ps.data.length) {
                            jlr[k].unshift(null);
                            break;
                        } 
    
                        if (j + 4 + (cq > 1 ? 1 : 0) >= ps.data.length) {
                            jlr[k].unshift(null);
                            break;
                        }
    
                        let t1 = k > 0 ? 
                            (ps.data[j].ps_001 ? ps.data[j].ps_001 : ps.data[j].ps_002 ? ps.data[j].ps_002 : 0) - 
                                (ps.data[j + 1].ps_001 ? ps.data[j + 1].ps_001 : ps.data[j + 1].ps_002 ? ps.data[j + 1].ps_002 : 0) : 
                            (ps.data[j].ps_001 ? ps.data[j].ps_001 : ps.data[j].ps_002 ? ps.data[j].ps_002 : 0);
                        let t2 = k > 0 ? 
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
    
                for (let k = 0; k < jlr.length; k++) {
                    if (jlr[k].length > lmax) 
                        jlr[k] = jlr[k].slice(jlr[k].length - lmax);
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
    
                this.initChart(wid == 0 ? "c10" : "c1", data.title, data.legend, data.categories, data.series, false, false, enlog);
            }
            catch (e) {
                //console.log(e);
                this.setData({w10: 0});
            }
        }

        /////////////////////////////////////
        //c11: 年营业收入和归母净利润(元)
        if (wid == 0 || wid == 11) {
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
                if (cq == 4)
                    data.categories = rya;
                else {
                    let tya = ya.slice(0);
                    tya[0] = tya[0] + "Q" + cq;
                    data.categories = tya.reverse();
                }
                data.legend = ["营业收入", "净利润"
                ];
                data.series.push({type: "line", name: "营业收入", data: sr});
                data.series.push({yAxisIndex:1, type: "line", name: "净利润", data: jlr});
    
                this.initChart(wid == 0 ? "c11" : "c1", data.title, data.legend, data.categories, data.series, false, true, enlog);
            }
            catch (e) {
                //console.log(e);
                this.setData({w11: 0});
            }
        }
            
        /////////////////////////////////////
        //c12: 营业收入和归母净利润年增速
        if (wid == 0 || wid == 12) {
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
    
                this.initChart(wid == 0 ? "c12" : "c1", data.title, data.legend, data.categories, data.series, false, false, enlog);
            }
            catch (e) {
                //console.log(e);
                this.setData({w12: 0});
            }
        }

        /////////////////////////////////////
        //c13: 拨备前净利润增速
        if (wid == 0 || wid == 13) {
            try {
                data = {categories: [], series: [], legend:[], title: "拨备前净利润增速(%)"};
                let jlr = [];
    
                for (let i = 0, j = 0; i < ylen; i++) {
                    if (j + 4 >= this.data.sheets[1].data.length)
                        break;
    
                    let ps1 = this.data.sheets[1].data[j];
                    let ps2 = this.data.sheets[1].data[j + 4];
                    let t1 = 0, t2 = 0, t = 0;
    
                    //console.log(`${ps1.ps_040}, ${ps1.ps_019} - ${ps2.ps_040}, ${ps2.ps_019}`)
                    t1 = (ps1.ps_031 ? ps1.ps_031 : 0) + (ps1.ps_040 ? ps1.ps_040 : 0) + (ps1.ps_019 ? ps1.ps_019 : 0);
                    t2 = (ps2.ps_031 ? ps2.ps_031 : 0) + (ps2.ps_040 ? ps2.ps_040 : 0) + (ps2.ps_019 ? ps2.ps_019 : 0);
                    t = floatDiv(100 * (t1 - t2), t2);
    
                    jlr.unshift(t);
                    j += (i == 0 ? cq : 4);
                }
    
                if (cq == 4)
                    data.categories = rya;
                else {
                    let tya = ya.slice(0);
                    tya[0] = tya[0] + "Q" + cq;
                    data.categories = tya.reverse();
                }
                data.legend = ["拨备前净利润增速"
                ];
                data.series.push({type: "bar", name: "拨备前净利润增速", data: jlr});
    
                this.initChart(wid == 0 ? "c13" : "c1", data.title, data.legend, data.categories, data.series, false);
            }
            catch (e) {
                //console.log(e);
                this.setData({w13: 0});
            }
        }

        /////////////////////////////////////
        //c14: 减值损失增速
        if (wid == 0 || wid == 14) {
            try {
                data = {categories: [], series: [], legend:[], title: "减值损失增速(%)"};
                let jlr = [];
                let enlog = false;
                let dislog = false;
    
                for (let i = 0, j = 0; i < ylen; i++) {
                    if (j + 4 >= this.data.sheets[1].data.length)
                        break;
    
                    let ps1 = this.data.sheets[1].data[j];
                    let ps2 = this.data.sheets[1].data[j + 4];
                    let t1 = 0, t2 = 0, t = 0;
    
                    //console.log(`${ps1.ps_040}, ${ps1.ps_019} - ${ps2.ps_040}, ${ps2.ps_019}`)
                    t1 = (ps1.ps_040 ? ps1.ps_040 : 0) + (ps1.ps_019 ? ps1.ps_019 : 0);
                    t2 = (ps2.ps_040 ? ps2.ps_040 : 0) + (ps2.ps_019 ? ps2.ps_019 : 0);
                    t = floatDiv(100 * (t1 - t2), t2);
                    if (!enlog && !dislog) {
                        if (t >= 200)
                            enlog = true;
                        else if (t < 0)
                            dislog = true;
                    } else if (!dislog) {
                        if (t < 0) {
                            enlog = false;
                            dislog = true;
                        }
                    }
    
                    jlr.unshift(t);
                    j += (i == 0 ? cq : 4);
                }
    
                if (cq == 4)
                    data.categories = rya;
                else {
                    let tya = ya.slice(0);
                    tya[0] = tya[0] + "Q" + cq;
                    data.categories = tya.reverse();
                }
                data.legend = ["减值损失增速"
                ];
                if (enlog)
                    data.title += "-对数";
                data.series.push({type: "bar", name: "减值损失增速", data: jlr});
    
                this.initChart(wid == 0 ? "c14" : "c1", data.title, data.legend, data.categories, data.series, false, false, enlog);
            }
            catch (e) {
                //console.log(e);
                this.setData({w14: 0});
            }
        }

        /////////////////////////////////////
        //c15: 非息收入增速
        if (wid == 15 || wid == 0) {
            try {
                data = {categories: [], series: [], legend:[], title: "非息收入增速(%)"};
                let sxf = [];
                let fx = [];
    
                for (let i = 0, j = 0; i < ylen; i++) {
                    if (j + 4 >= this.data.sheets[1].data.length)
                        break;

                    let ps1 = this.data.sheets[1].data[j];
                    let bk1 = this.data.sheets[2].data[j];
                    let ps2 = this.data.sheets[1].data[j + 4];
                    let bk2 = this.data.sheets[2].data[j + 4];
                    let t1 = 0, t2 = 0, t = 0;
    
                    t1 = (ps1.ps_043 ? ps1.ps_043 : 0);
                    t2 = (ps2.ps_043 ? ps2.ps_043 : 0);
                    t = ps2.ps_043 ? floatDiv(100 * (t1 - t2), t2) : null;
                    sxf.unshift(t);
                    t1 = (bk1.bk_015 ? bk1.bk_015 : 0);
                    t2 = (bk2.bk_015 ? bk2.bk_015 : 0);
                    t = bk2.bk_015 ? floatDiv(100 * (t1 - t2), t2) : null;
                    fx.unshift(t);
    
                    j += (i == 0 ? cq : 4);
                }
    
                if (cq == 4)
                    data.categories = rya;
                else {
                    let tya = ya.slice(0);
                    tya[0] = tya[0] + "Q" + cq;
                    data.categories = tya.reverse();
                }
                data.legend = ["手续费及佣金净收入增速", "非息收入增速"
                ];
                data.series.push({type: "bar", name: "手续费及佣金净收入增速", data: sxf, barGap: 0});
                data.series.push({type: "bar", name: "非息收入增速", data: fx});
    
                this.initChart(wid == 0 ? "c15" : "c1", data.title, data.legend, data.categories, data.series, false, false);
            }
            catch (e) {
                //console.log(e);
                this.setData({w15: 0});
            }
        }

        /////////////////////////////////////
        //c16: 业务及管理费增速
        if (wid == 16 || wid == 0) {
            try {
                data = {categories: [], series: [], legend:[], title: "业务及管理费增速(%)"};
                let sxf = [];
    
                for (let i = 0, j = 0; i < ylen; i++) {
                    if (j + 4 >= this.data.sheets[1].data.length)
                        break;

                    let ps1 = this.data.sheets[1].data[j];
                    let ps2 = this.data.sheets[1].data[j + 4];
                    let t1 = 0, t2 = 0, t = 0;
    
                    t1 = (ps1.ps_007 ? ps1.ps_007 : 0);
                    t2 = (ps2.ps_007 ? ps2.ps_007 : 0);
                    t = ps2.ps_007 ? floatDiv(100 * (t1 - t2), t2) : null;
                    sxf.unshift(t);
    
                    j += (i == 0 ? cq : 4);
                }
    
                if (cq == 4)
                    data.categories = rya;
                else {
                    let tya = ya.slice(0);
                    tya[0] = tya[0] + "Q" + cq;
                    data.categories = tya.reverse();
                }
                data.legend = ["业务及管理费增速"
                ];
                data.series.push({type: "bar", name: "业务及管理费增速", data: sxf});
    
                this.initChart(wid == 0 ? "c16" : "c1", data.title, data.legend, data.categories, data.series, false, false);
            }
            catch (e) {
                //console.log(e);
                this.setData({w16: 0});
            }
        }

        /////////////////////////////////////
        //c17: 往年各项资产占比
        if (wid == 0 || wid == 17) {
            try {
                data = {categories: [], series: [], legend:[], title: "往年各项资产占比(元)"};
                let bs093 = [];
                let bs094 = [];
                let bs019 = [];
                let bs003 = [];
                let bs004 = [];
                let bs086 = [];
                let bs014 = [];
                let bs033 = [];
                let bs095 = [];
                let bs011 = [];
                let qtzc = [];
    
                for (let i = 0, j = 0; i < ylen; i++) {
                    let bs = this.data.sheets[0].data[j];
    
                    bs093.unshift(bs.bs_093 ? bs.bs_093 : 0);
                    bs094.unshift(bs.bs_094 ? bs.bs_094 : 0);
                    bs019.unshift(bs.bs_019 ? bs.bs_019 : 0);
                    bs003.unshift(bs.bs_003 ? bs.bs_003 : 0);
                    bs004.unshift(bs.bs_004 ? bs.bs_004 : 0);
                    bs086.unshift(bs.bs_086 ? bs.bs_086 : 0);
                    bs014.unshift(bs.bs_014 ? bs.bs_014 : 0);
                    bs033.unshift(bs.bs_033 ? bs.bs_033 : 0);
                    bs095.unshift(bs.bs_095 ? bs.bs_095 : 0);
                    bs011.unshift(bs.bs_011 ? bs.bs_011 : 0);
    
                    if (bs.bs_038) {
                        let t = bs.bs_038 -
                            (bs.bs_093 ? bs.bs_093 : 0) -
                            (bs.bs_094 ? bs.bs_094 : 0) -
                            (bs.bs_019 ? bs.bs_019 : 0) -
                            (bs.bs_003 ? bs.bs_003 : 0) -
                            (bs.bs_004 ? bs.bs_004 : 0) -
                            (bs.bs_086 ? bs.bs_086 : 0) -
                            (bs.bs_014 ? bs.bs_014 : 0) -
                            (bs.bs_033 ? bs.bs_033 : 0) -
                            (bs.bs_095 ? bs.bs_095 : 0) -
                            (bs.bs_011 ? bs.bs_011 : 0);
                        t = Math.round((t + Number.EPSILON) * 100) / 100
                        qtzc.unshift(t > 0 ? t : 0);
                    } else 
                        qtzc.unshift(0);
                        
                    //
                    j += (i == 0 ? cq : 4);
                }
    
                data.categories = rya;
                data.legend = ["现金及存放央行款项",  "同业存款", "发放贷款和垫款", "拆出资金",  
                    "交易性金融资产", "衍生金融资产", "买入返售金融资产", "商誉", "贵金属", "应收利息", "其他资产"
                ];
                data.series.push({type: "bar", stack: "total", name: "现金及存放央行款项", data: bs093});
                data.series.push({type: "bar", stack: "total", name: "同业存款", data: bs094});
                data.series.push({type: "bar", stack: "total", name: "发放贷款和垫款", data: bs019});
                data.series.push({type: "bar", stack: "total", name: "拆出资金", data: bs003});
                data.series.push({type: "bar", stack: "total", name: "交易性金融资产", data: bs004});
                data.series.push({type: "bar", stack: "total", name: "衍生金融资产", data: bs086});
                data.series.push({type: "bar", stack: "total", name: "买入返售金融资产", data: bs014});
                data.series.push({type: "bar", stack: "total", name: "商誉", data: bs033});
                data.series.push({type: "bar", stack: "total", name: "贵金属", data: bs095});
                data.series.push({type: "bar", stack: "total", name: "应收利息", data: bs011});
                data.series.push({type: "bar", stack: "total", name: "其他资产", data: qtzc});
                this.initChart(wid == 0 ? "c17" : "c1", data.title, data.legend, data.categories, data.series, false, false);
            }
            catch (e) {
                //console.log(e);
                this.setData({w17: 0});
            }
        }
    
        //////////////////////////////////////
        //c18: 近期流动资产按季度各项占比
        if (wid == 0 || wid == 18) {
            try {
                data = {categories: [], series: [], legend:[], title: "近期各项资产按季度占比(元)"};
                let bs093 = [];
                let bs094 = [];
                let bs019 = [];
                let bs003 = [];
                let bs004 = [];
                let bs086 = [];
                let bs014 = [];
                let bs033 = [];
                let bs095 = [];
                let bs011 = [];
                let qtzc = [];
    
                for (let i = 0; i < qlen; i++) {
                    let bs = this.data.sheets[0].data[i];
                    
                    bs093.push(bs.bs_093 ? bs.bs_093 : 0);
                    bs094.push(bs.bs_094 ? bs.bs_094 : 0);
                    bs019.push(bs.bs_019 ? bs.bs_019 : 0);
                    bs003.push(bs.bs_003 ? bs.bs_003 : 0);
                    bs004.push(bs.bs_004 ? bs.bs_004 : 0);
                    bs086.push(bs.bs_086 ? bs.bs_086 : 0);
                    bs014.push(bs.bs_014 ? bs.bs_014 : 0);
                    bs033.push(bs.bs_033 ? bs.bs_033 : 0);
                    bs095.push(bs.bs_095 ? bs.bs_095 : 0);
                    bs011.push(bs.bs_011 ? bs.bs_011 : 0);
    
                    if (bs.bs_038) {
                        let t = bs.bs_038 -
                            (bs.bs_093 ? bs.bs_093 : 0) -
                            (bs.bs_094 ? bs.bs_094 : 0) -
                            (bs.bs_019 ? bs.bs_019 : 0) -
                            (bs.bs_003 ? bs.bs_003 : 0) -
                            (bs.bs_004 ? bs.bs_004 : 0) -
                            (bs.bs_086 ? bs.bs_086 : 0) -
                            (bs.bs_014 ? bs.bs_014 : 0) -
                            (bs.bs_033 ? bs.bs_033 : 0) -
                            (bs.bs_095 ? bs.bs_095 : 0) -
                            (bs.bs_011 ? bs.bs_011 : 0);
                        t = Math.round((t + Number.EPSILON) * 100) / 100
                        qtzc.push(t > 0 ? t : 0);
                    } else 
                        qtzc.push(0);
                }
    
                data.categories = qa;
                data.legend = ["现金及存放央行款项",  "同业存款", "发放贷款和垫款", "拆出资金",  
                    "交易性金融资产", "衍生金融资产", "买入返售金融资产", "商誉", "贵金属", "应收利息", "其他资产"
                ];
                data.series.push({type: "bar", stack: "total", name: "现金及存放央行款项", data: bs093});
                data.series.push({type: "bar", stack: "total", name: "同业存款", data: bs094});
                data.series.push({type: "bar", stack: "total", name: "发放贷款和垫款", data: bs019});
                data.series.push({type: "bar", stack: "total", name: "拆出资金", data: bs003});
                data.series.push({type: "bar", stack: "total", name: "交易性金融资产", data: bs004});
                data.series.push({type: "bar", stack: "total", name: "衍生金融资产", data: bs086});
                data.series.push({type: "bar", stack: "total", name: "买入返售金融资产", data: bs014});
                data.series.push({type: "bar", stack: "total", name: "商誉", data: bs033});
                data.series.push({type: "bar", stack: "total", name: "贵金属", data: bs095});
                data.series.push({type: "bar", stack: "total", name: "应收利息", data: bs011});
                data.series.push({type: "bar", stack: "total", name: "其他资产", data: qtzc});
                this.initChart(wid == 0 ? "c18" : "c1", data.title, data.legend, data.categories, data.series);
            }
            catch (e) {
                //console.log(e);
                this.setData({w18: 0});
            }
        }
    
        /////////////////////////////////////
        //c19: 往年负债结构分析
        if (wid == 0 || wid == 19) {
            try {
                data = {categories: [], series: [], legend:[], title: "往年负债结构分析(元)"};
                let bs041 = [];
                let bs042 = [];
                let bs088 = [];
                let bs043 = [];
                let bs063 = [];
                let bs044 = [];
                let bs087 = [];
                let bs048 = [];
                let bs066 = [];
                let qtfz = [];
    
                for (let i = 0, j = 0; i < ylen; i++) {
                    let bs = this.data.sheets[0].data[j];
    
                    bs041.unshift(bs.bs_041 ? bs.bs_041 : 0);
                    bs042.unshift(bs.bs_042 ? bs.bs_042 : 0);
                    bs088.unshift(bs.bs_088 ? bs.bs_088 : 0);
                    bs043.unshift(bs.bs_043 ? bs.bs_043 : 0);
                    bs063.unshift(bs.bs_063 ? bs.bs_063 : 0);
                    bs044.unshift(bs.bs_044 ? bs.bs_044 : 0);
                    bs087.unshift(bs.bs_087 ? bs.bs_087 : 0);
                    bs048.unshift(bs.bs_048 ? bs.bs_048 : 0);
                    bs066.unshift(bs.bs_066 ? bs.bs_066 : 0);
    
                    if (bs.bs_070) {
                        let t = bs.bs_070 -
                            (bs.bs_041 ? bs.bs_041 : 0) -
                            (bs.bs_042 ? bs.bs_042 : 0) -
                            (bs.bs_088 ? bs.bs_088 : 0) -
                            (bs.bs_043 ? bs.bs_043 : 0) -
                            (bs.bs_063 ? bs.bs_063 : 0) -
                            (bs.bs_044 ? bs.bs_044 : 0) -
                            (bs.bs_087 ? bs.bs_087 : 0) -
                            (bs.bs_048 ? bs.bs_048 : 0) -
                            (bs.bs_066 ? bs.bs_066 : 0);
                        t = Math.round((t + Number.EPSILON) * 100) / 100
                        qtfz.unshift(t > 0 ? t : 0);
                    } else 
                        qtfz.unshift(0);
                        
                    //
                    j += (i == 0 ? cq : 4);
                }
    
                data.categories = rya;
                data.legend = ["向央行借款", "同业存款", "吸收存款", "拆入资金", "应付债券", 
                    "交易性金融负债", "衍生金融负债", "卖出回购金融资产债", "预计负债", "其他负债"
                ];
                data.series.push({type: "bar", stack: "total", name: "向央行借款", data: bs041});
                data.series.push({type: "bar", stack: "total", name: "同业存款", data: bs042});
                data.series.push({type: "bar", stack: "total", name: "吸收存款", data: bs088});
                data.series.push({type: "bar", stack: "total", name: "拆入资金", data: bs043});
                data.series.push({type: "bar", stack: "total", name: "应付债券", data: bs063});
                data.series.push({type: "bar", stack: "total", name: "交易性金融负债", data: bs044});
                data.series.push({type: "bar", stack: "total", name: "衍生金融负债", data: bs087});
                data.series.push({type: "bar", stack: "total", name: "卖出回购金融资产债", data: bs048});
                data.series.push({type: "bar", stack: "total", name: "预计负债", data: bs066});
                data.series.push({type: "bar", stack: "total", name: "其他负债", data: qtfz});
    
                this.initChart(wid == 0 ? "c19" : "c1", data.title, data.legend, data.categories, data.series, false, false);
            }
            catch (e) {
                //console.log(e);
                this.setData({w19: 0});
            }
        }
    
        /////////////////////////////////////
        //c20: 按季度近期负债结构分析
        if (wid == 0 || wid == 20) {
            try {
                data = {categories: [], series: [], legend:[], title: "按季度近期负债结构分析(元)"};
                let bs041 = [];
                let bs042 = [];
                let bs088 = [];
                let bs043 = [];
                let bs063 = [];
                let bs044 = [];
                let bs087 = [];
                let bs048 = [];
                let bs066 = [];
                let qtfz = [];
    
                for (let i = 0; i < qlen; i++) {
                    let bs = this.data.sheets[0].data[i];
    
                    bs041.push(bs.bs_041 ? bs.bs_041 : 0);
                    bs042.push(bs.bs_042 ? bs.bs_042 : 0);
                    bs088.push(bs.bs_088 ? bs.bs_088 : 0);
                    bs043.push(bs.bs_043 ? bs.bs_043 : 0);
                    bs063.push(bs.bs_063 ? bs.bs_063 : 0);
                    bs044.push(bs.bs_044 ? bs.bs_044 : 0);
                    bs087.push(bs.bs_087 ? bs.bs_087 : 0);
                    bs048.push(bs.bs_048 ? bs.bs_048 : 0);
                    bs066.push(bs.bs_066 ? bs.bs_066 : 0);
    
                    if (bs.bs_070) {
                        let t = bs.bs_070 -
                            (bs.bs_041 ? bs.bs_041 : 0) -
                            (bs.bs_042 ? bs.bs_042 : 0) -
                            (bs.bs_088 ? bs.bs_088 : 0) -
                            (bs.bs_043 ? bs.bs_043 : 0) -
                            (bs.bs_063 ? bs.bs_063 : 0) -
                            (bs.bs_044 ? bs.bs_044 : 0) -
                            (bs.bs_087 ? bs.bs_087 : 0) -
                            (bs.bs_048 ? bs.bs_048 : 0) -
                            (bs.bs_066 ? bs.bs_066 : 0);
                        t = Math.round((t + Number.EPSILON) * 100) / 100
                        qtfz.push(t > 0 ? t : 0);
                    } else 
                        qtfz.push(0);
                }
    
                data.categories = qa;
                data.legend = ["向央行借款", "同业存款", "吸收存款", "拆入资金", "应付债券", 
                    "交易性金融负债", "衍生金融负债", "卖出回购金融资产债", "预计负债", "其他负债"
                ];
                data.series.push({type: "bar", stack: "total", name: "向央行借款", data: bs041});
                data.series.push({type: "bar", stack: "total", name: "同业存款", data: bs042});
                data.series.push({type: "bar", stack: "total", name: "吸收存款", data: bs088});
                data.series.push({type: "bar", stack: "total", name: "拆入资金", data: bs043});
                data.series.push({type: "bar", stack: "total", name: "应付债券", data: bs063});
                data.series.push({type: "bar", stack: "total", name: "交易性金融负债", data: bs044});
                data.series.push({type: "bar", stack: "total", name: "衍生金融负债", data: bs087});
                data.series.push({type: "bar", stack: "total", name: "卖出回购金融资产债", data: bs048});
                data.series.push({type: "bar", stack: "total", name: "预计负债", data: bs066});
                data.series.push({type: "bar", stack: "total", name: "其他负债", data: qtfz});
    
                this.initChart(wid == 0 ? "c20" : "c1", data.title, data.legend, data.categories, data.series);
            }
            catch (e) {
                //console.log(e);
                this.setData({w20: 0});
            }
        }

        ///////////////////////////////
        //c21: 存贷比
        if (wid == 0 || wid == 21) {
            try {
                data = {categories: [], series: [], legend:[], title: "存贷比(%)"};
                let rorwa = [];
    
                for (let i = 0, j = 0; i < ylen; i++) {
                    let bk = this.data.sheets[2].data[j];
                    rorwa.unshift(bk.bk_004 && bk.bk_005 ? floatDiv(100 * bk.bk_005, bk.bk_004) : null);
                    
                    j += (i == 0 ? cq : 4);
                }
    
                if (cq != 4) {
                    let tl = rya[rya.length - 1] + "Q" + cq;
                    data.categories = rya.slice(0, rya.length - 1);
                    data.categories.push(tl);
                } else 
                    data.categories = rya;
                data.legend = ["存贷比"];
                data.series.push({type: "line", name: "存贷比", data: rorwa});
                this.initChart(wid == 0 ? "c21" : "c1", data.title, data.legend, data.categories, data.series, false);
            }
            catch (e) {
                //console.log(e);
                this.setData({w21: 0});
            }
        }

        /////////////////////////////////////
        //c22: eps增速
        if (wid == 0 || wid == 22) {
            try {
                data = {categories: [], series: [], legend:[], title: "eps增速(%)"};
                let toc = false;
                let ys = [];
    
                for (let i = 0, j = 0; i < ylen; i++) {
                    if (j + 4 >= this.data.sheets[1].data.length) {
                        ys.unshift(null);
                        break;
                    }
                    
                    let ps = this.data.sheets[1].data[j];
                    let lps = this.data.sheets[1].data[j + 4];
                    if (i == 0 && !ps.ps_051 && !ps.ps_050)
                        toc = true;
                    let t = (lps.ps_051 || lps.ps_050) ? floatDiv(100 * ((ps.ps_051 ? ps.ps_051 : ps.ps_050) - (lps.ps_051 ? lps.ps_051 : lps.ps_050)), (lps.ps_051 ? lps.ps_051 : lps.ps_050)) : null; 

                    ys.unshift(t);

                    j += (i == 0 ? cq : 4);
                }

                data.categories = rya;
                data.legend = ["eps增速"
                ];
                data.series.push({type: "bar", name: "eps增速", data: ys});
    
                this.initChart(wid == 0 ? "c22" : "c1", data.title, data.legend, data.categories, data.series, false);
                if (toc)
                    wx.clearStorage();
            }
            catch (e) {
                //console.log(e);
                this.setData({w22: 0});
            }
        }

        return null;
    },

    init: function () {
        if (this.data.isbank) 
            return this.initBank();

        if (!this.data.isLoaded) 
            this.setData({isLoaded: true,});

        let wid = this.data.wid;
        
        if (this.data.os == "ios" && wid == 0)
            wid = 1;

        if (wid == 0)
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
        if (wid == 0 || wid == 1) {
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
            //console.log(e);
            this.setData({w1: 0});
        }
        }

        /////////////////////////////////////
        //c2: 往年流动资产各项占比
        if (wid == 0 || wid == 2) {
        try {
            data = {categories: [], series: [], legend:[], title: "往年流动资产各项占比(元)"};
            let bs004 = [];//03
            let bs086 = [];//04
            let bs014 = [];
            let hbzj = [];
            let cczj = [];
            let yspj = [];
            let yszk = [];
            //let yszkrz = [];
            let htzc = [];
            let yfkx = [];
            let chxx = [];
            let qtyskx = [];
            let qtldzc = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let bs = this.data.sheets[0].data[j];

                bs004.unshift(bs.bs_004 ? bs.bs_004 : 0);//03
                bs086.unshift(bs.bs_086 ? bs.bs_086 : 0);//04
                bs014.unshift(bs.bs_014 ? bs.bs_014 : 0);
                hbzj.unshift(bs.bs_001 ? bs.bs_001 : 0);
                htzc.unshift(bs.bs_085 ? bs.bs_085 : 0);//09
                cczj.unshift(bs.bs_003 ? bs.bs_003 : 0);//02
                yspj.unshift(bs.bs_005 ? bs.bs_005 : 0);
                yszk.unshift(bs.bs_006 ? bs.bs_006 : 0);
                //yszkrz.unshift(bs.bs_008 ? bs.bs_008 : 0);
                yfkx.unshift(bs.bs_007 ? bs.bs_007 : 0);
                chxx.unshift(bs.bs_015 ? bs.bs_015 : 0);
                qtyskx.unshift(bs.bs_013 ? bs.bs_013 : 0);

                if (bs.bs_018) {
                    t = bs.bs_018 -
                        (bs.bs_004 ? bs.bs_004 : 0) -//03
                        (bs.bs_086 ? bs.bs_086 : 0) -//04
                        (bs.bs_014 ? bs.bs_014 : 0) -
                        (bs.bs_001 ? bs.bs_001 : 0) -
                        (bs.bs_003 ? bs.bs_003 : 0) -//02
                        (bs.bs_005 ? bs.bs_005 : 0) -
                        (bs.bs_006 ? bs.bs_006 : 0) -
                        (bs.bs_007 ? bs.bs_007 : 0) -
                        (bs.bs_015 ? bs.bs_015 : 0) -
                        (bs.bs_013 ? bs.bs_013 : 0) -
                        //(bs.bs_008 ? bs.bs_008 : 0) -
                        (bs.bs_085 ? bs.bs_085 : 0);//09
                    t = Math.round((t + Number.EPSILON) * 100) / 100
                    qtldzc.unshift(t > 0 ? t : 0);
                } else 
                    qtldzc.unshift(0);
                    
                //
                j += (i == 0 ? cq : 4);
            }

            data.categories = rya;
            data.legend = ["货币资金",  "应收票据", "应收帐款", /*"应收帐款融资",*/ "合同资产", "预付款项", "存货", 
                "其他应收款", "其他流动资产", "交易性金融资产", "衍生金融资产", "买入返售金融资产", "拆出资金"
            ];
            data.series.push({type: "bar", stack: "total", name: "货币资金", data: hbzj});
            data.series.push({type: "bar", stack: "total", name: "应收票据", data: yspj});
            data.series.push({type: "bar", stack: "total", name: "应收帐款", data: yszk});
            //data.series.push({type: "bar", stack: "total", name: "应收帐款融资", data: yszkrz});
            data.series.push({type: "bar", stack: "total", name: "合同资产", data: htzc});
            data.series.push({type: "bar", stack: "total", name: "预付款项", data: yfkx});
            data.series.push({type: "bar", stack: "total", name: "存货", data: chxx});
            data.series.push({type: "bar", stack: "total", name: "其他应收款", data: qtyskx});
            data.series.push({type: "bar", stack: "total", name: "其他流动资产", data: qtldzc});
            data.series.push({type: "bar", stack: "total", name: "交易性金融资产", data: bs004});//03
            data.series.push({type: "bar", stack: "total", name: "衍生金融资产", data: bs086});//04
            data.series.push({type: "bar", stack: "total", name: "买入返售金融资产", data: bs014});
            data.series.push({type: "bar", stack: "total", name: "拆出资金", data: cczj});//02
            //this.initChart("c2", data.title, data.legend, data.categories, data.series);
            this.initChart(wid == 0 ? "c2" : "c1", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            //console.log(e);
            this.setData({w2: 0});
        }
        }

        //////////////////////////////////////
        //c3: 近期流动资产按季度各项占比
        if (wid == 0 || wid == 3) {
        try {
            data = {categories: [], series: [], legend:[], title: "近期流动资产按季度各项占比(元)"};
            let bs004 = [];//03
            let bs086 = [];//04
            let bs014 = [];
            let hbzj = [];
            let cczj = [];
            let yspj = [];
            let yszk = [];
            //let yszkrz = [];
            let htzc = [];
            let yfkx = [];
            let chxx = [];
            let qtyskx = [];
            let qtldzc = [];

            for (let i = 0; i < qlen; i++) {
                let bs = this.data.sheets[0].data[i];

                bs004.push(bs.bs_004 ? bs.bs_004 : 0);//03
                bs086.push(bs.bs_086 ? bs.bs_086 : 0);//04
                bs014.push(bs.bs_014 ? bs.bs_014 : 0);
                hbzj.push(bs.bs_001 ? bs.bs_001 : 0);
                htzc.push(bs.bs_085 ? bs.bs_085 : 0);//09
                cczj.push(bs.bs_003 ? bs.bs_003 : 0);//02
                yspj.push(bs.bs_005 ? bs.bs_005 : 0);
                yszk.push(bs.bs_006 ? bs.bs_006 : 0);
                //yszkrz.push(bs.bs_008 ? bs.bs_008 : 0);
                yfkx.push(bs.bs_007 ? bs.bs_007 : 0);
                chxx.push(bs.bs_015 ? bs.bs_015 : 0);
                qtyskx.push(bs.bs_013 ? bs.bs_013 : 0);

                if (bs.bs_018) {
                    t = bs.bs_018 -
                        (bs.bs_004 ? bs.bs_004 : 0) -//03
                        (bs.bs_086 ? bs.bs_086 : 0) -//04
                        (bs.bs_014 ? bs.bs_014 : 0) -
                        (bs.bs_001 ? bs.bs_001 : 0) -
                        (bs.bs_003 ? bs.bs_003 : 0) -//02
                        (bs.bs_005 ? bs.bs_005 : 0) -
                        (bs.bs_006 ? bs.bs_006 : 0) -
                        (bs.bs_007 ? bs.bs_007 : 0) -
                        (bs.bs_015 ? bs.bs_015 : 0) -
                        (bs.bs_013 ? bs.bs_013 : 0) -
                        //(bs.bs_008 ? bs.bs_008 : 0) -
                        (bs.bs_085 ? bs.bs_085 : 0);//09
                    t = Math.round((t + Number.EPSILON) * 100) / 100
                    qtldzc.push(t > 0 ? t : 0);
                } else
                    qtldzc.push(0);
            }

            data.categories = qa;
            data.legend = ["货币资金",  "应收票据", "应收帐款", /*"应收帐款融资",*/ "合同资产", "预付款项", "存货", 
                "其他应收款", "其他流动资产", "交易性金融资产", "衍生金融资产", "买入返售金融资产", "拆出资金"
            ];
            data.series.push({type: "bar", stack: "total", name: "货币资金", data: hbzj});
            data.series.push({type: "bar", stack: "total", name: "应收票据", data: yspj});
            data.series.push({type: "bar", stack: "total", name: "应收帐款", data: yszk});
            //data.series.push({type: "bar", stack: "total", name: "应收帐款融资", data: yszkrz});
            data.series.push({type: "bar", stack: "total", name: "合同资产", data: htzc});
            data.series.push({type: "bar", stack: "total", name: "预付款项", data: yfkx});
            data.series.push({type: "bar", stack: "total", name: "存货", data: chxx});
            data.series.push({type: "bar", stack: "total", name: "其他应收款", data: qtyskx});
            data.series.push({type: "bar", stack: "total", name: "其他流动资产", data: qtldzc});
            data.series.push({type: "bar", stack: "total", name: "交易性金融资产", data: bs004});//03
            data.series.push({type: "bar", stack: "total", name: "衍生金融资产", data: bs086});//04
            data.series.push({type: "bar", stack: "total", name: "买入返售金融资产", data: bs014});
            data.series.push({type: "bar", stack: "total", name: "拆出资金", data: cczj});//02
            this.initChart(wid == 0 ? "c3" : "c1", data.title, data.legend, data.categories, data.series);
            //this.initChart("c3", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            //console.log(e);
            this.setData({w3: 0});
        }
    }

        /////////////////////////////////////
        //c4: 往年负债结构分析
        if (wid == 0 || wid == 4) {
        try {
            data = {categories: [], series: [], legend:[], title: "往年负债结构分析(元)"};
            let bs044 = [];
            let bs087 = [];
            //let zlfz = [];
            let yfyj = [];
            //let yfdqzq = [];
            let yflx = [];
            let dqjk = [];
            let yfpj = [];
            let yfzk = [];
            let yskx = [];
            //let htfz = [];
            let yfxc = [];
            let qtyfk = [];
            let dqfldfz = [];
            let cqjk = [];
            let yfzq = [];
            let cqyfk = [];
            let qtfz = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let bs = this.data.sheets[0].data[j];

                bs044.unshift(bs.bs_044 ? bs.bs_044 : 0);//42
                bs087.unshift(bs.bs_087 ? bs.bs_087 : 0);//43
                yfyj.unshift(bs.bs_049 ? bs.bs_049 : 0);
                yflx.unshift(bs.bs_052 ? bs.bs_052 : 0);//53
                //yfdqzq.unshift(bs.bs_060 ? bs.bs_060 : 0);
                //zlfz.unshift(bs.bs_065 ? bs.bs_065 : 0);
                dqjk.unshift(bs.bs_040 ? bs.bs_040 : 0);
                yfpj.unshift(bs.bs_045 ? bs.bs_045 : 0);
                yfzk.unshift(bs.bs_046 ? bs.bs_046 : 0);
                yskx.unshift((bs.bs_047 ? bs.bs_047 : 0) + (bs.bs_084 ? bs.bs_084 : 0));
                //htfz.unshift(bs.bs_048 ? bs.bs_048 : 0);
                yfxc.unshift(bs.bs_050 ? bs.bs_050 : 0);
                qtyfk.unshift(bs.bs_054 ? bs.bs_054 : 0);
                dqfldfz.unshift(bs.bs_059 ? bs.bs_059 : 0);
                cqjk.unshift(bs.bs_062 ? bs.bs_062 : 0);
                yfzq.unshift(bs.bs_063 ? bs.bs_063 : 0);
                cqyfk.unshift(bs.bs_064 ? bs.bs_064 : 0);

                if (bs.bs_070) {
                    t = bs.bs_070 -
                        (bs.bs_044 ? bs.bs_044 : 0) -//42
                        (bs.bs_087 ? bs.bs_087 : 0) -//43
                        (bs.bs_049 ? bs.bs_049 : 0) -
                        (bs.bs_052 ? bs.bs_052 : 0) -//53
                        //(bs.bs_065 ? bs.bs_065 : 0) -
                        //(bs.bs_060 ? bs.bs_060 : 0) -
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
                        (bs.bs_084 ? bs.bs_084 : 0);//48
                    t = Math.round((t + Number.EPSILON) * 100) / 100
                    qtfz.unshift(t > 0 ? t : 0);
                } else 
                    qtfz.unshift(0);
                    
                //
                j += (i == 0 ? cq : 4);
            }

            data.categories = rya;
            data.legend = ["短期借款", "应付票据", "应付帐款", "预收款项和合同负债", "应付手续费及佣金", 
                "应付职工薪酬", "应付利息", "其他应付款", /*"应付短期债券",*/
                "一年内到期的非流动负债", "长期借款", "应付债券", "长期应付款", "其他负债",
                "交易性金融负债", "衍生金融负债"//, "租赁负债" 
            ];
            data.series.push({type: "bar", stack: "total", name: "短期借款", data: dqjk});
            data.series.push({type: "bar", stack: "total", name: "应付票据", data: yfpj});
            data.series.push({type: "bar", stack: "total", name: "应付帐款", data: yfzk});
            data.series.push({type: "bar", stack: "total", name: "预收款项和合同负债", data: yskx});
            //data.series.push({type: "bar", stack: "total", name: "合同负债", data: htfz});
            data.series.push({type: "bar", stack: "total", name: "应付手续费及佣金", data: yfyj});
            data.series.push({type: "bar", stack: "total", name: "应付职工薪酬", data: yfxc});
            data.series.push({type: "bar", stack: "total", name: "应付利息", data: yflx});
            data.series.push({type: "bar", stack: "total", name: "其他应付款", data: qtyfk});
            //data.series.push({type: "bar", stack: "total", name: "应付短期债券", data: yfdqzq});
            data.series.push({type: "bar", stack: "total", name: "一年内到期的非流动负债", data: dqfldfz});
            data.series.push({type: "bar", stack: "total", name: "长期借款", data: cqjk});
            data.series.push({type: "bar", stack: "total", name: "应付债券", data: yfzq});
            data.series.push({type: "bar", stack: "total", name: "长期应付款", data: cqyfk});
            data.series.push({type: "bar", stack: "total", name: "其他负债", data: qtfz});
            data.series.push({type: "bar", stack: "total", name: "交易性金融负债", data: bs044});//42
            data.series.push({type: "bar", stack: "total", name: "衍生金融负债", data: bs087});//43
            //data.series.push({type: "bar", stack: "total", name: "租赁负债", data: zlfz});

            //this.initChart("c4", data.title, data.legend, data.categories, data.series);
            this.initChart(wid == 0 ? "c4" : "c1", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            //console.log(e);
            this.setData({w4: 0});
        }
    }

        /////////////////////////////////////
        //c5: 按季度近期负债结构分析
        if (wid == 0 || wid == 5) {
        try {
            data = {categories: [], series: [], legend:[], title: "按季度近期负债结构分析(元)"};
            let bs044 = [];
            let bs087 = [];
            //let zlfz = [];
            let yfyj = [];
            //let yfdqzq = [];
            let yflx = [];
            let dqjk = [];
            let yfpj = [];
            let yfzk = [];
            let yskx = [];
            //let htfz = [];
            let yfxc = [];
            let qtyfk = [];
            let dqfldfz = [];
            let cqjk = [];
            let yfzq = [];
            let cqyfk = [];
            let qtfz = [];

            for (let i = 0; i < qlen; i++) {
                let bs = this.data.sheets[0].data[i];

                bs044.push(bs.bs_044 ? bs.bs_044 : 0);//42
                bs087.push(bs.bs_087 ? bs.bs_087 : 0);//43
                yfyj.push(bs.bs_049 ? bs.bs_049 : 0);
                yflx.push(bs.bs_052 ? bs.bs_052 : 0);//53
                //yfdqzq.push(bs.bs_060 ? bs.bs_060 : 0);
                //zlfz.push(bs.bs_065 ? bs.bs_065 : 0);
                dqjk.push(bs.bs_040 ? bs.bs_040 : 0);
                yfpj.push(bs.bs_045 ? bs.bs_045 : 0);
                yfzk.push(bs.bs_046 ? bs.bs_046 : 0);
                yskx.push((bs.bs_047 ? bs.bs_047 : 0) + (bs.bs_084 ? bs.bs_084 : 0));
                //htfz.push(bs.bs_048 ? bs.bs_048 : 0);
                yfxc.push(bs.bs_050 ? bs.bs_050 : 0);
                qtyfk.push(bs.bs_054 ? bs.bs_054 : 0);
                dqfldfz.push(bs.bs_059 ? bs.bs_059 : 0);
                cqjk.push(bs.bs_062 ? bs.bs_062 : 0);
                yfzq.push(bs.bs_063 ? bs.bs_063 : 0);
                cqyfk.push(bs.bs_064 ? bs.bs_064 : 0);

                if (bs.bs_070) {
                    t = bs.bs_070 -
                        (bs.bs_044 ? bs.bs_044 : 0) -//42
                        (bs.bs_087 ? bs.bs_087 : 0) -//43
                        (bs.bs_049 ? bs.bs_049 : 0) -
                        (bs.bs_052 ? bs.bs_052 : 0) -//53
                        //(bs.bs_065 ? bs.bs_065 : 0) -
                        //(bs.bs_060 ? bs.bs_060 : 0) -
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
                        (bs.bs_084 ? bs.bs_084 : 0);//48
                    t = Math.round((t + Number.EPSILON) * 100) / 100
                    qtfz.push(t > 0 ? t : 0);
                } else 
                    qtfz.push(0);
            }

            data.categories = qa;
            data.legend = ["短期借款", "应付票据", "应付帐款", "预收款项和合同负债", "应付手续费及佣金", 
                "应付职工薪酬", "应付利息", "其他应付款", /*"应付短期债券",*/
                "一年内到期的非流动负债", "长期借款", "应付债券", "长期应付款", "其他负债",
                "交易性金融负债", "衍生金融负债"//, "租赁负债" 
            ];
            data.series.push({type: "bar", stack: "total", name: "短期借款", data: dqjk});
            data.series.push({type: "bar", stack: "total", name: "应付票据", data: yfpj});
            data.series.push({type: "bar", stack: "total", name: "应付帐款", data: yfzk});
            data.series.push({type: "bar", stack: "total", name: "预收款项和合同负债", data: yskx});
            //data.series.push({type: "bar", stack: "total", name: "合同负债", data: htfz});
            data.series.push({type: "bar", stack: "total", name: "应付手续费及佣金", data: yfyj});
            data.series.push({type: "bar", stack: "total", name: "应付职工薪酬", data: yfxc});
            data.series.push({type: "bar", stack: "total", name: "应付利息", data: yflx});
            data.series.push({type: "bar", stack: "total", name: "其他应付款", data: qtyfk});
            //data.series.push({type: "bar", stack: "total", name: "应付短期债券", data: yfdqzq});
            data.series.push({type: "bar", stack: "total", name: "一年内到期的非流动负债", data: dqfldfz});
            data.series.push({type: "bar", stack: "total", name: "长期借款", data: cqjk});
            data.series.push({type: "bar", stack: "total", name: "应付债券", data: yfzq});
            data.series.push({type: "bar", stack: "total", name: "长期应付款", data: cqyfk});
            data.series.push({type: "bar", stack: "total", name: "其他负债", data: qtfz});
            data.series.push({type: "bar", stack: "total", name: "交易性金融负债", data: bs044});//42
            data.series.push({type: "bar", stack: "total", name: "衍生金融负债", data: bs087});//43
            //data.series.push({type: "bar", stack: "total", name: "租赁负债", data: zlfz});

            this.initChart(wid == 0 ? "c5" : "c1", data.title, data.legend, data.categories, data.series);
            //this.initChart("c5", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            //console.log(e);
            this.setData({w5: 0});
        }
    }

        /////////////////////////////////////
        //c6: 资产负债率和有息负债率
        if (wid == 0 || wid == 6) {
        try {
            data = {categories: [], series: [], legend:[], title: "资产负债率和有息负债率(%)"};
            let zcfzl = [];
            let yxfzl = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let bs = this.data.sheets[0].data[j];

                zcfzl.unshift(floatDiv(100 * bs.bs_070, bs.bs_038));
                let t = (bs.bs_040 ? bs.bs_040 : 0) +//
                    (bs.bs_041 ? bs.bs_041 : 0) +
                    (bs.bs_042 ? bs.bs_042 : 0) +
                    (bs.bs_043 ? bs.bs_043 : 0) +
                    (bs.bs_044 ? bs.bs_044 : 0) +//
                    //(bs.bs_087 ? bs.bs_087 : 0) +
                    (bs.bs_048 ? bs.bs_048 : 0) +
                    //(bs.bs_052 ? bs.bs_052 : 0) +
                    (bs.bs_059 ? bs.bs_059 : 0) +//
                    //(bs.bs_060 ? bs.bs_060 : 0) +
                    (bs.bs_062 ? bs.bs_062 : 0) +//
                    //(bs.bs_064 ? bs.bs_064 : 0) +//
                    (bs.bs_063 ? bs.bs_063 : 0);//
                yxfzl.unshift(floatDiv(100 * t, bs.bs_038));
                    
                //
                j += (i == 0 ? cq : 4);
            }

            data.categories = rya;
            data.legend = ["资产负债率", "有息负债率"
            ];
            data.series.push({type: "line", name: "资产负债率", data: zcfzl});
            data.series.push({yAxisIndex: 1, type: "line", name: "有息负债率", data: yxfzl});

            this.initChart(wid == 0 ? "c6" : "c1", data.title, data.legend, data.categories, data.series, false, true);
        }
        catch (e) {
            //console.log(e);
            this.setData({w6: 0});
        }
    }

        /////////////////////////////////////
        //c7: 流动资产及负债占总资产及负债比
        if (wid == 0 || wid == 7) {
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

            this.initChart(wid == 0 ? "c7" : "c1", data.title, data.legend, data.categories, data.series, false, true);
        }
        catch (e) {
            //console.log(e);
            this.setData({w7: 0});
        }
    }

        /////////////////////////////////////
        //c8:  流动比率和速动比率
        if (wid == 8 || wid == 0) {
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
            this.initChart(wid == 0? "c8" : "c1", data.title, data.legend, data.categories, data.series, false);
        }
        catch (e) {
            //console.log(e);
            this.setData({w8: 0});
        }
    }

        /////////////////////////////////////
        //c9: 商誉、无形、油气、生物资产
        if (wid == 9 || wid == 0) {
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
            this.initChart(wid == 0 ? "c9" : "c1", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            //console.log(e);
            this.setData({w9: 0});
        }
    }

        /////////////////////////////////////
        //c10: 年营业收入和归母净利润(元)
        if (wid == 0 || wid == 10) {
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

            this.initChart(wid == 0 ? "c10" : "c1", data.title, data.legend, data.categories, data.series, false, true, enlog);
        }
        catch (e) {
            //console.log(e);
            this.setData({w10: 0});
        }
    }
        
        /////////////////////////////////////
        //c11: 营业收入和归母净利润年增速
        if (wid == 0 || wid == 11) {
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

            this.initChart(wid == 0 ? "c11" : "c1", data.title, data.legend, data.categories, data.series, false, false, enlog);
        }
        catch (e) {
            //console.log(e);
            this.setData({w11: 0});
        }
    }

        /////////////////////////////////////
        //c12: 归母分季度净利润
        if (wid == 0 || wid == 12) {
        try {
            data = {categories: [], series: [], legend:[], title: "归母分季度净利润(元)"};
            let jlr = [[], [], [], []];
            let enlog = false;
            let dislog = false;

            for (let k = jlr.length - 1; k >= 0; k--) {
                let i = 0;
                let j = cq - k - 1;
                let len = ylen;
                if (j < 0) {
                    j += 4;
                    jlr[k].unshift(null);
                    i = 1;
                }

                for (; i < len; i++, j += 4) {
                    if (j >= this.data.sheets[1].data.length) {
                        jlr[k].unshift(null);
                        break;
                    } 

                    if (j + 1 == this.data.sheets[1].data.length && k > 0) {
                        jlr[k].unshift(null);
                        break;
                    }

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

            /*
            if (cq < 4) {
                for (let k = 3; k + 1 > cq; k--) 
                    jlr[k].push(null);
            }
            */

            if (enlog)
                data.title += "-对数";
            data.categories = rya;
            data.legend = ["Q1净利润", "Q2净利润", "Q3净利润", "Q4净利润"
            ];
            data.series.push({type: "bar", name: "Q1净利润", data: jlr[0], barGap: 0});
            data.series.push({type: "bar", name: "Q2净利润", data: jlr[1]});
            data.series.push({type: "bar", name: "Q3净利润", data: jlr[2]});
            data.series.push({type: "bar", name: "Q4净利润", data: jlr[3]});

            this.initChart(wid == 0 ? "c12" : "c1", data.title, data.legend, data.categories, data.series, false, false, enlog);
        }
        catch (e) {
            //console.log(e);
            this.setData({w12: 0});
        }
    }

        /////////////////////////////////////
        //c13: 归母净利润分季度增速
        if (wid == 13 || wid == 0) {
        try {
            data = {categories: [], series: [], legend:[], title: "归母净利润分季度增速(%)"};
            let jlr = [[], [], [], []];
            let enlog = false;
            let dislog = false;
            let lmax = 0;

            for (let k = jlr.length - 1; k >= 0; k--) {
                let i = 0;
                let j = cq - k - 1;
                let len = ylen;
                if (j < 0) {
                    j += 4;
                    jlr[k].unshift(null);
                    i = 1;
                }

                for (; i < len; i++, j += 4) {
                    if (j >= this.data.sheets[1].data.length) {
                        jlr[k].unshift(null);
                        break;
                    } 

                    if (j + 4 + (cq > 1 ? 1 : 0) >= this.data.sheets[1].data.length) {
                        jlr[k].unshift(null);
                        break;
                    }

                    let t1 = k > 0 ? 
                        (this.data.sheets[1].data[j].ps_031 ? this.data.sheets[1].data[j].ps_031 : 0) - 
                            (this.data.sheets[1].data[j + 1].ps_031 ? this.data.sheets[1].data[j + 1].ps_031 : 0) : 
                        (this.data.sheets[1].data[j].ps_031 ? this.data.sheets[1].data[j].ps_031 : 0);
                    let t2 = k > 0 ? 
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

            for (let k = 0; k < jlr.length; k++) {
                if (jlr[k].length > lmax) 
                    jlr[k] = jlr[k].slice(jlr[k].length - lmax);
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

            this.initChart(wid == 0 ? "c13" : "c1", data.title, data.legend, data.categories, data.series, false, false, enlog);
        }
        catch (e) {
            //console.log(e);
            this.setData({w13: 0});
        }
    }

        /////////////////////////////////////
        //c14: 分季度营业收入
        if (wid == 0 || wid == 14) {
        try {
            data = {categories: [], series: [], legend:[], title: "分季度营业收入(元)"};
            let jlr = [[], [], [], []];
            let enlog = false;
            let dislog = false;

            for (let k = jlr.length - 1; k >= 0; k--) {
                let j = cq - k - 1;
                let i = 0;
                let len = ylen;
                if (j < 0) {
                    j += 4;
                    jlr[k].unshift(null);
                    i = 1;
                }

                for (; i < len; i++, j += 4) {
                    if (j >= this.data.sheets[1].data.length) {
                        jlr[k].unshift(null);
                        break;
                    } 

                    if (j + 1 == this.data.sheets[1].data.length && k > 0) {
                        jlr[k].unshift(null);
                        break;
                    }

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

            /*
            if (cq < 4) {
                for (let k = 3; k + 1 > cq; k--) 
                    jlr[k].push(null);
            }
            */

            if (enlog)
                data.title += "-对数";
            data.categories = rya;
            data.legend = ["Q1营业收入", "Q2营业收入", "Q3营业收入", "Q4营业收入"
            ];
            data.series.push({type: "bar", name: "Q1营业收入", data: jlr[0], barGap: 0});
            data.series.push({type: "bar", name: "Q2营业收入", data: jlr[1]});
            data.series.push({type: "bar", name: "Q3营业收入", data: jlr[2]});
            data.series.push({type: "bar", name: "Q4营业收入", data: jlr[3]});

            this.initChart(wid == 0 ? "c14" : "c1", data.title, data.legend, data.categories, data.series, false, false, enlog);
        }
        catch (e) {
            //console.log(e);
            this.setData({w14: 0});
        }
    }

        /////////////////////////////////////
        //c15: 营业收入分季度增速
        if (wid == 15 || wid == 0) {
        try {
            data = {categories: [], series: [], legend:[], title: "营业收入分季度增速(%)"};
            let jlr = [[], [], [], []];
            let enlog = false;
            let dislog = false;
            let ps = this.data.sheets[1];
            let lmax = 0;

            for (let k = jlr.length - 1; k >= 0; k--) {
                let i = 0;
                let j = cq - k - 1;
                let len = ylen;
                if (j < 0) {
                    j += 4;
                    jlr[k].unshift(null);
                    i = 1;
                }

                for (; i < len; i++, j += 4) {
                    if (j >= ps.data.length) {
                        jlr[k].unshift(null);
                        break;
                    } 

                    if (j + 4 + (cq > 1 ? 1 : 0) >= ps.data.length) {
                        jlr[k].unshift(null);
                        break;
                    }

                    let t1 = k > 0 ? 
                        (ps.data[j].ps_001 ? ps.data[j].ps_001 : ps.data[j].ps_002 ? ps.data[j].ps_002 : 0) - 
                            (ps.data[j + 1].ps_001 ? ps.data[j + 1].ps_001 : ps.data[j + 1].ps_002 ? ps.data[j + 1].ps_002 : 0) : 
                        (ps.data[j].ps_001 ? ps.data[j].ps_001 : ps.data[j].ps_002 ? ps.data[j].ps_002 : 0);
                    let t2 = k > 0 ? 
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

            for (let k = 0; k < jlr.length; k++) {
                if (jlr[k].length > lmax) 
                    jlr[k] = jlr[k].slice(jlr[k].length - lmax);
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

            this.initChart(wid == 0 ? "c15" : "c1", data.title, data.legend, data.categories, data.series, false, false, enlog);
        }
        catch (e) {
            //console.log(e);
            this.setData({w15: 0});
        }
    }

        /////////////////////////////////////
        //c16: ROE和ROA
        if (wid == 16 || wid == 0) {
        try {
            data = {categories: [], series: [], legend:[], title: "ROE和ROA"};
            let roe = [];
            let roa = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let bs = this.data.sheets[0].data[j];
                let ps = this.data.sheets[1].data[j];

                roe.unshift(ps.ps_031 && bs.bs_080 ? floatDiv(100 * ps.ps_031, bs.bs_080) : null);
                roa.unshift(ps.ps_030 && bs.bs_038 ? floatDiv(100 * ps.ps_030, bs.bs_038) : null);

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

            this.initChart(wid == 0 ? "c16" : "c1", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            //console.log(e);
            this.setData({w16: 0});
        }
    }

        /////////////////////////////////////
        //c17: 非经营性收入占净利润比
        if (wid == 17 || wid == 0) {
        try {
            data = {categories: [], series: [], legend:[], title: "非经营性收入占净利润比(%)"};
            let fjxx = [];

            for (let i = 0; i < qlen; i++) {
                let ps = this.data.sheets[1].data[i];
                let t = (ps.ps_020 ? ps.ps_020 : 0) +
                    (ps.ps_021 ? ps.ps_021 : 0) +
                    (ps.ps_025 ? ps.ps_025 : 0) -
                    (ps.ps_026 ? ps.ps_026 : 0) -
                    (ps.ps_040 ? ps.ps_040 : 0) -
                    (ps.ps_019 ? ps.ps_019 : 0);

                fjxx.push(ps.ps_030 ? floatDiv(100 * t, ps.ps_030) : null);
            }

            data.categories = qa;
            data.legend = ["非经营性收入占比"
            ];
            data.series.push({type: "bar", name: "非经营性收入占比", data: fjxx});

            this.initChart(wid == 0 ? "c17" : "c1", data.title, data.legend, data.categories, data.series);
        }
        catch (e) {
            //console.log(e);
            this.setData({w17: 0});
        }
    }

        /////////////////////////////////////
        //c18: 销售、管理、财务和研发费用占收入比
        if (wid == 18 || wid == 0) {
        try {
            data = {categories: [], series: [], legend:[], title: "销售、管理、财务和研发费用占收入比(%)"};
            let ps016 = [];
            let ps017 = [];
            let ps018 = [];
            let ps047 = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let ps = this.data.sheets[1].data[j];
                let t = ps.ps_001 ? ps.ps_001 : ps.ps_002 ? ps.ps_002 : 0;

                ps016.unshift(ps.ps_016 && t != 0 ? floatDiv(100 * ps.ps_016, t) : null);
                ps017.unshift(ps.ps_017 && t != 0 ? floatDiv(100 * ps.ps_017, t) : null);
                ps018.unshift(ps.ps_018 && t != 0 ? floatDiv(100 * ps.ps_018, t) : null);
                ps047.unshift(ps.ps_047 && t != 0 ? floatDiv(100 * ps.ps_047, t) : null);
                    
                //
                j += (i == 0 ? cq : 4);
            }

            data.categories = rya;
            data.legend = ["销售费用占比", "管理费用占比", "财务费用占比", "研发费用占比" 
            ];
            data.series.push({type: "bar", stack: "total", name: "销售费用占比", data: ps016});
            data.series.push({type: "bar", stack: "total", name: "管理费用占比", data: ps017});
            data.series.push({type: "bar", stack: "total", name: "财务费用占比", data: ps018});
            data.series.push({type: "bar", stack: "total", name: "研发费用占比", data: ps047});

            this.initChart(wid == 0 ? "c18" : "c1", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            //console.log(e);
            this.setData({w18: 0});
        }
    }

        /////////////////////////////////////
        //c19: 净利率和毛利率
        if (wid == 19 || wid == 0) {
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

            this.initChart(wid == 0 ? "c19" : "c1", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            //console.log(e);
            this.setData({w19: 0});
        }
    }

        /////////////////////////////////////
        //c20: 现金流
        if (wid == 20 || wid == 0) {
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

            this.initChart(wid == 0 ? "c20" : "c1", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            //console.log(e);
            this.setData({w20: 0});
        }
    }

        /////////////////////////////////////
        //c21: 应收款和存货周转天数
        if (wid == 0 || wid == 21) {
            try {
                data = {categories: [], series: [], legend:[], title: "应收款和存货周转天数(天)"};
                let ys = [];
                let ch = [];
    
                for (let i = 0, j = 0; i < ylen; i++) {
                    let ps = this.data.sheets[1].data[j];
                    let lbs = this.data.sheets[0].data[j + (i == 0 ? cq : 4)];
                    let bs = this.data.sheets[0].data[j];
                    let t = 0, t1 = 0, t2 = 0, t3 = 0;
    
                    t1 = floatDiv((bs.bs_015 ? bs.bs_015 : 0) + (lbs ? (lbs.bs_015 ? lbs.bs_015 : 0) : (bs.bs_015 ? bs.bs_015 : 0)), 2);
                    t = ps.ps_007 ? floatDiv(((i == 0 && cq < 4) ? cq * 90 : 360) * t1, ps.ps_007) : null;
                    ch.unshift(t);

                    t1 = floatDiv((bs.bs_005 ? bs.bs_005 : 0) + (bs.bs_006 ? bs.bs_006 : 0) + (lbs ? ((lbs.bs_005 ? lbs.bs_005 : 0) + (lbs.bs_006 ? lbs.bs_006 : 0)) : ((bs.bs_005 ? bs.bs_005 : 0) + (bs.bs_006 ? bs.bs_006 : 0))), 2);
                    t2 = ps.ps_002 ? ps.ps_002 : ps.ps_001 ? ps.ps_001 : 0;
                    t = (t2 && t2 != 0) ? floatDiv(((i == 0 && cq < 4) ? cq * 91 : 365) * t1, t2) : null; 
                    ys.unshift(t);

                    j += (i == 0 ? cq : 4);
                }

                data.categories = rya;
                data.legend = ["应收款周转天数", "存货周转天数"
                ];
                data.series.push({type: "line", name: "应收款周转天数", data: ys});
                data.series.push({yAxisIndex:1, type: "line", name: "存货周转天数", data: ch});
    
                this.initChart(wid == 0 ? "c21" : "c1", data.title, data.legend, data.categories, data.series, false, true);
            }
            catch (e) {
                //console.log(e);
                this.setData({w21: 0});
            }
        }

        /////////////////////////////////////
        //c22: eps增速
        if (wid == 0 || wid == 22) {
            try {
                data = {categories: [], series: [], legend:[], title: "eps增速(%)"};
                let toc = false;
                let ys = [];
    
                for (let i = 0, j = 0; i < ylen; i++) {
                    if (j + 4 >= this.data.sheets[1].data.length) {
                        ys.unshift(null);
                        break;
                    }
                    
                    let ps = this.data.sheets[1].data[j];
                    let lps = this.data.sheets[1].data[j + 4];
                    if (i == 0 && !ps.ps_051 && !ps.ps_050)
                        toc = true;
                    let t = (lps.ps_051 || lps.ps_050) ? floatDiv(100 * ((ps.ps_051 ? ps.ps_051 : ps.ps_050) - (lps.ps_051 ? lps.ps_051 : lps.ps_050)), (lps.ps_051 ? lps.ps_051 : lps.ps_050)) : null; 

                    ys.unshift(t);

                    j += (i == 0 ? cq : 4);
                }

                data.categories = rya;
                data.legend = ["eps增速"
                ];
                data.series.push({type: "bar", name: "eps增速", data: ys});
    
                this.initChart(wid == 0 ? "c22" : "c1", data.title, data.legend, data.categories, data.series, false);
                if (toc)
                    wx.clearStorage();
            }
            catch (e) {
                //console.log(e);
                this.setData({w22: 0});
            }
        }

        return null;
    }
});