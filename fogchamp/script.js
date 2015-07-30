(function (console) { "use strict";
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,matched: function(n) {
		if(this.r.m != null && n >= 0 && n < this.r.m.length) return this.r.m[n]; else throw new js__$Boot_HaxeError("EReg::matched");
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.setField = function(o,field,value) {
	o[field] = value;
};
Reflect.compare = function(a,b) {
	if(a == b) return 0; else if(a > b) return 1; else return -1;
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && (HxOverrides.cca(x,1) == 120 || HxOverrides.cca(x,1) == 88)) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_ds_StringMap = function() { };
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
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
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
var visualizer_Dataset = function() {
};
visualizer_Dataset.__name__ = true;
visualizer_Dataset.prototype = {
	load: function(callback) {
	}
	,makeRequest: function(url,callback) {
		this.callback = callback;
		jQuery.getJSON(url).done($bind(this,this.loadDone)).fail($bind(this,this.loadFailed));
	}
	,loadDone: function(data) {
		this.callback(true);
	}
	,loadFailed: function() {
		this.callback(false);
	}
	,__class__: visualizer_Dataset
};
var visualizer_DescriptionsDataset = function() {
	visualizer_Dataset.call(this);
};
visualizer_DescriptionsDataset.__name__ = true;
visualizer_DescriptionsDataset.__super__ = visualizer_Dataset;
visualizer_DescriptionsDataset.prototype = $extend(visualizer_Dataset.prototype,{
	load: function(callback) {
		this.makeRequest("descriptions.json",callback);
	}
	,loadDone: function(data) {
		this.abilities = data.abilities;
		this.types_efficacy = data.types_efficacy;
		visualizer_Dataset.prototype.loadDone.call(this,data);
	}
	,getAbilityName: function(slug) {
		return Reflect.field(this.abilities,slug).name;
	}
	,getTypeEfficacy: function(user,foe,foeSecondary) {
		var efficacy = Reflect.field(Reflect.field(this.types_efficacy,user),foe);
		if(foeSecondary == null) return efficacy;
		var secondaryEfficacy = Reflect.field(Reflect.field(this.types_efficacy,user),foeSecondary);
		var pair_0 = efficacy;
		var pair_1 = secondaryEfficacy;
		switch(2) {
		case 2:
			switch(pair_0) {
			case 0:
				return 0;
			case 200:
				switch(pair_1) {
				case 0:
					return 0;
				case 200:
					return 400;
				case 50:
					return 100;
				default:
					return 100;
				}
				break;
			case 50:
				switch(pair_1) {
				case 0:
					return 0;
				case 50:
					return 25;
				case 200:
					return 100;
				default:
					return 100;
				}
				break;
			default:
				switch(pair_1) {
				case 0:
					return 0;
				default:
					return 100;
				}
			}
			break;
		default:
			return 100;
		}
	}
	,__class__: visualizer_DescriptionsDataset
});
var visualizer_Main = function() {
	this.userMessage = new visualizer_UserMessage();
	this.pokemonDataset = new visualizer_PokemonDataset();
	this.movesDataset = new visualizer_MovesDataset();
	this.descriptionsDataset = new visualizer_DescriptionsDataset();
};
visualizer_Main.__name__ = true;
visualizer_Main.main = function() {
	var app = new visualizer_Main();
	js.JQuery(window.document.body).ready(function(event) {
		app.run();
	});
};
visualizer_Main.prototype = {
	run: function() {
		this.loadPokemonDataset();
	}
	,loadPokemonDataset: function() {
		var _g = this;
		this.userMessage.showMessage("Loading Pokemon dataset.");
		this.pokemonDataset.load(function(success) {
			if(success) {
				_g.userMessage.hide();
				_g.loadMovesDataset();
			} else _g.userMessage.showMessage(visualizer_Main.LOAD_FAIL_MSG);
		});
	}
	,loadMovesDataset: function() {
		var _g = this;
		this.userMessage.showMessage("Loading Moves dataset.");
		this.movesDataset.load(function(success) {
			if(success) {
				_g.userMessage.hide();
				_g.loadDescriptionsDataset();
			} else _g.userMessage.showMessage(visualizer_Main.LOAD_FAIL_MSG);
		});
	}
	,loadDescriptionsDataset: function() {
		var _g = this;
		this.userMessage.showMessage("Loading Descriptions dataset.");
		this.descriptionsDataset.load(function(success) {
			if(success) {
				_g.userMessage.hide();
				_g.loadUI();
			} else _g.userMessage.showMessage(visualizer_Main.LOAD_FAIL_MSG);
		});
	}
	,loadUI: function() {
		this.ui = new visualizer_UI(this.pokemonDataset,this.movesDataset,this.descriptionsDataset);
		this.ui.setup();
	}
	,__class__: visualizer_Main
};
var visualizer_Orientation = { __ename__ : true, __constructs__ : ["Vertical","Horizontal"] };
visualizer_Orientation.Vertical = ["Vertical",0];
visualizer_Orientation.Vertical.__enum__ = visualizer_Orientation;
visualizer_Orientation.Horizontal = ["Horizontal",1];
visualizer_Orientation.Horizontal.__enum__ = visualizer_Orientation;
var visualizer_MatchupChart = function(pokemonDataset,movesDataset,descriptionsDataset) {
	this.pokemonDataset = pokemonDataset;
	this.movesDataset = movesDataset;
	this.descriptionsDataset = descriptionsDataset;
};
visualizer_MatchupChart.__name__ = true;
visualizer_MatchupChart.prototype = {
	setPokemon: function(pokemonStats) {
		this.pokemonStats = pokemonStats;
	}
	,renderTable: function() {
		var _this = window.document;
		this.tableElement = _this.createElement("table");
		this.tableElement.classList.add("matchupChart");
		var maxWidth = visualizer_MatchupChart.POKEMON_LABEL + visualizer_MatchupChart.POKEMON_MOVES_LABEL + visualizer_MatchupChart.NUM_POKEMON_PER_TEAM * visualizer_MatchupChart.NUM_MOVES_PER_POKEMON;
		this.renderTopPokemonLabelRow(js_Boot.__cast(this.tableElement.insertRow(-1) , HTMLTableRowElement));
		this.renderTopPokemonMovesRow(js_Boot.__cast(this.tableElement.insertRow(-1) , HTMLTableRowElement));
		var _g1 = 0;
		var _g = visualizer_MatchupChart.NUM_POKEMON_PER_TEAM * (visualizer_MatchupChart.NUM_MOVES_PER_POKEMON + visualizer_MatchupChart.DIVIDER);
		while(_g1 < _g) {
			var moveRowIndex = _g1++;
			this.renderMoveRow(moveRowIndex,js_Boot.__cast(this.tableElement.insertRow(-1) , HTMLTableRowElement));
		}
		return this.tableElement;
	}
	,renderTopPokemonLabelRow: function(rowElement) {
		var cornerCell;
		cornerCell = js_Boot.__cast(rowElement.insertCell(-1) , HTMLTableCellElement);
		cornerCell.colSpan = cornerCell.rowSpan = visualizer_MatchupChart.POKEMON_LABEL + visualizer_MatchupChart.POKEMON_MOVES_LABEL;
		var _g = 0;
		var _g1 = [3,4,5];
		while(_g < _g1.length) {
			var slotNum = _g1[_g];
			++_g;
			var pokemonStat = this.pokemonStats[slotNum];
			var labelCell;
			labelCell = js_Boot.__cast(rowElement.insertCell(-1) , HTMLTableCellElement);
			labelCell.colSpan = visualizer_MatchupChart.DIVIDER + visualizer_MatchupChart.NUM_MOVES_PER_POKEMON;
			this.processPokemonLabelCell(pokemonStat,labelCell,"top");
		}
	}
	,renderTopPokemonMovesRow: function(rowElement) {
		var _g = 0;
		var _g1 = [3,4,5];
		while(_g < _g1.length) {
			var slotNum = _g1[_g];
			++_g;
			var pokemonStat = this.pokemonStats[slotNum];
			this.renderDividerCell(rowElement);
			var _g3 = 0;
			var _g2 = visualizer_MatchupChart.NUM_MOVES_PER_POKEMON;
			while(_g3 < _g2) {
				var moveIndex = _g3++;
				this.renderMoveLabelCell(pokemonStat,moveIndex,rowElement,"top");
			}
		}
	}
	,renderMoveRow: function(rowIndex,rowElement) {
		var cellLength = visualizer_MatchupChart.DIVIDER + visualizer_MatchupChart.NUM_MOVES_PER_POKEMON;
		var leftSlotNum = rowIndex / cellLength | 0;
		var leftMoveIndex = (rowIndex % cellLength | 0) - 1;
		var leftPokemonStat = this.pokemonStats[leftSlotNum];
		if(rowIndex % cellLength == 0) {
			this.renderLeftPokemonLabel(leftPokemonStat,rowElement);
			this.renderDividerCell(rowElement);
		}
		if(leftMoveIndex >= 0) this.renderMoveLabelCell(leftPokemonStat,leftMoveIndex,rowElement,"left");
		var _g = 3;
		while(_g < 6) {
			var topSlotNum = _g++;
			var topPokemonStat = this.pokemonStats[topSlotNum];
			this.renderVersusMatrix(rowElement,leftMoveIndex,leftPokemonStat,topPokemonStat);
		}
	}
	,renderVersusMatrix: function(rowElement,leftMoveIndex,leftPokemonStat,topPokemonStat) {
		if(leftMoveIndex == -1) {
			this.renderDividerCell(rowElement);
			var topPokemonMoveSlugs = topPokemonStat.moves;
			var _g1 = 0;
			var _g = visualizer_MatchupChart.NUM_MOVES_PER_POKEMON;
			while(_g1 < _g) {
				var topMoveIndex = _g1++;
				var cell;
				cell = js_Boot.__cast(rowElement.insertCell(-1) , HTMLTableCellElement);
				cell.rowSpan = topMoveIndex + 1;
				if(topMoveIndex < topPokemonMoveSlugs.length) {
					var moveStat = this.movesDataset.getMoveStats(topPokemonMoveSlugs[topMoveIndex]);
					this.processCellEfficacy(cell,moveStat,leftPokemonStat);
				}
			}
		} else {
			var cell1;
			cell1 = js_Boot.__cast(rowElement.insertCell(-1) , HTMLTableCellElement);
			cell1.colSpan = leftMoveIndex + 1;
			var leftPokemonMoveSlugs = leftPokemonStat.moves;
			if(leftMoveIndex < leftPokemonMoveSlugs.length) {
				var moveStat1 = this.movesDataset.getMoveStats(leftPokemonMoveSlugs[leftMoveIndex]);
				this.processCellEfficacy(cell1,moveStat1,topPokemonStat);
			}
			this.renderDividerCell(rowElement);
		}
	}
	,renderLeftPokemonLabel: function(pokemonStat,rowElement) {
		var labelCell;
		labelCell = js_Boot.__cast(rowElement.insertCell(-1) , HTMLTableCellElement);
		labelCell.rowSpan = visualizer_MatchupChart.DIVIDER + visualizer_MatchupChart.NUM_MOVES_PER_POKEMON;
		this.processPokemonLabelCell(pokemonStat,labelCell,"left");
	}
	,renderMoveLabelCell: function(pokemonStat,moveIndex,rowElement,position) {
		var labelCell;
		labelCell = js_Boot.__cast(rowElement.insertCell(-1) , HTMLTableCellElement);
		var moveSlugs = pokemonStat.moves;
		if(moveIndex < moveSlugs.length) {
			var moveSlug = moveSlugs[moveIndex];
			var moveStats = this.movesDataset.getMoveStats(moveSlug);
			this.processMoveLabelCell(moveStats,labelCell,position);
		}
	}
	,processPokemonLabelCell: function(pokemonStat,cell,position) {
		var container;
		var _this = window.document;
		container = _this.createElement("div");
		container.classList.add("matchupChartLabel-" + position);
		var span;
		var _this1 = window.document;
		span = _this1.createElement("span");
		span.classList.add("matchupChartLabelRotate-" + position);
		span.textContent = pokemonStat.name;
		container.appendChild(span);
		cell.appendChild(container);
	}
	,processMoveLabelCell: function(moveStats,cell,position) {
		var container;
		var _this = window.document;
		container = _this.createElement("div");
		container.classList.add("matchupChartMoveLabel-" + position);
		var span;
		var _this1 = window.document;
		span = _this1.createElement("span");
		span.classList.add("matchupChartMoveLabelRotate-" + position);
		var typeIcon;
		var _this2 = window.document;
		typeIcon = _this2.createElement("span");
		typeIcon.classList.add("pokemonType-" + Std.string(moveStats.move_type));
		typeIcon.classList.add("miniPokemonTypeIcon");
		typeIcon.textContent = " ";
		span.appendChild(typeIcon);
		var moveLabelText;
		var _this3 = window.document;
		moveLabelText = _this3.createElement("span");
		moveLabelText.textContent = moveStats.name;
		span.appendChild(moveLabelText);
		container.appendChild(span);
		cell.appendChild(container);
	}
	,renderDividerCell: function(rowElement) {
		var dividerCell;
		dividerCell = js_Boot.__cast(rowElement.insertCell(-1) , HTMLTableCellElement);
		dividerCell.classList.add("matchupChartDividerCell");
	}
	,processCellEfficacy: function(cell,userMoveStat,foePokemonStat) {
		if(userMoveStat.power == "--") return;
		var userType = userMoveStat.move_type;
		var foeTypes = foePokemonStat.types;
		var factor = this.descriptionsDataset.getTypeEfficacy(userType,foeTypes[0],foeTypes[1]);
		var factorString;
		switch(factor) {
		case 0:
			factorString = "0";
			break;
		case 25:
			factorString = "¼";
			break;
		case 50:
			factorString = "½";
			break;
		case 100:
			factorString = "1";
			break;
		case 200:
			factorString = "2";
			break;
		case 400:
			factorString = "4";
			break;
		default:
			factorString = "Err";
		}
		cell.innerHTML = "<span class=\"damageEfficacy-" + factor + "\">×" + factorString + "</span>";
	}
	,__class__: visualizer_MatchupChart
};
var visualizer_MovesDataset = function() {
	visualizer_Dataset.call(this);
};
visualizer_MovesDataset.__name__ = true;
visualizer_MovesDataset.__super__ = visualizer_Dataset;
visualizer_MovesDataset.prototype = $extend(visualizer_Dataset.prototype,{
	load: function(callback) {
		this.makeRequest("moves.json",callback);
	}
	,loadDone: function(data) {
		this.moves = data;
		visualizer_Dataset.prototype.loadDone.call(this,data);
	}
	,getMoveStats: function(slug) {
		return Reflect.field(this.moves,slug);
	}
	,__class__: visualizer_MovesDataset
});
var visualizer_PokemonDataset = function() {
	visualizer_Dataset.call(this);
};
visualizer_PokemonDataset.__name__ = true;
visualizer_PokemonDataset.__super__ = visualizer_Dataset;
visualizer_PokemonDataset.prototype = $extend(visualizer_Dataset.prototype,{
	load: function(callback) {
		this.makeRequest("pbr-platinum.json",callback);
	}
	,loadDone: function(data) {
		this.slugs = Reflect.field(data,"pokemon_slugs");
		this.stats = Reflect.field(data,"stats");
		visualizer_Dataset.prototype.loadDone.call(this,data);
	}
	,getPokemonStats: function(slug) {
		return Reflect.field(this.stats,slug);
	}
	,getSlug: function(pokemonNum) {
		var _g = 0;
		var _g1 = this.slugs;
		while(_g < _g1.length) {
			var slug = _g1[_g];
			++_g;
			var stats = this.getPokemonStats(slug);
			if(stats.number == pokemonNum) return slug;
		}
		throw new js__$Boot_HaxeError("Unknown Pokemon number.");
	}
	,__class__: visualizer_PokemonDataset
});
var visualizer_UI = function(pokemonDataset,movesDataset,descriptionsDataset) {
	this.pokemonDataset = pokemonDataset;
	this.movesDataset = movesDataset;
	this.descriptionsDataset = descriptionsDataset;
};
visualizer_UI.__name__ = true;
visualizer_UI.renderTemplate = function(template,data) {
	return visualizer_UI.Mustache.render(template,data);
};
visualizer_UI.prototype = {
	setup: function() {
		this.renderSelectionList();
		this.attachSelectChangeListeners();
		this.attachUrlFragmentChangeListener();
		this.setSelectionByNumbers(visualizer_UI.DEFAULT_POKEMON);
		this.readUrlFragment();
		this.renderAll();
	}
	,renderSelectionList: function() {
		var template = js.JQuery("#pokemonSelectionTemplate").html();
		var rendered = visualizer_UI.renderTemplate(template,{ selections : this.buildSelectionList(), slots : [0,1,2]});
		js.JQuery("#pokemonSelectionBlue").html(rendered);
		var rendered1 = visualizer_UI.renderTemplate(template,{ selections : this.buildSelectionList(), slots : [3,4,5]});
		js.JQuery("#pokemonSelectionRed").html(rendered1);
	}
	,buildSelectionList: function() {
		var list = [];
		var _g = 0;
		var _g1 = this.pokemonDataset.slugs;
		while(_g < _g1.length) {
			var slug = _g1[_g];
			++_g;
			list.push({ slug : slug, name : this.pokemonDataset.getPokemonStats(slug).name});
		}
		list.sort(function(x,y) {
			return Reflect.compare(x.name.toLowerCase(),y.name.toLowerCase());
		});
		return list;
	}
	,attachSelectChangeListeners: function() {
		var _g1 = this;
		var _g = 0;
		while(_g < 6) {
			var i = [_g++];
			js.JQuery("#selectionSelect" + i[0]).change((function(i) {
				return function(event) {
					_g1.selectChanged(i[0]);
				};
			})(i));
		}
	}
	,attachUrlFragmentChangeListener: function() {
		window.onhashchange = $bind(this,this.readUrlFragment);
	}
	,readUrlFragment: function() {
		var fragment = window.location.hash;
		var pattern = new EReg("([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)-([0-9]+)[^0-9]+([0-9]+)[^0-9]+([0-9]+)","");
		if(pattern.match(fragment)) {
			var pokemonNums;
			var this1;
			this1 = new Array(6);
			pokemonNums = this1;
			var _g = 0;
			while(_g < 6) {
				var i = _g++;
				var val = Std.parseInt(pattern.matched(i + 1));
				pokemonNums[i] = val;
			}
			this.setSelectionByNumbers(pokemonNums);
			this.renderAll();
		}
	}
	,writeUrlFragment: function() {
		var fragment = "#";
		var _g = 0;
		while(_g < 6) {
			var i = _g++;
			var slug = this.getSlotSlug(i);
			var pokemonNum = this.pokemonDataset.getPokemonStats(slug).number;
			if(i == 5) fragment += "" + pokemonNum; else fragment += "" + pokemonNum + "-";
		}
		window.location.hash = fragment;
	}
	,setSelectionByNumbers: function(pokemonNums) {
		var _g = 0;
		while(_g < 6) {
			var i = _g++;
			var slug = this.pokemonDataset.getSlug(pokemonNums[i]);
			this.setSlotSlug(i,slug);
		}
	}
	,selectChanged: function(slotNum) {
		this.renderAll();
	}
	,renderAll: function() {
		this.renderPokemonStats();
		this.renderPokemonMoves();
		this.renderChart();
		this.attachHelpListeners();
		this.writeUrlFragment();
	}
	,getSlotSlug: function(slotNum) {
		return js.JQuery("#selectionSelect" + slotNum).val();
	}
	,setSlotSlug: function(slotNum,slug) {
		js.JQuery("#selectionSelect" + slotNum).val(slug);
	}
	,renderPokemonStats: function() {
		var template = js.JQuery("#pokemonStatsTemplate").html();
		var rendered = visualizer_UI.renderTemplate(template,{ pokemonStats : this.buildStats(true)});
		js.JQuery("#pokemonStats").html(rendered);
	}
	,buildStats: function(visualBlueHorizontalOrder) {
		var slotNums = [0,1,2,3,4,5];
		if(visualBlueHorizontalOrder) slotNums = [2,1,0,3,4,5];
		var statsList = [];
		var _g = 0;
		while(_g < slotNums.length) {
			var slotNum = slotNums[_g];
			++_g;
			var slug = this.getSlotSlug(slotNum);
			var pokemonStats = this.pokemonDataset.getPokemonStats(slug);
			var abilityName = this.descriptionsDataset.getAbilityName(pokemonStats.ability);
			pokemonStats.ability_name = abilityName;
			pokemonStats.slot_number = slotNum;
			statsList.push(pokemonStats);
		}
		return statsList;
	}
	,renderPokemonMoves: function() {
		var template = js.JQuery("#pokemonMovesTemplate").html();
		var rendered = visualizer_UI.renderTemplate(template,{ pokemonMoves : this.buildMoves()});
		js.JQuery("#pokemonMoves").html(rendered);
	}
	,buildMoves: function() {
		var movesList = [];
		var _g = 0;
		var _g1 = [2,1,0,3,4,5];
		while(_g < _g1.length) {
			var slotNum = _g1[_g];
			++_g;
			var slug = this.getSlotSlug(slotNum);
			var name = this.pokemonDataset.getPokemonStats(slug).name;
			var moveSlugs = this.pokemonDataset.getPokemonStats(slug).moves;
			var moves = [];
			var _g2 = 0;
			while(_g2 < moveSlugs.length) {
				var moveSlug = moveSlugs[_g2];
				++_g2;
				var moveStats = this.movesDataset.getMoveStats(moveSlug);
				moveStats.move_slug = moveSlug;
				moveStats.move_name = moveStats.name;
				var damageCategory = moveStats.damage_category;
				Reflect.setField(moveStats,"damage_category_short",HxOverrides.substr(damageCategory,0,2));
				moves.push(moveStats);
			}
			movesList.push({ name : name, moves : moves});
		}
		return movesList;
	}
	,attachHelpListeners: function() {
		var _g = this;
		var $it0 = (function($this) {
			var $r;
			var _this = js.JQuery("[data-help-slug]");
			$r = (_this.iterator)();
			return $r;
		}(this));
		while( $it0.hasNext() ) {
			var element = $it0.next();
			var element1 = [element];
			var clickElement = js.JQuery("<a href=>");
			clickElement.addClass("clickHelp");
			clickElement.click((function(element1) {
				return function() {
					_g.clickedHelp(element1[0].attr("data-help-slug"));
					return false;
				};
			})(element1));
			element1[0].wrapInner(clickElement);
		}
	}
	,clickedHelp: function(helpSlug) {
		var parts = helpSlug.split(":");
		var category = parts[0];
		var slug = parts[1];
		var title = slug;
		var text = "";
		if(category == "ability") {
			var ability = Reflect.field(this.descriptionsDataset.abilities,slug);
			title = ability.name;
			text = ability.description;
		} else if(category == "move") {
			var move = this.movesDataset.getMoveStats(slug);
			title = move.name;
			text = move.description;
		}
		if(text == null || text.length == 0) text = "(no help available for this item)";
		var jquery = js.JQuery("#helpDialog").text(text);
		jquery.dialog();
		jquery.dialog("option","title",title);
	}
	,renderChart: function() {
		var matchupChart = new visualizer_MatchupChart(this.pokemonDataset,this.movesDataset,this.descriptionsDataset);
		matchupChart.setPokemon(this.buildStats());
		var tableElement = matchupChart.renderTable();
		js.JQuery("#pokemonDiamond").empty().append(tableElement);
	}
	,__class__: visualizer_UI
};
var visualizer_UserMessage = function() {
	this.messageContainer = js_Boot.__cast(window.document.getElementById("messageContainer") , HTMLDivElement);
};
visualizer_UserMessage.__name__ = true;
visualizer_UserMessage.prototype = {
	showMessage: function(text) {
		this.messageContainer.style.display = "block";
		this.messageContainer.textContent = text;
	}
	,hide: function() {
		this.messageContainer.style.display = "none";
	}
	,__class__: visualizer_UserMessage
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
var __map_reserved = {}
var q = window.jQuery;
var js = js || {}
js.JQuery = q;
q.fn.iterator = function() {
	return { pos : 0, j : this, hasNext : function() {
		return this.pos < this.j.length;
	}, next : function() {
		return $(this.j[this.pos++]);
	}};
};
js_Boot.__toStr = {}.toString;
visualizer_Main.LOAD_FAIL_MSG = "Loading dataset failed. Reload the page.";
visualizer_MatchupChart.NUM_POKEMON_PER_TEAM = 3;
visualizer_MatchupChart.NUM_MOVES_PER_POKEMON = 4;
visualizer_MatchupChart.POKEMON_LABEL = 1;
visualizer_MatchupChart.POKEMON_MOVES_LABEL = 1;
visualizer_MatchupChart.DIVIDER = 1;
visualizer_UI.Mustache = Mustache;
visualizer_UI.DEFAULT_POKEMON = (function($this) {
	var $r;
	var array = [493,257,462,244,441,139];
	var vec;
	{
		var this1;
		this1 = new Array(array.length);
		vec = this1;
	}
	{
		var _g1 = 0;
		var _g = array.length;
		while(_g1 < _g) {
			var i = _g1++;
			vec[i] = array[i];
		}
	}
	$r = vec;
	return $r;
}(this));
visualizer_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
