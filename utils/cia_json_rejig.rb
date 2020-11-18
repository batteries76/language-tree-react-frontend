require 'json'
json_from_file = File.read('./cia-world.json')
hash = JSON.parse(json_from_file)

super_array = []

hash['countries'].each do |key, value|
    puts key
    super_array << value
end

print super_array[1]
puts

File.open("./cia-world-array.json","w") do |f|
    f.write(super_array.to_json)
end