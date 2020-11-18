#!/bin/bash
set -e

echo "RUNNING THE DATA PROCESSING SCRIPT!"

echo $1

tree_to_process=$1

# echo $tree_to_process

if [ $tree_to_process = 'sino' ]
then
    echo "sino was input"
    ruby shell_script_tester.rb $tree_to_process
    file_path_partial='sino-caucasian'
    
elif [ $tree_to_process = 'indo' ]
then
    echo "indo was input"
    file_path_partial='indo-european'
else
    echo "$1 was input, and is not a valid argument"
    echo 'The current options are "sino" and "indo"'
    exit 23
fi 

# ruby shell_script_tester.rb $tree_to_process
ruby 1_geo_builder.rb $tree_to_process
ruby 2_geo_accumulator.rb $tree_to_process
ruby 3_strip_tree_geo.rb $tree_to_process
ruby 4_deflate_accumulated_data.rb $tree_to_process
ruby 5_deflate_percentage_data.rb $tree_to_process
ruby 6_path_builder.rb $tree_to_process

echo "Ruby scripts have run"

echo "DROPPING COLLECTIONS"

# mongo mongodb+srv://batteries76:roQby9-tobsoz-zakqen@cluster0-7uukp.mongodb.net
# mongo --eval 'use language-tree-db'

ruby m1_delete_collections.rb $tree_to_process

if [ $tree_to_process = 'sino' ]
then
    echo "SINO MONGO IMPORTS.."

    mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-7uukp.mongodb.net:27017,cluster0-shard-00-01-7uukp.mongodb.net:27017,cluster0-shard-00-02-7uukp.mongodb.net:27017 --ssl --username batteries76 --password roQby9-tobsoz-zakqen --authenticationDatabase admin --db language-tree-db --collection sino-caucasian-stripped-tree --type json --file ../data/sino-caucasian-stripped-tree.json

    # mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-7uukp.mongodb.net:27017,cluster0-shard-00-01-7uukp.mongodb.net:27017,cluster0-shard-00-02-7uukp.mongodb.net:27017 --ssl --username batteries76 --password roQby9-tobsoz-zakqen --authenticationDatabase admin --db language-tree-db --collection accumulated-geo-sino-caucasian --type json --file sino-caucasian-geodata-array-output.json —jsonArray

    mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-7uukp.mongodb.net:27017,cluster0-shard-00-01-7uukp.mongodb.net:27017,cluster0-shard-00-02-7uukp.mongodb.net:27017 --ssl --username batteries76 --password roQby9-tobsoz-zakqen --authenticationDatabase admin --db language-tree-db --collection sino-caucasian-accumulated-deflated --type json --file ../data/sino-caucasian-deflated-accumulated.json --jsonArray

    mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-7uukp.mongodb.net:27017,cluster0-shard-00-01-7uukp.mongodb.net:27017,cluster0-shard-00-02-7uukp.mongodb.net:27017 --ssl --username batteries76 --password roQby9-tobsoz-zakqen --authenticationDatabase admin --db language-tree-db --collection sino-caucasian-percentages-deflated --type json --file ../data/sino-caucasian-deflated-percentages.json --jsonArray

    mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-7uukp.mongodb.net:27017,cluster0-shard-00-01-7uukp.mongodb.net:27017,cluster0-shard-00-02-7uukp.mongodb.net:27017 --ssl --username batteries76 --password roQby9-tobsoz-zakqen --authenticationDatabase admin --db language-tree-db --collection sino-caucasian-paths --type json --file ../data/sino-caucasian-paths.json --jsonArray

elif [ $tree_to_process = 'indo' ]
then
    echo "INDO MONGO IMPORTS.."

    mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-7uukp.mongodb.net:27017,cluster0-shard-00-01-7uukp.mongodb.net:27017,cluster0-shard-00-02-7uukp.mongodb.net:27017 --ssl --username batteries76 --password roQby9-tobsoz-zakqen --authenticationDatabase admin --db language-tree-db --collection indo-european-stripped-tree --type json --file ../data/indo-european-stripped-tree.json

    # mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-7uukp.mongodb.net:27017,cluster0-shard-00-01-7uukp.mongodb.net:27017,cluster0-shard-00-02-7uukp.mongodb.net:27017 --ssl --username batteries76 --password roQby9-tobsoz-zakqen --authenticationDatabase admin --db language-tree-db --collection accumulated-geo-indo-european --type json --file indo-european-geodata-array-output.json —jsonArray

    mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-7uukp.mongodb.net:27017,cluster0-shard-00-01-7uukp.mongodb.net:27017,cluster0-shard-00-02-7uukp.mongodb.net:27017 --ssl --username batteries76 --password roQby9-tobsoz-zakqen --authenticationDatabase admin --db language-tree-db --collection indo-european-accumulated-deflated --type json --file ../data/indo-european-deflated-accumulated.json --jsonArray

    mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-7uukp.mongodb.net:27017,cluster0-shard-00-01-7uukp.mongodb.net:27017,cluster0-shard-00-02-7uukp.mongodb.net:27017 --ssl --username batteries76 --password roQby9-tobsoz-zakqen --authenticationDatabase admin --db language-tree-db --collection indo-european-percentages-deflated --type json --file ../data/indo-european-deflated-percentages.json --jsonArray

    mongoimport --host Cluster0-shard-0/cluster0-shard-00-00-7uukp.mongodb.net:27017,cluster0-shard-00-01-7uukp.mongodb.net:27017,cluster0-shard-00-02-7uukp.mongodb.net:27017 --ssl --username batteries76 --password roQby9-tobsoz-zakqen --authenticationDatabase admin --db language-tree-db --collection indo-european-paths --type json --file ../data/indo-european-paths.json --jsonArray

else
    echo "$1 was input, and is not a valid argument"
    exit 23
fi 

echo "JOB ALL DONE!"