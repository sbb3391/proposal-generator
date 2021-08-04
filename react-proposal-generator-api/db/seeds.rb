# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

model = {
  item_number: 'AC0D011',
  description: 'ACCURIOPRESS C12000',
  type: 'engine',
  required: true,
  branch_floor_price: 90835.37,
  target_price: 99220.17,
  accessories: [
    {
      item_number: 'AC4GWY1',
      description: 'PF-712 PAPER FEED',
      type: 'paper handling',
      required: false,
      branch_floor_price: 7646.64,
      target_price: 8823.05,
      components: [
        {
          item_number: 'ACMHWY1',
          description: 'UK-112 HDD',
          type: 'paper handling',
          required: false,
          branch_floor_price: 1600,
          target_price: 1846.15
        }
      ]
    },
    {
      item_number: 'A65UWY2',
      description: 'SD-513 SADDLE STITCHER',
      type: 'finishing',
      required: false,
      branch_floor_price: 7646.64,
      target_price: 8823.05,
      components: [
        {
          item_number: 'A729WY1',
          description: 'SD-513/F SADDLE STITCH UNIT - FRONT',
          type: 'finishing',
          required: true,
          branch_floor_price: 1600,
          target_price: 1846.15
        },
        {
          item_number: 'A65XWY1',
          description: 'CR-101 CREASER UNIT FOR SD-513',
          type: 'finishing',
          required: false,
          branch_floor_price: 1600,
          target_price: 1846.15
        },
        {
          item_number: 'A65VWY1',
          description: 'FD-504 SQUARE FOLD MODULE FOR SD-513',
          type: 'finishing',
          required: false,
          branch_floor_price: 1600,
          target_price: 1846.15
        },
        {
          item_number: 'A65WWY1',
          description: 'TU-503 TRIMMER UNIT FOR SD-513',
          type: 'finishing',
          required: true,
          branch_floor_price: 1600,
          target_price: 1846.15
        }
      ]
    },
    {
      item_number: 'AC3TWY1',
      description: 'TU-510 TRIMMER UNIT',
      type: 'finishing',
      required: false,
      branch_floor_price: 7646.64,
      target_price: 8823.05,
      components: [
        {
          item_number: 'ACJ6WY1',
          description: 'TU-504 SLITTER FOR TU-510',
          type: 'finishing',
          required: false,
          branch_floor_price: 1600,
          target_price: 1846.15
        },
        {
          item_number: 'ACJ6WY1',
          description: 'CR-103 CONVEX CREASING UNIT FOR TU-510',
          type: 'finishing',
          required: false,
          branch_floor_price: 1600,
          target_price: 1846.15
        },
        {
          item_number: 'ACJ6WY1',
          description: 'PE-101 FEED DIRECTION PERF FOR TU-510',
          type: 'finishing',
          required: false,
          branch_floor_price: 1600,
          target_price: 1846.15
        },
        {
          item_number: 'ACJ6WY1',
          description: 'PE-102 CROSS DIRECTION PERF TU-510',
          type: 'finishing',
          required: false,
          branch_floor_price: 1600,
          target_price: 1846.15
        },
        {
          item_number: 'ACJ6WY1',
          description: 'MK-765 DUST BOX FOR TU-510',
          type: 'finishing',
          required: false,
          branch_floor_price: 1600,
          target_price: 1846.15
        },
        {
          item_number: 'ACJ6WY1',
          description: 'JS-507 BUSINESS CARD TRAY FOR TU-510',
          type: 'finishing',
          required: false,
          branch_floor_price: 1600,
          target_price: 1846.15
        }
      ]
    }

  ]
}

assemblies = [
  {
    item_number: 'AC4GWY1',
    description: 'PF-712 PAPER FEED',
    type: 'paper handling',
    required: false,
    branch_floor_price: 7646.64,
    target_price: 8823.05,
    components: [
      {
        item_number: 'ACMHWY1',
        description: 'UK-112 HDD',
        type: 'paper handling',
        required: false,
        branch_floor_price: 1600,
        target_price: 1846.15
      },
      {
        item_number: 'A1RKWY3',
        description: 'HT-506 HEATER FOR PF-710',
        type: 'paper handling',
        required: false,
        branch_floor_price: 1600,
        target_price: 1846.15
      }
    ]
  },
  {
    item_number: 'AAUUWY1',
    description: 'FS-541 STAPLE FINISHER',
    type: 'finishing',
    required: true,
    branch_floor_price: 7646.64,
    target_price: 8823.05,
    components: [
      {
        item_number: 'AC8UW11',
        description: 'PK-525 PUNCH KIT',
        type: 'finishing',
        required: false,
        branch_floor_price: 1600,
        target_price: 1846.15
      },
      {
        item_number: 'A04HWY2',
        description: 'PI-502 POST INSERTER FOR FS-532',
        type: 'finishing',
        required: false,
        branch_floor_price: 1600,
        target_price: 1846.15,
        components: [
          {
            item_number: 'A4F5WY1',
            description: 'MK-732 MOUNT KIT FOR PI-506',
            type: 'finishing',
            required: true,
            branch_floor_price: 1600,
            target_price: 1846.15
          }
        ]
      },
      {
        item_number: 'A4F4WY1',
        description: 'SD-510 SADDLE STITCH UNIT',
        type: 'finishing',
        required: false,
        branch_floor_price: 1600,
        target_price: 1846.15
      }
    ]
  },
  {
    item_number: 'AC3TWY1',
    description: 'TU-510 TRIMMER UNIT',
    type: 'finishing',
    required: false,
    branch_floor_price: 7646.64,
    target_price: 8823.05,
    components: [
      {
        item_number: 'ACJ6WY1',
        description: 'TU-504 SLITTER FOR TU-510',
        type: 'finishing',
        required: false,
        branch_floor_price: 1600,
        target_price: 1846.15
      },
      {
        item_number: 'ACJ6WY1',
        description: 'CR-103 CONVEX CREASING UNIT FOR TU-510',
        type: 'finishing',
        required: false,
        branch_floor_price: 1600,
        target_price: 1846.15
      },
      {
        item_number: 'ACJ6WY1',
        description: 'PE-101 FEED DIRECTION PERF FOR TU-510',
        type: 'finishing',
        required: false,
        branch_floor_price: 1600,
        target_price: 1846.15
      },
      {
        item_number: 'ACJ6WY1',
        description: 'PE-102 CROSS DIRECTION PERF TU-510',
        type: 'finishing',
        required: false,
        branch_floor_price: 1600,
        target_price: 1846.15
      },
      {
        item_number: 'ACJ6WY1',
        description: 'MK-765 DUST BOX FOR TU-510',
        type: 'finishing',
        required: false,
        branch_floor_price: 1600,
        target_price: 1846.15
      },
      {
        item_number: 'ACJ6WY1',
        description: 'JS-507 BUSINESS CARD TRAY FOR TU-510',
        type: 'finishing',
        required: false,
        branch_floor_price: 1600,
        target_price: 1846.15
      }
    ]
  }
]