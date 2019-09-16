#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import Flask, request, jsonify
from scans import *
import socket, struct, fcntl
import logging
import requests
import datetime
import base64
import re

app = Flask(__name__)
app.logger.disabled = True
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)
cip = '127.0.0.1'
aurls = {}
hvulns = {}

def myb64d(code):
	b64s = code
	b64s += "=" * ((4 - len(b64s) % 4) % 4)
	t = base64.b64decode(b64s).decode('utf-8')
	#print('base64 decode: {0}'.format(t))
	return t

def get_eth0ip():
	global cip
	sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
	sockfd = sock.fileno()
	SIOCGIFADDR = 0x8915

	ifreq = struct.pack('16sH14s', 'eth0'.encode('utf-8'), socket.AF_INET, b'\x00'*14)
	try:
		res = fcntl.ioctl(sockfd, SIOCGIFADDR, ifreq)
		ip = socket.inet_ntoa(struct.unpack('16sH2x4s8x', res)[2])
		m = re.search(r'(\d+\.\d+\.\d+\.)\d+', ip)
		if m and m.group(1):
			# Must be the Docker host's IP address
			ip = m.group(1) + '1'
			print(' * Client IP is {0}'.format(ip))
			cip = ip
		else:
			print('Incorrect ip format for eth0')
	except:
		print('Can not obtain ip for eth0')


""" Route /ping
Description: Simple ping implementation to check if the server is up via the extension
"""
@app.route('/ping',methods=['GET'])
def ping():
	print('PING from {0}'.format(cip))

	if request.remote_addr != cip:
		return ""

	return "pong"


""" Template
Description: Basic template, will be used in the next features
"""
@app.route('/template', methods=['GET', 'POST'])
def template():
	if request.remote_addr != cip:
		return ""

	return render_template('index.html')


""" Route /
Description: main route for the flask application, every scan is launched from here
"""
@app.route('/',methods=['GET'])
def index():
	vulns = {'rce': 0, 'xss': 0, 'sql': 0, 'lfi': 0, 'exp': 0, 'list':''}
	args = request.args
	url = args['url']
	useragent = args['uagent']
	methods = args['method']
	data = args['data']
	refer = args['refer']
	cookie = args['cookie']
	handlers = args['handlers']
	method = ''
	turl = url
	matches = []
	data_requests = {}
	cookies_requests = {}
	cookies_ghost = ""
	b64s = ''

	if request.remote_addr != cip:
		print("---[ Reject from: " + request.remote_addr + ": !- " + cip + " ]---")
		return ""

	if url:
		url = myb64d(url)
	
	if not url or (url.find('http://') != 0 and url.find('https://') != 0):
		print("---[ Skip from non-HTTP protocol ]---")
		return ""

	if refer and refer != '':
		print(refer);
		refer = myb64d(refer)
		print(refer);

	if cookie and cookie != '':
		cookie = myb64d(cookie)
		cookies_ghost = cookie
		for ca in cookie.split(';'):
			c = ca.split('=')
			if c and len(c) == 2:
				cname = c[0].strip()
				cvalue = c[1].strip()
				cookies_requests[cname] = cvalue

	if turl in hvulns:
		vulns = hvulns[trul]

	if not handlers:
		handlers = '11111';
	else:
		m = re.search(r'[01]{5,}', handlers)
		if not m:
			handlers = '11111';

	print ("---[ " + method + " - from url: " + url + " ]---")

	# Parse args for GET
	if "?" in url and data == '':
		params = url.split('?')[1]
		turl = url.split('?')[0]
		regex = re.compile('([a-zA-Z0-9_-]+)=')
		matches = regex.findall(params)

	# Parse args for POST
	if data != '':
		data = myb64d(data)

		for pdata in data.split('&'):
			d = pdata.split('=')
			if d != '' and d != None:
				if len(d) == 2:
					name = str(d[0])
					value = str(d[1])
					data_requests[name] = value

		# Convert dict(data_requests) to list(matches)
		matches = data_requests.keys()

	if turl not in aurls:
		aurls[turl] = {}
		aurls[turl][method] = {}
		for fuzz in matches:
			aurls[turl][method][fuzz] = False
	else:
		if method not in aurls[turl]:
			aurls[turl][method] = {}
			for fuzz in matches:
				aurls[turl][method][fuzz] = False
		else:
			isnew = False

			for fuzz in matches:
				if fuzz not in aurls[turl][method]:
					aurls[turl][method][fuzz] = False
					isnew = True
				
			if not isnew:
				print ("---[ " + method + " - No new parameters for url: " + url + " ]---")
				return ""

	# Launch scans - iterate through all parameters
	for fuzz in matches:
		if aurls[turl][method][fuzz]:
			continue

		aurls[turl][method][fuzz] = True
		print("---[ " + method + " - New parameter == " + fuzz + " == for url: " + url + " ]---")

		try:
			#print("---[ " + handlers + " ]---")
			if handlers[0:1] == '1':
				#print("---[ scan xss ]---");
				scan_xss(method, vulns, url, fuzz, cookies_ghost, useragent, data_requests, refer)
			if handlers[1:2] == '1':
				#print("---[ scan exp ]---");
				scan_exp(method, vulns, url, fuzz, cookies_ghost, useragent, data_requests, refer)
			if handlers[2:3] == '1':
				#print("---[ scan sql ]---");
				scan_sql_error(method, vulns, url, fuzz, cookies_requests, useragent, data_requests, refer)
				scan_sql_blind_time(method, vulns, url, fuzz, cookies_requests, useragent, data_requests, refer)
			if handlers[3:4] == '1':
				#print("---[ scan lfi ]---");
				scan_lfi(method, vulns, url, fuzz, cookies_requests, useragent, data_requests, refer)
			if handlers[4:5] == '1':
				#print("---[ scan rce ]---");
				scan_rce(method, vulns, url, fuzz, cookies_requests, useragent, data_requests, refer)
		except:
			pass
		finally:
			print ("\033[94m---[ " + method + " - DONE parameter ==< " + fuzz + " >== for url: " + url + " ]---\033[0m")
			hvulns[turl] = vulns

	# Display results as a json
	return jsonify(vulns)


if __name__ == '__main__':
	get_eth0ip()
	app.run(host='0.0.0.0', port=65500, threaded=False, passthrough_errors=False) 


