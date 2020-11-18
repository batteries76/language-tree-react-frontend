require 'json'
require 'httparty'

puts 'STARTING THE GEO-BUILDER'

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
    abort "Exiting"
end 

json_from_file = File.read("../data/#{file_path_partial}-language-tree.json")

tree_hash = JSON.parse(json_from_file)

# url = 'http://localhost:3900/api'
url = 'https://still-island-98218.herokuapp.com/api'

countries_info_response = HTTParty.get(url + '/country-info')
country_geo_data = HTTParty.get(url + '/country-geo-all')

def process_coordinates(geo_data_array)
    processed_data = []
    # puts("GEODATA ARRAY")
    # print(geo_data_array)
    # puts
    geo_data_array.each do |geodata_for_one_country|
        # puts(geodata_for_one_country)
        geodata_for_one_country.each do |coord_array|
            # puts("COord_arRAY")
            # print(coord_array)
            # puts
            # puts("coord_array[0][0]")
            # print(coord_array[0][0])
            # puts
            # puts("IF !coord_array[0][0].is_a? Numeric")
            # puts(!coord_array[0][0].is_a?(Numeric))
            if (!coord_array[0][0].is_a?(Numeric)) 
                # puts("TRUE PATH")
                coord_array.each do |coord_array_batch|
                    # puts("COord_arRAY BATCH")
                    # print(coord_array_batch)
                    # puts
                    coord_batch = []
                    coord_array_batch.each do |coord_array|
                        coord_hash = {
                            lat: coord_array[1],
                            lng: coord_array[0]
                        }
                        coord_batch << coord_hash
                    end
                    processed_data << coord_batch
                end
            else 
                # puts("FALSE PATH")
                coord_array.each do |coord_couple|
                    coord_object = {
                        lat: coord_couple[1],
                        lng: coord_couple[0]
                    }
                    processed_data << coord_object
                end
            end
        end
    end
    return processed_data
end

def add_data_to_tree(tree_element, countries_info, geo_data)

    # url = 'http://localhost:3900/api'
    url = 'https://still-island-98218.herokuapp.com/api'

    puts tree_element['name']

    # Get the relevant countries
    cia_countries_response = HTTParty.get(url + '/cia-data' + '?' + "language=#{tree_element['name']}")
    # response = HTTParty.get(url + '/cia-data' + '?' + "language=Cantonese")
    country_array_data = JSON(cia_countries_response.body)
    num_countries_for_this_language = country_array_data.length
    puts "There are #{num_countries_for_this_language} countries for this language"
    # print hash_data
    # puts
    tree_element['countriesPercentagesCodesAndGeo'] = country_array_data

    tree_element['countriesPercentagesCodesAndGeo'].each do |cia_country|
        countries_info.each do |country_info_element|
            if cia_country['countryName'] == country_info_element['name']['common']
                cia_country['countryCode'] = country_info_element['cca2'].downcase
            end
        end
    end

    tree_element['countriesPercentagesCodesAndGeo'].each do |country_data| 
        geo_data.each do |geo_data_element|
            # print geo_data_element
            # puts
            if country_data['countryCode'] == geo_data_element['features'][0]['properties']['cca2']
                country_data['geoData'] = process_coordinates([geo_data_element['features'][0]['geometry']['coordinates']])
            end
        end
    end

    tree_element['children'].each do |child_node|
        add_data_to_tree(child_node, countries_info, geo_data)
    end

end

add_data_to_tree(tree_hash, countries_info_response, country_geo_data)

File.open("../data/#{file_path_partial}-tree-geo-output.json", 'w') do |f|
    f.write(tree_hash.to_json)
end

puts 'ENDING THE GEO-BUILDER'
