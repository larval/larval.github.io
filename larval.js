const L = {

	/* INTERNALS */
	_stageData: null,
	_stageDataSortByColumn: 0,
	_stageDataHistoryIndex: -1,
	_stageDataHistory: [],
	_notifyExceptions: {},
	_splashComplete: false,
	_forceContentTableShrink: false,
	_setNextStagePollTimeout: null,
	_setNextStagePollLong: 300,
	_setNextStagePollShort: 30,
	_marqueeLoopSecondsShort: 60,
	_marqueeLoopSecondsLong: 120,
	_marqueeInterval: null,
	_marqueeFlashTimeout: null,
	_notifyTitleInterval: null,
	_notifyAudio: new Audio('larval.mp3'),
	_notifyAllowed: null,
	_contentTableRowCountThatAreInView: 10,
	_emptyCellHtml: '<div class="l_none">&#8226;</div>',
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

	/* SHORTHAND / COMMON */
	E: id => document.getElementById(id),
	D: (number, digits) => number.toLocaleString(undefined, { minimumFractionDigits: digits,  maximumFractionDigits: digits }),
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
		const p=document.createElement('p');
		p.textContent = string;
		return(p.innerHTML);
	},
	I: string => {
		const p=document.createElement('p');
		p.innerHTML = string;
		return(p.textContent || p.innerText || '');
	},
	P: (count, total) => Math.round(count / total * 100),
	T: tag => document.getElementsByTagName(tag),
	U: string => (string?string[0]:'').toUpperCase() + string.substring(1),

	/* ENUMERATIONS */
	SYM:0, NAM:1, PCT5:2, PCT:3, PRC:4, VOL:5, OPT:6, OIV:7, ERN:8, PRC5:9, VOL5:10, NWS:11, LNK:12, HLT:2, 

	/* EVENTS */
	onload: () => {
		L.settingsLoad();
		L.notifySetup();
		L.keyMapSetup();
		document.addEventListener('click', L.notifySetup);
		document.addEventListener('touchstart', L.notifySetup);
		document.addEventListener('scroll', L.onscroll);
		window.addEventListener('resize', L.onresize);
		window.addEventListener('keydown', L.onkeydown);
		window.addEventListener('touchstart', L.ontouchstart);
		window.addEventListener('touchend', L.ontouchend);
		setTimeout(L.onloadAnimationComplete, 5500);
		L.E('l_range_up').oninput();
		L.E('l_range_down').oninput();
		L.E('l_range_volume').oninput();
		L.getStageData(false);
	},
	onloadAnimationComplete: () => {
		if(L._splashComplete)
			return;
		L._splashComplete = true;
		L.E('l_fixed').style.cursor = 'default';
		L.E('l_afterhours_left').style.display = (!L._stageData||!L._stageData['afterhours']?'none':'block');
		L.E('l_afterhours_right').style.display = (!L._stageData||!L._stageData['afterhours']?'none':'block');
		L.setNextStagePoll(!L._stageData||!L._stageData['items'] ? L._setNextStagePollShort : L.getSynchronizedNext());
		const topType = L.E('l_include_crypto').checked ? 'top_all' : 'top';
		if(localStorage && localStorage.length > 1 && L._stageData && L._stageData[topType] && L._stageData[topType].length > 1)
			L.marqueeUpdate(L._marqueeLoopSecondsLong);
		else
			L.marqueeInitiate(L._marqueeLoopSecondsShort);
		L.marqueeIntervalReset();
		L.updateLiveTable(true);
	},
	onresize: () => {
		L.settingsButtonToggle(true);
		L.updateContentTableRowCountThatAreInView();
	},
	onscroll: () => {
		const w=window, d=document, e=d.documentElement, g=L.T('body')[0],
			x=w.innerWidth||e.clientWidth||g.clientWidth, y=w.innerHeight||e.clientHeight||g.clientHeight,
			s=w.pageYOffset||e.scrollTop, scrolledDown=s>L.E('l_fixed').offsetHeight,
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
			width = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,
			height = window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,
			movementPercent = [Math.abs(swipeMovement[0])/width*100, Math.abs(swipeMovement[1])/height*100],
			movementWeighting = (movementPercent[0]+1) / (movementPercent[1]+1);
		if(movementPercent[0] > 25 && movementWeighting >= 1)
			L.gotoStageDataHistory(swipeMovement[0]);
		L._swipeStartPosition = null;
	},
	onkeydown: e => {
		L.fastSplash();
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
				case 'Tab':        L.settingsButtonToggle(); break;
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
	onmousemoveContentTable: () => {
		if(L._keyRow)
			L.onkeydown(false);
	},

	/* FUNCTIONS */
	fastSplash: () => {
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
		L.onloadAnimationComplete();
	},
	getSynchronizedNext: () => {
		if(!L._stageData || !L._stageData['next'])
			return(L._setNextStagePollLong);
		let next = Math.floor(L._stageData['next'] - (new Date().getTime() / 1000)) + Math.floor(Math.random() * 10);
		if(next < 0 || next > L._setNextStagePollLong + L._setNextStagePollShort)
			next = L._setNextStagePollLong;
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
		xhr.onerror = () => { L.setNextStagePoll(L._setNextStagePollShort); }
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
		if(L._setNextStagePollTimeout)
			clearTimeout(L._setNextStagePollTimeout);
		L._setNextStagePollTimeout = setTimeout(L.setNextStagePollComplete, seconds * 1000);
	},
	setNextStagePollComplete: () => {
		if(L._setNextStagePollTimeout)
			clearTimeout(L._setNextStagePollTimeout);
		L._setNextStagePollTimeout = null;
		L.getStageData(true);
	},
	forceNextStagePoll: () => { L.setNextStagePollComplete(); },
	epochNow: () => Math.floor(Date.now() / 1000),
	epochToDate: epoch => new Date(epoch * 1000).toLocaleTimeString('en-US', {weekday:'short',hour:'numeric',minute:'2-digit',timeZoneName:'short'}),
	htmlPercent: number => {
		if(number > 0)
			return(L.D(Math.abs(number),2) + '%<span class="l_up">&#9650;</span>');
		else if(number < 0)
			return(L.D(Math.abs(number),2) + '%<span class="l_down">&#9660;</span>');
		else
			return(L._emptyCellHtml);
	},
	settingsButtonToggle: forceClosed => {
		const controlHeight=(L.E('l_control').scrollHeight > 200 ? L.E('l_control_table').scrollHeight : 250)+'px', grow=(!forceClosed && L.E('l_control').style.height!=controlHeight);
		L.E('l_control').style.height = (grow?controlHeight:'0px');
		L.E('l_settings_button').innerHTML = (grow?'&#9660; settings &#9660;':'&#9650; settings &#9650;');
	},
	settingsSave: updateView => {
		for(let inputs=L.T('input'), i=0; i < inputs.length; i++) {
			let input=inputs[i];
			if(input.type == 'checkbox')
				localStorage.setItem(input.id, input.checked ? 'true' : 'false');
			else if(input.type == 'range')
				localStorage.setItem(input.id, input.value);
		}
		if(updateView)
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
	keyMapSetup: () => {
		if(!(L._keyMapIndex=localStorage.getItem('l_keymap_index')))
			L._keyMapIndex = L._keyMapIndexDefault;
		for(let key in L._keyMap) {
			if(!L._keyMap[key][1])
				L._keyMap[key][1] = L._keyMap[key][0];
			if(!L._keyMap[key][2])
				L._keyMap[key][2] = L._keyMap[L._keyMapIndexDefault][2];
			if(!L._keyMap[key][3])
				L._keyMap[key][3] = L._keyMap[L._keyMapIndexDefault][3];
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
		document.documentElement.style.setProperty('--marquee-start', '-'+viewWidth+'px');
		document.documentElement.style.setProperty('--marquee-end', '-'+fullWidth+'px');
		lb.style.animation = 'none';
		void lb.offsetWidth;
		lb.style.animation = `l_marquee ${seconds}s linear infinite`;
	},
	marqueeUpdate: seconds => {
		const topType = L.E('l_include_crypto').checked ? 'top_all' : 'top';
		if(!L._stageData || !L._stageData[topType] || L._stageData[topType].length < 2)
			return;
		let html='';
		if(L._stageData['marquee'])
			html = L._stageData['marquee'];
		else {
			for(let i=L._stageData[topType].length-1; i >= 0; i--) {
				let item = L._stageData[topType][i];
				html += `<div class="l_marquee_link" onclick="L.openStockWindow('${item[0]}')"><span class='l_marquee_highlight_padded'>#${i+1}</span>${item[0]} &#177; ${item[1]}%</div> `
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
			window.scrollTo({top: 0, behavior: 'smooth'});
			L.marqueeIntervalReset();
			L.marqueeFlashTimeout = setTimeout(L.marqueeFlash, 5000);
			const el=L.E('l_marquee_flash');
			el.style.animation = 'none';
			void el.offsetHeight;
			el.style.animation = `l_content_fade_in 1s ease forwards`;
		}
		else
			L.marqueeUpdate(L._marqueeLoopSecondsLong);
	},
	marqueeIntervalReset: () => {
		if(L._marqueeInterval)
			clearInterval(L._marqueeInterval);
		L._marqueeInterval = setInterval(() => { L.marqueeUpdate(L._marqueeLoopSecondsLong) }, L._marqueeLoopSecondsLong * 1000);
	},
	marqueeHotKeyHelp: () => {
		let key, match, html='<span class="l_marquee_blink">&#8226;</span> The following hotkeys are available to quickly navigate your history and third party websites. <span class="l_marquee_blink">&#8226;</span> Use <span class="l_marquee_highlight">&#8644;</span> arrow keys to rewind and navigate your backlog history. <span class="l_marquee_blink">&#8226;</span> Use <span class="l_marquee_highlight">&#8645;</span> arrow keys to navigate to a row followed by selecting one of these hotkeys: ';
		for(let key in L._keyMap) {
			if((match=L._keyMap[key][0].match(/([a-z]+)\.[a-z]+\//i)))
				html += `<div class="l_marquee_link" onclick="L.setURLFormat('${key}',false)"><span class='l_marquee_highlight_padded'>${key}</span>${L.H(match[1])}</div> `
		}
		html += '<span class="l_marquee_blink">&#8226;</span> Hold down the <span class="l_marquee_highlight">shift</span> key to make your selection permanent. <span class="l_marquee_blink">&#8226;</span> The keys <span class="l_marquee_highlight">1-7</span> can be used to sort by each column.';
		window.scrollTo({top: 0, behavior: 'smooth'});
		L.marqueeIntervalReset();
		L.marqueeInitiate(L._marqueeLoopSecondsLong, html);
	},
	notify: (notifyRows) => {
		L.notifyClear();
		try {
			if(Notification && Notification.permission == 'granted') {
				void new Notification('Larval - Market volatility found!', {
					icon: 'icon-192x192.png',
					body: notifyRows.length > 0 ? 'Volatile stock(s): ' + notifyRows.map(a => a[L.SYM]).filter((v,i,s) => { return s.indexOf(v)===i; }).join(', ') : 'Larval - Market volatility found!'
				});
			}
			else 
				L.requestNotifications();
		}
		catch(e) { }
		notifyRows.push([]);
		L._notifyTitleInterval = setInterval(() => {
			if(!document.hidden || !L._notifyTitleInterval)
				L.notifyClear();
			else if(!notifyRows[0] || !notifyRows[0][0])
				document.title = L._title;
			else if(L.isHaltRow(notifyRows[0]))
				document.title = notifyRows[0][L.SYM] + ' | ' + (notifyRows[0][L.HLT]?notifyRows[0][L.HLT]:'HALTED');
			else
				document.title = notifyRows[0][L.SYM] + ' | ' + (notifyRows[0][L.PCT5]<0?"\u25bc ":"\u25b2 ") + L.D(Math.abs(notifyRows[0][L.PCT5]),2) + '% | ' + (notifyRows[0][L.PCT]<0?"\u25bc ":"\u25b2 ") + L.D(Math.abs(notifyRows[0][L.PCT]),2) + '%';
			notifyRows.push(notifyRows.shift());
		}, 1000);
		if(L.E('l_audible').checked)
			L.notifyPlayAudio();
		window.scrollTo({top: 0, behavior: 'smooth'});
	},
	notifyClear: () => {
		if(L._notifyTitleInterval) {
			clearInterval(L._notifyTitleInterval);
			L._notifyTitleInterval = null;
		}
		document.title = L._title;
	},
	notifyException: (symbol, disable) => {
		if(disable)
			L._notifyExceptions[symbol] = true;
		else if(L._notifyExceptions[symbol])
			delete L._notifyExceptions[symbol];
		L.updateLiveTable(false, true);
	},
	notifyPlayAudio: () => {
		let playPromise=L._notifyAudio.play();
		if (playPromise !== undefined) 
			playPromise.then(()=>{}).catch(e=>{});
	},
	notifySetup: () => {
		document.removeEventListener('click', L.notifySetup);
		document.removeEventListener('touchstart', L.notifySetup);
		L._notifyAudio = new Audio('larval.mp3');
		L._notifyAudio.load();
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
		try { if(navigator.wakeLock) navigator.wakeLock.request('screen'); }
		catch (e) { }
	},
	openStockWindow: (symbolOrIndex, e) => {
		let symbol='', urlType=0;
		if(e && e.target.nodeName != 'TD')
			return;
		if(typeof symbolOrIndex == 'number') {
			symbol = L._stageData['items'][symbolOrIndex][L.SYM];
			if(L._stageData['items'][symbolOrIndex][L.LNK] && e && e.target.className == 'l_company_name') {
				window.open(L._stageData['items'][symbolOrIndex][L.LNK], `larval_news_${symbol}`).focus();
				return;
			}
			else if(e && e.target.className == 'l_options')
				urlType = 1;
		}
		if(typeof symbolOrIndex == 'string')
			symbol = symbolOrIndex;
		if(symbol[0] == '*') {
			urlType = 2;
			symbol = symbol.substr(1);
		}
		else if(symbol[0] == '^') {
			urlType = 3;
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
		window.open(L.createURL(symbol, urlType), windowName).focus();
	},
	setURLFormat: (key, saveSettings) => {
		if(!L._keyMap[key])
			return;
		L._keyMapIndex = key;
		const domain=new URL(L._keyMap[L._keyMapIndex][0]), display=(domain && domain.hostname ? domain.hostname : url);
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
			if(box.top < window.innerHeight && box.bottom >= 0)
				total++;
		}
		if(total < 10)
			total = 10;
		L._contentTableRowCountThatAreInView = total;
		return(total);
	},
	isHaltRow: row => row && row[L.HLT] && typeof row[L.HLT] == 'string',
	cell: (row, type) => {
		if(!row[type])
			return(L._emptyCellHtml);
		switch(type) {
			case L.SYM:
			case L.OPT:
			case L.ERN:
			case L.NWS:
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
				return('$' + L.D(row[type],2));
			case L.PRC5:
				return((row[type]<0?'-$':'+$') + L.D(Math.abs(row[type]),2));
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
		if(row[L.ERN] && row[L.NWS])
			return(`<div class="l_notify_popout" title="News and earnings on ${L.cell(row,L.ERN)}">&#128197;&nbsp;${L.cell(row,L.ERN)}<span>&nbsp;+&nbsp;news</span></div>`);
		else if(row[L.ERN])
			return(`<div class="l_notify_popout" title="Earnings on ${L.cell(row,L.ERN)}">&#128198;&nbsp;${L.cell(row,L.ERN)}<span>&nbsp;earnings</span></div>`);
		else if(row[L.NWS])
			return(`<div class="l_notify_popout" title="Company news">&#128197;&nbsp;<span>recent </span>news</div>`);
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
					<td class="l_company_name">${L.cellRollover(row,L.NAM,L.NWS,L._forceContentTableShrink)}</td>
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
				htmlRow = `<tr class="${rowClass}" onclick="L.openStockWindow(${i}, event)">
					<td>${notifyControl}${L.cell(row,L.SYM)}</td>
					<td class="l_company_name">${L.cellRollover(row,L.NAM,L.NWS,L._forceContentTableShrink)}</td>
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
		if(!L._forceContentTableShrink && L.E('l_content_table').offsetWidth > document.body.offsetWidth) {
			L._forceContentTableShrink = true;
			L.updateLiveTable(doNotify, doNotResetKeyRow);
		}
		else if(notifyRows.length > 0 && doNotify)
			L.notify(notifyRows);
	}
}