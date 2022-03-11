var L = {

	/* INTERNALS */
	_stageData: null,
	_notifyExceptions: {},
	_splashComplete: false,
	_setNextStagePollTimeout: null,
	_setNextStagePollLong: 300,
	_setNextStagePollShort: 30,
	_marqueeLoopSecondsShort: 60,
	_marqueeLoopSecondsLong: 120,
	_notifyTitleInterval: null,
	_notifyAudio: new Audio('larval.mp3'),
	_notifyAllowed: null,
	_title:	document.title,

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
	T: tag => document.getElementsByTagName(tag),

	/* EVENTS */
	onload: () => {
		L.settingsLoad();
		L.notifySetup();
		document.addEventListener('click', L.notifySetup);
		document.addEventListener('touchstart', L.notifySetup);
		document.addEventListener('scroll', L.onscroll);
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
		L.E('l_afterhours_left').style.display = (!L._stageData||!L._stageData['afterhours']?'none':'block');
		L.E('l_afterhours_right').style.display = (!L._stageData||!L._stageData['afterhours']?'none':'block');
		L.setNextStagePoll(!L._stageData||!L._stageData['stocks'] ? L._setNextStagePollShort : L.getSynchronizedNext());
		const topType = L.E('l_include_crypto').checked ? 'top_all' : 'top';
		if(localStorage && localStorage.length > 1 && L._stageData && L._stageData[topType] && L._stageData[topType].length > 1)
			L.marqueeUpdate(L._marqueeLoopSecondsLong);
		else
			L.marqueeInitiate(L._marqueeLoopSecondsShort);
		setInterval(() => { L.marqueeUpdate(L._marqueeLoopSecondsLong) }, L._marqueeLoopSecondsLong * 1000);
		L.updateLiveTable(true);
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

	/* FUNCTIONS */
	fastSplash: () => {
		if(L._splashComplete || !L._stageData)
			return;
		let reanimate={
			'l_logo': 'l_logo 0.5s ease 1 normal 0.5s forwards',
			'l_fixed': 'l_fixed 0.5s ease 1 normal forwards',
			'l_marquee_container': 'l_marquee_container 0.5s ease forwards'
		}
		for(var id in reanimate) {
			L.E(id).style.animation = 'none';
			void L.E(id).offsetHeight;
			L.E(id).style.animation = reanimate[id];
		}
		L.E('l_logo_tag').style.display = 'none';
		L.E('l_progress').style.display = 'block'
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
				let json = JSON.parse(xhr.responseText);
				if(!json || !json['ts'] || (L._stageData && L._stageData['ts'] == json['ts']))
					xhr.onerror();
				else {
					L._stageData = json;
					L.E('l_last_update').innerHTML = L.H(L._stageData['ts']);
					if(updateView)
						L.updateLiveTable(true);
					L.setNextStagePoll(L.getSynchronizedNext());
				}
			}
			catch(e) { xhr.onerror(); }
		}
		xhr.onerror = () => { L.setNextStagePoll(L._setNextStagePollShort); }
		xhr.send();
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
	forceNextStagePoll: () => { L.setNextStagePollComplete() },
	htmlPercent: number => {
		if(number > 0)
			return(L.D(Math.abs(number),2) + '%<span class="l_up">&#9650;</span>');
		else if(number < 0)
			return(L.D(Math.abs(number),2) + '%<span class="l_down">&#9660;</span>');
		else
			return('<div class="l_none">&#8226;</div>');
	},
	settingsButtonToggle: () => {
		const grow=L.E('l_control').style.maxHeight!='100%';
		L.E('l_control').style.maxHeight = (grow?'100%':'0%');
		L.E('l_settings_button').innerHTML = (grow?'&#9660; settings &#9660;':'&#9650; settings &#9650;');
	},
	settingsSave: updateView => {
		for(let inputs=L.T('input'), i=0; i < inputs.length; i++) {
			let input=inputs[i];
			if(input.type == 'checkbox')
				localStorage.setItem(input.id, input.checked? 'true' : 'false');
			else if(input.type == 'range')
				localStorage.setItem(input.id, input.value);
		}
		if(updateView)
			L.updateLiveTable(false);
	},
	settingsLoad: () => {
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
		document.documentElement.style.setProperty('--marquee-start', '-'+viewWidth+'px');
		document.documentElement.style.setProperty('--marquee-end', '-'+(fullWidth/*-viewWidth*/)+'px');
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
				html += `<div class="l_marquee_link" onclick="L.openStockWindow('${item[0]}')"><span class='l_marquee_highlight'>#${i+1}</span>${item[0]} &#177; ${item[1]}%</div> `
			}
		}
		L.marqueeInitiate(seconds, html);
	},
	notify: (message) => {
		L.notifyClear();
		L._notifyTitleInterval = setInterval(() => {
			if(!document.hidden || !L._notifyTitleInterval)
				L.notifyClear();
			else
				document.title = (document.title==L._title?'*** MARKET VOLATILITY ***':L._title);
		}, 1000);
		try {
			if(Notification && Notification.permission == 'granted') {
				void new Notification('Larval - Market volatility found!', {
					icon: 'icon-192x192.png',
					body: message ? message : 'Larval - Market volatility found!'
				});
			}
			else 
				L.requestNotifications();
		}
		catch(e) { }
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
		L.updateLiveTable(false);
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
	openStockWindow: (symbol, e) => {
		if(e && e.target.nodeName != 'TD')
			return;
		let sym = symbol;
		if(symbol[0] == '*')
			sym = symbol.substr(1) + '-USD';
		window.open(`https://finance.yahoo.com/quote/${L.H(sym)}`, `larval_${symbol}`).focus();
	},
	updateLiveTable: doNotify => {
		if(!L._stageData)
			return;
		const rangeUp=parseFloat(L.E('l_range_up_display').innerHTML), rangeDown=parseFloat(L.E('l_range_down_display').innerHTML), rangeVolume=parseInt(L.E('l_range_volume_display').innerHTML)*1000, optionsOnly=L.E('l_options_only').checked, includeCrypto=L.E('l_include_crypto').checked;
		L.E('l_afterhours_left').style.display = (!L._splashComplete||!L._stageData['afterhours']?'none':'block');
		L.E('l_afterhours_right').style.display = (!L._splashComplete||!L._stageData['afterhours']?'none':'block');
		let notifySymbols=[], notifyAny=false, rowClass='', htmlRow='', htmlPriority='', htmlNormal='';
		let html='<tr><th style="width:1%">symbol</th><th>company</th><th style="width:1%">~5min%</th><th style="width:1%">total%</th><th style="width:1%">price</th><th style="width:1%">volume</th><th style="width:1%">options</th></tr>';
		if(doNotify)
			L.notifyClear();
		for(let i in L._stageData['halts']) {
			const row=L._stageData['halts'][i], notify=L.E('l_notify_halts').checked, notifyExcept=!!L._notifyExceptions[row[0]];;
			if(notifyExcept)
				continue;
			rowClass = (notify ? 'l_notify_halt' : 'l_halt');
			htmlRow = `<tr class="${rowClass}" onclick="L.openStockWindow('${L.H(row[0])}', event)">
				<td>
				 <div class="l_notify_disable" title="Disable ${L.H(row[0])} notifications for this session" onclick="L.notifyException('${L.H(row[0])}', true)">x</div>
                 ${L.H(row[0])}
                </td>
				<td>${L.H(row[1])}</td>
				<td>HALTED</td>
				<td colspan="4">${L.H(row[2])}</td>
				</tr>`;
			if(notify) {
				notifyAny = true;
				htmlPriority += htmlRow;
				notifySymbols.push(row[0]);
			}
			else
				htmlNormal += htmlRow;
		}
		for(let i in L._stageData['stocks']) {
			const row=L._stageData['stocks'][i], notifyExcept=!!L._notifyExceptions[row[0]];
			const notify=( !notifyExcept && ((rangeUp&&row[2]>=rangeUp)||(rangeDown&&rangeDown>=row[2])) && row[5]>=rangeVolume && (!optionsOnly||row[6]) );
			if(!includeCrypto && row[6]=='crypto')
				continue;
			if(notify) {
				notifyAny = true;
				rowClass = `l_notify_${row[2]<0?'down':'up'}`;
				notifyControl = `<div class="l_notify_disable" title="Disable ${L.H(row[0])} notifications for this session" onclick="L.notifyException('${L.H(row[0])}', true)">x</div>`;
				if(notifySymbols.indexOf(row[0]) < 0)
					notifySymbols.push(row[0]);
			}
			else {
				rowClass = '';
				if(notifyExcept)
					notifyControl = `<div class="l_notify_enable" title="Re-enable ${L.H(row[0])} notifications" onclick="L.notifyException('${L.H(row[0])}', false)">&#10003;</div>`;
				else
					notifyControl = '';
			}
			if(row[6]=='crypto')
				rowClass += ' l_crypto';
			if(row[7])
				notifyEarnings = `<div class="l_notify_earnings" title="Earnings on ${L.H(row[7])}">&#128197;&nbsp;${L.H(row[7])}<span>&nbsp;earnings</span></div>`;
			else
				notifyEarnings = '';
			htmlRow = `<tr class="${rowClass}" onclick="L.openStockWindow('${L.H(row[0])}', event)">
				<td>${notifyControl}${L.H(row[0])}</td>
				<td>${L.H(row[1])}</td>
				<td>${L.htmlPercent(row[2])}</td>
				<td>${L.htmlPercent(row[3])}</td>
				<td>$${L.D(row[4],2)}</td>
				<td>${row[5]?L.F(row[5],1):'<div class="l_none">&#8226;</div>'}</td>
				<td>${notifyEarnings}${row[6]?L.H(row[6]):'<div class="l_none">&#8226;</div>'}</td>
				</tr>`;
			if(notify)
				htmlPriority += htmlRow;
			else
				htmlNormal += htmlRow;
		}
		if(!htmlPriority && !htmlNormal)
			html += '<tr><td colspan="7">No results found.</td></tr>';
		else
			html += htmlPriority + htmlNormal;
		if(!L.E('l_awaiting_data') && !L.E('l_content_table').classList.contains('l_content_tr_fade_in'))
			L.E('l_content_table').classList.add('l_content_tr_fade_in');
		L.E('l_content_table').innerHTML = html;
		if(notifyAny && doNotify)
			L.notify(notifySymbols.length > 0 ? ('Volatile stock(s): '+notifySymbols.join(', ')) : null);
	}
}