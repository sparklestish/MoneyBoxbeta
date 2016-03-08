//common
function empty($value){
return (!$value || $value===null || $value==='' || $value==='undefined' || $value===undefined || typeof $value === 'undefined') ? true : false;
 }
function ucfirst(str){
var firstLetter = str.substr(0, 1);
return firstLetter.toUpperCase() + str.substr(1);
 } //v5
function in_array(string,array){
for(var i = 0; i < array.length; i++){
if(array[i] === string){ return true; }
}
 } //v5
function is_array($val){ return ($val.length > 0) ? true : false; }
function isInt(x){
if(isNaN(Number(x))){ return false; }
 }
function getId(id){
if(!empty(id)){ return document.getElementById(id); }
	}
function css(id,paramx,value){
var param = fix_param(paramx);
var j = getId(id);
if(!empty(j)){
eval('j.style.'+param+'="'+value+'"; j.'+param+'="'+value+'";');
}
 } //v5
function animate(id,param,direction,funct,seconds_per_unit,amount_per_unit,total_no_of_units){ 
//final value = (amount_per_unit x total_no_of_units) + current value
//total time = seconds_per_unit x total_no_of_units
var initial_value = parseFloat(getValue(id,param));
if(param === 'opacity' && isNaN(initial_value)){ initial_value = 1.00; }
	for(var x = 1; x <= total_no_of_units; x++){
		var amount = parseFloat(amount_per_unit) * x;
		var time = seconds_per_unit * x;
		var num = initial_value + ((direction === '-') ?  -amount : amount); 
		var metric = (param === 'opacity') ? '' : 'px';
		setTimeout("eval('"+funct+"')('"+id+"','"+param+"','"+num+metric+"')",time);
	}
 } //v5
function animate2(id,param,direction,amount_per_unit,final_amount,ease_type,start_time,end_time){ 
//amount_per_unit = smoothness, get start time, determine repeat
var initial_value = parseFloat(getValue(id,param));
if(param === 'opacity' && isNaN(initial_value)){ initial_value = 1.00; }
var total_no_of_units = final_amount/amount_per_unit;
var seconds_per_unit = end_time/total_no_of_units;
	for(var $unit = 1; $unit <= total_no_of_units; $unit++){
		var time = seconds_per_unit * $unit;
		if(time >= start_time){ 
		var amount = parseFloat(amount_per_unit) * $unit;
		var num = initial_value + easing(ease_type,((direction === '-') ?  -amount : amount)); 
		var metric = (param === 'opacity') ? '' : 'px';		
		setTimeout("eval('css')('"+id+"','"+param+"','"+num+metric+"')",time);
		} 
	}
 } //v5
function easing(type,amt){
if(type === 'inverse'){
	return 1/amt;
}else if(type === 'square'){
	return Math.pow(1.05,amt);
}else if(type === 'cosine'){
	return Math.cos(amt);
}else if(type === 'sine'){
	return Math.sin(amt);
}else{
return amt;	
}
 }
function effects($id,$type){
if(!empty($id)){
	if($type === 'fade_in'){
		css($id,'opacity',0); animate($id,'opacity','+','css',100,0.1,10);
	}else if($type === 'fade_out'){
		animate($id,'opacity','-','css',100,0.1,10);
	}
}	
 }
function inLink($id,content,$effect,$toggle){
var j = getId($id);
if(empty(content)){ content = ''; }
if(!empty(j)){ 
if($toggle === true){ if(j.innerHTML === content || j.value === content){ toggle($id); }else{ openClose($id,'open'); } }
var e = j.getAttribute('e');
e = !empty($effect) ? $effect : e;
if(!empty(e)){ effects($id,e); }
	j.innerHTML=content;
	j.value=content;
	}
 }
function open_url(x){
location.href = getContent(x);
 }
//cookies
function createCookie(name,value,seconds){
if(http() === false){ offline_cookie(name,value); }
var expires=''
if(seconds!==''){
	var date = new Date();
	date.setTime(date.getTime()+(seconds*1000));
	expires = '; expires='+date.toGMTString();
}
var host = location.hostname;
var domain = ';domain='+host+';path=/'+(host === 'www.kitnes.com' ? ';secure' : '');
document.cookie = name+'='+value+expires+domain;
 }
function readCookie(name){ 
if(http() === false){ return offline_cookie(name); }
	if(document.cookie){
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	if(is_array(ca)){
	for(var i=0; i< ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)===' '){c = c.substring(1,c.length);}
		if (c.indexOf(nameEQ) === 0){return c.substring(nameEQ.length,c.length);}
	} }
	return null;
	}
 }
function cookie_exists(cooky){
return !empty(readCookie(cooky)) ? true : false;
	}
function eraseCookie(name){
	createCookie(name,"stub",-1);
 }
function killCookies(){ 
var whole_cookie = document.cookie;
var each_cookie = whole_cookie.split(";");
for (i = 0; i < each_cookie.length; i++){ 
var cname = each_cookie[i].split("=");
eraseCookie(cname[0]);
}
 }
function offline_cookie(key,value){ 
var $f = 'kitnes_cds';
var kdiv = $f+key;
var $ff = getId($f);
if(!$ff){ document.write('<span id="'+$f+'" style="width:0; height:0; position:fixed; z-index:10; bottom:-11px; right:-11px;"></span>'); }
if(!empty(value)){ 
if(!getId(kdiv)){ var k = document.createElement("span"); k.setAttribute('id',kdiv); $ff.appendChild(k); }
inLink(kdiv,value);
}else{ 
var c = getContent(kdiv); 
return (!empty(c)) ? c : get(key);
}
	}
//v5
function openClose(divName,state){
if(!empty(divName)){ 
	if(!empty(state)){
		var j = getId(divName);
	if(!empty(j)){	
		if(state === 'open'){ 
		createCookie('px_'+divName,divName);
			j.style.display = 'block'; } 
		else if(state === 'close'){ 
		eraseCookie('px_'+divName);
			j.style.display = 'none'; 
		}
	}
	}
}
 }
function fix_param(param){
if(param){ 
var i = param.split(" ");
if(i[1]){ return i[0]+ucfirst(i[1]); }else{ return i[0];}
}	
	} //v5
function getValue(id,paramx){
var j = getId(id);
var param = fix_param(paramx);
if(!empty(j)){ 
var g = eval('j.'+param+';');
var f = eval('j.style.'+param+';'); 
	if(g !== undefined){ 
		return g; 
	}else if(f !== undefined){ 
		return f; 
	}else{
		return '';	
	}
}	
 } //v5
function ticker($div,$prefix,$start,$end,$time){
if(!empty($div)){
for(var $i = $start; $i <= $end; $i++){ 
setTimeout("inLink('"+$div+"',getContent('"+$prefix+$i+"'),'fade_in')",$time*1000*($i-$start));
}
setTimeout("ticker('"+$div+"','"+$prefix+"','"+$start+"','"+$end+"','"+$time+"')",$time*1000*($end-($start-1)));
}
 }
