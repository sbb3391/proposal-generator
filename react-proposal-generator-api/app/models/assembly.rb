class Assembly < ApplicationRecord
  has_many :model_assemblies 
  has_many :models, through: :model_assemblies
  has_many :items_assemblies
  has_many :items, through: :items_assemblies

  def self.import(file)
    CSV.read(file, headers: true, :header_converters => :symbol, :converters => :all, quote_empty: true)
  end

  def self.update_products_from_csv(file)
    x = self.import(file)
    hashed = x.map {|d| d.to_hash}

    starting_items = self.all.count

    puts "Currently there are #{starting_items} products."

    hashed.each do |row|
      assembly = Assembly.find_by(assembly_number: row[:assembly_number])
      if assembly
        assembly.update(type: row[:type])
      end
    end
  end  
end
