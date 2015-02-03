(function () { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var HxOverrides = function() { };
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
Math.__name__ = ["Math"];
var Reflect = function() { };
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
var Std = function() { };
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
var StringTools = function() { };
StringTools.__name__ = ["StringTools"];
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
};
var Type = function() { };
Type.__name__ = ["Type"];
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
};
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw "Too many arguments";
	}
	return null;
};
var hxColorToolkit = {};
hxColorToolkit.spaces = {};
hxColorToolkit.spaces.Color = function() { };
hxColorToolkit.spaces.Color.__name__ = ["hxColorToolkit","spaces","Color"];
hxColorToolkit.spaces.Color.prototype = {
	__class__: hxColorToolkit.spaces.Color
};
hxColorToolkit.spaces.HSB = function(hue,saturation,brightness) {
	if(brightness == null) brightness = 0;
	if(saturation == null) saturation = 0;
	if(hue == null) hue = 0;
	this.numOfChannels = 3;
	this.data = [];
	this.set_hue(hue);
	this.set_saturation(saturation);
	this.set_brightness(brightness);
};
hxColorToolkit.spaces.HSB.__name__ = ["hxColorToolkit","spaces","HSB"];
hxColorToolkit.spaces.HSB.__interfaces__ = [hxColorToolkit.spaces.Color];
hxColorToolkit.spaces.HSB.loop = function(index,length) {
	if(index < 0) index = length + index % length;
	if(index >= length) index %= length;
	return index;
};
hxColorToolkit.spaces.HSB.prototype = {
	getValue: function(channel) {
		return this.data[channel];
	}
	,setValue: function(channel,val) {
		if(channel == 0) this.data[channel] = hxColorToolkit.spaces.HSB.loop(val,360); else this.data[channel] = Math.min(channel == 0?360:100,Math.max(val,0));
		return val;
	}
	,minValue: function(channel) {
		return 0;
	}
	,maxValue: function(channel) {
		if(channel == 0) return 360; else return 100;
	}
	,get_hue: function() {
		return this.getValue(0);
	}
	,set_hue: function(val) {
		this.data[0] = hxColorToolkit.spaces.HSB.loop(val,360);
		return val;
	}
	,get_saturation: function() {
		return this.getValue(1);
	}
	,set_saturation: function(val) {
		this.data[1] = Math.min(100,Math.max(val,0));
		return val;
	}
	,get_brightness: function() {
		return this.getValue(2);
	}
	,set_brightness: function(val) {
		this.data[2] = Math.min(100,Math.max(val,0));
		return val;
	}
	,toRGB: function() {
		var hue = this.get_hue();
		var saturation = this.get_saturation();
		var brightness = this.get_brightness();
		var r = 0;
		var g = 0;
		var b = 0;
		var i;
		var f;
		var p;
		var q;
		var t;
		hue %= 360;
		if(brightness == 0) return new hxColorToolkit.spaces.RGB();
		saturation *= 0.01;
		brightness *= 0.01;
		hue /= 60;
		i = Math.floor(hue);
		f = hue - i;
		p = brightness * (1 - saturation);
		q = brightness * (1 - saturation * f);
		t = brightness * (1 - saturation * (1 - f));
		if(i == 0) {
			r = brightness;
			g = t;
			b = p;
		} else if(i == 1) {
			r = q;
			g = brightness;
			b = p;
		} else if(i == 2) {
			r = p;
			g = brightness;
			b = t;
		} else if(i == 3) {
			r = p;
			g = q;
			b = brightness;
		} else if(i == 4) {
			r = t;
			g = p;
			b = brightness;
		} else if(i == 5) {
			r = brightness;
			g = p;
			b = q;
		}
		return new hxColorToolkit.spaces.RGB(r * 255,g * 255,b * 255);
	}
	,getColor: function() {
		return this.toRGB().getColor();
	}
	,fromRGB: function(rgb) {
		var r = rgb.get_red();
		var g = rgb.get_green();
		var b = rgb.get_blue();
		r /= 255;
		g /= 255;
		b /= 255;
		var h;
		var s;
		var v;
		var min;
		var max;
		var delta;
		min = Math.min(r,Math.min(g,b));
		max = Math.max(r,Math.max(g,b));
		v = max * 100;
		delta = max - min;
		if(max != 0) s = delta / max * 100; else {
			s = 0;
			h = -1;
			this.set_hue(h);
			this.set_saturation(s);
			this.set_brightness(v);
			return this;
		}
		if(delta == 0) {
			this.set_hue(0);
			this.set_saturation(s);
			this.set_brightness(v);
			return this;
		}
		if(r == max) h = (g - b) / delta; else if(g == max) h = 2 + (b - r) / delta; else h = 4 + (r - g) / delta;
		h *= 60;
		if(h < 0) h += 360;
		this.set_hue(h);
		this.set_saturation(s);
		this.set_brightness(v);
		return this;
	}
	,setColor: function(color) {
		return this.fromRGB(new hxColorToolkit.spaces.RGB(color >> 16 & 255,color >> 8 & 255,color & 255));
	}
	,clone: function() {
		return new hxColorToolkit.spaces.HSB(this.get_hue(),this.get_saturation(),this.get_brightness());
	}
	,interpolate: function(target,ratio) {
		if(ratio == null) ratio = 0.5;
		var target1;
		if(js.Boot.__instanceof(target,hxColorToolkit.spaces.HSB)) target1 = target; else target1 = new hxColorToolkit.spaces.HSB().fromRGB(target.toRGB());
		return new hxColorToolkit.spaces.HSB(this.get_hue() + (target1.get_hue() - this.get_hue()) * ratio,this.get_saturation() + (target1.get_saturation() - this.get_saturation()) * ratio,this.get_brightness() + (target1.get_brightness() - this.get_brightness()) * ratio);
	}
	,__class__: hxColorToolkit.spaces.HSB
};
hxColorToolkit.spaces.RGB = function(r,g,b) {
	if(b == null) b = 0;
	if(g == null) g = 0;
	if(r == null) r = 0;
	this.numOfChannels = 3;
	this.data = [];
	this.set_red(r);
	this.set_green(g);
	this.set_blue(b);
};
hxColorToolkit.spaces.RGB.__name__ = ["hxColorToolkit","spaces","RGB"];
hxColorToolkit.spaces.RGB.__interfaces__ = [hxColorToolkit.spaces.Color];
hxColorToolkit.spaces.RGB.prototype = {
	getValue: function(channel) {
		return this.data[channel];
	}
	,setValue: function(channel,val) {
		this.data[channel] = Math.min(255,Math.max(val,0));
		return val;
	}
	,minValue: function(channel) {
		return 0;
	}
	,maxValue: function(channel) {
		return 255;
	}
	,get_red: function() {
		return this.getValue(0);
	}
	,set_red: function(value) {
		return this.setValue(0,value);
	}
	,get_green: function() {
		return this.getValue(1);
	}
	,set_green: function(value) {
		return this.setValue(1,value);
	}
	,get_blue: function() {
		return this.getValue(2);
	}
	,set_blue: function(value) {
		return this.setValue(2,value);
	}
	,toRGB: function() {
		return this.clone();
	}
	,getColor: function() {
		return Math.round(this.get_red()) << 16 | Math.round(this.get_green()) << 8 | Math.round(this.get_blue());
	}
	,fromRGB: function(rgb) {
		this.set_red(rgb.get_red());
		this.set_green(rgb.get_green());
		this.set_blue(rgb.get_blue());
		return this;
	}
	,setColor: function(color) {
		this.set_red(color >> 16 & 255);
		this.set_green(color >> 8 & 255);
		this.set_blue(color & 255);
		return this;
	}
	,clone: function() {
		return new hxColorToolkit.spaces.RGB(this.get_red(),this.get_green(),this.get_blue());
	}
	,interpolate: function(target,ratio) {
		if(ratio == null) ratio = 0.5;
		var target1;
		if(js.Boot.__instanceof(target,hxColorToolkit.spaces.RGB)) target1 = target; else target1 = new hxColorToolkit.spaces.RGB().fromRGB(target.toRGB());
		return new hxColorToolkit.spaces.RGB(this.get_red() + (target1.get_red() - this.get_red()) * ratio,this.get_green() + (target1.get_green() - this.get_green()) * ratio,this.get_blue() + (target1.get_blue() - this.get_blue()) * ratio);
	}
	,__class__: hxColorToolkit.spaces.RGB
};
var js = {};
js.Boot = function() { };
js.Boot.__name__ = ["js","Boot"];
js.Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else return o.__class__;
};
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js.Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) str2 += ", \n";
		str2 += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
};
js.Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js.Boot.__interfLoop(js.Boot.getClass(o),cl)) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
var jsrealamp = {};
jsrealamp.State = { __ename__ : true, __constructs__ : ["Playing","Stopped"] };
jsrealamp.State.Playing = ["Playing",0];
jsrealamp.State.Playing.__enum__ = jsrealamp.State;
jsrealamp.State.Stopped = ["Stopped",1];
jsrealamp.State.Stopped.__enum__ = jsrealamp.State;
jsrealamp.NoAudioContextError = function(message) {
	this.message = message;
};
jsrealamp.NoAudioContextError.__name__ = ["jsrealamp","NoAudioContextError"];
jsrealamp.NoAudioContextError.prototype = {
	__class__: jsrealamp.NoAudioContextError
};
jsrealamp.Audio = function(engine,fileData) {
	this.state = jsrealamp.State.Stopped;
	this.samplesPlayed = 0;
	this.engine = engine;
	engine.open(new Uint8Array(fileData),4096);
	if(jsrealamp.Audio.audioContext == null) {
		var audioContextClass = Reflect.field(window,"AudioContext");
		if(audioContextClass == null) audioContextClass = Reflect.field(window,"webkitAudioContext");
		if(audioContextClass == null) throw new jsrealamp.NoAudioContextError("No AudioContext available");
		jsrealamp.Audio.audioContext = Type.createInstance(audioContextClass,[]);
	}
	this.audioBuffer = jsrealamp.Audio.audioContext.createBuffer(2,4096,44100);
};
jsrealamp.Audio.__name__ = ["jsrealamp","Audio"];
jsrealamp.Audio.prototype = {
	close: function() {
		this.stop();
		this.updateCallback = null;
		this.audioBuffer = null;
	}
	,start: function() {
		if(this.state == jsrealamp.State.Stopped) {
			this.audioBufferSource = jsrealamp.Audio.audioContext.createBufferSource();
			this.audioBufferSource.buffer = this.audioBuffer;
			this.audioScriptNode = jsrealamp.Audio.audioContext.createScriptProcessor(4096);
			this.audioScriptNode.onaudioprocess = $bind(this,this.renderSamples);
			this.gainNode = jsrealamp.Audio.audioContext.createGain();
			this.audioBufferSource.connect(this.audioScriptNode,0,0);
			this.audioScriptNode.connect(this.gainNode,0,0);
			this.gainNode.connect(jsrealamp.Audio.audioContext.destination,0,0);
			this.audioBufferSource.start(0);
		}
		this.state = jsrealamp.State.Playing;
	}
	,stop: function() {
		if(this.state == jsrealamp.State.Playing) {
			this.audioBufferSource.disconnect(0);
			this.audioScriptNode.disconnect(0);
			this.gainNode.disconnect(0);
			this.audioBufferSource.stop(0);
			this.audioBufferSource = null;
			this.audioScriptNode = null;
			this.gainNode = null;
		}
		this.state = jsrealamp.State.Stopped;
	}
	,renderSamples: function(event) {
		if(this.state != jsrealamp.State.Playing) return;
		this.engine.render([event.outputBuffer.getChannelData(0),event.outputBuffer.getChannelData(1)]);
		this.samplesPlayed += 4096;
		if(this.updateCallback != null) this.updateCallback();
	}
	,resetCounters: function() {
		this.samplesPlayed = 0;
	}
	,newAnalyser: function() {
		var node = jsrealamp.Audio.audioContext.createAnalyser();
		this.audioScriptNode.connect(node,0,0);
		return node;
	}
	,get_volume: function() {
		return this.gainNode.gain.value;
	}
	,set_volume: function(value) {
		this.gainNode.gain.value = value;
		return value;
	}
	,__class__: jsrealamp.Audio
};
jsrealamp.Emscripten = function() { };
jsrealamp.Emscripten.__name__ = ["jsrealamp","Emscripten"];
jsrealamp.Emscripten.HEAPU8 = function() {
	return Module.HEAPU8;
};
jsrealamp.Emscripten.cwrap = function(func,returnType,parameters) {
	return Module.cwrap(func,returnType,parameters);
};
jsrealamp.Emscripten.malloc = function(bytes) {
	return Module._malloc(bytes);
};
jsrealamp.Emscripten.free = function(buffer) {
	return Module._free(buffer);
};
jsrealamp.Emscripten.getValue = function(pointer,type) {
	return Module.getValue(pointer,type);
};
jsrealamp.Emscripten.setValue = function(pointer,value,type) {
	Module.setValue(pointer,value,type);
};
jsrealamp.FileLoaderStatus = function() {
};
jsrealamp.FileLoaderStatus.__name__ = ["jsrealamp","FileLoaderStatus"];
jsrealamp.FileLoaderStatus.prototype = {
	callChangedCallback: function() {
		if(this.changeCallback != null) this.changeCallback();
	}
	,__class__: jsrealamp.FileLoaderStatus
};
jsrealamp.FileLoader = function() { };
jsrealamp.FileLoader.__name__ = ["jsrealamp","FileLoader"];
jsrealamp.FileLoader.openFile = function(file,callback) {
	var status = new jsrealamp.FileLoaderStatus();
	var fileReader = new FileReader();
	fileReader.onloadend = function(event) {
		status.data = fileReader.result;
		status.ok = true;
		status.callChangedCallback();
		callback(status);
	};
	fileReader.onerror = fileReader.onabort = function(event1) {
		status.ok = false;
		status.callChangedCallback();
		callback(status);
	};
	fileReader.onprogress = function(event2) {
		status.progress = event2.loaded / event2.total;
		status.callChangedCallback();
	};
	fileReader.readAsArrayBuffer(file);
	return status;
};
jsrealamp.FileLoader.openUrl = function(url,responseType,callback) {
	var status = new jsrealamp.FileLoaderStatus();
	var httpClient = new XMLHttpRequest();
	httpClient.open("GET",url,true);
	httpClient.responseType = responseType;
	httpClient.onreadystatechange = function(event) {
		if(httpClient.readyState != 4) return;
		if(httpClient.status == 200) {
			status.data = httpClient.response;
			status.ok = true;
		} else status.ok = false;
		status.callChangedCallback();
		callback(status);
	};
	httpClient.onprogress = function(event1) {
		status.progress = event1.loaded / event1.total;
		status.callChangedCallback();
	};
	httpClient.send();
	return status;
};
jsrealamp.Main = function(elementId) {
	this.player = new jsrealamp.Player(elementId);
};
jsrealamp.Main.__name__ = ["jsrealamp","Main"];
jsrealamp.Main.main = function() {
	Reflect.setField(window,"JSRealAmp",jsrealamp.Main);
	window.document.getElementById("loading_message").style.display = "none";
};
jsrealamp.Main.prototype = {
	__class__: jsrealamp.Main
};
jsrealamp.engines = {};
jsrealamp.engines.Engine = function() { };
jsrealamp.engines.Engine.__name__ = ["jsrealamp","engines","Engine"];
jsrealamp.engines.Engine.prototype = {
	__class__: jsrealamp.engines.Engine
};
jsrealamp.engines.GME = function(defaultLength) {
	if(defaultLength == null) defaultLength = 180000;
	this.defaultLength = defaultLength;
};
jsrealamp.engines.GME.__name__ = ["jsrealamp","engines","GME"];
jsrealamp.engines.GME.__interfaces__ = [jsrealamp.engines.Engine];
jsrealamp.engines.GME.prototype = {
	isSupported: function(extension,data) {
		return jsrealamp.engines.GME.wrapIsSupported(extension) != 0;
	}
	,open: function(data,numBufferSamples) {
		this.gmeWrapper = jsrealamp.engines.GME.wrapOpen(data,data.byteLength);
		if(this.gmeWrapper == 0) throw new jsrealamp.engines.EngineError("Out of memory.");
		this.checkError();
		this.numBufferSamples = numBufferSamples;
		this.emscriptenBufferPointer = Module._malloc(numBufferSamples * 2);
	}
	,close: function() {
		jsrealamp.engines.GME.wrapClose(this.gmeWrapper);
		Module._free(this.emscriptenBufferPointer);
	}
	,trackCount: function() {
		return jsrealamp.engines.GME.wrapGetTrackCount(this.gmeWrapper);
	}
	,setTrack: function(index) {
		jsrealamp.engines.GME.wrapSetTrackIndex(this.gmeWrapper,index);
		this.checkError();
	}
	,render: function(buffers) {
		var numFrames = this.numBufferSamples * 2;
		jsrealamp.engines.GME.wrapRender(this.gmeWrapper,this.emscriptenBufferPointer,numFrames);
		var renderBuffer = new Int16Array(Module.HEAPU8.buffer,this.emscriptenBufferPointer,numFrames);
		var leftBuffer = buffers[0];
		var rightBuffer = buffers[1];
		var _g1 = 0;
		var _g = this.numBufferSamples;
		while(_g1 < _g) {
			var index = _g1++;
			leftBuffer[index] = renderBuffer[index * 2] / 32768;
			rightBuffer[index] = renderBuffer[index * 2 + 1] / 32768;
		}
	}
	,tracks: function() {
		var tracks = new Array();
		var _g1 = 0;
		var _g = this.trackCount();
		while(_g1 < _g) {
			var index = _g1++;
			var meta = new jsrealamp.engines.TrackMetadata();
			meta.index = index;
			meta.title = jsrealamp.engines.GME.wrapGetTrackTitle(this.gmeWrapper,index);
			meta.author = jsrealamp.engines.GME.wrapGetTrackAuthor(this.gmeWrapper,index);
			meta.album = jsrealamp.engines.GME.wrapGetTrackAlbum(this.gmeWrapper,index);
			meta.length = jsrealamp.engines.GME.wrapGetTrackLength(this.gmeWrapper,index);
			if(meta.length == 0) meta.length = this.defaultLength;
			tracks.push(meta);
		}
		return tracks;
	}
	,checkError: function() {
		var error = jsrealamp.engines.GME.wrapGetError(this.gmeWrapper);
		if(error != null && error.length > 0) throw new jsrealamp.engines.EngineError(error);
	}
	,__class__: jsrealamp.engines.GME
};
jsrealamp.engines.OpenMPT = function() {
};
jsrealamp.engines.OpenMPT.__name__ = ["jsrealamp","engines","OpenMPT"];
jsrealamp.engines.OpenMPT.__interfaces__ = [jsrealamp.engines.Engine];
jsrealamp.engines.OpenMPT.prototype = {
	isSupported: function(extension,data) {
		var result = jsrealamp.engines.OpenMPT.wrapIsSupported(extension);
		if(result == "error") throw new jsrealamp.engines.EngineError("Error identifying the file.");
		return result == "yes";
	}
	,open: function(data,numBufferSamples) {
		this.openMptWrapper = jsrealamp.engines.OpenMPT.wrapOpen(data,data.byteLength);
		if(this.openMptWrapper == 0) throw new jsrealamp.engines.EngineError("Out of memory.");
		this.checkError();
		this.numBufferSamples = numBufferSamples;
		this.emscriptenLeftBufferPointer = Module._malloc(numBufferSamples * 2);
		this.emscriptenRightBufferPointer = Module._malloc(numBufferSamples * 2);
	}
	,close: function() {
		jsrealamp.engines.OpenMPT.wrapClose(this.openMptWrapper);
		Module._free(this.emscriptenLeftBufferPointer);
		Module._free(this.emscriptenRightBufferPointer);
	}
	,trackCount: function() {
		return 1;
	}
	,setTrack: function(index) {
		if(index != 0) throw new jsrealamp.engines.EngineError("Track selection not supported.");
	}
	,render: function(buffers) {
		var framesRendered = jsrealamp.engines.OpenMPT.wrapRender(this.openMptWrapper,this.emscriptenLeftBufferPointer,this.emscriptenRightBufferPointer,this.numBufferSamples);
		var leftRenderBuffer = new Int16Array(Module.HEAPU8.buffer,this.emscriptenLeftBufferPointer,this.numBufferSamples);
		var rightRenderBuffer = new Int16Array(Module.HEAPU8.buffer,this.emscriptenRightBufferPointer,this.numBufferSamples);
		var leftBuffer = buffers[0];
		var rightBuffer = buffers[1];
		var _g1 = 0;
		var _g = this.numBufferSamples;
		while(_g1 < _g) {
			var index = _g1++;
			leftBuffer[index] = leftRenderBuffer[index] / 32768;
			rightBuffer[index] = rightRenderBuffer[index] / 32768;
		}
	}
	,tracks: function() {
		var track = new jsrealamp.engines.TrackMetadata();
		track.index = 0;
		track.title = jsrealamp.engines.OpenMPT.wrapGetTrackTitle(this.openMptWrapper);
		track.author = jsrealamp.engines.OpenMPT.wrapGetTrackAuthor(this.openMptWrapper);
		track.length = jsrealamp.engines.OpenMPT.wrapGetTrackLength(this.openMptWrapper);
		return [track];
	}
	,checkError: function() {
		var error = jsrealamp.engines.OpenMPT.wrapGetError(this.openMptWrapper);
		if(error != null && error.length > 0) throw new jsrealamp.engines.EngineError(error);
	}
	,__class__: jsrealamp.engines.OpenMPT
};
jsrealamp.Player = function(elementId) {
	var container = window.document.getElementById(elementId);
	this.window = new jsrealamp.ui.PlayerWindow(container);
	this.window.filesSelectedCallback = $bind(this,this.filesSelectedCallback);
	this.window.controlButtonCallback = $bind(this,this.controlButtonCallback);
	this.populateExamplesManifest();
};
jsrealamp.Player.__name__ = ["jsrealamp","Player"];
jsrealamp.Player.prototype = {
	populateExamplesManifest: function() {
		var _g = this;
		jsrealamp.FileLoader.openUrl("examples.json","json",function(status) {
			if(status.ok) _g.window.populateExampleFiles(status.data);
		});
	}
	,filesSelectedCallback: function(fileSelection) {
		var _g = this;
		if(fileSelection == null) {
			this.window.showMessageDialog("Please select a file.");
			return;
		}
		if(fileSelection.source == "file_input") {
			var file = fileSelection.file;
			jsrealamp.FileLoader.openFile(file,function(status) {
				if(status.ok) _g.setUpAudio(file.name,status.data); else _g.window.showMessageDialog("Unable to open the file.");
			});
		} else if(fileSelection.source == "url") jsrealamp.FileLoader.openUrl(fileSelection.file,"arraybuffer",function(status1) {
			if(status1.ok) _g.setUpAudio(fileSelection.file,status1.data); else _g.window.showMessageDialog("Unable to open the file.");
		});
	}
	,controlButtonCallback: function(elementId) {
		switch(elementId) {
		case "play_button":
			this.play();
			break;
		case "pause_button":
			this.pause();
			break;
		case "next_button":
			this.nextTrack();
			break;
		case "previous_button":
			this.previousTrack();
			break;
		}
	}
	,play: function() {
		this.audio.start();
		this.window.visualizer.set_analyserNode(this.audio.newAnalyser());
		this.window.setControlButtonDisabled("play_button",true);
		this.window.setControlButtonDisabled("pause_button",false);
	}
	,pause: function() {
		this.audio.stop();
		this.window.setControlButtonDisabled("play_button",false);
		this.window.setControlButtonDisabled("pause_button",true);
	}
	,nextTrack: function() {
		if(this.currentTrackIndex == this.tracks.length - 1) this.currentTrackIndex = 0; else this.currentTrackIndex += 1;
		this.playTrack(this.currentTrackIndex);
	}
	,previousTrack: function() {
		if(this.currentTrackIndex == 0) this.currentTrackIndex = this.tracks.length - 1; else this.currentTrackIndex -= 1;
		this.playTrack(this.currentTrackIndex);
	}
	,playTrack: function(index) {
		this.currentTrackIndex = index;
		this.engine.setTrack(this.currentTrackIndex);
		this.audio.resetCounters();
	}
	,setUpAudio: function(filename,fileData) {
		if(this.audio != null) this.audio.close();
		if(this.engine != null) this.engine.close();
		try {
			this.engine = this.getEngine(filename,fileData);
			this.audio = new jsrealamp.Audio(this.engine,fileData);
		} catch( $e0 ) {
			if( js.Boot.__instanceof($e0,jsrealamp.engines.EngineError) ) {
				var error = $e0;
				this.window.showMessageDialog("Unable to start music engine.",error.message);
				return;
			} else if( js.Boot.__instanceof($e0,jsrealamp.NoAudioContextError) ) {
				var error1 = $e0;
				this.window.showMessageDialog("Your browser does not support Web Audio.");
				return;
			} else throw($e0);
		}
		this.populatePlayer();
		this.play();
	}
	,getEngine: function(filename,fileData) {
		var extension = ((function($this) {
			var $r;
			var pos = filename.lastIndexOf(".");
			$r = HxOverrides.substr(filename,pos,6);
			return $r;
		}(this))).toLowerCase();
		console.log(extension);
		var _g = 0;
		var _g1 = jsrealamp.Player.ENGINES;
		while(_g < _g1.length) {
			var engineClass = _g1[_g];
			++_g;
			console.log("checking " + Type.getClassName(engineClass));
			var engine = Type.createInstance(engineClass,[]);
			if(engine.isSupported(extension,new Uint8Array(fileData))) return engine;
		}
		throw new jsrealamp.engines.EngineError("File is not supported.");
	}
	,populatePlayer: function() {
		var _g = this;
		this.engine.setTrack(0);
		this.currentTrackIndex = 0;
		this.tracks = this.engine.tracks();
		this.window.populateTracks(this.tracks);
		this.audio.updateCallback = function() {
			var duration = _g.audio.samplesPlayed / 44100 * 1000 | 0;
			var track = _g.tracks[_g.currentTrackIndex];
			_g.window.populateCurrentTrack(duration,track);
			if(duration >= track.length) {
				if(_g.currentTrackIndex == _g.tracks.length - 1) _g.playTrack(0); else _g.nextTrack();
			}
			window.requestAnimationFrame(function(timestamp) {
				_g.window.draw();
				return true;
			});
		};
		this.window.setControlButtonDisabled("previous_button",false);
		this.window.setControlButtonDisabled("next_button",false);
		this.window.volumeChangeCallback = function(newValue) {
			_g.audio.set_volume(newValue / 100);
		};
	}
	,__class__: jsrealamp.Player
};
jsrealamp.engines.EngineError = function(message) {
	this.message = message;
};
jsrealamp.engines.EngineError.__name__ = ["jsrealamp","engines","EngineError"];
jsrealamp.engines.EngineError.prototype = {
	__class__: jsrealamp.engines.EngineError
};
jsrealamp.engines.TrackMetadata = function() {
};
jsrealamp.engines.TrackMetadata.__name__ = ["jsrealamp","engines","TrackMetadata"];
jsrealamp.engines.TrackMetadata.prototype = {
	__class__: jsrealamp.engines.TrackMetadata
};
jsrealamp.ui = {};
jsrealamp.ui.Widget = function(container) {
	this.container = container;
};
jsrealamp.ui.Widget.__name__ = ["jsrealamp","ui","Widget"];
jsrealamp.ui.Widget.prototype = {
	getHtmlElement: function(name) {
		return this.container.querySelector("[data-id='" + name + "']");
	}
	,__class__: jsrealamp.ui.Widget
};
jsrealamp.ui.DialogWindow = function(parentWindow,container) {
	jsrealamp.ui.Widget.call(this,container);
	this.parent = parentWindow;
	this.setUpButtonBarEvents();
};
jsrealamp.ui.DialogWindow.__name__ = ["jsrealamp","ui","DialogWindow"];
jsrealamp.ui.DialogWindow.__super__ = jsrealamp.ui.Widget;
jsrealamp.ui.DialogWindow.prototype = $extend(jsrealamp.ui.Widget.prototype,{
	setUpButtonBarEvents: function() {
		var _g1 = this;
		var buttonBar = this.getHtmlElement("button_bar");
		var buttons = buttonBar.querySelectorAll("button");
		var _g = 0;
		while(_g < buttons.length) {
			var item = buttons[_g];
			++_g;
			var button = item;
			var buttonValue = [button.getAttribute("data-value")];
			button.onclick = (function(buttonValue) {
				return function(event) {
					_g1.actionCallback(_g1,buttonValue[0]);
				};
			})(buttonValue);
		}
	}
	,show: function() {
		this.container.style.display = "block";
	}
	,hide: function() {
		this.container.style.display = "none";
	}
	,__class__: jsrealamp.ui.DialogWindow
});
jsrealamp.ui.Draggable = function(container) {
	this.dragY = true;
	this.dragX = true;
	jsrealamp.ui.Widget.call(this,container);
	this.target = container;
	container.onmousedown = $bind(this,this.mouseDownListener);
	container.ontouchstart = $bind(this,this.touchStartLisenter);
};
jsrealamp.ui.Draggable.__name__ = ["jsrealamp","ui","Draggable"];
jsrealamp.ui.Draggable.__super__ = jsrealamp.ui.Widget;
jsrealamp.ui.Draggable.prototype = $extend(jsrealamp.ui.Widget.prototype,{
	mouseDownListener: function(event) {
		this.originClickX = event.pageX - this.target.offsetLeft;
		this.originClickY = event.pageY - this.target.offsetTop;
		window.document.addEventListener("mouseup",$bind(this,this.mouseUpListener));
		window.document.addEventListener("mousemove",$bind(this,this.moveListener));
	}
	,mouseUpListener: function(event) {
		window.document.removeEventListener("mouseup",$bind(this,this.mouseUpListener));
		window.document.removeEventListener("mousemove",$bind(this,this.moveListener));
	}
	,moveListener: function(event) {
		var x = event.pageX - this.originClickX;
		var y = event.pageY - this.originClickY;
		this.applyPosition(x,y);
	}
	,touchStartLisenter: function(event) {
		console.log("touch start " + Std.string(event));
		var touch = event.targetTouches[0];
		this.originTouchId = touch.identifier;
		this.originClickX = touch.pageX;
		this.originClickY = touch.pageY;
		window.document.addEventListener("touchend",$bind(this,this.touchEndListener));
		window.document.addEventListener("touchcancel",$bind(this,this.touchEndListener));
		window.document.addEventListener("touchmove",$bind(this,this.touchMoveListener));
		event.preventDefault();
	}
	,touchEndListener: function(event) {
		console.log("touch end " + Std.string(event));
		window.document.removeEventListener("touchend",$bind(this,this.touchEndListener));
		window.document.removeEventListener("touchcancel",$bind(this,this.touchEndListener));
		window.document.removeEventListener("touchmove",$bind(this,this.touchMoveListener));
		this.originTouchId = null;
	}
	,touchMoveListener: function(event) {
		console.log("touch move " + Std.string(event));
		var _g = 0;
		var _g1 = event.changedTouches;
		while(_g < _g1.length) {
			var item = _g1[_g];
			++_g;
			var touch = item;
			if(touch.identifier == this.originTouchId) {
				var x = touch.pageX - this.originClickX;
				var y = touch.pageY - this.originClickY;
				event.preventDefault();
				this.applyPosition(x,y);
			}
		}
	}
	,applyPosition: function(x,y) {
		if(this.minX != null) x = Math.max(this.minX,x);
		if(this.minY != null) y = Math.max(this.minY,y);
		if(this.maxX != null) x = Math.min(this.maxX,x);
		if(this.maxY != null) y = Math.min(this.maxY,y);
		if(this.dragX) this.target.style.left = "" + x + "px";
		if(this.dragY) this.target.style.top = "" + y + "px";
		if(this.changeCallback != null) this.changeCallback(x,y);
	}
	,__class__: jsrealamp.ui.Draggable
});
jsrealamp.ui.Format = function() { };
jsrealamp.ui.Format.__name__ = ["jsrealamp","ui","Format"];
jsrealamp.ui.Format.toTimeCode = function(milliseconds) {
	var seconds = milliseconds / 1000 | 0;
	var minutes = seconds / 60 | 0;
	seconds %= 60;
	var secondsString = StringTools.lpad(seconds == null?"null":"" + seconds,"0",2);
	return "" + minutes + ":" + secondsString;
};
jsrealamp.ui.MessageDialog = function(parentWindow,container,message,secondaryMessage) {
	jsrealamp.ui.DialogWindow.call(this,parentWindow,container);
	this.getHtmlElement("message").textContent = message;
	if(secondaryMessage != null) this.getHtmlElement("secondary-message").textContent = secondaryMessage;
};
jsrealamp.ui.MessageDialog.__name__ = ["jsrealamp","ui","MessageDialog"];
jsrealamp.ui.MessageDialog.__super__ = jsrealamp.ui.DialogWindow;
jsrealamp.ui.MessageDialog.prototype = $extend(jsrealamp.ui.DialogWindow.prototype,{
	__class__: jsrealamp.ui.MessageDialog
});
jsrealamp.ui.OpenFileDialog = function(parentWindow,container) {
	jsrealamp.ui.DialogWindow.call(this,parentWindow,container);
	this.fileInput = this.getHtmlElement("file_input");
	this.urlInput = this.getHtmlElement("url_input");
	this.exampleSelect = this.getHtmlElement("example_select");
};
jsrealamp.ui.OpenFileDialog.__name__ = ["jsrealamp","ui","OpenFileDialog"];
jsrealamp.ui.OpenFileDialog.__super__ = jsrealamp.ui.DialogWindow;
jsrealamp.ui.OpenFileDialog.prototype = $extend(jsrealamp.ui.DialogWindow.prototype,{
	getSelection: function() {
		if(this.fileInput.files.length != 0) return { source : "file_input", file : this.fileInput.files[0]}; else if(this.urlInput.value.length > 0) return { source : "url", file : this.urlInput.value}; else if(this.exampleSelect.selectedIndex > 0) {
			var optionElement = this.exampleSelect.options[this.exampleSelect.selectedIndex];
			return { source : "url", file : optionElement.value};
		} else return null;
	}
	,populateExampleFiles: function(filenames) {
		var _g = 0;
		while(_g < filenames.length) {
			var filename = filenames[_g];
			++_g;
			var opt;
			var _this = window.document;
			opt = _this.createElement("option");
			opt.value = filename;
			opt.textContent = filename;
			this.exampleSelect.appendChild(opt);
		}
	}
	,__class__: jsrealamp.ui.OpenFileDialog
});
jsrealamp.ui.Window = function(container) {
	jsrealamp.ui.Widget.call(this,container);
	this.content = this.getHtmlElement("content");
	this.titlebarDraggable = new jsrealamp.ui.Draggable(this.getHtmlElement("titlebar"));
	this.titlebarDraggable.target = container;
	this.titlebarDraggable.minX = 0;
	this.titlebarDraggable.minY = 0;
};
jsrealamp.ui.Window.__name__ = ["jsrealamp","ui","Window"];
jsrealamp.ui.Window.__super__ = jsrealamp.ui.Widget;
jsrealamp.ui.Window.prototype = $extend(jsrealamp.ui.Widget.prototype,{
	showDialog: function(dialogWindow) {
		this.currentDialogWindow = dialogWindow;
		this.currentDialogWindow.show();
		this.disableContents();
	}
	,hideDialog: function() {
		this.currentDialogWindow.hide();
		this.enableContents();
	}
	,disableContents: function() {
		this.content.style.opacity = "0.5";
	}
	,enableContents: function() {
		this.content.style.opacity = "1";
	}
	,showMessageDialog: function(message,secondaryMessage) {
		var _g = this;
		var dialog = new jsrealamp.ui.MessageDialog(this,this.getHtmlElement("message_dialog"),message,secondaryMessage);
		this.showDialog(dialog);
		dialog.actionCallback = function(dialog1,buttonValue) {
			_g.hideDialog();
		};
	}
	,__class__: jsrealamp.ui.Window
});
jsrealamp.ui.PlayerWindow = function(container) {
	jsrealamp.ui.Window.call(this,container);
	this.initOpenDialog();
	this.initControls();
	this.initVolumeSlider();
	this.initAboutDialog();
	this.visualizer = new jsrealamp.ui.Visualizer(this.getHtmlElement("visualizer"));
	this.seekBar = new jsrealamp.ui.Slider(this.getHtmlElement("seek_bar"));
};
jsrealamp.ui.PlayerWindow.__name__ = ["jsrealamp","ui","PlayerWindow"];
jsrealamp.ui.PlayerWindow.__super__ = jsrealamp.ui.Window;
jsrealamp.ui.PlayerWindow.prototype = $extend(jsrealamp.ui.Window.prototype,{
	initOpenDialog: function() {
		var _g = this;
		this.openDialog = new jsrealamp.ui.OpenFileDialog(this,this.getHtmlElement("open_dialog"));
		this.openDialog.actionCallback = $bind(this,this.openDialogCallback);
		var openButton = this.getHtmlElement("open_button");
		openButton.onclick = function(event) {
			_g.showDialog(_g.openDialog);
		};
	}
	,openDialogCallback: function(dialog,buttonValue) {
		this.hideDialog();
		if(buttonValue == "open") this.filesSelectedCallback(this.openDialog.getSelection());
	}
	,initControls: function() {
		var _g2 = this;
		var _g = 0;
		var _g1 = ["previous_button","next_button","play_button","pause_button"];
		while(_g < _g1.length) {
			var elementId = [_g1[_g]];
			++_g;
			var element = this.getHtmlElement(elementId[0]);
			element.onclick = (function(elementId) {
				return function(event) {
					_g2.controlButtonCallback(elementId[0]);
				};
			})(elementId);
		}
	}
	,initVolumeSlider: function() {
		var _g = this;
		this.volumeSlider = new jsrealamp.ui.Slider(this.getHtmlElement("volume_slider"));
		this.volumeSlider.max = 100;
		this.volumeSlider.value = 100;
		this.volumeSlider.draw();
		this.volumeSlider.changeCallback = function(newValue) {
			if(_g.volumeChangeCallback != null) _g.volumeChangeCallback(newValue);
		};
	}
	,initAboutDialog: function() {
		var _g = this;
		this.aboutDialog = new jsrealamp.ui.DialogWindow(this,this.getHtmlElement("about_dialog"));
		this.aboutDialog.actionCallback = function(dialog,buttonValue) {
			_g.hideDialog();
		};
		var aboutButton = this.getHtmlElement("about_button");
		aboutButton.onclick = function(event) {
			_g.showDialog(_g.aboutDialog);
		};
	}
	,populateTracks: function(tracks) {
		var count = tracks.length;
		this.getHtmlElement("track_count").textContent = "" + count;
		var table = this.getHtmlElement("playlist_table");
		var tableBody = this.getHtmlElement("playlist_table_body");
		while(tableBody.childNodes.length > 0) tableBody.removeChild(tableBody.childNodes.item(0));
		var _g = 0;
		while(_g < count) {
			var index = _g++;
			var track = tracks[index];
			var row = tableBody.insertRow(-1);
			var trackCell = row.insertCell(-1);
			var titleCell = row.insertCell(-1);
			var lengthCell = row.insertCell(-1);
			trackCell.textContent = "" + (index + 1);
			trackCell.classList.add("numeric");
			titleCell.textContent = track.title;
			lengthCell.textContent = jsrealamp.ui.Format.toTimeCode(track.length | 0);
			lengthCell.classList.add("numeric");
			row.appendChild(trackCell);
			row.appendChild(titleCell);
			row.appendChild(lengthCell);
			tableBody.appendChild(row);
		}
	}
	,populateCurrentTrack: function(duration,track) {
		this.getHtmlElement("track_index").textContent = "" + (track.index + 1);
		this.getHtmlElement("track_title").textContent = track.title;
		this.getHtmlElement("track_author").textContent = track.author;
		this.getHtmlElement("track_album").textContent = track.album;
		this.getHtmlElement("track_length").textContent = jsrealamp.ui.Format.toTimeCode(track.length | 0);
		this.getHtmlElement("duration").textContent = jsrealamp.ui.Format.toTimeCode(duration | 0);
		this.seekBar.max = track.length;
		this.seekBar.value = duration;
	}
	,setControlButtonDisabled: function(elementId,disabled) {
		var element = this.getHtmlElement(elementId);
		if(disabled) element.setAttribute("disabled","disabled"); else element.removeAttribute("disabled");
	}
	,draw: function() {
		this.seekBar.draw();
		this.visualizer.draw();
	}
	,populateExampleFiles: function(filenames) {
		this.openDialog.populateExampleFiles(filenames);
	}
	,__class__: jsrealamp.ui.PlayerWindow
});
jsrealamp.ui.Slider = function(container) {
	this.value = 0;
	this.max = 1;
	this.min = 0;
	var _g = this;
	jsrealamp.ui.Widget.call(this,container);
	this.thumb = this.getHtmlElement("slider_thumb");
	this.thumbDraggable = new jsrealamp.ui.Draggable(this.thumb);
	this.thumbDraggable.dragY = false;
	this.thumbDraggable.minX = 0;
	this.thumb.addEventListener("mousedown",function(event) {
		_g.thumbDraggable.maxX = container.clientWidth - 16;
	});
	this.thumb.onkeydown = $bind(this,this.keyPressListener);
	this.thumbDraggable.changeCallback = function(x,y) {
		if(_g.changeCallback != null) _g.changeCallback(x / container.clientWidth * (_g.max - _g.min) + _g.min | 0);
	};
};
jsrealamp.ui.Slider.__name__ = ["jsrealamp","ui","Slider"];
jsrealamp.ui.Slider.__super__ = jsrealamp.ui.Widget;
jsrealamp.ui.Slider.prototype = $extend(jsrealamp.ui.Widget.prototype,{
	draw: function() {
		var clientWidth = this.container.clientWidth - 16;
		var leftPx = this.value / (this.max - this.min) * clientWidth;
		this.thumb.style.left = "" + leftPx + "px";
		this.container.setAttribute("aria-valuemax",Std.string(this.max));
		this.container.setAttribute("aria-valuemin",Std.string(this.min));
		this.container.setAttribute("aria-valuenow",Std.string(this.value));
	}
	,keyPressListener: function(event) {
		var key = event.keyIdentifier;
		if(key == null) key = Reflect.field(event,"key");
		var increment = (this.max - this.min) / 10 | 0;
		if(key == "Up" || key == "Right") this.value += increment; else if(key == "Down" || key == "Left") this.value -= increment;
		this.value = Std["int"](Math.max(this.min,this.value));
		this.value = Std["int"](Math.min(this.max,this.value));
		if(this.changeCallback != null) this.changeCallback(this.value);
		this.draw();
	}
	,__class__: jsrealamp.ui.Slider
});
jsrealamp.ui.Visualizer = function(container) {
	jsrealamp.ui.Widget.call(this,container);
	this.canvas = this.getHtmlElement("visualizer_canvas");
	this.canvas.width = 128;
	this.canvas.height = 64;
};
jsrealamp.ui.Visualizer.__name__ = ["jsrealamp","ui","Visualizer"];
jsrealamp.ui.Visualizer.__super__ = jsrealamp.ui.Widget;
jsrealamp.ui.Visualizer.prototype = $extend(jsrealamp.ui.Widget.prototype,{
	set_analyserNode: function(newNode) {
		this.analyserNode = newNode;
		this.analyserNode.smoothingTimeConstant = 0.2;
		this.analyserNode.fftSize = 256;
		this.dataArray = new Uint8Array(newNode.frequencyBinCount);
		return newNode;
	}
	,draw: function() {
		if(this.analyserNode == null) return;
		this.analyserNode.getByteFrequencyData(this.dataArray);
		var context = this.canvas.getContext("2d");
		var barWidth = this.canvas.width / this.dataArray.length;
		var imageData = context.getImageData(0,0,128,64);
		context.putImageData(imageData,0,-1);
		var _g1 = 0;
		var _g = this.dataArray.length;
		while(_g1 < _g) {
			var index = _g1++;
			var freqValue = this.dataArray[index] / 255;
			var hue = 180 - freqValue * 180;
			var value = 100 * Math.log(freqValue * 100 + 1) / Math.log(100);
			var rgb = new hxColorToolkit.spaces.HSB(hue,100,value).toRGB();
			var red = Std["int"](rgb.get_red());
			var green = Std["int"](rgb.get_green());
			var blue = Std["int"](rgb.get_blue());
			context.fillStyle = "rgb(" + red + ", " + green + ", " + blue + ")";
			context.fillRect(index * barWidth,63,barWidth,1);
		}
	}
	,__class__: jsrealamp.ui.Visualizer
});
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
Math.NaN = Number.NaN;
Math.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
Math.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
Math.isFinite = function(i) {
	return isFinite(i);
};
Math.isNaN = function(i1) {
	return isNaN(i1);
};
String.prototype.__class__ = String;
String.__name__ = ["String"];
Array.__name__ = ["Array"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
jsrealamp.Audio.NUM_BUFFER_SAMPLES = 4096;
jsrealamp.engines.GME.wrapIsSupported = Module.cwrap("GMEWrapper_is_supported","number",["string"]);
jsrealamp.engines.GME.wrapOpen = Module.cwrap("GMEWrapper_open","number",["array","number"]);
jsrealamp.engines.GME.wrapClose = Module.cwrap("GMEWrapper_close",null,["number"]);
jsrealamp.engines.GME.wrapGetError = Module.cwrap("GMEWrapper_get_error","string",["number"]);
jsrealamp.engines.GME.wrapGetTrackCount = Module.cwrap("GMEWrapper_get_track_count","number",["number"]);
jsrealamp.engines.GME.wrapSetTrackIndex = Module.cwrap("GMEWrapper_set_track_index",null,["number","number"]);
jsrealamp.engines.GME.wrapRender = Module.cwrap("GMEWrapper_render",null,["number","number","number"]);
jsrealamp.engines.GME.wrapGetTrackTitle = Module.cwrap("GMEWrapper_get_track_title","string",["number","number"]);
jsrealamp.engines.GME.wrapGetTrackAuthor = Module.cwrap("GMEWrapper_get_track_author","string",["number","number"]);
jsrealamp.engines.GME.wrapGetTrackAlbum = Module.cwrap("GMEWrapper_get_track_album","string",["number","number"]);
jsrealamp.engines.GME.wrapGetTrackLength = Module.cwrap("GMEWrapper_get_track_length","int",["number","number"]);
jsrealamp.engines.GME.BYTES_PER_SAMPLE = 2;
jsrealamp.engines.GME.CHANNELS = 2;
jsrealamp.engines.OpenMPT.wrapIsSupported = Module.cwrap("OpenMPTWrapper_is_supported","string",["string"]);
jsrealamp.engines.OpenMPT.wrapOpen = Module.cwrap("OpenMPTWrapper_open","number",["array","number"]);
jsrealamp.engines.OpenMPT.wrapClose = Module.cwrap("OpenMPTWrapper_close",null,["number"]);
jsrealamp.engines.OpenMPT.wrapGetError = Module.cwrap("OpenMPTWrapper_get_error","string",["number"]);
jsrealamp.engines.OpenMPT.wrapRender = Module.cwrap("OpenMPTWrapper_render","number",["number","number","number","number"]);
jsrealamp.engines.OpenMPT.wrapGetTrackTitle = Module.cwrap("OpenMPTWrapper_get_track_title","string",["number"]);
jsrealamp.engines.OpenMPT.wrapGetTrackAuthor = Module.cwrap("OpenMPTWrapper_get_track_author","string",["number"]);
jsrealamp.engines.OpenMPT.wrapGetTrackLength = Module.cwrap("OpenMPTWrapper_get_track_length","number",["number"]);
jsrealamp.engines.OpenMPT.BYTES_PER_SAMPLE = 2;
jsrealamp.Player.ENGINES = [jsrealamp.engines.GME,jsrealamp.engines.OpenMPT];
jsrealamp.Main.main();
})();