//DOM
function getFrameContent(id){
var oDoc = getId(id).contentWindow || getId(id).contentDocument;
if(oDoc){ return oDoc.document.body.innerHTML; }
 }
function getFrameId(id){
var oDoc = getId(id).contentWindow || getId(id).contentDocument;
if(oDoc){ return oDoc.document.body; }	
 } //new
function inLink2($id,content,$effect,$toggle){
var j = getFrameId($id);
if(empty(content)){ content = ''; }
if(!empty(j)){ 
if($toggle === true){ if(j.innerHTML === content || j.value === content){ toggle($id); }else{ openClose($id,'open'); } }
var e = j.getAttribute('e');
e = !empty($effect) ? $effect : e;
if(!empty(e)){ effects($id,e); }
	j.innerHTML=content;
	j.value=content;
	}
 }
function getContent(id){
if(!empty(id)){
var j = getId(id);
if(!empty(j)){
	if(j.value && j.value.length > 0){
		var content = j.value;
	}else if(j.innerHTML && j.innerHTML.length > 0){
		var content = j.innerHTML;
	}
return content;
}
}
 }
function getInput(form,element){
return getId(form).elements[element];
	}
//rte
function get_script(url){
var imported = document.createElement('script');
imported.src = url;
document.head.appendChild(imported);	
 }

function kte_run(){
inLink(readCookie('aTxt'),tinyMCE.get('rtEditor').getContent());
 }
function kte_open(id){ 
createCookie('aTxt',id);
kte_state('open');
tinyMCE.get('rtEditor').setContent(getContent(id));
 }
function kte_trigger(id){
tinyMCE.get('rtEditor').setContent(getContent(id));
 }
function kte_state(st){
if(st === 'open'){
openClose('myItem','open');
effects('myItem','fade_in');
}else if(st === 'close'){
openClose('myItem','close');
}	
 }
//file upload
function fileupload(form3,target,process,params){ 
var j = getId(form3);
if(j.elements[0].value){ 
j.enctype='multipart/form-data';
j.method='post';
j.action='?q='+process+'&file='+j.elements[0].id+'&folder='+j.elements[1].value+'&'+params;
j.target=target;
j.submit();
j.elements[0].value='';
}
 }
function uploading(){
if(cookie_exists('upload')){
inLink('progress',readCookie('upload')+' upload complete!','fade_out');
eraseCookie('upload');
}
 }
function upload(formx){ 
var j = getId(formx);
var file = getInput(formx,'file').value;
inLink('hidden_div','');
var iframe = document.createElement("iframe");
iframe.setAttribute('name','hidden_frame'); 
iframe.setAttribute('frameborder','0'); 
iframe.setAttribute('style','width:0; height:0; position:fixed; z-index:10; bottom:-10px; right:-10px;'); 
iframe.setAttribute('onLoad','uploading();');
getId('hidden_div').appendChild(iframe);	
if(file){ 
createCookie('upload',file);
inLink('progress',file+', uploading..','fade_in');
j.enctype='multipart/form-data';
j.method='post';
j.action='kitnes.php?ssid=12389234';
j.target='hidden_frame';
j.submit();
getInput(formx,'file').value='';
setTimeout("xlink('view_uploaded','','k_attached')",0);
setTimeout("inLink('progress','upload completing..','fade_out')",8000);
}
 }
//html5
function k_os($key,$value){
return (!$value) ? eval('localStorage.'+$key) : eval('localStorage.'+$key+'="'+$value+'"'); 
 }
//navigation
function http(){
var d = document.location.href.split('/');
return (d[0] === 'http:' || d[0] === 'https:') ? true : false;
 }
function check_file(path,cache) { 
var cn = 'cache-'+path;
if(cache === true){ 
return (cookie_exists(cn)) ? readCookie(cn) : check_file(path,false);
}else{ 
if(http() === false){ return false; }
var c = new GetXmlHttpObject();
c.open("HEAD",path,false);
c.send(null);
//c.onreadystatechange = function(){ if(c.readyState === 4 || c.readyState === 'complete'){ return (c.status === 200) ? true : false; } };
var t = (c.status === 404) ? false : true;
createCookie(cn,t);
return t;
}
 }
function GetXmlHttpObject(){
var xmlHttp=null;
		try{ xmlHttp=new XMLHttpRequest();}
		catch(e){ 
		try{ xmlHttp=new ActiveXObject('Msxml2.XMLHTTP');}
		catch(d){ xmlHttp=new ActiveXObject('Microsoft.XMLHTTP');}
		}
	return xmlHttp;
 }
function validate(formId){ 
var qstr = '';
var xform = getId(formId);
if(xform===null){alert('Form Construct Error!'); return;}
var elem = xform.elements; 
	for(var i = 0; i < elem.length; i++){ 
	var k = getId(elem[i].name);
	var $rq = elem[i].getAttribute('required');
	var $title = elem[i].getAttribute('title');
	var $title = !empty($title) ? $title : elem[i].getAttribute('alias');
		if(elem[i].value === '' && ($rq === 'yes' || $rq === 'required')){
			alert('"'+$title+'" is a required field and cannot be left empty!'); 
			k.style.backgroundColor='#ffeedd'; 
			k.focus();  
			return;
		}
		else if(elem[i].value === '' && elem[i].getAttribute('required') === 'optional'){
			if(elem[i].value === ''){
				if(confirm('leave "'+$title+'" empty?')){ 
					k.style.backgroundColor='#ffeedd'; 
					k.value='NULL'; 
				}else { 
					k.style.backgroundColor='#ffeedd'; 
					k.focus(); 
					return;
				}
			}else{ 
				k.style.backgroundColor=''; 
			} 
		}
		var $itype = elem[i].getAttribute('itype');
		if($itype === 'email' || $itype === 'im'){
			if(elem[i].value.search("@") === -1 || elem[i].value.search("[.*]") === -1){
			var $cf = 'Use this format: info@kitnes.com';
				alert('Email address not valid! '+$cf); return false;
			}
		}else if($itype === 'phone' || $itype === 'fax'){
			var phone = elem[i].value.replace('+','');
			inLink(elem[i].id,phone);
			var $a = phone.split('-');
			if($a[0].length !== 3 || $a[1].length !== 2 || $a[2].length !== 7){ 
			var $cf = 'Use this format: 233-24-4617704';
				alert('Phone address is not valid! '+$cf); return false;
			}
		}else if($itype === 'country'){
			if(!isInt(elem[i].value)){
			xlink('get_location','type=country&name='+elem[i].value);
			elem[i].value = getContent('hidden_div');
			}
			xlink('get_location','');
		}
			var ci = elem[i].value; 
			//var cx = ci.replace('&','%26');
			var cd = ci.replace(/\+/g,'%2B'); //-d-
			var cx = cd.replace(/&/g,'%26');
	qstr += elem[i].name + '=' + cx + '&';
	} 
	return qstr;
 }
