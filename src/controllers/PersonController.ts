import Controller from "./Controller";
import  Person  from "../models/person";
export default class PersonController extends Controller  {
  constructor(){      
      super(Person);
  }
}
