const $L = {

	/* [_] INTERNALS / DEFAULTS */
	_stageURL: '//stage.larval.com/',
	_stageData: null,
	_stageDataSortByColumn: 0,
	_stageDataHistoryIndex: -1,
	_stageDataHistory: [],
	_stageDataMap: [],
	_notifications: [],
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
	_marqueeBlinkHtml: '<i class="l_marquee_blink">&#8226;</i>',
	_emptyCellHtml: '<div class="l_none">&#8226;</div>',
	_charUp: "\u25bc ",
	_charDown: "\u25b2 ",
	_charHalt: "\u25a0 ",
	_charCrypto: '*',
	_charFutures: '^',
	_charCurrency: '$',
	_contentTableSoftLimit: 100,
	_contentTableRowCountThatAreInView: 10,
	_title:	document.title,
	_frameData: null,
	_swipeStartPosition: null,
	_naId: 'l_na',
	_wakeLock: null,
	_symbolsOnTop: {},
	_symbolsStatic: ['^VIX', '^DJI', '^GSPC', '^IXIC', '^RUT', '^TNX', '^TYX'],
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
		Y: ['https://finance.yahoo.com/quote/@', 'https://finance.yahoo.com/quote/@/options', 'https://finance.yahoo.com/quote/@-USD', 'https://finance.yahoo.com/quote/@=F', 'https://finance.yahoo.com/quote/@=X'],
		Z: ['https://www.zacks.com/stock/quote/@', 'https://www.zacks.com/stock/quote/@/options-chain'],
	},
	_taMap: {
		AS: ['Ascending triangle', 'asc<i>&nbsp;triangle</i>', 'F'],
		CD: ['Channel down', 'c<i>hannel&nbsp;</i>down', 'F'],
		CH: ['Channel', 'chan<i>nel</i>', 'F'],
		CU: ['Channel up', 'c<i>hannel&nbsp;</i>up', 'F'],
		D1: ['Barchart directional top 1%', '<i>&nbsp;barchart&nbsp;</i>top&nbsp;1%', 'B'],
		DB: ['Double bottom', '2x&nbsp;bot<i>tom</i>', 'F'],
		DE: ['Descending triangle', 'desc<i>&nbsp;triangle</i>', 'F'],
		DT: ['Double top', '2x&nbsp;top', 'F'],
		HI: ['Inverse head and Ssoulders', 'inv<i>erse</i>&nbsp;h&amp;s', 'F'],
		HS: ['Head and shoulders', 'h&nbsp;&amp;&nbsp;s', 'F'],
		HZ: ['Horizontal S/R', 's&nbsp;&amp;&nbsp;r', 'F'],
		MB: ['Multiple bottoms', '&gt;2x&nbsp;bot<i>tom</i>s', 'F'],
		MT: ['Multiple tops', '&gt;2x&nbsp;tops', 'F'],
		S1: ['Barchart strength top 1%', '<i>&nbsp;barchart&nbsp;</i>top&nbsp;1%', 'B'],
		TR: ['Technical resistance', 'resist<i>ance</i>', 'F'],
		TS: ['Technical support', '<i>tech&nbsp;</i>support', 'F'],
		WD: ['Wedge down', 'wedge<i>&nbsp;down</i>', 'F'],
		WE: ['Wedge', 'wedge', 'F'],
		WU: ['Wedge up', 'wedge<i>&nbsp;up</i>', 'F']
	},
	_eventMap: {
		   'l_audible, l_options_only, l_notify_halts, l_include_futures, l_include_crypto, l_include_currency': {
				change:e    => $settingsSave(e)
		}, 'l_range_up, l_range_down, l_range_volume': {
				input:e     => $updateRangeDisplay(e),
				change:e    => $settingsSave(e)
		}, 'l_content_table': {
				mousemove:e => $keyModeReset()
		}
	},
	_clickMap: {
		'l_hotkey_help':e           => $marqueeHotKeyHelp(),
		'l_marquee_flash':e         => $gotoStageDataHistory(0),
		'l_settings_button':e       => $settingsButtonToggle(),
		'l_fixed':e                 => $animationsFastSplash(),
		'l_last_update':e           => $forceNextStagePoll(),
		'l_content_table_header':_  => $setSortStageData(_.idx),
		'l_notify_enable':_         => $notifyException(_.raw, false),
		'l_notify_disable':_        => $notifyException(_.raw, true),
		'l_news':_                  => $W.open(_stageData['items'][_.idx][$LNK], `l_news_${_.sym}`).focus(),
		'l_ta':_                    => $W.open(_keyMap[_.el.dataset.keymap?_.el.dataset.keymap:_keyMapIndexDefault][$KSTK].replace('@', _.sym), `l_ta_${_.sym}`).focus(),
		'l_marquee_info':_          => $setURLFormat(_.sym, false),
		'l_options':_               => $W.open($createURL(_.sym, $KOPT), `l_${_.type}_${$KOPT}`).focus(),
		'alt_default':_             => _.raw ? $setSymbolsOnTop(_.raw, null, true) : $editSymbolsOnTop(),
		'default':_                 => $W.open($createURL(_.sym, _.type), `l_${_.type}_${_.sym}`).focus()
	},
	_hotKeyMap: {
		'Tab':(e,ev)                => $animationsToggle(null, ev.shiftKey),
		'ShiftLeft':(e,ev)          => $rollContentTable(ev.shiftKey),
		'ShiftRight':(e,ev)         => $rollContentTable(ev.shiftKey),
		'Backquote':e               => $editSymbolsOnTop(),
		'Slash':e                   => $marqueeHotKeyHelp(),
		'Home':e                    => _keyRow = 1,
		'End':e                     => _keyRow = e.parentElement.childElementCount - 1,
		'PageUp':e                  => _keyRow-=_contentTableRowCountThatAreInView,
		'PageDown':e                => _keyRow+=_contentTableRowCountThatAreInView,
		'ArrowUp':e                 => _keyRow--,
		'ArrowDown':e               => _keyRow++,
		'ArrowLeft':e               => $gotoStageDataHistory(-1),
		'ArrowRight':e              => $gotoStageDataHistory(1),
		'Escape':e                  => $gotoStageDataHistory(0) || $settingsButtonToggle(true),
		'Space':e                   => $onclick(e),
		'Enter':e                   => $onclick(e),
		'NumpadEnter':e             => $onclick(e)
	},
	_enumMap: {
		'SYM':_  => $H(_.val),
		'NAM':_  => _forceContentTableShrink ? _emptyCellHtml : $H(_.val),
		'PCT5':_ => $isHaltRow(_.row) ? $H(_.val?_.val:'HALTED') : $htmlPercent(_.val,2),
		'PCT':_  => $htmlPercent(_.val,2),
		'PRC':_  => '$' + $N(_.val,_.row[$OPT]=='currency'&&_.val<10?4:2),
		'VOL':_  => $F(_.val,1),
		'OPT':_  => $H(_.val),
		'OIV':_  => _.row[$SYM][0]==_charCrypto ? ('MC#'+_.val) : ($H(_.val>0?_.val:('~'+Math.abs(_.val))))+'%IV',
		'ERN':_  => $H(_.val),
		'PRC5':_ => (_.val<0?'-$':'+$') + $N(Math.abs(_.val),_.row[$OPT]=='currency'?4:2),
		'VOL5':_ => '+' + $F(_.val,1),
		'PCTM':_ => 'M=' + $htmlPercent(_.val,0),
		'PCTY':_ => 'Y=' + $htmlPercent(_.val,0),
		'NWS':_  => $H(_.val),
		'LNK':_  => _.val,
		'TAN':_  => $H(_.val),
		'HLT':   2,
		'TAN':   8,
		'KSTK':  0,
		'KOPT':  1,
		'KCRP':  2,
		'KFTR':  3,
		'KCUR':  4
	},
	_vibrateAlert: [250,250,500,250,750,250,1000], _audioAlert: 'larval.mp3', _audioTest: 'data:audio/mpeg;base64,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',

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
	U: array => array.filter((x,i,a) => array.indexOf(x)==i),
	W: window,

	/* [$] EVENTS (window|document) */
	LOAD: e => {
		for(let i=0, cellKeys=Object.keys($L._enumMap); i < cellKeys.length; i++) {
			const key=cellKeys[i];
			if(typeof $L._enumMap[key] == 'number')
				$L[key] = $L._enumMap[key];
			else {
				$L[key] = i;
				$L._stageDataMap.push($L._enumMap[key]);
			}
		}
		for(let k of Object.keys($L)) {
			window[k[0]=='_'?k:('$'+k)] = $L[k];
			if(k.substr(0,2) != 'on')
				continue;
			else if(typeof window[k] != 'undefined')
				window.addEventListener(k.substr(2), $L[k]);
			else if(typeof document[k] != 'undefined')
				document.addEventListener(k.substr(2), $L[k]);
		}
		for(let ids of Object.keys(_eventMap)) {
			for(let id of ids.split(/[^A-Z0-9_]+/i))
				for(let e of Object.keys(_eventMap[ids]))
					$E(id).addEventListener(e, _eventMap[ids][e]);
		}
		$settingsLoad();
		$notifySetup(false);
		$keyMapSetup();
		$getStageData(false);
		$animationsDisableIfUnderFPS(6000, 30, 2);
		setTimeout($animationsComplete, 5750);
	},
	onclick: e => {
		let idx=0, sym='', type=$KSTK, dataRef=null, ref='', refList=Object.keys(_clickMap), el=(e&&e.target?e.target:e);
		$notifySetup(true);
		if(!el) return;
		for(let next=el; !!next.parentElement; next=next.parentElement) {
			if(!ref) {
				for(let c in refList) {
					if(next.id != refList[c] && !next.classList.contains(refList[c]))
						continue;
					ref = refList[c];
					el = next;
					break;
				}
			}
			if(dataRef === null && typeof next.dataset=='object' && typeof next.dataset.ref=='string')
				dataRef = isNaN(next.dataset.ref) ? next.dataset.ref : parseInt(next.dataset.ref, 10);
			if(dataRef !== null && ref)
				break;
		}
		if(typeof dataRef == 'string')
			sym = dataRef;
		else if(typeof dataRef == 'number') {
			idx = dataRef;
			sym = _stageData['items'][dataRef][$SYM];
		}
		if((e.ctrlKey || e.altKey || e.type=='contextmenu') && (el.dataset&&el.dataset.alt!='none'))
			ref = 'alt_default';
		else if(sym && !ref)
			ref = 'default';
		else if(!ref)
			return;
		const raw=sym, staticIndex=_symbolsStatic.indexOf(sym);
		if(staticIndex >= 0)             { type = $KSTK; sym = _symbolsStatic[staticIndex]; }
		else if(sym[0] == _charCrypto)   { type = $KCRP; sym = sym.substr(1); }
		else if(sym[0] == _charFutures)  { type = $KFTR; sym = sym.substr(1); }
		else if(sym[0] == _charCurrency) { type = $KCUR; sym = ((sym.substr(-1)=='-'?'USD':sym)+(sym.substr(-1)=='+'?'USD':sym)).replace(/[^A-Z]+/g,''); }
		_clickMap[ref]({'raw':raw, 'sym':sym, 'idx':idx, 'type':type, 'el':el});
	},
	onkeydown: e => {
		$animationsFastSplash();
		if(!_animationsComplete || !_stageData || (e && (e.ctrlKey || e.altKey)))
			return;
		const rows=$E('l_content_table').getElementsByTagName('tr');
		let lastKeyRow=_keyRow, match;
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
			const hotKey=e.code;
			if(_hotKeyMap[hotKey])
				_hotKeyMap[hotKey](rows[_keyRow], e)
			else if((match=hotKey.match(/^(Digit|Numpad)([0-9])$/)))
				$setSortStageData(parseInt(match[2]));
			else if((match=hotKey.match(/^Key([A-Z])$/))) {
				$setURLFormat(match[1], e.shiftKey);
				$onclick(rows[_keyRow]);
			}
			else if(e.code)
				$marqueeFlash(`The &quot;<i class='l_marquee_highlight'>${e.code}</i>&quot; key is not mapped, type &quot;<i class='l_marquee_highlight'>?</i>&quot; to see the supported hotkeys.`);
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
	onkeyup: e => $rollContentTable(e.shiftKey),
	onvisibilitychange: e => {
		_frameData = null;
		if($D.visibilityState != 'visible')
			return;
		$notifyRequestWakeLock();
		while(_notifications.length > 0)
			(_notifications.shift()).close();
		if(!_marqueeInterval)
			return;
		$marqueeIntervalReset();
		$marqueeUpdate(_marqueeLoopSeconds);
		$animationsProgressReset();
	},
	onresize: e => {
		$settingsButtonToggle(true);
		$updateContentTableRowCountThatAreInView();
	},
	onscroll: e => {
		const scrolledDown=$E(_naId) || (($W.pageYOffset||$D.documentElement.scrollTop) > $E('l_fixed').offsetHeight);
		const percent=($D.documentElement.scrollTop||$D.body.scrollTop) / (($D.documentElement.scrollHeight||$D.body.scrollHeight) - $D.documentElement.clientHeight) * 100;
		if(percent > 50 && _contentTableSoftLimit > 0) {
			_contentTableSoftLimit = -_contentTableSoftLimit;
			$updateContentTable();
		}
		$E('l_fixed').className = scrolledDown ? 'l_scrolled' : 'l_not_scrolled';
	},
	oncontextmenu: e => {
		e.preventDefault();
		$onclick(e);
	},
	ontouchstart: e => { _swipeStartPosition = [e.changedTouches[0].clientX, e.changedTouches[0].clientY]; },
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

	/* [$] FUNCTIONS */
	animationsFastSplash: () => {
		if(_animationsComplete || !_stageData)
			return;
		$animationsReset('l_logo', 'l_logo 0.5s ease 1 normal 0.5s forwards');
		$animationsReset('l_fixed', 'l_fixed 0.5s ease 1 normal forwards');
		$animationsReset('l_marquee_container', 'l_marquee_container 0.5s ease forwards');
		$animationsComplete(true);
	},
	animationsComplete: fastSplash => {
		if(_animationsComplete)
			return;
		_animationsComplete = true;
		if(!fastSplash && $E(_naId))
			$E(_naId).className = _naId;
		$E('l_root').className = 'l_animations_complete';
		$E('l_menu').className = (!_stageData||!_stageData['afterhours']) ? 'l_not_afterhours' : 'l_afterhours';
		$setNextStagePoll(!_stageData||!_stageData['items'] ? _nextStagePollShort : $getSynchronizedNext());
		if($hasSettings() && _stageData && _stageData['top'] && _stageData['top'].length > 1)
			$marqueeUpdate(_marqueeLoopSeconds);
		else
			$marqueeInitiate(_marqueeLoopSeconds);
		$marqueeIntervalReset();
		$notifyPlayAudio(_audioTest);
		$updateContentTable(true);
		if($isMobile() || localStorage.getItem(_naId))
			$animationsToggle(false, null);
	},
	animationsToggle: (explicit, saveSettings) => {
		const animations = (typeof explicit == 'boolean' ? explicit : !!$E(_naId));
		if(saveSettings)
			localStorage[animations?'removeItem':'setItem'](_naId, _naId);
		$D.body.id = animations ? '' : _naId;
		if(_animationsComplete)
			$D.body.className = $D.body.id;
		if(_stageDataHistoryIndex >= 0)
			$updateStageDataHistory();
		else if(animations)
			$marqueeFlash(`Full animation experience has been restored${saveSettings?' and saved':''}.`);
		$animationsProgressReset();
		$keyModeReset();
		$scrollToTop();
		$onscroll();
	},
	animationsProgressReset: force => {
		if(_nextStagePollCompleteEpoch || force)
			$setNextStagePoll(_nextStagePollCompleteEpoch - $epochNow()); 
	},
	animationsReset: (idOrElement, animation) => {
		const el=(typeof idOrElement=='string' ? $E(idOrElement) : idOrElement);
		el.style.animation = 'none';
		void el.offsetHeight;
		el.style.animation = animation;
	},
	animationsDisableIfUnderFPS: (ms, fps, attempt) => {
		if(!_frameData) {
			if(!fps || $E(_naId) || localStorage.getItem(_naId) || $isMobile() || !['requestAnimationFrame','performance'].every(fn=>$W[fn]))
				return($blackhole('animationsDisableIfUnderFPS'));
			_frameData = {'fps':fps, 'duration':ms/1000, 'stop':performance.now()+ms, 'frames':0, 'attempt':attempt>0?attempt:0};
		}
		else if(!fps)
			_frameData.frames++;
		else
			return;
		if(_frameData.stop > ms)
			$W.requestAnimationFrame($animationsDisableIfUnderFPS);
		else if(_frameData.duration > 0 && (_frameData.frames/_frameData.duration) < _frameData.fps) {
			$animationsToggle(false, null);
			$marqueeFlash('Slow graphics detected, disabling most animations.  Use the <i class="l_marquee_highlight">tab</i> key to re-enable.');
			$blackhole('animationsDisableIfUnderFPS');
		}
		else if(--_frameData.attempt > 0) {
			_frameData.frames = 0;
			_frameData.stop = performance.now() + (_frameData.duration * 1000);
			$W.requestAnimationFrame($animationsDisableIfUnderFPS);
		}
		else
			_frameData = null;
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
			if(!_keyMap[key][$KCUR])
				_keyMap[key][$KCUR] = _keyMap[_keyMapIndexDefault][$KCUR];
		}
	},
	keyModeReset: () => _keyRow ? $onkeydown(false) : null,
	getSynchronizedNext: () => {
		if(!_stageData || !_stageData['next'])
			return(_nextStagePollLong);
		let next = Math.floor(_stageData['next'] - (new Date().getTime() / 1000)) + Math.floor(Math.random() * 10);
		if(next < 0 || next > _nextStagePollLong + _nextStagePollShort)
			next = _nextStagePollLong;
		return(next);
	},
	getData: (jsonFile, jsonCallback, args) => {
		fetch(_stageURL+jsonFile+'?ts='+new Date().getTime())
		.then(resp => resp.json())
		.then(json => jsonCallback(json, args))
		.catch(err => jsonCallback(null, args));
	},
	setStageData: stageData => (_stageData=stageData) && (_contentTableSoftLimit=Math.abs(_contentTableSoftLimit)),
	getStageData: updateView => $getData('stage.json', $parseStageData, {'updateView':updateView}),
	parseStageData: (json, args) => {
		let retry = false;
		if(!json || !json['ts'] || (_stageDataHistory.length > 0 && _stageDataHistory[_stageDataHistory.length-1]['ts'] == json['ts']))
			retry = true;
		else if(_stageDataHistoryIndex >= 0)
			_stageDataHistory.push($clone(json));
		else {
			$setStageData(json);
			if(_stageDataHistory.length == 0 && localStorage.length == 0 && _stageData['afterhours']) {
				const now=new Date();
				if(now.getDay() != 0 && now.getDay() != 6)
					$E('l_include_futures').checked = $E('l_include_currency').checked = true;
			}
			_stageDataHistory.push($clone(_stageData));
			$sortStageData(false);
			_forceContentTableShrink = false;
			if(args && args['updateView'])
				$updateContentTable(true);
			if(json['notify'] && $hasSettings())
				$marqueeFlash(json['notify']);
			$E('l_last_update').innerHTML = $epochToDate(json['ts']);
		}
		$setNextStagePoll(retry ? _nextStagePollShort : $getSynchronizedNext());
	},
	getHistoryData: () => $getData('history.json', $parseHistoryData),
	parseHistoryData: json => {
		let error = false;
		if(!json || json.length < 2)
			error = true;
		else {
			let h = json.length;
			while(--h > 0) {
				if(json[h]['ts'] == _stageDataHistory[0]['ts'])
					break;
			}
			if(h > 0) {
				json.length = h;
				_stageDataHistory = json.concat(_stageDataHistory);
				_stageDataHistoryIndex = h - 1;
				$updateStageDataHistory();
			}
			else
				error = true;
		}
		if(error)
			$marqueeFlash('Sorry, no additional history is available to rewind to at this time.');
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
				$marqueeFlash('You are already viewing live data, use the <i class="l_marquee_highlight">&#8656;</i> key to rewind.');
			else if( _stageDataHistoryIndex + 2 >= _stageDataHistory.length)
				_stageDataHistoryIndex = -1;
			else
				_stageDataHistoryIndex++;
		}
		else if(direction < 0) {
			if($getHistoryData && _stageDataHistoryIndex == (_stageDataHistory.length < 2 ? -1 : 0)) {
				$marqueeFlash('Attempting to gather recent history from the server...');
				$getHistoryData();
			}
			else if(_stageDataHistoryIndex < 0)
				_stageDataHistoryIndex = _stageDataHistory.length - 2;
			else if(_stageDataHistoryIndex > 0)
				_stageDataHistoryIndex--;
			else
				$marqueeFlash('End of history, use <i class="l_marquee_highlight">&#8658;</i> to move forward or <i class="l_marquee_highlight">escape</i> to exit.', true);
		}
		if(lastIndex !== _stageDataHistoryIndex) {
			$updateStageDataHistory();
			return(true);
		}
		return(false);
	},
	updateStageDataHistory: () => {
		const historyTotal=_stageDataHistory.length-1, historyIndex=_stageDataHistoryIndex<0?historyTotal:_stageDataHistoryIndex;
		const stageData=$clone(_stageDataHistory[_stageDataHistoryIndex >= 0 ? _stageDataHistoryIndex : historyTotal]);
		$setStageData(stageData);
		$sortStageData(true);
		const minutesAgo=Math.round(($epochNow()-_stageData['ts'])/60,0);
		if(historyIndex == historyTotal)
			$marqueeFlash('All caught up, exiting history mode...', true);
		else
			$marqueeFlash(`Rewound to ${$epochToDate(_stageData['ts'])}: <i class='l_marquee_highlight_padded'>${minutesAgo} minutes ago</i>${$getHistoryData?'':' ['+$P(historyTotal-historyIndex,historyTotal)+'%]'}`, true);
	},
	setNextStagePoll: seconds => {
		if(_animationsComplete)
			$animationsReset('l_progress_display', `l_progress ${seconds}s linear forwards`);
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
	scrollToTop: () => $W.scrollTo({top: 0, behavior: 'auto'}),
	forceNextStagePoll: () => $setNextStagePollComplete(),
	epochNow: () => Math.floor(Date.now() / 1000),
	epochToDate: epoch => new Date(epoch * 1000).toLocaleTimeString('en-US', {weekday:'short',hour:'numeric',minute:'2-digit',timeZoneName:'short'}),
	clone: obj => typeof structuredClone=='function' ? structuredClone(obj) : JSON.parse(JSON.stringify(obj)),
	blackhole: fn => $W['$'+fn] = $L[fn] = () => {},
	htmlPercent: (number, precision) => {
		if(number > 0)
			return($N(Math.abs(number), precision) + '%<i class="l_up">&#9650;</i>');
		else if(number < 0)
			return($N(Math.abs(number), precision) + '%<i class="l_down">&#9660;</i>');
		else
			return(_emptyCellHtml);
	},
	settingsButtonToggle: forceClosed => {
		const controlHeight=($E('l_control').scrollHeight > 200 ? $E('l_control_table').scrollHeight : 250)+'px', grow=(!forceClosed && $E('l_control').style.height!=controlHeight);
		$E('l_control').style.height = (grow?controlHeight:'0px');
		$E('l_settings_button').innerHTML = (grow?'&#9660; settings &#9660;':'&#9650; settings &#9650;');
	},
	settingsSave: e => { 
		const context = (e&&e.target) ? e.target : null;
		for(let inputs=$T('input'), i=0; i < inputs.length; i++) {
			let input=inputs[i];
			if(input.type == 'checkbox')
				localStorage.setItem(input.id, input.checked ? 'true' : 'false');
			else if(input.type == 'range')
				localStorage.setItem(input.id, input.value);
		}
		if(context && context.id == 'l_audible' && context.checked)
			$notifyPlayAudio(_audioTest);
		$updateContentTable(false);
	},
	settingsLoad: () => {
		const now=new Date();
		_naId = $isMobile() ? 'l_nam' : 'l_na';
		$getSymbolsOnTop();
		if(localStorage.length == 0 && (now.getDay() == 0 || now.getDay() == 6))
			$E('l_include_crypto').checked = true;
		for(let i=0; i < localStorage.length; i++) {
			let input=$E(localStorage.key(i));
			if(!input || !input['type'])
				continue;
			if(input.type == 'checkbox')
				input.checked = (localStorage.getItem(input.id) == 'true');
			else if(input.type == 'range')
				input.value = localStorage.getItem(input.id);
		}
		for(let id of ['l_range_up','l_range_down','l_range_volume'])
			$updateRangeDisplay(id);
	},
	updateRangeDisplay: idOrEvent => {
		let id='';
		if(typeof idOrEvent == 'string')
			id = idOrEvent;
		else if(typeof idOrEvent == 'object' && idOrEvent.target && idOrEvent.target.id)
			id = idOrEvent.target.id;
		const input=$E(id), display=$E(`${id}_display`);
		if(!input || !display)
			return;
		switch(id) {
			case 'l_range_up':     display.innerHTML = (input.value / 10).toFixed(1); break;
			case 'l_range_down':   display.innerHTML = (-input.value / 10).toFixed(1); break;
			case 'l_range_volume': display.innerHTML = input.value; break;
		}
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
				if(!html) html += '<i class="l_marquee_blink_wide">&#8226;</i>';
				html += `<div class="l_marquee_link" data-ref="${item[0]}"><i class='l_marquee_highlight_padded'>${$H(item[2])}</i>${item[1]<0?'&#9660;':'&#9650;'} ${Math.abs(item[1]).toFixed(2)}%</div> `;
			}
			else if(!includeCrypto && item[0][0] == _charCrypto)
				continue;
			else {
				if(!rank) html += '<i class="l_marquee_blink_wide">&#8226;</i>';
				html += `<div class="l_marquee_link" data-ref="${item[0]}"><i class='l_marquee_highlight_padded'>#${++rank}</i>${item[0]} &#177; ${item[1]}%</div> `;
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
		$E('l_marquee_container').classList[$E(_naId)?'add':'remove']('l_na_marquee_container_override');
		$E('l_marquee_flash').innerHTML = message ? message : '';
		$E('l_marquee').style.display = message ? 'none' : 'inline-block';
		$E('l_marquee_flash').style.display = message ? 'inline-block' : 'none';
		if(message) {
			$scrollToTop();
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
		let key, match, html=`${_marqueeBlinkHtml} The following hotkeys and gestures are available: ${_marqueeBlinkHtml} Use the <i class="l_marquee_highlight">tab</i> key to alternate animation modes. ${_marqueeBlinkHtml} Alt-click rows or use the <i class="l_marquee_highlight">~</i> key to keep specific symbols on top. ${_marqueeBlinkHtml} Swipe or use <i class="l_marquee_highlight">&#8644;</i> arrow keys to rewind and navigate your backlog history. ${_marqueeBlinkHtml} Use <i class="l_marquee_highlight">&#8645;</i> arrow keys to navigate to a row followed by selecting one of these hotkeys: `;
		for(let key in _keyMap) {
			if((match=_keyMap[key][$KSTK].match(/([a-z]+)\.[a-z]+\//i)))
				html += `<div class="l_marquee_info" data-ref="${key}"><i class='l_marquee_highlight_padded'>${key}</i>${$H(match[1])}</div> `
		}
		html += `${_marqueeBlinkHtml} Hold down the <i class="l_marquee_highlight">shift</i> key to make your selection permanent. ${_marqueeBlinkHtml} The keys <i class="l_marquee_highlight">1-7</i> can be used to sort by each column.`;
		$scrollToTop();
		$marqueeIntervalReset();
		$marqueeInitiate(_marqueeLoopSeconds, html);
	},
	notify: notifyRows => {
		$notifyClear();
		if(_stageDataHistory.length < 2)
			return;
		if($D.visibilityState == 'hidden' && typeof Notification != 'undefined' && Notification.permission == 'granted') {
			_notifications.push(new Notification('Larval - Market volatility found!', {
				icon: 'icon-192x192.png',
				body: notifyRows.length > 0 ? 'Volatile stock(s): ' + $U(notifyRows.map(a => (typeof a[$HLT]=='string'?_charHalt:(a[$PCT5]<0?_charUp:_charDown))+a[$SYM])).join(' ') : 'Larval - Market volatility found!'
			}));
		}
		else 
			$notifyRequestPermission();
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
		$notifyPlayAudio(_audioAlert, true);
		$scrollToTop();
	},
	notifyClear: () => {
		if(_notifyTitleInterval) {
			clearInterval(_notifyTitleInterval);
			_notifyTitleInterval = null;
		}
		$D.title = _title;
	},
	notifyException: (symbol, disable) => {
		if(disable) {
			if(_symbolsOnTop[symbol])
				$setSymbolsOnTop(symbol, true, false);
			else
				_notifyExceptions[symbol] = true;
		}
		else if(_notifyExceptions[symbol])
			delete _notifyExceptions[symbol];
		$updateContentTable(false, true);
	},
	notifyVibrate: pattern => {
		if(navigator.vibrate)
			navigator.vibrate(pattern ? pattern : _vibrateAlert);
	},
	notifyPlayAudio: (audio, vibrateFallback) => {
		if(typeof audio == 'object' && audio.play && $E('l_audible').checked)
			audio.play().catch(() => { if(vibrateFallback) $notifyVibrate(); });
		else if(vibrateFallback)
			$notifyVibrate();
	},
	notifyRequestPermission: () => {
		if(_notifyAllowed || typeof Notification == 'undefined')
			return;
		Notification.requestPermission().then(status => {
			if (status === 'denied')
				_notifyAllowed = false;
			else if (status === 'granted')
				_notifyAllowed = true;
		}).catch(() => _notifyAllowed = null);
	},
	notifyRequestWakeLock: () => {
		if(!navigator.wakeLock || _wakeLock)
			return;
		navigator.wakeLock.request('screen').then(wakeLock => {
			_wakeLock = wakeLock;
			_wakeLock.addEventListener('release', () => {
				_wakeLock = null;
				$notifyRequestWakeLock();
			});
		}).catch(() => _wakeLock = null);
	},
	notifySetup: disableFutureRequests => {
		if(disableFutureRequests)
			$blackhole('notifySetup');
		if(typeof _audioTest == 'string')
			_audioTest = new Audio(_audioTest);
		if(typeof _audioAlert == 'string') {
			_audioAlert = new Audio(_audioAlert);
			_audioAlert.load();
		}
		$notifyRequestPermission();
		$notifyRequestWakeLock();
	},
	createURL: (symbol, type) => {
		let keyMap = _keyMap[_keyMapIndex];
		if(!keyMap)
			keyMap = _keyMap[_keyMapIndexDefault];
		return(keyMap[type].replace('@', symbol));
	},
	setURLFormat: (key, saveSettings) => {
		if(!_keyMap[key])
			return;
		_keyMapIndex = key;
		const domain=new URL(_keyMap[_keyMapIndex][$KSTK]), display=(domain&&domain.hostname?domain.hostname:url);
		if(saveSettings) {
			localStorage.setItem('l_keymap_index', _keyMapIndex);
			$marqueeFlash(`Links will now permanently direct to <i class='l_marquee_highlight'>${display}</i> by default.`);
		}
		else
			$marqueeFlash(`Links will now direct to <i class='l_marquee_highlight'>${display}</i> for this session, hold down <i class='l_marquee_highlight'>shift</i> to make it permanent.`);
	},
	editSymbolsOnTop: () => {
		let symbols=localStorage.getItem('l_symbols_on_top');
		if((symbols=prompt("Enter symbols you would like to have sticky on top: \n[NOTE: alt-click rows to individually add or remove]", symbols?symbols:'')) === null)
			return;
		$setSymbolsOnTop(null, true, false);
		$setSymbolsOnTop(symbols, false, true);
	},
	delSymbolFromTop: sym => [sym,sym+'+',sym+'-'].forEach(sym => delete _symbolsOnTop[sym]),
	addSymbolToTop: sym => sym[0]==_charCurrency ? (_symbolsOnTop[sym]=_symbolsOnTop[sym+'+']=_symbolsOnTop[sym+'-']=sym) : _symbolsOnTop[sym]=sym,
	getSymbolsOnTop: () => {
		if(Object.keys(_symbolsOnTop).length)
			return(_symbolsOnTop);
		_symbolsOnTop = {};
		let savedSymbols=localStorage.getItem('l_symbols_on_top');
		if(savedSymbols && (savedSymbols=savedSymbols.match(/[\^\*\$]?[A-Z0-9]+/g)))
			savedSymbols.forEach(sym => $addSymbolToTop(sym));
		return(_symbolsOnTop);
	},
	setSymbolsOnTop: (symbols, removeOrToggle, updateView) => {
		const remove=(removeOrToggle===true), toggle=(removeOrToggle===null);
		let msg='', orderedTopListStr='', orderedTopList, savedSymbols, onTopDiff=$U(Object.values(_symbolsOnTop)).length;
		if(!symbols && remove)
			_symbolsOnTop = {};
		else if(symbols && (savedSymbols=symbols.toUpperCase().match(/[\^\*\$]?[A-Z0-9]+/g)))
			savedSymbols.forEach(sym => (remove||(toggle&&_symbolsOnTop[sym])) ? $delSymbolFromTop(sym) : $addSymbolToTop(sym));
		orderedTopList = $U(Object.values(_symbolsOnTop)).sort((a, b) => a.localeCompare(b));
		orderedTopListStr = orderedTopList.join(', ').trim(', ');
		localStorage.setItem('l_symbols_on_top', orderedTopListStr);
		if(!updateView)
			return;
		onTopDiff -= orderedTopList.length;
		if(!orderedTopListStr)
			msg = 'Your on top list is empty, alt-click a row below to add a symbol.';
		else if((savedSymbols && savedSymbols.length > 1) || Math.abs(onTopDiff) != 1)
			msg = 'Symbols on top: ';
		else if(onTopDiff > 0)
			msg = `<i class="l_marquee_highlight">${symbols}</i> removed from top: `;
		else
			msg = `<i class="l_marquee_highlight">${symbols}</i> added to top: `;
		if(orderedTopListStr)
			msg += `<i class="l_marquee_highlight_padded">${orderedTopListStr}</i>`;
		$marqueeFlash(msg);
		$updateContentTable(false);
	},
	setSortStageData: column => {
		if(_stageDataSortByColumn == -column || !column || column > $E('l_content_table').getElementsByTagName('th').length) {
			if(_stageData.itemsImmutable)
				_stageData.items = $clone(_stageData.itemsImmutable);
			_stageDataSortByColumn = 0;
		}
		else if(_stageDataSortByColumn == column)
			_stageDataSortByColumn = -column;
		else
			_stageDataSortByColumn = column;
		$sortStageData(true);
		$E('l_content_table').classList.add('l_content_table_notify_'+Math.abs(_stageDataSortByColumn));
	},
	sortStageData: updateView => {
		if(_stageData && _stageDataSortByColumn) {
			if(!_stageData.itemsImmutable)
				_stageData.itemsImmutable = $clone(_stageData.items);
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
			$updateContentTable(false);
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
	isMobile: () => 'ontouchstart' in $D.documentElement && $D.body.clientHeight > $D.body.clientWidth,
	isHaltRow: row => row && row[$HLT] && typeof row[$HLT] == 'string',
	cell: (row, type) => row[type] && _stageDataMap[type] ? _stageDataMap[type]({'val':row[type], 'row':row, 'type':type}) : _emptyCellHtml,
	cellRollover: (row, primary, secondary, shrinkMode) => {
		let cell='<div class="l_hover_container">', left=(secondary==$NWS);
		if(row[secondary] && !shrinkMode)
			cell += `<i class="${left?'l_hover_active_left':'l_hover_active'}">${$cell(row,secondary)}</i><i class="l_hover_inactive">`;
		cell += $cell(row,primary);
		if(row[secondary] && !shrinkMode)
			cell += '</i>';
		cell += '</div>';
		return(cell);
	},
	popoutContentTableRow: row => {
		if(row[$TAN] && typeof row[$TAN] == 'string' && _taMap[row[$TAN]])
			return(`<div class="l_notify_popout l_ta" title="${_taMap[row[$TAN]][0]}" data-keymap="${_taMap[row[$TAN]][2]?_taMap[row[$TAN]][2]:_keyMapIndexDefault}">&#128200;&nbsp;${_taMap[row[$TAN]][1]}</div>`);
		else if(row[$ERN] && row[$NWS])
			return(`<div class="l_notify_popout l_news" title="News and earnings on ${$cell(row,$ERN)}">&#128197;&nbsp;${$cell(row,$ERN)}<i>&nbsp;+&nbsp;news</i></div>`);
		else if(row[$ERN])
			return(`<div class="l_notify_popout" title="Earnings on ${$cell(row,$ERN)}">&#128198;&nbsp;${$cell(row,$ERN)}<i>&nbsp;earnings</i></div>`);
		else if(row[$NWS])
			return(`<div class="l_notify_popout l_news" title="Company news">&#128197;&nbsp;<i>recent </i>news</div>`);
		return('');
	},
	rollContentTable: roll => $E('l_content_table').classList[roll?'add':'remove']('l_content_table_alt_display'),
	updateContentTable: (doNotify, doNotResetKeyRow) => {
		if(!_stageData)
			return;
		const columns=['symbol',_forceContentTableShrink?_emptyCellHtml:'company','~5min<i>ute</i>%','total%','price','volume','options'];
		const rangeUp=parseFloat($E('l_range_up_display').innerHTML), rangeDown=parseFloat($E('l_range_down_display').innerHTML), rangeVolume=parseInt($E('l_range_volume_display').innerHTML)*1000, optionsOnly=$E('l_options_only').checked, includeCrypto=$E('l_include_crypto').checked, includeFutures=$E('l_include_futures').checked, includeCurrency=$E('l_include_currency').checked;
		$E('l_menu').className = (!_animationsComplete||!_stageData||!_stageData['afterhours']) ? 'l_not_afterhours' : 'l_afterhours';
		let notifyRows=[], notify=false, visibleRows=0, onTop={}, optionClass='', rowClass='', htmlRow='', htmlPriority='', htmlNormal='', html='<tr>';
		for(let c=1,className=''; c <= columns.length; c++) {
			className = 'l_content_table_header';
			if(_stageDataSortByColumn == c)
				className += ' l_content_table_header_selected';
			else if(_stageDataSortByColumn == -c)
				className += ' l_content_table_header_selected_reverse';
			html += `<th id="l_content_table_header_${c}" class="${className}" data-ref="${c}" data-alt="none">${columns[c-1]}</th>`;
		}
		html += '</tr>';
		if(doNotify)
			$notifyClear();
		for(let i=0; i < _stageData['items'].length; i++) {
			const row=_stageData['items'][i], notifyExcept=!!_notifyExceptions[row[$SYM]];
			let isOnTop=!!_symbolsOnTop[row[$SYM]], notifyControl='';
			if($isHaltRow(row)) {
				if(notifyExcept)
					continue;
				notify=$E('l_notify_halts').checked && (!optionsOnly||row[$OPT]);
				rowClass = (notify ? 'l_notify_halt' : 'l_halt');
				htmlRow = `<tr class="${rowClass}" data-ref="${i}">
					<td>
					 <div class="l_notify_disable" title="Disable ${$cell(row,$SYM)} notifications for this session">x</div>
					 ${$cell(row,$SYM)}
					</td>
					<td class="${row[$NWS]?'l_news':''}">${$cellRollover(row,$NAM,$NWS,_forceContentTableShrink)}</td>
					<td colspan="4">HALT: ${$cell(row,$HLT)}</td>
					<td class="${row[$OPT]?'l_options':''}">${$popoutContentTableRow(row)}${$cellRollover(row,$OPT,$OIV)}</td>
					</tr>`;
			}
			else {
				notify=( !notifyExcept && ((((rangeUp&&row[$PCT5]>=rangeUp)||(rangeDown&&rangeDown>=row[$PCT5])) && (!row[$VOL]||row[$VOL]>=rangeVolume) && (!optionsOnly||row[$OPT])) || (row[$VOL]&&typeof row[$VOL]=='string') ));
				if(!isOnTop && ((!includeCrypto && row[$OPT]=='crypto') || (!includeFutures && row[$OPT]=='futures') || (!includeCurrency && row[$OPT]=='currency')))
					continue;
				if(notify) {
					rowClass = `l_notify_${isOnTop?'top_':''}${row[$PCT5]<0?'down':'up'}`;
					notifyControl = `<div class="l_notify_disable" title="Disable ${$cell(row,$SYM)} notifications for this session">x</div>`;
				}
				else {
					rowClass = isOnTop ? ' l_top' : '';
					if(notifyExcept)
						notifyControl = `<div class="l_notify_enable" title="Re-enable ${$cell(row,$SYM)} notifications">&#10003;</div>`;
					else if(isOnTop)
						notifyControl = `<div class="l_notify_disable" title="Remove ${$cell(row,$SYM)} from top">x</div>`;
				}
				optionClass='';
				if(row[$OPT]) {
					if(['crypto','futures','currency'].indexOf(row[$OPT]) >= 0)
						rowClass += ` l_${row[$OPT]}`;
					else
						optionClass = 'l_options';
				}
				htmlRow = `<tr class="${rowClass}" data-ref="${i}">
					<td>${notifyControl}${$cell(row,$SYM)}</td>
					<td class="${row[$NWS]?'l_news':''}">${$cellRollover(row,$NAM,$NWS,_forceContentTableShrink)}</td>
					<td>${$cellRollover(row,$PCT5,$PCTM)}</td>
					<td>${$cellRollover(row,$PCT,$PCTY)}</td>
					<td>${$cellRollover(row,$PRC,$PRC5)}</td>
					<td>${$cellRollover(row,$VOL,$VOL5)}</td>
					<td class="${optionClass}">${$popoutContentTableRow(row)}${$cellRollover(row,$OPT,$OIV)}</td>
					</tr>`;
			}
			if(visibleRows >= 0 && _contentTableSoftLimit > 0 && ++visibleRows >= _contentTableSoftLimit)
				visibleRows = -1;
			if(isOnTop)
				onTop[row[$SYM]] = htmlRow;
			else if(notify) {
				htmlPriority += htmlRow;
				notifyRows.push(row);
			}
			else if(visibleRows >= 0)
				htmlNormal += htmlRow;
		}
		if(visibleRows > 0 && _contentTableSoftLimit > 0)
			_contentTableSoftLimit = -_contentTableSoftLimit;
		if(!htmlNormal && !htmlPriority && !Object.keys(onTop).length)
			html += '<tr><td colspan="7">No results found.</td></tr>';
		else {
			for(let key of Object.keys(onTop).sort((a, b) => a.localeCompare(b)))
				html += onTop[key];
			html += htmlPriority + htmlNormal;
		}
		$E('l_more').className = _contentTableSoftLimit > 0 ? 'l_more' : 'l_no_more';
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
			$updateContentTable(doNotify, doNotResetKeyRow);
		}
		else if(notifyRows.length > 0 && doNotify)
			$notify(notifyRows);
	}
}