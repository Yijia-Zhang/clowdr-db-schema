pushd "db\"
mongodump --db=clowdr 
rmdir /s /q .\schema-base
move .\dump\clowdr .\schema-base
rmdir /s /q .\dump
popd

node scripts\bson2json.js -i db\schema-base -r true
node scripts\sortSchema.js -i db\schema-base\_SCHEMA.json 
node scripts\generateTSSchema.js -i db\schema-base\_SCHEMA.json -o src\classes\DataLayer\Schema
