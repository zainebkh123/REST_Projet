package com.projet.service;

import java.util.List;
import com.projet.entity.Person;

public interface PersonService {
    
    public boolean addPerson(Person p);
    public boolean deletePerson(long id);
    public boolean updatePerson(Person p);
    Person getPersonById(long id);
    Person getPersonByNom(String nom);
    public List<Person> getAllPersons();
}