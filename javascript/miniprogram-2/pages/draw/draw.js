// pages/draw/draw.js.js
import uCharts from '../components/u-charts'

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
        w1: 0, w2: 0, w3: 0, w4: 0, w5: 0, w6: 0, w7: 0, w8: 0, w9: 0, w10: 0,
        w11: 0, w12: 0, w13: 0, w14: 0, w15: 0, w16: 0, w17: 0, w18: 0, w19: 0, w20: 0, 

        w1t: "", w2t: "", w3t: "", w4t: "", w5t: "", w6t: "", w7t: "", w8t: "", w9t: "",
        w10t: "", w11t: "", w12t: "", w13t: "", w14t: "", w15t: "", w16t: "", w17t: "", 
        w18t: "", w19t: "", w20t: "",

        h: 0,
        w: 0,
        pr: 1,
        sid: "",
        name: "",
        sheets: [],
        total: 0,
        rpt: ""
    },

    tap(e) {
        charts[e.target.id].touchLegend(e);
        charts[e.target.id].showToolTip(e);
    },

    initChart(cid, pdata, rev = false, iss = false) {
        const ctype = pdata.type;
        const series = pdata.series;
        const categories = pdata.categories;
        const query = wx.createSelectorQuery().in(this);
        
        query.select("#" + cid).fields({node: true, size: true}).exec(res => {
            if (res[0]) {
                const canvas = res[0].node;
                const ctx = canvas.getContext('2d');
                canvas.width = res[0].width * this.data.pr;
                canvas.height = res[0].height * this.data.pr;
                let chart = undefined;
                
                chart = new uCharts({
                        title: pdata.title,
                        animation: false,
                        type: ctype,
                        canvas2d: true,
                        categories: categories,
                        context: ctx,
                        fontSize: 11,
                        //enableScroll: ctype == "column" && !rev && !iss && categories.length > 8,
                        tapLegend: true,
                        enableScroll: false,
                        dataLabel: false,
                        dataPointShape: false,
                        height: this.data.pr * this.data.w,
                        width: this.data.pr * this.data.w,
                        pixelRatio: this.data.pr,
                        color: [
                            "#1890FF",
                            "#91CB74",
                            "#FAC858",
                            "#EE6666",
                            "#73C0DE",
                            "#3CA272",
                            "#FC8452",
                            "#9A60B4",
                            "#ea7ccc",
                            "#DF00FF",
                            "#ACE5EE",
                            "#522719",
                            "#00FFFF",
                            "#708A93",
                            "#C5CED2",
                            "#D6FFFF",
                            "#AACBE9",
                            "#E97451",
                            "#918151",
                            "#B0B6E3",
                        ],
                        legend: {
                            show: true,
                            position: "bottom",
                            float: "center",
                            padding: 5,
                            margin: 5,
                            fontSize: 8,
                            /*
                            "backgroundColor": "rgba(0,0,0,0)",
                            "borderColor": "rgba(0,0,0,0)",
                            "borderWidth": 0,
                            "fontColor": "#666666",
                            "lineHeight": 11,
                            "hiddenColor": "#CECECE",
                            "itemGap": 10
                            */
                        },
                        padding: [15,15,0,5],
                        series: series,
                        xAxis: !rev ? {
                                disableGrid: true,
                                fontSize:  (cid == "c3" || cid == "c5" || cid == "c17") ? 7 : 9,
                                calibration: true,
                                /*
                                itemCount: 8,
                                scrollShow: !iss,
                                scrollAlign: "right",
                                */
                            } : {
                                disabled: true,
                                axisLine: false,
                            },
                        yAxis: rev ? {
                                disableGrid: true,
                                fontSize: 9,
                                calibration: true,
                            } : {
                                disabled: true,
                            },
                        extra: ctype == "line" ? {
                                line: {
                                    type: "straight",
                                    width: 2,
                                }
                            } : ctype == "bar" ? {
                                bar: {
                                    type: iss ? "stack" : "group",
                                    width: 30,
                                }
                            } : {
                                column: {
                                    type: iss ? "stack" : "group",
                                    seriesGap: 0,
                                    categoryGap: 5,
                                    width: 30,
                                }
                            },
                    });

                charts[cid] = chart;
            } else {
                console.log("dd");
            }
        });
    },

    onLoad: function (options) {
        let st = JSON.parse(options.sheets);
        this.setData({sheets: st.sheets});
        delete options.sheets;
        this.setData({...options});
        let tw = 750;
        this.setData({
            w1: tw,
            w2: tw,
            w3: tw,
            w4: tw,
            w5: tw,
            w6: tw,
            w7: tw,
            w8: tw,
            w9: tw,
            w10: tw,
            w11: tw,
            w12: tw,
            w13: tw,
            w14: tw,
            w15: tw,
            w16: tw,
            w17: tw,
            w18: tw,
            w19: tw,
            w20: tw,
        });

        let cq = this.data.sheets[0].ym[0] % 10;
        let t = 1 + Math.ceil((this.data.total - cq) / 4);
        let ylen = MAXCOL > t ? t : MAXCOL;
        let qlen = MAXCOL > this.data.total ? this.data.total : MAXCOL;
        let rya = [];
        let rqa = [];

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
            let pdata = {type: "line", categories: [], series: [], title: "总资产和股东权益(元)"};
            let zzc = [];
            let gdqy = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let bs = this.data.sheets[0].data[j];

                zzc.unshift(bs.bs_038 ? bs.bs_038 : 0);
                gdqy.unshift(bs.bs_082 ? bs.bs_082 : 0);
                
                j += (i == 0 ? cq : 4);
            }

            this.setData({w1t: pdata.title});
            pdata.categories = rya;
            pdata.series.push({name: "总资产", data: zzc});
            pdata.series.push({name: "股东权益", data: gdqy});
            //data.series.push({yAxisIndex: 1, type: "line", name: "股东权益", data: gdqy});
            this.initChart("c1", pdata);
            //this.initChart("c1", data.title, data.legend, data.categories, data.series, false, true);
        }
        catch (e) {
            console.log(e);
            this.setData({w1: 0});
        }

        /////////////////////////////////////
        //c2: 往年流动资产各项占比
        try {
            let pdata = {categories: [], series: [], type: "column", title: "往年流动资产各项占比(元)"};
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

            this.setData({w2t: pdata.title});
            pdata.categories = rya;
            pdata.series.push({name: "货币资金", data: hbzj});
            pdata.series.push({name: "应收票据", data: yspj});
            pdata.series.push({name: "应收帐款", data: yszk});
            pdata.series.push({name: "应收帐款融资", data: yszkrz});
            pdata.series.push({name: "合同资产", data: htzc});
            pdata.series.push({name: "预付款项", data: yfkx});
            pdata.series.push({name: "存货", data: chxx});
            pdata.series.push({name: "其他应收款", data: qtyskx});
            pdata.series.push({name: "其他流动资产", data: qtldzc});
            pdata.series.push({name: "交易性金融资产", data: bs003});
            pdata.series.push({name: "衍生金融资产", data: bs004});
            pdata.series.push({name: "买入返售金融资产", data: bs014});
            pdata.series.push({name: "拆出资金", data: cczj});
            //this.initChart("c2", data.title, data.legend, data.categories, data.series);
            this.initChart("c2", pdata, false, true);
        }
        catch (e) {
            this.setData({w2: 0});
        }

        //////////////////////////////////////
        //c3: 近期流动资产按季度各项占比
        try {
            //let pdata = {categories: [], series: [], type: "bar", title: "近期流动资产按季度各项占比(元)"};
            let pdata = {categories: [], series: [], type: "column", title: "近期流动资产按季度各项占比(元)"};
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
            }

            this.setData({w3t: pdata.title});
            pdata.categories = rqa;
            pdata.series.push({name: "货币资金", data: hbzj});
            pdata.series.push({name: "应收票据", data: yspj});
            pdata.series.push({name: "应收帐款", data: yszk});
            pdata.series.push({name: "应收帐款融资", data: yszkrz});
            pdata.series.push({name: "合同资产", data: htzc});
            pdata.series.push({name: "预付款项", data: yfkx});
            pdata.series.push({name: "存货", data: chxx});
            pdata.series.push({name: "其他应收款", data: qtyskx});
            pdata.series.push({name: "其他流动资产", data: qtldzc});
            pdata.series.push({name: "交易性金融资产", data: bs003});
            pdata.series.push({name: "衍生金融资产", data: bs004});
            pdata.series.push({name: "买入返售金融资产", data: bs014});
            pdata.series.push({name: "拆出资金", data: cczj});
            
            this.initChart("c3", pdata, false, true);
            //this.initChart("c3", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            console.log(e);
            this.setData({w3: 0});
        }

        /////////////////////////////////////
        //c4: 往年负债结构分析
        try {
            let pdata = {categories: [], series: [], type: "column", title: "往年负债结构分析(元)"};
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

            this.setData({w4t: pdata.title});
            pdata.categories = rya;
            pdata.series.push({name: "短期借款", data: dqjk});
            pdata.series.push({name: "应付票据", data: yfpj});
            pdata.series.push({name: "应付帐款", data: yfzk});
            pdata.series.push({name: "预收款项", data: yskx});
            pdata.series.push({name: "合同负债", data: htfz});
            pdata.series.push({name: "应付手续费及佣金", data: yfyj});
            pdata.series.push({name: "应付职工薪酬", data: yfxc});
            pdata.series.push({name: "应付利息", data: yflx});
            pdata.series.push({name: "其他应付款", data: qtyfk});
            pdata.series.push({name: "应付短期债券", data: yfdqzq});
            pdata.series.push({name: "一年内到期的非流动负债", data: dqfldfz});
            pdata.series.push({name: "长期借款", data: cqjk});
            pdata.series.push({name: "应付债券", data: yfzq});
            pdata.series.push({name: "长期应付款", data: cqyfk});
            pdata.series.push({name: "其他负债", data: qtfz});
            pdata.series.push({name: "交易性金融负债", data: bs042});
            pdata.series.push({name: "衍生金融负债", data: bs043});
            pdata.series.push({name: "租赁负债", data: zlfz});

            //this.initChart("c4", data.title, data.legend, data.categories, data.series);
            this.initChart("c4", pdata, false, true);
        }
        catch (e) {
            this.setData({w4: 0});
        }

        /////////////////////////////////////
        //c5: 按季度近期负债结构分析
        try {
            //let pdata = {categories: [], series: [], type: "bar", title: "按季度近期负债结构分析(元)"};
            let pdata = {categories: [], series: [], type: "column", title: "按季度近期负债结构分析(元)"};
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
            }

            this.setData({w5t: pdata.title});
            pdata.categories = rqa;
            pdata.series.push({name: "短期借款", data: dqjk});
            pdata.series.push({name: "应付票据", data: yfpj});
            pdata.series.push({name: "应付帐款", data: yfzk});
            pdata.series.push({name: "预收款项", data: yskx});
            pdata.series.push({name: "合同负债", data: htfz});
            pdata.series.push({name: "应付手续费及佣金", data: yfyj});
            pdata.series.push({name: "应付职工薪酬", data: yfxc});
            pdata.series.push({name: "应付利息", data: yflx});
            pdata.series.push({name: "其他应付款", data: qtyfk});
            pdata.series.push({name: "应付短期债券", data: yfdqzq});
            pdata.series.push({name: "一年内到期的非流动负债", data: dqfldfz});
            pdata.series.push({name: "长期借款", data: cqjk});
            pdata.series.push({name: "应付债券", data: yfzq});
            pdata.series.push({name: "长期应付款", data: cqyfk});
            pdata.series.push({name: "其他负债", data: qtfz});
            pdata.series.push({name: "交易性金融负债", data: bs042});
            pdata.series.push({name: "衍生金融负债", data: bs043});
            pdata.series.push({name: "租赁负债", data: zlfz});

            this.initChart("c5", pdata, false, true);
            //this.initChart("c5", data.title, data.legend, data.categories, data.series, false, false);
        }
        catch (e) {
            this.setData({w5: 0});
        }

        /////////////////////////////////////
        //c6: 资产负债率和有息负债率
        try {
            let pdata = {categories: [], series: [], type: "line", title: "资产负债率和有息负债率(%)"};
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

            this.setData({w6t: pdata.title});
            pdata.categories = rya;
            pdata.series.push({name: "资产负债率", data: zcfzl});
            pdata.series.push({name: "有息负债率", data: yxfzl});

            this.initChart("c6", pdata);
        }
        catch (e) {
            console.log(e);
            this.setData({w6: 0});
        }

        /////////////////////////////////////
        //c7: 流动资产及负债占总资产及负债比
        try {
            let pdata = {categories: [], series: [], type: "line", title: "流动资产及负债占比(%)"};
            let ldzczb = [];
            let ldfzzb = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let bs = this.data.sheets[0].data[j];

                ldzczb.unshift(floatDiv(100 * bs.bs_018, bs.bs_038));
                ldfzzb.unshift(floatDiv(100 * bs.bs_061, bs.bs_070));
                    
                //
                j += (i == 0 ? cq : 4);
            }

            this.setData({w7t: pdata.title});
            pdata.categories = rya;
            pdata.series.push({name: "流动资产占总资产比", data: ldzczb});
            pdata.series.push({name: "流动负债占总负债比", data: ldfzzb});

            this.initChart("c7", pdata);
        }
        catch (e) {
            console.log(e);
            this.setData({w7: 0});
        }

        /////////////////////////////////////
        //c8:  流动比率和速动比率
        try {
            let pdata = {categories: [], series: [], type: "line", title: "流动比率和速动比率(%)"};
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

            this.setData({w8t: pdata.title});
            pdata.categories = rya;
            pdata.series.push({name: "流动比率", data: ldbl});
            //data.series.push({yAxisIndex: 1, type: "line", stack: "total", name: "速动比率", data: sdbl});
            pdata.series.push({name: "速动比率", data: sdbl});

            //this.initChart("c8", data.title, data.legend, data.categories, data.series, false, true);
            this.initChart("c8", pdata);
        }
        catch (e) {
            this.setData({w8: 0});
        }

        /////////////////////////////////////
        //c9: 商誉、无形、油气、生物资产
        try {
            let pdata = {categories: [], series: [], type: "column", title: "商誉、无形、油气、生物资产(元)"};
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

            this.setData({w9t: pdata.title});
            pdata.categories = rya;
            pdata.series.push({name: "其它资产", data: bsoft});
            pdata.series.push({name: "生产性生物资产", data: bs029});
            pdata.series.push({name: "油气资产", data: bs030});
            pdata.series.push({name: "无形资产", data: bs031});
            pdata.series.push({name: "商誉", data: bs033});

            //this.initChart("c9", data.title, data.legend, data.categories, data.series);
            this.initChart("c9", pdata, false, true);
        }
        catch (e) {
            this.setData({w9: 0});
        }

        /////////////////////////////////////
        //c10: 年营业收入和归母净利润(元)
        try {
            let pdata = {categories: [], series: [], type: "line", title: "年营业收入和归母净利润(元)"};
            let sr = [];
            let jlr = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let ps = this.data.sheets[1].data[j];
                let t = 0;

                t = ps.ps_001 ? ps.ps_001 : ps.ps_002 ? ps.ps_002 : 0;
                sr.unshift(t);
                t = ps.ps_031 ? ps.ps_031 : 0;
                jlr.unshift(t);
                    
                //
                j += (i == 0 ? cq : 4);
            }

            this.setData({w10t: pdata.title});
            pdata.categories = rya;
            pdata.series.push({name: "营业收入", data: sr});
            pdata.series.push({name: "净利润", data: jlr});

            this.initChart("c10", pdata);
        }
        catch (e) {
            this.setData({w10: 0});
        }

        
        /////////////////////////////////////
        //c11: 营业收入和归母净利润年增速
        try {
            let pdata = {categories: [], series: [], type: "column", title: "营收和归母净利润年增速(%)"};
            let sr = [];
            let jlr = [];

            pdata.categories = cq == 4 ? rya : rya.slice(0, rya.length - 1);

            for (let i = 0, j = cq == 4 ? 0 : cq; i < ylen && i < pdata.categories.length; i++, j += 4) {
                if (j + 4 >= this.data.sheets[1].data.length)
                    break;

                let ps1 = this.data.sheets[1].data[j];
                let ps2 = this.data.sheets[1].data[j + 4];
                let t1 = 0, t2 = 0, t = 0;

                t1 = ps1.ps_001 ? ps1.ps_001 : ps1.ps_002 ? ps1.ps_002 : 0;
                t2 = ps2.ps_001 ? ps2.ps_001 : ps2.ps_002 ? ps2.ps_002 : 0;
                t = floatDiv(100 * (t1 - t2), t2);

                sr.unshift(t);
                t1 = ps1.ps_031 ? ps1.ps_031 : 0;
                t2 = ps2.ps_031 ? ps2.ps_031 : 0;
                t = floatDiv(100 * (t1 - t2), t2);

                jlr.unshift(t);
            }

            if (pdata.categories.length > sr.length) 
                pdata.categories = pdata.categories.slice(pdata.categories.length - sr.length);

            this.setData({w11t: pdata.title});
            pdata.series.push({name: "营业收入增速", data: sr});
            pdata.series.push({name: "净利润增速", data: jlr});

            this.initChart("c11", pdata);
        }
        catch (e) {
            //console.log(e);
            this.setData({w11: 0});
        }

        /////////////////////////////////////
        //c12: 归母分季度净利润
        try {
            let pdata = {categories: [], series: [], type: "column", title: "归母分季度净利润(元)"};
            let jlr = [[], [], [], []];

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

                    jlr[k].unshift(t);
                }
            }

            if (cq < 4) {
                for (let k = 3; k + 1 > cq; k--) 
                    jlr[k].push(null);
            }

            this.setData({w12t: pdata.title});
            pdata.categories = rya;
            pdata.series.push({name: "Q1净利润", data: jlr[0]});
            pdata.series.push({name: "Q2净利润", data: jlr[1]});
            pdata.series.push({name: "Q3净利润", data: jlr[2]});
            pdata.series.push({name: "Q4净利润", data: jlr[3]});

            this.initChart("c12", pdata);
        }
        catch (e) {
            //console.log(e);
            this.setData({w12: 0});
        }

        /////////////////////////////////////
        //c13: 归母净利润分季度增速
        try {
            let pdata = {categories: [], series: [], type:"column", title: "归母净利润分季度增速(%)"};
            let jlr = [[], [], [], []];
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

                    jlr[k].unshift(t);
                    if (lmax < i + 1)
                        lmax = i + 1;
                }
            }

            if (cq < 4) {
                for (let k = 3; k + 1 > cq; k--) 
                    jlr[k].push(null);
            }

            this.setData({w13t: pdata.title});
            pdata.categories = rya.length > lmax ? rya.slice(rya.length - lmax) : rya;
            pdata.series.push({name: "Q1净利润增速", data: jlr[0]});
            pdata.series.push({name: "Q2净利润增速", data: jlr[1]});
            pdata.series.push({name: "Q3净利润增速", data: jlr[2]});
            pdata.series.push({tame: "Q4净利润增速", data: jlr[3]});

            this.initChart("c13", pdata);
        }
        catch (e) {
            //console.log(e);
            this.setData({w13: 0});
        }

        /////////////////////////////////////
        //c14: 分季度营业收入
        try {
            let pdata = {categories: [], series: [], type: "column", title: "分季度营业收入(元)"};
            let jlr = [[], [], [], []];

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

                    jlr[k].unshift(t);
                }
            }

            if (cq < 4) {
                for (let k = 3; k + 1 > cq; k--) 
                    jlr[k].push(null);
            }

            this.setData({w14t: pdata.title});
            pdata.categories = rya;
            pdata.series.push({name: "Q1营业收入", data: jlr[0]});
            pdata.series.push({name: "Q2营业收入", data: jlr[1]});
            pdata.series.push({name: "Q3营业收入", data: jlr[2]});
            pdata.series.push({name: "Q4营业收入", data: jlr[3]});

            this.initChart("c14", pdata);
        }
        catch (e) {
            //console.log(e);
            this.setData({w14: 0});
        }

        /////////////////////////////////////
        //c15: 营业收入分季度增速
        try {
            let pdata = {categories: [], series: [], type: "column", title: "营业收入分季度增速(%)"};
            let jlr = [[], [], [], []];
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

                    jlr[k].unshift(t);
                    if (lmax < i + 1)
                        lmax = i + 1;
                }
            }

            if (cq < 4) {
                for (let k = 3; k + 1 > cq; k--) 
                    jlr[k].push(null);
            }

            this.setData({w15t: pdata.title});
            pdata.categories = rya.length > lmax ? rya.slice(rya.length - lmax) : rya;
            pdata.series.push({name: "Q1营业收入增速", data: jlr[0], barGap: 0});
            pdata.series.push({name: "Q2营业收入增速", data: jlr[1]});
            pdata.series.push({name: "Q3营业收入增速", data: jlr[2]});
            pdata.series.push({name: "Q4营业收入增速", data: jlr[3]});

            this.initChart("c15", pdata);
        }
        catch (e) {
            //console.log(e);
            this.setData({w15: 0});
        }

        /////////////////////////////////////
        //c16: ROE和ROA
        try {
            let pdata = {categories: [], series: [], type: "line", title: "ROE和ROA"};
            let roe = [];
            let roa = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let bs = this.data.sheets[0].data[j];
                let ps = this.data.sheets[1].data[j];

                roe.unshift(floatDiv(100 * ps.ps_031, bs.bs_080));
                roa.unshift(floatDiv(100 * ps.ps_030, bs.bs_038));

                j += (i == 0 ? cq : 4);
            }

            this.setData({w16t: pdata.title});
            if (cq == 4)
                pdata.categories = rya;
            else {
                let tya = ya.slice(0);
                tya[0] = tya[0] + "Q" + cq;
                pdata.categories = tya.reverse();
            }
            pdata.series.push({name: "ROE", data: roe});
            pdata.series.push({name: "ROA", data: roa});

            this.initChart("c16", pdata);
        }
        catch (e) {
            console.log(e);
            this.setData({w16: 0});
        }

        /////////////////////////////////////
        //c17: 非经营性收入占净利润比
        try {
            let pdata = {categories: [], series: [], type: "column", title: "非经营性收入占净利润比(%)"};
            //let pdata = {categories: [], series: [], type: "bar", title: "非经营性收入占净利润比(%)"};
            let fjxx = [];

            for (let i = 0; i < qlen; i++) {
                let ps = this.data.sheets[1].data[i];
                let t = (ps.ps_020 ? ps.ps_020 : 0) +
                    (ps.ps_021 ? ps.ps_021 : 0) +
                    (ps.ps_025 ? ps.ps_025 : 0) -
                    (ps.ps_026 ? ps.ps_026 : 0) -
                    (ps.ps_019 ? ps.ps_019 : 0);

                fjxx.unshift(ps.ps_030 ? floatDiv(100 * t, ps.ps_030) : null);
            }

            this.setData({w17t: pdata.title});
            pdata.categories = rqa;
            pdata.series.push({name: "非经营性收入占比", data: fjxx});

            this.initChart("c17", pdata, false);
        }
        catch (e) {
            console.log(e);
            this.setData({w17: 0});
        }

        /////////////////////////////////////
        //c18: 销售、管理、财务和研发费用占收入比
        try {
            let pdata = {categories: [], series: [], type: "column", title: "销售、管理、财务和研发费用占收入比(%)"};
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

            this.setData({w18t: pdata.title});
            pdata.categories = rya;
            pdata.series.push({name: "销售费用占比", data: ps016});
            pdata.series.push({name: "管理费用占比", data: ps017});
            pdata.series.push({name: "财务费用占比", data: ps018});
            pdata.series.push({name: "研发费用占比", data: ps015});

            this.initChart("c18", pdata, false, true);
        }
        catch (e) {
            this.setData({w18: 0});
        }

        /////////////////////////////////////
        //c19: 净利率和毛利率
        try {
            let pdata = {categories: [], series: [], type: "line", title: "净利率和毛利率(%)"};
            let mlv = [];
            let jlv = [];

            for (let i = 0, j = 0; i < ylen; i++) {
                let ps = this.data.sheets[1].data[j];

                mlv.unshift(ps.ps_002 !== undefined && ps.ps_007 !== undefined ? floatDiv(100 * (ps.ps_002 - ps.ps_007), ps.ps_002) : null);
                jlv.unshift(ps.ps_030 !== undefined && ps.ps_001 !== undefined ? floatDiv(100 * ps.ps_030, ps.ps_001) : null);

                j += (i == 0 ? cq : 4);
            }

            this.setData({w19t: pdata.title});
            if (cq == 4)
                pdata.categories = rya;
            else {
                let tya = ya.slice(0);
                tya[0] = tya[0] + "Q" + cq;
                pdata.categories = tya.reverse();
            }
            pdata.series.push({name: "毛利率", data: mlv});
            pdata.series.push({name: "净利率", data: jlv});
            this.initChart("c19", pdata);
        }
        catch (e) {
            this.setData({w19: 0});
        }

        /////////////////////////////////////
        //c20: 现金流
        try {
            let pdata = {categories: [], series: [], type: "column", title: "现金流(元)"};
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

            this.setData({w20t: pdata.title});
            if (cq != 4) {
                let tl = rya[rya.length - 1] + "Q" + cq;
                pdata.categories = rya.slice(0, rya.length - 1);
                pdata.categories.push(tl);
            } else 
                pdata.categories = rya;
            pdata.series.push({name: "净利润", data: jlr, barGap: 0});
            pdata.series.push({name: "经营现金流", data: jy});
            pdata.series.push({name: "投资现金流", data: tz});
            pdata.series.push({name: "融资现金流", data: rz});
            pdata.series.push({name: "自由现金流", data: zy});

            this.initChart("c20", pdata);
        }
        catch (e) {
            console.log(e)
            this.setData({w20: 0});
        }
    }
});