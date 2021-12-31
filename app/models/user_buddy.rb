require 'rgl/adjacency'
require 'rgl/path'
require 'rgl/dot'

class UserBuddy < ApplicationRecord
  belongs_to :user
  belongs_to :buddy, class_name: 'User'

  def self.generate_graph
    RGL::DirectedAdjacencyGraph[*self.joins(:user, :buddy).pluck('users.email', 'buddies_user_buddies.email').flatten]
  end

  def self.generate_visual_graph
    generate_graph.write_to_graphic_file('png', 'public/friendship')
  end
end
