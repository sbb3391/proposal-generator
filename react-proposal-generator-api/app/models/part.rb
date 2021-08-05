class Part < ApplicationRecord
  belongs_to :item
  belongs_to :machine
end
