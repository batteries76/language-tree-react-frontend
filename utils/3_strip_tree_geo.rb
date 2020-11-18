

require 'json'
require 'httparty'

puts 'STARTING THE TREE STRIPPER'

# {"name":"Lycean","level id":103,"alive":"n","children":[],"iso6393":"xxx","countriesPercentagesCodesAndGeo":[]}

if !(ARGV.length > 0)
    puts "This file needs an argument to run"
    abort "Exiting"
end

if ARGV.first == 'indo'
    file_path_partial = 'indo-european'
elsif ARGV.first == 'sino'
    file_path_partial = 'sino-caucasian'
else
    puts "This is not a recognised option."
    abort "Exiting.."
end 

json_from_file = File.read("../data/#{file_path_partial}-tree-geo-output.json")
tree_hash = JSON.parse(json_from_file)

# url = 'http://localhost:3900/api'
# url = 'https://still-island-98218.herokuapp.com/api'

# countries_info_response = HTTParty.get(url + '/country-info')
# country_geo_data = HTTParty.get(url + '/country-geo-all')

geo_data = []

def strip_geo_data(node, array)

    # add family tree info to node

    if ARGV.first == 'indo'
        node['family'] = 'Indo-European'
    elsif ARGV.first == 'sino'
        node['family'] = 'Sino-Caucasian'
    else
        puts "This is not a recognised option."
        abort "Exiting.."
    end

    # puts "NODE class"
    # puts node.class
    # print node['name']
    # puts 
    # print node['children']
    # puts 
    new_geo_hash = {
        name: node['name'],
        countriesPercentagesCodesAndGeo: node['countriesPercentagesCodesAndGeo']
    }
    array << new_geo_hash
    node['countriesPercentagesCodesAndGeo'] = []
    node['children'].each do |child|
        strip_geo_data(child, array)
    end
end

strip_geo_data(tree_hash, geo_data)

File.open("../data/#{file_path_partial}-percentages-geodata.json", 'w') do |f|
    f.write(geo_data.to_json)
end

File.open("../data/#{file_path_partial}-stripped-tree.json", 'w') do |f|
    f.write(tree_hash.to_json)
end

puts 'ENDING THE TREE-STRIPPER'