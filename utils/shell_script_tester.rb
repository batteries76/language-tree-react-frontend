
puts "RUNNING THE SHELL SCRIPT TESTER"

puts "ARGV"
print ARGV
puts

if ARGV[0] == 'sino'
    puts "SINO argument given to shell script"
elsif ARGV[0] == 'euro'
    puts "EURO argument givent to shell script"
else 
    puts "The argument given to the shell script does not map to a language family"
end