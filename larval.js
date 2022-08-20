const L = {

	/* INTERNALS */
	_stageData: null,
	_stageDataSortByColumn: 0,
	_stageDataHistoryIndex: -1,
	_stageDataHistory: [],
	_notifyTitleInterval: null,
	_notifyAllowed: null,
	_notifyExceptions: {},
	_splashComplete: false,
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
		AS: ['Ascending Triangle', 'asc<span>&nbsp;triangle</span>'],
		CD: ['Channel Down', 'c<span>hannel&nbsp;</span>down'],
		CH: ['Channel', 'chan<span>nel</span>'],
		CU: ['Channel Up', 'c<span>hannel&nbsp;</span>up'],
		DB: ['Double Bottom', '2x&nbsp;bot<span>tom</span>'],
		DE: ['Descending Triangle', 'desc<span>&nbsp;triangle</span>'],
		DT: ['Double Top', '2x&nbsp;top'],
		HI: ['Inverse Head and Shoulders', 'inv<span>erse</span>&nbsp;h&amp;s'],
		HS: ['Head and Shoulders', 'h&nbsp;&amp;&nbsp;s'],
		HZ: ['Horizontal S/R', 's&nbsp;&amp;&nbsp;r'],
		MB: ['Multiple Bottoms', '&gt;2x&nbsp;bot<span>tom</span>s'],
		MT: ['Multiple Tops', '&gt;2x&nbsp;tops'],
		TR: ['Technical Resistance', 'resist<span>ance</span>'],
		TS: ['Technical Support', '<span>tech&nbsp;</span>support'],
		WD: ['Wedge Down', 'wedge<span>&nbsp;down</span>'],
		WE: ['Wedge', 'wedge'],
		WU: ['Wedge Up', 'wedge<span>&nbsp;up</span>']
	},
	_contentTableRowClassRef: {
		l_ta: 'https://finviz.com/quote.ashx?t=@',
		l_news: null,
		l_options: null,
		l_marquee_link: null,
		l_none: null
	},
	_audioAlert: 'larval.mp3', _audioTest: 'data:audio/mpeg;base64,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',

	/* SHORTHAND / COMMON */
	D: document,
	E: id => L.D.getElementById(id),
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
		const p=L.D.createElement('p');
		p.textContent = string;
		return(p.innerHTML);
	},
	I: string => {
		const p=L.D.createElement('p');
		p.innerHTML = string;
		return(p.textContent || p.innerText || '');
	},
	N: (number, digits) => number.toLocaleString(undefined, { minimumFractionDigits: digits,  maximumFractionDigits: digits }),
	P: (count, total) => Math.round(count / total * 100),
	T: tag => L.D.getElementsByTagName(tag),
	U: string => (string?string[0]:'').toUpperCase() + string.substring(1),
	W: window,

	/* ENUMERATIONS */
	SYM:0, NAM:1, PCT5:2, PCT:3, PRC:4, VOL:5, OPT:6, OIV:7, ERN:8, PRC5:9, VOL5:10, NWS:11, LNK:12, HLT:2, TAN:8,
	KSTK:0, KOPT:1, KCRP:2, KFTR:3,

	/* EVENTS */
	onload: () => {
		L.settingsLoad();
		L.notifySetup();
		L.keyMapSetup();
		L.D.addEventListener('click', L.notifySetup);
		L.D.addEventListener('touchstart', L.notifySetup);
		L.D.addEventListener('scroll', L.onscroll);
		L.D.addEventListener('visibilitychange', L.onvisibilitychange);
		L.W.addEventListener('resize', L.onresize);
		L.W.addEventListener('keydown', L.onkeydown);
		L.W.addEventListener('touchstart', L.ontouchstart);
		L.W.addEventListener('touchend', L.ontouchend);
		setTimeout(L.animationsComplete, 6000);
		L.E('l_range_up').oninput();
		L.E('l_range_down').oninput();
		L.E('l_range_volume').oninput();
		L.getStageData(false);
	},
	onresize: () => {
		L.settingsButtonToggle(true);
		L.updateContentTableRowCountThatAreInView();
	},
	onscroll: () => {
		const e=L.D.documentElement, b=L.D.body,
			x=L.W.innerWidth||e.clientWidth||b.clientWidth, y=L.W.innerHeight||e.clientHeight||b.clientHeight,
			s=L.W.pageYOffset||e.scrollTop, scrolledDown=s>L.E('l_fixed').offsetHeight||L.E('l_NA'),
			ll=L.E('l_logo'), lf=L.E('l_fixed'), lal=L.E('l_afterhours_left'), lar=L.E('l_afterhours_right');
		ll.style.transform = scrolledDown ? 'scale(0.5)' : 'scale(1)';
		lf.style.top = scrolledDown ? '-28px' : '0';
		lf.style.maxHeight =  scrolledDown ? '100px' : '';
		lar.style.height = lal.style.height = scrolledDown ? '72px' : '';
	},
	ontouchstart: e => { L._swipeStartPosition = [e.changedTouches[0].clientX, e.changedTouches[0].clientY]; },
	ontouchend: e => {
		if(!L._swipeStartPosition)
			return;
		const swipeMovement = [L._swipeStartPosition[0]-e.changedTouches[0].clientX, L._swipeStartPosition[1]-e.changedTouches[0].clientY],
			width = L.W.innerWidth||L.D.documentElement.clientWidth||L.D.body.clientWidth,
			height = L.W.innerHeight||L.D.documentElement.clientHeight||L.D.body.clientHeight,
			movementPercent = [Math.abs(swipeMovement[0])/width*100, Math.abs(swipeMovement[1])/height*100],
			movementWeighting = (movementPercent[0]+1) / (movementPercent[1]+1);
		if(movementPercent[0] > 25 && movementWeighting >= 1)
			L.gotoStageDataHistory(swipeMovement[0]);
		L._swipeStartPosition = null;
	},
	onkeydown: e => {
		L.animationsFastSplash();
		if(!L._splashComplete || !L._stageData || (e && (e.ctrlKey || e.altKey || L._keysIgnore.indexOf(e.code) >= 0)))
			return;
		const rows=L.E('l_content_table').getElementsByTagName('tr');
		let lastKeyRow=L._keyRow;
		if(!L._keyRow) {
			for(let i=0; i < rows.length; i++) {
				if(rows[i].matches(':hover')) {
					lastKeyRow = 0;
					L._keyRow = i;
					break;
				}
			}
		}
		if(e === false)
			L._keyRow = 0;
		else if(e) {
			e.preventDefault();
			switch(e.code) {
				case 'Slash':      L.marqueeHotKeyHelp(); break;
				case 'Tab':        L.animationsToggle(null); break;
				case 'Home':       L._keyRow = 1; break;
				case 'End':        L._keyRow = rows.length - 1; break;
				case 'PageUp':     L._keyRow-=L._contentTableRowCountThatAreInView; break;
				case 'PageDown':   L._keyRow+=L._contentTableRowCountThatAreInView; break;
				case 'ArrowUp':    L._keyRow--; break;
				case 'ArrowDown':  L._keyRow++; break;
				case 'ArrowLeft':  L.gotoStageDataHistory(-1); break;
				case 'ArrowRight': L.gotoStageDataHistory(1); break;
				case 'Escape':     L.gotoStageDataHistory(0); break;
				case 'Space':
					let toggleAlertException=L.E('l_content_table').getElementsByTagName('tr')[L._keyRow];
					if(toggleAlertException && (toggleAlertException=toggleAlertException.querySelector('.l_notify_enable,.l_notify_disable')) && toggleAlertException.onclick)
						toggleAlertException.onclick();
					return;
				case 'Enter': case 'NumpadEnter':
					if(L._keyRow && rows[L._keyRow])
						rows[L._keyRow].onclick();
					return;
				default:
					let match=e.code.match(/^(Digit|Numpad)([0-9])$/);
					if(match)
						L.setSortStageData(parseInt(match[2]));
					else if((match=e.code.match(/^Key([A-Z])$/))) {
						L.setURLFormat(match[1], e.shiftKey);
						if(L._keyRow && rows[L._keyRow])
							rows[L._keyRow].onclick();
					}
					else
						L.marqueeFlash(`The &quot;<span class='l_marquee_highlight'>${e.code}</span>&quot; key is not mapped, type &quot;<span class='l_marquee_highlight'>?</span>&quot; to see the supported hotkeys.`);
					return;
			}
		}
		if(L._keyRow < 0)
			L._keyRow = 0;
		else if(L._keyRow >= rows.length)
			L._keyRow = rows.length - 1;
		if(!lastKeyRow ^ !L._keyRow) {
			const addOrRemove = (L._keyRow?'add':'remove');
			if(lastKeyRow && rows[lastKeyRow])
				rows[lastKeyRow].classList.remove('l_tr_keyrow_selected');
			for(let i=1; i < rows.length; i++)
				rows[i].classList[addOrRemove]('l_tr_keyrow');
		}
		if(lastKeyRow && rows[lastKeyRow])
			rows[lastKeyRow].classList.remove('l_tr_keyrow_selected');
		rows[L._keyRow].classList.add('l_tr_keyrow_selected');
		if(L._keyRow > 0)
			rows[L._keyRow].scrollIntoView({behavior:'smooth', block:'center'});
	},
	onvisibilitychange: () => {
		if(!L._marqueeInterval || L.D.visibilityState != 'visible')
			return;
		L.marqueeIntervalReset();
		L.marqueeUpdate(L._marqueeLoopSeconds);
		if(L._nextStagePollCompleteEpoch)
			L.setNextStagePoll(L._nextStagePollCompleteEpoch - L.epochNow()); 
	},

	/* FUNCTIONS */
	animationsFastSplash: () => {
		if(L._splashComplete || !L._stageData)
			return;
		const reanimate={
			'l_logo': 'l_logo 0.5s ease 1 normal 0.5s forwards',
			'l_fixed': 'l_fixed 0.5s ease 1 normal forwards',
			'l_marquee_container': 'l_marquee_container 0.5s ease forwards'
		}
		for(let id in reanimate) {
			L.E(id).style.animation = 'none';
			void L.E(id).offsetHeight;
			L.E(id).style.animation = reanimate[id];
		}
		L.E('l_logo_tag').style.display = 'none';
		L.E('l_progress').style.display = 'block';
		L.animationsComplete();
	},
	animationsComplete: () => {
		if(L._splashComplete)
			return;
		L._splashComplete = true;
		L.E('l_fixed').style.cursor = 'default';
		L.E('l_afterhours_left').style.display = (!L._stageData||!L._stageData['afterhours']?'none':'block');
		L.E('l_afterhours_right').style.display = (!L._stageData||!L._stageData['afterhours']?'none':'block');
		L.setNextStagePoll(!L._stageData||!L._stageData['items'] ? L._nextStagePollShort : L.getSynchronizedNext());
		if(localStorage && localStorage.length > 1 && L._stageData && L._stageData['top'] && L._stageData['top'].length > 1)
			L.marqueeUpdate(L._marqueeLoopSeconds);
		else
			L.marqueeInitiate(L._marqueeLoopSeconds);
		L.marqueeIntervalReset();
		L.notifyPlayAudio(L._audioTest);
		L.updateLiveTable(true);
		if(L.isMobile())
			L.animationsToggle(false);
	},
	animationsToggle: explicit => {
		const noAnimations = (typeof explicit == 'boolean' ? explicit : !!L.E('l_NA'));
		if(noAnimations)
			L.marqueeFlash('Full animation experience has been restored.');
		L.D.body.id = noAnimations ? '' : 'l_NA';
		L.keyModeReset();
		L.W.scrollTo({top: 0, behavior: 'auto'});
		L.onscroll();
	},
	keyMapSetup: () => {
		if(!(L._keyMapIndex=localStorage.getItem('l_keymap_index')))
			L._keyMapIndex = L._keyMapIndexDefault;
		for(let key in L._keyMap) {
			if(!L._keyMap[key][L.KOPT])
				L._keyMap[key][L.KOPT] = L._keyMap[key][L.KSTK];
			if(!L._keyMap[key][L.KCRP])
				L._keyMap[key][L.KCRP] = L._keyMap[L._keyMapIndexDefault][L.KCRP];
			if(!L._keyMap[key][L.KFTR])
				L._keyMap[key][L.KFTR] = L._keyMap[L._keyMapIndexDefault][L.KFTR];
		}
	},
	keyModeReset: () => {
		if(L._keyRow)
			L.onkeydown(false);
	},
	getSynchronizedNext: () => {
		if(!L._stageData || !L._stageData['next'])
			return(L._nextStagePollLong);
		let next = Math.floor(L._stageData['next'] - (new Date().getTime() / 1000)) + Math.floor(Math.random() * 10);
		if(next < 0 || next > L._nextStagePollLong + L._nextStagePollShort)
			next = L._nextStagePollLong;
		return(next);
	},
	getStageData: updateView => {
		let xhr=new XMLHttpRequest(), url='//stage.larval.com/stage.json?ts='+new Date().getTime();
		xhr.open('GET', url);
		xhr.onload = e => {
			try {
				const json = JSON.parse(xhr.responseText);
				if(!json || !json['ts'] || (L._stageDataHistory.length > 0 && L._stageDataHistory[L._stageDataHistory.length-1]['ts'] == json['ts'])) {
					xhr.onerror();
					return;
				}
				else if(L._stageDataHistoryIndex >= 0)
					L._stageDataHistory.push(structuredClone(json));
				else {
					L._stageData = json;
					if(L._stageDataHistory.length == 0 && localStorage.length == 0 && L._stageData['afterhours']) {
						const now=new Date();
						if(now.getDay() != 0 && now.getDay() != 6)
							L.E('l_include_futures').checked = true;
					}
					L._stageDataHistory.push(structuredClone(L._stageData));
					L.sortStageData(false);
					L._forceContentTableShrink = false;
					if(updateView)
						L.updateLiveTable(true);
				}
				if(json['notify'])
					L.marqueeFlash(json['notify'])
				L.E('l_last_update').innerHTML = L.epochToDate(json['ts']);
				L.setNextStagePoll(L.getSynchronizedNext());
			}
			catch(e) { xhr.onerror(); }
		}
		xhr.onerror = () => { L.setNextStagePoll(L._nextStagePollShort); }
		xhr.send();
	},
	getHistoryData: () => {
		L.marqueeFlash('Attempting to gather recent history from the server...');
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
						if(history[h]['ts'] == L._stageDataHistory[0]['ts'])
							break;
					}
					if(h > 0) {
						history.length = h;
						L._stageDataHistory = history.concat(L._stageDataHistory);
						L._stageDataHistoryIndex = h - 1;
						L.setStageDataHistory(L._stageDataHistoryIndex);
					}
					else
						xhr.onerror();
				}
			}
			catch(e) { xhr.onerror(); }
		}
		xhr.onerror = () => { L.marqueeFlash('Sorry, no additional history is available to rewind to at this time.'); }
		xhr.send();
		L.getHistoryData = null;
	},
	setStageDataHistory: index => {
		const historyTotal=L._stageDataHistory.length-1, historyIndex=index<0?historyTotal:index;
		L._stageData = structuredClone(L._stageDataHistory[index >= 0 ? index : historyTotal]);
		L.sortStageData(true);
		const minutesAgo=Math.round((L.epochNow()-L._stageData['ts'])/60,0);
		if(historyIndex == historyTotal)
			L.marqueeFlash('All caught up, exiting history mode...', true);
		else
			L.marqueeFlash(`<div onclick="L.gotoStageDataHistory(0)">Rewound to ${L.epochToDate(L._stageData['ts'])}: <span class='l_marquee_highlight_padded'>${minutesAgo} minutes ago</span>${L.getHistoryData?'':' ['+L.P(historyTotal-historyIndex,historyTotal)+'%]'}</div>`, true);
	},
	gotoStageDataHistory: direction => {
		const lastIndex=L._stageDataHistoryIndex;
		if(!direction) {
			L._keyRow = 0;
			if(L._stageDataHistoryIndex >= 0)
				L._stageDataHistoryIndex = -1;
		}
		else if(direction > 0) {
			if(L._stageDataHistory.length < 2 || L._stageDataHistoryIndex < 0)
				L.marqueeFlash('You are already viewing live data, use the <span class="l_marquee_highlight">&#8656;</span> key to rewind.');
			else if( L._stageDataHistoryIndex + 2 >= L._stageDataHistory.length)
				L._stageDataHistoryIndex = -1;
			else
				L._stageDataHistoryIndex++;
		}
		else if(direction < 0) {
			if(L.getHistoryData && L._stageDataHistoryIndex == (L._stageDataHistory.length < 2 ? -1 : 0))
				L.getHistoryData();
			else if(L._stageDataHistoryIndex < 0)
				L._stageDataHistoryIndex = L._stageDataHistory.length - 2;
			else if(L._stageDataHistoryIndex > 0)
				L._stageDataHistoryIndex--;
			else
				L.marqueeFlash('<div onclick="L.gotoStageDataHistory(0)">End of history, use <span class="l_marquee_highlight">&#8658;</span> to move forward or <span class="l_marquee_highlight">escape</span> to exit.</div>', true);
		}
		if(lastIndex !== L._stageDataHistoryIndex)
			L.setStageDataHistory(L._stageDataHistoryIndex);
	},
	setNextStagePoll: seconds => {
		if(L._splashComplete) {
			const lp=L.E('l_progress'), lpd=L.E('l_progress_display'); 
			lp.style.display = 'block';
			lpd.style.animation = '';
			void lpd.offsetHeight;
			lpd.style.animation = `l_progress ${seconds}s linear forwards`;
		}
		if(L._nextStagePollTimeout)
			clearTimeout(L._nextStagePollTimeout);
		L._nextStagePollTimeout = setTimeout(L.setNextStagePollComplete, seconds * 1000);
		L._nextStagePollCompleteEpoch = L.epochNow() + seconds;
	},
	setNextStagePollComplete: () => {
		if(L._nextStagePollTimeout)
			clearTimeout(L._nextStagePollTimeout);
		L._nextStagePollTimeout = null;
		L.getStageData(true);
	},
	forceNextStagePoll: () => { L.setNextStagePollComplete(); },
	epochNow: () => Math.floor(Date.now() / 1000),
	epochToDate: epoch => new Date(epoch * 1000).toLocaleTimeString('en-US', {weekday:'short',hour:'numeric',minute:'2-digit',timeZoneName:'short'}),
	htmlPercent: number => {
		if(number > 0)
			return(L.N(Math.abs(number),2) + '%<span class="l_up">&#9650;</span>');
		else if(number < 0)
			return(L.N(Math.abs(number),2) + '%<span class="l_down">&#9660;</span>');
		else
			return(L._emptyCellHtml);
	},
	settingsButtonToggle: forceClosed => {
		const controlHeight=(L.E('l_control').scrollHeight > 200 ? L.E('l_control_table').scrollHeight : 250)+'px', grow=(!forceClosed && L.E('l_control').style.height!=controlHeight);
		L.E('l_control').style.height = (grow?controlHeight:'0px');
		L.E('l_settings_button').innerHTML = (grow?'&#9660; settings &#9660;':'&#9650; settings &#9650;');
	},
	settingsSave: context => {
		for(let inputs=L.T('input'), i=0; i < inputs.length; i++) {
			let input=inputs[i];
			if(input.type == 'checkbox')
				localStorage.setItem(input.id, input.checked ? 'true' : 'false');
			else if(input.type == 'range')
				localStorage.setItem(input.id, input.value);
		}
		if(context.id == 'l_audible' && context.checked)
			L.notifyPlayAudio(L._audioTest);
		L.updateLiveTable(false);
	},
	settingsLoad: () => {
		const now=new Date();
		if(localStorage.length == 0 && (now.getDay() == 0 || now.getDay() == 6))
			L.E('l_include_crypto').checked = true;
		for(let i=0; i < localStorage.length; i++) {
			let input=L.E(localStorage.key(i));
			if(!input || !input['type'])
				continue;
			if(input.type == 'checkbox')
				input.checked = (localStorage.getItem(input.id) == 'true');
			else if(input.type == 'range') {
				input.value = localStorage.getItem(input.id);
				L.updateRangeDisplay(`${input.id}_display`, input.value);
			}
		}
	},
	updateRangeDisplay: (id, value) => {
		if(L.E(id)) L.E(id).innerHTML = (id=='l_range_volume_display' ? value : (value / 10).toFixed(1));
	},
	marqueeInitiate: (seconds, html) => {
		const lb=L.E('l_marquee'), lbc=L.E('l_marquee_content'), lbcc=L.E('l_marquee_content_clone');
		if(html)
			lbc.innerHTML = html;
		lbcc.innerHTML = '';
		void lb.offsetHeight;
		const fullWidth=lb.scrollWidth, viewWidth=lb.offsetWidth;
		lbcc.innerHTML = lbc.innerHTML;
		L.D.documentElement.style.setProperty('--marquee-start', '-'+viewWidth+'px');
		L.D.documentElement.style.setProperty('--marquee-end', '-'+fullWidth+'px');
		lb.style.animation = 'none';
		void lb.offsetWidth;
		lb.style.animation = `l_marquee ${seconds}s linear infinite`;
	},
	marqueeUpdate: seconds => {
		if(!L._stageData || !L._stageData['top'] || L._stageData['top'].length < 2)
			return;
		else if(L._stageData['marquee']) {
			L.marqueeInitiate(seconds, L._stageData['marquee']);
			return;
		}
		let html='', rank=0, includeCrypto=L.E('l_include_crypto').checked;
		for(let i in L._stageData['top']) {
			let item=L._stageData['top'][i], isMarketIndex=(item.length==3);
			if(isMarketIndex) {
				if(!html) html += '<span class="l_marquee_blink_wide">&#8226;</span>';
				html += `<div class="l_marquee_link" onclick="L.openStockWindow('${item[0]}',event)"><span class='l_marquee_highlight_padded'>${L.H(item[2])}</span>${item[1]<0?'&#9660;':'&#9650;'} ${Math.abs(item[1]).toFixed(2)}%</div> `;
			}
			else if(!includeCrypto && item[0][0] == L._charCrypto)
				continue;
			else {
				if(!rank) html += '<span class="l_marquee_blink_wide">&#8226;</span>';
				html += `<div class="l_marquee_link" onclick="L.openStockWindow('${item[0]}',event)"><span class='l_marquee_highlight_padded'>#${++rank}</span>${item[0]} &#177; ${item[1]}%</div> `;
				if(rank >= 20) break;
			}
		}
		L.marqueeInitiate(seconds, html);
	},
	marqueeFlash: (message, priority) => {
		if(L.marqueeFlashTimeout)
			clearTimeout(L.marqueeFlashTimeout);
		if(L._stageDataHistoryIndex >= 0 && (!message || !priority))
			return;
		L.E('l_marquee_flash').innerHTML = message ? message : '';
		L.E('l_marquee').style.display = message ? 'none' : 'inline-block';
		L.E('l_marquee_flash').style.display = message ? 'inline-block' : 'none';
		if(message) {
			L.W.scrollTo({top: 0, behavior: 'smooth'});
			L.marqueeIntervalReset();
			L.marqueeFlashTimeout = setTimeout(L.marqueeFlash, 5000);
			const el=L.E('l_marquee_flash');
			el.style.animation = 'none';
			void el.offsetHeight;
			el.style.animation = `l_content_fade_in 1s ease forwards`;
		}
		else
			L.marqueeUpdate(L._marqueeLoopSeconds);
	},
	marqueeIntervalReset: () => {
		if(L._marqueeInterval)
			clearInterval(L._marqueeInterval);
		L._marqueeInterval = setInterval(() => { L.marqueeUpdate(L._marqueeLoopSeconds) }, L._marqueeLoopSeconds * 1000);
	},
	marqueeHotKeyHelp: () => {
		let key, match, html=`${L._marqueeBlinkHtml} The following hotkeys are available to quickly navigate your history and third party websites. ${L._marqueeBlinkHtml} Use the <span class="l_marquee_highlight">tab</span> key to alternate animation modes. ${L._marqueeBlinkHtml} Use <span class="l_marquee_highlight">&#8644;</span> arrow keys to rewind and navigate your backlog history. ${L._marqueeBlinkHtml} Use <span class="l_marquee_highlight">&#8645;</span> arrow keys to navigate to a row followed by selecting one of these hotkeys: `;
		for(let key in L._keyMap) {
			if((match=L._keyMap[key][L.KSTK].match(/([a-z]+)\.[a-z]+\//i)))
				html += `<div class="l_marquee_link" onclick="L.setURLFormat('${key}',false)"><span class='l_marquee_highlight_padded'>${key}</span>${L.H(match[1])}</div> `
		}
		html += `${L._marqueeBlinkHtml} Hold down the <span class="l_marquee_highlight">shift</span> key to make your selection permanent. ${L._marqueeBlinkHtml} The keys <span class="l_marquee_highlight">1-7</span> can be used to sort by each column.`;
		L.W.scrollTo({top: 0, behavior: 'smooth'});
		L.marqueeIntervalReset();
		L.marqueeInitiate(L._marqueeLoopSeconds, html);
	},
	notify: (notifyRows) => {
		L.notifyClear();
		if(L._stageDataHistory.length < 2)
			return;
		try {
			if(Notification && Notification.permission == 'granted') {
				void new Notification('Larval - Market volatility found!', {
					icon: 'icon-192x192.png',
					body: notifyRows.length > 0 ? 'Volatile stock(s): ' + notifyRows.map(a => (typeof a[L.HLT]=='string'?L._charHalt:(a[L.PCT5]<0?L._charUp:L._charDown))+a[L.SYM]).filter((v,i,s) => { return s.indexOf(v)===i; }).join(' ') : 'Larval - Market volatility found!'
				});
			}
			else 
				L.notifyRequestPermission();
		}
		catch(e) { }
		notifyRows.push([]);
		L._notifyTitleInterval = setInterval(() => {
			if(!L.D.hidden || !L._notifyTitleInterval)
				L.notifyClear();
			else if(!notifyRows[0] || !notifyRows[0][0])
				L.D.title = L._title;
			else if(L.isHaltRow(notifyRows[0]))
				L.D.title = notifyRows[0][L.SYM] + ' | ' + (notifyRows[0][L.HLT]?notifyRows[0][L.HLT]:'HALTED');
			else
				L.D.title = notifyRows[0][L.SYM] + ' | ' + (notifyRows[0][L.PCT5]<0?L._charUp:L._charDown) + L.N(Math.abs(notifyRows[0][L.PCT5]),2) + '% | ' + (notifyRows[0][L.PCT]<0?L._charUp:L._charDown) + L.N(Math.abs(notifyRows[0][L.PCT]),2) + '%';
			notifyRows.push(notifyRows.shift());
		}, 1000);
		L.notifyPlayAudio(L._audioAlert);
		L.W.scrollTo({top: 0, behavior: 'smooth'});
	},
	notifyClear: () => {
		if(L._notifyTitleInterval) {
			clearInterval(L._notifyTitleInterval);
			L._notifyTitleInterval = null;
		}
		L.D.title = L._title;
	},
	notifyException: (symbol, disable) => {
		if(disable)
			L._notifyExceptions[symbol] = true;
		else if(L._notifyExceptions[symbol])
			delete L._notifyExceptions[symbol];
		L.updateLiveTable(false, true);
	},
	notifyPlayAudio: audio => {
		if(typeof audio != 'object' || !L.E('l_audible').checked)
			return;
		let playPromise=audio.play();
		if (playPromise !== undefined) 
			playPromise.then(()=>{}).catch(e=>{});
	},
	notifyRequestPermission: () => {
		if(L._notifyAllowed)
			return;
		try {
			Notification.requestPermission().then(status => {
				if (status === 'denied')
					L._notifyAllowed = false;
				else if (status === 'granted')
					L._notifyAllowed = true;
			});
		}
		catch(e) { }
	},
	notifySetup: () => {
		L.D.removeEventListener('click', L.notifySetup);
		L.D.removeEventListener('touchstart', L.notifySetup);
		if(typeof L._audioTest == 'string')
			L._audioTest = new Audio(L._audioTest);
		if(typeof L._audioAlert == 'string')
			L._audioAlert = new Audio(L._audioAlert);
		L._audioAlert.load();
		L.notifyRequestPermission();
		try { if(navigator.wakeLock) navigator.wakeLock.request('screen'); }
		catch (e) { }
	},
	openStockWindow: (symbolOrIndex, e) => {
		let symbol='', urlType=L.KSTK, classRef='', el=(e&&e.target?e.target:null);
		if(!el)
			return;
		if(el.nodeName == 'SPAN' && el.parentElement)
			el = el.parentElement;
		for(let c in L._contentTableRowClassRef)
			if(el.classList.contains(c) && (classRef=c))
				break;
		if(!classRef && el.nodeName != 'TD')
			return;
		if(typeof symbolOrIndex == 'number') {
			symbol = L._stageData['items'][symbolOrIndex][L.SYM];
			switch(classRef) {
				case 'l_ta':
					L.W.open(L._contentTableRowClassRef[classRef].replace('@', symbol), `${classRef}_${symbol}`).focus();
					return;
				case 'l_news':
					L.W.open(L._stageData['items'][symbolOrIndex][L.LNK], `${classRef}_${symbol}`).focus();
					return;
				case 'l_options':
					urlType = L.KOPT;
					break;
			}
		}
		else if(typeof symbolOrIndex == 'string')
			symbol = symbolOrIndex;
		if(symbol[0] == L._charCrypto) {
			urlType = L.KCRP;
			symbol = symbol.substr(1);
		}
		else if(symbol[0] == L._charFutures) {
			urlType = L.KFTR;
			symbol = symbol.substr(1);
		}
		L.gotoURL(symbol, urlType, `larval_${symbol}`);
	},
	createURL: (symbol, urlType) => {
		let keyMap = L._keyMap[L._keyMapIndex];
		if(!keyMap)
			keyMap = L._keyMap[L._keyMapIndexDefault];
		return(keyMap[urlType].replace('@', symbol));
	},
	gotoURL: (symbol, urlType, windowName) => {
		L.W.open(L.createURL(symbol, urlType), windowName).focus();
	},
	setURLFormat: (key, saveSettings) => {
		if(!L._keyMap[key])
			return;
		L._keyMapIndex = key;
		const domain=new URL(L._keyMap[L._keyMapIndex][L.KSTK]), display=(domain && domain.hostname ? domain.hostname : url);
		if(saveSettings) {
			localStorage.setItem('l_keymap_index', L._keyMapIndex);
			L.marqueeFlash(`Links will now permanently direct to <span class='l_marquee_highlight'>${display}</span> by default.`);
		}
		else
			L.marqueeFlash(`Links will now direct to <span class='l_marquee_highlight'>${display}</span> for this session, hold down <span class='l_marquee_highlight'>shift</span> to make it permanent.`);
	},
	setSortStageData: column => {
		if(L._stageDataSortByColumn == -column || !column || column > L.E('l_content_table').getElementsByTagName('th').length) {
			if(L._stageData.itemsImmutable)
				L._stageData.items = structuredClone(L._stageData.itemsImmutable);
			L._stageDataSortByColumn = 0;
		}
		else if(L._stageDataSortByColumn == column)
			L._stageDataSortByColumn = -column;
		else
			L._stageDataSortByColumn = column;
		L.sortStageData(true);
	},
	sortStageData: updateView => {
		if(L._stageData && L._stageDataSortByColumn) {
			if(!L._stageData.itemsImmutable)
				L._stageData.itemsImmutable = structuredClone(L._stageData.items);
			L._stageData.items = L._stageData.items.sort((a, b) => {
				const column = Math.abs(L._stageDataSortByColumn) - 1;
				if(a[column] === null || a[column] === false || a[column] === undefined)
					return 1;
				else if(b[column] === null || b[column] === false || b[column] === undefined)
					return -1;
				else if(typeof a[column] != typeof b[column])
					return L._stageDataSortByColumn < 0 ? (typeof a[column]=='number'?1:-1) : (typeof a[column]=='number'?1:-1);
				else if(typeof a[column] == 'string')
					return L._stageDataSortByColumn < 0 ? b[column].toUpperCase().localeCompare(a[column].toUpperCase()) : a[column].toUpperCase().localeCompare(b[column].toUpperCase());
				else if(typeof a[column] == 'number')
					return L._stageDataSortByColumn < 0 ? a[column]-b[column] : b[column]-a[column];
			});
		}
		if(updateView)
			L.updateLiveTable(false);
	},
	updateContentTableRowCountThatAreInView: () => {
		let rows=L.E('l_content_table').getElementsByTagName('tr'), total=-5;
		for(let i=0; i < rows.length; i++) {
			const box=rows[i].getBoundingClientRect();
			if(box.top < L.W.innerHeight && box.bottom >= 0)
				total++;
		}
		if(total < 10)
			total = 10;
		L._contentTableRowCountThatAreInView = total;
		return(total);
	},
	isMobile: () => 'ontouchstart' in L.D.documentElement && L.D.body.clientWidth/L.D.body.clientHeight < 1,
	isHaltRow: row => row && row[L.HLT] && typeof row[L.HLT] == 'string',
	cell: (row, type) => {
		if(!row[type])
			return(L._emptyCellHtml);
		switch(type) {
			case L.SYM:
			case L.OPT:
			case L.ERN:
			case L.NWS:
			case L.TAN:
				return(L.H(row[type]));
			case L.NAM:
				return(L._forceContentTableShrink ? L._emptyCellHtml : L.H(row[type]));
			case L.PCT:
				return(L.htmlPercent(row[type]));
			case L.PCT5:
			case L.HLT:
				return(L.isHaltRow(row) ? L.H(row[type]?row[type]:'HALTED') : L.htmlPercent(row[type]));
			case L.VOL:
				return(L.F(row[type],1));
			case L.VOL5:
				return('+' + L.F(row[type],1));
			case L.PRC:
				return('$' + L.N(row[type],2));
			case L.PRC5:
				return((row[type]<0?'-$':'+$') + L.N(Math.abs(row[type]),2));
			case L.OIV:
				return((L.H(row[type] > 0 ? row[type] : ('~' + Math.abs(row[type])))) + '%iv');
			case L.LNK:
				return(row[type]);
			default:
				return(L._emptyCellHtml);
		}
	},
	cellRollover: (row, primary, secondary, shrinkMode) => {
		let cell='<div class="l_hover_container">', left=(secondary==L.NWS);
		if(row[secondary] && !shrinkMode)
			cell += `<span class="${left?'l_hover_active_left':'l_hover_active'}">${L.cell(row,secondary)}</span><span class="l_hover_inactive">`;
		cell += L.cell(row,primary);
		if(row[secondary] && !shrinkMode)
			cell += '</span>';
		cell += '</div>';
		return(cell);
	},
	popoutLiveTableRow: row => {
		if(row[L.TAN] && typeof row[L.TAN] == 'string' && L._taMap[row[L.TAN]])
			return(`<div class="l_notify_popout l_ta" title="${L._taMap[row[L.TAN]][0]}">&#128200;&nbsp;${L._taMap[row[L.TAN]][1]}</div>`);
		else if(row[L.ERN] && row[L.NWS])
			return(`<div class="l_notify_popout l_news" title="News and earnings on ${L.cell(row,L.ERN)}">&#128197;&nbsp;${L.cell(row,L.ERN)}<span>&nbsp;+&nbsp;news</span></div>`);
		else if(row[L.ERN])
			return(`<div class="l_notify_popout" title="Earnings on ${L.cell(row,L.ERN)}">&#128198;&nbsp;${L.cell(row,L.ERN)}<span>&nbsp;earnings</span></div>`);
		else if(row[L.NWS])
			return(`<div class="l_notify_popout l_news" title="Company news">&#128197;&nbsp;<span>recent </span>news</div>`);
		return('');
	},
	updateLiveTable: (doNotify, doNotResetKeyRow) => {
		if(!L._stageData)
			return;
		const columns=['symbol', L._forceContentTableShrink?L._emptyCellHtml:'company', '~5min%','total%','price','volume','options'];
		const rangeUp=parseFloat(L.E('l_range_up_display').innerHTML), rangeDown=parseFloat(L.E('l_range_down_display').innerHTML), rangeVolume=parseInt(L.E('l_range_volume_display').innerHTML)*1000, optionsOnly=L.E('l_options_only').checked, includeCrypto=L.E('l_include_crypto').checked, includeFutures=L.E('l_include_futures').checked;
		L.E('l_afterhours_left').style.display = (!L._splashComplete||!L._stageData['afterhours']?'none':'block');
		L.E('l_afterhours_right').style.display = (!L._splashComplete||!L._stageData['afterhours']?'none':'block');
		let notifyRows=[], notify=false, notifyControl='', rowClass='', htmlRow='', htmlPriority='', htmlNormal='';
		let html='<tr>';
		for(let c=1,className=''; c <= columns.length; c++) {
			if(L._stageDataSortByColumn == c)
				className = 'l_content_table_header_selected';
			else if(L._stageDataSortByColumn == -c)
				className = 'l_content_table_header_selected_reverse';
			else
				className = 'l_content_table_header';
			html += `<th onclick="L.setSortStageData(${c})" id="l_content_table_header_${c}" class="${className}">${columns[c-1]}</th>`;
		}
		html += '</tr>';
		if(doNotify)
			L.notifyClear();
		for(let i=0; i < L._stageData['items'].length; i++) {
			const row=L._stageData['items'][i], notifyExcept=!!L._notifyExceptions[row[L.SYM]];
			if(L.isHaltRow(row)) {
				if(notifyExcept)
					continue;
				notify=L.E('l_notify_halts').checked && (!optionsOnly||row[L.OPT]);
				rowClass = (notify ? 'l_notify_halt' : 'l_halt');
				htmlRow = `<tr class="${rowClass}" onclick="L.openStockWindow(${i},event)">
					<td>
					 <div class="l_notify_disable" title="Disable ${L.cell(row,L.SYM)} notifications for this session" onclick="L.notifyException('${L.cell(row,L.SYM)}', true)">x</div>
					 ${L.cell(row,L.SYM)}
					</td>
					<td class="${row[L.NWS]?'l_news':''}">${L.cellRollover(row,L.NAM,L.NWS,L._forceContentTableShrink)}</td>
					<td colspan="4">HALT: ${L.cell(row,L.HLT)}</td>
					<td class="${row[L.OPT]?'l_options':''}">${L.popoutLiveTableRow(row)}${L.cellRollover(row,L.OPT,L.OIV)}</td>
					</tr>`;
			}
			else {
				notify=( !notifyExcept && ((((rangeUp&&row[L.PCT5]>=rangeUp)||(rangeDown&&rangeDown>=row[L.PCT5])) && (!row[L.VOL]||row[L.VOL]>=rangeVolume) && (!optionsOnly||row[L.OPT])) || (row[L.VOL]&&typeof row[L.VOL]=='string') ));
				if((!includeCrypto && row[L.OPT]=='crypto') || (!includeFutures && row[L.OPT]=='futures'))
					continue;
				if(notify) {
					rowClass = `l_notify_${row[L.PCT5]<0?'down':'up'}`;
					notifyControl = `<div class="l_notify_disable" title="Disable ${L.cell(row,L.SYM)} notifications for this session" onclick="L.notifyException('${L.cell(row,L.SYM)}', true)">x</div>`;
				}
				else {
					rowClass = '';
					if(notifyExcept)
						notifyControl = `<div class="l_notify_enable" title="Re-enable ${L.cell(row,L.SYM)} notifications" onclick="L.notifyException('${L.cell(row,L.SYM)}', false)">&#10003;</div>`;
					else
						notifyControl = '';
				}
				if(row[L.OPT] && ['crypto','futures'].indexOf(row[L.OPT]) >= 0)
					rowClass += ` l_${row[L.OPT]}`;
				htmlRow = `<tr class="${rowClass}" onclick="L.openStockWindow(${i},event)">
					<td>${notifyControl}${L.cell(row,L.SYM)}</td>
					<td class="${row[L.NWS]?'l_news':''}">${L.cellRollover(row,L.NAM,L.NWS,L._forceContentTableShrink)}</td>
					<td>${L.cell(row,L.PCT5)}</td>
					<td>${L.cell(row,L.PCT)}</td>
					<td>${L.cellRollover(row,L.PRC,L.PRC5)}</td>
					<td>${L.cellRollover(row,L.VOL,L.VOL5)}</td>
					<td class="${row[L.OPT]?'l_options':''}">${L.popoutLiveTableRow(row)}${L.cellRollover(row,L.OPT,L.OIV)}</td>
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
		L.E('l_content_table').className = L.E('l_awaiting_data') ? '' : 'l_content_tr_fade_in';
		if(doNotify)
			L.E('l_content_table').classList.add('l_content_table_notify_'+Math.abs(L._stageDataSortByColumn));
		L.E('l_content_table').innerHTML = html;
		L.updateContentTableRowCountThatAreInView();
		if(!doNotResetKeyRow)
			L._keyRow = 0;
		else
			L.onkeydown(null);
		if(!L._forceContentTableShrink && L.E('l_content_table').offsetWidth > L.D.body.offsetWidth) {
			L._forceContentTableShrink = true;
			L.updateLiveTable(doNotify, doNotResetKeyRow);
		}
		else if(notifyRows.length > 0 && doNotify)
			L.notify(notifyRows);
	}
}