function getformvalues(url,dis,formId){ 
if(validate(formId)){ 
	if(dis!==null){ 
	effects('progress_bar','fade_in'); 
	inLink('progress_bar','sending data, please wait..'); 
	 }
return validate(formId)+url;
}
 }
function xlink(str,url2,dis,form3) { 
	if(empty(str)){ return; }
var ca_s = str+url2+dis+form3;
var ca_r = 'click_action';
if(ca_s === readCookie(ca_r)){ return; }
createCookie(ca_r,ca_s,5);
	var gop = (!empty(form3)) ? 'p' : 'g'; 
	var $pb = 'progress_bar'; 
	if(empty(dis)){ dis = 'hidden_div'; } 
	var display=dis;
    var xmlHttp3= new GetXmlHttpObject();
	if(xmlHttp3===null){ alert('Browser does not support HTTP Request'); return; }
		if(str === 'reload'){ 
			if(url2 === 'clear'){  killCookies();  }else{  eraseCookie('pc_main'); }
		window.location.reload(); 
		return; 
		/*} else if(str === 'redirect'){ 
			if(split_url2(url2,'clear') === 'cookies'){ 
				killCookies(); 
			}
		location.href = unescape(split_url2(url2,'path'));	
		return;*/
		}
	var myssid = '&ssid='+Math.random();
	var url='kitnes.php?q='+str+'&'+url2+'&div='+display+myssid; 
	var chkf = check_file('kitnes.php',true);
	//if(cookie_exists('kuid')){ url='cache/engine/'+readCookie('kuid')+'_kitnes.php?q='+str+'&'+url2+'&div='+display+myssid; } //test
	if(chkf === 'false' || chkf === false){ k_livescript(((gop === 'p') ? getformvalues(url,display,form3)+myssid : url),display);	return;	} 
		if(gop==='p'){ 
			if(getformvalues(url,display,form3)){ 
			xmlHttp3.open('POST',url,true);
		    xmlHttp3.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
			var $vals = getformvalues(url,display,form3); 
			if($vals){
			xmlHttp3.send($vals+myssid); 
            inLink('k_attached',''); 
            if(split_url2(url2,'flush_form')){ getId(form3).reset(); }
            inLink($pb,'data received, thank you!');
			openClose('dropDown','close');
			}
			}
		}
		else if(gop==='g'){ 
			css($pb,'opacity',1); inLink($pb,'please wait..');
			var uas = ['login','logout','phpJs','update','runInsert','minor_ops','rotate_image','adserve','nully'];
			if(readCookie('ar') === null && !in_array(str,uas)){ 
			if(url2){ 
			var url2x = (split_url2(url2,'sr') === 'runInsert') ? url2.replace('sr=runInsert','') : url2;
			var url2y = (split_url2(url2x,'sr') === 'update') ? url2x.replace('sr=update','') : url2x;
			}
			eraseCookie2(display);
			//k_os('pc_'+display,str+','+url2y+','+display); 
			}else{ eraseCookie('ar'); } 
			//var $cookies = doCookies();
			xmlHttp3.open('GET',url,true); 
			xmlHttp3.send(null);
			//doCookies($cookies);
		}
    xmlHttp3.onreadystatechange = function(){
	var jp = getId(display);
	if(!empty(jp)){ 
	/*
0: request not initialized
1: server connection established
2: request received
3: processing request
4: request finished and response is ready
	*/
	if(xmlHttp3.readyState===1){ inLink($pb,'connecting..'); }
	if(xmlHttp3.readyState===2){ 
	inLink($pb,'connected..');
		if(split_url2(url2,'redirect')){ 
		setTimeout("inLink('"+$pb+"','received, thank you!')",500); 
		top.location.href = unescape(split_url2(url2,'redirect')); 
		}
	 }
	if(xmlHttp3.readyState===3){ inLink($pb,'downloading..'); }
	if(xmlHttp3.readyState===4 || xmlHttp3.readyState==='complete'){
		if(xmlHttp3.status===403 || xmlHttp3.status===404 || xmlHttp3.status===500){ 
			inLink($pb,'Error: '+xmlHttp3.status); 
			setTimeout("effects('"+$pb+"','fade_out')",500);
			return;
		}
		var $rsp = xmlHttp3.responseText;
		getMyXML($rsp,split_url2(url2,'kxp'));
		inLink($pb,((gop === 'g') ? 'receiving data..' : 'data received, thank you!'));
		setTimeout("effects('"+$pb+"','fade_out')",500);
		if(split_url2(url2,'go')){ location.href = 'kitnes.php?q='+str+'&'+url2; }
		if(!empty($rsp)){ 
		inLink(display,$rsp); 
		anchorx(url2,$rsp); 
		if(empty(split_url2(url2,'kc'))){ 
		load_kml('','x','click'); 
		if(dis === 'rightContent1'){ location.hash = '#'+str+','+dis+'?'+url2; } //
		}
		//setTimeout("load_kitnes_js('"+display+"')",0);
/*		var $sp = $rsp.split(':');
			if($sp[0] === 'xlink'){
				if($sp[1] === 'error'){ alert('error'); return; }
				//var $s = $sp[1].split(',');
			}*/
		} 
		if(split_url2(url2,'goto')){ 
		setTimeout("inLink('"+$pb+"','redirecting..')",2000); 
		top.location.href = unescape(split_url2(url2,'goto')); 
		}
	} }
 };
 }
function eraseCookie2($name) {
if(!empty($name)){
$j = document.cookie;
if($j){
var $obj = $j.split(';');  
for (i = 0; i < $obj.length; i++){ 
var $x = $obj[i].split('=');
if(contains(sub_rebind($name),$x[0])){ 
eraseCookie($x[0]);
 } } } }
 } //v9!
function anchorx(path,content) {
if(!empty(path)){
var x = path.split('&');
	for(var i = 0; i < x.length; i++){
		var z = x[i].split('=');
		if(z[0] === 'a'){ window.location.hash = '#'+z[1]; }	
		//if(z[0] == 'id'){ createCookie('zid',z[1]); }
		if(z[0] === 'tab'){ create_page(content); }
	} 
}
 }
function split_url2(path,key) {
var x = path.split('&');
	for(var i = 0; i < x.length; i++){
		var z = x[i].split('=');
		if(z[0] === key){ return z[1]; }
	}
 }
