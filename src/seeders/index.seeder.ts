import RoleSeeder from './roles.seeder';
import CountrySeeder from './countries.seeder';
import StateSeeder from './states.seeder';

export default function() {
  RoleSeeder();
  CountrySeeder();
  StateSeeder();
}
