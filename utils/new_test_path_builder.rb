require 'pry'

puts "IN THE TESTNPATH  BUILDER"

tree = {
    name: "a",
    children: [
        {
            name: "b",
            children: []
        },
        {
            name: "c",
            children: [
                {
                    name: "e",
                    children: []
                },
                {
                    name: "f",
                    children: [
                        {
                            name: 'i',
                            children: []
                        }
                    ]
                },
                {
                    name: "g",
                    children: []
                }
            ]
        },
        {
            name: "d",
            children: [
                {
                    name: "h",
                    children: []
                }
            ]
        }
    ]
}

final_hash = {}
final_hash[:start] = [tree[:name]]

def build_tree_hash(tree, hash)
    hash[tree[:name].to_sym] = []
    tree[:children].each do |child|
        hash[tree[:name].to_sym] << child[:name]
    end
    tree[:children].each do |child|
        build_tree_hash(child, hash)
    end
end

build_tree_hash(tree, final_hash)

print(final_hash)
puts

class NodeFind
    attr_accessor :result_node

    def initialize
        @result_node
    end
    def find_node(tree_node, value)
        # @result_node = nil        # puts tree_node[:name]
        if tree_node[:name] == value
            puts "TRIGGER"
            @result_node = tree_node[:name]
            return
        end
        tree_node[:children].each do |child|
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

def build_arrays(path_hash, key, final_array)
    puts "hit BUILD ARRAYS"
    if key == 'start'
        particular_path_hash = {
            name: path_hash[key.to_sym].first,
            path: path_hash[key.to_sym]
        }
        final_array << particular_path_hash
    else 
        loop_final_array = final_array.select {|e| true }
        path_hash[key.to_sym].each do |element|
            puts "BACDK IN THE PATH HASH LOOP"
            # binding.pry
            loop_final_array.each do |final_array_element|
                puts "FINAL ARRAY"
                print final_array
                puts
                puts "INNER LOOP"
                puts "PATH_HASH[:path]"
                print final_array_element[:path]
                puts
                puts "ELEMENT"
                puts element 
                puts "KEY.TO_S"
                puts key.to_s
                # binding.pry
                if final_array_element[:path].include? key.to_s
                    puts "IF TAKEN"
                    new_path = final_array_element[:path].select {|e| true }
                    particular_path_hash = Hash.new
                    particular_path_hash[:name] = element
                    particular_path_hash[:path] = new_path << element
                    final_array << particular_path_hash
                    # binding.pry
                end
            end
        end 
    end 
    # binding.pry
    path_hash[key.to_sym].each do |value|
        build_arrays(path_hash, value, final_array)
    end 
end

final_array = []
build_arrays(final_hash, 'start', final_array)

print final_array
puts
