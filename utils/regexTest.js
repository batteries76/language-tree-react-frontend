if (/[a-zA-Z0-9-_ ]/.test("")) {
    console.log("VALID KEY")
    // this.languageSearchValue = event.target.value
    // this.returnSubsetList(this.languageSearchValue)
}
else {
    console.log("INVALID KEY")
}

var text = "foo-bar loo zoo moo                                ";
text = text.toLowerCase()
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join('-')
    .trim();
console.log(text)
console.log(text.length)