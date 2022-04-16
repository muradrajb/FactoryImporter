function SentenceCase(string) {
    return string.toLocaleLowerCase().charAt(0).toUpperCase() + string.slice(1);
  }
  
  module.exports = { 
    SentenceCase
}