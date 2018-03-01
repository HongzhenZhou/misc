
function fSearchOK(ret)
{
	var sqlprog = null;
	var row = null;
	var div = null;
	var dlist = null;
	var qform = null;
	var spansql = null;

	if (ret.rows)
	{
		if (ret.rows.length == 1)
		{
			row = ret.rows[0];

			if ("sid" in row && "name" in row)
			{
				var mkt = "sh";

				if (row["sid"].substring(0, 2) == "00" || row["sid"].substring(0, 2) == "30")
					mkt = "sz";

				qform = document.getElementById("submit");
				div = document.getElementById("show_area");
				div.innerHTML = "<span class=\"phead\" id=\"spansid\">" + row["sid"] + (row["name"] ? " (" + row["name"] + ")" : "") + "</span><span id=\"sqlprogress\">Fetching financial data from the DB...</span><p>";
				var s = document.createElement("script");
				s.src = "http://finance.sina.com.cn/realstock/company/" +  mkt + row["sid"] + "/jsvar.js";
				div.appendChild(s);
				qform.disabled = true;

				getDataBySID(row["sid"], fDataOK, fDataError);
			}
		}
		else if (ret.rows.length > 1)
		{
			dlist = document.getElementById("sidlist");
			dlist.remove(0);
			div = document.getElementById("stock");
			dlist.add(new Option(div.value.trim(), ""), null);
			qform = document.getElementById("submit");

			for (i = 0; i < ret.rows.length; i++)
			{
				row = ret.rows[i];
		
				if ("sid" in row && "name" in row && "abbr" in row && "syear" in row)
				{
					dlist.add(new Option(row["sid"] + " (" + row["name"] + ")", row["sid"]), null);
				}
			}

			dlist.add(new Option("cancel the query", "cancel"), null);
			dlist.style.left = div.style.left;
			dlist.style.right = div.style.right;
			dlist.style.width = div.style.width;
			dlist.style.height = div.style.height;

			div.style.display = "none";
			dlist.style.display = "inline";

			qform.disabled = true;

			div = document.getElementById("show_area");
			div.innerHTML = "<span>Please select a SID from the above options list!</span>";
		}
		else
		{
			div = document.getElementById("show_area");
			div.innerHTML = "<span>Please input a correct SID or Abbr of a Stock!</span>";
		}
	}
}

function fSearchError(ret)
{
	var div = document.getElementById("show_area");

	if (div)
	{
		div.innerHTML = "<span>Please input a correct SID or Abbr of a Stock" + (ret && ret.error ? ": " + ret.error : "") + "!</span>";
	}
}


function fDataOK(ret)
{
	var qform = document.getElementById("submit");
	var div = document.getElementById("show_area");
	var sqlprogress = document.getElementById("sqlprogress");
	var sdata = {};
	var yls = new Array();
	var qls = new Array();
	var row = null;
	var n = null;
	var sid = null;
	var year = null;
	var qn = null;
	var ifound = false;

	if (sqlprogress)
		sqlprogress.innerHTML = "";

	if (ret.rows && ret.rows.length >= 1 && div)
	{
		qform.disabled = true;

		try
		{
			for (var i = 0; i < ret.rows.length; i++)
			{
				row = ret.rows[i];

				if ("sid" in row && "year" in row && "qn" in row)
				{
					sid = row["sid"];
					year = row["year"].toString();
					qn = row["qn"].toString();
					ifound = false;

					if (!(sid in sdata))
						sdata[sid] = {}
					if (!(year in sdata[sid]))
						sdata[sid][year] = {}
					if (!(qn in sdata[sid][year]))
						sdata[sid][year][qn] = {}
					
					for (n = 0; n < yls.length; n++)
					{
						if (yls[n] == year)
						{
							ifound = true;
							break;
						}
					}

					if (!ifound)
						yls.push(year);
					else
						ifound = false;

					for (n = 0; n < qls.length; n++)
					{
						if (qls[n] == (year + qn))
						{
							ifound = true;
							break;
						}
					}

					if (!ifound)
						qls.push(year + qn);

					for (n = 1; n < 9; n++)
					{
						if (("bs_00" + n) in row)
							sdata[sid][year][qn]["bs_00" + n] = row["bs_00" + n];
						if (("ps_00" + n) in row)
							sdata[sid][year][qn]["ps_00" + n] = row["ps_00" + n];
						if (("cf_00" + n) in row)
							sdata[sid][year][qn]["cf_00" + n] = row["cf_00" + n];
					}
					for (n = 10; n < 84; n++)
					{
						if (("bs_0" + n) in row)
							sdata[sid][year][qn]["bs_0" + n] = row["bs_0" + n];
					}
					for (n = 10; n < 40; n++)
					{
						if (("ps_0" + n) in row)
							sdata[sid][year][qn]["ps_0" + n] = row["ps_0" + n];
					}
					for (n = 10; n < 60; n++)
					{
						if (("cf_0" + n) in row)
							sdata[sid][year][qn]["cf_0" + n] = row["cf_0" + n];
					}
				}
			}
		}
		catch(e) {alert(e.toString())}

		if (sid && sdata && yls && qls)
		{
			if (yls.length < 3 && qls.length < 9)
			{
				div.innerHTML += "<span>" + sid + " is a new IPO stock (less than 3 years), no need to parse it!</span>";
			}
			else
			{
				//yls = yls.sort(function(a, b){ return parseInt(a, 10) - parseInt(b, 10); });
				//qls = qls.sort(function(a, b){ return parseInt(a, 10) - parseInt(b, 10); });

				draw1c(sdata, sid, yls, qls);
			}
		}
		else
		{
			div.innerHTML += "<span>Can't parse " + sid + "!</span>";
		}
	}

	qform.disabled = false;
}

