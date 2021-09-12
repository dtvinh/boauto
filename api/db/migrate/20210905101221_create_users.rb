class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :klass, null: false
      t.string :username, null: false
      t.string :password_digest, null: false
      t.integer :status, null: false, default: 0
      t.string :api_token, null: true
      t.integer :ref_id, index: true, foreign_key: true, null: true
      t.string :ref_code, null: true

      t.timestamps
    end
  end
end