function create_page(content) {
var page = (cookie_exists('page_num')) ? readCookie('page_num') : 0;
createCookie('page_num',Number(page)+1);
var page_id = 'page-'+readCookie('page_num'); 
var newdiv = document.createElement('div');
newdiv.setAttribute('id',page_id);
newdiv.setAttribute('onclick',"inLink('rightContent1',getContent(this.id));page_up();openClose('opened-pages','close');");
newdiv.innerHTML = content;     
newdiv.className = 'dyn_pages';
newdiv.title = 'reopen this page';
getId('opened-pages').appendChild(newdiv);
 }
function contains($value,$str) {
if(!empty($value) && !empty($str)){ return ($str.search($value) === -1) ? false : true;	}
 }
function sub_rebind($div) { 
if(!empty($div)){
if(contains('-',$div)){ var $bind = '-'; }else if(contains('_',$div)){ var $bind = '_'; }
if(!empty($bind)){
var $k = $div.split($bind);
return $k[0]+$bind+$k[1];	
}else{
return Math.random();	
	}
}
 }
function doCookies($str) {
if(empty($str)){ var $mode = 'erase'; var $j = document.cookie; }else{ var $mode = 'create'; var $j = $str; }
if($j){
var $obj = $j.split(';');  
for (i = 0; i < $obj.length; i++){ 
var $x = $obj[i].split('=');
$vars = ['PHPSESSID','kuid'];
if(!in_array($x[0],$vars)){ 
	if($mode === 'create'){ 
		createCookie($x[0],$x[1]); 
	}else if($mode === 'erase'){ 
		eraseCookie($x[0]);
	}
 }
 }
return $j;
 }
 } //v9!
function process_cookies() {
var whole_cookie = document.cookie;
var each_cookie = whole_cookie.split(";");  
for (i = 0; i < each_cookie.length; i++){ 
var so = each_cookie[i].split("=");
createCookie('ar','');
if(so[0].indexOf('pc_') === 1){
var new_val = each_cookie[i].replace(so[0]+'=','');
var x = new_val.split(",");
setTimeout("xlink('"+x[0]+"','"+x[1]+"','"+x[2]+"')",0);
}
 }
//setTimeout("process_cookies2()",10);
 }
function process_cookies2() {
var whole_cookie = document.cookie;
var each_cookie = whole_cookie.split(";");  
for (i = 0; i < each_cookie.length; i++){ 
var so = each_cookie[i].split("=");
if(so[0].indexOf('px_') === 1){ openClose(so[1],'open'); }
 }
 }
//mobile
function parseXML(str){
if (window.DOMParser) {
  parser=new DOMParser();
  xmlDoc=parser.parseFromString(str,"text/xml");
} else {
  xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
  xmlDoc.async=false;
  xmlDoc.loadXML(str); 
}
return xmlDoc;
 }
function cleanXML(str){
if(!empty(str)){ return decodeURIComponent(str).replace(/\+/g,' ');	}
 }
function getIds(c){ 
var f = document.all ? document.all : document.getElementsByTagName("*");
var v = Array();
for(var i=0; i< f.length; i++){ if(f[i].getAttribute('x') === c){ v.push(f[i].getAttribute('id')); } } 
return v;
	} 
function tagContent(e){
if(!empty(e)){ return e.childNodes[0].nodeValue; }	
 } 
function getTN(doc,elem,num){
if(!empty(doc) && !empty(elem)){
return doc.getElementsByTagName(elem)[((num) ? parseInt(num) : 0)];
}	
	}
function getMyXML(data,p){
if(!empty(data) && !empty(p)){ 
var c = parseXML(data);
var v = Array();
var b = ['image','image_caption','video','video_caption','audio','audio_caption','application','application_caption'];
for(var s=0; s< b.length; s++){ 
var tag = b[s];
var e = c.getElementsByTagName(tag);
if(!empty(e)){ for(var r=0; r< e.length; r++){ v.push(tag+'-'+r); } }
}
var w = ['user_name','content','title','parent_name','timestamp','host_name','guest_name','creation_date'];
var a = w.concat(v); 
for(var i=0; i< a.length; i++) { 
var z = a[i].split('-');
var d = cleanXML(tagContent(getTN(c,z[0],z[1]))); 
var t = getIds(p+a[i]); 
for(var j=0; j< t.length; j++){ 
var cl = getId(t[j]).getAttribute('c');
var ms = getId(t[j]).getAttribute('m');
if(empty(cl)) cl = '';
if(z[0] === 'image'){ 
var obj = '<img class="'+cl+'" src="https://'+lh()+'/kitnes.php?q=openFile&id='+d+'&reload=no" '+ms+'>'; 
}else if(z[0] === 'video' || z[0] === 'audio'){
var obj = '<embed class="'+cl+'" src="https://'+lh()+'/kitnes.php?q=openFile&id='+d+'&reload=no"></embed>'; 
}else{
var obj = '<span class="'+cl+'">'+d+'</span>';	
}
inLink(t[j],obj); 
css('body','display','block');
} } }	
 }
//utilities
function lh(){
return 'www.kitnes.com';	
 }
function k_livescript($url,$div) {
var a = 'myghanaonline.com';
var $js = document.createElement("script");
var $d = 'kitnes_wf';
var $sid = $d+'_id';
$js.setAttribute('type','text/javascript'); 
$js.setAttribute('id',$sid);  
$js.setAttribute('src','http://'+a+'/'+$url+'&output&jdiv='+$div+'&cm='+(Math.random() * 100000000000000000)); 
inLink($d,'');
getId($d).appendChild($js); 
 } 
function hdn(){ 
return ' style="width:0; height:0; position:fixed; z-index:10; bottom:-11px; right:-11px;" ';
 }
function file_get_contents($url){
//document.domain = $url_sub;
var $f = document.createElement("iframe");
$f.src=$url;
$f.setAttribute('id','fr2'); 
$f.setAttribute('frameborder','0'); 
$f.setAttribute('style','width:0; height:0; position:fixed; z-index:10; bottom:-10px; right:-10px;'); 
$f.setAttribute('onLoad','inLink(\'hidden_div\',getFrameContent(this.id));');
document.body.appendChild($f);	
//alert($f.domain);
 }