function fDataError(ret)
{
	var div = document.getElementById("show_area");
	var qform = document.getElementById("submit");
	var sqlprogress = document.getElementById("sqlprogress");

	if (div)
	{
		if (sqlprogress)
			sqlprogress.innerHTML = "";
		div.innerHTML += "<span>Some error's raised when fetching DB data" + (ret && ret.error ? ": " + ret.error : "") + "!</span>";
	}

	if (qform)
		qform.disabled = false;
}

function selectSID(sel)
{
	var div = document.getElementById("stock");
	var qform = document.getElementById("submit");
	var ct = sel.options[sel.selectedIndex].text;
	var t = ct ? ct.match(/\(([^()]*)\)/) : null;
	var name = (t && t[1]) ? t[1] : null;
	var spansql = null;

	if (sel && sel.value && sel.value.match(/^\s*[0-9]{6,9}\s*$/))
	{
		var mkt = "sh";
		var st = sel.value.match(/^\s*([0-9]{6,9})([^0-9]|$)/);

		if (st[1].substring(0, 2) == "00" || st[1].substring(0, 2) == "30")
			mkt = "sz";

		getDataBySID(sel.value, fDataOK, fDataError);
		sel.style.display = "none";
		sel.innerHTML = "<option value=\"\"></option>";
		div.style.display = "inline";
		div = document.getElementById("show_area");
		div.innerHTML = "<span class=\"phead\" id=\"spansid\">" + ct + "</span><span id=\"sqlprogress\">Fetching financial data from the DB...</span><p>";
		var s = document.createElement("script");
		s.src = "http://finance.sina.com.cn/realstock/company/" +  mkt + st[1] + "/jsvar.js";
		div.appendChild(s);
	}
	else
	{
		qform.disabled = false;
		sel.style.display = "none";
		sel.innerHTML = "<option value=\"\"></option>";
		div.style.display = "inline";
		div = document.getElementById("show_area");
		div.innerHTML = "<span>You didn't select any stock ID!</span>";
	}
}

function getFp1cSIDOrAbbr()
{
	var div = document.getElementById("stock");
	var dlist = null;
	var sid = null;
	var abbr = null;
	var MAXPICN = 29;

	if (div && div.value)
	{
		if (div.value.match(/^\s*[0-9]{6,9}\s*$/))
		{
			sid = div.value.trim();
			searchStockBySIDOrAbbr(sid, fSearchOK, fSearchError);
		}
		else if (div.value.match(/^\s*\**[a-z]{3,}\s*$/i))
		{
			abbr = div.value.trim();
			dlist = document.getElementById("sidlist");
			dlist.value = abbr;
			searchStockBySIDOrAbbr(abbr, fSearchOK, fSearchError);
		}

		for (var i = 1; i <= MAXPICN; i++)
		{
			div = document.getElementById("pic" + i.toString());
			if (div)
			{
				div.innerHTML = "";
			}
		}
	}
}

function selectPic(sel)
{
	var div = null;

	if (sel && sel.value)
	{
		if (sel.value == "all")
		{
			for (var i = 1; i < 30; i++)
			{
				div = document.getElementById("pic" + i.toString());
				div.style.display = "block";
			}
		}
		else
		{
			div = document.getElementById(sel.value);
			div.style.display = "block";

			for (var i = 1; i < 30; i++)
			{
				if ("pic" + i.toString() != sel.value)
				{
					div = document.getElementById("pic" + i.toString());
					div.style.display = "none";
				}
			}
		}
	}
}
