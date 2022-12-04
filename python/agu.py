#!env python

import io
import urllib
import smtplib
import argparse
import numpy as np
import pandas as pd
import yahoo_fin.stock_info as yfsi
import matplotlib.pyplot as plt

parser = argparse.ArgumentParser(usage='Inquire the price for stock, need the stock ID argument')
parser.add_argument('--sid', '-s', type = str, help = 'stock ID')
args = parser.parse_args()
sid = args.sid
ctx = ''
ndone = 0

sh = 'http://query.sse.com.cn/security/stock/downloadStockListFile.do?csrcCode=&stockCode=&areaName=&stockType=1'
sz = 'http://www.szse.cn/api/report/ShowReport?SHOWTYPE=xlsx&CATALOGID=1110&TABKEY=tab1&random=0.4178381198138461'

def parse1ashare(sid, p2s = False):
	global ndone
	if isinstance(sid, int) or isinstance(sid, np.int64):
		if sid < 10:
			sid = '00000' + str(sid) + '.SZ'
		elif sid < 100:
			sid = '0000' + str(sid) + '.SZ'
		elif sid < 1000:
			sid = '000' + str(sid) + '.SZ'
		elif sid < 10000:
			sid = '00' + str(sid) + '.SZ'
		elif sid >= 300000 and sid < 600000:
			sid = str(sid) + '.SZ'
		elif sid >= 600000:
			sid = str(sid) + '.SS'

	sdc = yfsi.get_data(sid, start_date='01/01/2012')[20:-3]
	if len(sdc) < 90:
		#print(f'{sid} too short history data')
		ndone += 1
		return
	del sdc['ticker']
	sdc = sdc.fillna(method = 'ffill')
	pprice = sdc['adjclose']
	t = sdc['open'] - sdc['close']
	pdiff = (t / t.max()) 
	pdiff[pdiff >= 0.45] = pprice.max()
	pdiff[pdiff < 0.45] = 0
	t = sdc['volume'] * ((sdc['close'] + sdc['open'] + sdc['high'] + sdc['low']) / 4)
	pvol = (t / t.max()) 
	pvol[pvol >= 0.45] = pprice.max() / 2
	pvol[pvol < 0.45] = 0

	tsd = pd.DataFrame(pprice)
	tsd['diff'] = pdiff
	tsd['vol'] = pvol
	sigdif = 0
	sigvol = 0
	if len(pdiff) > 0 and pdiff[-1] > pprice.max() / 2:
		sigdif = 1
	if len(pvol) > 0 and pvol[-1] > pprice.max() / 3:
		sigvol = 1
	if sigdif or sigvol:
		global ctx
		ctx += f'-----------\n{sid} signal diff={sigdif} vol={sigvol}\n'
		print(f'-----------\n{sid} signal diff={sigdif} vol={sigvol}')
	if p2s:
		tsd.plot()
		plt.show()
	ndone += 1



if sid and len(sid) >= 6:
	parse1ashare(sid, True)
else:
	shheader = {
		'X-Requested-With': 'XMLHttpRequest', 
		'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
		'Referer': 'http://www.sse.com.cn/assortment/stock/list/share/'
	}
	req = urllib.request.Request(sh, headers = shheader)
	resp = urllib.request.urlopen(req)
	if not resp:
		print(f'Cannot open stock list on {sh}')
		exit(1)
	r = resp.read().decode('gb2312')
	if not r:
		print('Unknown char encoding on SH')
		exit(2)
	t = io.StringIO(r)
	a = pd.read_csv(t, sep = '\t')
	if a.empty or len(a.iloc[:, 0]) == 0 or a.iloc[0, 0] != 600000:
		print('Unexpected format, maybe SH website is changed')
		exit(3)
	sids = pd.Series(a.iloc[:, 0])
	
	urllib.request.urlretrieve(sz, 'sz.xlsx')
	b = pd.read_excel('sz.xlsx')
	if not r:
		print('Cannot open stock lsit file on SZ')
		exit(4)
	if b.empty or len(b.iloc[:, 4]) == 0 or b.iloc[0, 4] != 1:
		print('Unexpected format, maybe SZ website is changed')
		exit(5)

	sids = sids.append(pd.Series(b.iloc[:, 4]), ignore_index = True, verify_integrity = True)

	sids.apply(parse1ashare)
	
	while (ndone < len(sids)):
                print(f'{len(sids) - ndone} stock need to be finished')
                sleep(5)

	if len(ctx) > 0:
                print('sending email...')
		s = smtplib.SMTP(host = 'smtp.qq.com', port = 587)
		s.starttls()
		s.login('@qq.com', '')
		s.sendmail('@qq.com', ['@qq.com'], f'Subject: daily result\n\n{ctx}')
		s.quit()