function create_overlay($id){ 
var $tag = getId($id).tagName.toLowerCase();
if($tag == 'img' || $tag == 'object' || $tag == 'embed'){ 
var $width = parseInt(getValue($id,'width'));
var $height = parseInt(getValue($id,'height'));
if($width !== 0 || $height !== 0){ 
var $left = findPosX($id); 
var $top = findPosY($id);
$new_height = $height/7.35; 
var $new_layer = document.createElement('div');
var $i = $id+'-nl';  
$new_layer.setAttribute('id',$i); 
var $sf = getId($id).getAttribute('sf'); 
var $sp = getId($id).getAttribute('sp'); 
var $op = getId($id).getAttribute('op'); 
if(!empty($sf)) $new_layer.setAttribute('f',$sf); 
if(!empty($sp)) $new_layer.setAttribute('p',$sp);
insertAfter($new_layer,getId($id));
css($i,'position','relative');
css($i,'width',$width+'px');
css($i,'height',($new_height)+'px');
var $new_left = findPosX($i);
css($i,'left',($left-$new_left)+'px'); 
css($i,'background color','#000'); 
css($i,'color','#FFF');
css($i,'opacity',0.75);
css($i,'z index',1);
if(!empty($op) && $op === 'up'){
css($i,'margin top',-$height+'px');	
css($i,'margin bottom',$height-$new_height+'px');
}else{ 
css($i,'margin top',-$new_height+'px');	
}
inLink($i,'ad space for rent');
} }
 }
function insertAfter(newElement,targetElement){
var parent = targetElement.parentNode;
if(!empty(parent)){
  if (parent.lastChild == targetElement) {
    parent.appendChild(newElement);
  } else {
    parent.insertBefore(newElement,targetElement.nextSibling);
  }
}
 }
//on load
function load_kitnes_js(){ 
start_app();
//document.onmouseup = function(){ load_mygh(); }
session();
load_kml();
openLink();
//eraseCookie('page_num');
//process_cookies();
var int = self.setInterval("create_time()",1000);
var x = self.setInterval("load_kml('','x')",1000);
//document.onmouseup = function(){ selectedText(); }
 } //run on page load
function load_start(){
go_mobile();
 }
function session(){ 
var $sess = 'kuid';
var $f = 'kitnes_wf';
var f = getId($f);
if(!f){ 
//fbLogin();
//if(!cookie_exists('kuid')){ document.write('<iframe id="kitnes" src="https://'+lh()+'/" '+hdn()+'></iframe>'); } //new!
document.write('<span id="'+$f+'" '+hdn()+'></span>'); 
//inLink('cmsContent',getFrameContent('kitnes'));
}
var $d = 'kitnes_wfs'; 
var x = getId($d);
if(!x){ document.write('<span id="'+$d+'" '+hdn()+'></span>'); }
var $u = getContent($d); //change
var mc = readCookie($sess); 
if(cookie_exists($sess) && (mc.length > 10) && !isNaN(parseInt(mc))){ return; }else{ eraseCookie($sess); }
if(isNaN($u)){ 
//k_livescript('kitnes.php?q=create_cookie&sess_post&reload=no',$d);
} 
	if(isNaN($u)){ 
	//setTimeout("session();",100); 
	return; 
	}else{ 
	createCookie($sess,$u); 
	//if(http() === true){ window.location.reload(); }else{ window.location.href = location.href+'?'+$sess+'='+$u; }
	}
 }
function load_kml($e,$timer,$event){
if(empty(get('ssid'))){ 
var $sec = parseInt(readCookie('time'));
if(empty($timer)){ 
document.write('<div id="hidden_div" '+hdn()+'></div>');
document.write('<div id="kitnes_bar" style="visibility:hidden; background-color:#F00; position:fixed; z-index:1000; bottom:0; width:100%; height:20px;"></div>');
} 
//get query string
var $ue_url = document.location.href;
var $u = escape($ue_url);
var $ux = $ue_url.split('?');
if(is_array($ux)){
var $uxx = (!empty($ux[1])) ? $ux[1].split('#') : '';
var $qstr = (!empty($uxx[1])) ? $uxx[0] : $ux[1];
}	
//scan elements
if(empty($e)){
var $x = document.all ? document.all : document.getElementsByTagName("*");
}else{
var $x = getId($e).all ? getId($e).all : getId($e).getElementsByTagName("*");
}
//loop through elements
if(is_array($x)){ 
for(var i=0; i< $x.length; i++){ 
//create id
var $id = $x[i].getAttribute('id');
if(empty($id)) $x[i].setAttribute('id',Math.random());
var d = $x[i].getAttribute('d');
$d = (!empty(d)) ? d : $x[i].getAttribute('id'); 
//check overlay
var $o = $x[i].getAttribute('o'); 
if(!empty($o) && $o === 'yes' && empty($event) && !empty($timer) && getValue($id,'display') !== 'none' && getValue($id,'visibility') !== 'hidden'){ 
setTimeout("create_overlay('"+$d+"')",100); 
$x[i].removeAttribute('o');
}
//include
var $s =  $x[i].getAttribute('s'); 
if(!empty($s)){ 
call_cache($s,$d);
$x[i].removeAttribute('s');
 }
//run function
var $f = $x[i].getAttribute('f');
if(!empty($f)){ 
var $p = $x[i].getAttribute('p'); 
//ad plugin
var $itype = $x[i].getAttribute('i');
if(!empty($itype)){ 
if($itype === 'ad' && !empty($event)){ $x[i].setAttribute('t','once'); }
}
//process 'em
if(!empty($timer)){
	var $t = $x[i].getAttribute('t'); 
	if(!empty($t)){ 
		if($t == 'once'){
		$x[i].removeAttribute('t'); 
		setTimeout("xlink('"+$f+"','"+$p+"&kc=yes&url="+$u+'&'+$qstr+"','"+$d+"')",0);
		}else if($t == 'login'){
			var login = getContent($d);
			if(login !== ''){
			$x[i].removeAttribute('t'); 
			setTimeout("xlink('login','sr=runInsert&runI=profile&reload=no&"+login+"&kc=yes&url="+$u+'&'+$qstr+"','"+$d+"')",0);	
			}
		}
	var $t2 = parseInt($t);
    if($t2 < 10) return; //prevent ddos
	if($sec % $t2 == 0){ 
	setTimeout("xlink('"+$f+"','"+$p+"&kc=yes&url="+$u+'&'+$qstr+"','"+$d+"')",0);
	} }
}else{ 
setTimeout("xlink('"+$f+"','"+$p+"&kc=yes&url="+$u+'&'+$qstr+"','"+$d+"')",0);
}
 } 
} } 
}
 } //v11!
function openLink(){ 
var j = location.hash;
if(!empty(j)){
var j = j.split("#"); //#sheet^rightContent1?run=pricing
var j = j[1].split(",");	// sheet^rightContent1?run=pricing
var str = j[0];
var j = j[1].split("?"); //run=pricing^rightContent1
var dis = j[0];
var url2 = j[1];
setTimeout("xlink('"+str+"','"+url2+"','"+dis+"')",0);
}
	}
function create_time(){
return (cookie_exists('time')) ? createCookie('time',parseInt(readCookie('time'))+1) : createCookie('time',0);
 } //new!
