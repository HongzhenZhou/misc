#!env python

import argparse
import numpy as np
import pandas as pd
import yahoo_fin.stock_info as yfsi
import matplotlib.pyplot as plt
from darts import TimeSeries
from darts.models import RNNModel
from darts.models import TCNModel
from darts.utils import timeseries_generation as tg
from pytorch_lightning.callbacks.early_stopping import EarlyStopping

np.random.seed(42)

parser = argparse.ArgumentParser(usage='Inquire the price for stock, need the stock ID argument')
parser.add_argument('--sid', '-s', type = str, required = True, help = 'stock ID')
parser.add_argument('--epochs', '-e', type = int, required = True, help = 'epochs')
args = parser.parse_args()
sid = args.sid
epochs = args.epochs

if sid and len(sid) > 6:
	yfd = yfsi.get_data(sid, start_date='01/01/2012')[5:]
	if len(yfd) < 90:
		print(f'Too short history array data for {sid}')
		exit(1)
	sdc = yfd[:-4]
	sdc['time'] = sdc.index
	print(sdc['time'][-1])
	del sdc['ticker']
	sdc.index = pd.RangeIndex(0, len(sdc))
	sdc = sdc.fillna(method = 'ffill')

	pprice = sdc['adjclose']
	t = sdc['open'] - sdc['close']
	pdiff = (t / t.max()) * 100
	t = sdc['high'] - sdc['low']
	pwidth = (t / t.max()) * 100
	t = sdc['volume'] * ((sdc['close'] + sdc['open'] + sdc['high'] + sdc['low']) / 4)
	pvol = (t / t.max()) * 10000
	pprice.name = 'price'
	pvol.name = 'vol'

	tsd = pd.DataFrame(pprice, columns = ['price'])
	psd = pd.DataFrame(pvol, columns = ['vol'])
	psd['diff'] = pdiff
	psd['width'] = pwidth
	psd['time_index'] = psd.index
	tsdd = TimeSeries.from_dataframe(tsd)
	psdd = TimeSeries.from_dataframe(psd)

	my_stopper = EarlyStopping(monitor = 'train_loss', patience = 10, min_delta = 0.05, mode = 'min',)

	#m = TCNModel(14, 1, pl_trainer_kwargs = {"accelerator": "cpu", "callbacks": [my_stopper]})
	#m = TCNModel(14, 1, pl_trainer_kwargs = {"accelerator": "cpu"})
	m = TCNModel(30, 1)
	m.fit(tsdd, epochs = epochs, past_covariates = [psdd])
	p = m.predict(1, past_covariates = [psdd])
	print('-----------------------')
	print(f'>>>> {epochs} {yfd.index[-4]}')
	print('+++++')
	print(p[0][0][0])
	#tsd.plot()
	#p.plot(label = 'predict')
	#plt.show()
	print('-----------------------')

	#tsd['vol'] = pvol
	#tsd['diff'] = pdiff
	#tsd['width'] = pwidth
	#tsdd = TimeSeries.from_dataframe(tsd)
	
	#m = RNNModel(4)
	#m.fit(tsdd, epochs = 100)
	#p = m.predict(1)
	#print('-----------------------')
	#print(p)
	#print('-----------------------')



