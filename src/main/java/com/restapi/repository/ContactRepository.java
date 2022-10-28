package com.restapi.repository;

import com.restapi.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact,Long> {

    @Query("Select u from Contact u")
    List<Contact> findAllContacts();
}