function call_cache(src,div){
var iframe = document.createElement("iframe");
var myID = Math.random();
iframe.setAttribute('id',myID); 
iframe.setAttribute('src',src); 
iframe.setAttribute('style','width:0; height:0; border:0; position:fixed; z-index:10; bottom:-10px; right:-10px;'); 
getId('hidden_div').appendChild(iframe);
iframe.setAttribute('onLoad',"inLink('"+div+"',getFrameContent('"+myID+"'));");
 }
//mobile apps
function start_app() {
var ab = 'kAppBody'; 
var x = getId(ab);
if(x){ 
css(ab,'margin',0); css(ab,'padding',0); css(ab,'overflow','hidden');
var afE = document.createElement("iframe");
var af = 'kAppFrame';
afE.setAttribute('id',af);
afE.setAttribute('src',x.getAttribute('url'));
getId(ab).appendChild(afE);
css(af,'margin',0); css(af,'padding',0); css(af,'border',0);
setInterval(function(){app_orientation(af)},1000);
}
 } 
function app_orientation(id){
if(getId(id)){
css(id,'width',window.innerWidth+'px');
css(id,'height',window.innerHeight+'px');	
}
 }
//chat
function chatjs(){
xlink('show_chat_messages','sr=runInsert&runI=portal','chat_messages','chat_form');
getId('data').focus();
getId('data').value='';
 }
function call_chat(){
var div = 'chat_display';
if(getContent('_portal_type') === 'forum'){ 
xlink('call_chat','repeat',div);	
xlink('call_users','repeat','chat_users');
var j = getId(div);
j.scrollTop = j.scrollHeight;
}
 } //v9
function chat_clear_focus(){
var j = getId('data');
j.value=''; 
j.focus();
 }
function chat_up(){
var w = getId('chat-messages');
w.scrollTop = w.scrollHeight;	
 }
function page_up(){
var j = getId('body');
j.scrollTop = j.scrollHeight;	
 }
function chatjs2(form){
xlink('display_chat','sr=runInsert&runI=message&host='+getContent('_message_host')+'&guest='+getContent('_message_guest'),'chat-messages',form);
chat_clear_focus();
 }
//toggle n stuff
function toggle(div){
if(!empty(div)){ return (getId(div).style.display==='none') ? openClose(div,'open') : openClose(div,'close'); }
 }
function toggleV(div){
if(!empty(div)){ 
if(getId(div).style.visibility==='visible'){ 
getId(div).style.visibility==='hidden'; 
}else if(getId(div).style.visibility==='hidden'){ 
getId(div).style.visibility==='visible'; 
} }
 }
function toggleHide(rC,div){
var j = getId(rC);
if(j.style.display==='none'){ 
j.style.display='block';
inLink(div,'Hide');
	}else{ 
j.style.display='none';
inLink(div,'Add New');
}
 }
function dropDown(event){
var x = '<span style="z-index:101; position:fixed; left:'+event.clientX+'px; top:'+(event.clientY-85)+'px;" name="dropDown" id="dropDown"><div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div></span>';
inLink('xyPoint',x);
 }
function k_delete(id,object,field){ 
	if(confirm('Do you really want to delete "'+object+'"?') && confirm('This action cannot be reversed, proceed?')){
		xlink('runUpdate','elem=deleted&val=y&id='+id);
			openClose(field,'close'); 
			openClose(id,'close');	
	}
	openClose('dropDown','close');
 }
function attach3(id){
	if(cookie_exists('host_a') && cookie_exists('host_div') && id !== ''){ 
		xlink('link_area','id='+readCookie('host_a')+'&sr=runInsert&runI=service&_service_mode=link&_service_host='+readCookie('host_a')+'&_service_guest='+id,readCookie('host_div'));
	}
	openClose('dropDown','close');
 }
function remove2(id,obj){
if(confirm('confirm delete?')){
inLink(id,(getContent(id)).replace(obj,''));
xlink('listLinks','string='+getContent('files'),'list_attachments');
	}
 }
function toggle7(group,id,empty){
	if(cookie_exists(group)){ 
    var t = readCookie(group);
		openClose(t,'close');
		if(empty==='yes'){inLink(readCookie(group),'');}
		}
    if(t===id){ 
    openClose(id,'close');
    eraseCookie(group);
    }else{ 
	openClose(id,'open');
	createCookie(group,id);
    }
	}
function toggle3(group,id,empty){
	if(cookie_exists(group)){
		openClose(readCookie(group),'close');
		if(empty==='yes'){inLink(readCookie(group),'');}
		}
	openClose(id,'open');
	createCookie(group,id);
	}
function toggle4($group,$id,$param,$new_val,$old_val){
	if(cookie_exists($group)){
		css(readCookie($group),$param,$old_val);
		}
	css($id,$param,$new_val);
	createCookie($group,$id);
	}
function toggle5(group,id,bpv,apv){ //background color=#CCC;color=#555 //background color=#000;color=#FFF
if(cookie_exists(group)){ 
var ap = apv.split(';');
	for(var i=0; i< ap.length; i++){
	var pv = ap[i].split('=');
	css(readCookie(group),pv[0],pv[1]);
	}
 }
var bp = bpv.split(';');
	for(var i=0; i< bp.length; i++){
	var pv = bp[i].split('=');
	css(id,pv[0],pv[1]);
	}
createCookie(group,id);
 }
function toggle6(group,id,param_value){ //background color=#CCC|#000;color=#555|#FFF
var a = param_value.split(';');
for(var i=0; i< a.length; i++){
var c = a[i].split('=');
var d = c[1].split('|');
css(id,c[0],d[0]);
var ix = readCookie(group);
if(cookie_exists(group) && id !== ix){ css(ix,c[0],d[1]); }
}
createCookie(group,id);
 }
function visited(id){
	if(document.cookie && readCookie('visited') !== null && readCookie('visited') !== ''){
		getId(readCookie('visited')).style.color='';
		}
	getId(id).style.color='#f00';
	createCookie('visited',id);
	}
function active_link(id){
var group = 'aLink';
if(cookie_exists(group)){
css(readCookie(group),'color','#666');
}
createCookie(group,id);
css(id,'color','#000');
 }
function hash_id($apid){
var $x = document.getElementsByTagName('span');
if(is_array($x)){ 
for(var i=0; i< $x.length; i++){ 
if($x[i].getAttribute('apid') == $apid){
return $x[i].getAttribute('id'); 
} } }	
 }
