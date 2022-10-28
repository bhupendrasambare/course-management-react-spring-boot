package com.restapi.service;

import com.restapi.entity.Contact;
import com.restapi.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    @Autowired
    ContactRepository contactRepository;

    public Contact saveContact(Contact contact){
        return contactRepository.save(contact);
    }

    public List<Contact> findAllContact(){
        return contactRepository.findAllContacts();
    }
}
