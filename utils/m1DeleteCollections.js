const MongoClient = require('mongodb').MongoClient

console.log("IN THE NODE COLLECTION DELETER")

if (process.argv.length === 2) {
    console.error('Expected at least one argument!');
    process.exit(1);
}

MongoClient.connect('mongodb+srv://batteries76:roQby9-tobsoz-zakqen@cluster0-7uukp.mongodb.net', (err, database) => {
    console.log("In the Mongo connection")
    if (err) {
        console.log("IN THE ERROR")
        return console.log(err);
    }

    const langTree = database.db('language-tree-db')
    const fileArg = process.argv[2]

    if (fileArg === 'sino') {
        var partialPath = 'sino-caucasian'
    }
    else if (fileArg === 'indo') {
        var partialPath = 'indo-european'
    }
    else {
        console.log("Not a valid argument when running this file.")
        process.on('exit', function(code) {
            return console.log(`About to get outta here ${code}`);
        });
    }

    langTree.collection(`${partialPath}-stripped-tree`).drop()
    langTree.collection(`${partialPath}-accumulated-geo`).drop()
    langTree.collection(`${partialPath}-accumulated-deflated`).drop()
    langTree.collection(`${partialPath}-percentages-deflated`).drop()
    langTree.collection(`${partialPath}-paths`).drop()
})

console.log("COMPLETED DROPPING THE COLLECTIONS")