function navigate(prefix,dir,pos){ 
var left = prefix+'left';
var right = prefix+'right';
var num = prefix+'count';
var div = prefix+'photo_area';
var c_div = prefix+'caption';
var $total = Number(getContent(prefix+'0'));

var $h = location.hash;
if(!empty($h)){ 
$j = $h.split("#");
$pos = hash_id($j[1]).split(prefix);
createCookie(num,$pos[1]); 
 }
if(!cookie_exists(num)){ createCookie(num,1); }
if(!empty(pos)){ createCookie(num,pos); }
if(Number(readCookie(num)) > $total){ createCookie(num,1); } //use folder id to do an add, check on new album

if(dir === 'left'){ var x = -1;}
else if(dir === 'right'){ var x = +1;}
else { var x = 0;}
createCookie(num,Number(readCookie(num))+x);

var $xid = prefix+readCookie(num);
inLink(div,getContent($xid),'fade_in');
var $c_xid = $xid+'caption';
inLink(c_div,getContent($c_xid));

if($xid){
$xx = getId($xid);
if(!empty($xx)){
var $apid = getId($xid).getAttribute('apid');
location.hash = '#'+$apid;
inLink('_portal_parent',$apid);
//xlink('comments','id='+$apid,'comments_area');
}
}

$r = Number(readCookie(num));
if($total === 1){ openClose(left,'close'); openClose(right,'close'); }
else if($r === 1){ openClose(left,'close'); openClose(right,'open'); }
else if($r === $total){ openClose(right,'close'); openClose(left,'open'); }
else{ openClose(left,'open'); openClose(right,'open'); }

inLink(prefix+'total',$total);
inLink(prefix+'current',$r);
 }
function relocate(id){ 
var j = id+'zindex';
if(readCookie(j) == 2){ var num = 5; }else if(readCookie(j) == 5){ var num = 1; }else{ var num = 2; }
css(id,'zIndex',num);	
createCookie(j,num);
 } //v4!
function popup2(){
var j = window.open('','','width=640,height=480');
j.document.write("<p>This is 'myWindow'</p>");
j.focus();
 }
function popup(path,name,features) { window.open(path,name,features);}
function get($key){
var $i = location.href; 
var $u = $i.split('?');	
if(!empty($u[1])){
var $t = $u[1].split('&');
if(is_array($t)){
	for(var i=0; i< $t.length; i++){
	var $b = $t[i].split('=');
	if(!empty($key) && $key == $b[0]){ return $b[1]; }
	} 
}else{
	var $b = $u[1].split('=');
	if(!empty($key) && $key == $b[0]){ return $b[1]; }
}
}else{ return '';}
 } //v11!
//mobile redirect
function is_mobile(){
var width = screen.availWidth;
var height = screen.availHeight;
var resolution = (width >= height) ? width : height; 
return (resolution <= 1024) ? true : false;
 }
function view_is_mobile(){ 
var p = location.hostname;
var p = p.split('.');	
return (p[0] == 'm') ? true : false;
 }
function go_mobile(){ 
if(is_mobile() == true && view_is_mobile() == false){
var h = location.hostname; 
var x = location.href;
var x = x.split(h);
var url = 'http://m.'+h.replace('www.','');  
var c = check_file('m/kitnes.php',true);
if(c === 'true' || c === true){ document.location = url+x[1]; }
}
 }
//edit
function copy(id,name){
createCookie('clipboard',id);
alert(name+' has been copied unto the clipboard!');
openClose('dropDown','close');
 }
function paste(id){ 
if(cookie_exists('clipboard')){ inLink(id,readCookie('clipboard')); }
 }
function clear_copied(){ 
eraseCookie('clipboard');
alert('clipboard has been erased!');
openClose('dropDown','close');
 }
function cut(id,name){
if(confirm('If you decide to cut, the object will be put on the clipboard and then deleted after you paste. Do you wish to proceed?')){
copy(id,name);
css(id,'opacity',0.5);
}
	}
function cField(id){
createCookie('cField',id);
 }
function hideReplace($id,$content,$re){
if(empty($re) && cookie_exists('clipboard')){
inLink($id,readCookie('clipboard'));
openClose('dropDown','close');
enableDisable($id,'disable');
css($id,'type','hidden');	
inLink($id+'-hr',$content,'fade_in');
}else{
enableDisable($id,'enable');
inLink($id,'');
css($id,'type','text');	
inLink($id+'-hr','');
}
 }
function selectedText(){
var $txt = '';
if(window.getSelection){
$txt = window.getSelection();
}else if(document.getSelection){
$txt = document.getSelection();
}else if(document.selection){
$txt = document.selection.createRange().text;
}else{
return false;
}
if(!empty($txt)){ createCookie('selectedText',$txt); }
 }
function insertAtCursor(myField,myValue){ //myField accepts an object reference, myValue accepts the text strint to add
//IE support
if (document.selection) {
myField.focus();
/*in effect we are creating a text range with zero length at the cursor location and replacing it with myValue*/
sel = document.selection.createRange();
sel.text = myValue;
}
//Mozilla/Firefox/Netscape 7+ support
else if (myField.selectionStart || myField.selectionStart === '0') {
/*Here we get the start and end points of the selection. Then we create substrings up to the start of the selection and from the end point of the selection to the end of the field value. Then we concatenate the first substring, myValue, and the second substring to get the new value.*/
var startPos = myField.selectionStart;
var endPos = myField.selectionEnd;
myField.value = myField.value.substring(0, startPos)+ myValue+ myField.value.substring(endPos, myField.value.length);
} else {
myField.value += myValue;
}
if(getId('files')){
openClose('dropDown','close');
xlink('listLinks','string='+getContent('files'),'list_attachments');
}
 }
//new
function dump_cat($in,$out){ 
var $inn = getId($in).value;
if(!empty($inn)){ 
var $outt = getContent($out);	
var $c = !empty($outt) ? $outt.split(',') : Array();
$c.push($inn);
getId($out).value = $c.toString();
}
	}
