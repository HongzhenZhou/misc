var config_server = "http://127.0.0.1:65500";
var isInit = false;

/**
 * Get the current tab.
 * @param {function(string)} callback - called when the tab is found.
 */
function getCurrentTab(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(tab);
  });
}


/**
 * Extract the domain from an URL
 * @param string(url) - url of the target which will be shorten
 */
function extract_domain(url){
    var domain;
    if (url.indexOf("://") > 0) {
        domain = url.split('/')[2];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
    return domain.split(':')[0];
}


/**
 * Return the status of the server
 */
function status_server(config_server){
    // Create a new HTTP request
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {

      if (http.readyState == XMLHttpRequest.DONE) {

        // If the server is up it responds with "pong"
        if("pong" == http.responseText){
          document.getElementById('status').textContent = "Server is UP !";
          document.getElementById('status').style = "color:green";
        }
        else{
          document.getElementById('status').textContent = "Server is DOWN !";
          document.getElementById('status').style = "color:red";
        }
      }
    }
    http.open("GET", config_server+"/ping", true);
    http.send();
}

/**
 * Plugin form - Update and display the informations
 */
document.addEventListener('DOMContentLoaded', function() {

  getCurrentTab(function(tab) {
    var vulns_csv = "Type,Vulnerability\n";

    chrome.storage.sync.get(['rce2do', 'xss2do','sql2do','lfi2do','exp2do'], function(items) {
	if(document.getElementById('rce2do'))
       		document.getElementById("rce2do").checked = items['rce2do'];
	if(document.getElementById('sql2do'))
        	document.getElementById("sql2do").checked = items['sql2do'];
	if(document.getElementById('lfi2do'))
        	document.getElementById("lfi2do").checked = items['lfi2do'];
	if(document.getElementById('xss2do'))
        	document.getElementById("xss2do").checked = items['xss2do'];
	if(document.getElementById('exp2do'))
        	document.getElementById("exp2do").checked = items['exp2do'];
    });

    // Display local storage
    chrome.storage.sync.get(['rce', 'exp', 'xss','sql','lfi','list','workDamnWebScan'], function(items) {

      // Update start button
      if (items['workDamnWebScan'] == 1){
        document.getElementById("stop").textContent = "Started";
        document.getElementById("stop").style = "background-image: -webkit-linear-gradient(top,#5cb85c,#4cae4c);";
      }
      else{
        document.getElementById("stop").textContent = "Stopped";
        document.getElementById("stop").style = "background-image: -webkit-linear-gradient(top,#EA464A,#D43C40);";
      }

      // Display the list of vulns
      var vulns = escape(items['list']).split('%7CDELIMITER%7C')
      var i = 0;
      vulns.forEach(function(y)
      {
          y = encodeURI(unescape(y));
          if(y!==''){

            // Quick style, odd row will be blue
            var style = "";
            if (i%2 == 1){
              style = ' class="alt"';
            }

            // Extract type of vuln e.g:XSS|TYPE|URL
            y    = y.split('%7CTYPE%7C');
            type = y[0];
            y    = y[1];

            document.getElementById('list').innerHTML += ('<tr'+style+'><td>'+type+'</td><td><a href="'+y+'">'+y.substring(0,150)+'</a></td></tr>');
            vulns_csv += type+","+y+"\n";
            i++;
          }

      }
      );

      // Display vulnerabilities' count
      document.getElementById("exp").textContent   = items['exp'] + " Expression Injection";
      document.getElementById("rce").textContent   = items['rce'] + " Remote Commands Execution";
      document.getElementById("xss").textContent   = items['xss'] + " Cross Site Scripting";
      document.getElementById("sql").textContent   = items['sql'] + " SQL Injection";
      document.getElementById("lfi").textContent   = items['lfi'] + " Local File Inclusion";
      document.getElementById("total").textContent = "Total : "+ (items['lfi']+items['xss']+items['sql']+items['rce']) +" vulnerability found";
    });


if(document.getElementById('exp2do'))
{
	document.getElementById('exp2do').addEventListener('click', function()
	{
		if (this.checked)
			chrome.storage.sync.set({'exp2do': true});
		else
			chrome.storage.sync.set({'exp2do': false});
	});
}
if(document.getElementById('sql2do'))
{
	document.getElementById('sql2do').addEventListener('click', function()
	{
		if (this.checked)
			chrome.storage.sync.set({'sql2do': true});
		else
			chrome.storage.sync.set({'sql2do': false});
	});
}
if(document.getElementById('lfi2do'))
{
	document.getElementById('lfi2do').addEventListener('click', function()
	{
		if (this.checked)
			chrome.storage.sync.set({'lfi2do': true});
		else
			chrome.storage.sync.set({'lfi2do': false});
	});
}
if(document.getElementById('rce2do'))
{
	document.getElementById('rce2do').addEventListener('click', function()
	{
		if (this.checked)
			chrome.storage.sync.set({'rce2do': true});
		else
			chrome.storage.sync.set({'rce2do': false});
	});
}
if(document.getElementById('xss2do'))
{
	document.getElementById('xss2do').addEventListener('click', function()
	{
		if (this.checked)
			chrome.storage.sync.set({'xss2do': true});
		else
			chrome.storage.sync.set({'xss2do': false});
	});
}

    // Display infos (URL - Server's availability)
    document.getElementById('url').textContent = 'Inspecting : ' + extract_domain(tab.url);
    status_server(config_server);

    // Start or Stop the extension
    document.getElementById("stop").addEventListener('click', () => {
        if(document.getElementById("stop").textContent == "Stopped"){
          document.getElementById("stop").textContent = "Started";
          document.getElementById("stop").style = "background-image: -webkit-linear-gradient(top,#5cb85c,#4cae4c);";

	  chrome.storage.sync.set({'workDamnWebScan': 1}, function() {
		  if (!isInit)
		  {
		  	chrome.extension.getBackgroundPage().doCapture();
		  	isInit = true;
		  }
	  });
	}
	 else{
	  chrome.storage.sync.set({'workDamnWebScan': 0});
          document.getElementById("stop").textContent = "Stopped";
          document.getElementById("stop").style = "background-image: -webkit-linear-gradient(top,#EA464A,#D43C40);";
        }
    });

    // Export button - save a CSV file with all the vulnerabilities
    document.getElementById("export").addEventListener('click', () => {
      window.open('data:text/csv;charset=utf-8,' + escape(vulns_csv));
    });

  });
});
