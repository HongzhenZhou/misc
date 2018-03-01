
var SpecialStockIDs = {
	//保险
	"601318": null, //中国平安
	"601336": null, //新华保险
	"601628": null, //中国人寿
	"601601": null, //中国太保

	//券商
	/*
	"000562": null, //宏源证券
	"000686": null, //东北证券
	"000728": null, //国元证券
	"000750": null, //国海证券
	"000776": null, //广发证券
	"000783": null, //长江证券
	"002500": null, //山西证券
	"002673": null, //西部证券
	"600030": null, //中信证券
	"600109": null, //国金证券
	"600369": null, //西南证券
	"600837": null, //海通证券
	"600999": null, //招商证券
	"601099": null, //太平洋
	"601377": null, //兴业证券
	"601555": null, //东吴证券
	"601688": null, //华泰证券
	"601788": null, //光大证券
	"601901": null, //方正证券
	*/
	//信托
	"600643": null, //爱建集团
	"000563": null, //陕国投
	"600816": null, //安信信托

	//银行
	"002839": null, //张家港行
	"601997": null, //贵阳银行
	"600919": null, //江苏银行
	"601229": null, //上海银行
	"600926": null, //杭州银行
	"601128": null, //常熟银行
	"603323": null, //吴江银行
	"600908": null, //无锡银行
	"002807": null, //江阴银行
	"601398": null, //工商银行
	"601988": null, //中国银行
	"002142": null, //宁波银行
	"601166": null, //兴业银行
	"601169": null, //北京银行
	"600015": null, //华夏银行
	"600036": null, //招商银行
	"600016": null, //民生银行
	"601009": null, //南京银行
	"601288": null, //农业银行
	"601818": null, //光大银行
	"601939": null, //建设银行
	"601998": null, //中信银行
	"601328": null, //交通银行
	"000001": null, //平安银行
	"600000": null  //浦发银行
};


function getDataBySID(arg, fok, ferror)
{
	var xhr = null;
	var data = null;

	if (!arg || arg == "" || !arg.match(/^[0-9]{6,9}$/i))
	{ 
		alert("getDataBySID() need valid arguments!");
		return ferror(null);
	}

	if (arg in SpecialStockIDs)
	{
		alert("Couldn't parse this stock: " + arg + "!");
		return ferror(null);
	}

	if (sessionStorage && sessionStorage[arg])
	{
		data = JSON.parse(sessionStorage[arg]);
		fok(data);
	}
	else
	{
		xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == XMLHttpRequest.DONE) {
				try
				{
					data = JSON.parse(xhr.responseText);
				}
				catch(e)
				{
					data = null;
				}

				if (xhr.status != 200 || !data)
					ferror(data);
				else
				{
					if (sessionStorage)
						sessionStorage[arg] = xhr.responseText;
					fok(data);
				}
			}
		}

		xhr.open("GET", "/d/" + arg, true);
		xhr.send();
	}
}

function searchStockBySIDOrAbbr(arg, fok, ferror)
{
	var xhr = new XMLHttpRequest();
	var data = null;

	if (!arg || arg == "" || !arg.match(/^([0-9]{6,9}|[a-z\*]{3,9})$/i))
	{ 
		alert("searchStockBySIDOrAbbr() need a valid argument!");
		return ferror(null);
	}

	xhr.onreadystatechange = function() {
		if (xhr.readyState == XMLHttpRequest.DONE) {
			try
			{
				data = JSON.parse(xhr.responseText);
			}
			catch(e)
			{
				data = null;
			}

			if (xhr.status == 200 && data)
				fok(data);
			else
				ferror(data);
		}
	}

	xhr.open("GET", "/q/" + arg, true);
	xhr.send();
}


