
const scanServer = "http://127.0.0.1:65500";
var urlStorage = {};
var xssHandler = "0";
var expHandler = "0";
var sqlHandler = "0";
var lfiHandler = "0";
var rceHandler = "0";
var isWork = false;

chrome.storage.sync.set({'rce': 0, 'xss': 0, 'sql': 0, 'lfi': 0, 'exp': 0, 'workDamnWebScan': 0, 'list': ''});
chrome.storage.sync.set({'rce2do': false, 'xss2do': false, 'sql2do': false, 'lfi2do': false, 'exp2do': false});

function extractDomain(url)
{
	var domain;

	//http://xxx.xx.xxx:80/path
	if (url.indexOf("://") > 0) 
		domain = url.split('/')[2];
	//xxx.xx.xxx:80/path
	else 
		domain = url.split('/')[0];

	return domain.split(':')[0];
}

function sendTarget(server, url, method, headers, data)
{
	var ourl = url;
	var host = extractDomain(ourl);
	var xhr;
	var nurl;
	var cookie = '';
	var refer = '';
	var uagent = '';
	var notifi;
	var t;
	var p;

	if (!url)
	{
		console.log('Impoosible empty url!');
		return;
	}
	else
	{
		t = btoa(url);
		p = t.indexOf('=');
		if (p > 0)
			nurl = t.substring(0, p);
		else 
			nurl = t;
	}

	xhr = new XMLHttpRequest();

	for (var i = 0; i < headers.length; i++)
	{
		if (headers[i]['name'] && headers[i]['value'])
		{
			name = headers[i]['name'];

			if (name == 'Cookie')
			{
				t = btoa(headers[i]['value']);
				p = t.indexOf('=');
				if (p > 0)
					cookie = t.substring(0, p);
				else 
					cookie = t;
			}
			else if (name == 'User-Agent')
				uagent = headers[i]['value'];
			else if (name == 'Referer')
			{
				t = btoa(headers[i]['value']);
				p = t.indexOf('=');
				if (p > 0)
					refer = t.substring(0, p);
				else 
					refer = t;
			}
			/*
			else if (name == 'Content-Length')
				continue;
			else if (name == 'Date')
				continue;
			else
				xhr.setRequestHeader(headers[i]['name'], headers[i]['value']);
			*/
		}
	}

	if (data && data != '')
	{
		t = btoa(data);
		p = t.indexOf('=');
		if (p > 0)
			data = t.substring(0, p);
		else 
			data = t;
	}
	else
		data = '';

	infos = server + "/?url=" + nurl + "&method=" + method + "&uagent=" + uagent + "&refer=" + refer + "&cookie=" + cookie + "&data=" + data + "&handlers=" + xssHandler + expHandler + sqlHandler + lfiHandler + rceHandler;

	xhr.onreadystatechange = function() 
	{
		if (xhr.readyState == XMLHttpRequest.DONE) 
		{
			if (xhr.status != 200)
			{
				console.log('Failed to request scan for: ' + ourl);
				return;
			}

			if (!xhr.responseText || xhr.responseText == '')
				return;

			resData = JSON.parse(xhr.responseText);

			chrome.storage.sync.get(['rce', 'xss', 'exp', 'lfi', 'sql'], function(items) 
			{
				chrome.storage.sync.set({'rce': items['rce'] + parseInt(resData.rce)});
				chrome.storage.sync.set({'xss': items['xss'] + parseInt(resData.xss)});
				chrome.storage.sync.set({'exp': items['exp'] + parseInt(resData.exp)});
				chrome.storage.sync.set({'lfi': items['lfi'] + parseInt(resData.lfi)});
				chrome.storage.sync.set({'sql': items['sql'] + parseInt(resData.sql)});
        		});

			chrome.storage.sync.get(['list'], function(items) 
			{
				chrome.storage.sync.set({'list': items['list'] + resData.list})
			});

			if (resData.xss != '0') 
			{
				try
				{
					notifi = new Notification('New vulnerability detected !', {icon: 'icon.png', body: 'XSS on ' + host});
					setTimeout(notifi.close, 2000);
				}
				catch(e)
				{
				}
			}

			if (resData.sql != '0')
			{
				try
				{
					notifi = new Notification('New vulnerability detected !', {icon: 'icon.png', body: 'SQLinjection on ' + host});
					setTimeout(notifi.close, 2000);
				}
				catch(e)
				{
				}
			}

			if (resData.exp != '0')
			{
				try
				{
					notifi = new Notification('New vulnerability detected !', {icon: 'icon.png', body: 'EXPinjection on ' + host});
					setTimeout(notifi.close, 2000);
				}
				catch(e)
				{
				}
			}

			if (resData.lfi != '0')
			{
				try
				{
					notifi = new Notification('New vulnerability detected !', {icon: 'icon.png', body: 'LFI on ' + host});
					setTimeout(notifi.close, 2000);
				}
				catch(e)
				{
				}
			}

			if (resData.rce != '0')
			{
				try
				{
					notifi = new Notification('New vulnerability detected !', {icon: 'icon.png', body: 'RCE on ' + host});
					setTimeout(notifi.close, 2000);
				}
				catch(e)
				{
				}
			}
		}
	}

	xhr.open("GET", infos, true);
	xhr.send();
}


