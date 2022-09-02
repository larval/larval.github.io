const $L = {

	/* [_] INTERNALS / DEFAULTS */
	_stageData: null,
	_stageDataSortByColumn: 0,
	_stageDataHistoryIndex: -1,
	_stageDataHistory: [],
	_notifyTitleInterval: null,
	_notifyAllowed: null,
	_notifyExceptions: {},
	_animationsComplete: false,
	_forceContentTableShrink: false,
	_nextStagePollTimeout: null,
	_nextStagePollLong: 300,
	_nextStagePollShort: 30,
	_nextStagePollCompleteEpoch: 0,
	_marqueeLoopSeconds: 90,
	_marqueeInterval: null,
	_marqueeFlashTimeout: null,
	_marqueeBlinkHtml: '<span class="l_marquee_blink">&#8226;</span>',
	_emptyCellHtml: '<div class="l_none">&#8226;</div>',
	_charUp: "\u25bc ",
	_charDown: "\u25b2 ",
	_charHalt: "\u25a0 ",
	_charCrypto: '*',
	_charFutures: '^',
	_contentTableRowCountThatAreInView: 10,
	_title:	document.title,
	_swipeStartPosition: null,
	_na_id: 'l_na',
	_keysIgnore: ['ShiftRight','ShiftLeft'],
	_keyRow: 0,
	_keyMapIndexDefault: 'Y',
	_keyMapIndex: null,
	_keyMap: {
		A: ['https://www.seekingalpha.com/symbol/@', 'https://www.seekingalpha.com/symbol/@/options', 'https://www.seekingalpha.com/symbol/@-USD'],
		B: ['https://www.barchart.com/stocks/quotes/@', 'https://www.barchart.com/stocks/quotes/@/options', 'https://www.barchart.com/crypto/coins/@'],
		C: ['https://www.cnbc.com/quotes/@', 'https://www.cnbc.com/quotes/@?tab=options', 'https://www.cnbc.com/quotes/@.CM='],
		D: ['https://research.tdameritrade.com/grid/public/research/stocks/summary?symbol=@'],
		E: ['https://www.etrade.wallst.com/v1/stocks/snapshot/snapshot.asp?symbol=@'],
		F: ['https://www.finviz.com/quote.ashx?t=@',  null, 'https://www.finviz.com/crypto_charts.ashx?t=@USD'],
		G: ['https://www.benzinga.com/quote/@', null, 'https://www.benzinga.com/quote/@-USD'],
		H: ['https://www.stockcharts.com/h-sc/ui?s=@'],
		I: ['https://www.investing.com/search/?q=@'],
		J: ['https://www.wsj.com/market-data/quotes/@', 'https://www.wsj.com/market-data/quotes/@/options'],
		K: ['https://www.morningstar.com/stocks/xnas/@/quote'],
		L: ['https://www.fool.com/quote/@', null, 'https://www.fool.com/quote/crypto/@'],
		M: ['https://www.marketwatch.com/investing/stock/@', 'https://www.marketwatch.com/investing/stock/@/options', 'https://www.marketwatch.com/investing/cryptocurrency/@USD'],
		N: ['https://money.cnn.com/quote/quote.html?symb=@'],
		O: ['https://www.cboe.com/delayed_quotes/@', 'https://www.cboe.com/delayed_quotes/@/quote_table'],
		P: ['https://eresearch.fidelity.com/eresearch/goto/evaluate/snapshot.jhtml?symbols=@'],
		Q: ['https://www.nasdaq.com/market-activity/stocks/@', 'https://www.nasdaq.com/market-activity/stocks/@/option-chain'],
		R: ['https://www.robinhood.com/stocks/@', null, 'https://www.robinhood.com/crypto/@'],
		S: ['https://www.stocktwits.com/symbol/@', null, 'https://www.stocktwits.com/symbol/@.X'],
		T: ['https://www.tradestation.com/research/stocks/@'],
		U: ['https://www.gurufocus.com/stock/@'],
		V: ['https://www.tradingview.com/chart/?symbol=@', null, 'https://www.tradingview.com/chart/?symbol=@USD'],
		W: ['https://www.twitter.com/search?q=%24@', null, 'https://www.twitter.com/search?q=%24@.X'],
		X: ['https://www.foxbusiness.com/quote?stockTicker=@'],
		Y: ['https://finance.yahoo.com/quote/@', 'https://finance.yahoo.com/quote/@/options', 'https://finance.yahoo.com/quote/@-USD', 'https://finance.yahoo.com/quote/@=F'],
		Z: ['https://www.zacks.com/stock/quote/@', 'https://www.zacks.com/stock/quote/@/options-chain']
	},
	_taMap: {
		AS: ['Ascending triangle', 'asc<span>&nbsp;triangle</span>', 'F'],
		CD: ['Channel down', 'c<span>hannel&nbsp;</span>down', 'F'],
		CH: ['Channel', 'chan<span>nel</span>', 'F'],
		CU: ['Channel up', 'c<span>hannel&nbsp;</span>up', 'F'],
		D1: ['Barchart directional top 1%', '<span>&nbsp;barchart&nbsp;</span>top&nbsp;1%', 'B'],
		DB: ['Double bottom', '2x&nbsp;bot<span>tom</span>', 'F'],
		DE: ['Descending triangle', 'desc<span>&nbsp;triangle</span>', 'F'],
		DT: ['Double top', '2x&nbsp;top', 'F'],
		HI: ['Inverse head and Ssoulders', 'inv<span>erse</span>&nbsp;h&amp;s', 'F'],
		HS: ['Head and shoulders', 'h&nbsp;&amp;&nbsp;s', 'F'],
		HZ: ['Horizontal S/R', 's&nbsp;&amp;&nbsp;r', 'F'],
		MB: ['Multiple bottoms', '&gt;2x&nbsp;bot<span>tom</span>s', 'F'],
		MT: ['Multiple tops', '&gt;2x&nbsp;tops', 'F'],
		S1: ['Barchart strength top 1%', '<span>&nbsp;barchart&nbsp;</span>top&nbsp;1%', 'B'],
		TR: ['Technical resistance', 'resist<span>ance</span>', 'F'],
		TS: ['Technical support', '<span>tech&nbsp;</span>support', 'F'],
		WD: ['Wedge down', 'wedge<span>&nbsp;down</span>', 'F'],
		WE: ['Wedge', 'wedge', 'F'],
		WU: ['Wedge up', 'wedge<span>&nbsp;up</span>', 'F']
	},
	_symbolOverrideMap: { '^VIX': '^VIX' },
	_audioAlert: 'larval.mp3', _audioTest: 'data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAgAAAQdgAyMjI8PDxCQkJKSkpTU1NbW1tiYmJoaGhubm5udXV1e3t7gYGBh4eHjo6OlJSUmpqaoaGhoaenp62trbS0tLq6usDAwMfHx83NzdPT09Pa2trg4ODm5ubt7e3z8/P5+fn///8AAAAATGF2YzU4LjEzAAAAAAAAAAAAAAAAJAXAAAAAAAAAEHarUeu2AAAAAAAAAAAAAAAAAAAAAP/7sGQAAACLAFMVAAAAAAAP8KAAAQt4x1W5CAAAAAA/wwAAAApAD////ggGMHAxwQOf1g+D93AAlAAAktziZCAAAABCKFUwLn/Wpbf/9nXQPGJoTw5I9mo558opDkjQYthiUBvJhA3IgO08sghGkPJ8e0DFMrE8T4txeMi4VWQKCBoThJoPmSJAioaJmpGDmE8qcGAAAACLESGAAXgmdX/////Jr1RCODjmT0O3SrW4S0S8ekMLOMIK51hDcelefsWjsM9hjzYAAWAXoyggACwi9Jf/QWo/I/XFhoUSEtWn8eRsu1jSdv708NaE1dahOBlOebAAoAC9GCEAALkyqRS/20Km4AGQV63ICdySNmrpT/nvDvH+gy9vv+sF2FZgBaSSwABuwHSUGUSGWt30AznhGXJWceHwaWC7FIFKaC4v1wkSFw26F8sACaqXkEKAAk+XGSzC4mkEpddOLHuMKpCwu/nQkaCCiDw4UJihgsIkCCpIu89DDDuwAsAzf4UiAAX0ChfTMov7f+3najILDqu/k+47//ff6fTrx0/6amsLggbHBQi9u7ALv1oAAAOBlDCNEXI0S5IaIxXf/MS5+wg41upO6pfCRob+7n337v839+d2J41gGKBp2gAMy+2ALyS1xpa/UtcaK92z2XSIoN2NZoKAL9WtnfaSj/K+T5GmLeB8+dXx/+IQxpwcqgvsAAzNz7QpgAFbI0yJkyXP/4XQpct1WpPlLKuQsHDoN6DJ3XUo8WExodqvOBUIVugAaAd7q3AAE7YBpOA6Tj17wx7iLniQ7z4YBkMhIStYHXvsszjXEDZIIvDpw84Iu7AAsA1b//swZPAA8ZswVn9IYAIAAA/w4AABBZSXZegAbkAAAD/AAAAERAAAC0FJ8BkmZaAXpT/a06wtirRCx84x7x6FtfQ2o1KsIuQDyNIAAROMHpaAkmZf//BIsJCwsRekKvGsFZZUc2x+IksSJjFzCAAAiAAB7dAAAqnNUv/a2qotk/beuXRmopbUlQya/ZDawz1WNgAOAB/QPi4KCTvO//sQZPwE8VIS2XogEyIAYBpgBAABBRARZ+YxIAABgGtAEAAEf+RrFz1CUIkXTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVRwAPwABwAAAC+RFCfAIT//+bUxGAAK7BRb/+yBk9ADxgwRZey8wEABgGyAEAAEFkEtv6LBAaAKAa0AQAARJTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVCQAAkAAAAAALpO9Q1hf6hdpMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqq//swZPQB8Y4TWnnhEeoBwCpQLAABBmhDZ+yBaKgFgGhBAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqHwAAAAZtxAcbGoAFAAUjwJv+t0xBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVTAPAAARKoF9LhRhDgABAAARRQMf6A41TEFNRTMuMTAw//sgZPuA8XAYXHogGagAoBrQBAABBdgRb+exgCABgGzAEAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVCYAEAA/qsR8QIQAAUACRZnfhoMpMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGT7hPE7BFn5LEgIAGAbUAQAAQTcD2HnsSAgAYBtABAABKqqqqqqqqqqqqqqqqqqqqqqqqqqFAAAAARYQ4ADn9AJqkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZPYB8RwvV/ogE7oAYBsQBAABApQHV6wIACABgGrAEAAEqqqqqqqqqqqqqqqqqqqqqhAAKAAEXt9SFoAFAAckg/8vTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk6ofwkwLV6iIACABgGhAEAAEA1AtWhpggMAGAaEAQAARVVVVVVVVVVVVVVVVVVVVVVQADAAAPOf0hYkAatG/QJ0tMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTmD/BkANfxYAAIAGAaUAQAAQBsA14FgAAgAYBrABAABFVVVVVVVVVVVVVVVVVVVVVVVVVVVVUGR2QA4Aos340OtUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZOcD8EUC1aICCAgAYBsABAABATAFUogAACABgGtAEAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUQCAAACF5/JsbiTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk6QPwUAFVQeAADABgGsAEAAEBeAlbxQgAIAGAasAQAASqqqqqqqqqqqqqqqqqqqqqqqqAAAC0uxinpVhAAoJ+kO1MQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTng/BJAVKh4AAIAGAaYAQAAQEgB06FhAAgA4BnwGAABFVVVVVVVVVVVVVVVVVVVVVVVYAAAFgX0vDlAXTAQY8MqkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZOQL8DAA1KFgAAoAYBqABAABALgFVIUAACABgGlAEAAEqqqqqqqqqqqqqqqqqqqqqqpACAAAC5NnhjABgBNqPuJVTEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/+xBk5gPwPQDUIWAACABgGhAEAAEBHAVQhQAAIAAAP8AAAARVVVVVVVVVVVVVVVVVVVVVVcIAAIEAV3nSsAAgAIY99ZlMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/7EGTli/BEAVFB4AAIAAAP8AAAAQDkBUEHgAAgAYBowBAABFVVVVVVVVVVVVVVVVVVVVVVgAEAAAlyn4egATQ4S7aWqUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZOMD8BABUIGgAAgAYBpABAABAPgFRwaAACABgGkAEAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVYAAAVsNkGGQ/rHqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk4o/wPwHQwYEACABgGiAEAAEALAU+AwAAIAAAP8AAAASqqqqqqqqqqqqqqqqqqqqqqkAAADcSGXI7kwACABuH/lpMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGTlA/BDAc8p4QAMAAAP8AAAAQDIBT6hgAAgAAA/wAAABKqqqqqqqqqqqqqqqqqDAAFNZ3wVNyAFe2sb97f///6ZekxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZOUH8D0BTqjAAAgAAA/wAAABANAFPqWAACAAAD/AAAAEqqqqQAIAABl/Ej////9Bb+5VCgFABwd5tpz////IL/5aTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk5YPwQgDQQWAACAAAD/AAAAEA5AVDBIAAIAAAP8AAAASqqqqq4AgAIAOK+f////5Qw7/ILwAPWJf3f///5Mg//RVMQU1FMy4xMDBVVVVVVVVVVVVVVVVVVVVVVYQAE2AAQABI4//7EGTlg/BDAU+oQAAIAAAP8AAAAQD0Bz8BAAAgAAA/wAAABD4cEhkt///+ZDwNf1y3ADAAF7xD0JDX///+LGyX1RHEikxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZOWD8EIBT8DAAAgAAA/wAAABAPADPKeAADAAAD/AAAAEqqqEAAMABAU0Fvzzv///9RD9bHrjYACdhtvx//////+qTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk4w/wLAFQKeAADgAAD/AAAAEAnAU8BAAAIAAAP8AAAASqoAABayj2f////86iCAAAAAAAE/VPTwwCtpm8j////+xMQU1FMy4xMDCqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGTlg/BHAc8oQgAIAAAP8AAAAQDcBUEFgAAgAAA/wAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqkxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZOeH8D8BUKngAAwAAA/wAAABAXQHQQeEAAAAAD/AAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk7IPwewDQQWAAAAAAD/AAAAEBzAFDAAAAAAAAP8AAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGTsBfB+AVFAYAAAAAAP8AAAAQGUBUCkgAAAAAA/wAAABKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZPKB8LUBUWFgAAAAAA/wAAABAlgFQwYAAAAAAD/AAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+xBk7QfwkgHRWeAAAAAAD/AAAAEBkAVIhYAAAAAAP8AAAASqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqv/7EGTtgABZAVAtPAAAAAAP8KAAAQKcCUKY8AAAAAA/wwAAAKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq//sQZN2P8AAAf4cAAAgAAA/w4AABAAABpAAAACAAADSAAAAEqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=',

	/* [$] SHORTHAND / COMMON */
	D: document,
	E: id => $D.getElementById(id),
	F: (number, digits) => {
		if(number > 999999999)
			return (number/1000000000).toFixed(digits) + 'B';
		else if(number > 999999)
			return (number/1000000).toFixed(digits) + 'M';
		else if(number > 999)
			return (number/1000).toFixed(digits) + 'K';
		else 
			return number.toString();
	},
	H: string => {
		const p=$D.createElement('p');
		p.textContent = string;
		return(p.innerHTML);
	},
	I: string => {
		const p=$D.createElement('p');
		p.innerHTML = string;
		return(p.textContent || p.innerText || '');
	},
	N: (number, digits) => number.toLocaleString(undefined, { minimumFractionDigits: digits,  maximumFractionDigits: digits }),
	P: (count, total) => Math.round(count / total * 100),
	T: tag => $D.getElementsByTagName(tag),
	U: string => (string?string[0]:'').toUpperCase() + string.substring(1),
	W: window,

	/* [$] ENUMERATIONS */
	SYM:0, NAM:1, PCT5:2, PCT:3, PRC:4, VOL:5, OPT:6, OIV:7, ERN:8, PRC5:9, VOL5:10, NWS:11, LNK:12, HLT:2, TAN:8,
	KSTK:0, KOPT:1, KCRP:2, KFTR:3,

	/* [$] EVENTS */
	onload: () => {
		for(let k of Object.keys($L)) {
			window[k[0]=='_'?k:('$'+k)] = $L[k];
			if(k.substr(0,2) != 'on')
				continue;
			else if(typeof window[k] != 'undefined')
				window.addEventListener(k.substr(2), $L[k]);
			else if(typeof document[k] != 'undefined')
				document.addEventListener(k.substr(2), $L[k]);
		}
		$settingsLoad();
		$notifySetup(true);
		$keyMapSetup();
		$getStageData(false);
		setTimeout($animationsComplete, 6000);
	},
	onclick: () => { $notifySetup(); },
	onresize: () => {
		$settingsButtonToggle(true);
		$updateContentTableRowCountThatAreInView();
	},
	onscroll: () => {
		const e=$D.documentElement, b=$D.body,
			x=$W.innerWidth||e.clientWidth||b.clientWidth, y=$W.innerHeight||e.clientHeight||b.clientHeight,
			s=$W.pageYOffset||e.scrollTop, scrolledDown=s>$E('l_fixed').offsetHeight||$E(_na_id),
			ll=$E('l_logo'), lf=$E('l_fixed'), lal=$E('l_afterhours_left'), lar=$E('l_afterhours_right');
		ll.style.transform = scrolledDown ? 'scale(0.5)' : 'scale(1)';
		lf.style.top = scrolledDown ? '-28px' : '0';
		lf.style.maxHeight =  scrolledDown ? '100px' : '';
		lar.style.height = lal.style.height = scrolledDown ? '72px' : '';
	},
	ontouchstart: e => {
		if($onclick)
			$onclick();
		_swipeStartPosition = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
	},
	ontouchend: e => {
		if(!_swipeStartPosition)
			return;
		const swipeMovement = [_swipeStartPosition[0]-e.changedTouches[0].clientX, _swipeStartPosition[1]-e.changedTouches[0].clientY],
			width = $W.innerWidth||$D.documentElement.clientWidth||$D.body.clientWidth,
			height = $W.innerHeight||$D.documentElement.clientHeight||$D.body.clientHeight,
			movementPercent = [Math.abs(swipeMovement[0])/width*100, Math.abs(swipeMovement[1])/height*100],
			movementWeighting = (movementPercent[0]+1) / (movementPercent[1]+1);
		if(movementPercent[0] > 25 && movementWeighting >= 1)
			$gotoStageDataHistory(swipeMovement[0]);
		_swipeStartPosition = null;
	},
	onkeydown: e => {
		$animationsFastSplash();
		if(!_animationsComplete || !_stageData || (e && (e.ctrlKey || e.altKey || _keysIgnore.indexOf(e.code) >= 0)))
			return;
		const rows=$E('l_content_table').getElementsByTagName('tr');
		let lastKeyRow=_keyRow;
		if(!_keyRow) {
			for(let i=0; i < rows.length; i++) {
				if(!rows[i].matches(':hover'))
					continue;
				lastKeyRow = 0;
				_keyRow = i;
				break;
			}
		}
		if(e === false)
			_keyRow = 0;
		else if(e) {
			e.preventDefault();
			switch(e.code) {
				case 'Slash':      $marqueeHotKeyHelp(); break;
				case 'Tab':        $animationsToggle(null, e.shiftKey); break;
				case 'Home':       _keyRow = 1; break;
				case 'End':        _keyRow = rows.length - 1; break;
				case 'PageUp':     _keyRow-=_contentTableRowCountThatAreInView; break;
				case 'PageDown':   _keyRow+=_contentTableRowCountThatAreInView; break;
				case 'ArrowUp':    _keyRow--; break;
				case 'ArrowDown':  _keyRow++; break;
				case 'ArrowLeft':  $gotoStageDataHistory(-1); break;
				case 'ArrowRight': $gotoStageDataHistory(1); break;
				case 'Escape':     $gotoStageDataHistory(0); break;
				case 'Space':
					let toggleAlertException=$E('l_content_table').getElementsByTagName('tr')[_keyRow];
					if(toggleAlertException && (toggleAlertException=toggleAlertException.querySelector('.l_notify_enable,.l_notify_disable')) && toggleAlertException.onclick)
						toggleAlertException.dispatchEvent(new Event('click'));
					return;
				case 'Enter': case 'NumpadEnter':
					if(_keyRow && rows[_keyRow])
						rows[_keyRow].dispatchEvent(new Event('click'));
					return;
				default:
					let match=e.code.match(/^(Digit|Numpad)([0-9])$/);
					if(match)
						$setSortStageData(parseInt(match[2]));
					else if((match=e.code.match(/^Key([A-Z])$/))) {
						$setURLFormat(match[1], e.shiftKey);
						if(_keyRow && rows[_keyRow])
							rows[_keyRow].dispatchEvent(new Event('click'));
					}
					else
						$marqueeFlash(`The &quot;<span class='l_marquee_highlight'>${e.code}</span>&quot; key is not mapped, type &quot;<span class='l_marquee_highlight'>?</span>&quot; to see the supported hotkeys.`);
					return;
			}
		}
		if(_keyRow < 0)
			_keyRow = 0;
		else if(_keyRow >= rows.length)
			_keyRow = rows.length - 1;
		if(!lastKeyRow ^ !_keyRow) {
			const addOrRemove = (_keyRow?'add':'remove');
			if(lastKeyRow && rows[lastKeyRow])
				rows[lastKeyRow].classList.remove('l_tr_keyrow_selected');
			for(let i=1; i < rows.length; i++)
				rows[i].classList[addOrRemove]('l_tr_keyrow');
		}
		if(lastKeyRow && rows[lastKeyRow])
			rows[lastKeyRow].classList.remove('l_tr_keyrow_selected');
		rows[_keyRow].classList.add('l_tr_keyrow_selected');
		if(_keyRow > 0)
			rows[_keyRow].scrollIntoView({behavior:'smooth', block:'center'});
	},
	onvisibilitychange: () => {
		if(!_marqueeInterval || $D.visibilityState != 'visible')
			return;
		$marqueeIntervalReset();
		$marqueeUpdate(_marqueeLoopSeconds);
		if(_nextStagePollCompleteEpoch)
			$setNextStagePoll(_nextStagePollCompleteEpoch - $epochNow()); 
	},

	/* [$] FUNCTIONS */
	animationsFastSplash: () => {
		if(_animationsComplete || !_stageData)
			return;
		$animationsReset('l_logo', 'l_logo 0.5s ease 1 normal 0.5s forwards');
		$animationsReset('l_fixed', 'l_fixed 0.5s ease 1 normal forwards');
		$animationsReset('l_marquee_container', 'l_marquee_container 0.5s ease forwards');
		$E('l_logo_tag').style.display = 'none';
		$E('l_progress').style.display = 'block';
		$animationsComplete(true);
	},
	animationsComplete: fastSplash => {
		if(_animationsComplete)
			return;
		if(!fastSplash && $E(_na_id))
			$E(_na_id).className = _na_id;
		_animationsComplete = true;
		$E('l_fixed').style.cursor = 'default';
		$E('l_afterhours_left').style.display = $E('l_afterhours_right').style.display = (!_stageData||!_stageData['afterhours']?'none':'block');
		$setNextStagePoll(!_stageData||!_stageData['items'] ? _nextStagePollShort : $getSynchronizedNext());
		if($hasSettings() && _stageData && _stageData['top'] && _stageData['top'].length > 1)
			$marqueeUpdate(_marqueeLoopSeconds);
		else
			$marqueeInitiate(_marqueeLoopSeconds);
		$marqueeIntervalReset();
		$notifyPlayAudio(_audioTest);
		$updateLiveTable(true);
		if($isMobile() || localStorage.getItem(_na_id))
			$animationsToggle(false, null);
	},
	animationsToggle: (explicit, saveSettings) => {
		const animations = (typeof explicit == 'boolean' ? explicit : !!$E(_na_id));
		if(saveSettings)
			localStorage[animations?'removeItem':'setItem'](_na_id, _na_id);
		$D.body.id = animations ? '' : _na_id;
		if(_animationsComplete)
			$D.body.className = $D.body.id;
		if(_stageDataHistoryIndex >= 0)
			$updateStageDataHistory();
		else if(animations)
			$marqueeFlash(`Full animation experience has been restored${saveSettings?' and saved':''}.`);
		$keyModeReset();
		$W.scrollTo({top: 0, behavior: 'auto'});
		$onscroll();
	},
	animationsReset: (idOrElement, animation) => {
		const el=(typeof idOrElement=='string' ? $E(idOrElement) : idOrElement);
		el.style.animation = 'none';
		void el.offsetHeight;
		el.style.animation = animation;
	},
	keyMapSetup: () => {
		if(!(_keyMapIndex=localStorage.getItem('l_keymap_index')))
			_keyMapIndex = _keyMapIndexDefault;
		for(let key in _keyMap) {
			if(!_keyMap[key][$KOPT])
				_keyMap[key][$KOPT] = _keyMap[key][$KSTK];
			if(!_keyMap[key][$KCRP])
				_keyMap[key][$KCRP] = _keyMap[_keyMapIndexDefault][$KCRP];
			if(!_keyMap[key][$KFTR])
				_keyMap[key][$KFTR] = _keyMap[_keyMapIndexDefault][$KFTR];
		}
	},
	keyModeReset: () => {
		if(_keyRow)
			$onkeydown(false);
	},
	getSynchronizedNext: () => {
		if(!_stageData || !_stageData['next'])
			return(_nextStagePollLong);
		let next = Math.floor(_stageData['next'] - (new Date().getTime() / 1000)) + Math.floor(Math.random() * 10);
		if(next < 0 || next > _nextStagePollLong + _nextStagePollShort)
			next = _nextStagePollLong;
		return(next);
	},
	getStageData: updateView => {
		let xhr=new XMLHttpRequest(), url='//stage.larval.com/stage.json?ts='+new Date().getTime();
		xhr.open('GET', url);
		xhr.onload = e => {
			try {
				const json = JSON.parse(xhr.responseText);
				if(!json || !json['ts'] || (_stageDataHistory.length > 0 && _stageDataHistory[_stageDataHistory.length-1]['ts'] == json['ts'])) {
					xhr.onerror();
					return;
				}
				else if(_stageDataHistoryIndex >= 0)
					_stageDataHistory.push(structuredClone(json));
				else {
					_stageData = json;
					if(_stageDataHistory.length == 0 && localStorage.length == 0 && _stageData['afterhours']) {
						const now=new Date();
						if(now.getDay() != 0 && now.getDay() != 6)
							$E('l_include_futures').checked = true;
					}
					_stageDataHistory.push(structuredClone(_stageData));
					$sortStageData(false);
					_forceContentTableShrink = false;
					if(updateView)
						$updateLiveTable(true);
				}
				if(json['notify'])
					$marqueeFlash(json['notify'])
				$E('l_last_update').innerHTML = $epochToDate(json['ts']);
				$setNextStagePoll($getSynchronizedNext());
			}
			catch(e) { xhr.onerror(); }
		}
		xhr.onerror = () => { $setNextStagePoll(_nextStagePollShort); }
		xhr.send();
	},
	getHistoryData: () => {
		$marqueeFlash('Attempting to gather recent history from the server...');
		let xhr=new XMLHttpRequest(), url='//stage.larval.com/history.json?ts='+new Date().getTime();
		xhr.open('GET', url);
		xhr.onload = e => {
			try {
				let history = JSON.parse(xhr.responseText);
				if(!history || history.length < 2)
					xhr.onerror();
				else {
					let h = history.length;
					while(--h > 0) {
						if(history[h]['ts'] == _stageDataHistory[0]['ts'])
							break;
					}
					if(h > 0) {
						history.length = h;
						_stageDataHistory = history.concat(_stageDataHistory);
						_stageDataHistoryIndex = h - 1;
						$updateStageDataHistory();
					}
					else
						xhr.onerror();
				}
			}
			catch(e) { xhr.onerror(); }
		}
		xhr.onerror = () => { $marqueeFlash('Sorry, no additional history is available to rewind to at this time.'); }
		xhr.send();
		$getHistoryData = null;
	},
	gotoStageDataHistory: direction => {
		const lastIndex=_stageDataHistoryIndex;
		if(!direction) {
			_keyRow = 0;
			if(_stageDataHistoryIndex >= 0)
				_stageDataHistoryIndex = -1;
		}
		else if(direction > 0) {
			if(_stageDataHistory.length < 2 || _stageDataHistoryIndex < 0)
				$marqueeFlash('You are already viewing live data, use the <span class="l_marquee_highlight">&#8656;</span> key to rewind.');
			else if( _stageDataHistoryIndex + 2 >= _stageDataHistory.length)
				_stageDataHistoryIndex = -1;
			else
				_stageDataHistoryIndex++;
		}
		else if(direction < 0) {
			if($getHistoryData && _stageDataHistoryIndex == (_stageDataHistory.length < 2 ? -1 : 0))
				$getHistoryData();
			else if(_stageDataHistoryIndex < 0)
				_stageDataHistoryIndex = _stageDataHistory.length - 2;
			else if(_stageDataHistoryIndex > 0)
				_stageDataHistoryIndex--;
			else
				$marqueeFlash('<div onclick="$gotoStageDataHistory(0)">End of history, use <span class="l_marquee_highlight">&#8658;</span> to move forward or <span class="l_marquee_highlight">escape</span> to exit.</div>', true);
		}
		if(lastIndex !== _stageDataHistoryIndex)
			$updateStageDataHistory();
	},
	updateStageDataHistory: () => {
		const historyTotal=_stageDataHistory.length-1, historyIndex=_stageDataHistoryIndex<0?historyTotal:_stageDataHistoryIndex;
		_stageData = structuredClone(_stageDataHistory[_stageDataHistoryIndex >= 0 ? _stageDataHistoryIndex : historyTotal]);
		$sortStageData(true);
		const minutesAgo=Math.round(($epochNow()-_stageData['ts'])/60,0);
		if(historyIndex == historyTotal)
			$marqueeFlash('All caught up, exiting history mode...', true);
		else
			$marqueeFlash(`<div onclick="$gotoStageDataHistory(0)">Rewound to ${$epochToDate(_stageData['ts'])}: <span class='l_marquee_highlight_padded'>${minutesAgo} minutes ago</span>${$getHistoryData?'':' ['+$P(historyTotal-historyIndex,historyTotal)+'%]'}</div>`, true);
	},
	setNextStagePoll: seconds => {
		if(_animationsComplete) {
			$E('l_progress').style.display = 'block';
			$animationsReset('l_progress_display', `l_progress ${seconds}s linear forwards`);
		}
		if(_nextStagePollTimeout)
			clearTimeout(_nextStagePollTimeout);
		_nextStagePollTimeout = setTimeout($setNextStagePollComplete, seconds * 1000);
		_nextStagePollCompleteEpoch = $epochNow() + seconds;
	},
	setNextStagePollComplete: () => {
		if(_nextStagePollTimeout)
			clearTimeout(_nextStagePollTimeout);
		_nextStagePollTimeout = null;
		$getStageData(true);
	},
	forceNextStagePoll: () => { $setNextStagePollComplete(); },
	epochNow: () => Math.floor(Date.now() / 1000),
	epochToDate: epoch => new Date(epoch * 1000).toLocaleTimeString('en-US', {weekday:'short',hour:'numeric',minute:'2-digit',timeZoneName:'short'}),
	htmlPercent: number => {
		if(number > 0)
			return($N(Math.abs(number),2) + '%<span class="l_up">&#9650;</span>');
		else if(number < 0)
			return($N(Math.abs(number),2) + '%<span class="l_down">&#9660;</span>');
		else
			return(_emptyCellHtml);
	},
	settingsButtonToggle: forceClosed => {
		const controlHeight=($E('l_control').scrollHeight > 200 ? $E('l_control_table').scrollHeight : 250)+'px', grow=(!forceClosed && $E('l_control').style.height!=controlHeight);
		$E('l_control').style.height = (grow?controlHeight:'0px');
		$E('l_settings_button').innerHTML = (grow?'&#9660; settings &#9660;':'&#9650; settings &#9650;');
	},
	settingsSave: context => {
		for(let inputs=$T('input'), i=0; i < inputs.length; i++) {
			let input=inputs[i];
			if(input.type == 'checkbox')
				localStorage.setItem(input.id, input.checked ? 'true' : 'false');
			else if(input.type == 'range')
				localStorage.setItem(input.id, input.value);
		}
		if(context.id == 'l_audible' && context.checked)
			$notifyPlayAudio(_audioTest);
		$updateLiveTable(false);
	},
	settingsLoad: () => {
		const now=new Date();
		_na_id = $isMobile() ? 'l_nam' : 'l_na';
		if(localStorage.length == 0 && (now.getDay() == 0 || now.getDay() == 6))
			$E('l_include_crypto').checked = true;
		for(let i=0; i < localStorage.length; i++) {
			let input=$E(localStorage.key(i));
			if(!input || !input['type'])
				continue;
			if(input.type == 'checkbox')
				input.checked = (localStorage.getItem(input.id) == 'true');
			else if(input.type == 'range') {
				input.value = localStorage.getItem(input.id);
				$updateRangeDisplay(`${input.id}_display`, input.value);
			}
		}
		for(let id of ['l_range_up','l_range_down','l_range_volume'])
			$E(id).oninput();
	},
	updateRangeDisplay: (id, value) => {
		if($E(id))
			$E(id).innerHTML = (id=='l_range_volume_display' ? value : (value / 10).toFixed(1));
	},
	marqueeInitiate: (seconds, html) => {
		const m=$E('l_marquee'), mc=$E('l_marquee_content'), mcc=$E('l_marquee_content_clone');
		if(html) mc.innerHTML = html;
		mcc.innerHTML = '';
		void m.offsetWidth;
		const fullWidthPreClone=m.scrollWidth, viewWidthPreClone=m.offsetWidth;
		mcc.innerHTML = mc.innerHTML;
		$D.documentElement.style.setProperty('--marquee-start', `-${viewWidthPreClone}px`);
		$D.documentElement.style.setProperty('--marquee-end', `-${fullWidthPreClone}px`);
		$animationsReset(m, `l_marquee ${seconds}s linear infinite`);
	},
	marqueeUpdate: seconds => {
		if(!_stageData || !_stageData['top'] || _stageData['top'].length < 2)
			return;
		else if(_stageData['marquee']) {
			$marqueeInitiate(seconds, _stageData['marquee']);
			return;
		}
		let html='', rank=0, includeCrypto=$E('l_include_crypto').checked;
		for(let i in _stageData['top']) {
			let item=_stageData['top'][i], isMarketIndex=(item.length==3);
			if(isMarketIndex) {
				if(!html) html += '<span class="l_marquee_blink_wide">&#8226;</span>';
				html += `<div class="l_marquee_link" onclick="$openStockWindow('${item[0]}',event)"><span class='l_marquee_highlight_padded'>${$H(item[2])}</span>${item[1]<0?'&#9660;':'&#9650;'} ${Math.abs(item[1]).toFixed(2)}%</div> `;
			}
			else if(!includeCrypto && item[0][0] == _charCrypto)
				continue;
			else {
				if(!rank) html += '<span class="l_marquee_blink_wide">&#8226;</span>';
				html += `<div class="l_marquee_link" onclick="$openStockWindow('${item[0]}',event)"><span class='l_marquee_highlight_padded'>#${++rank}</span>${item[0]} &#177; ${item[1]}%</div> `;
				if(rank >= 20) break;
			}
		}
		$marqueeInitiate(seconds, html);
	},
	marqueeFlash: (message, priority) => {
		if(_marqueeFlashTimeout)
			clearTimeout(_marqueeFlashTimeout);
		if(_stageDataHistoryIndex >= 0 && (!message || !priority))
			return;
		$E('l_marquee_container').classList[$E(_na_id)?'add':'remove']('l_na_marquee_container_override');
		$E('l_marquee_flash').innerHTML = message ? message : '';
		$E('l_marquee').style.display = message ? 'none' : 'inline-block';
		$E('l_marquee_flash').style.display = message ? 'inline-block' : 'none';
		if(message) {
			$W.scrollTo({top: 0, behavior: 'smooth'});
			$marqueeIntervalReset();
			_marqueeFlashTimeout = setTimeout($marqueeFlash, 5000);
			$animationsReset('l_marquee_flash', 'l_content_fade_in 1s ease forwards');
		}
		else {
			$E('l_marquee_container').classList.remove('l_na_marquee_container_override');
			$marqueeUpdate(_marqueeLoopSeconds);
		}
	},
	marqueeIntervalReset: () => {
		if(_marqueeInterval)
			clearInterval(_marqueeInterval);
		_marqueeInterval = setInterval(() => { $marqueeUpdate(_marqueeLoopSeconds) }, _marqueeLoopSeconds * 1000);
	},
	marqueeHotKeyHelp: () => {
		let key, match, html=`${_marqueeBlinkHtml} The following hotkeys are available to quickly navigate your history and third party websites. ${_marqueeBlinkHtml} Use the <span class="l_marquee_highlight">tab</span> key to alternate animation modes. ${_marqueeBlinkHtml} Use <span class="l_marquee_highlight">&#8644;</span> arrow keys to rewind and navigate your backlog history. ${_marqueeBlinkHtml} Use <span class="l_marquee_highlight">&#8645;</span> arrow keys to navigate to a row followed by selecting one of these hotkeys: `;
		for(let key in _keyMap) {
			if((match=_keyMap[key][$KSTK].match(/([a-z]+)\.[a-z]+\//i)))
				html += `<div class="l_marquee_link" onclick="$setURLFormat('${key}',false)"><span class='l_marquee_highlight_padded'>${key}</span>${$H(match[1])}</div> `
		}
		html += `${_marqueeBlinkHtml} Hold down the <span class="l_marquee_highlight">shift</span> key to make your selection permanent. ${_marqueeBlinkHtml} The keys <span class="l_marquee_highlight">1-7</span> can be used to sort by each column.`;
		$W.scrollTo({top: 0, behavior: 'smooth'});
		$marqueeIntervalReset();
		$marqueeInitiate(_marqueeLoopSeconds, html);
	},
	notify: (notifyRows) => {
		$notifyClear();
		if(_stageDataHistory.length < 2)
			return;
		try {
			if(Notification && Notification.permission == 'granted') {
				void new Notification('Larval - Market volatility found!', {
					icon: 'icon-192x192.png',
					body: notifyRows.length > 0 ? 'Volatile stock(s): ' + notifyRows.map(a => (typeof a[$HLT]=='string'?_charHalt:(a[$PCT5]<0?_charUp:_charDown))+a[$SYM]).filter((v,i,s) => { return s.indexOf(v)===i; }).join(' ') : 'Larval - Market volatility found!'
				});
			}
			else 
				$notifyRequestPermission();
		}
		catch(e) { }
		notifyRows.push([]);
		_notifyTitleInterval = setInterval(() => {
			if(!$D.hidden || !_notifyTitleInterval)
				$notifyClear();
			else if(!notifyRows[0] || !notifyRows[0][0])
				$D.title = _title;
			else if($isHaltRow(notifyRows[0]))
				$D.title = notifyRows[0][$SYM] + ' | ' + (notifyRows[0][$HLT]?notifyRows[0][$HLT]:'HALTED');
			else
				$D.title = notifyRows[0][$SYM] + ' | ' + (notifyRows[0][$PCT5]<0?_charUp:_charDown) + $N(Math.abs(notifyRows[0][$PCT5]),2) + '% | ' + (notifyRows[0][$PCT]<0?_charUp:_charDown) + $N(Math.abs(notifyRows[0][$PCT]),2) + '%';
			notifyRows.push(notifyRows.shift());
		}, 1000);
		$notifyPlayAudio(_audioAlert);
		$W.scrollTo({top: 0, behavior: 'smooth'});
	},
	notifyClear: () => {
		if(_notifyTitleInterval) {
			clearInterval(_notifyTitleInterval);
			_notifyTitleInterval = null;
		}
		$D.title = _title;
	},
	notifyException: (symbol, disable) => {
		if(disable)
			_notifyExceptions[symbol] = true;
		else if(_notifyExceptions[symbol])
			delete _notifyExceptions[symbol];
		$updateLiveTable(false, true);
	},
	notifyPlayAudio: audio => {
		if(typeof audio != 'object' || !$E('l_audible').checked)
			return;
		let playPromise=audio.play();
		if (playPromise !== undefined) 
			playPromise.then(()=>{}).catch(e=>{});
	},
	notifyRequestPermission: () => {
		if(_notifyAllowed)
			return;
		try {
			Notification.requestPermission().then(status => {
				if (status === 'denied')
					_notifyAllowed = false;
				else if (status === 'granted')
					_notifyAllowed = true;
			});
		}
		catch(e) { }
	},
	notifySetup: allowFutureCall => {
		if(!$onclick)
			return;
		if(allowFutureCall !== true)
			$onclick = $D.removeEventListener('click', $onclick);
		if(typeof _audioTest == 'string')
			_audioTest = new Audio(_audioTest);
		if(typeof _audioAlert == 'string')
			_audioAlert = new Audio(_audioAlert);
		_audioAlert.load();
		$notifyRequestPermission();
		try { if(navigator.wakeLock) navigator.wakeLock.request('screen'); }
		catch (e) { }
	},
	openStockWindow: (symbolOrIndex, e) => {
		const classRefList=['l_ta','l_news','l_options','l_marquee_link','l_none','l_noclick'];
		let symbol='', urlType=$KSTK, classRef='', el=(e&&e.target?e.target:null);
		if(!el)
			return;
		if(el.nodeName == 'SPAN' && el.parentElement)
			el = el.parentElement;
		for(let c in classRefList)
			if(el.classList.contains(classRefList[c]) && (classRef=classRefList[c]))
				break;
		if(!classRef && ['TD','TR'].indexOf(el.nodeName) < 0)
			return;
		if(typeof symbolOrIndex == 'number') {
			symbol = _stageData['items'][symbolOrIndex][$SYM];
			switch(classRef) {
				case 'l_ta':
					const keyMap=_keyMap[el.dataset.keymap?el.dataset.keymap:_keyMapIndexDefault];
					$W.open(keyMap[$KSTK].replace('@', symbol), `${classRef}_${symbol}`).focus();
					return;
				case 'l_news':
					$W.open(_stageData['items'][symbolOrIndex][$LNK], `${classRef}_${symbol}`).focus();
					return;
				case 'l_options':
					urlType = $KOPT;
					break;
			}
		}
		else if(typeof symbolOrIndex == 'string')
			symbol = symbolOrIndex;
		if(_symbolOverrideMap[symbol]) {
			urlType = $KSTK;
			symbol = _symbolOverrideMap[symbol];
		}
		else if(symbol[0] == _charCrypto) {
			urlType = $KCRP;
			symbol = symbol.substr(1);
		}
		else if(symbol[0] == _charFutures) {
			urlType = $KFTR;
			symbol = symbol.substr(1);
		}
		$gotoURL(symbol, urlType, `larval_${symbol}`);
	},
	createURL: (symbol, urlType) => {
		let keyMap = _keyMap[_keyMapIndex];
		if(!keyMap)
			keyMap = _keyMap[_keyMapIndexDefault];
		return(keyMap[urlType].replace('@', symbol));
	},
	gotoURL: (symbol, urlType, windowName) => {
		$W.open($createURL(symbol, urlType), windowName).focus();
	},
	setURLFormat: (key, saveSettings) => {
		if(!_keyMap[key])
			return;
		_keyMapIndex = key;
		const domain=new URL(_keyMap[_keyMapIndex][$KSTK]), display=(domain && domain.hostname ? domain.hostname : url);
		if(saveSettings) {
			localStorage.setItem('l_keymap_index', _keyMapIndex);
			$marqueeFlash(`Links will now permanently direct to <span class='l_marquee_highlight'>${display}</span> by default.`);
		}
		else
			$marqueeFlash(`Links will now direct to <span class='l_marquee_highlight'>${display}</span> for this session, hold down <span class='l_marquee_highlight'>shift</span> to make it permanent.`);
	},
	setSortStageData: column => {
		if(_stageDataSortByColumn == -column || !column || column > $E('l_content_table').getElementsByTagName('th').length) {
			if(_stageData.itemsImmutable)
				_stageData.items = structuredClone(_stageData.itemsImmutable);
			_stageDataSortByColumn = 0;
		}
		else if(_stageDataSortByColumn == column)
			_stageDataSortByColumn = -column;
		else
			_stageDataSortByColumn = column;
		$sortStageData(true);
	},
	sortStageData: updateView => {
		if(_stageData && _stageDataSortByColumn) {
			if(!_stageData.itemsImmutable)
				_stageData.itemsImmutable = structuredClone(_stageData.items);
			_stageData.items = _stageData.items.sort((a, b) => {
				const column = Math.abs(_stageDataSortByColumn) - 1;
				if(a[column] === null || a[column] === false || a[column] === undefined)
					return 1;
				else if(b[column] === null || b[column] === false || b[column] === undefined)
					return -1;
				else if(typeof a[column] != typeof b[column])
					return _stageDataSortByColumn < 0 ? (typeof a[column]=='number'?1:-1) : (typeof a[column]=='number'?1:-1);
				else if(typeof a[column] == 'string')
					return _stageDataSortByColumn < 0 ? b[column].toUpperCase().localeCompare(a[column].toUpperCase()) : a[column].toUpperCase().localeCompare(b[column].toUpperCase());
				else if(typeof a[column] == 'number')
					return _stageDataSortByColumn < 0 ? a[column]-b[column] : b[column]-a[column];
			});
		}
		if(updateView)
			$updateLiveTable(false);
	},
	updateContentTableRowCountThatAreInView: () => {
		let rows=$E('l_content_table').getElementsByTagName('tr'), total=-5;
		for(let i=0; i < rows.length; i++) {
			const box=rows[i].getBoundingClientRect();
			if(box.top < $W.innerHeight && box.bottom >= 0)
				total++;
		}
		if(total < 10)
			total = 10;
		_contentTableRowCountThatAreInView = total;
		return(total);
	},
	hasSettings: () => localStorage && localStorage.length > 1,
	isMobile: () => 'ontouchstart' in $D.documentElement && $D.body.clientWidth/$D.body.clientHeight < 1,
	isHaltRow: row => row && row[$HLT] && typeof row[$HLT] == 'string',
	cell: (row, type) => {
		if(!row[type])
			return(_emptyCellHtml);
		switch(type) {
			case $SYM:
			case $OPT:
			case $ERN:
			case $NWS:
			case $TAN:
				return($H(row[type]));
			case $NAM:
				return(_forceContentTableShrink ? _emptyCellHtml : $H(row[type]));
			case $PCT:
				return($htmlPercent(row[type]));
			case $PCT5:
			case $HLT:
				return($isHaltRow(row) ? $H(row[type]?row[type]:'HALTED') : $htmlPercent(row[type]));
			case $VOL:
				return($F(row[type],1));
			case $VOL5:
				return('+' + $F(row[type],1));
			case $PRC:
				return('$' + $N(row[type],2));
			case $PRC5:
				return((row[type]<0?'-$':'+$') + $N(Math.abs(row[type]),2));
			case $OIV:
				return(($H(row[type] > 0 ? row[type] : ('~' + Math.abs(row[type])))) + '%iv');
			case $LNK:
				return(row[type]);
			default:
				return(_emptyCellHtml);
		}
	},
	cellRollover: (row, primary, secondary, shrinkMode) => {
		let cell='<div class="l_hover_container">', left=(secondary==$NWS);
		if(row[secondary] && !shrinkMode)
			cell += `<span class="${left?'l_hover_active_left':'l_hover_active'}">${$cell(row,secondary)}</span><span class="l_hover_inactive">`;
		cell += $cell(row,primary);
		if(row[secondary] && !shrinkMode)
			cell += '</span>';
		cell += '</div>';
		return(cell);
	},
	popoutLiveTableRow: row => {
		if(row[$TAN] && typeof row[$TAN] == 'string' && _taMap[row[$TAN]])
			return(`<div class="l_notify_popout l_ta" title="${_taMap[row[$TAN]][0]}" data-keymap="${_taMap[row[$TAN]][2]?_taMap[row[$TAN]][2]:_keyMapIndexDefault}">&#128200;&nbsp;${_taMap[row[$TAN]][1]}</div>`);
		else if(row[$ERN] && row[$NWS])
			return(`<div class="l_notify_popout l_news" title="News and earnings on ${$cell(row,$ERN)}">&#128197;&nbsp;${$cell(row,$ERN)}<span>&nbsp;+&nbsp;news</span></div>`);
		else if(row[$ERN])
			return(`<div class="l_notify_popout l_noclick" title="Earnings on ${$cell(row,$ERN)}">&#128198;&nbsp;${$cell(row,$ERN)}<span>&nbsp;earnings</span></div>`);
		else if(row[$NWS])
			return(`<div class="l_notify_popout l_news" title="Company news">&#128197;&nbsp;<span>recent </span>news</div>`);
		return('');
	},
	updateLiveTable: (doNotify, doNotResetKeyRow) => {
		if(!_stageData)
			return;
		const columns=['symbol', _forceContentTableShrink?_emptyCellHtml:'company', '~5min%','total%','price','volume','options'];
		const rangeUp=parseFloat($E('l_range_up_display').innerHTML), rangeDown=parseFloat($E('l_range_down_display').innerHTML), rangeVolume=parseInt($E('l_range_volume_display').innerHTML)*1000, optionsOnly=$E('l_options_only').checked, includeCrypto=$E('l_include_crypto').checked, includeFutures=$E('l_include_futures').checked;
		$E('l_afterhours_left').style.display = (!_animationsComplete||!_stageData['afterhours']?'none':'block');
		$E('l_afterhours_right').style.display = (!_animationsComplete||!_stageData['afterhours']?'none':'block');
		let notifyRows=[], notify=false, notifyControl='', rowClass='', htmlRow='', htmlPriority='', htmlNormal='';
		let html='<tr>';
		for(let c=1,className=''; c <= columns.length; c++) {
			if(_stageDataSortByColumn == c)
				className = 'l_content_table_header_selected';
			else if(_stageDataSortByColumn == -c)
				className = 'l_content_table_header_selected_reverse';
			else
				className = 'l_content_table_header';
			html += `<th onclick="$setSortStageData(${c})" id="l_content_table_header_${c}" class="${className}">${columns[c-1]}</th>`;
		}
		html += '</tr>';
		if(doNotify)
			$notifyClear();
		for(let i=0; i < _stageData['items'].length; i++) {
			const row=_stageData['items'][i], notifyExcept=!!_notifyExceptions[row[$SYM]];
			if($isHaltRow(row)) {
				if(notifyExcept)
					continue;
				notify=$E('l_notify_halts').checked && (!optionsOnly||row[$OPT]);
				rowClass = (notify ? 'l_notify_halt' : 'l_halt');
				htmlRow = `<tr class="${rowClass}" onclick="$openStockWindow(${i},event)">
					<td>
					 <div class="l_notify_disable" title="Disable ${$cell(row,$SYM)} notifications for this session" onclick="$notifyException('${$cell(row,$SYM)}', true)">x</div>
					 ${$cell(row,$SYM)}
					</td>
					<td class="${row[$NWS]?'l_news':''}">${$cellRollover(row,$NAM,$NWS,_forceContentTableShrink)}</td>
					<td colspan="4">HALT: ${$cell(row,$HLT)}</td>
					<td class="${row[$OPT]?'l_options':''}">${$popoutLiveTableRow(row)}${$cellRollover(row,$OPT,$OIV)}</td>
					</tr>`;
			}
			else {
				notify=( !notifyExcept && ((((rangeUp&&row[$PCT5]>=rangeUp)||(rangeDown&&rangeDown>=row[$PCT5])) && (!row[$VOL]||row[$VOL]>=rangeVolume) && (!optionsOnly||row[$OPT])) || (row[$VOL]&&typeof row[$VOL]=='string') ));
				if((!includeCrypto && row[$OPT]=='crypto') || (!includeFutures && row[$OPT]=='futures'))
					continue;
				if(notify) {
					rowClass = `l_notify_${row[$PCT5]<0?'down':'up'}`;
					notifyControl = `<div class="l_notify_disable" title="Disable ${$cell(row,$SYM)} notifications for this session" onclick="$notifyException('${$cell(row,$SYM)}', true)">x</div>`;
				}
				else {
					rowClass = '';
					if(notifyExcept)
						notifyControl = `<div class="l_notify_enable" title="Re-enable ${$cell(row,$SYM)} notifications" onclick="$notifyException('${$cell(row,$SYM)}', false)">&#10003;</div>`;
					else
						notifyControl = '';
				}
				if(row[$OPT] && ['crypto','futures'].indexOf(row[$OPT]) >= 0)
					rowClass += ` l_${row[$OPT]}`;
				htmlRow = `<tr class="${rowClass}" onclick="$openStockWindow(${i},event)">
					<td>${notifyControl}${$cell(row,$SYM)}</td>
					<td class="${row[$NWS]?'l_news':''}">${$cellRollover(row,$NAM,$NWS,_forceContentTableShrink)}</td>
					<td>${$cell(row,$PCT5)}</td>
					<td>${$cell(row,$PCT)}</td>
					<td>${$cellRollover(row,$PRC,$PRC5)}</td>
					<td>${$cellRollover(row,$VOL,$VOL5)}</td>
					<td class="${row[$OPT]?'l_options':''}">${$popoutLiveTableRow(row)}${$cellRollover(row,$OPT,$OIV)}</td>
					</tr>`;
			}
			if(notify) {
				htmlPriority += htmlRow;
				notifyRows.push(row);
			}
			else
				htmlNormal += htmlRow;
		}
		if(!htmlPriority && !htmlNormal)
			html += '<tr><td colspan="7">No results found.</td></tr>';
		else
			html += htmlPriority + htmlNormal;
		$E('l_content_table').className = $E('l_awaiting_data') ? '' : 'l_content_tr_fade_in';
		if(doNotify)
			$E('l_content_table').classList.add('l_content_table_notify_'+Math.abs(_stageDataSortByColumn));
		$E('l_content_table').innerHTML = html;
		$updateContentTableRowCountThatAreInView();
		if(!doNotResetKeyRow)
			_keyRow = 0;
		else
			$onkeydown(null);
		if(!_forceContentTableShrink && $E('l_content_table').offsetWidth > $D.body.offsetWidth) {
			_forceContentTableShrink = true;
			$updateLiveTable(doNotify, doNotResetKeyRow);
		}
		else if(notifyRows.length > 0 && doNotify)
			$notify(notifyRows);
	}
}