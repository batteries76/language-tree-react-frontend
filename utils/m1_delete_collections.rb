require 'mongo'

if !(ARGV.length > 0)
    puts "This file needs an argument to run"
    abort "Exiting"
end

client = Mongo::Client.new('mongodb+srv://batteries76:roQby9-tobsoz-zakqen@cluster0-7uukp.mongodb.net', database: 'language-tree-db') # OR
# db = Mongo::Connection.new("localhost").db("mydb") # OR
# db = Mongo::Connection.new("localhost", 27017).db("mydb")
# langTree.collection(`${partialPath}-stripped-tree`).drop()
# langTree.collection(`${partialPath}-accumulated-geo`).drop()
# langTree.collection(`${partialPath}-accumulated-deflated`).drop()
# langTree.collection(`${partialPath}-percentages-deflated`).drop()
# langTree.collection(`${partialPath}-paths`).drop()

language_tree = client.database
print language_tree.collections
puts 

if ARGV.first == 'indo'
    file_path_partial = 'indo-european'
    stripped = 'indo-european-stripped-tree'
    language_tree[stripped.to_sym].drop
    accumulated = 'indo-european-accumulated-geo'
    language_tree[accumulated.to_sym].drop
    accu_deflated = 'indo-european-accumulated-deflated'
    language_tree[accu_deflated.to_sym].drop
    percent_deflated = 'indo-european-percentages-deflated'
    language_tree[percent_deflated.to_sym].drop
    paths = 'indo-european-paths'
    language_tree[paths.to_sym].drop
elsif ARGV.first == 'sino'
    file_path_partial = 'sino-caucasian'
    stripped = 'sino-caucasian-stripped-tree'
    language_tree[stripped.to_sym].drop
    accumulated = 'sino-caucasian-accumulated-geo'
    language_tree[accumulated.to_sym].drop
    accu_deflated = 'sino-caucasian-accumulated-deflated'
    language_tree[accu_deflated.to_sym].drop
    percent_deflated = 'sino-caucasian-percentages-deflated'
    language_tree[percent_deflated.to_sym].drop
    paths = 'sino-caucasian-paths'
    language_tree[paths.to_sym].drop
else
    puts "This is not a recognised option."
    abort "Exiting.."
end 