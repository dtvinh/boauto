class Subscriber < User
  include UserConcern

  default_scope { where(klass: Subscriber.name) }

  has_many :subscribers, class_name: Subscriber.name, foreign_key: :ref_id
  belongs_to :expert, class_name: Expert.name, foreign_key: :ref_id
end
