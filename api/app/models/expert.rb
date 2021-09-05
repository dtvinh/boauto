class Expert < User
  include UserConcern

  default_scope { where(klass: Expert.name) }

  has_many :subscribers, class_name: Subscriber.name, foreign_key: :ref_id
  belongs_to :expert, class_name: User.name, foreign_key: :ref_id, optional: true
end
