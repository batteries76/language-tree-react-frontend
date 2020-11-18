
require 'json'

puts 'STARTING THE ACCUMULATION DEFLATER'

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

json_from_file = File.read("../data/#{file_path_partial}-geodata-array-output.json")
geo_array = JSON.parse(json_from_file)

language_family_hash = {}

puts "BNMSBMNSBMNSBSM"
puts geo_array[0]['name']

new_geo_accumulation_array = []

def reduce_factor(length)
    if length > 50 
        return 12
    elsif length > 25
        return 8
    elsif length > 12
        return 4
    elsif length > 6
        return 2
    else 
        return 1
    end
end

geo_array.each do |element|

    language_family_hash = element
    puts "LLKKJJGGSS"

    new_geo_array = []
    reducer = reduce_factor(element['geo'].length)

    element['geo'].each do |country_data|
        puts "WHHAT THE FK"
        geo_hash = country_data

        if country_data['geoData']
            if !country_data['geoData'][0].kind_of?(Array)
                puts "FLAT DATA?" 
                puts country_data['countryName']
                new_country_geo = []
                country_data['geoData'].each_with_index do |lat_lng, i|
                    if i % reducer == 0
                        new_country_geo << lat_lng
                    end
                end
            else 
                puts "DOUBLE ARRAY DATA?" 
                puts country_data['countryName']
                new_country_geo = []
                country_data['geoData'].each do |inner_array|
                    new_inner_array = []
                    inner_array.each_with_index do |lat_lng, i|
                        if i % reducer == 0
                            new_inner_array << lat_lng
                        end
                    end
                    new_country_geo << new_inner_array
                end
            end
        end
        geo_hash['geoData'] = new_country_geo
        new_geo_array << geo_hash
    end 
    language_family_hash['geo'] = new_geo_array
    new_geo_accumulation_array << language_family_hash
end

File.open("../data/#{file_path_partial}-deflated-accumulated.json", 'w') do |f|
    f.write(new_geo_accumulation_array.to_json)
end

puts 'ENDING THE ACCUMULATED DATA DEFLATER'