function addslashes(str){
str=str.replace(/\\/g,'\\\\');
str=str.replace(/\'/g,'\\\'');
str=str.replace(/\"/g,'\\"');
str=str.replace(/\0/g,'\\0');
return str;
 }
function stripslashes(str){
str=str.replace(/\\'/g,'\'');
str=str.replace(/\\"/g,'"');
str=str.replace(/\\0/g,'\0');
str=str.replace(/\\\\/g,'\\');
return str;
 }
function add_s($id,$div){
var $str = getContent($div);
var $suf = $str.substr(-1);
if($id !== 1 && $suf !== 's'){ 
inLink($div,$str+'s'); 
}else if($id == 1 && $suf === 's'){ 
inLink($div,$str.substr(0,($str.length-1)));  
}
 }
//business
function openClose2(value,valueX,id){
return (value === valueX) ? openClose(id,'open') : openClose(id,'close');	
 }
function switchformfield($id,$x){
if($x === 'new'){ changeToInput($id); }	
 }
function changeToInput(obj){
var tb = document.createElement('INPUT');
tb.name = obj.getAttribute('name');
tb.type = 'text';
tb.value = ''; //obj.options[obj.selectedIndex].text;
obj.parentNode.insertBefore(tb,obj);
obj.parentNode.removeChild(obj);
 }
function clearfield(id){
getId(id).style.backgroundColor='';
 }
function swap(id,original,replacement){
(getId(id).innerHTML !== original) ? inLink(id,original) : inLink(id,replacement);
 }
function addUp(quantity,cost,total,qty2){
var qty = getId(quantity).value;
var qty22 = empty(qty2) ? 1 : getContent(qty2);	
var price = (getId(cost).value).replace(',','');	
getId(total).value = (qty * price * qty22).toFixed(2);
 }
function toPrice(amount,field){
var amt = (amount * 1).toFixed(2);
inLink(field,amt);	
	}
function clearComma(id){
var j = getId(id);
if(!empty(j)){ j.value = j.value.replace(',',''); }
 }
function money_format(id){
if(id){
var amount = getId(id).value.replace(',','');
var amt = (amount * 1).toFixed(2);
inLink(id,amt);	 
}
 }
//magnify image
function get_image_offset(e,id){ 
var x = getId(id);
offset_x = e.offsetX ? e.offsetX : e.pageX-x.offsetLeft;
offset_y = e.offsetY ? e.offsetY : e.pageY-x.offsetTop;
magnify(x);
 }
function magnify(elmnt){
var magnifier_settings = new Array();
magnifier_settings['widht'] = 100;
magnifier_settings['height'] = 100;
magnifier_settings['zoom_level'] = 2;
if(!getId('magnifier')){
var magnifier = document.createElement('div');
magnifier.id = 'magnifier';
magnifier.style.width = elmnt.width+'px'; //magnifier_settings['widht'];
magnifier.style.height = elmnt.height*0.5+'px'; //magnifier_settings['height'];
magnifier.style.overflow = 'hidden';
magnifier.style.border = '2px solid #000';
magnifier.style.position = 'fixed';
var magnifier_img = document.createElement('img');
magnifier_img.id = 'magnifier_img';
magnifier_img.src = elmnt.src;
magnifier_img.width = parseInt(elmnt.width)*magnifier_settings['zoom_level'];
magnifier_img.height = parseInt(elmnt.height)*magnifier_settings['zoom_level'];
}else{
var magnifier = getId('magnifier');
var magnifier_img = getId('magnifier_img');
}
magnifier.style.left = findPosX(elmnt.id)-parseInt(elmnt.width)+5+'px'; //offset_x+5+'px'; 
magnifier.style.top = findPosY(elmnt.id)+'px'; //offset_y+5+'px'; 
var s = parseInt(offset_x*magnifier_settings['zoom_level'])-(elmnt.width*0.5);
var c = parseInt(offset_y*magnifier_settings['zoom_level'])-(elmnt.height*0.25);
magnifier_img.style.marginLeft = '-'+s+'px';
magnifier_img.style.marginTop = '-'+c+'px';
if(!getId('magnifier')){
magnifier.appendChild(magnifier_img);
insertAfter(magnifier,elmnt);
 }
 }
function hide_magnifier(id){
var x = getId('magnifier'); 
if(x){ getId(tpNodeId(id)).removeChild(x); }
 }
function tpNodeId(id){
return getId(id).parentNode.getAttribute('id');	
	}
//move
function move_em(e){ //onmousedown
if(e === null){e = window.event;}
var sender = (typeof(window.event) != "undefined" ) ? e.srcElement : e.target; 
var $id = sender.id;
if(!$id) $id = sender.setAttribute('id',Math.random()); 
if(getId($id).getAttribute('m') === '1'){ 
mouseover=true;
var $l = parseInt(findPosX($id));
var $t = parseInt(findPosY($id));
var $x = e.clientX;
var $y = e.clientY;
document.onmousemove=function(e){
if(e === null){e = window.event;}
css($id,'left',$l+e.clientX-$x+"px");
css($id,'top',$t+e.clientY-$y+"px");
return false;
 };
}
 }
function halt_em(e){ //onmouseup
document.onmousemove=null;
document.onmousedown=null;
 }
//specials
function scale($id){
if(!empty($id)){
$width = getId($id).width;
$height = getId($id).height;
$incr = 1;
if($width > $height){
$w_ratio = 2*($width/$height); 
$new_height = (2*$incr)+$height; 
$new_width = ($w_ratio*$incr)+$width; 
}else{
$h_ratio = 2*($height/$width); 
$new_width = (2*$incr)+$width; 
$new_height = ($h_ratio*$incr)+$height; 	
}
css($id,'height',$new_height+'px');
css($id,'width',$new_width+'px'); 
}
 }
//utilities
function findPosX(obj){
var obj = getId(obj);
    var curleft = 0;
    if(obj.offsetParent){
        while(1){
          curleft += obj.offsetLeft;
          if(!obj.offsetParent){ break; }
          obj = obj.offsetParent;
        }
	}else if(obj.x){
        curleft += obj.x;
	}
    return curleft;
  } 
function findPosY(obj){
var obj = getId(obj);
    var curtop = 0;
    if(obj.offsetParent){
        while(1){
          curtop += obj.offsetTop;
          if(!obj.offsetParent){ break; }
          obj = obj.offsetParent;
        }
	}else if(obj.y){
        curtop += obj.y;
	}
    return curtop;
 } 
//others
function enableDisable(id,state){
	var j = getId(id);
	if(state==='enable'){
		j.disabled=false;	
	}else if(state==='disable'){
		j.disabled=true; 
		}
	}
function dropDownInnerSelect(id){
var x = getId(id);
return x.options[x.selectedIndex].text;
	}
function resizeTextarea(id){
var j = getId(id); 
var text = j.value.length;
var area = j.rows * j.cols;
var ratio = text / area;
var invratio = 1/ratio;
if(ratio > 1){ ++j.rows; }
for(var x=0; x < 1000; x++){
	if(invratio >= 2){ --j.rows;
	} else { break;
	}
}
inLink('textrows',j.rows);
 }
//misc 
function hex2num(hex){
	if(hex.charAt(0) === "#"){ hex = hex.slice(1); } //Remove the '#' char - if there is one.
	hex = hex.toUpperCase();
	var hex_alphabets = "0123456789ABCDEF";
	var value = [3];
	var k = 0;
	var int1,int2;
	for(var i=0;i< 6;i+=2) {
		int1 = hex_alphabets.indexOf(hex.charAt(i));
		int2 = hex_alphabets.indexOf(hex.charAt(i+1)); 
		value[k] = (int1 * 16) + int2;
		k++;
	}
	return(value);
 }
function num2hex(triplet){
	var hex_alphabets = "0123456789ABCDEF";
	var hex = "#";
	var int1,int2;
	for(var i=0;i< 3;i++) {
		int1 = triplet[i] / 16;
		int2 = triplet[i] % 16;

		hex += hex_alphabets.charAt(int1) + hex_alphabets.charAt(int2); 
	}
	return(hex);
 }
load_start(); 
