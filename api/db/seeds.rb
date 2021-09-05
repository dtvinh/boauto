_admin = Admin.create!(username: 'sys_admin', password: 'Abcd1234@@', status: :active)

expert = Expert.create!(username: 'ex.1vinh', password: 'Abcd1234@@', status: :active)

Subscriber.create!(username: 'sub1', password: 'Abcd1234@@', status: :active, expert: expert)
