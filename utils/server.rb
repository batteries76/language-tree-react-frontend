require 'sinatra'
require 'httparty'
require 'json'
require 'sinatra/reloader'
require 'sinatra/cross_origin'

configure do
    enable :cross_origin
end

set :allow_origin, :any
set :allow_methods, [:get, :post, :options]
set :allow_credentials, true
set :max_age, "1728000"
set :expose_headers, ['Content-Type']

options "*" do
    response.headers["Access-Control-Allow-Methods"] = "HEAD,GET,PUT,POST,DELETE,OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    200
end

get '/' do 
    'Hello!'    
end

get '/cross_origin' do 
    "Cross origin finally in React app?"
end


# To enable cross origin requests for all routes:
# configure do
#     enable :cross_origin
# end

# To only enable cross origin requests for certain routes:


get '/language-wiki/:language' do
    puts "HIT LANGUAGE-WIKI"
    url = 'http://en.wikipedia.org/w/api.php'

    # action=query&list=search&srsearch=Craig%20Noone&format=jsonfm
    wiki_response = HTTParty.get(url + "?action=query&list=search&srsearch=#{params['language']}%20language&format=json").to_s
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

    # File.open("index.html", 'w') do |f|
    #     f.write(brief)
    # end
    brief
    # return "Hi"
end

# class MyApp < Sinatra::Base

#     register Sinatra::CrossOrigin

#     enable cross_origin
    
#     get '/' do
#         "This is available to cross domain javascript requests automatically"
#     end
#     # set :bind, '0.0.0.0'
#     # configure do
#     #     enable :cross_origin
#     # end
#     # before do
#     #     response.headers['Access-Control-Allow-Origin'] = '*'
#     # end
    
#     # # routes...
#     # get '/language-wiki' do
#     #     puts "SUMMAT"
#     #     "RESPONSE?"
#     # end

#     # options "*" do
#     #     response.headers["Allow"] = "GET, PUT, POST, DELETE, OPTIONS"
#     #     response.headers["Access-Control-Allow-Headers"] = "Authorization, Content-Type, Accept, X-User-Email, X-Auth-Token"
#     #     response.headers["Access-Control-Allow-Origin"] = "*"
#     #     200
#     # end

#     # get '/language-wiki/:language' do
#     #     puts "HIT LANGUAGE-WIKI"
#     #     url = 'http://en.wikipedia.org/w/api.php'

#     #     # action=query&list=search&srsearch=Craig%20Noone&format=jsonfm
#     #     wiki_response = HTTParty.get(url + "?action=query&list=search&srsearch=#{params['language']}%20language&format=json").to_s
#     #     # wiki_response = HTTParty.get(url + '?action=query&list=search&srsearch=Cantonese&format=jsonfm')

#     #     # print wiki_response
#     #     # puts

#     #     ruby_content = JSON.parse(wiki_response)
#     #     # print ruby_content
#     #     # puts

#     #     search_array = ruby_content['query']['search']
#     #     # print search_array
#     #     # puts

#     #     page_id = search_array[0]['pageid']
#     #     # print page_id
#     #     # puts

#     #     # http://en.wikipedia.org/w/api.php?action=parse&pageid=1092292&format=json&section=0
#     #     opening_section = HTTParty.get("http://en.wikipedia.org/w/api.php?action=parse&pageid=#{page_id}&format=json&section=0")

#     #     # print opening_section
#     #     # puts

#     #     brief = opening_section['parse']['text']['*']
#     #     print brief
#     #     puts

#     #     # File.open("index.html", 'w') do |f|
#     #     #     f.write(brief)
#     #     # end
#     #     brief
#     #     # return "Hi"
#     # end
# end

