require 'pry'
require 'json'
require 'httparty'

puts 'STARTING THE PATH BUILDER'

# {"name":"Lycean","level id":103,"alive":"n","children":[],"iso6393":"xxx","countriesPercentagesCodesAndGeo":[]}

if !(ARGV.length > 0)
    puts "This file needs an argument to run"
    exit "Exiting"
end

if ARGV.first == 'indo'
    file_path_partial = 'indo-european'
elsif ARGV.first == 'sino'
    file_path_partial = 'sino-caucasian'
else
    puts "This is not a recognised option."
    abort "Exiting.."
end 

json_from_file = File.read("../data/#{file_path_partial}-stripped-tree.json")
tree = JSON.parse(json_from_file)

final_hash = {}
final_hash['start'] = [tree['name']]

def build_tree_hash(tree, hash)
    hash[tree['name']] = []
    tree['children'].each do |child|
        hash[tree['name']] << child['name']
    end
    tree['children'].each do |child|
        build_tree_hash(child, hash)
    end
end

build_tree_hash(tree, final_hash)

print(final_hash)
puts

class NodeFind
    attr_accessor :result_node

    def initialize
        @tree
        @result_node
    end
    def find_node(tree_node, value)
        # @result_node = nil        # puts tree_node['name']
        if tree_node['name'] == value
            puts "TRIGGER"
            @result_node = tree_node
            return
        end
        tree_node['children'].each do |child|
            find_node(child, value)
        end
    end 
end

find_instance = NodeFind.new

find_instance.find_node(tree, 'p')
puts "RESULT 1"
puts find_instance.result_node

find_instance.find_node(tree, 'g')
puts "RESULT 2"
puts find_instance.result_node
puts

def build_arrays(path_hash, key, final_array, tree)
    # binding.pry 
    puts "hit BUILD ARRAYS"
    # binding.pry
    if key == 'start'
        particular_path_hash = {
            'name' => path_hash[key].first,
            'path' => [tree]
        }
        final_array << particular_path_hash
    else 
        loop_final_array = final_array.select {|e| true }
        # binding.pry
        path_hash[key].each do |element|
            puts "BACK IN THE PATH HASH LOOP"
            # binding.pry
            loop_final_array.each do |final_array_element|
                puts "FINAL ARRAY"
                # print final_array
                # puts
                # puts "INNER LOOP"
                # puts "PATH_HASH[:path]"
                # print final_array_element[:path]
                # puts
                # puts "ELEMENT"
                # puts element 
                # puts "KEY"
                # puts key
                # binding.pry
                # array_of_hashes.any? {|h| h[:a] == 11}
                if final_array_element['path'].any? { |h| h['name'] == key }
                    puts "********************** IF TAKEN"
                    new_path = final_array_element['path'].select {|e| true }
                    find_instance = NodeFind.new
                    find_instance.find_node(tree, element)
                    new_path << find_instance.result_node
                    particular_path_hash = Hash.new
                    particular_path_hash['name'] = element
                    particular_path_hash['path'] = new_path
                    final_array << particular_path_hash
                    # binding.pry
                end
            end
        end 
    end 
    if final_array.length == 300
        binding.pry
    end
    path_hash[key].each do |value|
        build_arrays(path_hash, value, final_array, tree)
    end 
end

final_array = []
build_arrays(final_hash, 'start', final_array, tree)

puts "FINAL_ARRAY Length"
# print final_array
puts final_array.length

File.open("../data/#{file_path_partial}-paths.json", 'w') do |f|
    f.write(final_array.to_json)
end

# binding.pry
puts 'ENDING THE PERCENTAGE DEFLATOR'