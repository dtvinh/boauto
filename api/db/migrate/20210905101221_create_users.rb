class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :klass, null: false
      t.string :username, null: false
      t.string :password_digest, null: false
      t.string :status, null: true
      t.string :api_token, null: true
      t.integer :ref_id, index: true, foreign_key: true, null: true

      t.timestamps
    end
  end
end
