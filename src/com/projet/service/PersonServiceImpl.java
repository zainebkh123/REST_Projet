package com.projet.service;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import com.projet.entity.Person;

public class PersonServiceImpl implements PersonService {

    EntityManagerFactory emf = Persistence.createEntityManagerFactory("REST_Project");
    EntityManager em = emf.createEntityManager();
    
    @Override
    public List<Person> getAllPersons() {
        return em.createQuery("SELECT p FROM Person p", Person.class)
                 .getResultList();
    }

    @Override
    public boolean addPerson(Person p) {
        try {
            em.getTransaction().begin();
            em.persist(p);
            em.getTransaction().commit();
            return true;
        } catch (Exception e) {
            em.getTransaction().rollback();
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean deletePerson(long id) {
        try {
            em.getTransaction().begin();
            Person p = em.find(Person.class, id);
            if (p != null) {
                em.remove(p);
                em.getTransaction().commit();
                return true;
            }
            em.getTransaction().rollback();
        } catch (Exception e) {
            em.getTransaction().rollback();
            e.printStackTrace();
        }
        return false;
    }

    @Override
    public Person getPersonById(long id) {
        return em.find(Person.class, id);
    }

    @Override
    public Person getPersonByNom(String nom) {
        List<Person> list = em.createQuery(
                "SELECT p FROM Person p WHERE p.nom = :nom", Person.class)
                .setParameter("nom", nom)
                .getResultList();

        return list.isEmpty() ? null : list.get(0);
    }

    @Override
    public boolean updatePerson(Person p) {
        try {
            em.getTransaction().begin();
            em.merge(p);
            em.getTransaction().commit();
            return true;
        } catch (Exception e) {
            em.getTransaction().rollback();
            e.printStackTrace();
            return false;
        }
    }
}
