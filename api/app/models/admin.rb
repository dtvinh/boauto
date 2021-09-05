class Admin < User
  include UserConcern

  default_scope { where(klass: Admin.name) }
end
