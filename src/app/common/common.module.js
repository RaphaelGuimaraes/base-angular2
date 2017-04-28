import angular from 'angular';
import Navbar from './navbar/navbar.module';
import Hero from './hero/hero.module';
import User from './user/user.module';

let commonModule = angular.module('app.common', [
  Navbar,
  Hero,
  User
])
  
.name;

export default commonModule;
