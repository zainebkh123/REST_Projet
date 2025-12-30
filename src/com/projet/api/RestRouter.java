package com.projet.api;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

import com.projet.entity.Person;
import com.projet.service.PersonServiceImpl;

@Path("/personnes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RestRouter {

    PersonServiceImpl personService = new PersonServiceImpl();

    @GET
    public List<Person> getAllPersons() {
        return personService.getAllPersons();
    }

    @GET
    @Path("/id/{id}")
    public Person getPersonById(@PathParam("id") long id) {
        return personService.getPersonById(id);
    }

    @GET
    @Path("/nom/{nom}")
    public Person getPersonByNom(@PathParam("nom") String nom) {
        return personService.getPersonByNom(nom);
    }

    @POST
    @Path("/add")
    public Person addPerson(Person person) {
        personService.addPerson(person);
        return person;
    }

    @PUT
    @Path("/update/{id}")
    public Person updatePerson(@PathParam("id") long id, Person person) {
        person.setId(id);
        personService.updatePerson(person);
        return person;
    }

    @DELETE
    @Path("/delete/{id}")
    public void deletePerson(@PathParam("id") long id) {
        personService.deletePerson(id);
    }
}
