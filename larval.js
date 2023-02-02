const $L = {

	/* [_] INTERNALS / DEFAULTS */
	_stageURL: '//stage.larval.com/',
	_stageData: null,
	_stageDataSortByColumn: 0,
	_stageDataLastUpdate: 0,
	_stageDataHistoryIndex: -1,
	_stageDataHistory: [],
	_stageDataMap: [],
	_notifications: [],
	_notifyTitleInterval: null,
	_notifyAllowed: null,
	_notifyExceptions: [],
	_animationsComplete: false,
	_forceContentTableShrink: false,
	_nextStagePollTimeout: null,
	_nextStagePollLong: 300,
	_nextStagePollShort: 30,
	_nextStagePollCompleteEpoch: 0,
	_marqueeLastHighlight: 0,
	_marqueeFlashMessage: '',
	_marqueeInterval: null,
	_marqueeFlashTimeout: null,
	_contentTableSoftLimit: 100,
	_contentTableRowCountThatAreInView: 10,
	_titlePrefix: '',
	_title:	'',
	_frameData: null,
	_swipeStartPosition: null,
	_wakeLock: null,
	_symbolsOnTop: {},
	_fragments: {},
	_warnings: [],
	_naId: 'l_na',
	_multipliers: { 'B':1000000000, 'M':1000000, 'K':1000 },
	_symbolsStatic: ['^VIX', '^DJI', '^GSPC', '^IXIC', '^RUT', '^TNX', '^TYX'],
	_assetTypes: ['l_stocks', 'l_etfs', 'l_crypto', 'l_futures', 'l_currency'],
	_char: { 'up':"\u25b2 ", 'down':"\u25bc ", 'updown':"\u21c5 ", 'warning':"\u26a0 ", 'halt':"\u25a0 ", 'etf':"~", 'crypto':"*", 'futures':'^', 'currency':"$" },
	_themes: {
		'default':    ['#A6FDA4', '#E1FDE4', '#88CF86', '#7DFF7A', '#A6FDA4', '#FF4444', '#2A302A', '#303630', '#363C36', '#825900', '#FFDE96', '#FAEED4', '#A6FDA4', '#00AA00', '#85FF92', '#FF0000', '#FDA4A4', '#8FDE8C'],
		'afterhours': ['#95ABFC', '#CDDFFF', '#8BA4FF', '#7492FF', '#D274FF', '#FF4444', '#2A2A30', '#303034', '#36363C', '#660303', '#FF73BB', '#D4DCFA', '#A0FACA', '#00AAAA', '#85FFD6', '#FF0080', '#FDA4CF', '#A6B7F7'],
		'bloodbath':  ['#FC656F', '#FAB6B6', '#F77272', '#FF4747', '#FFAE74', '#FFCC54', '#361010', '#4B1818', '#602121', '#825900', '#FFEC73', '#F2D088', '#D4F0A3', '#91AD03', '#FAB143', '#FF0000', '#FF7070', '#FC868E']
	}, _theme: 'default', _themeBGColorIndex: 7,
	_keyMap: {
		'A': ['https://www.seekingalpha.com/symbol/@', 'https://www.seekingalpha.com/symbol/@-USD'],
		'B': ['https://www.barchart.com/stocks/quotes/@', 'https://www.barchart.com/crypto/coins/@'],
		'C': ['https://www.cnbc.com/quotes/@', 'https://www.cnbc.com/quotes/@.CM='],
		'D': ['https://research.tdameritrade.com/grid/public/research/stocks/summary?symbol=@'],
		'E': ['https://www.etrade.wallst.com/v1/stocks/snapshot/snapshot.asp?symbol=@'],
		'F': ['https://www.finviz.com/quote.ashx?t=@', 'https://www.finviz.com/crypto_charts.ashx?t=@USD'],
		'G': ['https://www.benzinga.com/quote/@', 'https://www.benzinga.com/quote/@-USD'],
		'H': ['https://www.stockcharts.com/h-sc/ui?s=@'],
		'I': ['https://www.investing.com/search/?q=@'],
		'J': ['https://www.wsj.com/market-data/quotes/@'],
		'K': ['https://www.morningstar.com/stocks/xnas/@/quote'],
		'L': ['https://www.fool.com/quote/@', 'https://www.fool.com/quote/crypto/@'],
		'M': ['https://www.marketwatch.com/investing/stock/@', 'https://www.marketwatch.com/investing/cryptocurrency/@USD'],
		'N': ['https://money.cnn.com/quote/quote.html?symb=@'],
		'O': ['https://www.cboe.com/delayed_quotes/@'],
		'P': ['https://eresearch.fidelity.com/eresearch/goto/evaluate/snapshot.jhtml?symbols=@'],
		'Q': ['https://www.nasdaq.com/market-activity/stocks/@'],
		'R': ['https://www.robinhood.com/stocks/@', 'https://www.robinhood.com/crypto/@'],
		'S': ['https://www.stocktwits.com/symbol/@', 'https://www.stocktwits.com/symbol/@.X'],
		'T': ['https://www.tradestation.com/research/stocks/@'],
		'U': ['https://www.gurufocus.com/stock/@'],
		'V': ['https://www.tradingview.com/chart/?symbol=@', 'https://www.tradingview.com/chart/?symbol=@USD'],
		'W': ['https://www.twitter.com/search?q=%24@','https://www.twitter.com/search?q=%24@.X'],
		'X': ['https://www.foxbusiness.com/quote?stockTicker=@'],
		'Y': ['https://finance.yahoo.com/quote/@', 'https://finance.yahoo.com/quote/@-USD', 'https://finance.yahoo.com/quote/@=F', 'https://finance.yahoo.com/quote/@=X'],
		'Z': ['https://www.zacks.com/stock/quote/@'],
	}, _keyRow: 0, _keyMapIndexDefault: 'Y', _keyMapIndex: null,
	_taMap: {
		'AS': ['Ascending triangle', 'asc<i>&nbsp;triangle</i>', 'F'],
		'CD': ['Channel down', 'c<i>hannel&nbsp;</i>down', 'F'],
		'CH': ['Channel', 'chan<i>nel</i>', 'F'],
		'CU': ['Channel up', 'c<i>hannel&nbsp;</i>up', 'F'],
		'D1': ['Barchart directional top 1%', '<i>&nbsp;barchart&nbsp;</i>top&nbsp;1%', 'B'],
		'DB': ['Double bottom', '2x&nbsp;bot<i>tom</i>', 'F'],
		'DE': ['Descending triangle', 'desc<i>&nbsp;triangle</i>', 'F'],
		'DT': ['Double top', '2x&nbsp;top', 'F'],
		'HI': ['Inverse head and Ssoulders', 'inv<i>erse</i>&nbsp;h&amp;s', 'F'],
		'HS': ['Head and shoulders', 'h&nbsp;&amp;&nbsp;s', 'F'],
		'HZ': ['Horizontal S/R', 's&nbsp;&amp;&nbsp;r', 'F'],
		'MB': ['Multiple bottoms', '&gt;2x&nbsp;bot<i>tom</i>s', 'F'],
		'MT': ['Multiple tops', '&gt;2x&nbsp;tops', 'F'],
		'S1': ['Barchart strength top 1%', '<i>&nbsp;barchart&nbsp;</i>top&nbsp;1%', 'B'],
		'TR': ['Technical resistance', 'resist<i>ance</i>', 'F'],
		'TS': ['Technical support', '<i>tech&nbsp;</i>support', 'F'],
		'WD': ['Wedge down', 'wedge<i>&nbsp;down</i>', 'F'],
		'WE': ['Wedge', 'wedge', 'F'],
		'WU': ['Wedge up', 'wedge<i>&nbsp;up</i>', 'F']
	},
	_eventMap: {
		   '#l_root': {
				click:e     => void(0),
		}, '#l_audible, #l_options_only, #l_notify_halts, #l_show': {
				change:e    => $settingsChange(e)
		}, '#l_range_up, #l_range_down, #l_range_volume': {
				input:e     => $updateRangeDisplay(e),
				change:e    => $settingsChange(e)
		}, '#l_content_table': {
				mousemove:e => $keyModeReset()
		}, 'animate': {
				endEvent:e  => e && e.target && e.target.setAttribute('begin', '')
		}
	},
	_clickMap: {
		'l_hotkey_help':_           => $marqueeHotKeyHelp(),
		'l_marquee_flash':_         => $gotoStageDataHistory(0),
		'l_marquee_talk':_          => $W.open('https://stocktwits.com/'+_.raw, _.raw).focus(),
		'l_warning_audio':_         => $notifyPlayAudio(_audioTest, false, true),
		'l_warning_never_notify':_  => $notifyRequestPermission(true),
		'l_fixed':_                 => _animationsComplete ? ($gotoStageDataHistory(0) || $forceNextStagePoll()) : $animationsFastSplash(true),
		'l_last_update':_           => $forceNextStagePoll(),
		'l_range_volume_type':_     => $vpmToggle(),
		'l_settings_button':_       => $settingsButtonToggle(),
		'l_tab':_                   => $settingsTabSelect(_.el),
		'l_content_table_header':_  => $setSortStageData(_.idx),
		'l_notify_enable':_         => $notifyException(_.raw, false),
		'l_notify_disable':_        => $notifyException(_.raw, true),
		'l_news':_                  => $W.open(_stageData['items'][_.idx][$LNK], `l_news_${_.sym}`).focus(),
		'l_ta':_                    => $W.open(_keyMap[_.el.dataset.keymap?_.el.dataset.keymap:_keyMapIndexDefault][$KSTK].replace('@', _.sym), `l_ta_${_.sym}`).focus(),
		'l_marquee_info':_          => $setURLFormat(_.sym, false),
		'l_history_toggle':_        => $historyDropDownToggle(_.idx, [$PCT5,$PCT,$PRC,$VOL,$AGE]),
		'alt_default':_             => _.raw ? $setSymbolsOnTop(_.raw, null, true) : $editSymbolsOnTop(),
		'default':_                 => $W.open($createURL(_.sym, _.type), `l_${_.type}_${_.sym}`).focus()
	},
	_hotKeyMap: {
		'Tab':(e,ev)                => $animationsToggle(null, ev.shiftKey),
		'ShiftLeft':(e,ev)          => $rollContentTable(ev.shiftKey),
		'ShiftRight':(e,ev)         => $rollContentTable(ev.shiftKey),
		'Backspace':e               => $vpmToggle(),
		'Backquote':e               => $editSymbolsOnTop(),
		'Slash':e                   => $marqueeHotKeyHelp(),
		'F5':e                      => $settingsClear('User requested.'),
		'F12':e                     => $setThemeRandom('<i>Going under the hood?</i> Let\'s make the outside look as hideous as the inside first.'),
		'Home':e                    => _keyRow = 1,
		'End':e                     => _keyRow = e.parentElement.childElementCount - 1,
		'PageUp':e                  => _keyRow-=_contentTableRowCountThatAreInView,
		'PageDown':e                => _keyRow+=_contentTableRowCountThatAreInView,
		'ArrowUp':e                 => _keyRow--,
		'ArrowDown':e               => _keyRow++,
		'ArrowLeft':e               => $gotoStageDataHistory(1),
		'ArrowRight':e              => $gotoStageDataHistory(-1),
		'Escape':e                  => $gotoStageDataHistory(0) || $settingsButtonToggle(true) || $scrollToTop(),
		'Space':e                   => $onclick(e),
		'Enter':e                   => $onclick(e),
		'NumpadEnter':e             => $onclick(e)
	},
	_enumMap: {
		'SYM':_  => $H(_.val),
		'NAM':_  => _forceContentTableShrink ? $F('f_empty_cell') : $H(_.val),
		'PCT5':_ => $isHaltRow(_.row) ? $H(_.val?_.val:'HALTED') : $htmlPercent(_.val,2),
		'PCT':_  => $htmlPercent(_.val,2),
		'PRC':_  => '$' + $N(_.val,_.row[$OPT]=='currency'&&_.val<10?4:2),
		'VOL':_  => $multiplierFormat(_.val,1,true),
		'OPT':_  => $H(_.val),
		'OIV':_  => _.row[$SYM][0]==_char['crypto'] ? ('MC#'+_.val) : ($H(_.val>0?_.val:('~'+Math.abs(_.val))))+'%IV',
		'ERN':_  => $H(_.val),
		'PRC5':_ => (_.val<0?'-$':'+$') + $N(Math.abs(_.val),_.row[$OPT]=='currency'?4:2),
		'VOL5':_ => '+' + $multiplierFormat(_.val,1),
		'PCTM':_ => 'M=' + $htmlPercent(_.val,0),
		'PCTY':_ => 'Y=' + $htmlPercent(_.val,0),
		'NWS':_  => $H(_.val),
		'LNK':_  => _.val,
		'TAN':_  => $H(_.val),
		'HLT':2, 'TAN':8, 'AGE': 6,
		'KSTK':0, 'KETF':0, 'KCRP':1, 'KFTR':2, 'KCUR':3,
		'WAUD':0, 'WNOT':1
	},
	_settings: {
		'l_version':          2,
		'l_audible':          false,
		'l_notify_halts':     true,
		'l_options_only':     false,
		'l_keymap_index':     '',
		'l_symbols_on_top':   '',
		'l_exceptions':       '',
		'l_vpm':              null,
		'l_no_notifications': false,
		'l_stocks':           { 'l_show':true,  'l_range_up':50,  'l_range_down':50,  'l_range_volume':25,   'multiplier':'K', 'percent_shift':10,  'volume_shift':1,   'vpm_shift':10,   'vpm_precision':1 },
		'l_stocks_ah':        { 'l_show':true,  'l_range_up':100, 'l_range_down':100, 'l_range_volume':null, 'multiplier':'K', 'percent_shift':10,  'volume_shift':1,   'vpm_shift':1,    'vpm_precision':0 },
		'l_etfs':             { 'l_show':true,  'l_range_up':100, 'l_range_down':100, 'l_range_volume':50,   'multiplier':'M', 'percent_shift':100, 'volume_shift':100, 'vpm_shift':1000, 'vpm_precision':0 },
		'l_crypto':           { 'l_show':false, 'l_range_up':50,  'l_range_down':50,  'l_range_volume':25,   'multiplier':'M', 'percent_shift':10,  'volume_shift':1,   'vpm_shift':1000, 'vpm_precision':0 },
		'l_futures':          { 'l_show':false, 'l_range_up':50,  'l_range_down':50,  'l_range_volume':null, 'multiplier':'K', 'percent_shift':100, 'volume_shift':1,   'vpm_shift':1,    'vpm_precision':0 },
		'l_currency':         { 'l_show':false, 'l_range_up':25,  'l_range_down':25,  'l_range_volume':null, 'multiplier':'K', 'percent_shift':100, 'volume_shift':1,   'vpm_shift':1,    'vpm_precision':0 }
	}, _settingsBase: {}, _settingsSelectedTab: {}, _settingsSelectedTabName: '',
	_vibrateAlert: [250,250,500,250,750,250,1000], _audioAlert: 'larval.mp3', _audioTest: 'data:audio/mpeg;base64,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',

	/* [$] SHORTHAND / COMMON */
	A: query => (_A = $D.querySelectorAll(query)), _A: null,
	C: className => (_C = $D.getElementsByClassName(className)), _C: null,
	D: document,
	E: id => (_E = $D.getElementById(id)), _E: null,
	F: (id, a) => (_F = (_fragments[id]?_fragments[id]:(_fragments[id]=($E(id)?_E.innerHTML:id).split('@'))).forEach((x,i)=>a&&a.splice(i*2,0,_fragments[id][i]))||(a?a:_fragments[id]).join('')), _F: null,
	H: string => (_H = (_H=$D.createElement('p'))&&((_H.textContent=string)) ? _H.innerHTML : ''), _H: null,
	I: (array, item) => (_I = array.indexOf(item)), _I: -1,
	N: (number, digits) => number.toLocaleString(undefined, { minimumFractionDigits: digits,  maximumFractionDigits: digits }),
	P: (count, total) => Math.round(count / total * 100),
	Q: query => (_Q = $D.querySelector(query)), _Q: null,
	T: tagName => (_T = $D.getElementsByTagName(tagName)), _T: null,
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
		for(let query of Object.keys(_eventMap)) {
			if(!$A(query))
				continue;
			for(let a=0; a < _A.length; a++) {
				for(let e of Object.keys(_eventMap[query]))
					_A[a].addEventListener(e, _eventMap[query][e]);
			}
		}
		$D.body.id = $D.body.className = 'l_n';
		if($E('l_awaiting_data')) _E.innerText = _E.title;
		_title = document.title;
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
			sym = _stageData['items'][dataRef] ? _stageData['items'][dataRef][$SYM] : dataRef;
		}
		if((e.ctrlKey || e.altKey || e.type=='contextmenu') && (el.dataset&&el.dataset.alt!='none'))
			ref = 'alt_default';
		else if(sym && !ref)
			ref = 'default';
		else if(!ref)
			return;
		const raw=sym;
		if($I(_symbolsStatic,sym) >= 0)      { type = $KSTK; sym = _symbolsStatic[_I]; }
		else if(sym[0] == _char['etf'])      { type = $KETF; sym = sym.substr(1); }
		else if(sym[0] == _char['crypto'])   { type = $KCRP; sym = sym.substr(1); }
		else if(sym[0] == _char['futures'])  { type = $KFTR; sym = sym.substr(1); }
		else if(sym[0] == _char['currency']) { type = $KCUR; sym = ((sym.substr(-1)=='-'?'USD':sym)+(sym.substr(-1)=='+'?'USD':sym)).replace(/[^A-Z]+/g,''); }
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
				$marqueeFlash(`The &quot;<i>${e.code}</i>&quot; key is not mapped, type &quot;<i>?</i>&quot; to see the supported hotkeys.`);
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
		if(!$isVisible())
			return;
		$updateTitleWithPrefix('');
		$notifyRequestWakeLock();
		while(_notifications.length > 0)
			(_notifications.shift()).close();
		if(!_marqueeInterval)
			return;
		$marqueeUpdate(true);
		$animationsProgressReset();
	},
	onresize: e => {
		if($isMobile(false)) return;
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
	ontouchstart: e => { _swipeStartPosition = [e.changedTouches[0].clientX, e.changedTouches[0].clientY, -1]; },
	ontouchmove: e => {
		const height=$W.innerHeight||$D.documentElement.clientHeight||$D.body.clientHeight, yDiff=e.changedTouches[0].clientY-_swipeStartPosition[2];
		if($W.pageYOffset || !_animationsComplete || !_swipeStartPosition || height < 1)
			return;
		else if(_swipeStartPosition[2] < 0)
			_swipeStartPosition[2] = e.changedTouches[0].clientY;
		else if($E('l_fixed_highlight'))
			_E.style.opacity = String(Math.min(1, yDiff*2/height));
	},
	ontouchend: e => {
		if($E('l_fixed_highlight') && _E.style.opacity)
			_E.style.opacity = 0;
		if(!_swipeStartPosition)
			return;
		const swipeMovement = [e.changedTouches[0].clientX-_swipeStartPosition[0], e.changedTouches[0].clientY-_swipeStartPosition[1], e.changedTouches[0].clientY-_swipeStartPosition[2]],
			width = $W.innerWidth||$D.documentElement.clientWidth||$D.body.clientWidth,
			height = $W.innerHeight||$D.documentElement.clientHeight||$D.body.clientHeight,
			movementPercent = [Math.abs(swipeMovement[0])/width*100, Math.abs(swipeMovement[1])/height*100, swipeMovement[2]/height*100],
			movementWeighting = (movementPercent[0]+1) / (movementPercent[1]+1);
		if(movementPercent[0] > 25 && movementWeighting >= 1)
			$gotoStageDataHistory(swipeMovement[0]);
		else if(movementPercent[2] > 25 && movementWeighting <= 1 && _swipeStartPosition[2] > 0)
			$forceNextStagePoll();
		_swipeStartPosition = null;
	},

	/* [$] FUNCTIONS */
	animationsComplete: fastSplash => {
		if(_animationsComplete)
			return;
		_animationsComplete = true;
		if(!fastSplash && $E(_naId))
			_E.className = _naId;
		$E('l_root').className = 'l_animations_complete';
		$E('l_menu').className = (_stageData && !$isWeekend() ? $getMode('l_') : 'l_default');
		$setNextStagePoll(!_stageData||!_stageData['items'] ? _nextStagePollShort : $getSynchronizedNext());
		if($hasSettings() && _stageData && _stageData['top'] && _stageData['top'].length > 1)
			$marqueeUpdate();
		else
			$marqueeInitiate();
		$marqueeIntervalReset();
		if($isVisible())
			$notifyPlayAudio(_audioTest);
		$updateContentTable(true);
		if($isMobile(true) || _settings[_naId])
			$animationsToggle(false, null);
	},
	animationsFastSplash: () => {
		if(_animationsComplete || !_stageData)
			return;
		$animationsReset('l_logo', 'l_logo 0.5s ease 1 normal 0.5s forwards');
		$animationsReset('l_fixed', 'l_fixed 0.5s ease 1 normal forwards');
		$animationsReset('l_marquee_container', 'l_marquee_container 0.5s ease forwards');
		$animationsComplete(true);
		$animationsUpdateFlash();
	},
	animationsUpdateFlash: nextPollMS => {
		if(!_animationsComplete || !$T('path'))
			return;
		for(let t=0,i=0; t < _T.length; t++) {
			const path=_T[t], animate=path.lastElementChild, flashable=path.classList.contains('l_logo_worm_flashable');
			if(animate.getAttribute('begin')) {
				animate.setAttribute('begin', '');
				animate.beginElement();
				continue;
			}
			animate.setAttribute('values', (flashable?'1;':'0;') + animate.getAttribute('values').replace(/^.+;([0-9\.]+)$/, '$1')); 
			path.appendChild(animate);
			if(flashable)
				i += 0.1;
			animate.beginElementAt(i);
		}
		if(nextPollMS && nextPollMS > 0) {
			$setNextStagePoll(nextPollMS, true);
			$scrollToTop();
		}
	},
	animationsToggle: (explicit, saveSettings) => {
		const animations = (typeof explicit == 'boolean' ? explicit : !!$E(_naId));
		if(saveSettings)
			$settings(_naId, !animations);
		$D.body.id = animations ? 'l_n' : _naId;
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
			if(!fps || $E(_naId) || _settings[_naId] || $isMobile(true) || !['requestAnimationFrame','performance'].every(fn=>$W[fn]))
				return($removeFunction('animationsDisableIfUnderFPS'));
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
			$marqueeFlash('Slow graphics detected, disabling most animations.  Use the <i>tab</i> key to re-enable.');
			$removeFunction('animationsDisableIfUnderFPS');
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
		if(!(_keyMapIndex=_settings['l_keymap_index']))
			_keyMapIndex = _keyMapIndexDefault;
		for(let key in _keyMap) {
			for(let type of [$KCRP,$KFTR,$KCUR]) {
				if(!_keyMap[key][type])
					_keyMap[key][type] = _keyMap[_keyMapIndexDefault][type];
			}
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
	vpmToggle: () => {
		if(_settings['l_vpm'] === null && !confirm('Toggle from "volume per day" to the average "volume per minute" (VPM)?'))
			return;
		$settings('l_vpm', !_settings['l_vpm']);
		_stageData = $vpmStageData(_stageData);
		$updateRangeDisplay('l_range_volume');
		$updateContentTable();
	},
	vpmStageData: stageData => {
		const vpm=_settings['l_vpm'];
		if(!(stageData['vpm'] ^ vpm))
			return(stageData);
		let stageTime=new Date(stageData['ts']*1000), minutesSinceOpen=0, minutesInADay=1440, args;
		if(!stageData['afterhours'])
			args = {'hourOffset':9.5, 'maxMinutes':390};
		else if(stageTime.getHours() < 10)
			args = {'hourOffset':7,   'maxMinutes':150};
		else
			args = {'hourOffset':16,  'maxMinutes':240};
		if((minutesSinceOpen=(stageTime.getHours()-args.hourOffset)*60+stageTime.getMinutes()) > args.maxMinutes)
			minutesSinceOpen = args.maxMinutes;
		for(let i=0; i < stageData['items'].length; i++) { 
			const minutes = (stageData['items'][i][$SYM][0]==_char['crypto'] ? minutesInADay : minutesSinceOpen);
			[$VOL,$VOL5].forEach(column => {
				if(typeof stageData['items'][i][column] != 'number')
					return;
				else if(minutes < 1 || stageData['items'][i][column] < 1)
					stageData['items'][i][column] = 0;
				else if(vpm)
					stageData['items'][i][column] = Math.round(stageData['items'][i][column] / minutes);
				else
					stageData['items'][i][column] *= minutes;
			});
		}
		stageData['vpm'] = vpm;
		return(stageData);
	},
	getData: (jsonFile, jsonCallback, args) => {
		fetch(_stageURL+jsonFile+'?ts='+new Date().getTime())
		.then(resp => resp.json())
		.then(json => jsonCallback(json, args))
		.catch(err => jsonCallback(null, args));
	},
	setStageData: stageData => { 
		_stageData = $vpmStageData(stageData);
		_contentTableSoftLimit = Math.abs(_contentTableSoftLimit);
		if($setTheme($getMode()) !== false && $Q('meta[name="theme-color"]'))
			_Q.setAttribute('content', _themes[_theme][_themeBGColorIndex]);
	},
	getStageData: updateView => $getData('stage.json', $parseStageData, {'updateView':updateView}),
	parseStageData: (json, args) => {
		let retry=false;
		if(!json || !json['ts'] || (_stageDataHistory.length > 0 && _stageDataHistory[_stageDataHistory.length-1]['ts'] == json['ts']))
			retry = true;
		else if(_stageDataHistoryIndex >= 0)
			_stageDataHistory.push($cloneObject(json));
		else {
			$setStageData(json);
			$E('l_last_update').innerHTML = $epochToDate(_stageDataLastUpdate=_stageData['ts']);
			if(!$hasSettings() && _stageDataHistory.length==0) {
				if(_stageData['afterhours']=='idle')
					$settings('l_show', true, true, 'l_crypto');
				else if(_stageData['afterhours']=='futures') {
					$settings('l_show', true, true, 'l_futures');
					$settings('l_show', true, true, 'l_currency');
				}
				$settingsTabUpdateUI();
			}
			_stageDataHistory.push($cloneObject(_stageData));
			$sortStageData(false);
			_forceContentTableShrink = false;
			if(args && args['updateView']) {
				$updateContentTable(true);
				$marqueeUpdate(true, true);
			}
			if(_stageData['notify'] && $hasSettings())
				$marqueeFlash(`${$F('f_marquee_blink')}<span id="l_marquee_notify">${_stageData['notify']}</span>${_F}`, false, 8000);
			$animationsUpdateFlash();
		}
		$setNextStagePoll(retry ? _nextStagePollShort : $getSynchronizedNext());
	},
	getHistoryData: args => $getData('history.json', $parseHistoryData, args),
	parseHistoryData: (json, args) => {
		let error=false, dropDownMode=(args&&args['dropDownTypes']);
		$getHistoryData = null;
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
				if(dropDownMode)
					$historyDropDown(args['dropDownIndex'], args['dropDownTypes'])
				else {
					_stageDataHistoryIndex = h - 1;
					$updateStageDataHistory();
				}
			}
			else
				error = true;
		}
		if(!error)
			return;
		else if(dropDownMode)
			$historyDropDown(args['dropDownIndex'], args['dropDownTypes']);
		else
			$marqueeFlash('Sorry, no additional history is available to rewind to at this time.');
	},
	getHistoryForSymbol: (sym, ts) => {
		return _stageDataHistory.filter(stageData => stageData['ts'] <= ts).map(history => {
			const epoch=$epochNow();
			for(row of history['items']) {
				if(row[$SYM]==sym && !$isHaltRow(row))
					return([...row, null, `~${Math.round((epoch-history['ts'])/60,0)}m&nbsp;ago`]);
			}
		}).reverse();
	},
	historyDropDownToggle: (idx, types) => $getHistoryData ? $getHistoryData({'dropDownIndex':idx,'dropDownTypes':types}) : $historyDropDown(idx,types),
	historyDropDown: (idx, types) => {
		let stageRow=_stageData['items'][idx], stageDataForSymbols=$getHistoryForSymbol(stageRow[$SYM], _stageData['ts']), hadHistoryDisplays=[];
		if(!stageDataForSymbols)
			return;
		if($A('.l_history_active'))
			hadHistoryDisplays = Array.from(_A).map(e => e.remove() || e.id);
		if($A('.l_history'))
			_A.forEach(e => e.classList.remove('l_history'));
		for(type of types) {
			const historyId=`l_history_${idx}_${type}`, hadHistoryDisplay=($I(hadHistoryDisplays,historyId)>=0), isAge=(type==$AGE);
			if(!$Q(`[data-ref='${idx}'] td:nth-of-type(${type+1})`))
				continue;
			let htmlItems=[], lastItem=null;
			stageDataForSymbols.forEach((row, idx) => {
				const isLast=(idx>=stageDataForSymbols.length-1);
				if(lastItem == $F('f_blank_line') && isLast)
					htmlItems.pop();
				else if(row && row[$PCT5])
					htmlItems.push(lastItem=`<div class="l_hover_container">${isAge?row.slice(-1)[0]:$cell(row,type)}</div>`);
				else if(lastItem != _F && !isLast)
					htmlItems.push(lastItem=_F);
			});
			if(htmlItems.length == 0)
				htmlItems.push(`<div class="l_hover_container">${$cell(stageRow,type)}</div>`);
			_Q.classList[hadHistoryDisplay?'remove':'add']('l_history');
			if(!hadHistoryDisplay)
				_Q.insertAdjacentHTML('beforeend', `<div id="${historyId}" class="l_history_active">${htmlItems.join('')}</div>`);
		}
		if($isSafari())
			$forceRedraw($E('l_content_table'));
	},
	gotoStageDataHistory: direction => {
		const lastIndex=_stageDataHistoryIndex;
		if(!direction) {
			_keyRow = 0;
			if(_stageDataHistoryIndex >= 0)
				_stageDataHistoryIndex = -1;
		}
		else if(direction < 0) {
			if(_stageDataHistory.length < 2 || _stageDataHistoryIndex < 0)
				$marqueeFlash('You are already viewing live data, use the <i>&#8656;</i> key to rewind.');
			else if(_stageDataHistoryIndex + 2 >= _stageDataHistory.length)
				_stageDataHistoryIndex = -1;
			else
				_stageDataHistoryIndex++;
		}
		else if(direction > 0) {
			if($getHistoryData && _stageDataHistoryIndex == (_stageDataHistory.length < 2 ? -1 : 0)) {
				$marqueeFlash('Attempting to gather recent history from the server...');
				$getHistoryData();
			}
			else if(_stageDataHistoryIndex < 0)
				_stageDataHistoryIndex = _stageDataHistory.length - 2;
			else if(_stageDataHistoryIndex > 0)
				_stageDataHistoryIndex--;
			else
				$marqueeFlash('End of history, use <i>&#8658;</i> to move forward or <i>escape</i> to exit.', true);
		}
		if(lastIndex !== _stageDataHistoryIndex) {
			$updateStageDataHistory();
			return(true);
		}
		return(false);
	},
	updateStageDataHistory: () => {
		const historyTotal=_stageDataHistory.length-1, historyIndex=_stageDataHistoryIndex<0?historyTotal:_stageDataHistoryIndex;
		const stageData=$cloneObject(_stageDataHistory[_stageDataHistoryIndex >= 0 ? _stageDataHistoryIndex : historyTotal]);
		$setStageData(stageData);
		$sortStageData(true);
		const minutesAgo=Math.round(($epochNow()-_stageData['ts'])/60,0);
		if(historyIndex == historyTotal)
			$marqueeFlash('All caught up, exiting history mode...', true);
		else
			$marqueeFlash(`Rewound to ${$epochToDate(_stageData['ts'])}: <i class='l_marquee_alt_padded'>${minutesAgo} minutes ago</i>${$getHistoryData?'':' ['+$P(historyTotal-historyIndex,historyTotal)+'%]'}`, true);
	},
	setNextStagePoll: (seconds, marqueeInitiate) => {
		if(_animationsComplete)
			$animationsReset('l_progress_display', `l_progress ${seconds}s linear forwards`);
		if(_nextStagePollTimeout)
			clearTimeout(_nextStagePollTimeout);
		_nextStagePollTimeout = setTimeout(() => $setNextStagePollComplete(marqueeInitiate), seconds * 1000);
		_nextStagePollCompleteEpoch = $epochNow() + seconds;
	},
	setNextStagePollComplete: marqueeInitiate => {
		if(_nextStagePollTimeout)
			clearTimeout(_nextStagePollTimeout);
		_nextStagePollTimeout = null;
		if(marqueeInitiate)
			$marqueeInitiate();
		$getStageData(true);
	},
	multiplierFormat: (number, digits, approx) => {
		if(typeof number != 'number')
			return(number);
		for(let prefix in _multipliers) {
			if(number >= _multipliers[prefix])
				return((number/_multipliers[prefix]).toFixed(digits) + prefix);
		}
		return(approx ? '~'+(Math.ceil(number/100)*100).toString() : number.toString());
	},
	multiplierExplicit: (value, multiplier, precision) => _multipliers[multiplier] ? ((value/_multipliers[multiplier]).toFixed(precision) + multiplier) : value,
	htmlPercent: (number, precision) => number ? ($N(Math.abs(number), precision) + $F(number>0?'f_l_up':'f_l_down')) : $F('f_empty_cell'),
	scrollToTop: smooth => $W.scrollTo({top: 0, behavior: smooth ? 'smooth' : 'auto'}),
	forceNextStagePoll: () => $animationsUpdateFlash(0.75),
	epochNow: () => Math.floor(Date.now() / 1000),
	epochToDate: epoch => new Date(epoch * 1000).toLocaleTimeString('en-US', {weekday:'short',hour:'numeric',minute:'2-digit',timeZoneName:'short'}),
	cloneObject: obj => typeof structuredClone=='function' ? structuredClone(obj) : JSON.parse(JSON.stringify(obj)),
	updateTitleWithPrefix: setPrefix => $D.title = (typeof setPrefix=='string' ? (_titlePrefix=setPrefix) : _titlePrefix) + _title,
	removeFunction: fn => $W['$'+fn] = $L[fn] = () => {},
	forceRedraw: el => el && (el.style.transform='translateZ(0)') && void el.offsetHeight,
	getMode: prefix => (prefix?prefix:'') + (['afterhours', 'bloodbath'].find(key => _stageData[key]) || 'default'),
	setTheme: name => (_theme!=name && _themes[name] && _themes[_theme=name].forEach((color,i) => $D.body.style.setProperty(`--l-color-${i}`,color))),
	setThemeRandom: message => {
		_theme = '', _themes['random'] = _themes['default'].map(() => '#'+(2**32+Math.floor(Math.random()*2**32)).toString(16).substr(-6));
		$setTheme('random');
		$marqueeFlash(message, false, 20000);
	},
	settingsTabUpdateUI: () => _assetTypes.forEach(type => $E(type).classList[_settings[type]['l_show']?'add':'remove']('l_show')),
	settingsTabSelect: el => {
		const id=(el?el.id:_settingsSelectedTabName);
		if(!id) return;
		if($E(_settingsSelectedTabName))
			_E.classList.remove('l_tab_selected');
		if($E(id))
			_E.classList.add('l_tab_selected');
		_settingsSelectedTab = _settings[_settingsSelectedTabName=id];
		$settingsLoad(true);
		$settingsTabUpdateUI();
	},
	settingsButtonToggle: forceClosed => {
		if(!_stageData) return;
		const controlHeight=($E('l_control').scrollHeight > 200 ? $E('l_control_table').scrollHeight : 250)+'px', closed=($E('l_control').style.height!=controlHeight), grow=(!forceClosed&&closed);
		$E('l_control').style.height = (grow?controlHeight:'0px');
		$E('l_settings_button').innerHTML = (grow?'&#9660; settings &#9660;':'&#9650; settings &#9650;');
		return !(closed ^ grow);
	},
	settingsChange: e => { 
		const context = (e&&e.target) ? e.target : null;
		for(let inputs=$T('input'), i=0; i < inputs.length; i++) {
			let input=inputs[i];
			if(input.type == 'checkbox')
				$settings(input.id, input.checked);
			else if(input.type == 'range' && !input.disabled)
				$settings(input.id, parseInt(input.value,10));
		}
		if(context && context.id == 'l_audible' && context.checked)
			$notifyPlayAudio(_audioTest);
		$settingsTabUpdateUI();
		$updateContentTable(false);
	},
	settings: (name, value, passive, tab) => {
		if(tab)
			_settings[tab][name] = value;
		else if(_settingsSelectedTab && typeof _settingsSelectedTab[name] != 'undefined')
			_settingsSelectedTab[name] = value;
		else
			_settings[name] = value;
		if(!passive || $hasSettings())
			localStorage.setItem('larval', JSON.stringify(_settings));
	},
	settingsLoad: passive => {
		_naId = $isMobile(true) ? 'l_nam' : 'l_na';
		let now=new Date(), exs=null, settings=null;
		if(!Object.keys(_settingsBase).length)
			_settingsBase = $cloneObject(_settings);
		if(!passive && localStorage.getItem('larval') && (settings=JSON.parse(localStorage.getItem('larval')))) {
			if(settings['l_version'] == _settings['l_version'])
				_settings = settings;
			else 
				$settingsClear('Version change.');
		}
		if((exs=_settings['l_exceptions']) && (exs=exs.split(/\s+/)) && exs.shift()==now.toLocaleDateString())
			_notifyExceptions = exs.filter(Boolean);
		else
			$settings('l_exceptions', '', true);
		$getSymbolsOnTop();
		if(!$hasSettings() && $isWeekend(now)) {
			$settings('l_show', false, true, 'l_stocks_ah');
			$settings('l_show', false, true, 'l_etfs');
			$settings('l_show', true, true, 'l_crypto');
			$settingsTabUpdateUI();
		}
		for(let key of Object.keys(_settings)) {
			if($E(key) && _E.type == 'checkbox')
				_E.checked = _settings[key];
		}
		for(let key of Object.keys(_settingsSelectedTab)) {
			if(!$E(key) || !_E['type'])
				continue;
			else if(_E.type == 'checkbox')
				_E.checked = _settingsSelectedTab[key];
			else if(_E.type == 'range')
				_E.value = (typeof _settingsSelectedTab[key]=='number' ? _settingsSelectedTab[key] : 0);
		}
		for(let id of ['l_range_up','l_range_down','l_range_volume'])
			$updateRangeDisplay(id);
	},
	settingsClear: message => {
		$marqueeFlash('Clearing local settings'+(message?`: <i class="l_marquee_alt_padded">${message}</i>`:'...'));
		localStorage.clear();
		_settings = $cloneObject(_settingsBase);
		$settingsLoad(true);
		$settingsTabUpdateUI();
		$updateContentTable(false);
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
		if(id == 'l_range_volume') {
			if(!(input.disabled=typeof _settingsSelectedTab['l_range_volume']!='number'))
				display.innerHTML = (_settings['l_vpm'] ? $multiplierExplicit(input.value*_multipliers[_settingsSelectedTab['multiplier']] / _settingsSelectedTab['vpm_shift'],'K',_settingsSelectedTab['vpm_precision']) : ((input.value / _settingsSelectedTab['volume_shift']).toFixed(Math.ceil(Math.log10(_settingsSelectedTab['volume_shift']))) + _settingsSelectedTab['multiplier']));
			else
				display.innerHTML = 'N/A';
		}
		else
			display.innerHTML = (input.value / _settingsSelectedTab['percent_shift'] * (id=='l_range_down'?-1:1)).toFixed(Math.ceil(Math.log10(_settingsSelectedTab['percent_shift'])))
		if(_settings['l_vpm'] !== null)
			$E('l_range_volume_type').innerHTML = (_settings['l_vpm'] ? 'vpm' : 'vol');
	},
	marqueeInitiate: html => {
		const marquee=$E('l_marquee'), marqueeContent=$E('l_marquee_content'), marqueeContentClone=$E('l_marquee_content_clone');
		if(html) marqueeContent.innerHTML = html;
		marqueeContentClone.innerHTML = '';
		void marquee.offsetWidth;
		const fullWidthPreClone=marquee.scrollWidth, viewWidthPreClone=marquee.offsetWidth;
		marqueeContentClone.innerHTML = marqueeContent.innerHTML;
		$D.documentElement.style.setProperty('--l-marquee-start', `-${viewWidthPreClone}px`);
		$D.documentElement.style.setProperty('--l-marquee-end', `-${fullWidthPreClone}px`);
		$animationsReset(marquee, `l_marquee ${$marqueeLengthToSeconds()}s linear infinite`);
		const secsToHighlight = $marqueeSecondsToLastHighlight();
		if(secsToHighlight > 0 && _animationsComplete && !_marqueeFlashMessage && _stageDataLastUpdate > _marqueeLastHighlight) {
			if(!$isVisible())
				$updateTitleWithPrefix(_char['updown']);
			else {
				const repeatCount=Math.floor(secsToHighlight/3), highlightElement=($isMobile()?'l_menu':'l_marquee_container');
				$animationsReset(highlightElement, `${highlightElement}_highlight 3s ease-in forwards ${repeatCount<3?3:repeatCount}`);
				_marqueeLastHighlight = _stageDataLastUpdate;
			}
		}
	},
	marqueeUpdate: (resetInterval, passive) => {
		if(!_animationsComplete || !_stageData || !_stageData['top'] || _stageData['top'].length < 2 || (passive && $E('l_marquee_about')))
			return;
		else if(_stageData['marquee']) {
			$marqueeInitiate(_stageData['marquee']);
			return;
		}
		let html=$F('f_marquee_blink_wide'), itemHtml='', rank=0, maxRank=20, topType='', lastTopType='';
		_warnings.filter(Boolean).forEach(msg => itemHtml += `<div class="l_marquee_warning"><i>${_char['warning']} WARNING ${_char['warning']}</i>${msg}</div> `);
		if(itemHtml)
			html = itemHtml + _F;
		for(let i=0; i < _stageData['top'].length; i++) {
			let item=_stageData['top'][i];
			if(item.length>2 && typeof item[2]=='string') {
				topType = 'index';
				itemHtml = `<div class="l_marquee_link" data-ref="${item[0]}"><i class='l_marquee_alt_padded_right'>${$H(item[2])}</i>`;
				if(item.length > 3)
					itemHtml += `<div class="l_marquee_highlight" data-ref="${item[0]}">&#10094;<i>${item[3]<0?'&#9660;':'&#9650;'} ${Math.abs(item[3]).toFixed(2)}%</i> &#10095; &#10140;</div> `;
				itemHtml += `${item[1]<0?'&#9660;':'&#9650;'} ${Math.abs(item[1]).toFixed(2)}%</div> `;
			}
			else if(item.length==2 && typeof item[1]=='string') {
				topType = 'talk';
				itemHtml = `<div class="l_marquee_talk" data-ref="${item[0]}"><span>@${item[0].replace(/[^A-Z0-9_].+/i,'')}:</span> ${item[1].replace(/(\$[A-Z.]+)/g,"<i>$1</i>")}</div> `;
			}
			else if(item[0][0] != _char['crypto'] || $isShowing('l_crypto')) {
				topType = 'default';
				if(!rank && i >= 5)
					maxRank /= 2;
				itemHtml = `<div class="l_marquee_link" data-ref="${item[0]}"><i class='l_marquee_alt_padded_right'>#${++rank}</i>${item[0]} &#177; `;
				if(item.length > 2)
					itemHtml += `<div class="l_marquee_highlight" data-ref="${item[0]}">&#10094;<i>${item[2]<0?'&#9660;':'&#9650;'} ${Math.abs(item[2]).toFixed(2)}%</i> &#10095; &#10140;</div> `;
				itemHtml += `${item[1]}%</div> `;
				if(rank >= maxRank)
					lastTopType = topType = 'break';
			}
			else
				continue;
			if(itemHtml)
				html += (i && lastTopType!=topType ? _F : '') + itemHtml;
			if(topType == 'break')
				break;
			lastTopType = topType;
		}
		$marqueeInitiate(html);
		if(resetInterval)
			$marqueeIntervalReset();
	},
	marqueeLengthToSeconds: useMS => ((($E('l_marquee_content')&&_E.clientWidth) ? (_E.clientWidth/85) : ((_E.textContent.length||100)/6)) * (useMS?1000:1)),
	marqueeSecondsToLastHighlight: useMS => {
		if(!$A('#l_marquee_content .l_marquee_highlight') || _A.length < 1)
			return(0);
		else {
			const marquee=$E('l_marquee'), lastHighlightedElement=_A[_A.length-1], pixelsToLastHighlight=Math.round(lastHighlightedElement.getBoundingClientRect().x - marquee.offsetLeft + (marquee.clientWidth/2), 0);
			const pixelsPerSeconds=$E('l_marquee_content').clientWidth/$marqueeLengthToSeconds(), secondsToLastHighlight=Math.round(pixelsToLastHighlight/pixelsPerSeconds,0);
			return(secondsToLastHighlight * (useMS?1000:1));
		}
	},
	marqueeFlash: (message, priority, duration) => {
		if(_marqueeFlashTimeout)
			_marqueeFlashTimeout = clearTimeout(_marqueeFlashTimeout);
		if(_stageDataHistoryIndex >= 0 && (!message || !priority))
			return;
		_marqueeFlashMessage = message;
		if($E('l_marquee_container').style.animationName == 'l_marquee_container_highlight')
			$animationsReset('l_marquee_container', 'l_marquee_container_normal 0s linear forwards');
		$E('l_marquee_container').classList[$E(_naId)?'add':'remove']('l_na_marquee_container_override');
		$E('l_marquee_flash').innerHTML = _marqueeFlashMessage ? _marqueeFlashMessage : '';
		$E('l_marquee').style.display = _marqueeFlashMessage ? 'none' : 'inline-block';
		$E('l_marquee_flash').style.display = _marqueeFlashMessage ? 'inline-block' : 'none';
		if(_marqueeFlashMessage) {
			$scrollToTop();
			$marqueeIntervalReset();
			_marqueeFlashTimeout = setTimeout($marqueeFlash, duration?duration:5000);
			$animationsReset('l_marquee_flash', 'l_content_fade_in 1s ease forwards');
		}
		else {
			$E('l_marquee_container').classList.remove('l_na_marquee_container_override');
			$marqueeUpdate();
		}
	},
	marqueeIntervalReset: () => {
		if(_marqueeInterval)
			clearInterval(_marqueeInterval);
		_marqueeInterval = setInterval($marqueeUpdate, $marqueeLengthToSeconds(true));
	},
	marqueeHotKeyHelp: () => {
		let key, match, html=`${$F('f_marquee_blink')} The following hotkeys and gestures are available: ${_F} Use the <i class="l_marquee_alt">tab</i> key to alternate animation modes. ${_F} Alt-click rows or use the <i class="l_marquee_alt">~</i> key to keep specific symbols on top. ${_F} Swipe or use <i class="l_marquee_alt">&#8644;</i> arrow keys to rewind and navigate your backlog history. ${_F} Use <i class="l_marquee_alt">&#8645;</i> arrow keys to navigate to a row followed by selecting one of these hotkeys: `;
		for(let key in _keyMap) {
			if((match=_keyMap[key][$KSTK].match(/([a-z]+)\.[a-z]+\//i)))
				html += `<div class="l_marquee_info" data-ref="${key}"><i class='l_marquee_alt_padded'>${key}</i>${$H(match[1])}</div> `
		}
		html += `${_F} Hold down the <i class="l_marquee_alt">shift</i> key to make your selection permanent. ${_F} The keys <i class="l_marquee_alt">1-7</i> can be used to sort by each column.`;
		$scrollToTop();
		$marqueeInitiate(html);
		$marqueeIntervalReset();
	},
	notify: notifyRows => {
		$notifyClear();
		if(_stageDataHistory.length < 2)
			return;
		if(!$isVisible() && typeof Notification != 'undefined' && Notification.permission == 'granted') {
			_notifications.push(new Notification('Larval - Market volatility found!', {
				icon: 'icon-192x192.png',
				body: notifyRows.length > 0 ? 'Volatile stock(s): ' + $U(notifyRows.map(a => (typeof a[$HLT]=='string'?_char['halt']:_char[a[$PCT5]<0?'down':'up'])+a[$SYM])).join(' ') : 'Larval - Market volatility found!'
			}));
		}
		else 
			$notifyRequestPermission();
		notifyRows.push([]);
		_notifyTitleInterval = setInterval(() => {
			if(!$D.hidden || !_notifyTitleInterval)
				$notifyClear();
			else if(!notifyRows[0] || !notifyRows[0][0])
				$updateTitleWithPrefix();
			else if($isHaltRow(notifyRows[0]))
				$D.title = notifyRows[0][$SYM] + ' | ' + (notifyRows[0][$HLT]?notifyRows[0][$HLT]:'HALTED');
			else
				$D.title = notifyRows[0][$SYM] + ' | ' + _char[notifyRows[0][$PCT5]<0?'down':'up'] + $N(Math.abs(notifyRows[0][$PCT5]),2) + '% | ' + _char[notifyRows[0][$PCT]<0?'down':'up'] + $N(Math.abs(notifyRows[0][$PCT]),2) + '%';
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
		$updateTitleWithPrefix('');
	},
	notifyException: (symbol, disable) => {
		if(disable) {
			if(_symbolsOnTop[symbol])
				$setSymbolsOnTop(symbol, true, false);
			else if($I(_notifyExceptions, symbol) < 0)
				_notifyExceptions.push(symbol);
		}
		else if($I(_notifyExceptions, symbol) >= 0)
			_notifyExceptions.splice(_I, 1);
		$settings('l_exceptions', (new Date()).toLocaleDateString() + ' ' + _notifyExceptions.join(' '));
		$updateContentTable(false, true);
	},
	notifyVibrate: pattern => {
		if(navigator.vibrate)
			navigator.vibrate(pattern ? pattern : _vibrateAlert);
	},
	notifyPlayAudio: (audio, vibrateFallback, disableWarning) => {
		if(typeof audio == 'object' && audio.play && _settings['l_audible'])
			audio.play()
			.then(() => $notifyPlayAudioCallback(null, vibrateFallback, disableWarning))
			.catch(err => $notifyPlayAudioCallback(err, vibrateFallback, disableWarning));
		else if(vibrateFallback)
			$notifyVibrate();
	},
	notifyPlayAudioCallback: (error, vibrateFallback, disableWarning) => {
		if(disableWarning)
			_warnings[$WAUD] = error = false;
		else if((error ^ _warnings[$WAUD]) || _warnings[$WAUD] === false)
			return;
		$updateTitleWithPrefix(error ? _char['warning'] : '');
		_warnings[$WAUD] = (error ? 'Audible notifications are enabled but your browser failed to play, interaction may be required: <span class="l_warning_audio">click here to attempt to resolve this automatically</span>.' : false);
		$marqueeUpdate(true, true);	
		if(error === false && disableWarning === true)
			$marqueeFlash('If you did not hear a sound you likely need to manually resolve this.');
		else if(vibrateFallback)
			$notifyVibrate();
	},
	notifyRequestPermission: neverAskAgain => {
		if(_notifyAllowed || typeof Notification == 'undefined' || _settings['l_no_notifications'] || _warnings[$WNOT] === false)
			return;
		else if(neverAskAgain) {
			$settings('l_no_notifications', true);
			_warnings[$WNOT] = false;
			$marqueeFlash('Updated settings to no longer mention your notification status.');
		}
		Promise.resolve(Notification.requestPermission()).then(status => {
			if(status == 'denied') {
				if(!_settings['l_no_notifications'])
					_warnings[$WNOT] = 'Browser notifications appear to be disabled, permissions may need to be manually added to resolve this: <span class="l_warning_never_notify">click here to never mention this again</span>.';
				_notifyAllowed = false;
			}
			else if (status == 'granted')
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
			$removeFunction('notifySetup');
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
			$settings('l_keymap_index', _keyMapIndex);
			$marqueeFlash(`Links will now permanently direct to <i>${display}</i> by default.`);
		}
		else
			$marqueeFlash(`Links will now direct to <i>${display}</i> for this session, hold down <i>shift</i> to make it permanent.`);
	},
	editSymbolsOnTop: () => {
		let symbols=_settings['l_symbols_on_top'];
		if((symbols=prompt("Enter symbols you would like to have sticky on top: \n[NOTE: alt-click rows to individually add or remove]", symbols?symbols:'')) === null)
			return;
		$setSymbolsOnTop(null, true, false);
		$setSymbolsOnTop(symbols, false, true);
	},
	delSymbolFromTop: sym => [sym,sym+'+',sym+'-'].forEach(sym => delete _symbolsOnTop[sym]),
	addSymbolToTop: sym => sym[0]==_char['currency'] ? (_symbolsOnTop[sym]=_symbolsOnTop[sym+'+']=_symbolsOnTop[sym+'-']=sym) : _symbolsOnTop[sym]=sym,
	getSymbolsOnTop: () => {
		if(Object.keys(_symbolsOnTop).length)
			return(_symbolsOnTop);
		_symbolsOnTop = {};
		let savedSymbols=_settings['l_symbols_on_top'];
		if(savedSymbols && (savedSymbols=savedSymbols.match(/[\^\*\$\~]?[A-Z0-9]+/g)))
			savedSymbols.forEach(sym => $addSymbolToTop(sym));
		return(_symbolsOnTop);
	},
	setSymbolsOnTop: (symbols, removeOrToggle, updateView) => {
		const remove=(removeOrToggle===true), toggle=(removeOrToggle===null);
		let msg='', orderedTopListStr='', orderedTopList, savedSymbols, onTopDiff=$U(Object.values(_symbolsOnTop)).length;
		if(!symbols && remove)
			_symbolsOnTop = {};
		else if(symbols && (savedSymbols=symbols.toUpperCase().match(/[\^\*\$\~]?[A-Z0-9]+/g)))
			savedSymbols.forEach(sym => (remove||(toggle&&_symbolsOnTop[sym])) ? $delSymbolFromTop(sym) : $addSymbolToTop(sym));
		orderedTopList = $U(Object.values(_symbolsOnTop)).sort((a, b) => a.localeCompare(b));
		orderedTopListStr = orderedTopList.join(', ').trim(', ');
		$settings('l_symbols_on_top', orderedTopListStr);
		if(!updateView)
			return;
		onTopDiff -= orderedTopList.length;
		if(!orderedTopListStr)
			msg = 'Your on top list is empty, alt-click a row below to add a symbol.';
		else if((savedSymbols && savedSymbols.length > 1) || Math.abs(onTopDiff) != 1)
			msg = 'Symbols on top: ';
		else if(onTopDiff > 0)
			msg = `<i>${symbols}</i> removed from top: `;
		else
			msg = `<i>${symbols}</i> added to top: `;
		if(orderedTopListStr)
			msg += `<i class="l_marquee_alt_padded">${orderedTopListStr}</i>`;
		$marqueeFlash(msg);
		$updateContentTable(false);
	},
	setSortStageData: column => {
		if(_stageDataSortByColumn == -column || !column || column > $E('l_content_table').getElementsByTagName('th').length) {
			if(_stageData.itemsImmutable)
				_stageData.items = $cloneObject(_stageData.itemsImmutable);
			_stageDataSortByColumn = 0;
		}
		else if(_stageDataSortByColumn == column)
			_stageDataSortByColumn = -column;
		else
			_stageDataSortByColumn = column;
		$sortStageData(true);
		if(!$isSafari())
			$E('l_content_table').classList.add('l_content_table_notify_'+Math.abs(_stageDataSortByColumn));
	},
	sortStageData: updateView => {
		if(_stageData && _stageDataSortByColumn) {
			if(!_stageData.itemsImmutable)
				_stageData.itemsImmutable = $cloneObject(_stageData.items);
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
	hasSettings: () => localStorage && localStorage.getItem('larval'),
	isSafari: () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
	isMobile: strict => 'ontouchstart' in $D.documentElement && (!strict || $D.body.clientHeight > $D.body.clientWidth),
	isVisible: el => (el ? $W.getComputedStyle(el).visibility : $D.visibilityState) == 'visible',
	isShowing: type => typeof _settings[type] == 'object' && _settings[type]['l_show'],
	isWeekend: dateObj => $I([0,6], (dateObj?dateObj:new Date()).getDay()) >= 0,
	isHaltRow: row => row && row[$HLT] && typeof row[$HLT] == 'string',
	cell: (row, type) => row[type] && _stageDataMap[type] ? _stageDataMap[type]({'val':row[type], 'row':row, 'type':type}) : $F('f_empty_cell'),
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
			$F('f_class_title_keymap_display', ['l_notify_popout l_ta', _taMap[row[$TAN]][0], (_taMap[row[$TAN]][2]?_taMap[row[$TAN]][2]:_keyMapIndexDefault), `&#128200;&nbsp;${_taMap[row[$TAN]][1]}`]);
		else if(row[$ERN] && row[$NWS])
			$F('f_class_title_display', ['l_notify_popout l_news', `News and earnings on ${$cell(row,$ERN)}`, `&#128197;&nbsp;${$cell(row,$ERN)}<i>&nbsp;+&nbsp;news</i>`]);
		else if(row[$ERN])
			$F('f_class_title_display', ['l_notify_popout', `Earnings on ${$cell(row,$ERN)}`, `&#128198;&nbsp;${$cell(row,$ERN)}<i>&nbsp;earnings</i>`]);
		else if(row[$NWS])
			$F('f_class_title_display', ['l_notify_popout l_news', 'Company news', '&#128197;&nbsp;<i>recent </i>news']);
		else
			$F('');
		return(_F);
	},
	rollContentTable: roll => $E('l_content_table').classList[roll?'add':'remove']('l_content_table_alt_display'),
	updateContentTable: (doNotify, doNotResetKeyRow) => {
		if(!_stageData) return;
		const columns=['symbol',_forceContentTableShrink?$F('f_empty_cell'):'company','~5min<i>ute</i>%','total%','price',_stageData['vpm']?'vpm':'volume','options'], stockAssetType=(_stageData['afterhours']?'l_stocks_ah':'l_stocks');
		$E('l_menu').className = (_animationsComplete && !$isWeekend() ? $getMode('l_') : 'l_default');
		let rowRules={}, notifyRows=[], notify=false, visibleRows=0, onTop={}, htmlRow='', htmlPriority='', htmlNormal='', html='<tr>';
		if(_assetTypes[0] != stockAssetType) {
			if($E(_assetTypes[0]))
				_E.id = stockAssetType;
			if(_settingsSelectedTabName == _assetTypes[0])
				_settingsSelectedTabName = stockAssetType;
			_assetTypes[0] = stockAssetType;
			$settingsTabSelect();
		}
		if(!_settingsSelectedTabName) {
			if(!(_settingsSelectedTabName=_assetTypes.find(assetType => _settings[assetType]['l_show'])))
				_settingsSelectedTabName = _assetTypes[0];
			$settingsTabSelect();
		}
		for(let assetType of _assetTypes) {
			const thisType=_settings[assetType];
			rowRules[assetType] = {
				'up': thisType['l_range_up'] / thisType['percent_shift'],
				'down': -thisType['l_range_down'] / thisType['percent_shift'],
				'volume': (thisType['l_range_volume']?thisType['l_range_volume']:0) * _multipliers[thisType['multiplier']] / thisType[_stageData['vpm']?'vpm_shift':'volume_shift']
			}
		}
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
			const row=_stageData['items'][i], rowType=_assetTypes[$I(_assetTypes,`l_${row[$OPT]}`)>=0?_I:(row[$SYM][0]==_char['etf']?1:0)], isStock=(_I<0), notifyExcept=($I(_notifyExceptions,row[$SYM])>=0), isOnTop=!!_symbolsOnTop[row[$SYM]];
			let rowClass=rowType, notifyControl='';
			if($isHaltRow(row)) {
				if(notifyExcept || !$isShowing(rowType))
					continue;
				notify = _settings['l_notify_halts'] && (!_settings['l_options_only']||row[$OPT]);
				rowClass = (notify ? 'l_notify_halt' : 'l_halt');
				htmlRow = `<tr class="${rowClass}" data-ref="${i}">
					<td>
					 ${$F('f_class_title_display', ['l_notify_disable', `Disable ${$cell(row,$SYM)} notifications for today`, 'x'])}
					 ${$cell(row,$SYM)}
					</td>
					<td class="${row[$NWS]?'l_news':''}">${$cellRollover(row,$NAM,$NWS,_forceContentTableShrink)}</td>
					<td colspan="4">HALT: ${$cell(row,$HLT)}</td>
					<td>${$popoutContentTableRow(row)}${$cellRollover(row,$OPT,$OIV)}</td>
					</tr>`;
			}
			else {
				if(!isOnTop && !$isShowing(rowType))
					continue;
				notify=( !notifyExcept && ((((rowRules[rowType]['up']&&row[$PCT5]>=rowRules[rowType]['up'])||(rowRules[rowType]['down']&&rowRules[rowType]['down']>=row[$PCT5])) && (!row[$VOL]||typeof row[$VOL]=='string'||row[$VOL]>=rowRules[rowType]['volume']) && (!_settings['l_options_only']||row[$OPT])) ));
				if(notify) {
					rowClass += ` l_notify_${isOnTop?'top_':''}${row[$PCT5]<0?'down':'up'}`;
					notifyControl = $F('f_class_title_display', ['l_notify_disable', `Disable ${$cell(row,$SYM)} notifications for today`, 'x']);
				}
				else {
					if(isOnTop)
						rowClass += ' l_top';
					if(notifyExcept)
						notifyControl = $F('f_class_title_display', ['l_notify_enable', `Re-enable ${$cell(row,$SYM)} notifications`, '&#10003;']);
					else if(isOnTop)
						notifyControl = $F('f_class_title_display', ['l_notify_disable', `Remove ${$cell(row,$SYM)} from top`, 'x']);
				}
				htmlRow = `<tr class="${rowClass}" data-ref="${i}">
					<td>${notifyControl}${$cell(row,$SYM)}</td>
					<td class="${row[$NWS]?'l_news':''}">${$cellRollover(row,$NAM,$NWS,_forceContentTableShrink)}</td>
					<td class="l_history_toggle">${$cellRollover(row,$PCT5,$PCTM)}</td>
					<td class="l_history_toggle">${$cellRollover(row,$PCT,$PCTY)}</td>
					<td class="l_history_toggle">${$cellRollover(row,$PRC,$PRC5)}</td>
					<td class="l_history_toggle">${$cellRollover(row,$VOL,$VOL5)}</td>
					<td class="l_history_toggle">${$popoutContentTableRow(row)}${$cellRollover(row,$OPT,$OIV)}</td>
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
		if(visibleRows >= 0 && _contentTableSoftLimit > 0)
			_contentTableSoftLimit = -_contentTableSoftLimit;
		if(_assetTypes.every(type => !_settings[type]['l_show']))
			html += $F('f_no_results_row', ['No asset types are set to show in your settings.']);
		else if(!htmlNormal && !htmlPriority && !Object.keys(onTop).length)
			html += $F('f_no_results_row', ['No results found.']);
		else {
			for(let key of Object.keys(onTop).sort((a, b) => a.localeCompare(b)))
				html += onTop[key];
			html += htmlPriority + htmlNormal;
		}
		$E('l_more').className = _contentTableSoftLimit > 0 ? 'l_more' : 'l_no_more';
		$E('l_content_table').className = $E('l_awaiting_data') ? '' : 'l_content_tr_fade_in';
		if(doNotify && !$isSafari())
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
		else if(doNotify && notifyRows.length > 0)
			$notify(notifyRows);
	}
}