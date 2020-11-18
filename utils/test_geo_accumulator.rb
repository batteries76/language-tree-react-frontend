require 'json'

puts 'IN THE GEO-ACCUMULATOR'

json_from_file = File.read('../data/language-tree.json')
tree_hash = JSON.parse(json_from_file)

small_tree = {
    name: "a",
    children: [
        {
            name: "b",
            geo: [4, 9, 1],
            children: [
                
            ]
        },
        {
            name: "c",
            geo: [9, 5, 6],
            children: [
                {
                    name: "e",
                    children: [
                        {
                            name: "h",
                            geo: [9, 7, 8],
                            children: [
                                
                            ]
                        }
                    ]
                },
                {
                    name: "f",
                    geo: [3, 4, 5],
                    children: [
                        
                    ]
                }
            ]
        },
        {
            name: "d",
            children: [
                {
                    name: "g",
                    geo: [1, 2, 3],
                    children: [
                        
                    ]
                },
                {
                    name: "i",
                    geo: [2, 3, 4],
                    children: [

                    ]
                }
            ]
        }
    ]
}

all_nodes = []

def find_all_nodes(top_node, array_of_nodes)
    puts "FIND ALL NODES"
    puts top_node[:name]
    array_of_nodes << top_node
    top_node[:children].each do |node|
        find_all_nodes(node, array_of_nodes)
    end
end

def accumulate_geo(node)
    print "START OF ACCUMULATE"
    print node
    puts
    if !node[:geo]
        node[:geo] = []
    end

    accumulated_data = []
    node[:children].each do |child|
        if child[:geo]
            accumulated_data += child[:geo]
        end
    end

    node[:geo] += accumulated_data

    node[:geo] = node[:geo].uniq

    print "END OF ACCUMULATE"
    print node
    puts
end

find_all_nodes(small_tree, all_nodes)

puts all_nodes
puts

def produce_final_tree(node_array)

    node_array.reverse!

    while node_array.length > 1
        accumulate_geo(node_array.first)
        node_array.shift
    end

    accumulate_geo(node_array.first)

    final_result = node_array.first

    return final_result
end

final_result = produce_final_tree(all_nodes)

puts
puts "FINAL NODE"
puts
print final_result
puts
print final_result[:geo]
puts
puts

lookup = {}

def create_lookup(node, lookup)
    lookup[node[:name].to_sym] = node[:geo]
    node[:children].each do |child|
        create_lookup(child, lookup)
    end  
end

create_lookup(final_result, lookup)

puts "LOOKUP"
print lookup
puts 
puts 

simple_array = []

def create_array_for_db(node, array)
    hash = {}
    hash[:name] = node[:name]
    hash[:geo] = node[:geo]
    array << hash
    node[:children].each do |child|
        create_array_for_db(child, array)
    end 
end

create_array_for_db(final_result, simple_array)

puts "SIMPLE ARRAY"
print simple_array
puts 
puts 
