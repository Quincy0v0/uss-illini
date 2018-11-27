export default function parseJson(str){
  if (str == undefined){
    return str;
  }
  str = strParseJson(str,"")
  var retstr = "";
  for(var i = 0; i < str.length - 1; i++){
    if(str[i] == "}" && str[i+1] == '"'){
      retstr += "}" ;
      i += 1;
    }else if(str[i] == '"' && str[i+1] == '{'){
      retstr += "{" ;
      i += 1;
    }else if(str[i] != '}'&& str[i+1] == '}' &&str[i] != '"' ) {
      retstr += str[i] + '"' ;
    }else{
      retstr += str[i];
    }
  }
  retstr += "}"
  return JSON.parse(retstr);
}

function strParseJson(str,retstr){
  for(var i = 0; i < str.length; i ++){
    if(str[i] == "{"){
        var j = findClosingBracketMatchIndex(str, i);
        var substr = str.substring(i+1, j);
        retstr += '{"';
        var newstr = strParseJson(substr,retstr);
    }else if(str[i] == ":"){
        retstr += '":"';
    }else if(str[i] == ","){
        retstr += '","';
    }else{
        retstr += str[i];
    }
  }
  return retstr;
}

function findClosingBracketMatchIndex(str, pos) {
  if (str[pos] != '{') {
    throw new Error("No '{' at index " + pos);
  }
  let depth = 1;
  for (let i = pos + 1; i < str.length; i++) {
    switch (str[i]) {
    case '{':
      depth++;
      break;
    case '}':
      if (--depth == 0) {
        return i;
      }
      break;
    }
  }
  return -1;    // No matching closing parenthesis
}

var input = "{torpedo_distance:3.7,plane_level:6,squadrons:1,name:Douglas TBD,cruise_speed:121,prepare_time:32,torpedo_damage:9867,count_in_squadron:{max:6,min:6},torpedo_max_speed:34,torpedo_bomber_id_str:PAUB501,gunner_damage:11,max_damage:9867,max_health:1210,torpedo_bomber_id:3769577456,torpedo_name:Mk13 mod. 0A}";
