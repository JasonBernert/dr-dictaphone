function fixSyntax(string){

  string.replace(/.+?[\.\?\!](\s|$)/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

  const questions = ['who','what','where','when','why'];
    if (string.startsWith(...questions)){
      string += '?';
    } else {
      string += '.';
    }

  return string;
}
