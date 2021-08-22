namespace :export do
  desc "Export users" 
  task :export_to_seeds => :environment do
    Model.all.each do |model| 
      # excluded_keys = [‘id’] 
      serialized = country
        .serializable_hash
      puts "User.create(#{serialized})"
    end 
  end
end