import UserSeeder from './users.seeder';
import db from './../db/index';

db(function() {
  UserSeeder();
});
