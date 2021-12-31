require 'rgl/adjacency'
require 'rgl/path'

class DailyStatus < ApplicationRecord
  belongs_to :user
end
