/* eslint-disable */
export const toUpperCase = (str) => {
    if (str[0]) {
        return str.replace(str[0], str[0].toUpperCase())
    } else {
        return ''
    }
}

export const toLowerCase = (str) => {
    if (str[0]) {
        return str.replace(str[0], str[0].toLowerCase())
    } else {
        return ''
    }
}

// 驼峰转换下划线
export const toSQLLine = (str) => {
    if (str === 'ID') return 'id'
    return str.replace(/([A-Z])/g, "_$1").toLowerCase();
}

// 下划线转换驼峰
export const toHump = (name) => {
    return name.replace(/\_(\w)/g, function(all, letter) {
        return letter.toUpperCase();
    });
}

export const ParseJson = (str) => {
  if (typeof str == 'string') {
    try {
      var obj = JSON.parse(str);
      if (typeof obj == 'object') {
        return obj;
      } else {
        return str;
      }
    } catch (e) {
      return str;
    }
  }
  return str;
}

export const HtmlRgbColorText = (text,r, g, b) => {
    return '<nobr style="color:rgb('+r+','+g+','+b+')">'+text+'</nobr>'
}

export const HtmlColorText = (text,color) => {
    return '<nobr style="color:'+color+'">'+text+'</nobr>'
}

export const HtmlelTag = (text,type) => {
    return '<el-tag type="'+type+'">'+text+'</el-tag>'
}

// 生成随机字符串
export const randomString = (len) => {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; 
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}