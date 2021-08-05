class ModelAssembly < ApplicationRecord
  belongs_to :model 
  belongs_to :assembly

  def self.import(file)
    CSV.read(file, headers: true, :header_converters => :symbol, :converters => :all, quote_empty: true)
  end

  def self.update_products_from_csv(file)
    x = self.import(file)
    hashed = x.map {|d| d.to_hash}

    starting_items = self.all.count

    puts "Currently there are #{starting_items} products."

    hashed.each do |row|
      self.create(row)
    end
  end 
end
