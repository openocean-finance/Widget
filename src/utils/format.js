import BigNumber from 'bignumber.js';

export const formatNum = (val, def) => {
  if (isNaN(val)) return def || ''
  if (+val === 0) return '0'
  val = (+val).toString()
  const num = Math.floor(val)
  const dot = val.lastIndexOf('.') >= 0 ? val.substr(val.lastIndexOf('.')) : ''
  return num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + dot
}

export const formatDate = (time, Delimiter) => {
  Delimiter = Delimiter || '-';
  var now = new Date(time * 1000);

  var year = now.getFullYear() + '';
  var month = now.getMonth() + 1 + '';
  var date = now.getDate() + '';
  var hour = now.getHours() + '';
  var minute = now.getMinutes() + '';
  var second = now.getSeconds() + '';

  month = month.length < 2 ? '0' + month : month;
  date = date.length < 2 ? '0' + date : date;
  hour = hour.length < 2 ? '0' + hour : hour;
  minute = minute.length < 2 ? '0' + minute : minute;
  second = second.length < 2 ? '0' + second : second;

  return year + Delimiter + month + Delimiter + date + " " + hour + ":" + minute + ":" + second;
}

export const dateFormat = function(fmt, timestamp) {
  let ret;
  const date = new Date(timestamp);
  const opt = {
      "Y+": date.getFullYear().toString(),
      "m+": (date.getMonth() + 1).toString(),
      "d+": date.getDate().toString(),
      "H+": date.getHours().toString(),
      "M+": date.getMinutes().toString(),
      "S+": date.getSeconds().toString()
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
 */

export const dateFormatV2 = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormatV2;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNames[D],
				dddd: dF.i18n.dayNames[D + 7],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNames[m],
				mmmm: dF.i18n.monthNames[m + 12],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormatV2.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormatV2.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};

export function timeToHHmmss (date) {
  let time;
  let days = Math.floor(date / 86400)
  let hours = Math.floor(date / 3600 % 24);
  let minutes = Math.floor(date / 60 % 60);
  let seconds =  Math.floor(date % 60);
  time = days + 'Days ' + (hours < 10 ? ('0' + hours) : hours) + ':' + (minutes < 10 ? ('0' + minutes) : minutes) + ':' + (seconds < 10 ? ('0' + seconds) : seconds);
  return time;
}

export const toFixed = function(val, decimal, precision) {
  if (!val) return '';
  const value = Math.pow(10, decimal || 8);
  let result = Math.floor(val * value) / value;
  if (!precision) return result;
  result = new BigNumber(val).toFixed(decimal || 8);
  const padding = ((+result).toString().indexOf('.') >= 0 ? '' : '.') + '0000000000';
  const temp = result + padding;
  return temp.substr(0, temp.indexOf('.') + precision + 1);
}

export const toFixedV2 = function(val, decimal) {
  if (!val) return '';
  const result = new BigNumber(val).toFixed(decimal || 8);
  if (/\.0+$/.test(result)) {
    return result.replace(/\.0+$/gi, '');
  }
  return result.indexOf('.') > 0 ? result.replace(/0+$/gi, '') : result;
}


export function formatAccount(account){
  return account && account.length > 10 ? account.substring(0, 6) + '****' + account.substring(account.length - 4) : account;
}

export function formatUrl(url){
	return url && url.length > 15 ? url.substring(0,10) + '*****' +url.substring(url.length - 5) : url
}

export function formatLongNum(num){
	return num && num.length > 10 ? num.substring(0,8) + '...': num
}

export function formatCexAccount(account){
  const str = account.split('@')
  if (/^\d+$/.test(account)) {
      const len1 = Math.floor((account.length - 4) / 2)
      const len2 = account.length - 4 - len1
      const reg = new RegExp(`(\\d{${len1}})\\d{4}(\\d{${len2}})`)
      return account.replace(reg, '$1****$2')
  } else {
      return (
      str[0].substr(0, str[0].length > 5 ? 5 : str[0].length) +
      '****' +
      str[1].substr(str[1].lastIndexOf('.'))
      )
  }
}

export function formatPrice(val) {
	const _val = +val;
	if (_val <= 1) {
	  return Math.floor(_val * 1000000) / 1000000;
	} else if (_val > 1 && _val < 100) {
	  return Math.floor(_val * 10000) / 10000;
	} else {
	  return Math.floor(_val * 100) / 100;
	}
}