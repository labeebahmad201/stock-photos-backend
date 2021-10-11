import RoleSeeder from './roles.seeder';
import CountrySeeder from './countries.seeder';
import StateSeeder from './states.seeder';
import CollectionSeeder from './collection.seeder';

export default function() {
  RoleSeeder();
  CountrySeeder();
  StateSeeder();
  CollectionSeeder();
}
