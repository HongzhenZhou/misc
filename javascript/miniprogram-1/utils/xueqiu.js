const sheetTables = [
    {
    "currency_funds" : "bs_001",
    "lending_fund" : "bs_002",
    "tradable_fnncl_assets" : "bs_003",
    "bills_receivable" : "bs_005",
    "account_receivable" : "bs_006",
    "contractual_assets" : "bs_009",
    "pre_payment" : "bs_007",
    "othr_receivables" : "bs_013",
    "inventory" : "bs_015",
    "total_current_assets" : "bs_018",
    "fixed_asset_sum" : "bs_025",
    "construction_in_process_sum" : "bs_026",
    "salable_financial_assets" : "bs_020",
    "lt_receivable" : "bs_022",
    "lt_equity_invest" : "bs_023",
    "invest_property" : "bs_024",
    "productive_biological_assets" : "bs_029",
    "oil_and_gas_asset" : "bs_030",
    "intangible_assets" : "bs_031",
    "goodwill" : "bs_033",
    "lt_deferred_expense" : "bs_034",
    "total_assets" : "bs_038",
    "st_loan" : "bs_040",
    "borrowing_funds" : "bs_041",
    "tradable_fnncl_liab" : "bs_042",
    "derivative_fnncl_liab" : "bs_043",
    "bill_payable" : "bs_045",
    "accounts_payable" : "bs_046",
    "pre_receivable" : "bs_047",
    "fnncl_assets_sold_for_repur" : "bs_052",
    "contract_liabilities" : "bs_048",
    "payroll_payable" : "bs_050",
    "tax_payable" : "bs_051",
    "interest_payable" : "bs_053",
    "othr_payables" : "bs_054",
    "noncurrent_liab_due_in1y" : "bs_059",
    "total_current_liab" : "bs_061",
    "lt_loan" : "bs_062",
    "bond_payable" : "bs_063",
    "lt_payable_sum" : "bs_064",
    "total_liab" : "bs_070",
    "total_quity_atsopc" : "bs_080",
    "total_holders_equity" : "bs_082"
    },
    {
    "total_revenue" : "ps_001",
    "revenue" : "ps_002",
    "operating_cost" : "ps_007",
    "sales_fee" : "ps_016",
    "manage_fee" : "ps_017",
    "rad_cost" : "ps_015",
    "financing_expenses" : "ps_018",
    "asset_impairment_loss" : "ps_019",
    "income_from_chg_in_fv" : "ps_020",
    "invest_income" : "ps_021",
    "non_operating_income" : "ps_025",
    "non_operating_payout" : "ps_026",
    "net_profit" : "ps_030",
    "net_profit_atsopc" : "ps_031"
    },
    {
    "ncf_from_oa" : "cf_026",
    "ncf_from_ia" : "cf_042",
    "ncf_from_fa" : "cf_055"
    }
];

const excludeStocks = {
    "601997": "银行",
    "600926": "银行",
    "600919": "银行",
    "002958": "银行",
    "601328": "银行",
    "000001": "银行",
    "002936": "银行",
    "600015": "银行",
    "600036": "银行",
    "601169": "银行",
    "601398": "银行",
    "601998": "银行",
    "600016": "银行",
    "601229": "银行",
    "600908": "银行",
    "601288": "银行",
    "601166": "银行",
    "601818": "银行",
    "002807": "银行",
    "601939": "银行",
    "002142": "银行",
    "601577": "银行",
    "601988": "银行",
    "601916": "银行",
    "601658": "银行",
    "601187": "银行",
    "601077": "银行",
    "600928": "银行",
    "600000": "银行",
    "002839": "银行",
    "002966": "银行",
    "603323": "银行",
    "601860": "银行",
    "002948": "银行",
    "601128": "银行",
    "601009": "银行",
    "601838": "银行",
    "601336": "保险",
    "601601": "保险",
    "000627": "保险",
    "601319": "保险",
    "601318": "保险",
    "600291": "保险",
    "601628": "保险",
    "601456": "证券",
    "002797": "证券",
    "002736": "证券",
    "601990": "证券",
    "601375": "证券",
    "600918": "证券",
    "601099": "证券",
    "002500": "证券",
    "002673": "证券",
    "601688": "证券",
    "600030": "证券",
    "601162": "证券",
    "600837": "证券",
    "000728": "证券",
    "601211": "证券",
    "001881": "证券",
    
    "600369": "证券",
    "601236": "证券",
    "600999": "证券",
    "002926": "证券",
    "600864": "证券",
    "601066": "证券",
    "600909": "证券",
    "000783": "证券",
    "000776": "证券",
    "000166": "证券",
    "601555": "证券",
    "601377": "证券",
    "600816": "信托",
    "002939": "证券",
    "000750": "证券",
    "601901": "证券",
    
    "002945": "证券",
    "601788": "证券",
    "601198": "证券",
    "601878": "证券",
    "600109": "证券",
    "601108": "证券",
    "002670": "证券",
    "600958": "证券",
    "600621": "证券",
    "601696": "证券",
    "600061": "证券",
    "600155": "证券",

    "600095": "证券"
};

