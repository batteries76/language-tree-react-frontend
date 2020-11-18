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

final_array = []
level = 0

def path_find(tree, continuing_array, final_array)
    puts "START"
    puts "TREE name"
    print tree[:name]
    puts 
    puts
    puts "CONTINUING"
    print continuing_array
    puts 
    puts "FINAL"
    print final_array
    puts
    continuing_array << tree[:name] 
    final_array << continuing_array
    continuing_array_copy = continuing_array.select {|e| true }
    puts "AFTER THE MIDDLE"
    puts "TREE name"
    print tree[:name]
    puts 
    puts "CONTINUING"
    print continuing_array
    puts 
    puts "FINAL"
    print final_array
    puts
    puts "END"
    puts
    tree[:children].each do |child|
        path_find(child, continuing_array_copy, final_array)
    end 
end

path_find(tree, [], final_array)

print(final_array)
puts