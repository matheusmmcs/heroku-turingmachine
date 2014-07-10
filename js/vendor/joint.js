/**
 * Joint 0.4 - JavaScript diagramming library.
 * Copyright (c) David Durman 2009 - 2011
 * Licensed under the MIT license: (http://www.opensource.org/licenses/mit-license.php)
 */(function(l){function g(a,b,c){if(!(this instanceof g))return new g(a,b,c);this.paper=g.paper();this._registeredObjects=[];this._conVerticesCurrentIndex=0;this._nearbyVertexSqrDist=500;this.dom={};this._start={shape:null,dummy:false};this._end={shape:null,dummy:false};this._opt={vertices:[],attrs:{stroke:"#000","fill-opacity":0,"stroke-width":1,"stroke-dasharray":"-","stroke-linecap":"round","stroke-linejoin":"round","stroke-miterlimit":1,"stroke-opacity":1},cursor:"move",beSmooth:false,interactive:true, label:undefined,labelAttrsDefault:{position:0.5,offset:0,"font-size":12,fill:"#000"},labelAttrs:[],labelBoxAttrsDefault:{stroke:"white",fill:"white"},labelBoxAttrs:[],bboxCorrection:{start:{type:null,x:0,y:0,width:0,height:0},end:{type:null,x:0,y:0,width:0,height:0}},dummy:{start:{radius:1,attrs:{opacity:0,fill:"red"}},end:{radius:1,attrs:{opacity:0,fill:"yellow"}}},handle:{timeout:2E3,start:{enabled:false,radius:4,attrs:{opacity:1,fill:"red",stroke:"black"}},end:{enabled:false,radius:4,attrs:{opacity:1, fill:"red",stroke:"black"}}}};this._opt.arrow={start:g.getArrow("none",2,this._opt.attrs),end:g.getArrow("basic",5)};c&&this.processOptions(c);G.init(this.paper,this._opt,this._start,this._end);c=this._start;var d=this._end;if(a.x&&a.y)G.dummy(c,a,this._opt.dummy.start);else c.shape=a.yourself();if(b.x&&b.y)G.dummy(d,b,this._opt.dummy.end);else d.shape=b.yourself();this.addJoint(c.shape);this.addJoint(d.shape);this.update()}function w(a,b){var c;if(b===undefined){c=a.split(a.indexOf("@")===-1?" ": "@");this.x=parseInt(c[0],10);this.y=parseInt(c[1],10)}else{this.x=a;this.y=b}}function i(a,b){return new w(a,b)}function H(a,b){this.start=a;this.end=b}function q(a,b){return new H(a,b)}function A(a){this.x=a.x;this.y=a.y;this.width=a.width;this.height=a.height}function s(a,b,c,d){if(typeof a.width==="undefined")return new A({x:a,y:b,width:c,height:d});return new A(a)}function I(a,b,c){this.x=a.x;this.y=a.y;this.a=b;this.b=c}function P(a,b,c){return new I(a,b,c)}function J(a,b,c,d){this.p0=a;this.p1= b;this.p2=c;this.p3=d}function Q(a,b,c,d){return new J(a,b,c,d)}function K(){}var t=l.Math,B=t.cos,C=t.sin,L=t.sqrt,M=t.min,R=t.max,y=t.atan2,V=t.acos,D=t.PI,E=Array.isArray||function(a){return Object.prototype.toString.call(a)==="[object Array]"};if(!l.console)l.console={log:function(){},warn:function(){},error:function(){},debug:function(){}};if(!Array.indexOf)Array.prototype.indexOf=function(a,b){for(var c=b||0,d=this.length;c<d;c++)if(this[c]==a)return c;return-1};var u=function(){for(var a=arguments[0], b=1,c=arguments.length;b<c;b++){var d=arguments[b],e;for(e in d)if(d.hasOwnProperty(e)){var f=d[e];if(f!==a[e]){if(typeof f=="function"&&typeof a[e]=="function"&&!f.base)f.base=a[e];a[e]=f}}}return a},N=function(){for(var a=arguments[0],b=1,c=arguments.length;b<c;b++){var d=arguments[b],e;for(e in d){var f=d[e];if(f!==a[e]){if(typeof f=="function"&&typeof a[e]=="function"&&!a[e].base)a[e].base=f;if(!a.hasOwnProperty(e)&&d.hasOwnProperty(e))a[e]=f}}}return a},S=function(){for(var a=arguments[0],b= 1,c=arguments.length;b<c;b++){var d=arguments[b],e;for(e in d){var f=d[e];if(f!==a[e]){if(Object.prototype.toString.call(f)==="[object Object]")S(a[e]||(a[e]={}),f);if(typeof f=="function"&&typeof a[e]=="function"&&!a[e].base)a[e].base=f;a[e]=f}}}return a},T=function(){for(var a=arguments[0],b=1,c=arguments.length;b<c;b++){var d=arguments[b],e;for(e in d){var f=d[e];if(f!==a[e]){if(Object.prototype.toString.call(f)==="[object Object]")T(a[e]||(a[e]={}),f);if(typeof f=="function"&&typeof a[e]=="function"&& !a[e].base)a[e].base=f;if(!a.hasOwnProperty(e)&&d.hasOwnProperty(e))a[e]=f}}}return a};l.Joint=g;g.euid=1;g.generateEuid=function(){if(this._euid===undefined)this._euid=g.euid++;return this._euid};g.prototype={_dx:undefined,_dy:undefined,IDLE:0,STARTCAPDRAGGING:1,ENDCAPDRAGGING:2,CONNECTIONWIRING:3,state:0,_callbacks:{justConnected:function(){},disconnected:function(){},justBroken:function(){},wiring:function(){},objectMoving:function(){}},euid:function(){return g.generateEuid.call(this)},connection:function(){return this.dom.connection[0]}, endObject:function(){return this._end.shape},startObject:function(){return this._start.shape},endCap:function(){return this.dom.endCap},endCapConnected:function(){return!this._end.dummy},startCap:function(){return this.dom.startCap},startCapConnected:function(){return!this._start.dummy},isStartDummy:function(){return this._start.dummy},isEndDummy:function(){return this._end.dummy},replaceDummy:function(a,b){a.shape.remove();a.dummy=false;a.shape=b},callback:function(a,b,c){this._callbacks[a].apply(b, c);return this},objectContainingPoint:function(a){for(var b=this._registeredObjects,c=b?b.length:0,d;c--;){d=b[c].yourself();if(s(d.getBBox()).containsPoint(a))return d}return null},freeJoint:function(a){a=a.yourself().joints();var b=a.indexOf(this);a.splice(b,1);return this},addJoint:function(a){a=a.joints();a.indexOf(this)===-1&&a.push(this)},capMouseDown:function(a,b){g.currentJoint=this;this._dx=a.clientX;this._dy=a.clientY;if(b===this.dom.startCap){this.disconnect("start");this.state=this.STARTCAPDRAGGING}else if(b=== this.dom.endCap){this.disconnect("end");this.state=this.ENDCAPDRAGGING}},connectionMouseDown:function(a){g.currentJoint=this;a=g.getMousePosition(a,this.paper.canvas);for(var b=0,c=this._opt.vertices.length;b<c;b++)if(q(this._opt.vertices[b],a).squaredLength()<this._nearbyVertexSqrDist){this._conVerticesCurrentIndex=b;this.state=this.CONNECTIONWIRING;return}c=s(this.startObject().getBBox()).center();b=s(this.endObject().getBBox()).center();c=q(c,a).squaredLength();b=q(b,a).squaredLength();if(c<b){this._conVerticesCurrentIndex= 0;this._opt.vertices.unshift(a)}else this._conVerticesCurrentIndex=this._opt.vertices.push(a)-1;this.state=this.CONNECTIONWIRING;this.callback("justBroken",this,[a])},capDragging:function(a){if(this.state===this.STARTCAPDRAGGING)this.startObject().translate(a.clientX-this._dx,a.clientY-this._dy);else if(this.state===this.ENDCAPDRAGGING)this.endObject().translate(a.clientX-this._dx,a.clientY-this._dy);else return;this._dx=a.clientX;this._dy=a.clientY;this.update()},capEndDragging:function(){var a, b=this.state===this.STARTCAPDRAGGING,c=this.state===this.ENDCAPDRAGGING,d=b?"start":"end";if(b)a=this.startObject().getBBox();else if(c)a=this.endObject().getBBox();if(a=this.objectContainingPoint(i(a.x,a.y))){this.callback("justConnected",a,[d]);this.replaceDummy(this["_"+d],a);this.addJoint(a)}this.update()},connectionWiring:function(a){a=g.getMousePosition(a,this.paper.canvas);this._opt.vertices[this._conVerticesCurrentIndex]=a;this.update();this.callback("wiring",this,[a])},update:function(){this.redraw().listenAll()}, redraw:function(){this.clean(["connection","startCap","endCap","handleStart","handleEnd","label"]);this.draw(["connection","startCap","endCap","handleStart","handleEnd","label"]);return this},listenAll:function(){if(!this._opt.interactive)return this;var a=this;this.dom.startCap.mousedown(function(c){g.fixEvent(c);a.capMouseDown(c,a.dom.startCap);c.stopPropagation();c.preventDefault()});this.dom.endCap.mousedown(function(c){g.fixEvent(c);a.capMouseDown(c,a.dom.endCap);c.stopPropagation();c.preventDefault()}); var b;for(b=this.dom.connection.length;b--;)this.dom.connection[b].mousedown(function(c){g.fixEvent(c);a.connectionMouseDown(c);c.stopPropagation();c.preventDefault()});this._opt.handle.start.enabled&&this.dom.handleStart.mousedown(function(c){g.fixEvent(c);a.capMouseDown(c,a.dom.startCap);c.stopPropagation();c.preventDefault()});this._opt.handle.end.enabled&&this.dom.handleEnd.mousedown(function(c){g.fixEvent(c);a.capMouseDown(c,a.dom.endCap);c.stopPropagation();c.preventDefault()});if(this._opt.handle.timeout!== Infinity)for(b=this.dom.connection.length;b--;)this.dom.connection[b].mouseover(function(c){g.fixEvent(c);a.showHandle();setTimeout(function(){a.hideHandle()},a._opt.handle.timeout);c.stopPropagation();c.preventDefault()});return this},boundPoint:function(a,b,c,d){if(b==="circle"||b==="ellipse")return P(a.center(),a.width/2,a.height/2).intersectionWithLineFromCenterToPoint(d);else if(b==="rect"&&a.width==a.height&&c!=0){b=a.width;b=Math.sqrt(b*b+b*b);a=a.center().offset(-b/2,-b/2);a=s(a.x,a.y,b,b)}return a.boundPoint(d)|| a.center()},jointLocation:function(a,b,c){var d=c.length,e;e=c.length?c[0]:undefined;var f=c.length?c[d-1]:undefined,h,k,j;c=this.boundPoint(a.bbox,a.type,a.rotation,e||b.bbox.center());e=a.bbox.center().theta(e||b.bbox.center());d=i(c.x+2*a.shift.dx*B(e.radians),c.y+-2*a.shift.dy*C(e.radians));h=i(c.x+a.shift.dx*B(e.radians),c.y-a.shift.dy*C(e.radians));k=360-e.degrees+180;j=this.boundPoint(b.bbox,b.type,b.rotation,f||a.bbox.center());e=(f||a.bbox.center()).theta(b.bbox.center());a=i(j.x+-2*b.shift.dx* B(e.radians),j.y+2*b.shift.dy*C(e.radians));b=i(j.x-b.shift.dx*B(e.radians),j.y+b.shift.dy*C(e.radians));return{start:{bound:c,connection:d,translate:h,rotate:k},end:{bound:j,connection:a,translate:b,rotate:360-e.degrees}}},connectionPathCommands:function(a,b,c,d){if(d)return K.curveThroughPoints([a].concat(c,[b]));a=["M",a.x,a.y];d=0;for(var e=c.length;d<e;d++)a.push("L",c[d].x,c[d].y);a.push("L",b.x,b.y);return a},labelLocation:function(a){a=this.paper.path(a.join(" "));for(var b=a.getTotalLength(), c=[],d=this._opt.labelAttrs,e=d.length,f=0,h;f<e;f++){h=d[f].position;h=h>b?b:h;h=h<0?b+h:h;h=h>1?h:b*h;c.push(a.getPointAtLength(h))}a.remove();return c},draw:function(a){var b=this.jointLocation({bbox:s(this.startObject().getBBox()).moveAndExpand(this._opt.bboxCorrection.start),type:this.startObject().type,rotation:this.startObject().attrs.rotation,shift:this._opt.arrow.start},{bbox:s(this.endObject().getBBox()).moveAndExpand(this._opt.bboxCorrection.end),type:this.endObject().type,rotation:this.endObject().attrs.rotation, shift:this._opt.arrow.end},this._opt.vertices),c=this.connectionPathCommands(b.start.connection,b.end.connection,this._opt.vertices,this._opt.beSmooth),d=this.labelLocation(c);b=G.init(this.paper,this._opt,this._start,this._end,b,c,d);c=a.length;for(var e=0;e<c;e++){d=a[e];this.dom[d]=b[d]()}},clean:function(a){for(var b,c,d=a.length;d--;){c=a[d];if(b=this.dom[c]){if(b.node){b.remove();this.dom[c]=null}else for(var e in b)b.hasOwnProperty(e)&&b[e].remove();this.dom[c]=null}}},processOptions:function(a){for(var b= this._opt,c=["interactive","cursor","beSmooth"],d=c.length;d--;)if(a[c[d]]!==undefined)b[c[d]]=a[c[d]];b.subConnectionAttrs=a.subConnectionAttrs||undefined;u(b.attrs,a.attrs);u(b.bboxCorrection.start,a.bboxCorrection&&a.bboxCorrection.start);u(b.bboxCorrection.end,a.bboxCorrection&&a.bboxCorrection.end);a.vertices&&this._setVertices(a.vertices);if(a.label){b.label=E(a.label)?a.label:[a.label];if(!E(a.labelAttrs))a.labelAttrs=[a.labelAttrs];for(d=0;d<b.label.length;d++)N(a.labelAttrs[d]||(a.labelAttrs[d]= {}),b.labelAttrsDefault);b.labelAttrs=a.labelAttrs;c=undefined;if(!E(a.labelBoxAttrs)){if(typeof a.labelBoxAttrs==="object")c=a.labelBoxAttrs;a.labelBoxAttrs=[a.labelBoxAttrs]}for(d=0;d<b.label.length;d++){if(c)a.labelBoxAttrs[d]=c;N(a.labelBoxAttrs[d]||(a.labelBoxAttrs[d]={}),this._opt.labelBoxAttrsDefault)}b.labelBoxAttrs=a.labelBoxAttrs}d=a.startArrow;c=a.endArrow;if(d&&d.type)b.arrow.start=g.getArrow(d.type,d.size,d.attrs);if(c&&c.type)b.arrow.end=g.getArrow(c.type,c.size,c.attrs);if(a.arrow){b.arrow.start= a.arrow.start||b.arrow.start;b.arrow.end=a.arrow.end||b.arrow.end}if(a.dummy&&a.dummy.start){if(a.dummy.start.radius)b.dummy.start.radius=a.dummy.start.radius;u(b.dummy.start.attrs,a.dummy.start.attrs)}if(a.dummy&&a.dummy.end){if(a.dummy.end.radius)b.dummy.end.radius=a.dummy.end.radius;u(b.dummy.end.attrs,a.dummy.end.attrs)}if(a.handle){if(a.handle.timeout)b.handle.timeout=a.handle.timeout;if(a.handle.start){if(a.handle.start.enabled)b.handle.start.enabled=a.handle.start.enabled;if(a.handle.start.radius)b.handle.start.radius= a.handle.start.radius;u(b.handle.start.attrs,a.handle.start.attrs)}if(a.handle.end){if(a.handle.end.enabled)b.handle.end.enabled=a.handle.end.enabled;if(a.handle.end.radius)b.handle.end.radius=a.handle.end.radius;u(b.handle.end.attrs,a.handle.end.attrs)}}},disconnect:function(a){var b,c=a==="start"?"Start":a==="end"?"End":"Both";if(a==="both"||a===undefined){this.freeJoint(this.startObject()).freeJoint(this.endObject());if(!this.isStartDummy()){b=this.startObject();this.draw(["dummyStart"]);this.callback("disconnected", b,[a])}if(!this.isEndDummy()){b=this.endObject();this.draw(["dummyEnd"]);this.callback("disconnected",b,[a])}}else if(!this["is"+c+"Dummy"]()){b=this[a+"Object"]();this.startObject()!==this.endObject()&&this.freeJoint(b);this.draw(["dummy"+c]);this.callback("disconnected",b,[a])}return this},register:function(a,b){b||(b="both");for(var c=a.constructor==Array?a:[a],d=0,e=c.length;d<e;d++){c[d].yourself()._capToStick=b;this._registeredObjects.push(c[d])}return this},registerForever:function(a){if(Object.prototype.toString.call(a)!== "[object Array]")a=Array.prototype.slice.call(arguments);this._registeredObjects=a;return this},unregister:function(a,b){b=b||"both";for(var c=-1,d=0,e=this._registeredObjects.length;d<e;d++){var f=this._registeredObjects[d].yourself()._capToStick||"both";if(this._registeredObjects[d]===a&&f===b){c=d;break}}c!==-1&&this._registeredObjects.splice(c,1);return this},registeredObjects:function(){return this._registeredObjects},setVertices:function(a){this._setVertices(a);this.update();return this},_setVertices:function(a){for(var b= this._opt.vertices=[],c,d=0,e=a.length;d<e;d++){c=a[d].y===undefined?i(a[d]):i(a[d].x,a[d].y);b.push(c)}return this},getVertices:function(){return this._opt.vertices},toggleSmoothing:function(){this._opt.beSmooth=!this._opt.beSmooth;this.update();return this},isSmooth:function(){return this._opt.beSmooth},label:function(a){this._opt.label=E(a)?a:[a];for(var b=0;b<a.length;b++){this._opt.labelAttrs[b]=this._opt.labelAttrsDefault;this._opt.labelBoxAttrs[b]=this._opt.labelBoxAttrsDefault}this.update(); return this},registerCallback:function(a,b){this._callbacks[a]=b;return this},straighten:function(){this._opt.vertices=[];this.update();return this},toggleHandle:function(a){var b=this._opt.handle;if(a)b[a].enabled=!b[a].enabled;else{b.start.enabled=!b.start.enabled;b.end.enabled=!b.end.enabled}this.update();return this},showHandle:function(a){var b=this._opt.handle;if(a)b[a].enabled=true;else{b.start.enabled=true;b.end.enabled=true}this.update();return this},hideHandle:function(a){var b=this._opt.handle; if(a)b[a].enabled=false;else{b.start.enabled=false;b.end.enabled=false}this.update();return this},setBBoxCorrection:function(a,b){if(b)this._opt.bboxCorrection[b]=a;else this._opt.bboxCorrection.start=this._opt.bboxCorrection.end=a;this.update();return this},highlight:function(a){this.connection().attr("stroke",a||"red");return this},unhighlight:function(){this.connection().attr("stroke",this._opt.attrs.stroke||"#000");return this}};g.currentJoint=null;g.paper=function(){var a=arguments[0];if(a=== undefined)return this._paper;this._paperArguments=arguments;if(!(a instanceof l.Raphael))return this._paper=l.Raphael.apply(l,arguments);return this._paper=a};g.resetPaper=function(){if(this._paper){var a=this._paper.canvas;a.parentNode.removeChild(a);g.paper.apply(g,this._paperArguments)}};g.getArrow=function(a,b,c){b||(b=2);a=g.arrows[a](b);if(!a.attrs)a.attrs={};if(c)for(var d in c)a.attrs[d]=c[d];return a};g.arrows={none:function(a){a||(a=2);return{path:["M",a.toString(),"0","L",(-a).toString(), "0"],dx:a,dy:a,attrs:{opacity:0}}},basic:function(a){a||(a=5);return{path:["M",a.toString(),"0","L",(-a).toString(),(-a).toString(),"L",(-a).toString(),a.toString(),"z"],dx:a,dy:a,attrs:{stroke:"black",fill:"black"}}}};g.findPos=function(a){var b=i(0,0);if(a.offsetParent)for(;a;){b.offset(a.offsetLeft,a.offsetTop);a=a.offsetParent}else b.offset(a.parentNode.offsetLeft,a.parentNode.offsetTop);return b};g.getMousePosition=function(a,b){var c;if(a.pageX||a.pageY)c=i(a.pageX,a.pageY);else{c=document.documentElement; var d=document.body;c=i(a.clientX+(c.scrollLeft||d.scrollLeft)-c.clientLeft,a.clientY+(c.scrollTop||d.scrollTop)-c.clientTop)}d=g.findPos(b);return i(c.x-d.x,c.y-d.y)};g.mouseMove=function(a){if(g.currentJoint!==null){var b=g.currentJoint;if(b.state===b.STARTCAPDRAGGING||b.state===b.ENDCAPDRAGGING)b.capDragging(a);else b.state===b.CONNECTIONWIRING&&b.connectionWiring(a)}};g.mouseUp=function(){if(g.currentJoint!==null){var a=g.currentJoint;if(a.state===a.STARTCAPDRAGGING||a.state===a.ENDCAPDRAGGING)a.capEndDragging()}g.currentJoint= null};g.fixEvent=function(a){a.preventDefault=g.fixEvent.preventDefault;a.stopPropagation=g.fixEvent.stopPropagation;return a};g.fixEvent.preventDefault=function(){this.returnValue=false};g.fixEvent.stopPropagation=function(){this.cancelBubble=true};g.handleEvent=function(a){var b=true;a=a||g.fixEvent(((l.ownerDocument||l.document||l).parentWindow||l).event);var c=this.events[a.type],d;for(d in c){this.$$handleEvent=c[d];if(this.$$handleEvent(a)===false)b=false}return b};g.addEvent=function(a,b,c){if(a.addEventListener)a.addEventListener(b, c,false);else{if(!c.$$guid)c.$$guid=g.addEvent.guid++;if(!a.events)a.events={};var d=a.events[b];if(!d){d=a.events[b]={};if(a["on"+b])d[0]=a["on"+b]}d[c.$$guid]=c;a["on"+b]=g.handleEvent}};g.addEvent.guid=1;g.removeEvent=function(a,b,c){if(a.removeEventListener)a.removeEventListener(b,c,false);else a.events&&a.events[b]&&delete a.events[b][c.$$guid]};g.addEvent(document,"mousemove",g.mouseMove);g.addEvent(document,"mouseup",g.mouseUp);var G={init:function(a,b,c,d,e,f,h){this.paper=a;this.opt=b;this.start= c;this.end=d;this.jointLocation=e;this.connectionPathCommands=f;this.labelLocation=h;return this},dummy:function(a,b,c){a.dummy=true;a.shape=this.paper.circle(b.x,b.y,c.radius).attr(c.attrs);a.shape.show();return a.shape},dummyStart:function(){return this.dummy(this.start,this.jointLocation.start.bound,this.opt.dummy.start)},dummyEnd:function(){return this.dummy(this.end,this.jointLocation.end.bound,this.opt.dummy.end)},handleStart:function(){var a=this.opt.handle.start;if(a.enabled){var b=this.jointLocation.start.bound; return this.paper.circle(b.x,b.y,a.radius).attr(a.attrs)}},handleEnd:function(){var a=this.opt.handle.end;if(a.enabled){var b=this.jointLocation.end.bound;return this.paper.circle(b.x,b.y,a.radius).attr(a.attrs)}},connection:function(){var a=this.opt,b=[],c=this.paper.path(this.connectionPathCommands.join(" ")).attr(a.attrs);if(a.subConnectionAttrs)for(var d=0,e=a.subConnectionAttrs.length,f=c.getTotalLength();d<e;d++){var h=a.subConnectionAttrs[d],k=h.from||2,j=h.to||1;k=k>f?f:k;k=k<0?f+k:k;k=k> 1?k:f*k;j=j>f?f:j;j=j<0?f+j:j;j=j>1?j:f*j;h=this.paper.path(c.getSubpath(k,j)).attr(h);h.node.style.cursor=a.cursor;b.push(h)}c.node.style.cursor=a.cursor;c.show();return[c].concat(b)},label:function(){if(this.opt.label!==undefined){for(var a=E(this.opt.label)?this.opt.label:[this.opt.label],b=this.opt.labelAttrs,c=a.length,d=0,e=[];d<c;d++){var f=this.labelLocation[d];f=this.paper.text(f.x,f.y+(b[d].offset||0),a[d]).attr(b[d]);var h=f.getBBox(),k=b[d].padding||0;h=this.paper.rect(h.x-k,h.y-k+(b[d].offset|| 0),h.width+2*k,h.height+2*k).attr(this.opt.labelBoxAttrs[d]);f.insertAfter(h);e.push(f,h)}return e}},startCap:function(){var a=this.opt.arrow.start;a=this.paper.path(a.path.join(" ")).attr(a.attrs);a.translate(this.jointLocation.start.translate.x,this.jointLocation.start.translate.y);a.rotate(this.jointLocation.start.rotate);a.show();return a},endCap:function(){var a=this.opt.arrow.end;a=this.paper.path(a.path.join(" ")).attr(a.attrs);a.translate(this.jointLocation.end.translate.x,this.jointLocation.end.translate.y); a.rotate(this.jointLocation.end.rotate);a.show();return a}};w.prototype={constructor:w,_isPoint:true,toString:function(){return this.x+"@"+this.y},deepCopy:function(){return i(this.x,this.y)},adhereToRect:function(a){if(a.containsPoint(this))return this;this.x=M(R(this.x,a.x),a.x+a.width);this.y=M(R(this.y,a.y),a.y+a.height);return this},theta:function(a){a=y(-(a.y-this.y),a.x-this.x);if(a<0)a=2*D+a;return{degrees:180*a/D,radians:a}},distance:function(a){return q(this,a).length()},offset:function(a, b){this.x+=a;this.y+=b;return this},normalize:function(a){a/=L(this.x*this.x+this.y*this.y);this.x*=a;this.y*=a;return this}};w.fromPolar=function(a,b){return i(a*B(b),a*C(b))};H.prototype={constructor:H,toString:function(){return"start: "+this.start.toString()+" end:"+this.end.toString()},length:function(){return L(this.squaredLength())},squaredLength:function(){var a=this.start.x,b=this.start.y,c=this.end.y;return(a-=this.end.x)*a+(b-=c)*b},midpoint:function(){return i((this.start.x+this.end.x)/ 2,(this.start.y+this.end.y)/2)},intersection:function(a){var b=i(this.end.x-this.start.x,this.end.y-this.start.y),c=i(a.end.x-a.start.x,a.end.y-a.start.y),d=b.x*c.y-b.y*c.x;a=i(a.start.x-this.start.x,a.start.y-this.start.y);c=a.x*c.y-a.y*c.x;a=a.x*b.y-a.y*b.x;if(d===0||c*d<0||a*d<0)return null;if(d>0){if(c>d||a>d)return null}else if(c<d||a<d)return null;return i(this.start.x+c*b.x/d,this.start.y+c*b.y/d)}};A.prototype={constructor:A,toString:function(){return"origin: "+this.origin().toString()+" corner: "+ this.corner().toString()},origin:function(){return i(this.x,this.y)},corner:function(){return i(this.x+this.width,this.y+this.height)},topRight:function(){return i(this.x+this.width,this.y)},bottomLeft:function(){return i(this.x,this.y+this.height)},center:function(){return i(this.x+this.width/2,this.y+this.height/2)},intersect:function(a){var b=this.origin(),c=this.corner(),d=a.origin();a=a.corner();if(a.x<=b.x)return false;if(a.y<=b.y)return false;if(d.x>=c.x)return false;if(d.y>=c.y)return false; return true},sideNearestToPoint:function(a){var b=this.x+this.width-a.x,c=a.y-this.y,d=this.y+this.height-a.y;a=a.x-this.x;var e="left";if(b<a){a=b;e="right"}if(c<a){a=c;e="top"}if(d<a)e="bottom";return e},containsPoint:function(a){if(a.x>this.x&&a.x<this.x+this.width&&a.y>this.y&&a.y<this.y+this.height)return true;return false},pointNearestToPoint:function(a){if(this.containsPoint(a))switch(this.sideNearestToPoint(a)){case "right":return i(this.x+this.width,a.y);case "left":return i(this.x,a.y); case "bottom":return i(a.x,this.y+this.height);case "top":return i(a.x,this.y)}else return a.adhereToRect(this)},boundPoint:function(a){var b=i(this.x+this.width/2,this.y+this.height/2),c=[q(this.origin(),this.topRight()),q(this.topRight(),this.corner()),q(this.corner(),this.bottomLeft()),q(this.bottomLeft(),this.origin())];a=q(b,a);for(b=c.length-1;b>=0;--b){var d=c[b].intersection(a);if(d!==null)return d}},moveAndExpand:function(a){this.x+=a.x;this.y+=a.y;this.width+=a.width;this.height+=a.height; return this}};I.prototype={constructor:I,bbox:function(){return s({x:this.x-this.a,y:this.y-this.b,width:2*this.a,height:2*this.b})},intersectionWithLineFromCenterToPoint:function(a){var b=a.x-this.x,c=a.y-this.y;if(b===0)return this.bbox().pointNearestToPoint(a);a=c/b;c=L(1/(1/(this.a*this.a)+a*a/(this.b*this.b)));if(b<0)c=-c;return i(this.x+c,this.y+a*c)}};J.prototype={constructor:J,getPoint:function(a){var b=1-a,c=b*b,d=c*b,e=a*a,f=e*a;return i(d*this.p0.x+3*c*a*this.p1.x+3*b*e*this.p2.x+f*this.p3.x, d*this.p0.y+3*c*a*this.p1.y+3*b*e*this.p2.y+f*this.p3.y)}};K.curveThroughPoints=function(a,b,c){if(typeof b==="undefined")b=0.5;if(typeof c==="undefined")c=0.75;var d=[];if(a.length<2)throw Error("Points array must have minimum of two points.");for(var e=[a[0]],f=1,h=a.length;f<h;f++)if(a[f].x!=a[f-1].x||a[f].y!=a[f-1].y)e.push(a[f]);if(b<=0)b=0.5;else if(b>1)b=1;if(c<0)c=0;else if(c>1)c=1;if(e.length>2){var k=1;a=e.length-1;if(e[0].x==e[a].x&&e[0].y==e[a].y){k=0;a=e.length}h=[];for(f=k;f<a;f++){var j= f-1<0?e[e.length-2]:e[f-1],n=e[f],z=f+1==e.length?e[1]:e[f+1],m=j.distance(n);if(m<0.0010)m=0.0010;var p=n.distance(z);if(p<0.0010)p=0.0010;var o=j.distance(z);if(o<0.0010)o=0.0010;o=(p*p+m*m-o*o)/(2*p*m);if(o<-1)o=-1;else if(o>1)o=1;o=V(o);var x=i(j.x-n.x,j.y-n.y),v=i(n.x,n.y),r=i(z.x-n.x,z.y-n.y);if(m>p)x.normalize(p);else p>m&&r.normalize(m);x.offset(n.x,n.y);r.offset(n.x,n.y);j=v.x-x.x;x=v.y-x.y;var O=v.x-r.x;v=v.y-r.y;r=j+O;var F=x+v;if(r===0&&F===0){r=-O;F=v}if(x===0&&v===0){r=0;F=1}else if(j=== 0&&O===0){r=1;F=0}j=y(F,r);m=M(m,p)*b;m*=1-c+c*(o/D);o=j+D/2;p=w.fromPolar(m,o);m=w.fromPolar(m,o+D);m.offset(n.x,n.y);p.offset(n.x,n.y);h[f]=p.distance(z)>m.distance(z)?[p,m]:[m,p]}d.push("M",e[0].x,e[0].y);k==1&&d.push("S",h[1][0].x,h[1][0].y,e[1].x,e[1].y);for(f=k;f<a-1;f++){b=false;if(f>0&&y(e[f].y-e[f-1].y,e[f].x-e[f-1].x)==y(e[f+1].y-e[f].y,e[f+1].x-e[f].x)||f<e.length-2&&y(e[f+2].y-e[f+1].y,e[f+2].x-e[f+1].x)==y(e[f+1].y-e[f].y,e[f+1].x-e[f].x))b=true;if(b)d.push("L",e[f+1].x,e[f+1].y);else{b= Q(e[f],h[f][1],h[f+1][0],e[f+1]);for(c=0.01;c<1.01;c+=0.01){k=b.getPoint(c);d.push("L",k.x,k.y)}}}a==e.length-1&&d.push("S",h[f][1].x,h[f][1].y,e[f+1].x,e[f+1].y)}else if(e.length==2){d.push("M",e[0].x,e[0].y);d.push("L",e[1].x,e[1].y)}return d};g.Point=w;g.point=i;g.Rect=A;g.rect=s;g.Line=H;g.line=q;g.Ellipse=I;g.ellipse=P;g.BezierSegment=J;g.bezierSegment=Q;g.Bezier=K;g.Mixin=u;g.Supplement=N;g.DeepMixin=S;g.DeepSupplement=T;var U=l.Raphael.el.attr;l.Raphael.el.attr=function(){if(arguments.length== 1&&(typeof arguments[0]==="string"||typeof arguments[0]==="array")||typeof this.joints==="undefined")return U.apply(this,arguments);var a={},b;for(b in this.attrs)a[b]=this.attrs[b];U.apply(this,arguments);var c=this.attrs;b=false;if(a.x!=c.x||a.y!=c.y||a.cx!=c.cx||a.cy!=c.cy||a.path!=c.path||a.r!=c.r)b=true;for(a=this.joints().length-1;a>=0;--a){c=this.joints()[a];if(b){c.update();c.callback("objectMoving",c,[this])}}return this};l.Raphael.el.joint=function(a,b){g.paper(this.paper);return new g(this, a,b)};l.Raphael.el.euid=function(){return g.generateEuid.call(this)};l.Raphael.el.yourself=function(){return this};l.Raphael.el.joints=function(){return this._joints||(this._joints=[])};l.Raphael.fn.euid=function(){return g.generateEuid.call(this)}})(this);