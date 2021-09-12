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

ActiveRecord::Schema.define(version: 2021_09_10_221214) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "assemblies", force: :cascade do |t|
    t.string "name"
    t.string "assembly_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "assembly_type"
  end

  create_table "customers", force: :cascade do |t|
    t.string "customer_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "images", force: :cascade do |t|
    t.string "base64_image"
    t.string "item_ids", default: [], array: true
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
    t.boolean "image", default: false
  end

  create_table "items_assemblies", force: :cascade do |t|
    t.bigint "item_id"
    t.bigint "assembly_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "required"
    t.index ["assembly_id"], name: "index_items_assemblies_on_assembly_id"
    t.index ["item_id"], name: "index_items_assemblies_on_item_id"
  end

  create_table "machine_assembly_items", force: :cascade do |t|
    t.bigint "machine_id"
    t.bigint "assembly_item_id"
    t.decimal "unit_price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["assembly_item_id"], name: "index_machine_assembly_items_on_assembly_item_id"
    t.index ["machine_id"], name: "index_machine_assembly_items_on_machine_id"
  end

  create_table "machines", force: :cascade do |t|
    t.bigint "model_id"
    t.string "location_address"
    t.string "location_city"
    t.string "location_state"
    t.string "location_zip"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "proposal_id"
    t.decimal "color_click"
    t.decimal "mono_click"
    t.string "service_comments"
    t.string "pricing_comments"
    t.integer "annual_color_volume"
    t.integer "annual_mono_volume"
    t.bigint "customer_id"
    t.bigint "image_id"
    t.index ["customer_id"], name: "index_machines_on_customer_id"
    t.index ["image_id"], name: "index_machines_on_image_id"
    t.index ["model_id"], name: "index_machines_on_model_id"
    t.index ["proposal_id"], name: "index_machines_on_proposal_id"
  end

  create_table "model_assemblies", force: :cascade do |t|
    t.bigint "model_id"
    t.bigint "assembly_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.boolean "required"
    t.bigint "pick_one_group_id"
    t.index ["assembly_id"], name: "index_model_assemblies_on_assembly_id"
    t.index ["model_id"], name: "index_model_assemblies_on_model_id"
    t.index ["pick_one_group_id"], name: "index_model_assemblies_on_pick_one_group_id"
  end

  create_table "models", force: :cascade do |t|
    t.string "name"
    t.string "short_description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "parts", force: :cascade do |t|
    t.bigint "machine_id"
    t.bigint "item_id"
    t.integer "quantity"
    t.decimal "price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["item_id"], name: "index_parts_on_item_id"
    t.index ["machine_id"], name: "index_parts_on_machine_id"
  end

  create_table "pick_one_groups", force: :cascade do |t|
    t.bigint "model_id"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["model_id"], name: "index_pick_one_groups_on_model_id"
  end

  create_table "proposals", force: :cascade do |t|
    t.string "customer_name"
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.bigint "customer_id"
    t.index ["customer_id"], name: "index_proposals_on_customer_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "machines", "customers"
  add_foreign_key "machines", "images"
  add_foreign_key "machines", "proposals"
  add_foreign_key "model_assemblies", "pick_one_groups"
  add_foreign_key "proposals", "customers"
end
