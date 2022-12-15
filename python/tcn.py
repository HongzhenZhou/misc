#!env python

import torch
import random
import argparse
import numpy as np
import pandas as pd
import yahoo_fin.stock_info as yfsi
import matplotlib.pyplot as plt
from darts import TimeSeries
from darts.models import TCNModel

random.seed(42)
np.random.seed(42)
torch.manual_seed(42)

parser = argparse.ArgumentParser(usage='Inquire the price for stock, need the stock ID argument')
parser.add_argument('--sid', '-s', type = str, required = True, help = 'stock ID')
parser.add_argument('--epochs', '-e', type = int, help = 'epochs')
parser.add_argument('-p', action='store_true')
args = parser.parse_args()
sid = args.sid
epochs = args.epochs if args.epochs else 900

if sid and len(sid) >= 6:
	if len(sid) == 6:
		sid += '.SZ' if int(sid[0]) < 6 else '.SS'

	yfd = yfsi.get_data(sid, start_date='02/11/2013')[20:]
	if len(yfd) < 90:
		print(f'Too short history array data for {sid}')
		exit(1)
	print(f'{sid} last close price on {yfd.index[-1]}: {round(yfd["close"][-1], 2)}')
	hld = yfsi.get_data('CNH=F', start_date='02/11/2013')
	hld = hld[hld.index.isin(yfd.index)]
	yfd = yfd[yfd.index.isin(hld.index)]
	sdc = yfd[:]
	sdc['time'] = sdc.index
	sdc.index = pd.RangeIndex(0, len(sdc))
	sdc = sdc.fillna(method = 'ffill')
	hld.index = pd.RangeIndex(0, len(hld))
	hld = hld.fillna(method = 'ffill')

	pprice = sdc['adjclose']
	pprice.name = 'price'
	t = sdc['open'] - sdc['close']
	pdiff = (t / t.max()) * 100
	t = sdc['high'] - sdc['low']
	pwidth = (t / t.max()) * 100
	t = sdc['volume'] * ((sdc['close'] + sdc['open'] + sdc['high'] + sdc['low']) / 4)
	pvol = (t / t.max()) * 10000
	pvol.name = 'vol'
	prmb = (hld['adjclose'] / hld['adjclose'].max()) * 100

	tsd = pd.DataFrame(pprice, columns = ['price'])
	psd = pd.DataFrame(pvol, columns = ['vol'])
	psd['rmb'] = prmb
	psd['diff'] = pdiff
	psd['width'] = pwidth
	psd['time_index'] = psd.index
	tsdd = TimeSeries.from_dataframe(tsd)
	psdd = TimeSeries.from_dataframe(psd)

	train, val = tsdd[0 : -90], tsdd[-90 : ]
	train_cov, val_cov = psdd[0 : -90], psdd[-90 : ]
	m = TCNModel(30, 10, n_epochs = epochs, dropout = 0.1, dilation_base = 2, weight_norm = True, kernel_size = 5, num_filters = 3, random_state = 0)
	#m.fit(tsdd, epochs = epochs, past_covariates = [psdd])
	m.fit(series = train, past_covariates = train_cov, val_series = val, val_past_covariates = val_cov, verbose = False)
	#p = m.historical_forecasts(series = tsdd, past_covariates = psdd, start = 0.1, forecast_horizon = 1, retrain = False, verbose = False)
	p = m.predict(10, series = tsdd, past_covariates = psdd)
	print('-----------------------')
	print(f'>>>> {epochs} {yfd.index[-1]}')
	print('+++++')
	print(p)
	if args.p:
		tsd.plot()
		p.plot(label = f'{sid} forecast the next close price after {yfd.index[-1]}, low_quantile=0.05, high_quantile=0.95')
		plt.legend()
		plt.show()
	print('-----------------------')