var xueqiu = {
    cook: "",
    sidbase: "https://xueqiu.com/stock/search.json?size=50&code=",
    peurl: "https://stock.xueqiu.com/v5/stock/quote.json?extend=detail&symbol=",
    durls: [
        "https://stock.xueqiu.com/v5/stock/finance/cn/balance.json?type=all&is_detail=true&count=50&timestamp=&symbol=",
        "https://stock.xueqiu.com/v5/stock/finance/cn/income.json?type=all&is_detail=true&count=50&timestamp=&symbol=",
        "https://stock.xueqiu.com/v5/stock/finance/cn/cash_flow.json?type=all&is_detail=true&count=50&timestamp=&symbol="
    ],
    PE: 0,
    PB: 0,
    ssid: "",
    sname: "",
    rpt: "",
    numTry: 0,
    sheets: [
        {
            done: false,
            n: 0,
            ym: [],
            data: []
        },
        {
            done: false,
            n: 0,
            ym: [],
            data: []
        },
        {
            done: false,
            n: 0,
            ym: [],
            data: []
        }
    ],
    clearState(that, title = "远程数据暂不可用") {
        this.PE = 0;
        this.PB = 0;
        this.ssid = "";
        this.sname = "";
        this.rpt = "";
        this.numTry = 0;
        this.sheets = [
        {
            done: false,
            n: 0,
            ym: [],
            data: []
        },
        {
            done: false,
            n: 0,
            ym: [],
            data: []
        },
        {
            done: false,
            n: 0,
            ym: [],
            data: []
        }];
        wx.hideLoading();
        that.setData({searchString: "", searchDoing: false})
        if (title)
            wx.showToast({title: title, icon: "none"});
    },
    getCook() {
        var sec = Math.round(Math.random() * 60)
        var ms = "SH600900"

        if (sec >= 10 && sec < 20) 
            ms = "SZ000001"
        else if (sec >= 20 && sec < 30)
            ms = "SH600036"
        else if (sec >= 30 && sec < 40)
            ms = "SZ000002"
        else if (sec >= 40 && sec < 50)
            ms = "SH600519"
        else if (sec >= 50)
            ms = "SZ000651"

        wx.request({
            url: "https://xueqiu.com/S/" + ms,
            timeout: 5000,
            header: {
                'Cookie': "aliyungf_tc=AQAAAAjvIyFhQQQAeHFPMQMDOrjojzBH",
                //'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36",
            },
            success: res => {
                if (res.statusCode == 200 && res.header["Set-Cookie"]) {
                    var r = res.header["Set-Cookie"];
                    //console.log(r)
                    r = r.replace(/\bdomain=[^;,]*(;|,|$)/g, " ")
                        .replace(/\bpath=[^;,]*[;,]/g, " ")
                        .replace(/\bexpires=[^;]*(;|$)/g, " ")
                        .replace(/\b[Hh]ttp[Oo]nly[;,]?/g, " ")
                        .replace(/\s+/g, " ")
                        .trim()
                    if (r && r.length > 0) {
                        if (r.charAt(r.length - 1) == ';')
                            r = r.slice(0, r.length - 1)

                        if (r && r.length > 0) {
                            this.cook = r;
                            //console.log("Xueqiu Cookie: " + r)
                        }
                    }
                }
            }
        })
    },
    inquireSID(qstr, that) {
        if (!this.cook) {
            this.getCook();
            wx.showToast({title: "网站不可达，请稍后再试",
                icon: "none"
            })
            that.setData({searchDoing: false})
            return;
        }

        const url = this.sidbase + qstr;
        wx.request({
            url: url,
            timeout: 5000,
            header: {
                'Cookie': this.cook,
                'Accept': "text/html,application/xhtml+xml,application/xml,text/plain,application/json;q=0.9,*/*;q=0.8",
            },
            success: res => {
                that.setData({searchString: "", searchDoing: false})

                if (res.statusCode == 200 && res.header["Content-Type"] && res.header["Content-Type"].search(/application\/json/i) >= 0 && res.data) {
                    var d = res.data;
                    //console.log(d)
                    if (!d.stocks) {
                        wx.showToast({title: "未找到相符股票", icon: "none"})
                        return
                    }
                    var sa = d.stocks.filter(s => {
                        if (!s.code || s.code.search(/^S(H6[0-9]{5}|Z[03][0-9]{5})\s*$/) < 0 || !s.name)
                            return false
                        // TBD
                        if (!s.type || (s.type != 82 && s.type != 11))
                            return false
                        return true
                    })

                    if (!sa || sa.length == 0) {
                        wx.showToast({title: "未找到相符股票", icon: "none"})
                        return
                    }

                    if (sa.length > 1) {
                        var sida = [];
                        for (let i = 0; i < sa.length; i++)
                            sida.push(sa[i].code.trim().slice(2) + " " + sa[i].name.trim());
                        that.arrayPicker = sida;
                        that.setData({arrayPicker: sida, labelPicker: "有多只股票，请点击红色文字处来选择=>", pickerHeight: 30, disablePicker: false, searchDoing: true})
                    } else {
                        //console.log(sa[0])
                        let s1 = sa[0].code.trim().slice(2);
                        if (!this.checkExclude(s1, sa[0].name.trim())) {
                            that.setData({searchDoing: true});
                            wx.showLoading({title: '数据下载中。。。'});
                            this.fetchData(s1, that, 3);
                        }
                    }
                } else {
                    wx.showToast({title: "获取数据失败，请稍后再试", icon: "none"})
                }
            },
            fail: (res) => {
                that.setData({searchString: "", searchDoing: false})
                wx.showToast({title: "获取数据失败，请稍后再试", icon: "none"})
            }
        })
    },
    inquirePE(sid, that) {
        const url = this.peurl + sid;
        wx.request({
            url: url,
            timeout: 5000,
            header: {
                'Cookie': this.cook,
                'Accept': "text/html,application/xhtml+xml,application/xml,text/plain,application/json;q=0.9,*/*;q=0.8",
            },
            success: res => {
                that.setData({searchString: "", searchDoing: false})

                if (res.statusCode == 200 && res.header["Content-Type"] && res.header["Content-Type"].search(/application\/json/i) >= 0 && res.data) {
                    var d = res.data;
                    //console.log(d.data)
                    if (d.data && d.data.quote) {
                        if (d.data.quote.pb)
                            this.PB = d.data.quote.pb;
                        if (d.data.quote.pe_ttm)
                            this.PE = d.data.quote.pe_ttm;
                    }
                }
            }
        })
    },
    fetchData(sid, that, idx) {
        const c = sid.charAt(0);
        
        if (c == "6" || c == "3" || c == "0") {
            try {
                let vcache = wx.getStorageSync(sid);
                if (vcache) {
                    let t = JSON.parse(vcache);
                    let qs = (t.ym % 10);
                    let ys = (t.ym - qs) / 10;
                    let d = new Date();
                    let yc = d.getUTCFullYear();
                    let ms = d.getUTCMonth();
                    let qc = ms < 3 ? 1 : ms < 6 ? 2 : ms < 9 ? 3 : 4;

                    if ((ys == yc && qs + 1 == qc) || (ys + 1 == yc && qs == 4 && qc == 1)) {
                        this.ssid = sid;
                        this.sname = t.name;
                        this.sheets = t.sheets;
                        //console.log(`use cached data ${sid}, ${ys}=${yc}, ${qs}=${qc}`);
                        this.readyDraw(that, true);
                        return;
                    } else {
                        wx.removeStorage({key: sid});
                    }
                }
            } catch (e) {
                //console.log(e)
            }
        }

        sid = (c == "6" ? (this.numTry = 0, this.ssid = sid, "SH") : (c == "0" || c == "3") ? (this.numTry = 0, this.ssid = sid, "SZ") : "") + sid;
        if (this.ssid == "" || sid.indexOf(this.ssid) <= 0)
            return;
        
        if (this.PE == 0 && (c == "6" || c == "0" || c == "3"))
            this.inquirePE(sid, that);

        for (let i = 0; i < this.durls.length; i++) {
            if (idx < this.durls.length && idx !== i)
                continue;
            const u = this.durls[i] + sid;
            if (this.ssid == "" || sid.indexOf(this.ssid) <= 0)
                return;

            wx.request({
                url: u,
                timeout: 5000,
                header: {
                    'Cookie': this.cook,
                    'Accept': "text/html,application/xhtml+xml,application/xml,text/plain,application/json;q=0.9,*/*;q=0.8",
                },
                success: res => {
                    if (this.ssid == "" || sid.indexOf(this.ssid) <= 0)
                        return;

                    if (res.statusCode == 200 && res.header["Content-Type"] && res.header["Content-Type"].search(/application\/json/i) >= 0 && res.data) {
                        const j = res.data.data
                        //console.log(j);
                        const sname = j.quote_name;
                        if (this.ssid != "" && sid.indexOf(this.ssid) > 0)
                            this.sname = sname;

                        for (let k = 0; k < j.list.length; k++) {
                            let m = j.list[k].report_name.match(/^\s*([12][0-9]{3})(中报|一季报|三季报|年报|半年报)\s*$/);
                            if (!m || m.length != 3) {
                                console.log("unexpected format 1");
                                wx.showToast({title: "未知数据格式错误", icon: "none"});
                            }
                            let y = parseInt(m[1], 10);
                            let qs = m[2];
                            let qn = 0;
                            switch (m[2]) {
                                case '一季报':
                                    qn = 1;
                                    break;
                                case '半年报':
                                case '中报':
                                    qn = 2;
                                    break;
                                case '三季报':
                                    qn = 3;
                                    break;
                                case '年报':
                                    qn = 4;
                                    break;
                            }
                            
                            if (qn == 0)
                                break;

                            if (k > 0) {
                                if (qn == 4) {
                                    if (this.sheets[i].ym[this.sheets[i].ym.length - 1] != (y + 1) * 10 + 1) 
                                        break;
                                } else {
                                    if (this.sheets[i].ym[this.sheets[i].ym.length - 1] != y * 10 + qn + 1) 
                                        break;
                                }
                            }

                            let data = {};
                            for (let e in j.list[k]) {
                                if (sheetTables[i].hasOwnProperty(e) && typeof(j.list[k][e][0]) == "number" && !isNaN(j.list[k][e][0])) {
                                    data[sheetTables[i][e]] = j.list[k][e][0];
                                    //console.log(sheetTables[i][e] + ": " + j.list[k][e][0]);
                                }
                            }
                            
                            //console.log(i + "> " + y * 10 + qn);
                            this.sheets[i].data.push(data);
                            this.sheets[i].ym.push(y * 10 + qn);
                            this.sheets[i].n++;
                        }

                        if (this.sheets[i].n > 0) {
                            this.sheets[i].done = true;
                            this.readyDraw(that);
                        } else {
                            this.clearState(that);
                        }
                    } else {
                        if (++this.numTry < 3) 
                            setTimeout(() => { this.fetchData(sid, that, i); }, this.numTry * 1000);
                        else 
                            this.clearState(that);
                    }
                },
                fail: res => {
                    if (this.ssid == "" || sid.indexOf(this.ssid) <= 0)
                        return;
                    if (++this.numTry < 3) 
                        setTimeout(() => { this.fetchData(sid, that, i); }, this.numTry * 1000);
                    else 
                        this.clearState(that);
                }
            })
        }
            
    },
    checkExclude(sid, name) {
        if (excludeStocks.hasOwnProperty(sid) || name.indexOf("银行") > 0 || name.indexOf("保险") > 0 || name.indexOf("证券") > 0 || name.indexOf("信托") > 0) {
            wx.showToast({title: "不能用来分析金融行业", icon: "none"});
            return true;
        }

        return false;
    },
    readyDraw(that, iscache = false) {
        if (!this.sheets[0].done || !this.sheets[1].done || !this.sheets[2].done) {
            if (iscache) {
                try {
                    wx.removeStorageSync(this.ssid);
                } catch (e) {
                }
                this.clearState(that, this.sname + "发生缓存错误，请稍后再试");
            }
            return;
        }

        let n = Math.min(this.sheets[0].n, this.sheets[1].n, this.sheets[2].n);

        for (let i = 0; i < n; i++) {
            if (this.sheets[0].ym[i] != this.sheets[1].ym[i] || 
                this.sheets[0].ym[i] != this.sheets[2].ym[i] ||
                this.sheets[1].ym[i] != this.sheets[2].ym[i]) {
                n = i;
                break;
            }
        }

        if (n < 8) {
            //console.log(n);
            if (iscache) {
                try {
                    wx.removeStorageSync(this.ssid);
                } catch (e) {
                }
            }
            this.clearState(that, this.sname + "是新股，不能对其进行有意义的分析");
            return;
        }

        const rpt = this.parseSheets(that, n);
        const ss = JSON.stringify({sheets: this.sheets});
        if (!iscache) {
            let qs = (this.sheets[0].ym[0] % 10);
            let ys = (this.sheets[0].ym[0] - qs) / 10;
            let d = new Date();
            let yc = d.getUTCFullYear();
            let ms = d.getUTCMonth();
            let qc = ms < 3 ? 1 : ms < 6 ? 2 : ms < 9 ? 3 : 4;
                    
            if ((ys == yc && qs + 1 == qc) || (ys + 1 == yc && qs == 4 && qc == 1)) {
                try {
                    //console.log(`save data cache ${this.ssid}`)
                    wx.setStorageSync(this.ssid, JSON.stringify({name: this.sname, sheets: this.sheets, ym: this.sheets[0].ym[0]}));
                } catch (e) {
                    if (ss.length < 1024000)
                        wx.clearStorage();
                }
            }
        }
        wx.navigateTo({url: `/pages/draw/draw?sid=${this.ssid}&name=${this.sname}&sheets=${ss}&total=${n}&rpt=${rpt}&h=${that.data.windowHeight}&w=${that.data.windowWidth}&os=${that.data.os}`})
        this.clearState(that, "");
    },
    checkNAdd(v, t) {
        if (typeof(v) == "number" && !isNaN(v)) 
            return t + v;
        return t;
    },
    parseSheets(that, total) {
        let s4 = 0;
        let sq = 0;
        let score = 0;
        let f4 = true;
        let r = "";

        wx.hideLoading();
        wx.showLoading({title: '数据分析中'});

        for (let i = 0; i < total; ) {
            if (i + 5 > total)
                break;
            let t;
            let v;
            let v2, v3, v4, v5;
            let fjcxsr;
            let fjcxok;
            score = 0;
            let qn = (this.sheets[0].ym[i] % 10);
            let yn = (this.sheets[0].ym[i] - qn ) / 10;
            let bs = this.sheets[0].data[i];
            let ps = this.sheets[1].data[i];
            let cf = this.sheets[2].data[i];
            let bslq4 = this.sheets[0].data[i + qn];
            let pslq4 = this.sheets[1].data[i + qn];
            let cflq4 = this.sheets[2].data[i + qn];
            let bsly = this.sheets[0].data[i + 4];
            let psly = this.sheets[1].data[i + 4];
            let cfly = this.sheets[2].data[i + 4];
            let bslq = this.sheets[0].data[i + 1];
            let pslq = this.sheets[1].data[i + 1];
            let cflq = this.sheets[2].data[i + 1];
            let bslylq = this.sheets[0].data[i + 5];
            let pslylq = this.sheets[1].data[i + 5];
            let cflylq = this.sheets[2].data[i + 5];
            
            //1 -1
            v2 = bs.bs_018;
            if (typeof(v2) == "number" && !isNaN(v2)) {
                t = 0.0;
                if (v2 > 0.1) {
                    t = this.checkNAdd(bs.bs_006, t);
                    t = this.checkNAdd(bs.bs_008, t);
                    t = this.checkNAdd(bs.bs_015, t);
                    t = this.checkNAdd(bs.bs_013, t);
                    t = (100 * t) / v2;
                    score += (t < 40 ? 1 : t > 60 ? -1 : 0);
                }
            }

            //1 -2
            v2 = bs.bs_038;
            if (typeof(v2) == "number" && !isNaN(v2)) {
                t = 0.0;
                if (v2 > 0.1) {
                    t = this.checkNAdd(bs.bs_040, t);
                    t = this.checkNAdd(bs.bs_041, t);
                    t = this.checkNAdd(bs.bs_042, t);
                    t = this.checkNAdd(bs.bs_043, t);
                    t = this.checkNAdd(bs.bs_052, t);
                    t = this.checkNAdd(bs.bs_059, t);
                    t = this.checkNAdd(bs.bs_060, t);
                    t = this.checkNAdd(bs.bs_062, t);
                    t = this.checkNAdd(bs.bs_063, t);
                    t = (100 * t) / v2;
                    score += t > 30 ? -1 : 0;
                }
            }

            //2 -3
            v2 = bs.bs_061;
            if (typeof(v2) == "number" && !isNaN(v2)) {
                t = 0.0;
                if (v2 > 0.1) {
                    t = this.checkNAdd(bs.bs_045, t);
                    t = this.checkNAdd(bs.bs_046, t);
                    t = this.checkNAdd(bs.bs_047, t);
                    t = this.checkNAdd(bs.bs_048, t);
                    t = (100 * t) / v2;
                    score += (t > 40 ? 1 : t < 20 ? -1 : 0);
                }
            }

            //3 -4
            v2 = bs.bs_070;
            if (typeof(v2) == "number" && !isNaN(v2)) {
                t = 0.0;
                if (v2 > 0.1) {
                    t = this.checkNAdd(bs.bs_045, t);
                    t = this.checkNAdd(bs.bs_046, t);
                    t = this.checkNAdd(bs.bs_047, t);
                    t = this.checkNAdd(bs.bs_048, t);
                    t = (100 * t) / v2;
                    score += (t > 35 ? 1 : t < 15 ? -1 : 0);
                }
            }

            //3 -5
            v2 = bs.bs_082;
            if (typeof(v2) == "number" && !isNaN(v2)) {
                t = 0.0;
                if (v2 > 0.1) {
                    t = this.checkNAdd(bs.bs_040, t);
                    t = this.checkNAdd(bs.bs_041, t);
                    t = this.checkNAdd(bs.bs_042, t);
                    t = this.checkNAdd(bs.bs_043, t);
                    t = this.checkNAdd(bs.bs_052, t);
                    t = this.checkNAdd(bs.bs_059, t);
                    t = this.checkNAdd(bs.bs_060, t);
                    t = this.checkNAdd(bs.bs_062, t);
                    t = this.checkNAdd(bs.bs_063, t);
                    t = (100 * t) / v2;
                    score += (t > 50 ? -1 : 0);
                }
            }

            //4 -6
            v2 = bs.bs_018;
            v3 = bs.bs_061;
            if (typeof(v2) == "number" && !isNaN(v2) && typeof(v3) == "number" && !isNaN(v3)) {
                if (v3 > 0.1) {
                    t = v2 / v3;
                    score += (t > 2 ? 1 : t < 1 ? -1 : 0);
                }
            }

            //4 -8
            v3 = bs.bs_070;
            if (typeof(v3) == "number" && !isNaN(v3)) {
                if (v3 > 0.1) {
                    v2 = bs.bs_040;
                    if (typeof(v2) == "number" && !isNaN(v2)) {
                        t = (100 * v2) / v3;
                        score += (t > 50.0 ? -1 : 0);
                    }

                    v2 = bs.bs_059;
                    if (typeof(v2) == "number" && !isNaN(v2)) {
                        t = (100 * v2) / v3;
                        score += (t > 10.0 ? -1 : 0);
                    }
                }
            }

            //6 -8
            v2 = cf.cf_026;
            v3 = cf.cf_042;
            if (typeof(v2) == "number" && !isNaN(v2) && typeof(v3) == "number" && !isNaN(v3)) {
                if (v2 > 0 && ((v3 < 0 && (v2 + v3) > 0) || v3 >= 0)) {
                    score += 1
                            
                    v4 = cflq4.cf_026;
                    v5 = cflq4.cf_042;
                    if (typeof(v4) == "number" && !isNaN(v4) && typeof(v5) == "number" && !isNaN(v5)) {
                        if (v4 > 0 && ((v5 < 0 && (v4 + v5) > 0) || v5 >= 0)) {
                            if (i + 5 + qn <= total) {
                                let cfllq4 = this.sheets[2].data[i + 5 + qn];

                                v2 = cfllq4.cf_026;
                                v3 = cfllq4.cf_042;
                                if (typeof(v2) == "number" && !isNaN(v2) && typeof(v3) == "number" && !isNaN(v3)) {
                                    if (v2 > 0 && ((v3 < 0 && (v2 + v3) > 0) || v3 >= 0)) 
                                        score += 1;
                                }
                            }
                        }
                    }
                }
            }

            //10 -11
            v2 = ps.ps_030;
            if (typeof(v2) == "number" && !isNaN(v2)) {
                v3 = cf.cf_026;
                if (typeof(v3) == "number" && !isNaN(v3)) {
                    if (v2 > 0.1) {
                        t = (100 * v3) / v2;

                        score += (t > 85 ? 1 : t <= 50 ? -1 : 0);
                    }
                }

                v3 = ps.ps_018;
                if (typeof(v3) == "number" && !isNaN(v3)) {
                    if (v2 > 0 && v3 > 0 && ((100 * v3) / v2) > 10) 
                        score -= 1;
                }
                    
                fjcxsr = 0.0;
                fjcxok = true;

                fjcxsr = this.checkNAdd(ps.ps_020, fjcxsr);
                fjcxsr = this.checkNAdd(ps.ps_021, fjcxsr);
                fjcxsr = this.checkNAdd(ps.ps_025, fjcxsr);
                fjcxsr = this.checkNAdd(ps.ps_026, fjcxsr);
                fjcxsr = this.checkNAdd(ps.ps_019, fjcxsr);
                if ((100 * Math.abs(fjcxsr)) / Math.abs(v2) > 40)
                    fjcxok = false;

                v3 = ps.ps_001;
                if (typeof(v3) == "number" && !isNaN(v3)) {
                    if (v3 > 0.1) {
                        if ((100 * v2) / v3 > 20)
                            score += 1;
                    }
                } else {
                    v3 = ps.ps_002;
                    if (typeof(v3) == "number" && !isNaN(v3)) {
                        if (v3 > 0.1) {
                            if ((100 * v2) / v3 > 20)
                                score += 1;
                        }
                    }
                }

                if (fjcxok) {
                    v3 = bslq4.bs_038;
                    v5 = bs.bs_038;
                    if (typeof(v3) == "number" && !isNaN(v3) && typeof(v5) == "number" && !isNaN(v5)) {
                        if (v3 + v5 > 0.1) {
                            t = (200 * v2) / (v3 + v5);
                            score += (t > (qn * 3.0) ? 2 : t > (qn * 2.0) ? 1 : t < (qn * 1.0) ? -1 : 0);
                        }
                    }
                }
            }

            //19 -15
            v2 = ps.ps_031;
            if (typeof(v2) == "number" && !isNaN(v2)) {
                v3 = bslq4.bs_080;
                v5 = bs.bs_080;
                if (typeof(v3) == "number" && !isNaN(v3) && typeof(v5) == "number" && !isNaN(v5)) {
                    if (v3 + v5 > 0.1) {
                        t = (200 * v2) / (v3 + v5);
                        score += (t > (qn * 5.0) ? 3 : t >= (qn * 4.0) ? 2 : t < (qn * 2.3) ? -2 : 0);
                    }
                }

                fjcxsr = 0.0;
                fjcxok = true;

                fjcxsr = this.checkNAdd(ps.ps_020, fjcxsr);
                fjcxsr = this.checkNAdd(ps.ps_021, fjcxsr);
                fjcxsr = this.checkNAdd(ps.ps_025, fjcxsr);
                fjcxsr = this.checkNAdd(ps.ps_026, fjcxsr);
                fjcxsr = this.checkNAdd(ps.ps_019, fjcxsr);
                if ((100 * Math.abs(fjcxsr)) / Math.abs(v2) > 40)
                    fjcxok = false;

                if (fjcxok) {
                    v3 = psly.ps_031;
                    if (typeof(v3) == "number" && !isNaN(v3)) {
                        if (v3 > 0.1) {
                            t = (100 * (v2 - v3)) / v3;
                            score += (t > 40 ? 3 : t > 20 ? 2 : t > 10 ? 1 : -1);
                        } else if (v3 < 0) {
                            score -= 1;
                        }

                        if (qn > 1) {
                            if (total >= i + 6) {
                                v4 = pslq.ps_031;
                                v5 = pslylq.ps_031;
                                if (typeof(v4) == "number" && !isNaN(v4) && typeof(v5) == "number" && !isNaN(v5)) {
                                    if (v3 - v5 > 0.1) {
                                        t = (100 * ((v2 - v4) - (v3 - v5))) / (v3 - v5);
                                        score += (t > 40 ? 3 : t > 20 ? 2 : t > 10 ? 1 : -1);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            //26 -20
            v2 = ps.ps_001;
            if (typeof(v2) == "number" && !isNaN(v2)) {
                v3 = bs.bs_015;
                if (typeof(v3) == "number" && !isNaN(v3)) {
                    if (v3 > 0 && v2 > 0.0 && ((100 * v3) / v2) > 10) 
                        score += 1;
                }

                let ttt = 0.0;
                ttt = this.checkNAdd(bs.bs_047, ttt);
                ttt = this.checkNAdd(bs.bs_048, ttt);
                if (ttt > 0 && v2 > 0) {
                    if ((ttt * 100) / v2 > 30) {
                        score += 1;
                            
                        let tt2 = 0.0;
                        v3 = psly.ps_001;
                        if (typeof(v3) == "number" && !isNaN(v3)) {
                            if (v3 > 0.0) {
                                t = (130 * (v2 - v3)) / v3;
                        
                                tt2 = this.checkNAdd(bsly.bs_047, tt2);
                                tt2 = this.checkNAdd(bsly.bs_048, tt2);

                                if (tt2 > 0.0) {
                                    if (((100 * (ttt - tt2)) / tt2) > t)
                                        score += 1;
                                }
                            }
                        }
                    }
                }

                ttt = 0.0;
                ttt = this.checkNAdd(bs.bs_006, ttt);
                ttt = this.checkNAdd(bs.bs_008, ttt);
                if (ttt > 0 && v2 > 0 && (ttt * 100) / v2 > 30) {
                    score -= 1;

                    v3 = psly.ps_001;
                    if (typeof(v3) == "number" && !isNaN(v3)) {
                        if (v3 > 0.0) {
                            t = (140 * (v2 - v3)) / v3;
                            let tt2 = 0.0;

                            tt2 = this.checkNAdd(bsly.bs_006, tt2);
                            tt2 = this.checkNAdd(bsly.bs_008, tt2);
                            if (tt2 > 0.0 && ((100 * (ttt - tt2)) / tt2) > t)
                                score -= 1;
                        }
                    }
                }

                ttt = 0.0;
                ttt = this.checkNAdd(bs.bs_015, ttt);
                if (ttt > 0 && v2 > 0 && (ttt * 100) / v2 > 20) {
                    let tt2 = 0.0;
                    v3 = psly.ps_001;
                    if (typeof(v3) == "number" && !isNaN(v3)) {
                        if (v3 > 0.0) {
                            t =  (160 * (v2 - v3)) / v3;
                            tt2 = this.checkNAdd(bsly.bs_015, tt2);
                            if (tt2 > 0.0 && ((100 * (ttt - tt2)) / tt2) > t)
                                score -= 1;
                        }
                    }
                }

                ttt = 0.0;
                v3 = psly.ps_001;
                if (typeof(v3) == "number" && !isNaN(v3)) {
                    if (v3 > 0.1) {
                        t = (100 * (v2 - v3)) / v3;
                        score += (t > 25 ? 2 : t > 10 ? 1 : -1);
                    } else if (v3 < 0)
                        score -= 1;

                    if (qn > 1 && total >= i + 6) {
                        v4 = pslq.ps_001;
                        v5 = pslylq.ps_001;
                        if (typeof(v4) == "number" && !isNaN(v4) && typeof(v5) == "number" && !isNaN(v5)) {
                            if (v3 - v5 > 0.1) {
                                t = (100 * ((v2 - v4) - (v3 - v5))) / (v3 - v5);
                                score += (t > 25 ? 2 : t > 10 ? 1 : -1);
                            }
                        }
                    }
                }
            }

            if (i == 0)
                sq = score;
            if (qn == 4 && i > 0 && f4) {
                s4 = score;
                f4 = false;
            }

            r = "<i>" + yn + "年，评分：" + Math.floor((score + 20) * 100 / 46) + "</i><br>\n" + r;
            //console.log(yn + " " + qn);
            i += (i == 0 ? qn : 4);
        }

        if ((sq > 15 && s4 >= 11) || (s4 > 15 && sq >= 10) || (s4 > 13 && sq > 13))
            r = r + "<b>近期财务表现：优秀</b><br>\n";

        r = "<h3>" + this.sname + "(<i>" + this.ssid +  "</i>)</h3><br>\n" + r + (this.PE != 0 ? "<br>\n市盈率：<i>" + this.PE + "</i><br>\n" : "") + (this.PB != 0 ? (this.PE != 0 ? "" : "<br>\n") + "市净率：<i>" + this.PB + "</i><br>\n" : "");
        //console.log(r);
        return r;
    }

}

module.exports = {
    ...xueqiu
}

