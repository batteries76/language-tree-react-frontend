require 'json'
require 'pry'

puts 'STARTING THE GEO-ACCUMULATOR'

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

# json_from_file = File.read('../data/language-tree-output.json')
json_from_file = File.read("../data/#{file_path_partial}-tree-geo-output.json")
tree_hash = JSON.parse(json_from_file)

tree_hash['geo'] = []

counter = 0

def find_all_nodes(top_node, array_of_nodes)
    puts "FIND ALL NODES"
    puts top_node['name']
    array_of_nodes << top_node
    top_node['children'].each do |node|
        find_all_nodes(node, array_of_nodes)
    end
end

def accumulate_geo(node)
    # print "START OF ACCUMULATE"
    # print node
    # puts

    # binding.pry
    if !node['countriesPercentagesCodesAndGeo']
        node['countriesPercentagesCodesAndGeo'] = []
    end

    # ******
    # tester for just the country names
    # node['geo'] = node['countriesPercentagesCodesAndGeo'].map do |country|
        # binding.pry
    #     country['countryName']
    # end 

    # binding.pry

    accumulated_data = []

    node['children'].each do |child|
        # if child['geo']
        if child['countriesPercentagesCodesAndGeo']
            # list_of_country_names = child['geo'].map do |country|
            # list_of_country_names = child['countriesPercentagesCodesAndGeo'].map do |country|
            #     country['countryName']
            # end 
            # accumulated_data += child['geo']

            if node['name'] == 'Baltic'
                # binding.pry
            end
            accumulated_data += child['countriesPercentagesCodesAndGeo']
        end
    end

    # node['geo'] += accumulated_data
    node['countriesPercentagesCodesAndGeo'] += accumulated_data

    # node['geo'] = node['geo'].uniq
    node['countriesPercentagesCodesAndGeo'] = node['countriesPercentagesCodesAndGeo'].uniq {|elem| elem['countryName']}
    # a.uniq! {|e| e[:color] }

    puts "END OF ACCUMULATE"
    # print node['geo']
    puts
end

def produce_final_tree(node_array)

    indo_head = node_array.shift
    

    150000.times do
        node_array.shuffle!
        # if node_array.first['name'] == 'Eastern Baltic'
            # binding.pry
        # end
        accumulate_geo(node_array.last)
        # node_array.pop
    end

    accumulate_geo(indo_head)

    final_result = indo_head

    return final_result
end

# while counter <= 10000
all_nodes = []
find_all_nodes(tree_hash, all_nodes)
tree_hash = produce_final_tree(all_nodes)
#     counter += 1
# end

# puts
# puts "FINAL NODE"
# puts
# print final_result
# puts
# print final_result[:geo]
# puts
# puts

lookup = {}

def create_lookup(node, lookup)
    # lookup[node['name'].to_sym] = node['geo']
    lookup[node['name'].to_sym] = node['countriesPercentagesCodesAndGeo']
    node['children'].each do |child|
        create_lookup(child, lookup)
    end  
end

create_lookup(tree_hash, lookup)

# puts "LOOKUP"
# print lookup
puts 
puts 

simple_array = []

def create_array_for_db(node, array)
    hash = {}
    hash[:name] = node['name']
    # hash[:geo] = node['geo']
    hash[:geo] = node['countriesPercentagesCodesAndGeo']
    array << hash
    node['children'].each do |child|
        create_array_for_db(child, array)
    end 
end

create_array_for_db(tree_hash, simple_array)

puts
puts
puts
puts
puts
puts
puts
puts
puts '******************************************************************'
puts '******************************************************************'
puts '******************************************************************'
puts '******************************************************************'
puts '******************************************************************'
puts
puts
puts
puts
puts
puts

# puts "SIMPLE ARRAY"
# print simple_array
puts 
puts 
puts "COUNTER"
puts counter
puts 
puts

# File.open('../data/geodata-array-output.json', 'w') do |f|
File.open("../data/#{file_path_partial}-geodata-array-output.json", 'w') do |f|
    f.write(simple_array.to_json)
end

puts 'ENDING THE GEO-ACCUMULATOR'