function doCapture()
{
	const nFilter = {urls: ['<all_urls>'], types:['main_frame', 'sub_frame', 'object', 'xmlhttprequest']};
	var tabStorage = {};

	chrome.webRequest.onBeforeRequest.addListener(function(details) 
	{
		const {tabId, requestId} = details;

		chrome.storage.sync.get(['workDamnWebScan'], function(items) 
		{
			if (items['workDamnWebScan'] != 1)
			{
				isWork = false;
				//console.log("isWork one: " + isWork);
			}
			else 
			{
				isWork = true;
				//console.log("isWork two: " + isWork);
			}
		});

		//console.log("isWork before request: " + isWork);
		if (!isWork)
			return;

		chrome.storage.sync.get(['rce2do', 'xss2do', 'exp2do', 'lfi2do', 'sql2do'], function(items) 
		{
			xssHandler = items['xss2do'] ? '1' : '0';	
			expHandler = items['exp2do'] ? '1' : '0';	
			sqlHandler = items['sql2do'] ? '1' : '0';	
			lfiHandler = items['lfi2do'] ? '1' : '0';	
			rceHandler = items['rce2do'] ? '1' : '0';	
        	});

		if (!tabStorage.hasOwnProperty(tabId))
			return;

		if (details.method == 'POST' && !details.requestBody)
			return;

		if (details.url.indexOf(scanServer) == 0)
			return;

		if (details.url.search(/^https?:\/\//) != 0)
			return;

		/*
		if (details.requestBody)
		{
			if (details.requestBody.error)
				console.log(details.requestBody.error);
			if (details.requestBody.formData)
				console.log(details.requestBody.formData);
			if (details.requestBody.raw)
				console.log(details.requestBody.raw);
		}
		*/

		tabStorage[tabId].requests[requestId] = {
			url: details.url,
			method: details.method,
			body: (details.requestBody && details.requestBody.formData) ? details.requestBody.formData : {},
			status: 'pending'
		};
		console.log(details.method + "  1  " + details.url);
	}, nFilter, ['requestBody']);

	chrome.webRequest.onBeforeSendHeaders.addListener(function (details)
	{
		const {tabId, requestId} = details;

		if (!isWork)
			return;

		if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId))
			return;

		req = tabStorage[tabId].requests[requestId];
		req.headers = details.requestHeaders ? details.requestHeaders : [];
		//console.log(details.method + "  2  " + details.url);
	}, nFilter, ['requestHeaders']);

	// For POST redirect
	chrome.webRequest.onBeforeRedirect.addListener(function (details) 
	{
		const {tabId, requestId} = details;
		var isnew = false;
		var data = '';

		if (!isWork)
			return;

		if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId))
			return;

		req = tabStorage[tabId].requests[requestId];
		req.status = 'complete';
		//console.log(req);

		if (!req.url || !req.method)
			return;

		if (!(req.url in urlStorage))
		{
			urlStorage[req.url] = {};
			isnew = true;
		}

		if (!(req.method in urlStorage[req.url]))
		{
			urlStorage[req.url][req.method] = {headers: {}, bdata: {}};
			isnew = true;
		}

		for (var i = 0; i < req.headers; i++)
		{
			if (!req.headers[i]['name'])
				continue;

			hn = req.headers[i]['name'];
			hv = req.headers[i]['value'] ? req.headers[i]['value'] : '';

			if (!urlStorage[req.url][req.method]['headers'][hn])
			{
				urlStorage[req.url][req.method]['headers'][hn] = hv;
				isnew = true;
			}
		}
			
		if (req.body && Object.keys(req.body).length !== 0)
		{
			for (dn in req.body)
			{
				if (!dn)
					continue;

				dva = req.body[dn];

				if (!urlStorage[req.url][req.method]['bdata'][dn])
				{
					isnew = true;

					for (var i = 0; i < dva.length; i++)
					{
						if (dva[i])
						{
							urlStorage[req.url][req.method]['bdata'][dn] = dva[i];
							data += dn + '=' + dva[i] + '&';
							break;
						}
					}
				}
			}
		}

		if (!isnew)
			console.log('Duplicate target, ignore!');
		else
		{
			if (data && data != '' && data[data.length - 1] == '&')
				data = data.slice(0, data.length - 1);
			sendTarget(scanServer, req.url, req.method, req.headers, data)
		}
	}, nFilter);

	chrome.webRequest.onCompleted.addListener(function (details) 
	{
		const {tabId, requestId} = details;
		var isnew = false;
		var data = '';

		if (!isWork)
			return;

		if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId))
			return;

		req = tabStorage[tabId].requests[requestId];
		req.status = 'complete';
		//console.log(req);

		if (!req.url || !req.method)
			return;

		if (!(req.url in urlStorage))
		{
			urlStorage[req.url] = {};
			isnew = true;
		}

		if (!(req.method in urlStorage[req.url]))
		{
			urlStorage[req.url][req.method] = {headers: {}, bdata: {}};
			isnew = true;
		}

		for (var i = 0; i < req.headers; i++)
		{
			if (!req.headers[i]['name'])
				continue;

			hn = req.headers[i]['name'];
			hv = req.headers[i]['value'] ? req.headers[i]['value'] : '';

			if (!urlStorage[req.url][req.method]['headers'][hn])
			{
				urlStorage[req.url][req.method]['headers'][hn] = hv;
				isnew = true;
			}
		}
			
		if (req.body && Object.keys(req.body).length !== 0)
		{
			for (dn in req.body)
			{
				if (!dn)
					continue;

				dva = req.body[dn];

				if (!urlStorage[req.url][req.method]['bdata'][dn])
				{
					isnew = true;

					for (var i = 0; i < dva.length; i++)
					{
						if (dva[i])
						{
							urlStorage[req.url][req.method]['bdata'][dn] = dva[i];
							data += dn + '=' + dva[i] + '&';
							break;
						}
					}
				}
			}
		}

		if (!isnew)
			console.log('Duplicate target, ignore!');
		else
		{
			chrome.storage.sync.get(['rce2do', 'xss2do', 'exp2do', 'lfi2do', 'sql2do'], function(items) 
			{
				/*
				console.log(items['xss2do'] + '+' + 
					items['exp2do'] + '+' + 
					items['sql2do'] + '+' + 
					items['lfi2do'] + '+' + 
					items['rce2do']);
				*/
				xssHandler = items['xss2do'] ? '1' : '0';	
				expHandler = items['exp2do'] ? '1' : '0';	
				sqlHandler = items['sql2do'] ? '1' : '0';	
				lfiHandler = items['lfi2do'] ? '1' : '0';	
				rceHandler = items['rce2do'] ? '1' : '0';	
        		});

			if (data && data != '' && data[data.length - 1] == '&')
				data = data.slice(0, data.length - 1);

			chrome.storage.sync.get(['workDamnWebScan'], function(items) 
			{
				if (items['workDamnWebScan'] != 1)
					isWork = false;
				else 
				{
					isWork = true;
					sendTarget(scanServer, req.url, req.method, req.headers, data)
				}
			});
		}
	}, nFilter);

	chrome.webRequest.onErrorOccurred.addListener((details) => {
		const {tabId, requestId} = details;

		if (!isWork)
			return;

		if (!tabStorage.hasOwnProperty(tabId) || !tabStorage[tabId].requests.hasOwnProperty(requestId)) 
			return;

		delete tabStorage[tabId].requests[requestId];
	}, nFilter);

	chrome.tabs.onActivated.addListener((tab) => {
		consttabId = tab ? tab.tabId : chrome.tabs.TAB_ID_NONE;

		if (!isWork)
			return;

		//console.log(tab.tabId);
		if (!tabStorage.hasOwnProperty(tab.tabId))
		{
			tabStorage[tab.tabId] = {
				id : tab.tabId,
				requests : {}
			};
		}
	});

	chrome.tabs.onRemoved.addListener((tab) => {
		consttabId = tab.tabId;
		if (!tabStorage.hasOwnProperty(tab.tabId))
			return;

		delete tabStorage[tab.tabId];
	});
}

