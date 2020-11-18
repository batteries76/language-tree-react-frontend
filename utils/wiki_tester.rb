require 'httparty'
require 'json'

url = 'http://en.wikipedia.org/w/api.php'

# action=query&list=search&srsearch=Craig%20Noone&format=jsonfm
wiki_response = HTTParty.get(url + '?action=query&list=search&srsearch=Cantonese%20language&format=json').to_s
# wiki_response = HTTParty.get(url + '?action=query&list=search&srsearch=Cantonese&format=jsonfm')

# print wiki_response
# puts

ruby_content = JSON.parse(wiki_response)
# print ruby_content
# puts

search_array = ruby_content['query']['search']
# print search_array
# puts

page_id = search_array[0]['pageid']
# print page_id
# puts

# http://en.wikipedia.org/w/api.php?action=parse&pageid=1092292&format=json&section=0
opening_section = HTTParty.get("http://en.wikipedia.org/w/api.php?action=parse&pageid=#{page_id}&format=json&section=0")

# print opening_section
# puts

brief = opening_section['parse']['text']['*']
print brief
puts

File.open("index.html", 'w') do |f|
    f.write(brief)
end
