# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_04_220440) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "assemblies", force: :cascade do |t|
    t.string "name"
    t.string "assembly_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "items", force: :cascade do |t|
    t.string "item_number"
    t.string "description"
    t.decimal "branch_floor_price"
    t.decimal "target_price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "part_type"
  end

  create_table "model_assemblies", force: :cascade do |t|
    t.bigint "model_id"
    t.bigint "assembly_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["assembly_id"], name: "index_model_assemblies_on_assembly_id"
    t.index ["model_id"], name: "index_model_assemblies_on_model_id"
  end

  create_table "models", force: :cascade do |t|
    t.string "name"
    t.string "short_description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "parts_assemblies", force: :cascade do |t|
    t.bigint "item_id"
    t.bigint "assembly_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "required"
    t.index ["assembly_id"], name: "index_parts_assemblies_on_assembly_id"
    t.index ["item_id"], name: "index_parts_assemblies_on_item_id"
  end

end
